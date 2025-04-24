# .NET Core Interview Questions

![.NET Architecture](../assets/dotnet-architecture.png)

## 1. What is .NET Core?
**Answer:**  
.NET Core is a modern, cross-platform, high-performance framework for building cloud-based and IoT applications.

---

## 2. How do you create a REST API in .NET Core?
**Answer:**  
Use the `dotnet new webapi` template and define routes using attributes.

**Sample Code:**
```csharp
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    [HttpGet]
    public IActionResult Get() => Ok(new[] { "Product1", "Product2" });
}
```
