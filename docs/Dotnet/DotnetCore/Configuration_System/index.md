

---

## What is configuration?

Configuration is the app’s way to read settings like:
- connection strings
- API keys (preferably from secrets managers)
- feature flags
- timeouts
- URLs
- logging levels

ASP.NET Core configuration is built on **key-value pairs**:
- Key: `Logging:LogLevel:Default`
- Value: `Information`

---

## Configuration providers

A **provider** is a source of configuration values.

Common providers:
- JSON files (`appsettings.json`)
- Environment variables
- Command-line arguments
- User secrets (dev)
- INI files
- XML files
- In-memory
- Azure App Configuration
- Azure Key Vault (secrets)

**Important:** You can combine many providers at once.

---

## Provider precedence (who wins)

Providers are added in an order.  
**The last provider added wins** when keys conflict.

**Kid-simple:**  
If you write “volume=5” in a notebook, then later you text “volume=10”, the latest message wins.

---

# Code Samples (Copy/Paste)

## 1) Reading configuration values (basic)

```csharp
var builder = WebApplication.CreateBuilder(args);

// Read simple value
var timeoutSeconds = builder.Configuration.GetValue<int>("MyApp:TimeoutSeconds");

// Read connection string
var cs = builder.Configuration.GetConnectionString("DefaultConnection");

var app = builder.Build();
app.MapGet("/", () => new { timeoutSeconds, cs });
app.Run();
```

---

## 2) Add JSON with ReloadOnChange

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile(
    path: "mysettings.json",
    optional: true,
    reloadOnChange: true
);
```

---

## 3) Add INI + XML providers

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddIniFile("settings.ini", optional: true, reloadOnChange: true);
builder.Configuration.AddXmlFile("settings.xml", optional: true, reloadOnChange: true);
```

---

## 4) Add in-memory configuration

```csharp
var builder = WebApplication.CreateBuilder(args);

var inMemory = new Dictionary<string, string?>
{
    ["MyApp:FeatureX"] = "true",
    ["MyApp:TimeoutSeconds"] = "30"
};

builder.Configuration.AddInMemoryCollection(inMemory);
```

---

## 5) Options pattern binding + validation

```csharp
public sealed class MyAppOptions
{
    public int TimeoutSeconds { get; init; }
    public string BaseUrl { get; init; } = "";
}

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddOptions<MyAppOptions>()
    .Bind(builder.Configuration.GetSection("MyApp"))
    .Validate(o => o.TimeoutSeconds > 0, "TimeoutSeconds must be > 0")
    .Validate(o => Uri.IsWellFormedUriString(o.BaseUrl, UriKind.Absolute), "BaseUrl must be a valid URL")
    .ValidateOnStart();

var app = builder.Build();

app.MapGet("/cfg", (Microsoft.Extensions.Options.IOptions<MyAppOptions> opt) => opt.Value);
app.Run();
```

---

## 6) Command-line args override example

Run:
```bash
dotnet run --MyApp:TimeoutSeconds=99
```

In code:
```csharp
var builder = WebApplication.CreateBuilder(args);
var timeout = builder.Configuration.GetValue<int>("MyApp:TimeoutSeconds");
```

---

## 7) Environment variables mapping (nested keys)

Windows PowerShell:
```powershell
$env:MyApp__TimeoutSeconds="45"
dotnet run
```

Linux/macOS:
```bash
export MyApp__TimeoutSeconds=45
dotnet run
```

In ASP.NET Core, `__` maps to `:` (nested keys).

---

## 8) Azure App Configuration (typical pattern)

> Packages commonly used:
> - `Microsoft.Extensions.Configuration.AzureAppConfiguration`
> - `Azure.Identity`

```csharp
var builder = WebApplication.CreateBuilder(args);

var appConfigConn = builder.Configuration["AppConfig:ConnectionString"];

if (!string.IsNullOrWhiteSpace(appConfigConn))
{
    builder.Configuration.AddAzureAppConfiguration(appConfigConn);
}

var app = builder.Build();
app.MapGet("/", () => "OK");
app.Run();
```

---

## 9) Azure Key Vault (typical pattern)

> Packages commonly used:
> - `Azure.Identity`
> - `Azure.Security.KeyVault.Secrets`
> - `Azure.Extensions.AspNetCore.Configuration.Secrets`

```csharp
using Azure.Identity;

var builder = WebApplication.CreateBuilder(args);

var vaultUri = builder.Configuration["KeyVault:Uri"];

if (!string.IsNullOrWhiteSpace(vaultUri))
{
    builder.Configuration.AddAzureKeyVault(new Uri(vaultUri), new DefaultAzureCredential());
}

var app = builder.Build();
app.MapGet("/", () => "OK");
app.Run();
```

---

## 10) ReloadOnChange with IOptionsMonitor

```csharp
public sealed class FeatureOptions
{
    public bool FeatureX { get; init; }
}

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddOptions<FeatureOptions>()
    .Bind(builder.Configuration.GetSection("Features"));

var app = builder.Build();

app.MapGet("/feature", (Microsoft.Extensions.Options.IOptionsMonitor<FeatureOptions> mon) =>
{
    // CurrentValue updates if the underlying providers support reload
    return new { mon.CurrentValue.FeatureX };
});

app.Run();
```

---

## JSON files provider

JSON is the default in ASP.NET Core (`appsettings.json`).

Typical structure:
```json
{
  "MyApp": {
    "TimeoutSeconds": 30,
    "BaseUrl": "https://example.com"
  }
}
```

Access:
- `MyApp:TimeoutSeconds`
- `MyApp:BaseUrl`

---

## Environment variables provider

Environment variables are great for production because:
- easy to set in deployments
- avoids storing secrets in source control

Nested keys use `__`:
- `MyApp__TimeoutSeconds` → `MyApp:TimeoutSeconds`

---

## Command-line args provider

Command line is useful for:
- quick overrides in CI pipelines
- local experiments

Example:
- `--MyApp:TimeoutSeconds=60`

---

## User Secrets provider

User secrets are for **development only**:
- stored outside repo
- not committed to Git
- ideal for local API keys

---

## INI files provider

INI is older but still useful for some legacy environments.

---

## XML files provider

XML is common in older .NET apps and some enterprise configs.

---

## In-memory configuration provider

Useful for:
- tests
- dynamic config created in code
- overriding values programmatically

---

## Binding configuration & strongly typed classes

Binding means mapping config keys into a class:

```csharp
public sealed class EmailOptions
{
    public string Host { get; init; } = "";
    public int Port { get; init; }
}
```

Then bind:
- `builder.Configuration.GetSection("Email").Bind(emailOptions);`
or better with options pattern.

---

## Options pattern

Options pattern is the recommended approach:
- clean
- testable
- supports validation and change monitoring

Main interfaces:
- `IOptions<T>`: simple, usually stable
- `IOptionsSnapshot<T>`: per-request refresh (scoped)
- `IOptionsMonitor<T>`: supports reload + OnChange

---

## ReloadOnChange

Reload happens only if the provider supports it, like:
- JSON with `reloadOnChange: true`
- some cloud providers also support refresh patterns

When values change:
- `IOptionsMonitor<T>.CurrentValue` updates
- `OnChange` can trigger actions

---

## Nested JSON configuration

Nested JSON becomes colon-separated keys:
- `Logging:LogLevel:Default`
- `MyApp:Features:FeatureX`

Environment variables use `__` for nesting:
- `MyApp__Features__FeatureX=true`

---

## Azure App Configuration

Azure App Configuration is a centralized config store (often used for):
- shared config across services
- feature flags
- dynamic refresh patterns

Typical production pattern:
- app reads base config locally
- adds Azure App Config provider
- optionally configures refresh and feature flags

---

## Azure Key Vault

Key Vault is for secrets:
- passwords
- API keys
- certificates

Best practice:
- store secrets in Key Vault
- use Managed Identity / DefaultAzureCredential
- avoid secrets in appsettings.json

---


---


### 1) What is the ASP.NET Core configuration system?
A system that reads settings from many sources (files, env vars, cloud) and exposes them as key-value pairs.

### 2) What is a configuration provider?
A component that loads configuration values from a specific source like JSON or environment variables.

### 3) Can you use multiple providers together?
Yes. ASP.NET Core combines them into one configuration.

### 4) What is the default config file?
`appsettings.json`.

### 5) What is the key format for nested JSON?
Colon-separated keys, like `MyApp:TimeoutSeconds`.

### 6) How do you read a value?
`builder.Configuration["Key"]` or `GetValue<T>("Key")`.

### 7) What is `GetConnectionString` used for?
Reading connection strings from the `ConnectionStrings` section.

### 8) What is the environment variables provider used for?
To supply config from OS/deployment without editing files.

### 9) Why are env vars good in production?
They avoid committing secrets and are easy for CI/CD to set.

### 10) What is command-line provider used for?
Quick overrides during run or CI pipeline.

### 11) What are user secrets?
A development-only secret store outside source control.

### 12) Why not use user secrets in production?
Because production uses secure secret stores (Key Vault) and deployment-managed values.

### 13) What is in-memory configuration used for?
Testing or overriding values in code.

### 14) What is binding?
Mapping config values into a strongly typed object.

### 15) Why use strongly typed classes?
Less string mistakes, easier validation, better IDE support.

### 16) What is the options pattern?
The recommended way to use strongly typed configuration via DI.

### 17) What is ReloadOnChange?
A feature where config reloads when the underlying file changes (if enabled).

### 18) Does ReloadOnChange work for every provider?
No. Only providers that support change tracking.

### 19) What is nested JSON?
JSON objects inside objects, creating hierarchical configuration.

### 20) How do env vars represent nested JSON?
With `__` (double underscore).

### 21) What is XML provider?
Loads config from XML files.

### 22) What is INI provider?
Loads config from INI files.

### 23) What is Azure App Configuration?
A cloud store for centralized configuration and feature flags.

### 24) What is Azure Key Vault?
A cloud service to store and protect secrets.

### 25) What’s the difference between App Configuration and Key Vault?
App Configuration is for settings/feature flags; Key Vault is for secrets.

### 26) What is `builder.Configuration`?
The final combined configuration built from providers.

### 27) What is a “section”?
A logical grouping like `MyApp` in JSON.

### 28) How do you access a section?
`builder.Configuration.GetSection("MyApp")`.

### 29) What is the simplest common mistake?
Misspelling a key and silently getting null/0.

### 30) One-line summary
Providers supply values; configuration merges them; binding/options make usage safe.

---


### 31) How is provider precedence decided?
By order: providers added later override earlier providers.

### 32) If appsettings.json and env var both set the same key, which wins?
The env var usually wins because it is added later by default host setup.

### 33) Why is that “env vars win” behavior useful?
It lets deployments override config without editing files.

### 34) What is a good pattern for secrets?
Non-secret config in JSON; secrets in Key Vault or env vars.

### 35) Why is storing secrets in appsettings.json risky?
It can be committed to Git and leaked.

### 36) What does `reloadOnChange: true` do for JSON files?
If the file changes on disk, configuration reloads automatically.

### 37) Why might reload not work in containers?
Files may not change or may not be watched; config often comes from env vars.

### 38) What is the difference between `Configuration["Key"]` and `GetValue<T>()`?
Indexer returns string; GetValue converts to a type and allows defaults.

### 39) What happens if conversion fails in GetValue?
It can throw or return default depending on usage; validate critical settings.

### 40) How do you bind to a class manually?
Create object and call `Bind(section)`.

### 41) Why prefer options pattern over manual binding?
It integrates with DI, validation, and monitoring.

### 42) What is `IOptions<T>`?
Provides a single snapshot of options (commonly stable).

### 43) What is `IOptionsSnapshot<T>`?
Reads options per request (scoped), useful for changes between requests.

### 44) What is `IOptionsMonitor<T>`?
Supports change notifications and updated `CurrentValue`.

### 45) When should you use IOptionsMonitor?
When you want to react to config changes without restarting.

### 46) What is options validation?
Rules that ensure configuration values are correct.

### 47) Why validate options at startup?
Fail fast—don’t run a broken app in production.

### 48) How do command-line args map to keys?
`--Section:Key=value` format.

### 49) How do env vars map to keys?
`Section__Key=value` maps to `Section:Key`.

### 50) What is the `ConnectionStrings` convention?
`ConnectionStrings:Name` used by `GetConnectionString("Name")`.

### 51) How do you override connection string in env vars?
Set `ConnectionStrings__DefaultConnection`.

### 52) What is Azure App Configuration used for in microservices?
Central config shared across services + feature flags.

### 53) Why use Azure Key Vault with Managed Identity?
No stored credentials; Azure handles secure identity.

### 54) What is the “config is not secret” rule?
Most config is safe in JSON; secrets should go to Key Vault.

### 55) What is the difference between configuration and options?
Configuration is raw key/value store; options is typed + DI-friendly wrapper.

### 56) What is a common way to group settings?
Create sections like `MyApp`, `Features`, `Email`, `Cache`.

### 57) How do you handle nested config in env vars?
Use multiple `__` segments: `MyApp__Features__FeatureX`.

### 58) What is “flat” configuration?
Everything is key/value; nesting is just key naming.

### 59) Why can missing appsettings.{env}.json be dangerous?
The app won’t crash; it just won’t apply overrides (silent misconfiguration).

### 60) How can you detect missing/invalid config early?
Options validation + startup logs.

### 61) Why might XML/INI be used today?
Legacy compatibility and some enterprise environments.

### 62) What is the in-memory provider great for?
Unit tests and overriding config for test scenarios.

### 63) How do you override config in tests?
Add in-memory provider last so it wins.

### 64) What is an example of config layering?
appsettings.json sets defaults; env vars override for production; command line overrides for one-off run.

### 65) Interview one-liner
Configuration is layered providers with precedence; options pattern gives typed, validated access.

---


### 66) What is the biggest configuration interview trap?
Not understanding provider precedence (who overrides whom).

### 67) If you bind options once manually, will it update on reload?
No. Manual binding gives a one-time snapshot. Use IOptionsMonitor for updates.

### 68) Why can ReloadOnChange cause surprising behavior?
Config can change while app is running; you must handle that safely.

### 69) What is a safe way to use reload?
Use feature flags or non-critical toggles; log changes; avoid changing core security settings live.

### 70) What is the difference between “reload” and “refresh” in cloud config?
Reload is local file watcher; cloud refresh often needs polling/refresh middleware.

### 71) Why is Key Vault not a general config store?
It’s optimized for secrets, not large volumes of regular settings.

### 72) How do you handle secrets rotation?
Use Key Vault and clients that can re-fetch; design services to handle updated secrets.

### 73) How do you prevent secrets from appearing in logs?
Never log configuration values blindly; mask sensitive keys.

### 74) Why can configuration keys be case-insensitive?
On many providers (like JSON) keys are treated case-insensitively; but environment variables may differ across OS behavior—use consistent naming.

### 75) What is the danger of using `Configuration["Key"]` everywhere?
Stringly-typed code leads to typos and runtime bugs; prefer options.

### 76) What is “strongly typed configuration” benefit in interviews?
It shows clean design: central config class, validated, DI-injected.

### 77) How do you validate nested configuration?
Bind to nested classes and validate required fields.

### 78) How do you set default values for options?
Use property defaults, or configure options with `.Configure(...)`.

### 79) What is `Configure<TOptions>(IConfiguration)` shortcut?
It binds config section into options via DI.

### 80) How do you support multiple environments with config?
Use appsettings.{env}.json + env var overrides + secrets for sensitive values.

### 81) Why can “it works locally” fail in production config?
Different env vars, missing config files in publish, different environment name.

### 82) What is a robust debugging step for config issues?
Log environment name + critical options validation errors at startup.

### 83) How do you override config in containerized deployments?
Use env vars, mounted config maps, and secret stores.

### 84) What is the difference between ConfigMap and Secret in Kubernetes (conceptually)?
ConfigMap for non-secret config; Secret for sensitive values.

### 85) Why use Azure App Configuration feature flags?
To enable/disable features without redeploying.

### 86) What is a good pattern for “FeatureX”?
Default false in appsettings; enable true in App Configuration or env var for specific environment.

### 87) How do you avoid “configuration sprawl”?
Group settings by feature and use typed options per module.

### 88) How do you handle multiple tenants with config?
Use per-tenant sections or external stores; don’t hardcode.

### 89) One-line summary of providers
Providers are pluggable sources; order determines precedence; options gives safe typed access.

### 90) One-line summary of best practice
Keep defaults in JSON, override with env vars, keep secrets in Key Vault, bind to validated options, and use monitor only when safe.

---

## Key Takeaways

- Configuration is a **layered** system: many providers merged together.
- Order matters: **last provider wins**.
- Use env vars for deployments and Key Vault for secrets.
- Use **Options pattern** for typed access + validation.
- Use ReloadOnChange carefully; not all providers support it.
- Nested keys use `:` in code, `__` in environment variables.
