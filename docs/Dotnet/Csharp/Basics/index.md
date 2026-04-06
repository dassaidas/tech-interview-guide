# C# Basics Interview Questions

![C# Basics Interview Questions](../../../assets/dotnet-execution-flow.svg)

This page stays at the C# basics level and focuses on language fundamentals, execution basics, and everyday coding concepts.

## 1. CLR and assemblies

### 1. What is the role of CLR and assemblies in C# basics?

**Answer:**

In C# basics, the term CLR and assemblies refers to the runtime and compiled unit model that executes C#
applications. It is part of the foundation a candidate should be able to explain clearly.

**Sample:**

```csharp
var assembly = typeof(string).Assembly;
Console.WriteLine(assembly.GetName().Name);
Console.WriteLine(assembly.GetName().Version);

var currentAssembly = typeof(List<int>).Assembly;
Console.WriteLine(currentAssembly.GetName().Name);
```

---

### 2. Why is the concept of CLR and assemblies important in C# basics?

**Answer:**

This concept matters because it influences the runtime and compiled unit model that executes
C# applications. Good interview answers connect it to clarity, maintainability, performance,
security, or delivery depending on the situation.

**Sample:**

```csharp
var assembly = typeof(string).Assembly;
Console.WriteLine(assembly.GetName().Name);
Console.WriteLine(assembly.GetName().Version);

var currentAssembly = typeof(List<int>).Assembly;
Console.WriteLine(currentAssembly.GetName().Name);
```

---

### 3. When should a team focus on CLR and assemblies?

**Answer:**

A team should focus on CLR and assemblies when the requirement depends on the runtime and compiled
unit model that executes C# applications. It becomes especially important when design decisions,
scalability, or debugging depend on that area.

**Sample:**

```csharp
var assembly = typeof(string).Assembly;
Console.WriteLine(assembly.GetName().Name);
Console.WriteLine(assembly.GetName().Version);

var currentAssembly = typeof(List<int>).Assembly;
Console.WriteLine(currentAssembly.GetName().Name);
```

---

### 4. How is CLR and assemblies applied in practice?

**Answer:**

In practice, CLR and assemblies is applied by making the runtime and compiled unit model that
executes C# applications explicit in the code, runtime setup, or delivery workflow. The exact shape
depends on the application, but the responsibility should stay predictable.

**Sample:**

```csharp
var version = typeof(List<>).Assembly.GetName().Version;
Console.WriteLine($".NET runtime library version: {version}");
```

---

### 5. What strengths does CLR and assemblies bring?

**Answer:**

The strengths of CLR and assemblies are better structure, better communication, and better control
over the runtime and compiled unit model that executes C# applications. It also makes tradeoffs
easier to explain to reviewers, interviewers, and teammates.

**Sample:**

```csharp
var assembly = typeof(string).Assembly;
Console.WriteLine(assembly.GetName().Name);
Console.WriteLine(assembly.GetName().Version);

var currentAssembly = typeof(List<int>).Assembly;
Console.WriteLine(currentAssembly.GetName().Name);
```

---

### 6. What tradeoffs come with CLR and assemblies?

**Answer:**

The main tradeoff is extra complexity if CLR and assemblies is introduced without a real need or a
clear understanding of the runtime and compiled unit model that executes C# applications. That
usually leads to overengineering, hidden bugs, or confusing architecture.

**Sample:**

```csharp
Assembly.Load("Payments.Plugin");
// Dynamic loading is powerful, but version mismatches and missing dependencies are easy to create.
```

---

### 7. How does CLR and assemblies differ from Value and reference types?

**Answer:**

CLR and assemblies is centered on the runtime and compiled unit model that executes C# applications,
while Value and reference types is centered on the difference between stack-like value semantics and
reference-based object semantics. They often work together, but they solve different parts of the
topic.

**Sample:**

```csharp
int amount = 100;
object boxed = amount;     // CLR boxing for a value type
string status = "Paid";    // reference type stored differently
Console.WriteLine($"{boxed}, {status}");
```

---

### 8. What is a good real-world example of CLR and assemblies?

**Answer:**

A strong example is explaining how CLR and assemblies affects a real feature, production issue,
migration, or architecture decision involving the runtime and compiled unit model that executes C#
applications. Interviewers usually care more about the reasoning than the definition alone.

**Sample:**

```csharp
var version = typeof(List<>).Assembly.GetName().Version;
Console.WriteLine($".NET runtime library version: {version}");
```

---

### 9. What is a best practice for CLR and assemblies?

**Answer:**

A good practice is to keep CLR and assemblies aligned with the actual requirement around the runtime
and compiled unit model that executes C# applications. Teams should document intent, keep
implementation readable, and validate important paths early.

**Sample:**

```csharp
var version = typeof(List<>).Assembly.GetName().Version;
Console.WriteLine($".NET runtime library version: {version}");
```

---

### 10. What is a common mistake around CLR and assemblies?

**Answer:**

A common mistake is naming CLR and assemblies without understanding how it affects the runtime and
compiled unit model that executes C# applications. In real work, that usually appears as weak design
choices, poor debugging, or incomplete explanations.

**Sample:**

```csharp
Assembly.Load("Payments.Plugin");
// Dynamic loading is powerful, but version mismatches and missing dependencies are easy to create.
```

---

### 11. How do you troubleshoot CLR and assemblies-related issues?

**Answer:**

When troubleshooting CLR and assemblies, first verify whether the runtime and compiled unit model
that executes C# applications is behaving as expected. Then check surrounding dependencies,
configuration, logs, runtime behavior, and edge cases before changing the design.

**Sample:**

```csharp
var loaded = AppDomain.CurrentDomain.GetAssemblies()
    .Select(a => a.GetName().Name)
    .OrderBy(name => name);

Console.WriteLine(string.Join(", ", loaded));
```

---

### 12. How does CLR and assemblies connect to the rest of C# basics?

**Answer:**

CLR and assemblies connects to the rest of C# basics by giving structure to the runtime and compiled
unit model that executes C# applications. It is one of the pieces that turns isolated facts into a
coherent end-to-end explanation.

**Sample:**

```csharp
var numberText = "42";
int number = int.Parse(numberText);
Console.WriteLine(number + 8);
// CLR executes the code, and basic types and conversions shape the data.
```

---

## 2. Value and reference types

### 13. What is the role of Value and reference types in C# basics?

**Answer:**

In C# basics, the term Value and reference types refers to the difference between stack-like value semantics
and reference-based object semantics. It is part of the foundation a candidate should be able to
explain clearly.

**Sample:**

```csharp
struct PriceTag
{
    public decimal Amount { get; set; }
}

class CustomerProfile
{
    public string Name { get; set; } = "";
}
```

---

### 14. Why is the concept of Value and reference types important in C# basics?

**Answer:**

This concept matters because it influences the difference between stack-like value
semantics and reference-based object semantics. Good interview answers connect it to clarity,
maintainability, performance, security, or delivery depending on the situation.

**Sample:**

```csharp
struct PriceTag
{
    public decimal Amount { get; set; }
}

class CustomerProfile
{
    public string Name { get; set; } = "";
}
```

---

### 15. When should a team focus on Value and reference types?

**Answer:**

A team should focus on Value and reference types when the requirement depends on the difference
between stack-like value semantics and reference-based object semantics. It becomes especially
important when design decisions, scalability, or debugging depend on that area.

**Sample:**

```csharp
struct PriceTag
{
    public decimal Amount { get; set; }
}

class CustomerProfile
{
    public string Name { get; set; } = "";
}
```

---

### 16. How is Value and reference types applied in practice?

**Answer:**

In practice, Value and reference types is applied by making the difference between stack-like value
semantics and reference-based object semantics explicit in the code, runtime setup, or delivery
workflow. The exact shape depends on the application, but the responsibility should stay
predictable.

**Sample:**

```csharp
var first = new PriceTag { Amount = 499.99m };
var second = first;
second.Amount = 599.99m;
Console.WriteLine(first.Amount); // 499.99

var customer1 = new CustomerProfile { Name = "Asha" };
var customer2 = customer1;
customer2.Name = "Sai";
Console.WriteLine(customer1.Name); // Sai
```

---

### 17. What strengths does Value and reference types bring?

**Answer:**

The strengths of Value and reference types are better structure, better communication, and better
control over the difference between stack-like value semantics and reference-based object semantics.
It also makes tradeoffs easier to explain to reviewers, interviewers, and teammates.

**Sample:**

```csharp
struct PriceTag
{
    public decimal Amount { get; set; }
}

class CustomerProfile
{
    public string Name { get; set; } = "";
}
```

---

### 18. What tradeoffs come with Value and reference types?

**Answer:**

The main tradeoff is extra complexity if Value and reference types is introduced without a real need
or a clear understanding of the difference between stack-like value semantics and reference-based
object semantics. That usually leads to overengineering, hidden bugs, or confusing architecture.

**Sample:**

```csharp
var prices = new List<PriceTag>();
for (int i = 0; i < 100000; i++)
{
    prices.Add(new PriceTag { Amount = i });
}
// Large structs copied repeatedly can become expensive.
```

---

### 19. How does Value and reference types differ from Variables and conversions?

**Answer:**

Value and reference types is centered on the difference between stack-like value semantics and
reference-based object semantics, while Variables and conversions is centered on the storage and
type conversion rules used in ordinary C# code. They often work together, but they solve different
parts of the topic.

**Sample:**

```csharp
int quantity = 5;
string quantityText = quantity.ToString();
Console.WriteLine(quantityText);
// Value/reference semantics explain storage and copying. Conversions explain representation changes.
```

---

### 20. What is a good real-world example of Value and reference types?

**Answer:**

A strong example is explaining how Value and reference types affects a real feature, production
issue, migration, or architecture decision involving the difference between stack-like value
semantics and reference-based object semantics. Interviewers usually care more about the reasoning
than the definition alone.

**Sample:**

```csharp
var first = new PriceTag { Amount = 499.99m };
var second = first;
second.Amount = 599.99m;
Console.WriteLine(first.Amount); // 499.99

var customer1 = new CustomerProfile { Name = "Asha" };
var customer2 = customer1;
customer2.Name = "Sai";
Console.WriteLine(customer1.Name); // Sai
```

---

### 21. What is a best practice for Value and reference types?

**Answer:**

A good practice is to keep Value and reference types aligned with the actual requirement around the
difference between stack-like value semantics and reference-based object semantics. Teams should
document intent, keep implementation readable, and validate important paths early.

**Sample:**

```csharp
var first = new PriceTag { Amount = 499.99m };
var second = first;
second.Amount = 599.99m;
Console.WriteLine(first.Amount); // 499.99

var customer1 = new CustomerProfile { Name = "Asha" };
var customer2 = customer1;
customer2.Name = "Sai";
Console.WriteLine(customer1.Name); // Sai
```

---

### 22. What is a common mistake around Value and reference types?

**Answer:**

A common mistake is naming Value and reference types without understanding how it affects the
difference between stack-like value semantics and reference-based object semantics. In real work,
that usually appears as weak design choices, poor debugging, or incomplete explanations.

**Sample:**

```csharp
var prices = new List<PriceTag>();
for (int i = 0; i < 100000; i++)
{
    prices.Add(new PriceTag { Amount = i });
}
// Large structs copied repeatedly can become expensive.
```

---

### 23. How do you troubleshoot Value and reference types-related issues?

**Answer:**

When troubleshooting Value and reference types, first verify whether the difference between stack-
like value semantics and reference-based object semantics is behaving as expected. Then check
surrounding dependencies, configuration, logs, runtime behavior, and edge cases before changing the
design.

**Sample:**

```csharp
void Rename(CustomerProfile profile)
{
    profile.Name = "Updated";
}

var profile = new CustomerProfile { Name = "Original" };
Rename(profile);
Console.WriteLine(profile.Name);
```

---

### 24. How does Value and reference types connect to the rest of C# basics?

**Answer:**

Value and reference types connects to the rest of C# basics by giving structure to the difference
between stack-like value semantics and reference-based object semantics. It is one of the pieces
that turns isolated facts into a coherent end-to-end explanation.

**Sample:**

```csharp
var items = new List<CustomerProfile>
{
    new() { Name = "Ravi" },
    new() { Name = "Neha" }
};
Console.WriteLine(items.Count);
```

---

## 3. Variables and conversions

### 25. What is the role of Variables and conversions in C# basics?

**Answer:**

In C# basics, the term Variables and conversions refers to the storage and type conversion rules used in
ordinary C# code. It is part of the foundation a candidate should be able to explain clearly.

**Sample:**

```csharp
string input = "1250.75";
decimal invoiceTotal = decimal.Parse(input);
int rounded = (int)Math.Round(invoiceTotal);
Console.WriteLine($"{invoiceTotal} -> {rounded}");
```

---

### 26. Why is the concept of Variables and conversions important in C# basics?

**Answer:**

This concept matters because it influences the storage and type conversion rules used
in ordinary C# code. Good interview answers connect it to clarity, maintainability, performance,
security, or delivery depending on the situation.

**Sample:**

```csharp
string input = "1250.75";
decimal invoiceTotal = decimal.Parse(input);
int rounded = (int)Math.Round(invoiceTotal);
Console.WriteLine($"{invoiceTotal} -> {rounded}");
```

---

### 27. When should a team focus on Variables and conversions?

**Answer:**

A team should focus on Variables and conversions when the requirement depends on the storage and
type conversion rules used in ordinary C# code. It becomes especially important when design
decisions, scalability, or debugging depend on that area.

**Sample:**

```csharp
string input = "1250.75";
decimal invoiceTotal = decimal.Parse(input);
int rounded = (int)Math.Round(invoiceTotal);
Console.WriteLine($"{invoiceTotal} -> {rounded}");
```

---

### 28. How is Variables and conversions applied in practice?

**Answer:**

In practice, Variables and conversions is applied by making the storage and type conversion rules
used in ordinary C# code explicit in the code, runtime setup, or delivery workflow. The exact shape
depends on the application, but the responsibility should stay predictable.

**Sample:**

```csharp
var values = new Dictionary<string, object?>
{
    ["orderId"] = 101,
    ["status"] = "Packed"
};

int orderId = (int)values["orderId"]!;
string status = values["status"]?.ToString() ?? "Unknown";
Console.WriteLine($"{orderId}: {status}");
```

---

### 29. What strengths does Variables and conversions bring?

**Answer:**

The strengths of Variables and conversions are better structure, better communication, and better
control over the storage and type conversion rules used in ordinary C# code. It also makes tradeoffs
easier to explain to reviewers, interviewers, and teammates.

**Sample:**

```csharp
string input = "1250.75";
decimal invoiceTotal = decimal.Parse(input);
int rounded = (int)Math.Round(invoiceTotal);
Console.WriteLine($"{invoiceTotal} -> {rounded}");
```

---

### 30. What tradeoffs come with Variables and conversions?

**Answer:**

The main tradeoff is extra complexity if Variables and conversions is introduced without a real need
or a clear understanding of the storage and type conversion rules used in ordinary C# code. That
usually leads to overengineering, hidden bugs, or confusing architecture.

**Sample:**

```csharp
byte discount = 10;
byte finalDiscount = (byte)(discount + 250);
Console.WriteLine(finalDiscount);
// Narrow conversions can overflow or silently wrap when used carelessly.
```

---

### 31. How does Variables and conversions differ from Operators and expressions?

**Answer:**

Variables and conversions is centered on the storage and type conversion rules used in ordinary C#
code, while Operators and expressions is centered on the syntax used to compute values and build
logic statements. They often work together, but they solve different parts of the topic.

**Sample:**

```csharp
decimal subtotal = 999.95m;
decimal tax = subtotal * 0.18m;
Console.WriteLine(subtotal + tax);
// Variables hold values. Operators and expressions combine them into results.
```

---

### 32. What is a good real-world example of Variables and conversions?

**Answer:**

A strong example is explaining how Variables and conversions affects a real feature, production
issue, migration, or architecture decision involving the storage and type conversion rules used in
ordinary C# code. Interviewers usually care more about the reasoning than the definition alone.

**Sample:**

```csharp
var values = new Dictionary<string, object?>
{
    ["orderId"] = 101,
    ["status"] = "Packed"
};

int orderId = (int)values["orderId"]!;
string status = values["status"]?.ToString() ?? "Unknown";
Console.WriteLine($"{orderId}: {status}");
```

---

### 33. What is a best practice for Variables and conversions?

**Answer:**

A good practice is to keep Variables and conversions aligned with the actual requirement around the
storage and type conversion rules used in ordinary C# code. Teams should document intent, keep
implementation readable, and validate important paths early.

**Sample:**

```csharp
var values = new Dictionary<string, object?>
{
    ["orderId"] = 101,
    ["status"] = "Packed"
};

int orderId = (int)values["orderId"]!;
string status = values["status"]?.ToString() ?? "Unknown";
Console.WriteLine($"{orderId}: {status}");
```

---

### 34. What is a common mistake around Variables and conversions?

**Answer:**

A common mistake is naming Variables and conversions without understanding how it affects the
storage and type conversion rules used in ordinary C# code. In real work, that usually appears as
weak design choices, poor debugging, or incomplete explanations.

**Sample:**

```csharp
byte discount = 10;
byte finalDiscount = (byte)(discount + 250);
Console.WriteLine(finalDiscount);
// Narrow conversions can overflow or silently wrap when used carelessly.
```

---

### 35. How do you troubleshoot Variables and conversions-related issues?

**Answer:**

When troubleshooting Variables and conversions, first verify whether the storage and type conversion
rules used in ordinary C# code is behaving as expected. Then check surrounding dependencies,
configuration, logs, runtime behavior, and edge cases before changing the design.

**Sample:**

```csharp
if (int.TryParse("2026", out int year))
{
    Console.WriteLine($"Parsed year: {year}");
}
else
{
    Console.WriteLine("Invalid year");
}
```

---

### 36. How does Variables and conversions connect to the rest of C# basics?

**Answer:**

Variables and conversions connects to the rest of C# basics by giving structure to the storage and
type conversion rules used in ordinary C# code. It is one of the pieces that turns isolated facts
into a coherent end-to-end explanation.

**Sample:**

```csharp
var text = "42";
int number = Convert.ToInt32(text);
Console.WriteLine(number * 2);
```

---

## 4. Operators and expressions

### 37. What is the role of Operators and expressions in C# basics?

**Answer:**

In C# basics, the term Operators and expressions refers to the syntax used to compute values and build logic
statements. It is part of the foundation a candidate should be able to explain clearly.

**Sample:**

```csharp
decimal price = 1499.50m;
int quantity = 3;
decimal taxRate = 0.18m;
decimal total = (price * quantity) * (1 + taxRate);
Console.WriteLine(total);
```

---

### 38. Why is the concept of Operators and expressions important in C# basics?

**Answer:**

This concept matters because it influences the syntax used to compute values and build
logic statements. Good interview answers connect it to clarity, maintainability, performance,
security, or delivery depending on the situation.

**Sample:**

```csharp
decimal price = 1499.50m;
int quantity = 3;
decimal taxRate = 0.18m;
decimal total = (price * quantity) * (1 + taxRate);
Console.WriteLine(total);
```

---

### 39. When should a team focus on Operators and expressions?

**Answer:**

A team should focus on Operators and expressions when the requirement depends on the syntax used to
compute values and build logic statements. It becomes especially important when design decisions,
scalability, or debugging depend on that area.

**Sample:**

```csharp
decimal price = 1499.50m;
int quantity = 3;
decimal taxRate = 0.18m;
decimal total = (price * quantity) * (1 + taxRate);
Console.WriteLine(total);
```

---

### 40. How is Operators and expressions applied in practice?

**Answer:**

In practice, Operators and expressions is applied by making the syntax used to compute values and
build logic statements explicit in the code, runtime setup, or delivery workflow. The exact shape
depends on the application, but the responsibility should stay predictable.

**Sample:**

```csharp
string? coupon = null;
string code = coupon ?? "NO-COUPON";
bool canCheckout = code != "" && code.StartsWith("SAVE");
Console.WriteLine($"{code} -> {canCheckout}");
```

---

### 41. What strengths does Operators and expressions bring?

**Answer:**

The strengths of Operators and expressions are better structure, better communication, and better
control over the syntax used to compute values and build logic statements. It also makes tradeoffs
easier to explain to reviewers, interviewers, and teammates.

**Sample:**

```csharp
decimal price = 1499.50m;
int quantity = 3;
decimal taxRate = 0.18m;
decimal total = (price * quantity) * (1 + taxRate);
Console.WriteLine(total);
```

---

### 42. What tradeoffs come with Operators and expressions?

**Answer:**

The main tradeoff is extra complexity if Operators and expressions is introduced without a real need
or a clear understanding of the syntax used to compute values and build logic statements. That
usually leads to overengineering, hidden bugs, or confusing architecture.

**Sample:**

```csharp
int x = 5;
int y = 0;
bool valid = y != 0 && (x / y) > 1;
Console.WriteLine(valid);
// Operator order and short-circuit rules matter for correctness and safety.
```

---

### 43. How does Operators and expressions differ from Control flow?

**Answer:**

Operators and expressions is centered on the syntax used to compute values and build logic
statements, while Control flow is centered on the conditionals and loops that decide how code
execution moves. They often work together, but they solve different parts of the topic.

**Sample:**

```csharp
int score = 85;
string grade = score >= 90 ? "A" : "B";
Console.WriteLine(grade);
// Operators build expressions; control flow chooses which block runs next.
```

---

### 44. What is a good real-world example of Operators and expressions?

**Answer:**

A strong example is explaining how Operators and expressions affects a real feature, production
issue, migration, or architecture decision involving the syntax used to compute values and build
logic statements. Interviewers usually care more about the reasoning than the definition alone.

**Sample:**

```csharp
string? coupon = null;
string code = coupon ?? "NO-COUPON";
bool canCheckout = code != "" && code.StartsWith("SAVE");
Console.WriteLine($"{code} -> {canCheckout}");
```

---

### 45. What is a best practice for Operators and expressions?

**Answer:**

A good practice is to keep Operators and expressions aligned with the actual requirement around the
syntax used to compute values and build logic statements. Teams should document intent, keep
implementation readable, and validate important paths early.

**Sample:**

```csharp
string? coupon = null;
string code = coupon ?? "NO-COUPON";
bool canCheckout = code != "" && code.StartsWith("SAVE");
Console.WriteLine($"{code} -> {canCheckout}");
```

---

### 46. What is a common mistake around Operators and expressions?

**Answer:**

A common mistake is naming Operators and expressions without understanding how it affects the syntax
used to compute values and build logic statements. In real work, that usually appears as weak design
choices, poor debugging, or incomplete explanations.

**Sample:**

```csharp
int x = 5;
int y = 0;
bool valid = y != 0 && (x / y) > 1;
Console.WriteLine(valid);
// Operator order and short-circuit rules matter for correctness and safety.
```

---

### 47. How do you troubleshoot Operators and expressions-related issues?

**Answer:**

When troubleshooting Operators and expressions, first verify whether the syntax used to compute
values and build logic statements is behaving as expected. Then check surrounding dependencies,
configuration, logs, runtime behavior, and edge cases before changing the design.

**Sample:**

```csharp
int flags = 0b_0101;
bool hasRead = (flags & 0b_0001) == 0b_0001;
bool hasDelete = (flags & 0b_1000) == 0b_1000;
Console.WriteLine($"{hasRead}, {hasDelete}");
```

---

### 48. How does Operators and expressions connect to the rest of C# basics?

**Answer:**

Operators and expressions connects to the rest of C# basics by giving structure to the syntax used
to compute values and build logic statements. It is one of the pieces that turns isolated facts into
a coherent end-to-end explanation.

**Sample:**

```csharp
string? middleName = null;
int length = middleName?.Length ?? 0;
Console.WriteLine(length);
```

---

## 5. Control flow

### 49. What is the role of Control flow in C# basics?

**Answer:**

In C# basics, the term Control flow refers to the conditionals and loops that decide how code execution
moves. It is part of the foundation a candidate should be able to explain clearly.

**Sample:**

```csharp
var orderStatus = "Paid";
switch (orderStatus)
{
    case "Draft":
        Console.WriteLine("Order still editable");
        break;
    case "Paid":
        Console.WriteLine("Ready for shipment");
        break;
    default:
        Console.WriteLine("Check workflow");
        break;
}
```

---

### 50. Why is the concept of Control flow important in C# basics?

**Answer:**

This concept matters because it influences the conditionals and loops that decide how code execution
moves. Good interview answers connect it to clarity, maintainability, performance, security, or
delivery depending on the situation.

**Sample:**

```csharp
var orderStatus = "Paid";
switch (orderStatus)
{
    case "Draft":
        Console.WriteLine("Order still editable");
        break;
    case "Paid":
        Console.WriteLine("Ready for shipment");
        break;
    default:
        Console.WriteLine("Check workflow");
        break;
}
```

---

### 51. When should a team focus on Control flow?

**Answer:**

A team should focus on Control flow when the requirement depends on the conditionals and loops that
decide how code execution moves. It becomes especially important when design decisions, scalability,
or debugging depend on that area.

**Sample:**

```csharp
var orderStatus = "Paid";
switch (orderStatus)
{
    case "Draft":
        Console.WriteLine("Order still editable");
        break;
    case "Paid":
        Console.WriteLine("Ready for shipment");
        break;
    default:
        Console.WriteLine("Check workflow");
        break;
}
```

---

### 52. How is Control flow applied in practice?

**Answer:**

In practice, Control flow is applied by making the conditionals and loops that decide how code
execution moves explicit in the code, runtime setup, or delivery workflow. The exact shape depends
on the application, but the responsibility should stay predictable.

**Sample:**

```csharp
foreach (var sku in new[] { "KB-001", "MS-002", "HD-003" })
{
    Console.WriteLine($"Picking {sku}");
}
```

---

### 53. What strengths does Control flow bring?

**Answer:**

The strengths of Control flow are better structure, better communication, and better control over
the conditionals and loops that decide how code execution moves. It also makes tradeoffs easier to
explain to reviewers, interviewers, and teammates.

**Sample:**

```csharp
var orderStatus = "Paid";
switch (orderStatus)
{
    case "Draft":
        Console.WriteLine("Order still editable");
        break;
    case "Paid":
        Console.WriteLine("Ready for shipment");
        break;
    default:
        Console.WriteLine("Check workflow");
        break;
}
```

---

### 54. What tradeoffs come with Control flow?

**Answer:**

The main tradeoff is extra complexity if Control flow is introduced without a real need or a clear
understanding of the conditionals and loops that decide how code execution moves. That usually leads
to overengineering, hidden bugs, or confusing architecture.

**Sample:**

```csharp
for (int i = 0; i < 10; i++)
{
    if (i == 3) continue;
    if (i == 7) break;
    Console.WriteLine(i);
}
```

---

### 55. How does Control flow differ from Methods and parameters?

**Answer:**

Control flow is centered on the conditionals and loops that decide how code execution moves, while
Methods and parameters is centered on the callable units of behavior and the inputs they receive.
They often work together, but they solve different parts of the topic.

**Sample:**

```csharp
bool isVip = true;
if (isVip)
{
    Console.WriteLine("Apply premium lane");
}
// Control flow decides execution. Methods package reusable logic into named units.
```

---

### 56. What is a good real-world example of Control flow?

**Answer:**

A strong example is explaining how Control flow affects a real feature, production issue, migration,
or architecture decision involving the conditionals and loops that decide how code execution moves.
Interviewers usually care more about the reasoning than the definition alone.

**Sample:**

```csharp
foreach (var sku in new[] { "KB-001", "MS-002", "HD-003" })
{
    Console.WriteLine($"Picking {sku}");
}
```

---

### 57. What is a best practice for Control flow?

**Answer:**

A good practice is to keep Control flow aligned with the actual requirement around the conditionals
and loops that decide how code execution moves. Teams should document intent, keep implementation
readable, and validate important paths early.

**Sample:**

```csharp
foreach (var sku in new[] { "KB-001", "MS-002", "HD-003" })
{
    Console.WriteLine($"Picking {sku}");
}
```

---

### 58. What is a common mistake around Control flow?

**Answer:**

A common mistake is naming Control flow without understanding how it affects the conditionals and
loops that decide how code execution moves. In real work, that usually appears as weak design
choices, poor debugging, or incomplete explanations.

**Sample:**

```csharp
for (int i = 0; i < 10; i++)
{
    if (i == 3) continue;
    if (i == 7) break;
    Console.WriteLine(i);
}
```

---

### 59. How do you troubleshoot Control flow-related issues?

**Answer:**

When troubleshooting Control flow, first verify whether the conditionals and loops that decide how
code execution moves is behaving as expected. Then check surrounding dependencies, configuration,
logs, runtime behavior, and edge cases before changing the design.

**Sample:**

```csharp
var amount = -5;
if (amount < 0)
{
    Console.WriteLine("Amount cannot be negative");
}
else
{
    Console.WriteLine("Amount accepted");
}
```

---

### 60. How does Control flow connect to the rest of C# basics?

**Answer:**

Control flow connects to the rest of C# basics by giving structure to the conditionals and loops
that decide how code execution moves. It is one of the pieces that turns isolated facts into a
coherent end-to-end explanation.

**Sample:**

```csharp
var basket = new[] { 120m, 250m, 80m };
decimal total = 0;
foreach (var item in basket)
{
    total += item;
}
Console.WriteLine(total);
```

---

## 6. Methods and parameters

### 61. What is the role of Methods and parameters in C# basics?

**Answer:**

In C# basics, the term Methods and parameters refers to the callable units of behavior and the inputs they
receive. It is part of the foundation a candidate should be able to explain clearly.

**Sample:**

```csharp
decimal CalculateTotal(decimal subtotal, decimal taxRate = 0.18m)
{
    return subtotal + (subtotal * taxRate);
}

Console.WriteLine(CalculateTotal(1000m));
```

---

### 62. Why is the concept of Methods and parameters important in C# basics?

**Answer:**

This concept matters because it influences the callable units of behavior and the inputs
they receive. Good interview answers connect it to clarity, maintainability, performance, security,
or delivery depending on the situation.

**Sample:**

```csharp
decimal CalculateTotal(decimal subtotal, decimal taxRate = 0.18m)
{
    return subtotal + (subtotal * taxRate);
}

Console.WriteLine(CalculateTotal(1000m));
```

---

### 63. When should a team focus on Methods and parameters?

**Answer:**

A team should focus on Methods and parameters when the requirement depends on the callable units of
behavior and the inputs they receive. It becomes especially important when design decisions,
scalability, or debugging depend on that area.

**Sample:**

```csharp
decimal CalculateTotal(decimal subtotal, decimal taxRate = 0.18m)
{
    return subtotal + (subtotal * taxRate);
}

Console.WriteLine(CalculateTotal(1000m));
```

---

### 64. How is Methods and parameters applied in practice?

**Answer:**

In practice, Methods and parameters is applied by making the callable units of behavior and the
inputs they receive explicit in the code, runtime setup, or delivery workflow. The exact shape
depends on the application, but the responsibility should stay predictable.

**Sample:**

```csharp
bool TryGetDiscount(string customerType, out decimal discount)
{
    discount = customerType == "Premium" ? 0.15m : 0.05m;
    return true;
}

TryGetDiscount("Premium", out var rate);
Console.WriteLine(rate);
```

---

### 65. What strengths does Methods and parameters bring?

**Answer:**

The strengths of Methods and parameters are better structure, better communication, and better
control over the callable units of behavior and the inputs they receive. It also makes tradeoffs
easier to explain to reviewers, interviewers, and teammates.

**Sample:**

```csharp
decimal CalculateTotal(decimal subtotal, decimal taxRate = 0.18m)
{
    return subtotal + (subtotal * taxRate);
}

Console.WriteLine(CalculateTotal(1000m));
```

---

### 66. What tradeoffs come with Methods and parameters?

**Answer:**

The main tradeoff is extra complexity if Methods and parameters is introduced without a real need or
a clear understanding of the callable units of behavior and the inputs they receive. That usually
leads to overengineering, hidden bugs, or confusing architecture.

**Sample:**

```csharp
void AddFee(ref decimal amount, decimal fee)
{
    amount += fee;
}

decimal total = 100m;
AddFee(ref total, 15m);
Console.WriteLine(total);
// ref is useful but can make code harder to reason about if overused.
```

---

### 67. How does Methods and parameters differ from Exception handling?

**Answer:**

Methods and parameters is centered on the callable units of behavior and the inputs they receive,
while Exception handling is centered on the try catch finally model used to manage runtime failures
safely. They often work together, but they solve different parts of the topic.

**Sample:**

```csharp
void PrintLine(string value) => Console.WriteLine(value);
PrintLine("Hello");
// Methods package logic. Exception handling is about what happens when execution fails.
```

---

### 68. What is a good real-world example of Methods and parameters?

**Answer:**

A strong example is explaining how Methods and parameters affects a real feature, production issue,
migration, or architecture decision involving the callable units of behavior and the inputs they
receive. Interviewers usually care more about the reasoning than the definition alone.

**Sample:**

```csharp
bool TryGetDiscount(string customerType, out decimal discount)
{
    discount = customerType == "Premium" ? 0.15m : 0.05m;
    return true;
}

TryGetDiscount("Premium", out var rate);
Console.WriteLine(rate);
```

---

### 69. What is a best practice for Methods and parameters?

**Answer:**

A good practice is to keep Methods and parameters aligned with the actual requirement around the
callable units of behavior and the inputs they receive. Teams should document intent, keep
implementation readable, and validate important paths early.

**Sample:**

```csharp
bool TryGetDiscount(string customerType, out decimal discount)
{
    discount = customerType == "Premium" ? 0.15m : 0.05m;
    return true;
}

TryGetDiscount("Premium", out var rate);
Console.WriteLine(rate);
```

---

### 70. What is a common mistake around Methods and parameters?

**Answer:**

A common mistake is naming Methods and parameters without understanding how it affects the callable
units of behavior and the inputs they receive. In real work, that usually appears as weak design
choices, poor debugging, or incomplete explanations.

**Sample:**

```csharp
void AddFee(ref decimal amount, decimal fee)
{
    amount += fee;
}

decimal total = 100m;
AddFee(ref total, 15m);
Console.WriteLine(total);
// ref is useful but can make code harder to reason about if overused.
```

---

### 71. How do you troubleshoot Methods and parameters-related issues?

**Answer:**

When troubleshooting Methods and parameters, first verify whether the callable units of behavior and
the inputs they receive is behaving as expected. Then check surrounding dependencies, configuration,
logs, runtime behavior, and edge cases before changing the design.

**Sample:**

```csharp
decimal Divide(decimal total, int count)
{
    if (count == 0) throw new ArgumentException("Count cannot be zero.", nameof(count));
    return total / count;
}

Console.WriteLine(Divide(100m, 4));
```

---

### 72. How does Methods and parameters connect to the rest of C# basics?

**Answer:**

Methods and parameters connects to the rest of C# basics by giving structure to the callable units
of behavior and the inputs they receive. It is one of the pieces that turns isolated facts into a
coherent end-to-end explanation.

**Sample:**

```csharp
string BuildInvoiceNumber(int year, int sequence)
{
    return $"INV-{year}-{sequence:D4}";
}

Console.WriteLine(BuildInvoiceNumber(2026, 23));
```

---

## 7. Exception handling

### 73. What is the role of Exception handling in C# basics?

**Answer:**

In C# basics, the term Exception handling refers to the try catch finally model used to manage runtime
failures safely. It is part of the foundation a candidate should be able to explain clearly.

**Sample:**

```csharp
try
{
    int quantity = int.Parse("abc");
    Console.WriteLine(quantity);
}
catch (FormatException ex)
{
    Console.WriteLine($"Invalid quantity: {ex.Message}");
}
```

---

### 74. Why is the concept of Exception handling important in C# basics?

**Answer:**

This concept matters because it influences the try catch finally model used to manage runtime
failures safely. Good interview answers connect it to clarity, maintainability, performance,
security, or delivery depending on the situation.

**Sample:**

```csharp
try
{
    int quantity = int.Parse("abc");
    Console.WriteLine(quantity);
}
catch (FormatException ex)
{
    Console.WriteLine($"Invalid quantity: {ex.Message}");
}
```

---

### 75. When should a team focus on Exception handling?

**Answer:**

A team should focus on Exception handling when the requirement depends on the try catch finally
model used to manage runtime failures safely. It becomes especially important when design decisions,
scalability, or debugging depend on that area.

**Sample:**

```csharp
try
{
    int quantity = int.Parse("abc");
    Console.WriteLine(quantity);
}
catch (FormatException ex)
{
    Console.WriteLine($"Invalid quantity: {ex.Message}");
}
```

---

### 76. How is Exception handling applied in practice?

**Answer:**

In practice, Exception handling is applied by making the try catch finally model used to manage
runtime failures safely explicit in the code, runtime setup, or delivery workflow. The exact shape
depends on the application, but the responsibility should stay predictable.

**Sample:**

```csharp
decimal ParseAmount(string value)
{
    if (!decimal.TryParse(value, out var amount))
        throw new ArgumentException("Amount is invalid.", nameof(value));
    return amount;
}

Console.WriteLine(ParseAmount("1499.95"));
```

---

### 77. What strengths does Exception handling bring?

**Answer:**

The strengths of Exception handling are better structure, better communication, and better control
over the try catch finally model used to manage runtime failures safely. It also makes tradeoffs
easier to explain to reviewers, interviewers, and teammates.

**Sample:**

```csharp
try
{
    int quantity = int.Parse("abc");
    Console.WriteLine(quantity);
}
catch (FormatException ex)
{
    Console.WriteLine($"Invalid quantity: {ex.Message}");
}
```

---

### 78. What tradeoffs come with Exception handling?

**Answer:**

The main tradeoff is extra complexity if Exception handling is introduced without a real need or a
clear understanding of the try catch finally model used to manage runtime failures safely. That
usually leads to overengineering, hidden bugs, or confusing architecture.

**Sample:**

```csharp
try
{
    File.ReadAllText("missing.txt");
}
catch
{
    // Swallowing exceptions hides the real problem.
}
```

---

### 79. How does Exception handling differ from Strings and collections?

**Answer:**

Exception handling is centered on the try catch finally model used to manage runtime failures
safely, while Strings and collections is centered on the everyday data structures used to work with
text and groups of values. They often work together, but they solve different parts of the topic.

**Sample:**

```csharp
var names = new List<string> { "Asha", "Sai" };
Console.WriteLine(string.Join(", ", names));
// Exception handling reacts to failures. Strings and collections manage normal data.
```

---

### 80. What is a good real-world example of Exception handling?

**Answer:**

A strong example is explaining how Exception handling affects a real feature, production issue,
migration, or architecture decision involving the try catch finally model used to manage runtime
failures safely. Interviewers usually care more about the reasoning than the definition alone.

**Sample:**

```csharp
decimal ParseAmount(string value)
{
    if (!decimal.TryParse(value, out var amount))
        throw new ArgumentException("Amount is invalid.", nameof(value));
    return amount;
}

Console.WriteLine(ParseAmount("1499.95"));
```

---

### 81. What is a best practice for Exception handling?

**Answer:**

A good practice is to keep Exception handling aligned with the actual requirement around the try
catch finally model used to manage runtime failures safely. Teams should document intent, keep
implementation readable, and validate important paths early.

**Sample:**

```csharp
decimal ParseAmount(string value)
{
    if (!decimal.TryParse(value, out var amount))
        throw new ArgumentException("Amount is invalid.", nameof(value));
    return amount;
}

Console.WriteLine(ParseAmount("1499.95"));
```

---

### 82. What is a common mistake around Exception handling?

**Answer:**

A common mistake is naming Exception handling without understanding how it affects the try catch
finally model used to manage runtime failures safely. In real work, that usually appears as weak
design choices, poor debugging, or incomplete explanations.

**Sample:**

```csharp
try
{
    File.ReadAllText("missing.txt");
}
catch
{
    // Swallowing exceptions hides the real problem.
}
```

---

### 83. How do you troubleshoot Exception handling-related issues?

**Answer:**

When troubleshooting Exception handling, first verify whether the try catch finally model used to
manage runtime failures safely is behaving as expected. Then check surrounding dependencies,
configuration, logs, runtime behavior, and edge cases before changing the design.

**Sample:**

```csharp
try
{
    throw new InvalidOperationException("Payment gateway timed out.");
}
catch (Exception ex)
{
    Console.WriteLine(ex.GetType().Name);
    Console.WriteLine(ex.Message);
}
```

---

### 84. How does Exception handling connect to the rest of C# basics?

**Answer:**

Exception handling connects to the rest of C# basics by giving structure to the try catch finally
model used to manage runtime failures safely. It is one of the pieces that turns isolated facts into
a coherent end-to-end explanation.

**Sample:**

```csharp
using var writer = new StreamWriter("audit.log");
writer.WriteLine("Application started");
// using combines basic exception-safe cleanup with ordinary I/O work.
```

---

## 8. Strings and collections

### 85. What is the role of Strings and collections in C# basics?

**Answer:**

In C# basics, the term Strings and collections refers to the everyday data structures used to work with text
and groups of values. It is part of the foundation a candidate should be able to explain clearly.

**Sample:**

```csharp
var customerNames = new List<string> { "Asha", "Sai", "Neha" };
string csv = string.Join(", ", customerNames);
Console.WriteLine(csv);
```

---

### 86. Why is the concept of Strings and collections important in C# basics?

**Answer:**

This concept matters because it influences the everyday data structures used to work with
text and groups of values. Good interview answers connect it to clarity, maintainability,
performance, security, or delivery depending on the situation.

**Sample:**

```csharp
var customerNames = new List<string> { "Asha", "Sai", "Neha" };
string csv = string.Join(", ", customerNames);
Console.WriteLine(csv);
```

---

### 87. When should a team focus on Strings and collections?

**Answer:**

A team should focus on Strings and collections when the requirement depends on the everyday data
structures used to work with text and groups of values. It becomes especially important when design
decisions, scalability, or debugging depend on that area.

**Sample:**

```csharp
var customerNames = new List<string> { "Asha", "Sai", "Neha" };
string csv = string.Join(", ", customerNames);
Console.WriteLine(csv);
```

---

### 88. How is Strings and collections applied in practice?

**Answer:**

In practice, Strings and collections is applied by making the everyday data structures used to work
with text and groups of values explicit in the code, runtime setup, or delivery workflow. The exact
shape depends on the application, but the responsibility should stay predictable.

**Sample:**

```csharp
var inventory = new Dictionary<string, int>
{
    ["KB-001"] = 25,
    ["MS-002"] = 14
};

Console.WriteLine(inventory["KB-001"]);
```

---

### 89. What strengths does Strings and collections bring?

**Answer:**

The strengths of Strings and collections are better structure, better communication, and better
control over the everyday data structures used to work with text and groups of values. It also makes
tradeoffs easier to explain to reviewers, interviewers, and teammates.

**Sample:**

```csharp
var customerNames = new List<string> { "Asha", "Sai", "Neha" };
string csv = string.Join(", ", customerNames);
Console.WriteLine(csv);
```

---

### 90. What tradeoffs come with Strings and collections?

**Answer:**

The main tradeoff is extra complexity if Strings and collections is introduced without a real need
or a clear understanding of the everyday data structures used to work with text and groups of
values. That usually leads to overengineering, hidden bugs, or confusing architecture.

**Sample:**

```csharp
string result = "";
for (int i = 1; i <= 5; i++)
{
    result += i;
}
Console.WriteLine(result);
// Repeated string concatenation can create unnecessary allocations.
```

---

### 91. How does Strings and collections differ from Basic classes and objects?

**Answer:**

Strings and collections is centered on the everyday data structures used to work with text and
groups of values, while Basic classes and objects is centered on the object-oriented foundation used
to model data and behavior in C#. They often work together, but they solve different parts of the
topic.

**Sample:**

```csharp
var user = new Customer("Ravi");
Console.WriteLine(user.Name);
// Strings and collections hold data. Classes and objects bundle data with behavior.

public class Customer
{
    public string Name { get; }
    public Customer(string name) => Name = name;
}
```

---

### 92. What is a good real-world example of Strings and collections?

**Answer:**

A strong example is explaining how Strings and collections affects a real feature, production issue,
migration, or architecture decision involving the everyday data structures used to work with text
and groups of values. Interviewers usually care more about the reasoning than the definition alone.

**Sample:**

```csharp
var inventory = new Dictionary<string, int>
{
    ["KB-001"] = 25,
    ["MS-002"] = 14
};

Console.WriteLine(inventory["KB-001"]);
```

---

### 93. What is a best practice for Strings and collections?

**Answer:**

A good practice is to keep Strings and collections aligned with the actual requirement around the
everyday data structures used to work with text and groups of values. Teams should document intent,
keep implementation readable, and validate important paths early.

**Sample:**

```csharp
var inventory = new Dictionary<string, int>
{
    ["KB-001"] = 25,
    ["MS-002"] = 14
};

Console.WriteLine(inventory["KB-001"]);
```

---

### 94. What is a common mistake around Strings and collections?

**Answer:**

A common mistake is naming Strings and collections without understanding how it affects the everyday
data structures used to work with text and groups of values. In real work, that usually appears as
weak design choices, poor debugging, or incomplete explanations.

**Sample:**

```csharp
string result = "";
for (int i = 1; i <= 5; i++)
{
    result += i;
}
Console.WriteLine(result);
// Repeated string concatenation can create unnecessary allocations.
```

---

### 95. How do you troubleshoot Strings and collections-related issues?

**Answer:**

When troubleshooting Strings and collections, first verify whether the everyday data structures used
to work with text and groups of values is behaving as expected. Then check surrounding dependencies,
configuration, logs, runtime behavior, and edge cases before changing the design.

**Sample:**

```csharp
var uniqueTags = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
{
    "dotnet",
    "DotNet",
    "csharp"
};

Console.WriteLine(uniqueTags.Count);
```

---

### 96. How does Strings and collections connect to the rest of C# basics?

**Answer:**

Strings and collections connects to the rest of C# basics by giving structure to the everyday data
structures used to work with text and groups of values. It is one of the pieces that turns isolated
facts into a coherent end-to-end explanation.

**Sample:**

```csharp
var builder = new System.Text.StringBuilder();
builder.Append("INV");
builder.Append('-');
builder.Append(DateTime.UtcNow.Year);
Console.WriteLine(builder.ToString());
```

---

## 9. Basic classes and objects

### 97. What is the role of Basic classes and objects in C# basics?

**Answer:**

In C# basics, the term Basic classes and objects refers to the object-oriented foundation used to model data
and behavior in C#. It is part of the foundation a candidate should be able to explain clearly.

**Sample:**

```csharp
public class Product
{
    public string Name { get; }
    public decimal Price { get; private set; }

    public Product(string name, decimal price)
    {
        Name = name;
        Price = price;
    }

    public void ApplyDiscount(decimal percentage) => Price -= Price * percentage;
}
```

---

### 98. Why is the concept of Basic classes and objects important in C# basics?

**Answer:**

This concept matters because it influences the object-oriented foundation used to model
data and behavior in C#. Good interview answers connect it to clarity, maintainability, performance,
security, or delivery depending on the situation.

**Sample:**

```csharp
public class Product
{
    public string Name { get; }
    public decimal Price { get; private set; }

    public Product(string name, decimal price)
    {
        Name = name;
        Price = price;
    }

    public void ApplyDiscount(decimal percentage) => Price -= Price * percentage;
}
```

---

### 99. When should a team focus on Basic classes and objects?

**Answer:**

A team should focus on Basic classes and objects when the requirement depends on the object-oriented
foundation used to model data and behavior in C#. It becomes especially important when design
decisions, scalability, or debugging depend on that area.

**Sample:**

```csharp
public class Product
{
    public string Name { get; }
    public decimal Price { get; private set; }

    public Product(string name, decimal price)
    {
        Name = name;
        Price = price;
    }

    public void ApplyDiscount(decimal percentage) => Price -= Price * percentage;
}
```

---

### 100. How is Basic classes and objects applied in practice?

**Answer:**

In practice, Basic classes and objects is applied by making the object-oriented foundation used to
model data and behavior in C# explicit in the code, runtime setup, or delivery workflow. The exact
shape depends on the application, but the responsibility should stay predictable.

**Sample:**

```csharp
var product = new Product("Mechanical Keyboard", 4999m);
product.ApplyDiscount(0.10m);
Console.WriteLine(product.Price);
```

---

### 101. What strengths does Basic classes and objects bring?

**Answer:**

The strengths of Basic classes and objects are better structure, better communication, and better
control over the object-oriented foundation used to model data and behavior in C#. It also makes
tradeoffs easier to explain to reviewers, interviewers, and teammates.

**Sample:**

```csharp
public class Product
{
    public string Name { get; }
    public decimal Price { get; private set; }

    public Product(string name, decimal price)
    {
        Name = name;
        Price = price;
    }

    public void ApplyDiscount(decimal percentage) => Price -= Price * percentage;
}
```

---

### 102. What tradeoffs come with Basic classes and objects?

**Answer:**

The main tradeoff is extra complexity if Basic classes and objects is introduced without a real need
or a clear understanding of the object-oriented foundation used to model data and behavior in C#.
That usually leads to overengineering, hidden bugs, or confusing architecture.

**Sample:**

```csharp
public class UserService
{
    public void Register() { }
    public void Login() { }
    public void ExportAudit() { }
    public void GeneratePayroll() { }
}
// Even in basics, a class can become too broad.
```

---

### 103. How does Basic classes and objects differ from Memory and garbage collection?

**Answer:**

Basic classes and objects is centered on the object-oriented foundation used to model data and
behavior in C#, while Memory and garbage collection is centered on the automatic memory management
model used by the .NET runtime. They often work together, but they solve different parts of the
topic.

**Sample:**

```csharp
public class OrderSummary
{
    public decimal Total { get; }
    public OrderSummary(decimal total) => Total = total;
}

OrderSummary summary = new(1200m);
Console.WriteLine(summary.Total);
// Basic classes model business concepts. Memory/GC explains lifetime and cleanup.
```

---

### 104. What is a good real-world example of Basic classes and objects?

**Answer:**

A strong example is explaining how Basic classes and objects affects a real feature, production
issue, migration, or architecture decision involving the object-oriented foundation used to model
data and behavior in C#. Interviewers usually care more about the reasoning than the definition
alone.

**Sample:**

```csharp
var product = new Product("Mechanical Keyboard", 4999m);
product.ApplyDiscount(0.10m);
Console.WriteLine(product.Price);
```

---

### 105. What is a best practice for Basic classes and objects?

**Answer:**

A good practice is to keep Basic classes and objects aligned with the actual requirement around the
object-oriented foundation used to model data and behavior in C#. Teams should document intent, keep
implementation readable, and validate important paths early.

**Sample:**

```csharp
var product = new Product("Mechanical Keyboard", 4999m);
product.ApplyDiscount(0.10m);
Console.WriteLine(product.Price);
```

---

### 106. What is a common mistake around Basic classes and objects?

**Answer:**

A common mistake is naming Basic classes and objects without understanding how it affects the
object-oriented foundation used to model data and behavior in C#. In real work, that usually appears
as weak design choices, poor debugging, or incomplete explanations.

**Sample:**

```csharp
public class UserService
{
    public void Register() { }
    public void Login() { }
    public void ExportAudit() { }
    public void GeneratePayroll() { }
}
// Even in basics, a class can become too broad.
```

---

### 107. How do you troubleshoot Basic classes and objects-related issues?

**Answer:**

When troubleshooting Basic classes and objects, first verify whether the object-oriented foundation
used to model data and behavior in C# is behaving as expected. Then check surrounding dependencies,
configuration, logs, runtime behavior, and edge cases before changing the design.

**Sample:**

```csharp
var customer = new Customer("Asha");
Console.WriteLine(customer.Name);

public class Customer
{
    public string Name { get; }
    public Customer(string name) => Name = name;
}
```

---

### 108. How does Basic classes and objects connect to the rest of C# basics?

**Answer:**

Basic classes and objects connects to the rest of C# basics by giving structure to the object-
oriented foundation used to model data and behavior in C#. It is one of the pieces that turns
isolated facts into a coherent end-to-end explanation.

**Sample:**

```csharp
var product = new Product("SSD", 7499m);
Console.WriteLine($"{product.Name}: {product.Price}");
```

---

## 10. Memory and garbage collection

### 109. What is the role of Memory and garbage collection in C# basics?

**Answer:**

In C# basics, the term Memory and garbage collection refers to the automatic memory management model used by
the .NET runtime. It is part of the foundation a candidate should be able to explain clearly.

**Sample:**

```csharp
using var reader = new StreamReader("orders.txt");
string? firstLine = reader.ReadLine();
Console.WriteLine(firstLine);
```

---

### 110. Why is the concept of Memory and garbage collection important in C# basics?

**Answer:**

This concept matters because it influences the automatic memory management model
used by the .NET runtime. Good interview answers connect it to clarity, maintainability,
performance, security, or delivery depending on the situation.

**Sample:**

```csharp
using var reader = new StreamReader("orders.txt");
string? firstLine = reader.ReadLine();
Console.WriteLine(firstLine);
```

---

### 111. When should a team focus on Memory and garbage collection?

**Answer:**

A team should focus on Memory and garbage collection when the requirement depends on the automatic
memory management model used by the .NET runtime. It becomes especially important when design
decisions, scalability, or debugging depend on that area.

**Sample:**

```csharp
using var reader = new StreamReader("orders.txt");
string? firstLine = reader.ReadLine();
Console.WriteLine(firstLine);
```

---

### 112. How is Memory and garbage collection applied in practice?

**Answer:**

In practice, Memory and garbage collection is applied by making the automatic memory management
model used by the .NET runtime explicit in the code, runtime setup, or delivery workflow. The exact
shape depends on the application, but the responsibility should stay predictable.

**Sample:**

```csharp
var texts = new List<string>();
for (int i = 0; i < 1000; i++)
{
    texts.Add($"Item-{i}");
}
Console.WriteLine(texts.Count);
```

---

### 113. What strengths does Memory and garbage collection bring?

**Answer:**

The strengths of Memory and garbage collection are better structure, better communication, and
better control over the automatic memory management model used by the .NET runtime. It also makes
tradeoffs easier to explain to reviewers, interviewers, and teammates.

**Sample:**

```csharp
using var reader = new StreamReader("orders.txt");
string? firstLine = reader.ReadLine();
Console.WriteLine(firstLine);
```

---

### 114. What tradeoffs come with Memory and garbage collection?

**Answer:**

The main tradeoff is extra complexity if Memory and garbage collection is introduced without a real
need or a clear understanding of the automatic memory management model used by the .NET runtime.
That usually leads to overengineering, hidden bugs, or confusing architecture.

**Sample:**

```csharp
var cache = new List<byte[]>();
for (int i = 0; i < 50; i++)
{
    cache.Add(new byte[1024 * 1024]);
}
Console.WriteLine(cache.Count);
// Holding references means the GC cannot reclaim the objects.
```

---

### 115. How does Memory and garbage collection differ from CLR and assemblies?

**Answer:**

Memory and garbage collection is centered on the automatic memory management model used by the .NET
runtime, while CLR and assemblies is centered on the runtime and compiled unit model that executes
C# applications. They often work together, but they solve different parts of the topic.

**Sample:**

```csharp
var assemblyName = typeof(string).Assembly.GetName().Name;
Console.WriteLine(assemblyName);
// CLR runs the code. GC manages object lifetime while the program is running.
```

---

### 116. What is a good real-world example of Memory and garbage collection?

**Answer:**

A strong example is explaining how Memory and garbage collection affects a real feature, production
issue, migration, or architecture decision involving the automatic memory management model used by
the .NET runtime. Interviewers usually care more about the reasoning than the definition alone.

**Sample:**

```csharp
var texts = new List<string>();
for (int i = 0; i < 1000; i++)
{
    texts.Add($"Item-{i}");
}
Console.WriteLine(texts.Count);
```

---

### 117. What is a best practice for Memory and garbage collection?

**Answer:**

A good practice is to keep Memory and garbage collection aligned with the actual requirement around
the automatic memory management model used by the .NET runtime. Teams should document intent, keep
implementation readable, and validate important paths early.

**Sample:**

```csharp
var texts = new List<string>();
for (int i = 0; i < 1000; i++)
{
    texts.Add($"Item-{i}");
}
Console.WriteLine(texts.Count);
```

---

### 118. What is a common mistake around Memory and garbage collection?

**Answer:**

A common mistake is naming Memory and garbage collection without understanding how it affects the
automatic memory management model used by the .NET runtime. In real work, that usually appears as
weak design choices, poor debugging, or incomplete explanations.

**Sample:**

```csharp
var cache = new List<byte[]>();
for (int i = 0; i < 50; i++)
{
    cache.Add(new byte[1024 * 1024]);
}
Console.WriteLine(cache.Count);
// Holding references means the GC cannot reclaim the objects.
```

---

### 119. How do you troubleshoot Memory and garbage collection-related issues?

**Answer:**

When troubleshooting Memory and garbage collection, first verify whether the automatic memory
management model used by the .NET runtime is behaving as expected. Then check surrounding
dependencies, configuration, logs, runtime behavior, and edge cases before changing the design.

**Sample:**

```csharp
Console.WriteLine($"Managed bytes: {GC.GetTotalMemory(false)}");
GC.Collect();
GC.WaitForPendingFinalizers();
Console.WriteLine($"After collection: {GC.GetTotalMemory(true)}");
```

---

### 120. How does Memory and garbage collection connect to the rest of C# basics?

**Answer:**

Memory and garbage collection connects to the rest of C# basics by giving structure to the automatic
memory management model used by the .NET runtime. It is one of the pieces that turns isolated facts
into a coherent end-to-end explanation.

**Sample:**

```csharp
var lines = new List<string> { "INV-001", "INV-002" };
Console.WriteLine(string.Join(Environment.NewLine, lines));
// Memory behavior affects even simple strings, lists, and objects.
```
---

## 11. Tricky interview questions

### 121. Why is boxing a tricky C# basics interview question?

**Answer:**

Boxing silently wraps a value type inside an object reference. It is easy to miss, and it can add
extra allocations or surprising behavior in collections and APIs that use `object`.

**Sample:**

```csharp
int count = 5;
object boxed = count;      // boxing
int unboxed = (int)boxed;  // unboxing
Console.WriteLine(unboxed);
```

---

### 122. What is tricky about string interning in C#?

**Answer:**

Two string variables can point to the same interned value even though they look like separate
objects. Candidates often mix up reference equality and value equality when strings are involved.

**Sample:**

```csharp
string first = "dotnet";
string second = "dot" + "net";
string third = new string(new[] { 'd', 'o', 't', 'n', 'e', 't' });

Console.WriteLine(first == second);
Console.WriteLine(object.ReferenceEquals(first, second));
Console.WriteLine(object.ReferenceEquals(first, third));
```

---

### 123. Why are `checked` and `unchecked` worth knowing in basics?

**Answer:**

Integer overflow can either throw or wrap depending on context. That makes arithmetic bugs tricky,
especially when code moves between debug assumptions and production scenarios.

**Sample:**

```csharp
checked
{
    try
    {
        int max = int.MaxValue;
        Console.WriteLine(max + 1);
    }
    catch (OverflowException ex)
    {
        Console.WriteLine(ex.GetType().Name);
    }
}
```

---

### 124. What is the subtle difference between `const` and `readonly`?

**Answer:**

`const` is baked into compiled code at compile time, while `readonly` is assigned at runtime. That
difference matters for versioning, configuration, and values that should not be inlined.

**Sample:**

```csharp
public class TaxSettings
{
    public const decimal VatRateConst = 0.18m;
    public readonly decimal VatRateReadonly;

    public TaxSettings(decimal vatRateReadonly)
    {
        VatRateReadonly = vatRateReadonly;
    }
}
```

---

### 125. Why can `foreach` feel tricky with mutable objects?

**Answer:**

The loop variable may look isolated, but if the items are reference types you are still mutating the
same underlying objects. Developers sometimes expect copy behavior and do not get it.

**Sample:**

```csharp
var users = new List<User>
{
    new("Asha"),
    new("Sai")
};

foreach (var user in users)
{
    user.Name = user.Name.ToUpperInvariant();
}

Console.WriteLine(string.Join(", ", users.Select(u => u.Name)));

public class User
{
    public string Name { get; set; }
    public User(string name) => Name = name;
}
```

---

### 126. What makes `default` tricky for value types and reference types?

**Answer:**

`default` depends on the target type. For a reference type it becomes `null`, while for a value type
it becomes the zeroed-out version of that struct or numeric type.

**Sample:**

```csharp
int number = default;
DateTime date = default;
string? text = default;

Console.WriteLine(number);
Console.WriteLine(date);
Console.WriteLine(text is null);
```

---

### 127. Why do `ref`, `out`, and `in` confuse many beginners?

**Answer:**

They all pass arguments by reference, but with different intent and rules. Interviewers like this
topic because syntax similarity hides important differences in behavior.

**Sample:**

```csharp
void Increment(ref int value) => value++;
void Create(out int value) => value = 10;
void Print(in int value) => Console.WriteLine(value);

int a = 1;
Increment(ref a);
Create(out int b);
Print(in b);
```

---

### 128. Why is `using` important even in C# basics?

**Answer:**

Garbage collection does not automatically release unmanaged resources at the exact moment you need.
`using` is how you express deterministic cleanup for streams, files, and similar resources.

**Sample:**

```csharp
using (var writer = new StreamWriter("app.log"))
{
    writer.WriteLine("Application started");
}

Console.WriteLine("Writer disposed");
```
