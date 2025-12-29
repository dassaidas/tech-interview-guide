**ASP.NET Core Kestrel & Other Servers**

**What is Kestrel?**

- Default cross-platform web server for ASP.NET Core.
- Fast, lightweight, built on async I/O pipelines.
- Can run **standalone** or **behind a reverse proxy** (IIS, Nginx, Apache).

---

**Advantages of Kestrel**

- **Performance**: Extremely fast request handling, optimized pipelines.
- **Cross-platform**: Runs on Windows, Linux, macOS, containers.
- **Lightweight**: Small footprint, great for microservices & cloud-native apps.
- **Modern Protocols**: Supports HTTP/2 & HTTP/3 (QUIC).
- **Configurable**: Fine-grained limits (timeouts, max body size, TLS ciphers).

---

**Disadvantages of Kestrel**

- **No process management** (restart, log rotation, auto-recovery) – rely on systemd/IIS/K8s.
- **Security at the edge is your job** – no WAF, rate-limiting, or IP filtering built-in.
- **TLS/Certificates**: Possible, but harder to manage at scale.
- **Static files/caching**: Middleware exists, but less efficient vs Nginx/CDN.

---

**Why Not Use Kestrel Directly in Production?**
Kestrel **is production-ready**, but usually sits **behind a reverse proxy** for:

1. **Security** – WAF, DDoS protection, request filtering.
2. **TLS termination** – Centralized certs, key management, rotation.
3. **Operational features** – Zero-downtime reloads, log handling, process mgmt.
4. **Performance offload** – Static files, compression, caching.
5. **Multi-site hosting** – Host multiple domains on :80/:443.
6. **Observability** – Standard access logs, metrics, tracing.

---

**Kestrel vs Other Servers**

| Server       | Pros                                      | Cons                                   |
| ------------ | ----------------------------------------- | -------------------------------------- |
| **Kestrel**  | Fast, cross-platform, container-friendly  | Needs reverse proxy for edge hardening |
| **IIS**      | Windows integration, TLS management, logs | Windows-only, extra hop                |
| **Nginx**    | Lightweight, TLS, caching, WAF            | Separate config/ops overhead           |
| **Apache**   | Flexible, many modules                    | Heavier, complex configs               |
| **HTTP.sys** | Windows kernel-mode, Windows Auth         | Windows-only                           |

---

**When to Use Kestrel Alone**

- Internal microservices (behind Kubernetes Ingress or Cloud LB).
- APIs inside a private network/VPC.
- Dev/test environments.

**When to Use Reverse Proxy**

- Internet-facing apps.
- Need TLS termination, WAF, rate-limiting, mTLS.
- Multi-site hosting on :80/:443.
- Static-heavy workloads.

---

**Kestrel Tuning Example (Program.cs)**

```csharp
builder.WebHost.ConfigureKestrel(options =>
{
    options.Limits.MaxRequestBodySize = 50 * 1024 * 1024; // 50 MB
    options.Limits.KeepAliveTimeout = TimeSpan.FromSeconds(120);
    options.AddServerHeader = false; // Hide server header
    options.ListenAnyIP(5000);
    options.ListenAnyIP(5001, listen =>
    {
        listen.UseHttps(https =>
        {
            https.SslProtocols = System.Security.Authentication.SslProtocols.Tls12 |
                                 System.Security.Authentication.SslProtocols.Tls13;
        });
    });
});
```

**Nginx Reverse Proxy to Kestrel**

```csharp
server {
    listen 80;
    server_name example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name example.com;

    ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    client_max_body_size 50m;
    proxy_read_timeout 120s;

    location / {
        proxy_pass http://127.0.0.1:5000;   # Kestrel
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

```

**Q1: Is Kestrel production-ready?**
Yes. It’s the default server for ASP.NET Core and is production-grade.  
For **internet-facing apps**, it’s recommended to place a **reverse proxy** (IIS, Nginx, Apache, or Cloud LB) in front for TLS, security, and operational benefits.

---

**Q2: Why put IIS/Nginx in front of Kestrel?**

- TLS termination & certificate management
- Web Application Firewall (WAF), rate limiting, IP filtering
- Process supervision and auto-recovery
- Logging and request tracing
- Static file offload, caching, compression
- Protocol negotiation (HTTP/2, HTTP/3)
- Hosting multiple sites on standard ports (:80/:443)

---

**Q3: When would you use Kestrel without a reverse proxy?**

- Inside **trusted networks** (Kubernetes, containers, VPC) where a cloud LB or service mesh already provides edge features.
- For **internal APIs** and microservices not exposed to the public internet.
- In **dev/test environments**.

---

**Q4: Kestrel vs HTTP.sys**

- **Kestrel**: Cross-platform, default server, lightweight, high-performance.
- **HTTP.sys**: Windows-only, uses kernel-mode HTTP stack, supports **Windows Authentication** and **port sharing**, but not cross-platform.

---

**Q5: How do you terminate HTTPS with Kestrel?**

- Configure HTTPS in `Program.cs` with `ConfigureKestrel`.
- Or define endpoints in `appsettings.json` with certificate bindings.
- At scale, TLS termination is usually offloaded to a reverse proxy or load balancer.

---

**Q6: How to get the original client IP behind a proxy?**

- Use **Forwarded Headers Middleware**:

  ```csharp
  app.UseForwardedHeaders(new ForwardedHeadersOptions
  {
      ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
  });
  ```

Configure KnownProxies or KnownNetworks to trust the proxy.

**Q7: What’s the typical production topology?**

```
Internet → CDN / WAF → Reverse Proxy or Cloud LB → Kestrel (ASP.NET Core App) → Services / DB
```

**Q8: How do you tune Kestrel for large uploads?**

- Increase **`MaxRequestBodySize`**.
- Adjust **keep-alive** and **request timeouts**.
- Use **streaming or buffering** for efficiency.
- Update reverse proxy settings (e.g., `client_max_body_size` in Nginx, IIS upload limits).

---

**Q9: How do you host on Windows vs Linux?**

- **Windows**: IIS (reverse proxy) + Kestrel using the **ASP.NET Core Module**.
- **Linux**: Nginx/Apache (reverse proxy) + Kestrel, or run directly behind a **Cloud Load Balancer**.

---

**Q10: How do you run multiple sites on :80/:443?**

- Use **virtual hosts** and **SNI (Server Name Indication)** at the reverse proxy.
- Each site forwards traffic to its corresponding **Kestrel app/port**.

---

**Q11: Security must-dos with Kestrel**

- Disable server headers (`options.AddServerHeader = false`).
- Enforce **HTTPS** and **HSTS** (preferably at the reverse proxy).
- Validate **request sizes** and input.
- Use **rate limiting** (middleware or proxy).
- Keep **.NET runtime and dependencies patched**.

---

**Q12: How do you log real client IPs behind IIS/Nginx?**

- Add `app.UseForwardedHeaders()` with **`X-Forwarded-For`** and **`X-Forwarded-Proto`**.
- Configure **KnownProxies** / **KnownNetworks** in middleware options.

---

**Key Takeaways**

- Kestrel is fast, cross-platform, production-ready.

- Use a reverse proxy (IIS/Nginx/Apache or Cloud LB) for internet-facing scenarios.

- Safe to run Kestrel alone inside containers/cloud load balancers.

- Always configure security headers, TLS, timeouts, and limits.
