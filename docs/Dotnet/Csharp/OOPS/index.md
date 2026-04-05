# OOP Concepts in C# Interview Questions

![OOP Concepts in C# Interview Questions](../../../assets/csharp-oop-pillars.svg)

This page focuses on object-oriented design principles in C# rather than general syntax or platform questions.

## 1. Classes and objects

### 1. What is the role of Classes and objects in C# object-oriented design?

**Answer:**

In C# object-oriented design, the term Classes and objects refers to the core object-oriented model used to
create structured program entities. It is part of the foundation a candidate should be able to
explain clearly.

**Sample:**

```csharp
public class OrderLine
{
    public string Sku { get; }
    public int Quantity { get; }
    public decimal UnitPrice { get; }

    public OrderLine(string sku, int quantity, decimal unitPrice)
    {
        Sku = sku;
        Quantity = quantity;
        UnitPrice = unitPrice;
    }
}

public class Order
{
    public List<OrderLine> Lines { get; } = new();
    public decimal Total => Lines.Sum(x => x.Quantity * x.UnitPrice);
}
```

---

### 2. Why is the concept of Classes and objects important in C# object-oriented design?

**Answer:**

This concept matters because it influences the core object-oriented model used to create
structured program entities. Good interview answers connect it to clarity, maintainability,
performance, security, or delivery depending on the situation.

**Sample:**

```csharp
public class OrderLine
{
    public string Sku { get; }
    public int Quantity { get; }
    public decimal UnitPrice { get; }

    public OrderLine(string sku, int quantity, decimal unitPrice)
    {
        Sku = sku;
        Quantity = quantity;
        UnitPrice = unitPrice;
    }
}

public class Order
{
    public List<OrderLine> Lines { get; } = new();
    public decimal Total => Lines.Sum(x => x.Quantity * x.UnitPrice);
}
```

---

### 3. When should a team focus on Classes and objects?

**Answer:**

A team should focus on Classes and objects when the requirement depends on the core object-oriented
model used to create structured program entities. It becomes especially important when design
decisions, scalability, or debugging depend on that area.

**Sample:**

```csharp
public class OrderLine
{
    public string Sku { get; }
    public int Quantity { get; }
    public decimal UnitPrice { get; }

    public OrderLine(string sku, int quantity, decimal unitPrice)
    {
        Sku = sku;
        Quantity = quantity;
        UnitPrice = unitPrice;
    }
}

public class Order
{
    public List<OrderLine> Lines { get; } = new();
    public decimal Total => Lines.Sum(x => x.Quantity * x.UnitPrice);
}
```

---

### 4. How is Classes and objects applied in practice?

**Answer:**

In practice, Classes and objects is applied by making the core object-oriented model used to create
structured program entities explicit in the code, runtime setup, or delivery workflow. The exact
shape depends on the application, but the responsibility should stay predictable.

**Sample:**

```csharp
var order = new Order();
order.Lines.Add(new OrderLine("LAPTOP-15", 1, 89999m));
order.Lines.Add(new OrderLine("MOUSE-WL", 2, 1499m));
Console.WriteLine($"Items={order.Lines.Count}, Total={order.Total}");
```

---

### 5. What strengths does Classes and objects bring?

**Answer:**

The strengths of Classes and objects are better structure, better communication, and better control
over the core object-oriented model used to create structured program entities. It also makes
tradeoffs easier to explain to reviewers, interviewers, and teammates.

**Sample:**

```csharp
public class OrderLine
{
    public string Sku { get; }
    public int Quantity { get; }
    public decimal UnitPrice { get; }

    public OrderLine(string sku, int quantity, decimal unitPrice)
    {
        Sku = sku;
        Quantity = quantity;
        UnitPrice = unitPrice;
    }
}

public class Order
{
    public List<OrderLine> Lines { get; } = new();
    public decimal Total => Lines.Sum(x => x.Quantity * x.UnitPrice);
}
```

---

### 6. What tradeoffs come with Classes and objects?

**Answer:**

The main tradeoff is extra complexity if Classes and objects is introduced without a real need or a
clear understanding of the core object-oriented model used to create structured program entities.
That usually leads to overengineering, hidden bugs, or confusing architecture.

**Sample:**

```csharp
public class UserManager
{
    public void Register() { }
    public void Login() { }
    public void ExportAudit() { }
    public void RebuildSearchIndex() { }
}

// A class exists, but it has become a god object with unrelated responsibilities.
```

---

### 7. How does Classes and objects differ from Encapsulation?

**Answer:**

Classes and objects is centered on the core object-oriented model used to create structured program
entities, while Encapsulation is centered on the hiding of internal state behind controlled access
points. They often work together, but they solve different parts of the topic.

**Sample:**

```csharp
public class PlainOrder
{
    public decimal Total;
}

public class SaferOrder
{
    public decimal Total { get; private set; }
    public void AddCharge(decimal amount) => Total += amount;
}

// Classes and objects define structure. Encapsulation controls how state changes.
```

---

### 8. What is a good real-world example of Classes and objects?

**Answer:**

A strong example is explaining how Classes and objects affects a real feature, production issue,
migration, or architecture decision involving the core object-oriented model used to create
structured program entities. Interviewers usually care more about the reasoning than the definition
alone.

**Sample:**

```csharp
var order = new Order();
order.Lines.Add(new OrderLine("LAPTOP-15", 1, 89999m));
order.Lines.Add(new OrderLine("MOUSE-WL", 2, 1499m));
Console.WriteLine($"Items={order.Lines.Count}, Total={order.Total}");
```

---

### 9. What is a best practice for Classes and objects?

**Answer:**

A good practice is to keep Classes and objects aligned with the actual requirement around the core
object-oriented model used to create structured program entities. Teams should document intent, keep
implementation readable, and validate important paths early.

**Sample:**

```csharp
var order = new Order();
order.Lines.Add(new OrderLine("LAPTOP-15", 1, 89999m));
order.Lines.Add(new OrderLine("MOUSE-WL", 2, 1499m));
Console.WriteLine($"Items={order.Lines.Count}, Total={order.Total}");
```

---

### 10. What is a common mistake around Classes and objects?

**Answer:**

A common mistake is naming Classes and objects without understanding how it affects the core object-
oriented model used to create structured program entities. In real work, that usually appears as
weak design choices, poor debugging, or incomplete explanations.

**Sample:**

```csharp
public class UserManager
{
    public void Register() { }
    public void Login() { }
    public void ExportAudit() { }
    public void RebuildSearchIndex() { }
}

// A class exists, but it has become a god object with unrelated responsibilities.
```

---

### 11. How do you troubleshoot Classes and objects-related issues?

**Answer:**

When troubleshooting Classes and objects, first verify whether the core object-oriented model used
to create structured program entities is behaving as expected. Then check surrounding dependencies,
configuration, logs, runtime behavior, and edge cases before changing the design.

**Sample:**

```csharp
var product = new { Name = "Monitor", Price = 249.99m, Stock = 12 };
Console.WriteLine($"State => Name={product.Name}, Price={product.Price}, Stock={product.Stock}");
```

---

### 12. How does Classes and objects connect to the rest of C# object-oriented design?

**Answer:**

Classes and objects connects to the rest of C# object-oriented design by giving structure to the
core object-oriented model used to create structured program entities. It is one of the pieces that
turns isolated facts into a coherent end-to-end explanation.

**Sample:**

```csharp
public interface IPriceRule
{
    decimal Apply(decimal subtotal);
}

public class PercentageDiscount : IPriceRule
{
    public decimal Apply(decimal subtotal) => subtotal * 0.90m;
}

// Classes provide the model, and interfaces add abstraction and polymorphism.
```

---

## 2. Encapsulation

### 13. What is the role of Encapsulation in C# object-oriented design?

**Answer:**

In C# object-oriented design, the term Encapsulation refers to the hiding of internal state behind controlled
access points. It is part of the foundation a candidate should be able to explain clearly.

**Sample:**

```csharp
public class BankAccount
{
    private decimal _balance;
    public decimal Balance => _balance;

    public void Deposit(decimal amount)
    {
        if (amount <= 0) throw new ArgumentOutOfRangeException(nameof(amount));
        _balance += amount;
    }

    public void Withdraw(decimal amount)
    {
        if (amount > _balance) throw new InvalidOperationException("Insufficient funds.");
        _balance -= amount;
    }
}
```

---

### 14. Why is the concept of Encapsulation important in C# object-oriented design?

**Answer:**

This concept matters because it influences the hiding of internal state behind controlled access
points. Good interview answers connect it to clarity, maintainability, performance, security, or
delivery depending on the situation.

**Sample:**

```csharp
public class BankAccount
{
    private decimal _balance;
    public decimal Balance => _balance;

    public void Deposit(decimal amount)
    {
        if (amount <= 0) throw new ArgumentOutOfRangeException(nameof(amount));
        _balance += amount;
    }

    public void Withdraw(decimal amount)
    {
        if (amount > _balance) throw new InvalidOperationException("Insufficient funds.");
        _balance -= amount;
    }
}
```

---

### 15. When should a team focus on Encapsulation?

**Answer:**

A team should focus on Encapsulation when the requirement depends on the hiding of internal state
behind controlled access points. It becomes especially important when design decisions, scalability,
or debugging depend on that area.

**Sample:**

```csharp
public class BankAccount
{
    private decimal _balance;
    public decimal Balance => _balance;

    public void Deposit(decimal amount)
    {
        if (amount <= 0) throw new ArgumentOutOfRangeException(nameof(amount));
        _balance += amount;
    }

    public void Withdraw(decimal amount)
    {
        if (amount > _balance) throw new InvalidOperationException("Insufficient funds.");
        _balance -= amount;
    }
}
```

---

### 16. How is Encapsulation applied in practice?

**Answer:**

In practice, Encapsulation is applied by making the hiding of internal state behind controlled
access points explicit in the code, runtime setup, or delivery workflow. The exact shape depends on
the application, but the responsibility should stay predictable.

**Sample:**

```csharp
var account = new BankAccount();
account.Deposit(1000m);
account.Withdraw(250m);
Console.WriteLine(account.Balance);
```

---

### 17. What strengths does Encapsulation bring?

**Answer:**

The strengths of Encapsulation are better structure, better communication, and better control over
the hiding of internal state behind controlled access points. It also makes tradeoffs easier to
explain to reviewers, interviewers, and teammates.

**Sample:**

```csharp
public class BankAccount
{
    private decimal _balance;
    public decimal Balance => _balance;

    public void Deposit(decimal amount)
    {
        if (amount <= 0) throw new ArgumentOutOfRangeException(nameof(amount));
        _balance += amount;
    }

    public void Withdraw(decimal amount)
    {
        if (amount > _balance) throw new InvalidOperationException("Insufficient funds.");
        _balance -= amount;
    }
}
```

---

### 18. What tradeoffs come with Encapsulation?

**Answer:**

The main tradeoff is extra complexity if Encapsulation is introduced without a real need or a clear
understanding of the hiding of internal state behind controlled access points. That usually leads to
overengineering, hidden bugs, or confusing architecture.

**Sample:**

```csharp
public class EmployeeProfile
{
    public string Name { get; set; }
    public decimal Salary { get; set; }
    public string TaxCode { get; set; }
}

// If everything is writable from anywhere, invariants are easy to break.
```

---

### 19. How does Encapsulation differ from Abstraction?

**Answer:**

Encapsulation is centered on the hiding of internal state behind controlled access points, while
Abstraction is centered on the focus on essential behavior while hiding unnecessary implementation
details. They often work together, but they solve different parts of the topic.

**Sample:**

```csharp
public class PaymentProcessor
{
    public void Pay(string cardNumber, decimal amount)
    {
        Validate(cardNumber, amount);
        Authorize(cardNumber, amount);
        Capture(amount);
    }

    private void Validate(string cardNumber, decimal amount) { }
    private void Authorize(string cardNumber, decimal amount) { }
    private void Capture(decimal amount) { }
}

// Encapsulation protects state. Abstraction hides workflow complexity behind a small API.
```

---

### 20. What is a good real-world example of Encapsulation?

**Answer:**

A strong example is explaining how Encapsulation affects a real feature, production issue,
migration, or architecture decision involving the hiding of internal state behind controlled access
points. Interviewers usually care more about the reasoning than the definition alone.

**Sample:**

```csharp
var account = new BankAccount();
account.Deposit(1000m);
account.Withdraw(250m);
Console.WriteLine(account.Balance);
```

---

### 21. What is a best practice for Encapsulation?

**Answer:**

A good practice is to keep Encapsulation aligned with the actual requirement around the hiding of
internal state behind controlled access points. Teams should document intent, keep implementation
readable, and validate important paths early.

**Sample:**

```csharp
var account = new BankAccount();
account.Deposit(1000m);
account.Withdraw(250m);
Console.WriteLine(account.Balance);
```

---

### 22. What is a common mistake around Encapsulation?

**Answer:**

A common mistake is naming Encapsulation without understanding how it affects the hiding of internal
state behind controlled access points. In real work, that usually appears as weak design choices,
poor debugging, or incomplete explanations.

**Sample:**

```csharp
public class EmployeeProfile
{
    public string Name { get; set; }
    public decimal Salary { get; set; }
    public string TaxCode { get; set; }
}

// If everything is writable from anywhere, invariants are easy to break.
```

---

### 23. How do you troubleshoot Encapsulation-related issues?

**Answer:**

When troubleshooting Encapsulation, first verify whether the hiding of internal state behind
controlled access points is behaving as expected. Then check surrounding dependencies,
configuration, logs, runtime behavior, and edge cases before changing the design.

**Sample:**

```csharp
public class Subscription
{
    private string _plan = "Free";
    public string Plan => _plan;

    public void Upgrade(string newPlan)
    {
        Console.WriteLine($"Before: {_plan}");
        _plan = newPlan;
        Console.WriteLine($"After: {_plan}");
    }
}
```

---

### 24. How does Encapsulation connect to the rest of C# object-oriented design?

**Answer:**

Encapsulation connects to the rest of C# object-oriented design by giving structure to the hiding of
internal state behind controlled access points. It is one of the pieces that turns isolated facts
into a coherent end-to-end explanation.

**Sample:**

```csharp
public interface IShipmentTracker
{
    void MarkDelivered();
}

public class ShipmentTracker : IShipmentTracker
{
    private string _status = "InTransit";
    public void MarkDelivered() => _status = "Delivered";
}
```

---

## 3. Abstraction

### 25. What is the role of Abstraction in C# object-oriented design?

**Answer:**

In C# object-oriented design, the term Abstraction refers to the focus on essential behavior while hiding
unnecessary implementation details. It is part of the foundation a candidate should be able to
explain clearly.

**Sample:**

```csharp
public interface IStorageGateway
{
    Task SaveAsync(string path, Stream content);
}

public class AzureBlobStorageGateway : IStorageGateway
{
    public Task SaveAsync(string path, Stream content)
    {
        Console.WriteLine($"Uploading {path} to blob storage");
        return Task.CompletedTask;
    }
}
```

---

### 26. Why is the concept of Abstraction important in C# object-oriented design?

**Answer:**

This concept matters because it influences the focus on essential behavior while hiding unnecessary
implementation details. Good interview answers connect it to clarity, maintainability, performance,
security, or delivery depending on the situation.

**Sample:**

```csharp
public interface IStorageGateway
{
    Task SaveAsync(string path, Stream content);
}

public class AzureBlobStorageGateway : IStorageGateway
{
    public Task SaveAsync(string path, Stream content)
    {
        Console.WriteLine($"Uploading {path} to blob storage");
        return Task.CompletedTask;
    }
}
```

---

### 27. When should a team focus on Abstraction?

**Answer:**

A team should focus on Abstraction when the requirement depends on the focus on essential behavior
while hiding unnecessary implementation details. It becomes especially important when design
decisions, scalability, or debugging depend on that area.

**Sample:**

```csharp
public interface IStorageGateway
{
    Task SaveAsync(string path, Stream content);
}

public class AzureBlobStorageGateway : IStorageGateway
{
    public Task SaveAsync(string path, Stream content)
    {
        Console.WriteLine($"Uploading {path} to blob storage");
        return Task.CompletedTask;
    }
}
```

---

### 28. How is Abstraction applied in practice?

**Answer:**

In practice, Abstraction is applied by making the focus on essential behavior while hiding
unnecessary implementation details explicit in the code, runtime setup, or delivery workflow. The
exact shape depends on the application, but the responsibility should stay predictable.

**Sample:**

```csharp
public class InvoiceService
{
    private readonly IStorageGateway _storage;
    public InvoiceService(IStorageGateway storage) => _storage = storage;

    public Task ArchiveAsync(string invoiceNumber, Stream pdf)
        => _storage.SaveAsync($"invoices/{invoiceNumber}.pdf", pdf);
}
```

---

### 29. What strengths does Abstraction bring?

**Answer:**

The strengths of Abstraction are better structure, better communication, and better control over the
focus on essential behavior while hiding unnecessary implementation details. It also makes tradeoffs
easier to explain to reviewers, interviewers, and teammates.

**Sample:**

```csharp
public interface IStorageGateway
{
    Task SaveAsync(string path, Stream content);
}

public class AzureBlobStorageGateway : IStorageGateway
{
    public Task SaveAsync(string path, Stream content)
    {
        Console.WriteLine($"Uploading {path} to blob storage");
        return Task.CompletedTask;
    }
}
```

---

### 30. What tradeoffs come with Abstraction?

**Answer:**

The main tradeoff is extra complexity if Abstraction is introduced without a real need or a clear
understanding of the focus on essential behavior while hiding unnecessary implementation details.
That usually leads to overengineering, hidden bugs, or confusing architecture.

**Sample:**

```csharp
public interface ICustomerManagerServiceFactoryBuilder
{
    object Build(object input);
}

// The name is abstract, but it does not describe a clear business capability.
```

---

### 31. How does Abstraction differ from Inheritance?

**Answer:**

Abstraction is centered on the focus on essential behavior while hiding unnecessary implementation
details, while Inheritance is centered on the reuse model where a derived type builds on a base
type. They often work together, but they solve different parts of the topic.

**Sample:**

```csharp
public interface INotifier
{
    Task SendAsync(string message);
}

public abstract class NotificationTemplate
{
    public abstract Task RenderAndSendAsync(INotifier notifier, string userName);
}

// Abstraction defines the contract. Inheritance shares a reusable base.
```

---

### 32. What is a good real-world example of Abstraction?

**Answer:**

A strong example is explaining how Abstraction affects a real feature, production issue, migration,
or architecture decision involving the focus on essential behavior while hiding unnecessary
implementation details. Interviewers usually care more about the reasoning than the definition
alone.

**Sample:**

```csharp
public class InvoiceService
{
    private readonly IStorageGateway _storage;
    public InvoiceService(IStorageGateway storage) => _storage = storage;

    public Task ArchiveAsync(string invoiceNumber, Stream pdf)
        => _storage.SaveAsync($"invoices/{invoiceNumber}.pdf", pdf);
}
```

---

### 33. What is a best practice for Abstraction?

**Answer:**

A good practice is to keep Abstraction aligned with the actual requirement around the focus on
essential behavior while hiding unnecessary implementation details. Teams should document intent,
keep implementation readable, and validate important paths early.

**Sample:**

```csharp
public class InvoiceService
{
    private readonly IStorageGateway _storage;
    public InvoiceService(IStorageGateway storage) => _storage = storage;

    public Task ArchiveAsync(string invoiceNumber, Stream pdf)
        => _storage.SaveAsync($"invoices/{invoiceNumber}.pdf", pdf);
}
```

---

### 34. What is a common mistake around Abstraction?

**Answer:**

A common mistake is naming Abstraction without understanding how it affects the focus on essential
behavior while hiding unnecessary implementation details. In real work, that usually appears as weak
design choices, poor debugging, or incomplete explanations.

**Sample:**

```csharp
public interface ICustomerManagerServiceFactoryBuilder
{
    object Build(object input);
}

// The name is abstract, but it does not describe a clear business capability.
```

---

### 35. How do you troubleshoot Abstraction-related issues?

**Answer:**

When troubleshooting Abstraction, first verify whether the focus on essential behavior while hiding
unnecessary implementation details is behaving as expected. Then check surrounding dependencies,
configuration, logs, runtime behavior, and edge cases before changing the design.

**Sample:**

```csharp
public class LoggingFileStore : IStorageGateway
{
    private readonly IStorageGateway _inner;
    public LoggingFileStore(IStorageGateway inner) => _inner = inner;

    public async Task SaveAsync(string path, Stream content)
    {
        Console.WriteLine($"Resolved implementation: {_inner.GetType().Name}");
        await _inner.SaveAsync(path, content);
    }
}
```

---

### 36. How does Abstraction connect to the rest of C# object-oriented design?

**Answer:**

Abstraction connects to the rest of C# object-oriented design by giving structure to the focus on
essential behavior while hiding unnecessary implementation details. It is one of the pieces that
turns isolated facts into a coherent end-to-end explanation.

**Sample:**

```csharp
public interface IDiscountPolicy
{
    decimal Apply(decimal subtotal);
}

public class CheckoutService
{
    private readonly IDiscountPolicy _policy;
    public CheckoutService(IDiscountPolicy policy) => _policy = policy;
    public decimal FinalTotal(decimal subtotal) => _policy.Apply(subtotal);
}
```

---

## 4. Inheritance

### 37. What is the role of Inheritance in C# object-oriented design?

**Answer:**

In C# object-oriented design, the term Inheritance refers to the reuse model where a derived type builds on a
base type. It is part of the foundation a candidate should be able to explain clearly.

**Sample:**

```csharp
public abstract class NotificationChannel
{
    public string ChannelName { get; }
    protected NotificationChannel(string channelName) => ChannelName = channelName;
    public abstract Task SendAsync(string recipient, string message);
}

public sealed class EmailChannel : NotificationChannel
{
    public EmailChannel() : base("Email") { }
    public override Task SendAsync(string recipient, string message) => Task.CompletedTask;
}
```

---

### 38. Why is the concept of Inheritance important in C# object-oriented design?

**Answer:**

This concept matters because it influences the reuse model where a derived type builds on a base
type. Good interview answers connect it to clarity, maintainability, performance, security, or
delivery depending on the situation.

**Sample:**

```csharp
public abstract class NotificationChannel
{
    public string ChannelName { get; }
    protected NotificationChannel(string channelName) => ChannelName = channelName;
    public abstract Task SendAsync(string recipient, string message);
}

public sealed class EmailChannel : NotificationChannel
{
    public EmailChannel() : base("Email") { }
    public override Task SendAsync(string recipient, string message) => Task.CompletedTask;
}
```

---

### 39. When should a team focus on Inheritance?

**Answer:**

A team should focus on Inheritance when the requirement depends on the reuse model where a derived
type builds on a base type. It becomes especially important when design decisions, scalability, or
debugging depend on that area.

**Sample:**

```csharp
public abstract class NotificationChannel
{
    public string ChannelName { get; }
    protected NotificationChannel(string channelName) => ChannelName = channelName;
    public abstract Task SendAsync(string recipient, string message);
}

public sealed class EmailChannel : NotificationChannel
{
    public EmailChannel() : base("Email") { }
    public override Task SendAsync(string recipient, string message) => Task.CompletedTask;
}
```

---

### 40. How is Inheritance applied in practice?

**Answer:**

In practice, Inheritance is applied by making the reuse model where a derived type builds on a base
type explicit in the code, runtime setup, or delivery workflow. The exact shape depends on the
application, but the responsibility should stay predictable.

**Sample:**

```csharp
NotificationChannel channel = new EmailChannel();
Console.WriteLine(channel.ChannelName);
await channel.SendAsync("customer@contoso.com", "Order shipped");
```

---

### 41. What strengths does Inheritance bring?

**Answer:**

The strengths of Inheritance are better structure, better communication, and better control over the
reuse model where a derived type builds on a base type. It also makes tradeoffs easier to explain to
reviewers, interviewers, and teammates.

**Sample:**

```csharp
public abstract class NotificationChannel
{
    public string ChannelName { get; }
    protected NotificationChannel(string channelName) => ChannelName = channelName;
    public abstract Task SendAsync(string recipient, string message);
}

public sealed class EmailChannel : NotificationChannel
{
    public EmailChannel() : base("Email") { }
    public override Task SendAsync(string recipient, string message) => Task.CompletedTask;
}
```

---

### 42. What tradeoffs come with Inheritance?

**Answer:**

The main tradeoff is extra complexity if Inheritance is introduced without a real need or a clear
understanding of the reuse model where a derived type builds on a base type. That usually leads to
overengineering, hidden bugs, or confusing architecture.

**Sample:**

```csharp
public class Animal
{
    public void Eat() { }
}

public class ReportService : Animal
{
    public void Export() { }
}

// This compiles, but the inheritance relationship is nonsense.
```

---

### 43. How does Inheritance differ from Polymorphism?

**Answer:**

Inheritance is centered on the reuse model where a derived type builds on a base type, while
Polymorphism is centered on the ability to treat related types through common contracts or
overridden behavior. They often work together, but they solve different parts of the topic.

**Sample:**

```csharp
public abstract class DiscountRule
{
    public virtual decimal Apply(decimal subtotal) => subtotal;
}

public class VipDiscountRule : DiscountRule
{
    public override decimal Apply(decimal subtotal) => subtotal * 0.80m;
}

DiscountRule rule = new VipDiscountRule();
Console.WriteLine(rule.Apply(1000m)); // inheritance defines the hierarchy, runtime dispatch is polymorphism
```

---

### 44. What is a good real-world example of Inheritance?

**Answer:**

A strong example is explaining how Inheritance affects a real feature, production issue, migration,
or architecture decision involving the reuse model where a derived type builds on a base type.
Interviewers usually care more about the reasoning than the definition alone.

**Sample:**

```csharp
NotificationChannel channel = new EmailChannel();
Console.WriteLine(channel.ChannelName);
await channel.SendAsync("customer@contoso.com", "Order shipped");
```

---

### 45. What is a best practice for Inheritance?

**Answer:**

A good practice is to keep Inheritance aligned with the actual requirement around the reuse model
where a derived type builds on a base type. Teams should document intent, keep implementation
readable, and validate important paths early.

**Sample:**

```csharp
NotificationChannel channel = new EmailChannel();
Console.WriteLine(channel.ChannelName);
await channel.SendAsync("customer@contoso.com", "Order shipped");
```

---

### 46. What is a common mistake around Inheritance?

**Answer:**

A common mistake is naming Inheritance without understanding how it affects the reuse model where a
derived type builds on a base type. In real work, that usually appears as weak design choices, poor
debugging, or incomplete explanations.

**Sample:**

```csharp
public class Animal
{
    public void Eat() { }
}

public class ReportService : Animal
{
    public void Export() { }
}

// This compiles, but the inheritance relationship is nonsense.
```

---

### 47. How do you troubleshoot Inheritance-related issues?

**Answer:**

When troubleshooting Inheritance, first verify whether the reuse model where a derived type builds
on a base type is behaving as expected. Then check surrounding dependencies, configuration, logs,
runtime behavior, and edge cases before changing the design.

**Sample:**

```csharp
public class VerboseDiscountRule : DiscountRule
{
    public override decimal Apply(decimal subtotal)
    {
        Console.WriteLine("VerboseDiscountRule.Apply called");
        return subtotal * 0.95m;
    }
}
```

---

### 48. How does Inheritance connect to the rest of C# object-oriented design?

**Answer:**

Inheritance connects to the rest of C# object-oriented design by giving structure to the reuse model
where a derived type builds on a base type. It is one of the pieces that turns isolated facts into a
coherent end-to-end explanation.

**Sample:**

```csharp
public abstract class WorkflowStep
{
    public abstract Task ExecuteAsync();
}

public class ApproveOrderStep : WorkflowStep
{
    public override Task ExecuteAsync() => Task.CompletedTask;
}

List<WorkflowStep> steps = new() { new ApproveOrderStep() };
```

---

## 5. Polymorphism

### 49. What is the role of Polymorphism in C# object-oriented design?

**Answer:**

In C# object-oriented design, the term Polymorphism refers to the ability to treat related types through
common contracts or overridden behavior. It is part of the foundation a candidate should be able to
explain clearly.

**Sample:**

```csharp
public interface IDiscountStrategy
{
    decimal Apply(decimal subtotal);
}

public class FestivalDiscount : IDiscountStrategy
{
    public decimal Apply(decimal subtotal) => subtotal * 0.90m;
}

public class MemberDiscount : IDiscountStrategy
{
    public decimal Apply(decimal subtotal) => subtotal - 250m;
}
```

---

### 50. Why is the concept of Polymorphism important in C# object-oriented design?

**Answer:**

This concept matters because it influences the ability to treat related types through common
contracts or overridden behavior. Good interview answers connect it to clarity, maintainability,
performance, security, or delivery depending on the situation.

**Sample:**

```csharp
public interface IDiscountStrategy
{
    decimal Apply(decimal subtotal);
}

public class FestivalDiscount : IDiscountStrategy
{
    public decimal Apply(decimal subtotal) => subtotal * 0.90m;
}

public class MemberDiscount : IDiscountStrategy
{
    public decimal Apply(decimal subtotal) => subtotal - 250m;
}
```

---

### 51. When should a team focus on Polymorphism?

**Answer:**

A team should focus on Polymorphism when the requirement depends on the ability to treat related
types through common contracts or overridden behavior. It becomes especially important when design
decisions, scalability, or debugging depend on that area.

**Sample:**

```csharp
public interface IDiscountStrategy
{
    decimal Apply(decimal subtotal);
}

public class FestivalDiscount : IDiscountStrategy
{
    public decimal Apply(decimal subtotal) => subtotal * 0.90m;
}

public class MemberDiscount : IDiscountStrategy
{
    public decimal Apply(decimal subtotal) => subtotal - 250m;
}
```

---

### 52. How is Polymorphism applied in practice?

**Answer:**

In practice, Polymorphism is applied by making the ability to treat related types through common
contracts or overridden behavior explicit in the code, runtime setup, or delivery workflow. The
exact shape depends on the application, but the responsibility should stay predictable.

**Sample:**

```csharp
IReadOnlyList<IDiscountStrategy> strategies = new IDiscountStrategy[]
{
    new FestivalDiscount(),
    new MemberDiscount()
};

foreach (var strategy in strategies)
    Console.WriteLine(strategy.Apply(2000m));
```

---

### 53. What strengths does Polymorphism bring?

**Answer:**

The strengths of Polymorphism are better structure, better communication, and better control over
the ability to treat related types through common contracts or overridden behavior. It also makes
tradeoffs easier to explain to reviewers, interviewers, and teammates.

**Sample:**

```csharp
public interface IDiscountStrategy
{
    decimal Apply(decimal subtotal);
}

public class FestivalDiscount : IDiscountStrategy
{
    public decimal Apply(decimal subtotal) => subtotal * 0.90m;
}

public class MemberDiscount : IDiscountStrategy
{
    public decimal Apply(decimal subtotal) => subtotal - 250m;
}
```

---

### 54. What tradeoffs come with Polymorphism?

**Answer:**

The main tradeoff is extra complexity if Polymorphism is introduced without a real need or a clear
understanding of the ability to treat related types through common contracts or overridden behavior.
That usually leads to overengineering, hidden bugs, or confusing architecture.

**Sample:**

```csharp
public class BadCheckoutService
{
    public decimal FinalTotal(decimal subtotal, IDiscountStrategy strategy)
    {
        if (strategy is FestivalDiscount) return subtotal * 0.90m;
        if (strategy is MemberDiscount) return subtotal - 250m;
        return subtotal;
    }
}

// The type checks undo the benefit of polymorphism.
```

---

### 55. How does Polymorphism differ from Interfaces?

**Answer:**

Polymorphism is centered on the ability to treat related types through common contracts or
overridden behavior, while Interfaces is centered on the contracts used to define required behavior
without fixing the implementation. They often work together, but they solve different parts of the
topic.

**Sample:**

```csharp
public interface IFileExporter
{
    byte[] Export(IEnumerable<string> rows);
}

public class CsvExporter : IFileExporter
{
    public byte[] Export(IEnumerable<string> rows) => Encoding.UTF8.GetBytes(string.Join(Environment.NewLine, rows));
}

IFileExporter exporter = new CsvExporter();
Console.WriteLine(exporter.GetType().Name); // interface is the contract, substitution at runtime is polymorphism
```

---

### 56. What is a good real-world example of Polymorphism?

**Answer:**

A strong example is explaining how Polymorphism affects a real feature, production issue, migration,
or architecture decision involving the ability to treat related types through common contracts or
overridden behavior. Interviewers usually care more about the reasoning than the definition alone.

**Sample:**

```csharp
IReadOnlyList<IDiscountStrategy> strategies = new IDiscountStrategy[]
{
    new FestivalDiscount(),
    new MemberDiscount()
};

foreach (var strategy in strategies)
    Console.WriteLine(strategy.Apply(2000m));
```

---

### 57. What is a best practice for Polymorphism?

**Answer:**

A good practice is to keep Polymorphism aligned with the actual requirement around the ability to
treat related types through common contracts or overridden behavior. Teams should document intent,
keep implementation readable, and validate important paths early.

**Sample:**

```csharp
IReadOnlyList<IDiscountStrategy> strategies = new IDiscountStrategy[]
{
    new FestivalDiscount(),
    new MemberDiscount()
};

foreach (var strategy in strategies)
    Console.WriteLine(strategy.Apply(2000m));
```

---

### 58. What is a common mistake around Polymorphism?

**Answer:**

A common mistake is naming Polymorphism without understanding how it affects the ability to treat
related types through common contracts or overridden behavior. In real work, that usually appears as
weak design choices, poor debugging, or incomplete explanations.

**Sample:**

```csharp
public class BadCheckoutService
{
    public decimal FinalTotal(decimal subtotal, IDiscountStrategy strategy)
    {
        if (strategy is FestivalDiscount) return subtotal * 0.90m;
        if (strategy is MemberDiscount) return subtotal - 250m;
        return subtotal;
    }
}

// The type checks undo the benefit of polymorphism.
```

---

### 59. How do you troubleshoot Polymorphism-related issues?

**Answer:**

When troubleshooting Polymorphism, first verify whether the ability to treat related types through
common contracts or overridden behavior is behaving as expected. Then check surrounding
dependencies, configuration, logs, runtime behavior, and edge cases before changing the design.

**Sample:**

```csharp
public interface ISerializer
{
    string Serialize(object value);
}

public class JsonSerializerAdapter : ISerializer
{
    public string Serialize(object value)
    {
        Console.WriteLine($"Serializer used: {GetType().Name}");
        return System.Text.Json.JsonSerializer.Serialize(value);
    }
}
```

---

### 60. How does Polymorphism connect to the rest of C# object-oriented design?

**Answer:**

Polymorphism connects to the rest of C# object-oriented design by giving structure to the ability to
treat related types through common contracts or overridden behavior. It is one of the pieces that
turns isolated facts into a coherent end-to-end explanation.

**Sample:**

```csharp
public class CheckoutService
{
    private readonly IDiscountStrategy _discountStrategy;
    public CheckoutService(IDiscountStrategy discountStrategy) => _discountStrategy = discountStrategy;
    public decimal Payable(decimal subtotal) => _discountStrategy.Apply(subtotal);
}
```

---

## 6. Interfaces

### 61. What is the role of Interfaces in C# object-oriented design?

**Answer:**

In C# object-oriented design, the term Interfaces refers to the contracts used to define required behavior
without fixing the implementation. It is part of the foundation a candidate should be able to
explain clearly.

**Sample:**

```csharp
public interface IPaymentGateway
{
    Task<string> ChargeAsync(decimal amount, string reference);
}

public class StripeGateway : IPaymentGateway
{
    public Task<string> ChargeAsync(decimal amount, string reference)
        => Task.FromResult($"stripe:{reference}:{amount}");
}
```

---

### 62. Why is the concept of Interfaces important in C# object-oriented design?

**Answer:**

This concept matters because it influences the contracts used to define required behavior without
fixing the implementation. Good interview answers connect it to clarity, maintainability,
performance, security, or delivery depending on the situation.

**Sample:**

```csharp
public interface IPaymentGateway
{
    Task<string> ChargeAsync(decimal amount, string reference);
}

public class StripeGateway : IPaymentGateway
{
    public Task<string> ChargeAsync(decimal amount, string reference)
        => Task.FromResult($"stripe:{reference}:{amount}");
}
```

---

### 63. When should a team focus on Interfaces?

**Answer:**

A team should focus on Interfaces when the requirement depends on the contracts used to define
required behavior without fixing the implementation. It becomes especially important when design
decisions, scalability, or debugging depend on that area.

**Sample:**

```csharp
public interface IPaymentGateway
{
    Task<string> ChargeAsync(decimal amount, string reference);
}

public class StripeGateway : IPaymentGateway
{
    public Task<string> ChargeAsync(decimal amount, string reference)
        => Task.FromResult($"stripe:{reference}:{amount}");
}
```

---

### 64. How is Interfaces applied in practice?

**Answer:**

In practice, Interfaces is applied by making the contracts used to define required behavior without
fixing the implementation explicit in the code, runtime setup, or delivery workflow. The exact shape
depends on the application, but the responsibility should stay predictable.

**Sample:**

```csharp
public class PaymentService
{
    private readonly IPaymentGateway _gateway;
    public PaymentService(IPaymentGateway gateway) => _gateway = gateway;

    public Task<string> PayAsync(decimal amount, string reference)
        => _gateway.ChargeAsync(amount, reference);
}
```

---

### 65. What strengths does Interfaces bring?

**Answer:**

The strengths of Interfaces are better structure, better communication, and better control over the
contracts used to define required behavior without fixing the implementation. It also makes
tradeoffs easier to explain to reviewers, interviewers, and teammates.

**Sample:**

```csharp
public interface IPaymentGateway
{
    Task<string> ChargeAsync(decimal amount, string reference);
}

public class StripeGateway : IPaymentGateway
{
    public Task<string> ChargeAsync(decimal amount, string reference)
        => Task.FromResult($"stripe:{reference}:{amount}");
}
```

---

### 66. What tradeoffs come with Interfaces?

**Answer:**

The main tradeoff is extra complexity if Interfaces is introduced without a real need or a clear
understanding of the contracts used to define required behavior without fixing the implementation.
That usually leads to overengineering, hidden bugs, or confusing architecture.

**Sample:**

```csharp
public interface IUserOperations
{
    void Create();
    void Delete();
    void Suspend();
    void ResetPassword();
    void Export();
}

// A wide interface forces clients to depend on members they may never use.
```

---

### 67. How does Interfaces differ from Abstract classes?

**Answer:**

Interfaces is centered on the contracts used to define required behavior without fixing the
implementation, while Abstract classes is centered on the base types used when some shared behavior
and some incomplete behavior must coexist. They often work together, but they solve different parts
of the topic.

**Sample:**

```csharp
public interface IReportBuilder
{
    byte[] Build();
}

public abstract class ReportBuilderBase
{
    protected string Title { get; }
    protected ReportBuilderBase(string title) => Title = title;
    public abstract byte[] Build();
}

// Interfaces define a contract; abstract classes can also share state and base behavior.
```

---

### 68. What is a good real-world example of Interfaces?

**Answer:**

A strong example is explaining how Interfaces affects a real feature, production issue, migration,
or architecture decision involving the contracts used to define required behavior without fixing the
implementation. Interviewers usually care more about the reasoning than the definition alone.

**Sample:**

```csharp
public class PaymentService
{
    private readonly IPaymentGateway _gateway;
    public PaymentService(IPaymentGateway gateway) => _gateway = gateway;

    public Task<string> PayAsync(decimal amount, string reference)
        => _gateway.ChargeAsync(amount, reference);
}
```

---

### 69. What is a best practice for Interfaces?

**Answer:**

A good practice is to keep Interfaces aligned with the actual requirement around the contracts used
to define required behavior without fixing the implementation. Teams should document intent, keep
implementation readable, and validate important paths early.

**Sample:**

```csharp
public class PaymentService
{
    private readonly IPaymentGateway _gateway;
    public PaymentService(IPaymentGateway gateway) => _gateway = gateway;

    public Task<string> PayAsync(decimal amount, string reference)
        => _gateway.ChargeAsync(amount, reference);
}
```

---

### 70. What is a common mistake around Interfaces?

**Answer:**

A common mistake is naming Interfaces without understanding how it affects the contracts used to
define required behavior without fixing the implementation. In real work, that usually appears as
weak design choices, poor debugging, or incomplete explanations.

**Sample:**

```csharp
public interface IUserOperations
{
    void Create();
    void Delete();
    void Suspend();
    void ResetPassword();
    void Export();
}

// A wide interface forces clients to depend on members they may never use.
```

---

### 71. How do you troubleshoot Interfaces-related issues?

**Answer:**

When troubleshooting Interfaces, first verify whether the contracts used to define required behavior
without fixing the implementation is behaving as expected. Then check surrounding dependencies,
configuration, logs, runtime behavior, and edge cases before changing the design.

**Sample:**

```csharp
public interface INotificationSender
{
    Task SendAsync(string message);
}

public class FailingNotificationSender : INotificationSender
{
    public Task SendAsync(string message) => throw new NotImplementedException("Provider not configured yet.");
}
```

---

### 72. How does Interfaces connect to the rest of C# object-oriented design?

**Answer:**

Interfaces connects to the rest of C# object-oriented design by giving structure to the contracts
used to define required behavior without fixing the implementation. It is one of the pieces that
turns isolated facts into a coherent end-to-end explanation.

**Sample:**

```csharp
public class SubscriptionService
{
    private readonly IClock _clock;
    public SubscriptionService(IClock clock) => _clock = clock;
    public DateTime RenewalDate() => _clock.UtcNow.AddMonths(1);
}

public interface IClock
{
    DateTime UtcNow { get; }
}
```

---

## 7. Abstract classes

### 73. What is the role of Abstract classes in C# object-oriented design?

**Answer:**

In C# object-oriented design, the term Abstract classes refers to the base types used when some shared
behavior and some incomplete behavior must coexist. It is part of the foundation a candidate should
be able to explain clearly.

**Sample:**

```csharp
public abstract class InvoiceExporter
{
    protected string CompanyName { get; }
    protected InvoiceExporter(string companyName) => CompanyName = companyName;
    public abstract byte[] Export(Invoice invoice);
}

public sealed class CsvInvoiceExporter : InvoiceExporter
{
    public CsvInvoiceExporter(string companyName) : base(companyName) { }
    public override byte[] Export(Invoice invoice)
        => Encoding.UTF8.GetBytes($"{CompanyName},{invoice.Number},{invoice.Total}");
}

public record Invoice(string Number, decimal Total);
```

---

### 74. Why is the concept of Abstract classes important in C# object-oriented design?

**Answer:**

This concept matters because it influences the base types used when some shared behavior and
some incomplete behavior must coexist. Good interview answers connect it to clarity,
maintainability, performance, security, or delivery depending on the situation.

**Sample:**

```csharp
public abstract class InvoiceExporter
{
    protected string CompanyName { get; }
    protected InvoiceExporter(string companyName) => CompanyName = companyName;
    public abstract byte[] Export(Invoice invoice);
}

public sealed class CsvInvoiceExporter : InvoiceExporter
{
    public CsvInvoiceExporter(string companyName) : base(companyName) { }
    public override byte[] Export(Invoice invoice)
        => Encoding.UTF8.GetBytes($"{CompanyName},{invoice.Number},{invoice.Total}");
}

public record Invoice(string Number, decimal Total);
```

---

### 75. When should a team focus on Abstract classes?

**Answer:**

A team should focus on Abstract classes when the requirement depends on the base types used when
some shared behavior and some incomplete behavior must coexist. It becomes especially important when
design decisions, scalability, or debugging depend on that area.

**Sample:**

```csharp
public abstract class InvoiceExporter
{
    protected string CompanyName { get; }
    protected InvoiceExporter(string companyName) => CompanyName = companyName;
    public abstract byte[] Export(Invoice invoice);
}

public sealed class CsvInvoiceExporter : InvoiceExporter
{
    public CsvInvoiceExporter(string companyName) : base(companyName) { }
    public override byte[] Export(Invoice invoice)
        => Encoding.UTF8.GetBytes($"{CompanyName},{invoice.Number},{invoice.Total}");
}

public record Invoice(string Number, decimal Total);
```

---

### 76. How is Abstract classes applied in practice?

**Answer:**

In practice, Abstract classes is applied by making the base types used when some shared behavior and
some incomplete behavior must coexist explicit in the code, runtime setup, or delivery workflow. The
exact shape depends on the application, but the responsibility should stay predictable.

**Sample:**

```csharp
InvoiceExporter exporter = new CsvInvoiceExporter("Contoso");
var bytes = exporter.Export(new Invoice("INV-2026-1001", 1500m));
Console.WriteLine(bytes.Length);
```

---

### 77. What strengths does Abstract classes bring?

**Answer:**

The strengths of Abstract classes are better structure, better communication, and better control
over the base types used when some shared behavior and some incomplete behavior must coexist. It
also makes tradeoffs easier to explain to reviewers, interviewers, and teammates.

**Sample:**

```csharp
public abstract class InvoiceExporter
{
    protected string CompanyName { get; }
    protected InvoiceExporter(string companyName) => CompanyName = companyName;
    public abstract byte[] Export(Invoice invoice);
}

public sealed class CsvInvoiceExporter : InvoiceExporter
{
    public CsvInvoiceExporter(string companyName) : base(companyName) { }
    public override byte[] Export(Invoice invoice)
        => Encoding.UTF8.GetBytes($"{CompanyName},{invoice.Number},{invoice.Total}");
}

public record Invoice(string Number, decimal Total);
```

---

### 78. What tradeoffs come with Abstract classes?

**Answer:**

The main tradeoff is extra complexity if Abstract classes is introduced without a real need or a
clear understanding of the base types used when some shared behavior and some incomplete behavior
must coexist. That usually leads to overengineering, hidden bugs, or confusing architecture.

**Sample:**

```csharp
public abstract class NotificationBase
{
    public abstract void Send(string to, string message);
    public abstract void SendSms(string to, string message);
}

// Every subclass is forced to support every message type, even when it should not.
```

---

### 79. How does Abstract classes differ from Constructors?

**Answer:**

Abstract classes is centered on the base types used when some shared behavior and some incomplete
behavior must coexist, while Constructors is centered on the initialization paths used when objects
are created. They often work together, but they solve different parts of the topic.

**Sample:**

```csharp
public abstract class IntegrationClient
{
    protected string BaseUrl { get; }
    protected IntegrationClient(string baseUrl) => BaseUrl = baseUrl;
}

public class CrmClient : IntegrationClient
{
    public CrmClient(string baseUrl) : base(baseUrl) { }
}

// The constructor initializes shared state; the abstract class defines the reusable hierarchy.
```

---

### 80. What is a good real-world example of Abstract classes?

**Answer:**

A strong example is explaining how Abstract classes affects a real feature, production issue,
migration, or architecture decision involving the base types used when some shared behavior and some
incomplete behavior must coexist. Interviewers usually care more about the reasoning than the
definition alone.

**Sample:**

```csharp
InvoiceExporter exporter = new CsvInvoiceExporter("Contoso");
var bytes = exporter.Export(new Invoice("INV-2026-1001", 1500m));
Console.WriteLine(bytes.Length);
```

---

### 81. What is a best practice for Abstract classes?

**Answer:**

A good practice is to keep Abstract classes aligned with the actual requirement around the base
types used when some shared behavior and some incomplete behavior must coexist. Teams should
document intent, keep implementation readable, and validate important paths early.

**Sample:**

```csharp
InvoiceExporter exporter = new CsvInvoiceExporter("Contoso");
var bytes = exporter.Export(new Invoice("INV-2026-1001", 1500m));
Console.WriteLine(bytes.Length);
```

---

### 82. What is a common mistake around Abstract classes?

**Answer:**

A common mistake is naming Abstract classes without understanding how it affects the base types used
when some shared behavior and some incomplete behavior must coexist. In real work, that usually
appears as weak design choices, poor debugging, or incomplete explanations.

**Sample:**

```csharp
public abstract class NotificationBase
{
    public abstract void Send(string to, string message);
    public abstract void SendSms(string to, string message);
}

// Every subclass is forced to support every message type, even when it should not.
```

---

### 83. How do you troubleshoot Abstract classes-related issues?

**Answer:**

When troubleshooting Abstract classes, first verify whether the base types used when some shared
behavior and some incomplete behavior must coexist is behaving as expected. Then check surrounding
dependencies, configuration, logs, runtime behavior, and edge cases before changing the design.

**Sample:**

```csharp
public abstract class SyncJob
{
    public async Task RunAsync()
    {
        Console.WriteLine($"Running {GetType().Name}");
        await ExecuteAsync();
    }

    protected abstract Task ExecuteAsync();
}

public class CustomerSyncJob : SyncJob
{
    protected override Task ExecuteAsync()
    {
        Console.WriteLine("Customer sync override called");
        return Task.CompletedTask;
    }
}
```

---

### 84. How does Abstract classes connect to the rest of C# object-oriented design?

**Answer:**

Abstract classes connects to the rest of C# object-oriented design by giving structure to the base
types used when some shared behavior and some incomplete behavior must coexist. It is one of the
pieces that turns isolated facts into a coherent end-to-end explanation.

**Sample:**

```csharp
public abstract class OrderRule
{
    public abstract bool IsValid(Order order);
}

public class MinimumAmountRule : OrderRule
{
    public override bool IsValid(Order order) => order.Total >= 100m;
}
```

---

## 8. Constructors

### 85. What is the role of Constructors in C# object-oriented design?

**Answer:**

In C# object-oriented design, the term Constructors refers to the initialization paths used when objects are
created. It is part of the foundation a candidate should be able to explain clearly.

**Sample:**

```csharp
public class Money
{
    public string Currency { get; }
    public decimal Amount { get; }

    public Money(string currency, decimal amount)
    {
        if (string.IsNullOrWhiteSpace(currency)) throw new ArgumentException("Currency is required.");
        if (amount < 0) throw new ArgumentOutOfRangeException(nameof(amount));
        Currency = currency;
        Amount = amount;
    }
}
```

---

### 86. Why is the concept of Constructors important in C# object-oriented design?

**Answer:**

This concept matters because it influences the initialization paths used when objects are created.
Good interview answers connect it to clarity, maintainability, performance, security, or delivery
depending on the situation.

**Sample:**

```csharp
public class Money
{
    public string Currency { get; }
    public decimal Amount { get; }

    public Money(string currency, decimal amount)
    {
        if (string.IsNullOrWhiteSpace(currency)) throw new ArgumentException("Currency is required.");
        if (amount < 0) throw new ArgumentOutOfRangeException(nameof(amount));
        Currency = currency;
        Amount = amount;
    }
}
```

---

### 87. When should a team focus on Constructors?

**Answer:**

A team should focus on Constructors when the requirement depends on the initialization paths used
when objects are created. It becomes especially important when design decisions, scalability, or
debugging depend on that area.

**Sample:**

```csharp
public class Money
{
    public string Currency { get; }
    public decimal Amount { get; }

    public Money(string currency, decimal amount)
    {
        if (string.IsNullOrWhiteSpace(currency)) throw new ArgumentException("Currency is required.");
        if (amount < 0) throw new ArgumentOutOfRangeException(nameof(amount));
        Currency = currency;
        Amount = amount;
    }
}
```

---

### 88. How is Constructors applied in practice?

**Answer:**

In practice, Constructors is applied by making the initialization paths used when objects are
created explicit in the code, runtime setup, or delivery workflow. The exact shape depends on the
application, but the responsibility should stay predictable.

**Sample:**

```csharp
var booking = new Booking(Guid.NewGuid(), new DateOnly(2026, 4, 10), new DateOnly(2026, 4, 12));
Console.WriteLine($"Room={booking.RoomId}, CheckIn={booking.CheckIn}, CheckOut={booking.CheckOut}");

public class Booking
{
    public Guid RoomId { get; }
    public DateOnly CheckIn { get; }
    public DateOnly CheckOut { get; }

    public Booking(Guid roomId, DateOnly checkIn, DateOnly checkOut)
    {
        if (checkOut <= checkIn) throw new ArgumentException("Check-out must be after check-in.");
        RoomId = roomId;
        CheckIn = checkIn;
        CheckOut = checkOut;
    }
}
```

---

### 89. What strengths does Constructors bring?

**Answer:**

The strengths of Constructors are better structure, better communication, and better control over
the initialization paths used when objects are created. It also makes tradeoffs easier to explain to
reviewers, interviewers, and teammates.

**Sample:**

```csharp
public class Money
{
    public string Currency { get; }
    public decimal Amount { get; }

    public Money(string currency, decimal amount)
    {
        if (string.IsNullOrWhiteSpace(currency)) throw new ArgumentException("Currency is required.");
        if (amount < 0) throw new ArgumentOutOfRangeException(nameof(amount));
        Currency = currency;
        Amount = amount;
    }
}
```

---

### 90. What tradeoffs come with Constructors?

**Answer:**

The main tradeoff is extra complexity if Constructors is introduced without a real need or a clear
understanding of the initialization paths used when objects are created. That usually leads to
overengineering, hidden bugs, or confusing architecture.

**Sample:**

```csharp
public class ReportService
{
    public ReportService(string region, IClock clock, ICurrencyService currencyService, IAuditWriter auditWriter, ILogger logger)
    {
        // Too many constructor parameters usually hint that this class does too much.
    }
}

public interface ICurrencyService { }
public interface IAuditWriter { }
public interface ILogger { }
```

---

### 91. How does Constructors differ from Association and composition?

**Answer:**

Constructors is centered on the initialization paths used when objects are created, while
Association and composition is centered on the relationship patterns used to model how objects work
together. They often work together, but they solve different parts of the topic.

**Sample:**

```csharp
public class Address
{
    public string City { get; }
    public Address(string city) => City = city;
}

public class Customer
{
    public Address Address { get; }
    public Customer(Address address) => Address = address;
}

// Constructors wire object relationships. Association/composition describes the relationship itself.
```

---

### 92. What is a good real-world example of Constructors?

**Answer:**

A strong example is explaining how Constructors affects a real feature, production issue, migration,
or architecture decision involving the initialization paths used when objects are created.
Interviewers usually care more about the reasoning than the definition alone.

**Sample:**

```csharp
var booking = new Booking(Guid.NewGuid(), new DateOnly(2026, 4, 10), new DateOnly(2026, 4, 12));
Console.WriteLine($"Room={booking.RoomId}, CheckIn={booking.CheckIn}, CheckOut={booking.CheckOut}");

public class Booking
{
    public Guid RoomId { get; }
    public DateOnly CheckIn { get; }
    public DateOnly CheckOut { get; }

    public Booking(Guid roomId, DateOnly checkIn, DateOnly checkOut)
    {
        if (checkOut <= checkIn) throw new ArgumentException("Check-out must be after check-in.");
        RoomId = roomId;
        CheckIn = checkIn;
        CheckOut = checkOut;
    }
}
```

---

### 93. What is a best practice for Constructors?

**Answer:**

A good practice is to keep Constructors aligned with the actual requirement around the
initialization paths used when objects are created. Teams should document intent, keep
implementation readable, and validate important paths early.

**Sample:**

```csharp
var booking = new Booking(Guid.NewGuid(), new DateOnly(2026, 4, 10), new DateOnly(2026, 4, 12));
Console.WriteLine($"Room={booking.RoomId}, CheckIn={booking.CheckIn}, CheckOut={booking.CheckOut}");

public class Booking
{
    public Guid RoomId { get; }
    public DateOnly CheckIn { get; }
    public DateOnly CheckOut { get; }

    public Booking(Guid roomId, DateOnly checkIn, DateOnly checkOut)
    {
        if (checkOut <= checkIn) throw new ArgumentException("Check-out must be after check-in.");
        RoomId = roomId;
        CheckIn = checkIn;
        CheckOut = checkOut;
    }
}
```

---

### 94. What is a common mistake around Constructors?

**Answer:**

A common mistake is naming Constructors without understanding how it affects the initialization
paths used when objects are created. In real work, that usually appears as weak design choices, poor
debugging, or incomplete explanations.

**Sample:**

```csharp
public class ReportService
{
    public ReportService(string region, IClock clock, ICurrencyService currencyService, IAuditWriter auditWriter, ILogger logger)
    {
        // Too many constructor parameters usually hint that this class does too much.
    }
}

public interface ICurrencyService { }
public interface IAuditWriter { }
public interface ILogger { }
```

---

### 95. How do you troubleshoot Constructors-related issues?

**Answer:**

When troubleshooting Constructors, first verify whether the initialization paths used when objects
are created is behaving as expected. Then check surrounding dependencies, configuration, logs,
runtime behavior, and edge cases before changing the design.

**Sample:**

```csharp
public class SecureToken
{
    public string Value { get; }

    public SecureToken(string value)
    {
        Console.WriteLine("Entering constructor");
        Value = string.IsNullOrWhiteSpace(value)
            ? throw new ArgumentException("Token cannot be empty.")
            : value;
    }
}
```

---

### 96. How does Constructors connect to the rest of C# object-oriented design?

**Answer:**

Constructors connects to the rest of C# object-oriented design by giving structure to the
initialization paths used when objects are created. It is one of the pieces that turns isolated
facts into a coherent end-to-end explanation.

**Sample:**

```csharp
public class Order
{
    public Customer Customer { get; }
    public IReadOnlyList<OrderLine> Lines { get; }

    public Order(Customer customer, IReadOnlyList<OrderLine> lines)
    {
        Customer = customer;
        Lines = lines;
    }
}
```

---

## 9. Association and composition

### 97. What is the role of Association and composition in C# object-oriented design?

**Answer:**

In C# object-oriented design, the term Association and composition refers to the relationship patterns used
to model how objects work together. It is part of the foundation a candidate should be able to
explain clearly.

**Sample:**

```csharp
public class Customer
{
    public string Name { get; }
    public Customer(string name) => Name = name;
}

public class Order
{
    public Customer Customer { get; }
    public List<OrderLine> Lines { get; } = new();
    public Order(Customer customer) => Customer = customer;
}
```

---

### 98. Why is the concept of Association and composition important in C# object-oriented design?

**Answer:**

This concept matters because it influences the relationship patterns used to model
how objects work together. Good interview answers connect it to clarity, maintainability,
performance, security, or delivery depending on the situation.

**Sample:**

```csharp
public class Customer
{
    public string Name { get; }
    public Customer(string name) => Name = name;
}

public class Order
{
    public Customer Customer { get; }
    public List<OrderLine> Lines { get; } = new();
    public Order(Customer customer) => Customer = customer;
}
```

---

### 99. When should a team focus on Association and composition?

**Answer:**

A team should focus on Association and composition when the requirement depends on the relationship
patterns used to model how objects work together. It becomes especially important when design
decisions, scalability, or debugging depend on that area.

**Sample:**

```csharp
public class Customer
{
    public string Name { get; }
    public Customer(string name) => Name = name;
}

public class Order
{
    public Customer Customer { get; }
    public List<OrderLine> Lines { get; } = new();
    public Order(Customer customer) => Customer = customer;
}
```

---

### 100. How is Association and composition applied in practice?

**Answer:**

In practice, Association and composition is applied by making the relationship patterns used to
model how objects work together explicit in the code, runtime setup, or delivery workflow. The exact
shape depends on the application, but the responsibility should stay predictable.

**Sample:**

```csharp
var invoice = new Invoice(new Customer("Asha"), new Address("Hyderabad", "India"));
invoice.Lines.Add(new OrderLine("SSD-1TB", 1, 7499m));
Console.WriteLine(invoice.Total);

public class Invoice
{
    public Customer Customer { get; }
    public Address BillingAddress { get; }
    public List<OrderLine> Lines { get; } = new();
    public Invoice(Customer customer, Address billingAddress)
    {
        Customer = customer;
        BillingAddress = billingAddress;
    }
    public decimal Total => Lines.Sum(x => x.Quantity * x.UnitPrice);
}

public record Address(string City, string Country);
```

---

### 101. What strengths does Association and composition bring?

**Answer:**

The strengths of Association and composition are better structure, better communication, and better
control over the relationship patterns used to model how objects work together. It also makes
tradeoffs easier to explain to reviewers, interviewers, and teammates.

**Sample:**

```csharp
public class Customer
{
    public string Name { get; }
    public Customer(string name) => Name = name;
}

public class Order
{
    public Customer Customer { get; }
    public List<OrderLine> Lines { get; } = new();
    public Order(Customer customer) => Customer = customer;
}
```

---

### 102. What tradeoffs come with Association and composition?

**Answer:**

The main tradeoff is extra complexity if Association and composition is introduced without a real
need or a clear understanding of the relationship patterns used to model how objects work together.
That usually leads to overengineering, hidden bugs, or confusing architecture.

**Sample:**

```csharp
public class OrderAggregate
{
    public Customer Customer { get; }
    public Payment Payment { get; }
    public Shipment Shipment { get; }
    public Promotion Promotion { get; }

    public OrderAggregate(Customer customer, Payment payment, Shipment shipment, Promotion promotion)
    {
        Customer = customer;
        Payment = payment;
        Shipment = shipment;
        Promotion = promotion;
    }
}

public record Payment(string Reference);
public record Promotion(string Code);
```

---

### 103. How does Association and composition differ from SOLID-oriented design?

**Answer:**

Association and composition is centered on the relationship patterns used to model how objects work
together, while SOLID-oriented design is centered on the practical design thinking used to keep
object-oriented code maintainable. They often work together, but they solve different parts of the
topic.

**Sample:**

```csharp
public class CheckoutService
{
    private readonly IDiscountPolicy _discountPolicy;
    private readonly ITaxPolicy _taxPolicy;

    public CheckoutService(IDiscountPolicy discountPolicy, ITaxPolicy taxPolicy)
    {
        _discountPolicy = discountPolicy;
        _taxPolicy = taxPolicy;
    }
}

// Composition is the structural choice. SOLID helps decide whether the overall design stays healthy.
```

---

### 104. What is a good real-world example of Association and composition?

**Answer:**

A strong example is explaining how Association and composition affects a real feature, production
issue, migration, or architecture decision involving the relationship patterns used to model how
objects work together. Interviewers usually care more about the reasoning than the definition alone.

**Sample:**

```csharp
var invoice = new Invoice(new Customer("Asha"), new Address("Hyderabad", "India"));
invoice.Lines.Add(new OrderLine("SSD-1TB", 1, 7499m));
Console.WriteLine(invoice.Total);

public class Invoice
{
    public Customer Customer { get; }
    public Address BillingAddress { get; }
    public List<OrderLine> Lines { get; } = new();
    public Invoice(Customer customer, Address billingAddress)
    {
        Customer = customer;
        BillingAddress = billingAddress;
    }
    public decimal Total => Lines.Sum(x => x.Quantity * x.UnitPrice);
}

public record Address(string City, string Country);
```

---

### 105. What is a best practice for Association and composition?

**Answer:**

A good practice is to keep Association and composition aligned with the actual requirement around
the relationship patterns used to model how objects work together. Teams should document intent,
keep implementation readable, and validate important paths early.

**Sample:**

```csharp
var invoice = new Invoice(new Customer("Asha"), new Address("Hyderabad", "India"));
invoice.Lines.Add(new OrderLine("SSD-1TB", 1, 7499m));
Console.WriteLine(invoice.Total);

public class Invoice
{
    public Customer Customer { get; }
    public Address BillingAddress { get; }
    public List<OrderLine> Lines { get; } = new();
    public Invoice(Customer customer, Address billingAddress)
    {
        Customer = customer;
        BillingAddress = billingAddress;
    }
    public decimal Total => Lines.Sum(x => x.Quantity * x.UnitPrice);
}

public record Address(string City, string Country);
```

---

### 106. What is a common mistake around Association and composition?

**Answer:**

A common mistake is naming Association and composition without understanding how it affects the
relationship patterns used to model how objects work together. In real work, that usually appears as
weak design choices, poor debugging, or incomplete explanations.

**Sample:**

```csharp
public class OrderAggregate
{
    public Customer Customer { get; }
    public Payment Payment { get; }
    public Shipment Shipment { get; }
    public Promotion Promotion { get; }

    public OrderAggregate(Customer customer, Payment payment, Shipment shipment, Promotion promotion)
    {
        Customer = customer;
        Payment = payment;
        Shipment = shipment;
        Promotion = promotion;
    }
}

public record Payment(string Reference);
public record Promotion(string Code);
```

---

### 107. How do you troubleshoot Association and composition-related issues?

**Answer:**

When troubleshooting Association and composition, first verify whether the relationship patterns
used to model how objects work together is behaving as expected. Then check surrounding
dependencies, configuration, logs, runtime behavior, and edge cases before changing the design.

**Sample:**

```csharp
public class InvoiceRef
{
    public Customer? Customer { get; set; }
}

var broken = new InvoiceRef();
Console.WriteLine(broken.Customer?.Name ?? "Missing customer reference");
```

---

### 108. How does Association and composition connect to the rest of C# object-oriented design?

**Answer:**

Association and composition connects to the rest of C# object-oriented design by giving structure to
the relationship patterns used to model how objects work together. It is one of the pieces that
turns isolated facts into a coherent end-to-end explanation.

**Sample:**

```csharp
public class OrderWorkflow
{
    private readonly IValidator _validator;
    private readonly INotifier _notifier;

    public OrderWorkflow(IValidator validator, INotifier notifier)
    {
        _validator = validator;
        _notifier = notifier;
    }
}

public interface IValidator { }
public interface INotifier { }
```

---

## 10. SOLID-oriented design

### 109. What is the role of SOLID-oriented design in C# object-oriented design?

**Answer:**

In C# object-oriented design, the term SOLID-oriented design refers to the practical design thinking used to
keep object-oriented code maintainable. It is part of the foundation a candidate should be able to
explain clearly.

**Sample:**

```csharp
public class CheckoutService
{
    private readonly IDiscountPolicy _discount;
    private readonly ITaxPolicy _tax;
    private readonly IInvoiceRepository _repository;

    public CheckoutService(IDiscountPolicy discount, ITaxPolicy tax, IInvoiceRepository repository)
    {
        _discount = discount;
        _tax = tax;
        _repository = repository;
    }

    public async Task<decimal> PlaceAsync(Order order)
    {
        var discounted = _discount.Apply(order.Total);
        var finalTotal = discounted + _tax.Calculate(discounted);
        await _repository.SaveAsync(order);
        return finalTotal;
    }
}
```

---

### 110. Why is the concept of SOLID-oriented design important in C# object-oriented design?

**Answer:**

This concept matters because it influences the practical design thinking used to keep
object-oriented code maintainable. Good interview answers connect it to clarity, maintainability,
performance, security, or delivery depending on the situation.

**Sample:**

```csharp
public class CheckoutService
{
    private readonly IDiscountPolicy _discount;
    private readonly ITaxPolicy _tax;
    private readonly IInvoiceRepository _repository;

    public CheckoutService(IDiscountPolicy discount, ITaxPolicy tax, IInvoiceRepository repository)
    {
        _discount = discount;
        _tax = tax;
        _repository = repository;
    }

    public async Task<decimal> PlaceAsync(Order order)
    {
        var discounted = _discount.Apply(order.Total);
        var finalTotal = discounted + _tax.Calculate(discounted);
        await _repository.SaveAsync(order);
        return finalTotal;
    }
}
```

---

### 111. When should a team focus on SOLID-oriented design?

**Answer:**

A team should focus on SOLID-oriented design when the requirement depends on the practical design
thinking used to keep object-oriented code maintainable. It becomes especially important when design
decisions, scalability, or debugging depend on that area.

**Sample:**

```csharp
public class CheckoutService
{
    private readonly IDiscountPolicy _discount;
    private readonly ITaxPolicy _tax;
    private readonly IInvoiceRepository _repository;

    public CheckoutService(IDiscountPolicy discount, ITaxPolicy tax, IInvoiceRepository repository)
    {
        _discount = discount;
        _tax = tax;
        _repository = repository;
    }

    public async Task<decimal> PlaceAsync(Order order)
    {
        var discounted = _discount.Apply(order.Total);
        var finalTotal = discounted + _tax.Calculate(discounted);
        await _repository.SaveAsync(order);
        return finalTotal;
    }
}
```

---

### 112. How is SOLID-oriented design applied in practice?

**Answer:**

In practice, SOLID-oriented design is applied by making the practical design thinking used to keep
object-oriented code maintainable explicit in the code, runtime setup, or delivery workflow. The
exact shape depends on the application, but the responsibility should stay predictable.

**Sample:**

```csharp
public class OrderController
{
    private readonly ICheckoutService _checkoutService;
    public OrderController(ICheckoutService checkoutService) => _checkoutService = checkoutService;
}

public interface ICheckoutService
{
    Task PlaceAsync(Order order);
}

// Start with clear responsibilities and introduce abstractions where change pressure is real.
```

---

### 113. What strengths does SOLID-oriented design bring?

**Answer:**

The strengths of SOLID-oriented design are better structure, better communication, and better
control over the practical design thinking used to keep object-oriented code maintainable. It also
makes tradeoffs easier to explain to reviewers, interviewers, and teammates.

**Sample:**

```csharp
public class CheckoutService
{
    private readonly IDiscountPolicy _discount;
    private readonly ITaxPolicy _tax;
    private readonly IInvoiceRepository _repository;

    public CheckoutService(IDiscountPolicy discount, ITaxPolicy tax, IInvoiceRepository repository)
    {
        _discount = discount;
        _tax = tax;
        _repository = repository;
    }

    public async Task<decimal> PlaceAsync(Order order)
    {
        var discounted = _discount.Apply(order.Total);
        var finalTotal = discounted + _tax.Calculate(discounted);
        await _repository.SaveAsync(order);
        return finalTotal;
    }
}
```

---

### 114. What tradeoffs come with SOLID-oriented design?

**Answer:**

The main tradeoff is extra complexity if SOLID-oriented design is introduced without a real need or
a clear understanding of the practical design thinking used to keep object-oriented code
maintainable. That usually leads to overengineering, hidden bugs, or confusing architecture.

**Sample:**

```csharp
public interface IUserService
{
    void Create();
}

public interface IUserFactory
{
    IUserService Create();
}

public interface IUserFactoryProvider
{
    IUserFactory CreateFactory();
}

// The pattern names are fancy, but the design may now be harder than the business problem.
```

---

### 115. How does SOLID-oriented design differ from Classes and objects?

**Answer:**

SOLID-oriented design is centered on the practical design thinking used to keep object-oriented code
maintainable, while Classes and objects is centered on the core object-oriented model used to create
structured program entities. They often work together, but they solve different parts of the topic.

**Sample:**

```csharp
public class OrderEntity
{
    public Guid Id { get; }
    public decimal Total { get; private set; }
    public OrderEntity(Guid id) => Id = id;
    public void AddCharge(decimal amount) => Total += amount;
}

// Classes and objects are the building blocks. SOLID evaluates whether their design stays maintainable.
```

---

### 116. What is a good real-world example of SOLID-oriented design?

**Answer:**

A strong example is explaining how SOLID-oriented design affects a real feature, production issue,
migration, or architecture decision involving the practical design thinking used to keep object-
oriented code maintainable. Interviewers usually care more about the reasoning than the definition
alone.

**Sample:**

```csharp
public class OrderController
{
    private readonly ICheckoutService _checkoutService;
    public OrderController(ICheckoutService checkoutService) => _checkoutService = checkoutService;
}

public interface ICheckoutService
{
    Task PlaceAsync(Order order);
}

// Start with clear responsibilities and introduce abstractions where change pressure is real.
```

---

### 117. What is a best practice for SOLID-oriented design?

**Answer:**

A good practice is to keep SOLID-oriented design aligned with the actual requirement around the
practical design thinking used to keep object-oriented code maintainable. Teams should document
intent, keep implementation readable, and validate important paths early.

**Sample:**

```csharp
public class OrderController
{
    private readonly ICheckoutService _checkoutService;
    public OrderController(ICheckoutService checkoutService) => _checkoutService = checkoutService;
}

public interface ICheckoutService
{
    Task PlaceAsync(Order order);
}

// Start with clear responsibilities and introduce abstractions where change pressure is real.
```

---

### 118. What is a common mistake around SOLID-oriented design?

**Answer:**

A common mistake is naming SOLID-oriented design without understanding how it affects the practical
design thinking used to keep object-oriented code maintainable. In real work, that usually appears
as weak design choices, poor debugging, or incomplete explanations.

**Sample:**

```csharp
public interface IUserService
{
    void Create();
}

public interface IUserFactory
{
    IUserService Create();
}

public interface IUserFactoryProvider
{
    IUserFactory CreateFactory();
}

// The pattern names are fancy, but the design may now be harder than the business problem.
```

---

### 119. How do you troubleshoot SOLID-oriented design-related issues?

**Answer:**

When troubleshooting SOLID-oriented design, first verify whether the practical design thinking used
to keep object-oriented code maintainable is behaving as expected. Then check surrounding
dependencies, configuration, logs, runtime behavior, and edge cases before changing the design.

**Sample:**

```csharp
public class LegacyCheckoutService
{
    public decimal Process(Order order, string userType, bool isFestival, bool isVip)
    {
        // This long conditional block is a design smell and a refactoring target.
        return order.Total;
    }
}
```

---

### 120. How does SOLID-oriented design connect to the rest of C# object-oriented design?

**Answer:**

SOLID-oriented design connects to the rest of C# object-oriented design by giving structure to the
practical design thinking used to keep object-oriented code maintainable. It is one of the pieces
that turns isolated facts into a coherent end-to-end explanation.

**Sample:**

```csharp
public interface IShippingStrategy
{
    decimal Calculate(decimal weight);
}

public class ExpressShippingStrategy : IShippingStrategy
{
    public decimal Calculate(decimal weight) => 150m + (weight * 10m);
}

// SOLID ties together abstraction, polymorphism, composition, and focused classes.
```
---

## 11. Tricky interview questions

### 121. Why is method hiding with `new` a tricky OOP interview topic in C#?

**Answer:**

Method hiding is tricky because the behavior depends on the reference type, not just the runtime object.
Many candidates confuse `new` with `override`, but they produce different dispatch rules.

**Sample:**

```csharp
public class ReportFormatter
{
    public string Format() => "Base format";
}

public class HtmlReportFormatter : ReportFormatter
{
    public new string Format() => "HTML format";
}

ReportFormatter baseRef = new HtmlReportFormatter();
HtmlReportFormatter derivedRef = new HtmlReportFormatter();
Console.WriteLine(baseRef.Format());
Console.WriteLine(derivedRef.Format());
```

---

### 122. What happens when a base constructor calls a virtual method?

**Answer:**

The override runs before the derived constructor has finished initializing its own fields. That can produce
null values, incorrect state, or intermittent bugs.

**Sample:**

```csharp
public abstract class DocumentBase
{
    protected DocumentBase() => Console.WriteLine(GetTitle());
    protected abstract string GetTitle();
}

public class InvoiceDocument : DocumentBase
{
    private readonly string _number;
    public InvoiceDocument(string number) => _number = number;
    protected override string GetTitle() => _number ?? "Number not initialized yet";
}
```

---

### 123. How does explicit interface implementation affect polymorphism?

**Answer:**

Explicit interface members are only available through the interface reference. That keeps the public surface
smaller, but it surprises developers who expect the member to be callable directly.

**Sample:**

```csharp
public interface IAuditWriter
{
    void Write(string message);
}

public class FileAuditWriter : IAuditWriter
{
    void IAuditWriter.Write(string message) => Console.WriteLine($"AUDIT: {message}");
}

((IAuditWriter)new FileAuditWriter()).Write("Order approved");
```

---

### 124. What is the tricky difference between `==`, `Equals`, and `ReferenceEquals` for objects?

**Answer:**

Value equality and reference equality are different design choices. For value objects and entities, picking
the wrong one causes subtle bugs in comparisons and collections.

**Sample:**

```csharp
public record Money(decimal Amount, string Currency);

var first = new Money(100, "USD");
var second = new Money(100, "USD");

Console.WriteLine(first == second);
Console.WriteLine(first.Equals(second));
Console.WriteLine(object.ReferenceEquals(first, second));
```

---

### 125. Why are records not always a drop-in replacement for entities?

**Answer:**

Records are great for value-like data, but entities usually have identity, lifecycle, and mutable business
state. Using a record for an entity can make equality semantics misleading.

**Sample:**

```csharp
public record CustomerSnapshot(Guid Id, string Name);

public class CustomerEntity
{
    public Guid Id { get; }
    public string Name { get; private set; }
    public CustomerEntity(Guid id, string name)
    {
        Id = id;
        Name = name;
    }
    public void Rename(string name) => Name = name;
}
```

---

### 126. Why is exposing collection properties directly a common OOP trap?

**Answer:**

It allows outside code to mutate internal state without the owning object enforcing any rules. That quietly
breaks encapsulation and often bypasses validation.

**Sample:**

```csharp
public class Project
{
    private readonly List<string> _members = new();
    public IReadOnlyCollection<string> Members => _members;

    public void AddMember(string email)
    {
        if (_members.Contains(email)) throw new InvalidOperationException("Duplicate member.");
        _members.Add(email);
    }
}
```

---

### 127. How does composition help avoid the fragile base class problem?

**Answer:**

Composition keeps behavior in separate collaborators instead of forcing every variation into one inheritance
chain. That reduces ripple effects when one feature changes.

**Sample:**

```csharp
public interface IDiscountPolicy
{
    decimal Apply(decimal subtotal);
}

public class CheckoutService
{
    private readonly IDiscountPolicy _discountPolicy;
    public CheckoutService(IDiscountPolicy discountPolicy) => _discountPolicy = discountPolicy;
    public decimal Total(decimal subtotal) => _discountPolicy.Apply(subtotal);
}
```

---

### 128. What OOP issue appears when `IDisposable` is ignored in an object graph?

**Answer:**

Ownership becomes unclear, and resources such as streams, connections, or timers may leak. This is especially
tricky when one object creates another internally and no one disposes it.

**Sample:**

```csharp
public class ExportService : IDisposable
{
    private readonly StreamWriter _writer = new("export.log");
    public void WriteLine(string value) => _writer.WriteLine(value);
    public void Dispose() => _writer.Dispose();
}
```