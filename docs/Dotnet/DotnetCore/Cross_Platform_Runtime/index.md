### 1. What platforms can ASP.NET Core applications run on?
ASP.NET Core applications can run on **Windows, macOS, and Linux** because they are built on the **cross-platform .NET runtime**.

---

### 2. What is the .NET SDK?
The .NET SDK is a development toolkit that includes:
- Compiler
- CLI tools (`dotnet build`, `dotnet run`)
- Libraries
- .NET Runtime  
It is required for **building and developing** applications.

---

### 3. What is the .NET Runtime?
The .NET Runtime is the execution environment required to **run** a compiled .NET application.  
Production servers typically need only the runtime, not the full SDK.

---

### 4. What is a Runtime Identifier (RID)?
A RID identifies the target **OS and CPU architecture** for deployment.

Examples:
- `win-x64`
- `linux-x64`
- `osx-arm64`

---

### 5. Is file handling case-sensitive in ASP.NET Core?
It depends on the operating system:
- Windows → case-insensitive
- Linux/macOS → case-sensitive

---

### 6. Can ASP.NET Core read environment variables?
Yes. ASP.NET Core automatically reads environment variables into its **configuration system**.

---

### 7. Difference between .NET SDK and .NET Runtime?

| SDK | Runtime |
|---|---|
| Used for development | Used for execution |
| Includes compiler & CLI tools | Only runtime libraries |
| Required on developer machines | Required on production servers |

---

### 8. How do you run an ASP.NET Core app on Linux?
1. Install .NET Runtime or SDK  
2. Publish the app:
```bash
dotnet publish -c Release
```
3. Run
```bash
dotnet MyApp.dll
```
### 9. What are platform-specific behaviors in ASP.NET Core?

Platform-specific behaviors refer to how an ASP.NET Core application behaves differently depending on the operating system it is running on (Windows, Linux, or macOS).  
Even though ASP.NET Core is cross-platform, certain OS-level characteristics still affect application behavior.

---

**File system case sensitivity**

```bash
- **Windows**
  - File system is case-insensitive
  - `Config.json` and `config.json` are treated as the same file

- **Linux / macOS**
  - File system is case-sensitive
  - `Config.json` and `config.json` are treated as different files

**Impact:**  
An application that works on Windows may fail on Linux if file names are not referenced using exact casing.
```
---

**File path separators**

```bash
- **Windows**
  - Uses backslash (`\`) as the path separator  
  - Example: `C:\Logs\App.log`

- **Linux / macOS**
  - Uses forward slash (`/`) as the path separator  
  - Example: `/var/log/app.log`

**Best Practice:**  
Always use platform-independent APIs such as `Path.Combine()` instead of hardcoding file paths.
```
---

**Permissions**

```bash
- **Windows**
  - Uses Access Control Lists (ACL)
  - Permissions are assigned to users and roles

- **Linux**
  - Uses User / Group / Others permission model
  - Managed using `chmod` and `chown`

**Impact:**  
Improper permissions can prevent the application from reading files, writing logs, or binding to ports.
```
---

**Service hosting mechanisms**

```bash
- **Windows**
  - Hosted using IIS or Windows Services

- **Linux**
  - Hosted using systemd
  - Often placed behind Nginx or Apache as a reverse proxy

**Impact:**  
Application startup, shutdown, restart, and logging behavior differs based on the hosting mechanism.

```
---

**Environment variable handling**
```bash
- **Windows**
  - Environment variables are case-insensitive

- **Linux**
  - Environment variables are case-sensitive

**Impact:**  
Incorrect casing of environment variables can cause wrong configuration files to load in Linux.
```
---

**Summary**

When building cross-platform ASP.NET Core applications, developers must carefully handle:

- File name casing
- File path separators
- Permission models
- Hosting mechanisms
- Environment variable casing

Proper handling ensures smooth deployment and execution across all operating systems.

---

### 10. How do environment variables differ on Windows and Linux?

| Windows | Linux |
|-------|-------|
| Case-insensitive | Case-sensitive |
| Set via PowerShell / System UI | Set via shell or systemd |
| Registry-based | Process-based |

**Example (Linux)**

    export ASPNETCORE_ENVIRONMENT=Production

This variable controls:

- Loading appsettings.Production.json
- Logging levels
- Error handling behavior

---

### 11. What is systemd?

systemd is the Linux service manager used to:

- Run applications as background services  
- Start applications automatically on boot  
- Restart applications on failure  
- Manage application lifecycle  

ASP.NET Core applications are commonly hosted as systemd services on Linux servers.

---

### 12. Difference between systemd and Windows Services?

| systemd | Windows Service |
|--------|----------------|
| Linux-based | Windows-based |
| Managed via systemctl | Managed via Service Manager |
| Process-oriented | Executable-oriented |
| Uses unit files | Uses service configuration |

---


### 13. How does RID affect deployment?

RID (Runtime Identifier) determines:

- Platform-specific binaries  
- Native dependency resolution  
- Self-contained vs framework-dependent deployment  

**Example**

    dotnet publish -r linux-x64 --self-contained true

This produces:

- Linux-compatible executable  
- Bundled .NET runtime  
- OS-specific native libraries  

---

### 14. What is native dependency handling in .NET?

Native dependency handling allows .NET to load OS-specific native libraries based on the RID.

Key points:

- Some NuGet packages ship native binaries  
- .NET selects correct binaries at runtime  
- Incorrect RID configuration causes runtime failures  

---

### 15. What file system issues commonly occur in production?

Common issues include:

- Case-sensitive file paths  
- Hardcoded Windows-style paths  
- Missing execute permissions on Linux  

**Example Issue**

    File.ReadAllText("Config.json");

This works on Windows but fails on Linux if the file name is actually config.json.

---

### 16. How do you debug ASP.NET Core apps cross-platform?

Common approaches include:

- Visual Studio (Windows / macOS)  
- VS Code with C# extension  
- Remote debugging  
- Docker container attach debugging  
- Logging and diagnostics  

ASP.NET Core provides a consistent debugging experience across platforms.

---

### 17. What production constraints exist on Linux?

- File permission restrictions  
- Port binding limitations (ports below 1024)  
- SELinux / AppArmor policies  
- Case-sensitive file paths  
- Limited system access  

---

### 18. How does ASP.NET Core handle permissions?

ASP.NET Core respects OS-level security:

- Linux → User / Group permissions  
- Windows → Access Control Lists (ACLs)  

If permissions are insufficient, the application fails at runtime.

---

### 19. Why is ASP.NET Core ideal for containers?

- Cross-platform runtime  
- Small memory footprint  
- Self-contained deployments  
- Linux-first ecosystem  
- No IIS dependency  

---

### 20. Real-world cross-platform issue example

An ASP.NET Core application worked on Windows but failed on Linux due to case-sensitive file paths.  
The issue was resolved by enforcing consistent file naming conventions and using Path.Combine instead of hardcoded paths.

---



