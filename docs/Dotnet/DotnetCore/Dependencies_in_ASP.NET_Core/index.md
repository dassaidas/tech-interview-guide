
### What is a dependency?
A **dependency** is something your class needs to do its job.

Example:
- A `ReportService` needs a `DbContext` to read data
- A `EmailService` needs an SMTP client/settings

If the class creates these things itself (`new DbContext()` inside), the class becomes hard to test and hard to change.

### What is Dependency Injection (DI)?
DI means **you don’t build your dependencies inside the class**.  
Instead, you **ask** for them, and the DI container gives them to you.

**Kid-simple analogy:**  
Instead of cooking every ingredient from scratch, you ask a kitchen helper to bring eggs, milk, and flour.

---

## Built-in DI container
ASP.NET Core includes a built-in DI container:
- you **register** services during startup,
- the container **creates** them when needed,
- and **disposes** them when their lifetime ends.

It’s simple and fast. For most applications it’s enough.

---

## Service lifetimes: Singleton, Scoped, Transient

**Singleton**
- One instance for the entire application lifetime.
- Same object shared by all requests and users.

**Use when:** shared stateless utilities, caches, configuration watchers.

**Danger:** if it holds per-request data, users can leak into each other.

**Scoped**
- One instance per request (typical web request scope).
- New instance for each new incoming request.

**Use when:** EF Core `DbContext`, per-request services.

**Transient**
- New instance every time you ask for it.

**Use when:** lightweight stateless services.

**Danger:** too many transients can increase allocations.

---

## Registering services

Common registrations:

```csharp
builder.Services.AddSingleton<IMyCache, MemoryCacheService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddTransient<IEmailFormatter, EmailFormatter>();
```

Also common:
- `AddHttpClient()` for outbound HTTP calls
- `AddDbContext()` for EF Core (scoped by default)

---

## Injecting services

**Controllers**
Constructor injection is the default pattern.

**Middleware**
Use constructor DI or `InvokeAsync(HttpContext, ...)` parameter injection.

**Razor Pages**
Constructor injection or `[BindProperty]` is different — but DI is still constructor-based.

**Minimal APIs**
DI works by adding parameters to the route handler.

**Background services**
Inject dependencies into hosted services; create scopes when using scoped services.

---

## Options pattern: IOptions, IOptionsSnapshot, IOptionsMonitor

Options pattern binds config (appsettings, env vars) to strongly-typed classes.

- `IOptions<T>`: read-only, usually singleton-style, doesn’t change until restart.
- `IOptionsSnapshot<T>`: scoped; re-reads per request (useful for config changes between requests).
- `IOptionsMonitor<T>`: singleton; supports change notifications and `OnChange`.

You can validate options at startup and fail fast.

---

## IServiceProvider & creating scopes
`IServiceProvider` is the container’s runtime object that resolves services.

Use it carefully:
- Prefer constructor injection.
- Use `IServiceScopeFactory` to create scopes in background work or singletons.

---

## Service resolution & ServiceProvider validation
ASP.NET Core can validate DI:
- detect missing registrations,
- detect scoped-in-singleton mistakes (in some settings),
- catch issues early.

---

## Advanced DI patterns
Common advanced patterns include:
- Factory injections (create objects with runtime values)
- Conditional injection (pick implementation based on config)
- Open generics (e.g., `IRepository<T>`)
- Scrutor scanning for auto registration

---

## Scrutor library for auto registration
Scrutor adds assembly scanning:
- find classes by convention
- register automatically

Great for large apps to reduce manual registrations.

---

# Code Samples (Copy/Paste)

**1) Basic DI registration + usage (Program.cs)**

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// Services
builder.Services.AddSingleton<ITimeProvider, SystemTimeProvider>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddTransient<IEmailFormatter, EmailFormatter>();

var app = builder.Build();

app.MapControllers();
app.Run();
```

---

**2) Minimal API injection**

```csharp
app.MapGet("/time", (ITimeProvider clock) =>
{
    return new { now = clock.UtcNow };
});
```

---

**3) Middleware injection (constructor DI)**

```csharp
public sealed class RequestLogMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RequestLogMiddleware> _logger;

    public RequestLogMiddleware(RequestDelegate next, ILogger<RequestLogMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        _logger.LogInformation("Incoming: {Method} {Path}", context.Request.Method, context.Request.Path);
        await _next(context);
    }
}
```

Register:

```csharp
app.UseMiddleware<RequestLogMiddleware>();
```

---

**4) Background service with scoped dependency (correct pattern)**

```csharp
public sealed class BillingWorker : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger<BillingWorker> _logger;

    public BillingWorker(IServiceScopeFactory scopeFactory, ILogger<BillingWorker> logger)
    {
        _scopeFactory = scopeFactory;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            using var scope = _scopeFactory.CreateScope();
            var userService = scope.ServiceProvider.GetRequiredService<IUserService>();

            await userService.SyncAsync(stoppingToken);

            _logger.LogInformation("Sync done.");
            await Task.Delay(TimeSpan.FromMinutes(5), stoppingToken);
        }
    }
}
```

Register:

```csharp
builder.Services.AddHostedService<BillingWorker>();
```

---

**5) Options pattern + validation + reload**

### Options class

```csharp
public sealed class EmailOptions
{
    public string Host { get; init; } = "";
    public int Port { get; init; }
}
```

### Bind + validate

```csharp
builder.Services
    .AddOptions<EmailOptions>()
    .Bind(builder.Configuration.GetSection("Email"))
    .Validate(o => !string.IsNullOrWhiteSpace(o.Host), "Email:Host is required")
    .Validate(o => o.Port is > 0 and < 65536, "Email:Port must be valid")
    .ValidateOnStart(); // fail fast at startup
```

### Use with IOptionsMonitor (supports changes)

```csharp
public sealed class EmailSender
{
    private readonly IOptionsMonitor<EmailOptions> _options;

    public EmailSender(IOptionsMonitor<EmailOptions> options)
    {
        _options = options;
    }

    public void Send(string to, string subject)
    {
        var cfg = _options.CurrentValue;
        // use cfg.Host, cfg.Port
    }
}
```

---

**6) Factory injection (runtime values)**

```csharp
public interface IReportGenerator
{
    string Generate();
}

public sealed class ReportGenerator : IReportGenerator
{
    private readonly string _tenantId;

    public ReportGenerator(string tenantId) => _tenantId = tenantId;

    public string Generate() => $"Report for tenant: {_tenantId}";
}

// Factory registration
builder.Services.AddTransient<Func<string, IReportGenerator>>(sp =>
    tenantId => new ReportGenerator(tenantId));
```

Usage:

```csharp
app.MapGet("/report/{tenantId}", (string tenantId, Func<string, IReportGenerator> factory) =>
{
    var gen = factory(tenantId);
    return gen.Generate();
});
```

---

**7) Open generics example**

```csharp
public interface IRepository<T>
{
    Task<T?> GetAsync(int id);
}

public sealed class Repository<T> : IRepository<T>
{
    public Task<T?> GetAsync(int id) => Task.FromResult<T?>(default);
}

// Register open generic
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
```

---

 **8) Conditional injection (simple pattern using a factory)**

```csharp
public interface IPaymentGateway { string Name { get; } }
public sealed class StripeGateway : IPaymentGateway { public string Name => "Stripe"; }
public sealed class PaypalGateway : IPaymentGateway { public string Name => "PayPal"; }

builder.Services.AddSingleton<StripeGateway>();
builder.Services.AddSingleton<PaypalGateway>();

builder.Services.AddSingleton<IPaymentGateway>(sp =>
{
    var useStripe = sp.GetRequiredService<IConfiguration>().GetValue<bool>("Payments:UseStripe");
    return useStripe ? sp.GetRequiredService<StripeGateway>() : sp.GetRequiredService<PaypalGateway>();
});
```

---



### 1) What is a dependency?
A dependency is something a class needs to do its work (like a logger, DB, or API client).  
If the class creates it inside, the class becomes tightly coupled and hard to test.

### 2) What is DI in one line?
DI means the app **provides** a class’s dependencies instead of the class creating them.

### 3) Why is DI useful?
It makes code easier to test, easier to change, and easier to maintain.

### 4) What is the DI container?
A container is a “factory + storage” that knows how to build objects and give them to you.

### 5) Does ASP.NET Core have DI built in?
Yes. ASP.NET Core includes a built-in DI container.

### 6) What is constructor injection?
You request dependencies through the constructor parameters.

### 7) What is `AddSingleton`?
Register one instance for the app’s entire lifetime.

### 8) What is `AddScoped`?
Register one instance per request (per scope).

### 9) What is `AddTransient`?
Register a new instance every time you ask.

### 10) Which lifetime is best for EF Core DbContext?
Scoped. Because it should live for one request and then be disposed.

### 11) What happens if you put user-specific data into a singleton?
Users can leak into each other because the same instance is shared.

### 12) Can controllers receive DI services?
Yes. Controller constructor injection is the standard.

### 13) Can minimal APIs receive DI services?
Yes. Add them as parameters in the handler.

### 14) Can middleware use DI?
Yes. Middleware can use constructor DI or method parameter injection.

### 15) What is a “service” in DI?
Any registered dependency (interface/implementation) the container can provide.

### 16) What is `GetRequiredService<T>()`?
Resolve a service and throw if it’s missing (better than returning null).

### 17) What is configuration in ASP.NET Core?
A system to read settings from appsettings.json, env vars, secrets, etc.

### 18) What is the options pattern?
A way to bind config to a typed class like `EmailOptions`.

### 19) What is `IOptions<T>` for?
Read typed configuration in a safe and clean way.

### 20) What is `IServiceProvider`?
The object used to resolve services from the container.

### 21) Should you inject IServiceProvider everywhere?
No. Prefer explicit dependencies. Use IServiceProvider only when truly needed.

### 22) What is a scope?
A boundary where scoped services are created and later disposed.

### 23) What disposes scoped services?
The scope does (usually the web request scope).

### 24) Can DI automatically dispose IDisposable services?
Yes, when their lifetime ends (scope ends / app ends).

### 25) What is the simplest DI mistake?
Forgetting to register a service and getting runtime resolution errors.

---


### 26) What is the “composition root”?
The place where you register dependencies (Program.cs / Startup configuration).  
It’s like wiring all your Lego parts before building the model.

### 27) What’s the difference between interface vs concrete registration?
Interface registration hides implementation details and makes swapping easier.

### 28) How do you register one interface to one class?
`AddScoped<IMyService, MyService>()`.

### 29) How do you register a concrete type without interface?
`AddSingleton<MyService>()` then inject `MyService`.

### 30) Why is scoped lifetime “per request”?
Because ASP.NET Core creates one scope for each HTTP request.

### 31) What happens to scoped services in background services?
There is no request scope, so you must create a scope manually.

### 32) Why is injecting a scoped service into a singleton dangerous?
Because the singleton would hold a reference to a scoped object that gets disposed or represents one request forever.

### 33) How do you fix scoped-in-singleton?
Inject `IServiceScopeFactory` and create a scope when needed.

### 34) How do you inject services into Razor Pages?
Use constructor injection in the page model.

### 35) How do you inject into middleware without using constructor injection?
You can add parameters to `InvokeAsync(HttpContext, SomeService s)` and DI will supply them.

### 36) What is `IOptionsSnapshot<T>`?
It’s scoped. It reads options per request (great for updated config between requests).

### 37) What is `IOptionsMonitor<T>`?
It supports change notifications and updates values without restarting.

### 38) When should you use IOptions vs Snapshot vs Monitor?
- IOptions: simple, stable config  
- Snapshot: you want per-request refresh  
- Monitor: you want live updates and OnChange

### 39) How do you validate options?
Use `.Validate(...)` and optionally `.ValidateOnStart()` to fail fast.

### 40) What does ValidateOnStart do?
It checks options at startup so you don’t discover misconfig in production later.

### 41) What is service resolution?
When the container builds objects by looking at constructor dependencies recursively.

### 42) What is “captive dependency”?
A long-lived service (singleton) capturing a shorter-lived service (scoped/transient).  
This causes bugs/disposal issues.

### 43) Transient inside singleton is always bad?
Not always. If transient is stateless and doesn’t hold scoped dependencies, it can be okay.  
But be careful: you may accidentally create a lot of objects.

### 44) How to register HttpClient correctly?
Use `AddHttpClient()` (HttpClientFactory) to avoid socket exhaustion.

### 45) Why not new HttpClient() per request?
It can exhaust sockets and degrade performance due to TCP reuse issues.

### 46) How do you register multiple implementations of an interface?
Register multiple, then inject `IEnumerable<IMyService>`.

### 47) How to choose one implementation at runtime?
Use a factory delegate or strategy pattern with configuration-based selection.

### 48) What is open generic registration?
Register `IRepository<T>` once and DI can create `IRepository<User>` etc.

### 49) Why are open generics useful?
They reduce repeated registrations and enforce consistent patterns.

### 50) What is the options reload behavior?
With file-based configuration and reload enabled, changes can propagate to IOptionsMonitor.

### 51) Why might options not reload in containers?
Config might come from env vars (no reload), or files may not change, or no reload provider.

### 52) What is IServiceProvider used for in advanced cases?
Dynamic resolution, plugins, factories, reflection-based activation.

### 53) What’s the danger of using IServiceProvider directly everywhere?
It hides dependencies (service locator anti-pattern) and makes code harder to test.

### 54) What is a DI factory pattern?
Register a function that creates objects with runtime inputs.

### 55) How do you create scopes manually?
Use `IServiceScopeFactory.CreateScope()`.

### 56) What is service provider validation?
A startup check that catches missing registrations and some lifetime issues early.

### 57) When should you enable validation?
In development and CI to fail fast; evaluate cost for production.

### 58) What does “resolve scoped from root” mean?
Trying to resolve a scoped service from the app root provider (outside a scope).  
It can throw or cause incorrect lifetime behavior.

### 59) How do you inject services into BackgroundService safely?
Inject singleton dependencies directly; create scopes for scoped dependencies.

### 60) What is the cleanest DI design principle?
Make dependencies explicit: constructor injection + minimal use of IServiceProvider.

---


### 61) What is the “service locator” anti-pattern?
Using IServiceProvider inside classes to pull dependencies whenever you want.  
It hides required dependencies and makes unit testing harder.

### 62) How do you detect captive dependencies?
Enable container validation and review lifetimes: singleton should not depend on scoped.

### 63) What happens if you register DbContext as singleton?
It can cause concurrency issues, stale tracking, memory leaks, and incorrect behavior across requests.

### 64) Why is scoped good for DbContext?
Each request gets its own unit-of-work-like context; it’s disposed safely.

### 65) Can a scoped service depend on transient?
Yes. The transient becomes effectively scoped because it’s created inside that scope.

### 66) Can a scoped service depend on singleton?
Yes. Singleton is longer-lived, safe for shared stateless services.

### 67) Can a transient depend on a scoped service?
Yes, if it is resolved inside a scope. But if resolved from root, it can fail.

### 68) Why does conditional injection get tricky?
Because DI is designed for static graphs. Dynamic decisions must be coded via factories/strategies.

### 69) What is a strategy pattern in DI?
Register multiple strategies and choose one at runtime based on context/config.

### 70) What is keyed/named services concept?
You want different implementations identified by a key/name.  
In modern .NET, keyed services exist; otherwise use factories or dictionaries.

### 71) What is a factory injection best practice?
Prefer `Func<TKey, TService>` or a small factory interface rather than passing IServiceProvider.

### 72) What is the difference between IOptionsMonitor and Snapshot in web apps?
Snapshot refreshes per request; Monitor updates live and can notify on change.

### 73) Why can options reload be dangerous?
If config changes in the middle of operations, behavior changes. Use with care and log changes.

### 74) How do you validate options using data annotations?
Use `.ValidateDataAnnotations()` and decorate properties with attributes like `[Required]`.

### 75) What happens if validation fails and ValidateOnStart is enabled?
App fails at startup, which is good because it prevents a broken app from running.

### 76) How do you register services by scanning assemblies?
Use Scrutor to scan and register by conventions.

### 77) Why is Scrutor useful?
Large apps have many services; scanning reduces repetitive registration code.

### 78) What is an example Scrutor convention?
Register all classes ending with `Service` as their interfaces.

### 79) What is an example pitfall with scanning?
You might accidentally register unwanted types or conflicting registrations.

### 80) What is DI scope in Minimal APIs?
Same as normal request scope: one scope per HTTP request.

### 81) Can middleware be singleton?
Middleware is often created once, but its dependencies matter.  
Never capture scoped services in middleware constructor.

### 82) How do you safely use scoped services in middleware?
Resolve them per request using InvokeAsync parameter injection or via HttpContext.RequestServices.

### 83) What is HttpContext.RequestServices?
It’s the request scope service provider (safe place to resolve scoped services for that request).

### 84) How do you create a child scope inside a request?
Usually unnecessary; but you can if you want isolated lifetimes. Use IServiceScopeFactory.

### 85) One-line interview summary of DI in ASP.NET Core
ASP.NET Core DI builds objects for you using registrations and lifetimes, creating scoped services per request and encouraging explicit constructor injection for clean, testable code.

---

## Scrutor: Auto-registration (example)

> Install:
> `dotnet add package Scrutor`

```csharp
using Scrutor;

builder.Services.Scan(scan => scan
    .FromApplicationDependencies()
    .AddClasses(c => c.Where(t => t.Name.EndsWith("Service")))
        .AsImplementedInterfaces()
        .WithScopedLifetime());
```

---

## Key Takeaways

- Prefer **constructor injection**; avoid service locator.
- Learn lifetimes: **Singleton / Scoped / Transient** (interview favorite).
- Never inject **scoped** into **singleton**; create scopes in background services.
- Use **Options pattern** for config, and validate options early.
- Use factories/strategies for conditional injection.
- Use Scrutor carefully to reduce registration boilerplate.
