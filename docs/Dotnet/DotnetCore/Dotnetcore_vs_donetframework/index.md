
### Q1. What is .NET Framework?
.NET Framework is a **Windows-only, monolithic development platform** used to build desktop and web applications. It is tightly coupled with Windows OS and IIS.

---

### Q2. What is .NET Core?
.NET Core is a **cross-platform, open-source, modular framework** designed for high performance, cloud-native, and modern application development.

---

### Q3. Key difference between .NET Core and .NET Framework?
| .NET Framework | .NET Core |
|--------------|-----------|
| Windows-only | Cross-platform |
| Monolithic | Modular |
| Closed-source | Open-source |
| IIS-dependent | Kestrel-based |

---


### Q4. Which platforms are supported by .NET Framework?
- Windows only

---

### Q5. Which platforms are supported by .NET Core?
- Windows
- Linux
- macOS
- Docker & Kubernetes

---


### Q6. Is WebForms supported in .NET Core?
❌ No. WebForms is not supported in .NET Core.

---

### Q7. What web frameworks are supported in .NET Core?
- MVC
- Razor Pages
- Web API
- Blazor
- Minimal APIs

---


### Q8. How is configuration handled?
- .NET Framework: `web.config`
- .NET Core: `appsettings.json`, environment variables, secrets

---



### Q9. Explain architecture differences between .NET Core and .NET Framework.
.NET Framework uses a **monolithic architecture**, while .NET Core uses a **modular, package-based architecture** delivered via NuGet.

---


### Q10. What runtime does .NET Framework use?
- CLR (Common Language Runtime)

---

### Q11. What runtime does .NET Core use?
- CoreCLR (cross-platform runtime)

---


### Q12. Difference between CLR and CoreCLR?
| CLR | CoreCLR |
|---|---|
| Windows-only | Cross-platform |
| Monolithic | Lightweight |
| OS-bound | Cloud-ready |

---

### Q13. What is CoreFX?
CoreFX is the **modular Base Class Library (BCL)** for .NET Core.

---


### Q14. Is Dependency Injection built-in?
- .NET Framework: ❌ No
- .NET Core: ✅ Yes (built-in DI container)s

---


### Q15. What is Kestrel?c
Kestrel is a **high-performance, cross-platform web server** used by ASP.NET Core.

---

### Q16. IIS vs Kestrel?@
| IIS | Kestrel |
|---|---|
| Windows-only | Cross-platform | 
| Heavy | Lightweight |
| OS-level | App-level | 

---


### Q17. Hosting options in .NET Framework?
- IIS only

---

### Q18. Hosting options in .NET Core?
- Kestrel standalone
- IIS + Kestrel
- NGINX + Kestrel
- Docker / Kubernetes

---


### Q19. Why is .NET Core faster?
- Optimized runtime
- Async-first design
- Reduced memory allocations
- Lightweight middleware pipeline

---


### Q20. What is self-contained deployment?
Deployment where the application ships with its own runtime, producing a **self-contained executable**.

---

### Q21. Does .NET Core support side-by-side versions?
✅ Yes. Multiple .NET versions can run on the same machine.

---



### Q22. Why are enterprises moving to .NET Core?
- Performance improvements
- Cross-platform deployment
- Cloud-native readiness
- Better DevOps integration

---


### Q23. What are common migration challenges?
- WebForms dependency
- Third-party library compatibility
- Windows-specific APIs
- AppDomains removal

---


### Q24. Can WebForms apps be migrated to .NET Core?
❌ Direct migration is not possible. Requires rewrite to MVC, Razor, or Blazor.

---

### Q25. What migration approaches are used?
- Rewrite
- Strangler pattern
- API-first migration
- Hybrid hosting

---


### Q26. How does .NET Core improve CI/CD?
- Cross-platform build agents
- CLI-first tooling (`dotnet`)
- Docker-friendly builds
- Faster pipelines

---


### Q27. What is package-based framework model?
Framework features are delivered as **NuGet packages**, not system-installed binaries.

---

### Q28. Benefits of package-based model?
- Smaller app size
- Version control per app
- Side-by-side execution
- Faster upgrades

---



### Q29. What is Mono?
Mono is a cross-platform .NET runtime originally used for mobile and embedded systems.

---

### Q30. What did .NET 6/7 unify?
- .NET Core
- Mono
- Xamarin  
into **one unified .NET platform**

---


### Q31. How do you design an enterprise migration strategy?
- Identify dependencies
- Migrate APIs first
- Use strangler pattern
- Run legacy and new systems in parallel

---

### Q32. What should NOT be migrated?
- Stable WebForms apps with no future change
- Apps with unsupported third-party libraries
- Apps with heavy OS-level dependencies

---


### Q33. Why is .NET Core cloud-native?
- Stateless services
- Container-ready
- Horizontal scalability
- Kubernetes-friendly

---

### Q34. .NET Core vs .NET Framework for microservices?
.NET Core is preferred due to:
- Lightweight runtime
- Fast startup
- Smaller containers
- Better scalability

---


### Q35. When would you still use .NET Framework?
- Legacy WebForms applications
- Windows-only desktop apps
- Applications with unsupported dependencies

---

### Q36. How do you justify migration to leadership?
- Reduced infrastructure cost
- Improved scalability
- Faster deployments
- Long-term maintainability

---

