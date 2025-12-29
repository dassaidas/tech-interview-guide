# ASP.NET Core – Interview Questions & Answers

### Q1. What is ASP.NET Core?
ASP.NET Core is a **cross-platform, open-source, high-performance web framework** used to build modern web applications, REST APIs, microservices, and cloud-native applications. It runs on the **.NET runtime** and emphasizes performance, scalability, and modularity.

---

### Q2. How is ASP.NET Core different from ASP.NET?
ASP.NET Core differs from classic ASP.NET in several ways:
- Cross-platform support (Windows, Linux, macOS)
- Open-source
- High performance
- Modular architecture
- No dependency on `System.Web`
- Cloud and container friendly

---


### Q3. Why did Microsoft create ASP.NET Core?
Microsoft created ASP.NET Core to:
- Support cross-platform development
- Improve performance and scalability
- Enable cloud-native and microservices architectures
- Remove legacy dependencies like `System.Web`
- Adopt modern development patterns such as dependency injection and middleware

---

### Q4. What problems of ASP.NET did ASP.NET Core solve?
- IIS-only hosting
- Heavy and monolithic `System.Web`
- Limited scalability
- Windows-only support
- Poor suitability for containers and cloud workloads

---


### Q5. Is ASP.NET Core open-source?
Yes. ASP.NET Core is fully open-source and maintained under the **.NET Foundation** on GitHub.

---

### Q6. How does ASP.NET Core support cross-platform execution?
ASP.NET Core runs on the **.NET runtime** and uses the **Kestrel web server**, enabling applications to run on Windows, Linux, and macOS.

---


### Q7. Explain the evolution from ASP.NET to ASP.NET Core.
| ASP.NET | ASP.NET Core |
|------|-------------|
| Windows-only | Cross-platform |
| IIS dependent | Kestrel + IIS/NGINX |
| System.Web | No System.Web |
| Monolithic | Modular |
| Slower | High performance |

---

### Q8. Is ASP.NET Core a replacement for ASP.NET?
Yes. ASP.NET Core is the modern and recommended replacement for ASP.NET.

---


### Q9. What is the relationship between ASP.NET Core and .NET runtime?
ASP.NET Core is a web framework built on top of the .NET runtime, which provides:
- Garbage collection
- Memory management
- Threading
- JIT compilation

---

### Q10. Can ASP.NET Core target multiple .NET versions?
Yes. ASP.NET Core supports **multi-targeting**, allowing applications to run on different .NET versions such as .NET 6, 7, and 8.

---


### Q11. What is the unified development model in ASP.NET Core?
ASP.NET Core uses a single programming model for:
- MVC
- Web API
- Razor Pages
- Minimal APIs  
This simplifies development and reduces complexity.

---

### Q12. How does ASP.NET Core simplify development?
- Unified routing
- Central middleware pipeline
- Built-in dependency injection
- Shared filters and model binding

---


### Q13. Why was System.Web removed?
`System.Web` was:
- Heavy
- Monolithic
- Tightly coupled to IIS  
Removing it improved performance and flexibility.

---

### Q14. What replaced System.Web features?
| System.Web | ASP.NET Core |
|----------|--------------|
| HttpModules | Middleware |
| HttpHandlers | Endpoints |
| Web.config | appsettings.json |
| Global.asax | Program.cs |

---


### Q15. Why is ASP.NET Core faster?
- Lightweight request pipeline
- Optimized Kestrel server
- Async-first design
- Reduced memory allocations

---

### Q16. What is Kestrel?
Kestrel is a high-performance, cross-platform web server optimized for asynchronous I/O and high throughput.

---


### Q17. What does modular architecture mean?
ASP.NET Core applications load only required features via NuGet packages, reducing memory usage and startup time.

---

### Q18. How does middleware improve modularity?
Middleware components are independent, reusable, and configurable in a request pipeline.

---


### Q19. What is multi-targeting?
Multi-targeting allows a single project to target multiple .NET frameworks using the `<TargetFrameworks>` setting.

---

### Q20. Why is multi-targeting useful?
- Backward compatibility
- Gradual upgrades
- Environment flexibility

---


### Q21. What applications can be built with ASP.NET Core?
- REST APIs
- MVC web applications
- Blazor apps
- Microservices
- Worker Services
- Background jobs
- Real-time apps (SignalR)

---

### Q22. Why is ASP.NET Core good for microservices?
- Lightweight
- Fast startup
- Container-friendly
- Scalable
- Cloud-native

---

### Q23. What is a Worker Service?
A Worker Service is a background service used for queue processing, scheduled jobs, and long-running tasks.

---

### Q24. How does ASP.NET Core support background jobs?
- `IHostedService`
- `BackgroundService`
- Integration with Hangfire or Quartz.NET

---



### Q25. When would you choose ASP.NET Core over Node.js?
When strong typing, enterprise security, performance, and Microsoft ecosystem integration are required.

---

### Q26. Can ASP.NET Core run without IIS?
Yes. It can run standalone using Kestrel or behind reverse proxies like IIS or NGINX.

---
