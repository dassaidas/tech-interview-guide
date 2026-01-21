
### What is middleware?
Middleware is a small piece of code that sits in the middle of an HTTP request and response.  
It can:
- Look at the request
- Do some work (logging, auth, etc.)
- Decide to pass the request to the next step
- Optionally change the response

**Kid-simple explanation:**  
Imagine a school gate with multiple checkpoints:
- One checks your ID (Authentication)
- Another checks permission to enter a room (Authorization)
- Another checks if you are bringing forbidden items (Validation)
Each checkpoint can allow you to proceed or stop you.

---

## Pipeline flow (Request → Response)

A typical ASP.NET Core request flows like:

1. Kestrel receives the request  
2. Middleware pipeline runs in order  
3. An endpoint (controller/minimal API) handles it  
4. Response goes back out through middleware in reverse  

**Visual:**
```
Request ---> [MW1] ---> [MW2] ---> [MW3] ---> Endpoint ---> Response
              |                           |
              +---- can stop early -------+
```

---

## Use / Run / Map / UseWhen

- `Use(...)` registers middleware that calls `next()` to continue.
- `Run(...)` registers middleware that ends the pipeline (no `next()` call).
- `Map(...)` branches the pipeline based on a path prefix.
- `UseWhen(...)` branches the pipeline based on a condition.

---

## Short-circuiting

Short-circuiting means a middleware **stops** the request from going further.

Example: if user is not authenticated, return `401` immediately.

---

## Order matters

Middleware order matters because:
- earlier middleware may affect later middleware
- authentication must happen before authorization
- routing must happen before endpoints
- CORS must happen before endpoints (for browser apps)

---

## The Next delegate

`next()` is a delegate that represents “call the next middleware”.

If you don't call `await next()`:
- the pipeline stops
- later middleware will not run
- the endpoint will not execute

---

## Common built-in middlewares

**Static Files**
Serves files like images, CSS, JS from `wwwroot`.

**CORS**
Controls which origins can call your API from browsers.

**Authentication**
Identifies who the user is and sets `HttpContext.User`.

**Authorization**
Checks whether the user has permission (roles/policies).

**Routing**
Finds which endpoint matches the request URL.

**Endpoints**
Executes the matched endpoint (controller/minimal API).

**Exception Handling**
Catches unhandled exceptions and returns consistent error responses.

**HSTS**
Tells browsers “always use HTTPS for this site”.

**HTTPS redirection**
Redirects HTTP requests to HTTPS.

**Cookies**
Reads/writes cookies to support sessions/auth.

**Session**
Stores per-user data on server side (often backed by a store).

**Response Compression**
Compresses responses (gzip/br) to reduce bandwidth.

**Request Localization**
Chooses culture/language based on headers/cookies.

**File Providers**
Abstract access to file systems (physical, embedded, etc.).

---

## Custom middleware

You create custom middleware when you need app-specific processing like:
- Custom logging
- Custom security checks
- Correlation IDs
- Request/response manipulation
- Central exception handling

---

## Code: Creating custom middleware (Invoke/InvokeAsync)

```csharp
public class TimingMiddleware
{
    private readonly RequestDelegate _next;

    public TimingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var start = DateTime.UtcNow;

        await _next(context); // continue pipeline

        var elapsed = DateTime.UtcNow - start;
        Console.WriteLine($"Path: {context.Request.Path} took {elapsed.TotalMilliseconds} ms");
    }
}
```

Register it in `Program.cs`:

```csharp
app.UseMiddleware<TimingMiddleware>();
```

---

## DI inside middleware

Middleware supports constructor DI.

```csharp
public class MyMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<MyMiddleware> _logger;

    public MyMiddleware(RequestDelegate next, ILogger<MyMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        _logger.LogInformation("Request: {Path}", context.Request.Path);
        await _next(context);
    }
}
```

---

## Accessing HttpContext

`HttpContext` gives access to:
- `Request`: headers, body, query, path, method
- `Response`: status, headers, body
- `User`: identity, claims, roles
- `Items`: per-request storage (safe for that one request)

---

## Reading and rewriting request bodies

By default, the request body can be read only once. To read it multiple times, enable buffering.

```csharp
context.Request.EnableBuffering();

using var reader = new StreamReader(context.Request.Body, leaveOpen: true);
var body = await reader.ReadToEndAsync();

context.Request.Body.Position = 0; // reset for next middleware/controller
```

Notes:
- Avoid reading large bodies unless required.
- Never log sensitive data (passwords, tokens, PII).

---

## Logging + Correlation IDs

Correlation IDs help trace a request across services and logs.

```csharp
public class CorrelationIdMiddleware
{
    private const string HeaderName = "X-Correlation-ID";
    private readonly RequestDelegate _next;

    public CorrelationIdMiddleware(RequestDelegate next) => _next = next;

    public async Task InvokeAsync(HttpContext context)
    {
        var correlationId =
            context.Request.Headers[HeaderName].FirstOrDefault()
            ?? Guid.NewGuid().ToString("N");

        context.Items[HeaderName] = correlationId;
        context.Response.Headers[HeaderName] = correlationId;

        await _next(context);
    }
}
```

---

## Global exception middleware

A global exception middleware catches unhandled exceptions and returns a consistent JSON error.

```csharp
public class GlobalExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionMiddleware> _logger;

    public GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled exception");

            if (context.Response.HasStarted)
            {
                // If response already started, we can't rewrite headers/status safely.
                throw;
            }

            context.Response.Clear();
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            context.Response.ContentType = "application/json";

            var payload = "{\"message\":\"Something went wrong. Please try again later.\"}";
            await context.Response.WriteAsync(payload);
        }
    }
}
```

Register it early:

```csharp
app.UseMiddleware<GlobalExceptionMiddleware>();
```

---




## 1) What is middleware in ASP.NET Core?
A component that can inspect/modify the request and response and decide to pass control to the next component.

## 2) What does “pipeline” mean?
A chain of middlewares executed in order for each request.

## 3) Why does ASP.NET Core use middleware?
It keeps features modular: logging, auth, routing, exceptions are separate steps.

## 4) What is the request → response flow?
Request enters pipeline, endpoint executes, response returns through the pipeline.

## 5) What is `Use()`?
Adds middleware that normally calls `next()` so processing continues.

## 6) What is `Run()`?
Adds terminal middleware. It doesn’t call `next()` and ends the pipeline.

## 7) What is `Map()`?
Creates a branch pipeline based on a path prefix (like `/api`).

## 8) What is `UseWhen()`?
Creates a branch pipeline based on a condition (like a header exists).

## 9) What is short-circuiting?
Stopping the pipeline early and returning a response immediately (like 401/403).

## 10) Why does middleware order matter?
Because earlier middleware can affect later ones and some depend on others.

## 11) What is `next()`?
A delegate that calls the next middleware in the pipeline.

## 12) What happens if you forget `await next()`?
The pipeline stops; later middleware and endpoints may never run.

## 13) Why do we use exception handling middleware?
To catch errors and return consistent responses instead of crashing.

## 14) What does HTTPS redirection do?
Redirects HTTP requests to HTTPS.

## 15) What is HSTS?
Tells browsers “always use HTTPS for this domain” for a period of time.

## 16) What is CORS?
Browser security rule controlling which origins can call your API.

## 17) What is authentication middleware?
Identifies the user and builds `HttpContext.User`.

## 18) What is authorization middleware?
Checks if the current user is allowed to access the resource.

## 19) What is routing middleware?
Matches incoming URL to an endpoint.

## 20) What is endpoints middleware?
Executes the matched endpoint (controller/minimal API).

## 21) What is static files middleware?
Serves files from `wwwroot` like images/CSS/JS.

## 22) What is response compression?
Compressing responses to reduce payload size over the network.

## 23) What is session middleware?
Provides per-user server-side state (needs storage and config).

## 24) What is request localization?
Sets culture/language based on headers/cookies/route.

## 25) What is HttpContext?
Represents current request/response + user identity + items.


## 26) How do you add custom middleware?
Create a class with `Invoke`/`InvokeAsync` and register it with `UseMiddleware<T>()`.

## 27) Can middleware use DI?
Yes. Constructor injection works for registered services.

## 28) Where should exception middleware be placed?
Near the top so it can catch exceptions from later middleware.

## 29) Why must authentication run before authorization?
Authorization needs user identity/claims to evaluate policies.

## 30) Why must routing run before endpoints?
Endpoints needs routing to select the correct handler.

## 31) How can you store data for the lifetime of one request?
Use `HttpContext.Items`.

## 32) What is a correlation ID?
A unique ID used to trace one request across logs and services.

## 33) Where do you add correlation ID middleware?
Near the top so all logs downstream include it.

## 34) Why is request body reading tricky?
The body stream is forward-only; once read, it’s consumed.

## 35) How do you read request body without breaking controllers?
Enable buffering and reset the stream position after reading.

## 36) What is `UseStaticFiles()` order requirement?
Usually before routing/endpoints so it can short-circuit quickly.

## 37) What problems happen with wrong CORS order?
CORS must run before endpoints so browser receives CORS headers.

## 38) How are cookies related to auth?
Cookie auth reads a cookie and builds user identity.

## 39) When should you use session?
Web apps that need server-side state; avoid for stateless APIs.

## 40) Why is session not ideal in microservices?
It adds shared state and storage requirements, reducing scalability.

## 41) What is response compression tradeoff?
Saves bandwidth but costs CPU.

## 42) How is localization decided?
Often by `Accept-Language`, cookies, or route segments.

## 43) What are file providers used for?
Abstract file sources (physical, embedded, composite).

## 44) How do you conditionally run middleware for paths?
Use `Map()` or `UseWhen()`.

## 45) Difference between `Map()` and `UseWhen()`?
Map branches by path; UseWhen branches by condition.

## 46) What is terminal middleware?
Middleware that ends the pipeline and doesn’t call `next()`.

## 47) Why prefer async middleware?
It scales better and avoids thread pool starvation.

## 48) How do you short-circuit with a status code?
Set status code, write response, and return without calling `next()`.

## 49) What causes “headers already sent” errors?
Trying to change headers after the body started writing.

## 50) How can you ensure headers are set early?
Set headers before writing or use `Response.OnStarting`.

## 51) What does `Response.OnStarting` do?
Runs a callback right before headers are sent.

## 52) How do you add a security header in middleware?
Set `context.Response.Headers["Header-Name"]` before body write.

## 53) How can middleware implement rate limiting?
Count requests per key/user/IP and return 429 when exceeding limits.

## 54) What middleware is used for JWT auth?
`UseAuthentication()` with JWT bearer configuration.

## 55) What is a common production middleware order?
Exception → HSTS/HTTPS → StaticFiles → Routing → CORS → AuthN → AuthZ → Endpoints


## 56) Why is middleware order a security trap?
Wrong order can bypass checks (AuthZ before AuthN) or leak details (exception handling too late).

## 57) How does short-circuiting improve performance?
It avoids running expensive middleware/endpoint logic when not needed.

## 58) Why can reading request body harm performance?
It adds IO and can allocate large memory; avoid unless needed.

## 59) How to log request bodies safely?
Use size limits, sampling, redaction, and never log secrets/PII.

## 60) What is the risk of trusting forwarded headers?
Clients can spoof IP/proto unless you trust only known proxies/networks.

## 61) What’s a subtle bug in exception middleware?
If response already started, you can’t safely change status/headers.

## 62) How to handle exceptions after response started?
Log and abort; avoid writing partial JSON.

## 63) Correlation ID strategy in microservices?
Accept incoming ID; generate if missing; pass downstream via headers.

## 64) Why should `UseAuthorization` come after `UseRouting`?
Authorization uses endpoint metadata created by routing.

## 65) What can go wrong if `UseCors` is after endpoints?
Browser will block the response due to missing CORS headers.

## 66) Why place `UseHttpsRedirection` early?
So redirection happens before expensive processing.

## 67) What is “double-dispatch” in middleware?
Run code before and after `await next()` (timing/logging).

## 68) How do you time requests in middleware?
Start stopwatch before `await next()` and stop after it returns.

## 69) How to return consistent error shapes?
Global exception middleware mapping exception types to status codes + JSON payload.

## 70) How can middleware support multi-tenancy?
Extract tenant from host/header, store in Items, enforce rules per tenant.

## 71) How do you rewrite request paths safely?
Modify `context.Request.Path` before `UseRouting()`.

## 72) How do you block large headers?
Check header sizes/count and return 431/400 early.

## 73) How do you implement custom auth in middleware?
Validate credentials/token, set `HttpContext.User`, then call next.

## 74) Why prefer built-in authentication handlers?
They are tested, secure, and integrate with policies/claims correctly.

## 75) The interview one-liner for middleware pipeline?
An ordered chain of components that can inspect/modify requests and responses, short-circuit, and pass control using `next()`.

---

## Practical pipeline example (recommended order)

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", p =>
        p.WithOrigins("https://your-frontend.com")
         .AllowAnyHeader()
         .AllowAnyMethod());
});

builder.Services.AddAuthentication().AddJwtBearer();
builder.Services.AddAuthorization();

var app = builder.Build();

// Global exception handler early
app.UseMiddleware<GlobalExceptionMiddleware>();

app.UseHsts();
app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();

app.UseCors("Frontend");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
```

---

## Key takeaways

- Middleware runs in order; the order is a common interview trap.
- `Use` continues, `Run` ends, `Map/UseWhen` branch the pipeline.
- Short-circuiting is a performance + security tool.
- Place exception middleware early for consistent error responses.
- Be careful reading/logging request bodies; protect secrets and performance.
- Correlation IDs are essential for debugging distributed systems.
