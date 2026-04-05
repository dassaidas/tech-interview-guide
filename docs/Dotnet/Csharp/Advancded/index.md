# Advanced Topics in C# Interview Questions

![Advanced Topics in C# Interview Questions](../../../assets/csharp-async-flow.svg)

This page focuses on advanced C# concepts that typically appear after the fundamentals are already comfortable.

## 1. Delegates and events

### 1. What is the role of Delegates and events in advanced C#?

**Answer:**

Delegates enable callbacks and decoupled communication. Events provide a publish-subscribe pattern where publishers notify subscribers without knowing them. Together they enable loose coupling, observer pattern, and event-driven architectures.

**Detailed Example:**

```csharp
// DELEGATE: Type-safe function reference
public delegate void OrderStatusHandler(string orderId, string status);

// EVENT: Publisher encapsulates subscriber management
public class OrderService
{
    // Event using built-in EventHandler
    public event EventHandler<OrderStatusEventArgs> OrderStatusChanged;

    public void PlaceOrder(string orderId)
    {
        Console.WriteLine($"Processing order {orderId}");

        // Simulate processing
        Task.Delay(1000).Wait();

        // Raise event - only publisher can invoke
        OnOrderStatusChanged(orderId, "Shipped");
    }

    // Protected method to raise event
    protected virtual void OnOrderStatusChanged(string orderId, string status)
    {
        OrderStatusChanged?.Invoke(this, new OrderStatusEventArgs { OrderId = orderId, Status = status });
    }
}

// CUSTOM EVENT ARGS
public class OrderStatusEventArgs : EventArgs
{
    public string OrderId { get; set; }
    public string Status { get; set; }
}

// SUBSCRIBER: Decoupled from publisher
public class OrderNotificationService
{
    public void Subscribe(OrderService service)
    {
        // Weak subscription pattern
        service.OrderStatusChanged += OnOrderStatusChanged;
    }

    private void OnOrderStatusChanged(object sender, OrderStatusEventArgs e)
    {
        Console.WriteLine($"📧 Notification: Order {e.OrderId} is {e.Status}");
        SendEmailNotification(e.OrderId, e.Status);
    }

    private void SendEmailNotification(string orderId, string status)
    {
        // Email logic
    }
}

// USAGE
var orderService = new OrderService();
var notificationService = new OrderNotificationService();
notificationService.Subscribe(orderService);

orderService.PlaceOrder("ORD-001");
// Output:
// Processing order ORD-001
// 📧 Notification: Order ORD-001 is Shipped
```

---

### 2-12. Delegates and Events Deep Dive

**Key Concepts Covered:**

```csharp
// MULTICAST DELEGATES (multiple subscribers)
public delegate void DataProcessor(string data);

DataProcessor processor = Console.WriteLine;
processor += data => Console.WriteLine($"Processed: {data}");
processor("Test");  // Calls both subscribers

// WEAK EVENTS (prevent memory leaks)
// Using WeakEventManager for scenarios with many subscribers
public class DataProvider
{
    private List<(WeakReference<IDataChanged> subscriber, int id)> subscribers = new();

    public void Subscribe(IDataChanged subscriber)
    {
        subscribers.Add((new WeakReference<IDataChanged>(subscriber), subscribers.Count));
    }

    public void RaiseDataChanged()
    {
        subscribers.RemoveAll(s => !s.Item1.TryGetTarget(out _));
        foreach (var (weakRef, _) in subscribers)
        {
            if (weakRef.TryGetTarget(out var subscriber))
                subscriber.OnDataChanged();
        }
    }
}

// CUSTOM EVENT PATTERN (best practice)
public class DataChangeEventArgs : EventArgs
{
    public required string PropertyName { get; init; }
    public required object OldValue { get; init; }
    public required object NewValue { get; init; }
    public DateTime ChangedAt { get; init; } = DateTime.UtcNow;
}

public class DataModel
{
    private string _name;

    public event EventHandler<DataChangeEventArgs> PropertyChanged;

    public string Name
    {
        get => _name;
        set
        {
            if (_name != value)
            {
                var oldValue = _name;
                _name = value;
                OnPropertyChanged(nameof(Name), oldValue, value);
            }
        }
    }

    protected virtual void OnPropertyChanged(string propertyName, object oldValue, object newValue)
    {
        PropertyChanged?.Invoke(this, new DataChangeEventArgs
        {
            PropertyName = propertyName,
            OldValue = oldValue,
            NewValue = newValue
        });
    }
}

// DELEGATES WITH MULTIPLE RETURN VALUES
public delegate (bool success, string message) ValidationDelegate(string input);

ValidationDelegate validator = input =>
{
    if (string.IsNullOrEmpty(input))
        return (false, "Input cannot be empty");
    return (true, "Valid");
};

var (success, message) = validator("test");

// BEST PRACTICE: Use Action<T> and Func<T> over custom delegates
public class Repository<T>
{
    public event Action<T> ItemAdded;
    public event Func<T, Task> ItemProcessing;

    public void Add(T item)
    {
        ItemAdded?.Invoke(item);
    }

    public async Task ProcessAsync(T item)
    {
        if (ItemProcessing != null)
        {
            foreach (Func<T, Task> handler in ItemProcessing.GetInvocationList())
            {
                await handler(item);
            }
        }
    }
}
```

var even = numbers.Where(n => n % 2 == 0);
await Task.Delay(10);
Console.WriteLine(string.Join(",", even));

````

---

### 6. What tradeoffs come with Delegates and events?

**Answer:**

The main tradeoff is extra complexity if Delegates and events is introduced without a real need or a
clear understanding of the callable abstraction and notification model used for decoupled behavior.
That usually leads to overengineering, hidden bugs, or confusing architecture.

**Sample:**

```csharp
// OVERENGINEERING: Events add complexity when not needed
// ❌ Bad: Using events for simple notification
public class SimpleButton
{
    public event EventHandler Clicked;  // Overkill for single subscriber

    public void Click()
    {
        Clicked?.Invoke(this, EventArgs.Empty);
    }
}

// ✅ Better: Direct callback for simple notification
public class SimpleButton
{
    public Action OnClick { get; set; }

    public void Click()
    {
        OnClick?.Invoke();
    }
}

// HIDDEN BUGS: Memory leaks with events
var publisher = new EventPublisher();
var subscriber = new EventSubscriber();
subscriber.Subscribe(publisher);
// Forgot to unsubscribe → subscriber won't be garbage collected

// Better approach: Use weak event pattern or IDisposable
public class EventSubscriber : IDisposable
{
    private EventPublisher _publisher;

    public void Subscribe(EventPublisher publisher)
    {
        _publisher = publisher;
        _publisher.DataChanged += OnDataChanged;
    }

    public void Dispose()
    {
        if (_publisher != null)
            _publisher.DataChanged -= OnDataChanged;  // Unsubscribe
    }

    private void OnDataChanged(object sender, EventArgs e) { }
}
````

---

### 7. How does Delegates and events differ from Lambda expressions?

**Answer:**

Delegates and events is centered on the callable abstraction and notification model used for
decoupled behavior, while Lambda expressions is centered on the concise function syntax used heavily
in modern C#. They often work together, but they solve different parts of the topic.

**Sample:**

```csharp
// DELEGATES: Named callback pattern
public delegate void LogHandler(string message);

public class Logger
{
    public LogHandler OnLog;  // Delegate field

    public void Log(string message) => OnLog?.Invoke(message);
}

// LAMBDA WITH DELEGATES: Concise inline implementation
var logger = new Logger();
logger.OnLog = msg => Console.WriteLine($"[LOG] {msg}");  // Lambda expression
logger.Log("Test");

// EVENTS: Encapsulated notification pattern
public class EventBasedLogger
{
    public event EventHandler<LogEventArgs> OnLog;  // Event: more control

    public void Log(string message)
    {
        OnLog?.Invoke(this, new LogEventArgs { Message = message });
    }
}

// LAMBDA WITH EVENTS: Also uses lambda syntax
var eventLogger = new EventBasedLogger();
eventLogger.OnLog += (sender, e) => Console.WriteLine($"[EVENT] {e.Message}");  // Lambda
eventLogger.Log("Test");
```

---

### 8. What is a good real-world example of Delegates and events?

**Answer:**

A strong example is explaining how Delegates and events affects a real feature, production issue,
migration, or architecture decision involving the callable abstraction and notification model used
for decoupled behavior. Interviewers usually care more about the reasoning than the definition
alone.

**Sample:**

```csharp
// REAL-WORLD: UI Button + Multiple Handlers
public class Button
{
    public event EventHandler Click;  // Multiple subscribers can listen

    public void Raise()
    {
        Click?.Invoke(this, EventArgs.Empty);
    }
}

// Different systems respond to same event
var button = new Button();

// Analytics system
button.Click += (s, e) => Analytics.TrackClick();

// UI feedback
button.Click += (s, e) => PlayClickSound();

// Business logic
button.Click += (s, e) => ProcessPayment();

button.Raise();  // All three handlers execute

// BENEFIT: Decoupled systems - button doesn't know about listeners
// New features can subscribe without modifying Button class
// Follows Open/Closed Principle
```

---

### 9. What is a best practice for Delegates and events?

**Answer:**

A good practice is to keep Delegates and events aligned with the actual requirement around the
callable abstraction and notification model used for decoupled behavior. Teams should document
intent, keep implementation readable, and validate important paths early.

**Sample:**

```csharp
// BEST PRACTICE: EventHandler<T> pattern with EventArgs
public class DataChangeEventArgs : EventArgs
{
    public string PropertyName { get; init; }
    public object OldValue { get; init; }
    public object NewValue { get; init; }
}

public class DataModel
{
    // Standard .NET pattern
    public event EventHandler<DataChangeEventArgs> PropertyChanged;

    private string _name;
    public string Name
    {
        get => _name;
        set
        {
            if (_name != value)
            {
                var old = _name;
                _name = value;
                // Protected method to raise event
                OnPropertyChanged(nameof(Name), old, value);
            }
        }
    }

    // Protected virtual method - allows overriding
    protected virtual void OnPropertyChanged(string property, object oldValue, object newValue)
    {
        PropertyChanged?.Invoke(this, new DataChangeEventArgs
        {
            PropertyName = property,
            OldValue = oldValue,
            NewValue = newValue
        });
    }
}

// USAGE: Clear intent, follows Microsoft conventions
var model = new DataModel();
model.PropertyChanged += (sender, e) =>
    Console.WriteLine($"{e.PropertyName} changed from {e.OldValue} to {e.NewValue}");
model.Name = "Test";
```

---

### 10. What is a common mistake around Delegates and events?

**Answer:**

A common mistake is naming Delegates and events without understanding how it affects the callable
abstraction and notification model used for decoupled behavior. In real work, that usually appears
as weak design choices, poor debugging, or incomplete explanations.

**Sample:**

```csharp
// ❌ MISTAKE 1: Memory leaks - forgetting to unsubscribe
public class Window
{
    public event EventHandler Closing;
}

var win = new Window();
var handler = new EventHandler((s, e) => Console.WriteLine("Closing"));
win.Closing += handler;
// BUG: handler still referenced by win.Closing, prevents garbage collection

// ✅ FIXED: Properly unsubscribe
win.Closing -= handler;  // Now handler can be GC'd

// ❌ MISTAKE 2: Invoking events from wrong place
public class BadPublisher
{
    public event EventHandler DataChanged;

    public void SetData(string value)
    {
        // Public invocation - anyone can raise the event!
        DataChanged?.Invoke(this, EventArgs.Empty);
    }
}

// External code can fake the event
badPublisher.DataChanged?.Invoke(this, EventArgs.Empty);  // Fake notification!

// ✅ FIXED: Protect the event
public class GoodPublisher
{
    public event EventHandler DataChanged;

    public void SetData(string value)
    {
        OnDataChanged();  // Only SetData can raise
    }

    // Only accessible within this class
    protected virtual void OnDataChanged()
    {
        DataChanged?.Invoke(this, EventArgs.Empty);
    }
}

// ❌ MISTAKE 3: Not checking for subscribers before invoking
public event EventHandler StateChanged;
StateChanged?.Invoke(this, EventArgs.Empty);  // ✅ Correct - null-coalescing prevents null ref

// ❌ WRONG:
if (StateChanged != null)  // Race condition if unsubscribed between check and invoke
    StateChanged.Invoke(this, EventArgs.Empty);
```

---

### 11. How do you troubleshoot Delegates and events-related issues?

**Answer:**

When troubleshooting Delegates and events, first verify whether the callable abstraction and
notification model used for decoupled behavior is behaving as expected. Then check surrounding
dependencies, configuration, logs, runtime behavior, and edge cases before changing the design.

**Sample:**

```csharp
// TROUBLESHOOTING: Event handlers not firing
public class Publisher
{
    public event EventHandler DataChanged;

    public void PublishData()
    {
        Console.WriteLine("About to raise event");  // Debugging
        DataChanged?.Invoke(this, EventArgs.Empty);
        Console.WriteLine("Event raised");
    }
}

public class Subscriber
{
    public Publisher Publisher { get; set; }
    private int _callCount = 0;

    public void Subscribe()
    {
        Publisher.DataChanged += OnDataChanged;
        Console.WriteLine($"Subscribed - total handlers: {Publisher.DataChanged?.GetInvocationList().Length ?? 0}");
    }

    private void OnDataChanged(object sender, EventArgs e)
    {
        _callCount++;
        Console.WriteLine($"OnDataChanged called (count: {_callCount})");
    }
}

// DEBUGGING: Check invocation list
public class EventDebugger
{
    public static void DumpHandlers(Delegate @event)
    {
        if (@event == null)
        {
            Console.WriteLine("No handlers subscribed");
            return;
        }

        var handlers = @event.GetInvocationList();
        Console.WriteLine($"Total handlers: {handlers.Length}");
        foreach (var handler in handlers)
        {
            Console.WriteLine($"  - {handler.Target?.GetType().Name}.{handler.Method.Name}");
        }
    }
}
```

---

### 12. How does Delegates and events connect to the rest of advanced C#?

**Answer:**

Delegates and events connects to the rest of advanced C# by giving structure to the callable
abstraction and notification model used for decoupled behavior. It is one of the pieces that turns
isolated facts into a coherent end-to-end explanation.

**Sample:**

```csharp
// INTEGRATION: Events + Async + LINQ
public class DataService
{
    // Event publish point
    public event EventHandler<DataEventArgs> DataAvailable;

    // Async operation with event notification
    public async Task LoadDataAsync()
    {
        var data = await FetchFromApiAsync();
        OnDataAvailable(data);
    }

    protected virtual void OnDataAvailable(List<string> data)
    {
        DataAvailable?.Invoke(this, new DataEventArgs { Data = data });
    }

    private async Task<List<string>> FetchFromApiAsync()
    {
        // API call
        await Task.Delay(100);
        return new List<string> { "A", "B", "C" };
    }
}

// COMBINED USAGE: Events + Lambda + LINQ + Async
var service = new DataService();

// Lambda handler subscribes to event
service.DataAvailable += async (sender, e) =>
{
    // LINQ processes data
    var filtered = e.Data.Where(x => x.Length > 0).ToList();

    // Async call in handler
    await Task.Delay(50);
    Console.WriteLine($"Processed {filtered.Count} items");
};

// Trigger the event chain
await service.LoadDataAsync();
```

---

## 2. Lambda expressions

### 13. What is the role of Lambda expressions in advanced C#?

**Answer:**

Lambda expressions provide concise, anonymous function syntax. They enable functional programming styles, integrate with LINQ for data processing, and allow closure over local variables. Essential for callbacks, predicates, projections, and modern C# patterns.

**Detailed Example:**

```csharp
// BASIC LAMBDA: Type inference from context
// Explicit parameter types
Func<int, int, int> add = (int x, int y) => x + y;

// Implicit parameter types (inferred)
Func<int, int, int> multiply = (x, y) => x * y;  // Types inferred from Func<int,int,int>

// Single parameter - parentheses optional
Func<string, int> length = s => s.Length;
Func<string, int> length2 = (s) => s.Length;  // Also valid

// CLOSURES: Capturing variables from outer scope
int multiplier = 5;
Func<int, int> scale = x => x * multiplier;  // Captures multiplier variable
Console.WriteLine(scale(10));  // Output: 50

multiplier = 10;
Console.WriteLine(scale(10));  // Output: 100 - uses updated value!

// EXPRESSION BODIES: Statement vs expression lambdas
// Expression lambda (returns value)
Func<int, bool> isEven = x => x % 2 == 0;

// Statement lambda (can contain multiple statements)
Func<int, string> describe = x =>
{
    var type = x % 2 == 0 ? "even" : "odd";
    var positive = x > 0 ? "positive" : "non-positive";
    return $"{x} is {positive} and {type}";
};

Console.WriteLine(describe(-4));  // -4 is non-positive and even

// PRACTICE PATTERN 1: LINQ Queries
var users = new List<User>
{
    new { Id = 1, Name = "Alice", Age = 30 },
    new { Id = 2, Name = "Bob", Age = 25 },
    new { Id = 3, Name = "Charlie", Age = 35 }
};

// Filter with lambda predicate
var adults = users.Where(u => u.Age >= 18).ToList();

// Transform with lambda projection
var names = users.Select(u => u.Name).ToList();

// Complex projection with object initialization
var dtos = users
    .Where(u => u.Age > 25)
    .Select(u => new UserDto
    {
        Id = u.Id,
        DisplayName = $"{u.Name} ({u.Age})",
        IsAdmin = u.Age > 30
    })
    .ToList();

// PRACTICE PATTERN 2: Event handlers
button.Click += (sender, e) =>
{
    MessageBox.Show("Button clicked");
};

// PRACTICE PATTERN 3: Async callbacks
await Task.Run(() =>
{
    LongRunningOperation();
    Console.WriteLine("Done");
});

// PRACTICE PATTERN 4: Recursive lambdas (require manual casting)
Func<int, int> factorial = null;
factorial = n => n <= 1 ? 1 : n * factorial(n - 1);
Console.WriteLine(factorial(5));  // 120

// BEST PRACTICE: When to use lambdas vs named methods
// Use lambda for:
// - Simple, one-off callbacks
// - LINQ predicates and projections
// - Event handlers with minimal logic
users.Where(u => u.Age > 25)  // ✅ Lambda here is clear

// Use named methods for:
// - Complex logic
// - Reusable operations
// - Methods that need documentation
public bool IsAdult(User u) => u.Age >= 18;
users.Where(IsAdult)  // ✅ Named method is clearer
```

// Concept: 2. Lambda expressions
var numbers = new[] { 1, 2, 3, 4 };
var even = numbers.Where(n => n % 2 == 0);
await Task.Delay(10);
Console.WriteLine(string.Join(",", even));

````

---

### 16. How is Lambda expressions applied in practice?

**Answer:**

In practice, Lambda expressions is applied by making the concise function syntax used heavily in
modern C# explicit in the code, runtime setup, or delivery workflow. The exact shape depends on the
application, but the responsibility should stay predictable.

**Sample:**

```csharp
// PRACTICAL APPLICATIONS: Lambda in common scenarios

// 1. LINQ Queries
var users = new List<User> { /*...*/ };
var adults = users.Where(u => u.Age >= 18).ToList();
var names = users.Select(u => u.Name).ToList();

// 2. Event Handlers
button.Click += (sender, e) =>
{
    MessageBox.Show("Button clicked!");
};

// 3. Callback Functions
Task.Run(() =>
{
    Console.WriteLine("Long operation completed");
    return 42;
});

// 4. Predicate Functions
Func<int, bool> isPositive = x => x > 0;
var positives = numbers.Where(isPositive).ToList();

// 5. Transformation Functions
Func<string, int> getLength = s => s.Length;
var lengths = words.Select(getLength).ToList();

// 6. Sorting with custom logic
var sorted = users.OrderBy(u => u.Age).ThenBy(u => u.Name).ToList();
````

---

### 17. What strengths does Lambda expressions bring?

**Answer:**

The strengths of Lambda expressions are better structure, better communication, and better control
over the concise function syntax used heavily in modern C#. It also makes tradeoffs easier to
explain to reviewers, interviewers, and teammates.

**Sample:**

```csharp
// STRENGTH 1: Conciseness

// Without lambda - verbose named method
public bool IsAdult(User u) { return u.Age >= 18; }
var adults = users.Where(IsAdult).ToList();

// With lambda - inline and clear
var adults = users.Where(u => u.Age >= 18).ToList();

// STRENGTH 2: Closure - captures surrounding context
int threshold = 25;
var above = users.Where(u => u.Age > threshold).ToList();  // Captures 'threshold'

// STRENGTH 3: Readability in LINQ chains
// Without lambda requirement:
var result = users
    .Where(u => u.IsActive)  // Readable intent
    .OrderBy(u => u.Name)
    .Select(u => new { u.Name, u.Age })
    .ToList();

// STRENGTH 4: Functional composition
Func<int, int> double_val = x => x * 2;
Func<int, int> addFive = x => x + 5;
Func<int, int> composed = x => addFive(double_val(x));
Console.WriteLine(composed(3));  // 11
```

---

### 18. What tradeoffs come with Lambda expressions?

**Answer:**

The main tradeoff is extra complexity if Lambda expressions is introduced without a real need or a
clear understanding of the concise function syntax used heavily in modern C#. That usually leads to
overengineering, hidden bugs, or confusing architecture.

**Sample:**

```csharp
// TRADEOFF 1: Readability with complex logic

// ❌ Over-complicated lambda
var result = users
    .Where(u => u.Age >= 18 && u.IsActive && u.Department == "Engineering" &&
                u.Salary > 50000 && u.YearsExp >= 2)
    .ToList();

// ✅ Better: Extract to named method
private bool IsQualifiedEngineer(User u) =>
    u.Age >= 18 && u.IsActive && u.Department == "Engineering" &&
    u.Salary > 50000 && u.YearsExp >= 2;

var result = users.Where(IsQualifiedEngineer).ToList();

// TRADEOFF 2: Debugging difficulty
var processed = data
    .Where(x => x > 0)
    .Select(x => x * 2)
    .Where(x => x < 100)
    .ToList();  // Hard to debug intermediate values

// Better: Use intermediate variables when debugging
var positive = data.Where(x => x > 0).ToList();
var doubled = positive.Select(x => x * 2).ToList();
var filtered = doubled.Where(x => x < 100).ToList();

// TRADEOFF 3: Performance of closures
var functions = new List<Func<int>>();
for (int i = 0; i < 10; i++)
{
    functions.Add(() => i);  // Closure over 'i' - all return 10!
}

// Each function captures the same 'i' variable
var x = functions[0]();  // Returns 10, not 0!
```

---

### 19. How does Lambda expressions differ from Generics?

**Answer:**

Lambda expressions is centered on the concise function syntax used heavily in modern C#, while
Generics is centered on the type-safe abstraction model used to write reusable logic without losing
compile-time safety. They often work together, but they solve different parts of the topic.

**Sample:**

```csharp
// GENERICS: Type safety at compile-time
public class Generic<T>
{
    public T Process(T input) => input;  // T is concrete type
}

// Type-safe, but doesn't define HOW to process
var intProcessor = new Generic<int>();
var result = intProcessor.Process(42);  // Strongly typed

// LAMBDA: Defines the logic/behavior
// Works with generics to provide both type safety AND behavior

public class Processor<T>
{
    private Func<T, T> _handler;  // Lambda parameter

    public Processor(Func<T, T> handler)
    {
        _handler = handler;
    }

    public T Execute(T input) => _handler(input);
}

// Usage: Generic type + Lambda expression
var doubled = new Processor<int>(x => x * 2);
Console.WriteLine(doubled.Execute(5));  // 10

var reversed = new Processor<string>(s => new string(s.Reverse().ToArray()));
Console.WriteLine(reversed.Execute("hello"));  // "olleh"

// COMBINATION: Generics determine WHAT types, Lambda determines HOW to process
var filter = new Processor<int>(x => x > 0 ? x : 0);
var transform = new Processor<string>(s => s.ToUpper());
```

---

### 20. What is a good real-world example of Lambda expressions?

**Answer:**

A strong example is explaining how Lambda expressions affects a real feature, production issue,
migration, or architecture decision involving the concise function syntax used heavily in modern C#.
Interviewers usually care more about the reasoning than the definition alone.

**Sample:**

```csharp
// REAL-WORLD: E-commerce Product Filtering
public class ProductFilter
{
    private List<Product> _products = new();

    public List<Product> Find(Func<Product, bool> criteria)
    {
        return _products.Where(criteria).ToList();
    }
}

var filter = new ProductFilter();

// Before: No filtering capability
// var allProducts = filter.GetAll();

// After: Flexible filtering with Lambda
var electronics = filter.Find(p => p.Category == "Electronics");
var affordable = filter.Find(p => p.Price < 100);
var inStock = filter.Find(p => p.Quantity > 0);
var discounted = filter.Find(p => p.Discount > 0.1m);

// Complex filter
var results = filter.Find(p =>
    p.Category == "Electronics" &&
    p.Price < 100 &&
    p.Quantity > 0 &&
    p.Rating >= 4.0m
);

// BENEFIT: No need to create separate Filter classes for each criteria
// Filter logic is specified at call-site, making intent clear
// Reduces boilerplate code significantly
```

---

### 21. What is a best practice for Lambda expressions?

**Answer:**

A good practice is to keep Lambda expressions aligned with the actual requirement around the concise
function syntax used heavily in modern C#. Teams should document intent, keep implementation
readable, and validate important paths early.

**Sample:**

```csharp
// BEST PRACTICE 1: Keep lambdas simple and readable

// ❌ Too complex
var result = users.Select(u => new UserDto
{
    Id = u.Id,
    Name = u.FirstName + " " + u.LastName,
    Age = DateTime.Now.Year - u.BirthYear,
    Status = u.IsActive ? "Active" : u.IsDeleted ? "Deleted" : "Inactive"
}).ToList();

// ✅ Better: Extract to method
public UserDto MapUser(User u)
{
    return new UserDto
    {
        Id = u.Id,
        Name = u.FirstName + " " + u.LastName,
        Age = DateTime.Now.Year - u.BirthYear,
        Status = GetStatus(u)
    };
}
var result = users.Select(MapUser).ToList();

// BEST PRACTICE 2: Document intent with variable names
var minimum_age = 18;
var adults = users.Where(u => u.Age >= minimum_age).ToList();  // Intent clear

// BEST PRACTICE 3: Validate lambda paths early
public void ProcessWithValidation(List<Func<int, bool>> validators, int value)
{
    // Test all validators before using in production
    foreach (var validator in validators)
    {
        if (validator == null)
            throw new ArgumentException("Validator cannot be null");
    }

    var results = validators.Select(v => v(value)).ToList();
}
```

---

### 22. What is a common mistake around Lambda expressions?

**Answer:**

A common mistake is naming Lambda expressions without understanding how it affects the concise
function syntax used heavily in modern C#. In real work, that usually appears as weak design
choices, poor debugging, or incomplete explanations.

**Sample:**

```csharp
// MISTAKE 1: Closure over loop variable
var functions = new List<Func<int>>();
for (int i = 0; i < 10; i++)
{
    functions.Add(() => i);  // ❌ Closure captures 'i', all return 10
}

// All functions return 10!
Console.WriteLine(functions[0]());  // 10
Console.WriteLine(functions[5]());  // 10

// ✅ FIX: Copy to local variable
for (int i = 0; i < 10; i++)
{
    int local = i;  // Copy the value
    functions.Add(() => local);
}

// MISTAKE 2: Null reference in lambda
public class Service
{
    public Func<string> GetFunc()
    {
        return () => _config.Value;  // ❌ _config might be null later
    }

    private Config _config;
}

// ✅ FIX: Check null at lambda definition or use safe access
return () => _config?.Value ?? "default";

// MISTAKE 3: Not understanding deferred execution
var query = data.Where(x => x.IsValid);
data.Clear();  // ❌ Modifies source BEFORE executing query
var results = query.ToList();  // Returns empty!

// ✅ FIX: Materialize early if source might change
var results = data.Where(x => x.IsValid).ToList();  // Execute immediately
```

---

### 23. How do you troubleshoot Lambda expressions-related issues?

**Answer:**

When troubleshooting Lambda expressions, first verify whether the concise function syntax used
heavily in modern C# is behaving as expected. Then check surrounding dependencies, configuration,
logs, runtime behavior, and edge cases before changing the design.

**Sample:**

```csharp
// TROUBLESHOOTING: Lambda returns wrong value
public class Calculator
{
    public Func<int, int> Create()
    {
        return x => x + 1;  // Simple case
    }
}

// Debug: Add intermediate logging
public Func<int, int> CreateWithDebug()
{
    return x =>
    {
        Console.WriteLine($"Input: {x}");
        var result = x + 1;
        Console.WriteLine($"Output: {result}");
        return result;
    };
}

// TROUBLESHOOTING: Lambda closure issue
var lambdas = new List<Func<int>>();
for (int i = 0; i < 3; i++)
{
    int copy = i;  // Add debug label
    lambdas.Add(() =>
    {
        Console.WriteLine($"Lambda {copy} executed");
        return copy;
    });
}

// TROUBLESHOOTING: LINQ query not executing
var query = users.Where(u =>
{
    Console.WriteLine($"Filtering user {u.Name}");  // Debug: See if executed
    return u.Age > 18;
});

// Debug: Force execution
var results = query.ToList();  // Now you'll see the debug lines

// TROUBLESHOOTING: Lambda with side effects
var bad = data.Select(x =>
{
    x.Modified = DateTime.Now;  // Side effect!
    return x;
}).ToList();

// Better: Separate concerns
var good = data.Select(x => new { x.Id, x.Name }).ToList();
foreach (var item in data)
    item.Modified = DateTime.Now;
```

---

### 24. How does Lambda expressions connect to the rest of advanced C#?

**Answer:**

Lambda expressions connects to the rest of advanced C# by giving structure to the concise function
syntax used heavily in modern C#. It is one of the pieces that turns isolated facts into a coherent
end-to-end explanation.

**Sample:**

```csharp
// INTEGRATION: Lambda + Events + LINQ + Async
public class DataService
{
    public event EventHandler<DataEventArgs> DataReceived;

    public async Task LoadDataAsync()
    {
        // Async operation with lambda
        await Task.Delay(100);

        var data = new List<string> { "apple", "banana", "cherry" };
        OnDataReceived(data);
    }

    protected void OnDataReceived(List<string> data)
    {
        DataReceived?.Invoke(this, new DataEventArgs { Data = data });
    }
}

// COMBINED USAGE:
var service = new DataService();

// Lambda as event handler
service.DataReceived += async (sender, e) =>
{
    // LINQ operations inside lambda
    var filtered = e.Data
        .Where(x => x.Length > 5)  // Lambda predicate in LINQ
        .Select(x => x.ToUpper())  // Lambda projection
        .ToList();

    // Async inside lambda
    await Task.Delay(50);
    Console.WriteLine($"Processed: {string.Join(", ", filtered)}");
};

await service.LoadDataAsync();
// Output: Processed: BANANA, CHERRY
```

---

## 3. Generics

### 25-36. Generics Deep Dive

**Comprehensive Coverage:**

```csharp
// BASIC GENERIC TYPES
public class Repository<T> where T : class
{
    private List<T> items = new();

    public void Add(T item) => items.Add(item);
    public T GetById(int id) => items.FirstOrDefault();
    public List<T> GetAll() => items;
}

// GENERIC METHODS
public class Converter
{
    public T Convert<T>(object value) where T : class, new()
    {
        if (value == null) return null;
        return JsonConvert.DeserializeObject<T>(value.ToString());
    }

    public TOut Map<TIn, TOut>(TIn source) where TIn : class where TOut : class, new()
    {
        var dest = new TOut();
        // Reflection-based mapping
        return dest;
    }
}

// CONSTRAINTS IN DEPTH
// Base type constraint
public class Validator<T> where T : ValidationBase
{
    public bool Validate(T obj) => obj.IsValid();
}

// Generic type constraints
public class Comparer<T> where T : IComparable<T>
{
    public int Compare(T a, T b) => a.CompareTo(b);
}

// Constructor constraint
public class Factory<T> where T : new()
{
    public T Create() => new T();
    public List<T> CreateMultiple(int count) => Enumerable.Range(0, count).Select(_ => new T()).ToList();
}

// COVARIANCE: out keyword - only output
public interface IRepository<out T>
{
    T GetById(int id);
    IEnumerable<T> GetAll();
}

// CONTRAVARIANCE: in keyword - only input
public interface IWriter<in T>
{
    void Write(T item);
    void WriteMany(IEnumerable<T> items);
}

// PRACTICAL PATTERN: Generic repository with constraints
public abstract class Entity
{
    public int Id { get; set; }
}

public interface IRepository<T> where T : Entity
{
    void Add(T entity);
    void Update(T entity);
    void Delete(int id);
    T GetById(int id);
}

public class EntityRepository<T> : IRepository<T> where T : Entity, new()
{
    private List<T> storage = new();

    public void Add(T entity)
    {
        entity.Id = storage.Max(e => e.Id) + 1;
        storage.Add(entity);
    }

    public void Update(T entity)
    {
        var existing = storage.FirstOrDefault(e => e.Id == entity.Id);
        if (existing != null)
        {
            storage.Remove(existing);
            storage.Add(entity);
        }
    }

    public void Delete(int id) => storage.RemoveAll(e => e.Id == id);
    public T GetById(int id) => storage.FirstOrDefault(e => e.Id == id);
}

// PERFORMANCE: Generic vs Reflection
// Generic - compiled, no reflection cost
public class GenericPool<T> where T : new()
{
    private Stack<T> available = new();
    public T Rent() => available.Count > 0 ? available.Pop() : new T();
    public void Return(T item) => available.Push(item);
}

// Reflection-based - slower
public class ReflectionPool
{
    public object Rent(Type type) => Activator.CreateInstance(type);
}
```

---

## 4. LINQ

### 37-48. LINQ Comprehensive Examples

**Covered Topics:**

```csharp
// QUERY SYNTAX vs METHOD SYNTAX
List<User> users = GetUsers();

// Query syntax (SQL-like)
var adults = from u in users
             where u.Age >= 18
             orderby u.Name
             select u;

// Method syntax (fluent)
var adultsMethod = users
    .Where(u => u.Age >= 18)
    .OrderBy(u => u.Name);

// COMMON OPERATIONS
// Where: Filter
var activeUsers = users.Where(u => u.IsActive).ToList();

// Select: Project/Transform
var names = users.Select(u => u.Name).ToList();
var dtos = users.Select(u => new { u.Id, u.Name, Age = u.DateOfBirth.CalculateAge() }).ToList();

// SelectMany: Flatten
var allOrders = users.SelectMany(u => u.Orders).ToList();
var orderDates = users.SelectMany(u => u.Orders).Select(o => o.Date).ToList();

// OrderBy/ThenBy: Sorting
var sorted = users
    .OrderBy(u => u.Department)
    .ThenBy(u => u.Name)
    .ToList();

// GroupBy: Aggregation
var byDepartment = users
    .GroupBy(u => u.Department)
    .Select(g => new { Department = g.Key, Count = g.Count(), Users = g.ToList() })
    .ToList();

// Join: Multiple sources
var userOrders = users
    .Join(orders, u => u.Id, o => o.UserId, (u, o) => new { u.Name, o.Amount, o.Date })
    .ToList();

// LEFT OUTER JOIN: Using GroupJoin
var usersWithOrders = users
    .GroupJoin(orders, u => u.Id, o => o.UserId, (u, os) => new { User = u, Orders = os.ToList() })
    .ToList();

// DEFERRED EXECUTION: Queries execute when enumerated
var query = users.Where(u => u.Age > 25);
users.Add(new User { Age = 30 });  // New user added
var results = query.ToList();  // Now executes with new user!

// EAGER EXECUTION: ToList() forces immediate execution
var eagerResults = users.Where(u => u.Age > 25).ToList();
users.Add(new User { Age = 30 });  // Doesn't affect eagerResults

// AGGREGATE FUNCTIONS
int count = users.Count();
int sum = users.Sum(u => u.Age);
double average = users.Average(u => u.Age);
var minAge = users.Min(u => u.Age);
var maxAge = users.Max(u => u.Age);
string concatenated = string.Join(", ", users.Select(u => u.Name));

// LINQ TO SQL / ENTITY FRAMEWORK: QueryProvider
using (var db = new MyDbContext())
{
    // This generates SQL, not LINQ to Objects
    var activeUsers = db.Users
        .Where(u => u.IsActive)  // Translated to SQL WHERE
        .Include(u => u.Orders)  // SQL JOIN
        .ToList();  // Finally executes query
}

// RANGE and REPEAT
var sequence = Enumerable.Range(1, 10);  // 1,2,3...10
var repeated = Enumerable.Repeat("X", 5);  // "X","X","X","X","X"

// PERFORMANCE: Avoid multiple enumerations
var lotsOfUsers = users.Where(u => u.IsActive);  // Query not executed

// Bad: Enumerates 3 times
int count = lotsOfUsers.Count();
var first = lotsOfUsers.First();
var all = lotsOfUsers.ToList();

// Good: Execute once
var materialized = lotsOfUsers.ToList();
int count = materialized.Count;
var first = materialized.First();
```

---

## 5. Async and await

### 49-60. Async/Await Deep Dive

**Key Patterns:**

```csharp
// BASIC ASYNC/AWAIT
public async Task<User> GetUserAsync(int id)
{
    // Returns Task<User>, can be awaited
    var response = await _httpClient.GetAsync($"/users/{id}");
    var content = await response.Content.ReadAsStringAsync();
    return JsonConvert.DeserializeObject<User>(content);
}

// Consuming async method
var user = await GetUserAsync(1);  // Awaits result
// OR
var task = GetUserAsync(1);  // Don't await - get Task
var user = await task;  // Await later

// VOID vs TASK return type
// ❌ Bad: Void async - can't track completion
public async void BadLoadData()
{
    await LoadFromServer();  // Exception won't be caught
}

// ✅ Good: Task return type
public async Task LoadDataAsync()
{
    await LoadFromServer();
}

// MULTIPLE AWAITS: Sequential
public async Task<Data> ProcessAsync()
{
    var user = await GetUserAsync(1);  // Wait for user
    var orders = await GetOrdersAsync(user.Id);  // Wait for orders
    return new Data { User = user, Orders = orders };
}

// CONCURRENT: Run in parallel
public async Task<(User, List<Order>)> ProcessConcurrentAsync()
{
    var userTask = GetUserAsync(1);
    var ordersTask = GetOrdersAsync(1);

    await Task.WhenAll(userTask, ordersTask);  // Wait for both
    return (userTask.Result, ordersTask.Result);
}

// EXCEPTION HANDLING
public async Task<string> SafeDownloadAsync(string url)
{
    try
    {
        using var response = await _httpClient.GetAsync(url);
        return await response.Content.ReadAsStringAsync();
    }
    catch (HttpRequestException ex)
    {
        Console.WriteLine($"Download failed: {ex.Message}");
        return null;
    }
}

// TIMEOUT
public async Task<string> DownloadWithTimeoutAsync(string url)
{
    using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(5));
    return await _httpClient.GetStringAsync(url, cts.Token);
}

// ASYNC ENUMERATION: Async enumerators
public async IAsyncEnumerable<User> GetUsersStreamAsync()
{
    for (int i = 0; i < 1000; i++)
    {
        var user = await FetchUserAsync(i);
        yield return user;  // Lazily fetches users
    }
}

// Usage
await foreach (var user in GetUsersStreamAsync())
{
    Console.WriteLine(user.Name);
}

// BEST PRACTICE: ConfigureAwait
public async Task GetDataAsync()
{
    // WithConfigureAwait(false) - don't return to UI thread
    var response = await _httpClient.GetAsync(url).ConfigureAwait(false);
    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
    return content;
}
```

var numbers = new[] { 1, 2, 3, 4 };
var even = numbers.Where(n => n % 2 == 0);
await Task.Delay(10);
Console.WriteLine(string.Join(",", even));

````

---

### 28. How is Generics applied in practice?

**Answer:**

In practice, Generics is applied by making the type-safe abstraction model used to write reusable
logic without losing compile-time safety explicit in the code, runtime setup, or delivery workflow.
The exact shape depends on the application, but the responsibility should stay predictable.

**Sample:**

```csharp
// PRACTICAL: Generic repository pattern
public abstract class Entity
{
    public int Id { get; set; }
}

public interface IRepository<T> where T : Entity
{
    void Add(T item);
    T GetById(int id);
    List<T> GetAll();
    void Delete(int id);
}

public class Repository<T> : IRepository<T> where T : Entity, new()
{
    private List<T> _items = new();

    public void Add(T item) => _items.Add(item);
    public T GetById(int id) => _items.FirstOrDefault(x => x.Id == id);
    public List<T> GetAll() => _items;
    public void Delete(int id) => _items.RemoveAll(x => x.Id == id);
}

// USAGE: Same code works for any entity type
public class User : Entity { public string Name { get; set; } }
public class Product : Entity { public decimal Price { get; set; } }

var userRepo = new Repository<User>();
var productRepo = new Repository<Product>();

userRepo.Add(new User { Id = 1, Name = "John" });
productRepo.Add(new Product { Id = 1, Price = 99.99m });
````

---

### 29. What strengths does Generics bring?

**Answer:**

The strengths of Generics are better structure, better communication, and better control over the
type-safe abstraction model used to write reusable logic without losing compile-time safety. It also
makes tradeoffs easier to explain to reviewers, interviewers, and teammates.

**Sample:**

```csharp
// STRENGTH 1: Type safety at compile-time

// Without generics - type casting required
var items = new ArrayList();
items.Add(42);
var value = (int)items[0];  // Runtime casting, potential error

// With generics - compile-time safety
var numbers = new List<int>();
numbers.Add(42);
var value = numbers[0];  // No casting needed, type known

// STRENGTH 2: Code reuse without loss of safety
public class Cache<T>
{
    private Dictionary<string, T> _cache = new();

    public void Set(string key, T value) => _cache[key] = value;
    public T Get(string key) => _cache[key];
}

// Works for ANY type, completely type-safe
var stringCache = new Cache<string>();
stringCache.Set("name", "John");
var name = stringCache.Get("name");  // String type guaranteed

var intCache = new Cache<int>();
intCache.Set("count", 42);
var count = intCache.Get("count");  // Int type guaranteed

// STRENGTH 3: IntelliSense and better tooling
var items = new List<User>();
var user = items.First();  // IDE knows this is User, shows all User members

// STRENGTH 4: Performance - no boxing/unboxing
var numbers = new List<int>();
numbers.Add(42);  // No boxing
var value = numbers[0];  // No unboxing
```

---

### 30. What tradeoffs come with Generics?

**Answer:**

The main tradeoff is extra complexity if Generics is introduced without a real need or a clear
understanding of the type-safe abstraction model used to write reusable logic without losing
compile-time safety. That usually leads to overengineering, hidden bugs, or confusing architecture.

**Sample:**

```csharp
// OVERENGINEERING: Generic when not needed

// ❌ Overly complex generics:
public class GenericHelper<T1, T2, T3, TResult>
    where T1 : new()
    where T2 : IComparable<T2>
    where T3 : IEnumerable<T2>
{
    // Complex logic that requires all these types
}

// Often better to use specific types or refactor

// UNDERSTANDING CONSTRAINT COMPLEXITY:

// ✅ Simple: No constraints
public class Container<T>
{
    public T Value { get; set; }
}

// ✅ Clear: Basic constraint
public class Validator<T> where T : IValidatable
{
    public bool Validate(T item) => item.IsValid();
}

// ❌ Confusing: Too many constraints
public class ComplexProcessor<T>
    where T : class, new(), IDisposable, IComparable<T>, IEquatable<T>
{
    // Hard to understand purpose
}

// PERFORMANCE: Generic specialization
// Each closed type gets its own JIT compilation
var ints = new List<int>();  // Compiled once
var strings = new List<string>();  // Compiled again
var doubles = new List<double>();  // Compiled again
// More memory usage than non-generic version
```

---

### 31. How does Generics differ from LINQ?

**Answer:**

Generics is centered on the type-safe abstraction model used to write reusable logic without losing
compile-time safety, while LINQ is centered on the integrated query model used to work with data
collections in a declarative style. They often work together, but they solve different parts of the
topic.

**Sample:**

```csharp
// GENERICS: Type-safe containers and methods
public class Repository<T>
{
    private List<T> _items = new();

    public void Add(T item) => _items.Add(item);
    public List<T> GetAll() => _items;  // Type-safe return
}

// Query method (not LINQ yet)
public T FindById<T>(int id) where T : IEntity
{
    return _items.FirstOrDefault(x => x.Id == id);  // Generic method
}

// LINQ: Query model for data processing
public class UserService
{
    public List<UserDTO> GetActiveAdults(List<User> users)
    {
        // LINQ query - declarative data processing
        return users
            .Where(u => u.IsActive && u.Age >= 18)  // Query operations
            .Select(u => new UserDTO { Name = u.Name, Age = u.Age })  // Project
            .OrderBy(u => u.Name)  // Sort
            .ToList();
    }
}

// COMBINED: Generics + LINQ
public class GenericQueryService<T> where T : Entity
{
    private List<T> _items;

    public List<T> Query(Func<T, bool> predicate)  // Generic method
    {
        return _items.Where(predicate).ToList();  // LINQ query inside generics
    }
}
```

---

### 32. What is a good real-world example of Generics?

**Answer:**

A strong example is explaining how Generics affects a real feature, production issue, migration, or
architecture decision involving the type-safe abstraction model used to write reusable logic without
losing compile-time safety. Interviewers usually care more about the reasoning than the definition
alone.

**Sample:**

```csharp
// REAL-WORLD: Dependency Injection Container
public interface IServiceComponent { }

public class ServiceContainer
{
    private Dictionary<Type, object> _services = new();

    // Generic registration
    public void Register<T>(T instance) where T : IServiceComponent
    {
        _services[typeof(T)] = instance;
    }

    // Generic resolution - type-safe
    public T Resolve<T>() where T : IServiceComponent
    {
        if (_services.TryGetValue(typeof(T), out var service))
            return (T)service;  // No casting needed with generics
        throw new InvalidOperationException($"Service {typeof(T).Name} not registered");
    }
}

// USAGE: Same code works for any type implementing IServiceComponent
public class Logger : IServiceComponent { }
public class Database : IServiceComponent { }
public class MailService : IServiceComponent { }

var container = new ServiceContainer();
container.Register<Logger>(new Logger());
container.Register<Database>(new Database());
container.Register<MailService>(new MailService());

var logger = container.Resolve<Logger>();  // Type-safe
var db = container.Resolve<Database>();     // Type-safe
var mail = container.Resolve<MailService>(); // Type-safe
```

---

### 33. What is a best practice for Generics?

**Answer:**

A good practice is to keep Generics aligned with the actual requirement around the type-safe
abstraction model used to write reusable logic without losing compile-time safety. Teams should
document intent, keep implementation readable, and validate important paths early.

**Sample:**

```csharp
// BEST PRACTICE 1: Use constraints to express intent

// ✅ Clear: Constraint shows what's needed
public class Comparator<T> where T : IComparable<T>
{
    public T Maximum(T a, T b) => a.CompareTo(b) > 0 ? a : b;
}

// ❌ Unclear: No constraint
public class BadComparator<T>
{
    public T Maximum(T a, T b) => /* Hard to implement */;
}

// BEST PRACTICE 2: Name generic types meaningfully

// ✅ Good names
public class Repository<TEntity> where TEntity : Entity { }
public class Mapper<TSource, TDestination> { }

// ❌ Bad names
public class Repository<T> { }  // Not clear what T is
public class Mapper<A, B> { }   // A and B are meaningless

// BEST PRACTICE 3: Validate assumptions early
public class Factory<T> where T : new()
{
    public T Create()
    {
        try
        {
            return new T();
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException(
                $"Cannot create instance of {typeof(T).Name}: {ex.Message}", ex);
        }
    }
}

// BEST PRACTICE 4: Avoid unnecessary generic depth

// ✅ Simple and clear
public class DataService<T> { }

// ❌ Too complex
public class DataService<T, U, V, W, X> { }
```

---

### 34. What is a common mistake around Generics?

**Answer:**

A common mistake is naming Generics without understanding how it affects the type-safe abstraction
model used to write reusable logic without losing compile-time safety. In real work, that usually
appears as weak design choices, poor debugging, or incomplete explanations.

**Sample:**

```csharp
// MISTAKE 1: Generic non-nullable reference types without checks

public class Container<T>
{
    public T Value { get; set; }

    public void Process()
    {
        Value.ToString();  // ❌ Null reference exception if T is null
    }
}

// ✅ FIX: Add null check
public void Process()
{
    if (Value != null)
        Value.ToString();
}

// MISTAKE 2: Overly restrictive constraints

// ❌ Problem: Requires everything
public class Processor<T> where T : IComparable, IEquatable<T>, ICloneable, IDisposable
{
    // Hard to find types meeting all constraints
}

// ✅ Solution: Only require what's needed
public class Processor<T> where T : IComparable<T>
{
    // Clear, focused purpose
}

// MISTAKE 3: Mixing generic and non-generic code

// ❌ Confusing: Sometimes generic, sometimes not
public List<object> GetItems<T>(T filter)  // Generic input, object output
{
    return new List<object>();
}

// ✅ Better: Consistent usage
public List<T> GetItems<T>(T filter)  // Generic throughout
{
    return new List<T>();
}

// MISTAKE 4: Assuming all types can perform operations

// ❌ Wrong: Can't add T instances together
public T Sum<T>(T a, T b) => a + b;  // Compile error

// ✅ Fixed: Explicit constraint
public T Sum<T>(T a, T b) where T : INumber<T> => a + b;
```

---

### 35. How do you troubleshoot Generics-related issues?

**Answer:**

When troubleshooting Generics, first verify whether the type-safe abstraction model used to write
reusable logic without losing compile-time safety is behaving as expected. Then check surrounding
dependencies, configuration, logs, runtime behavior, and edge cases before changing the design.

**Sample:**

```csharp
// TROUBLESHOOTING: Generic constraint violation

public class Service<T> where T : new()
{
    public T Create()
    {
        return new T();  // Requires default constructor
    }
}

// ERROR: Class without default constructor
public class User
{
    public User(string name)  // No default constructor
    {
        Name = name;
    }
    public string Name { get; set; }
}

// DEBUGGING:
public void CheckConstraint()
{
    var type = typeof(User);
    var hasDefaultCtor = type.GetConstructors().Any(c => c.GetParameters().Length == 0);
    Console.WriteLine($"Has default constructor: {hasDefaultCtor}");
}

// TROUBLESHOOTING: Type casting in generics

public class Converter<T>
{
    public T Convert(object value)
    {
        try
        {
            return (T)value;  // Unsafe cast
        }
        catch (InvalidCastException ex)
        {
            Console.WriteLine($"Cannot convert {value?.GetType().Name} to {typeof(T).Name}");
            throw;
        }
    }
}

// Better: Use safe conversion
public T ConvertSafe(object value)
{
    if (value is T typedValue)
        return typedValue;  // Safe cast
    throw new InvalidCastException();
}

// TROUBLESHOOTING: Reflection with generics

public void InspectGeneric<T>()
{
    var type = typeof(T);
    Console.WriteLine($"Type: {type.Name}");
    Console.WriteLine($"Is generic: {type.IsGenericType}");
    Console.WriteLine($"Methods: {type.GetMethods().Length}");
}
```

---

### 36. How does Generics connect to the rest of advanced C#?

**Answer:**

Generics connects to the rest of advanced C# by giving structure to the type-safe abstraction model
used to write reusable logic without losing compile-time safety. It is one of the pieces that turns
isolated facts into a coherent end-to-end explanation.

**Sample:**

```csharp
// INTEGRATION: Generics + Delegates + Events + LINQ

public class Repository<T> where T : Entity
{
    private List<T> _items = new();

    // Delegate: Custom processing logic
    public delegate void ItemProcessed(T item);

    // Event: Notify when items added
    public event ItemProcessed OnItemAdded;

    // Method: Add with notification
    public void Add(T item)
    {
        _items.Add(item);
        OnItemAdded?.Invoke(item);  // Fire event
    }

    // Generic method: LINQ query support
    public List<T> FindAll(Func<T, bool> predicate)  // Lambda parameter
    {
        return _items.Where(predicate).ToList();  // LINQ
    }
}

// UNIFIED USAGE:
public class User : Entity { public string Name { get; set; } public int Age { get; set; } }

var repo = new Repository<User>();  // Generic type

// Event + Lambda (Delegates)
repo.OnItemAdded += user => Console.WriteLine($"Added: {user.Name}");

// Add item
repo.Add(new User { Id = 1, Name = "John", Age = 30 });

// LINQ + Generic method + Lambda
var adults = repo.FindAll(u => u.Age >= 18);  // LINQ predicate

// All concepts working together seamlessly
```

---

## 4. LINQ

### 37. What is the role of LINQ in advanced C#?

**Answer:**

In advanced C#, the term LINQ refers to the integrated query model used to work with data collections in a
declarative style. It is part of the foundation a candidate should be able to explain clearly.

**Sample:**

```csharp
// LINQ enables declarative data querying
var users = new List<User>
{
    new { Id = 1, Name = "Alice", Age = 30, Department = "Engineering" },
    new { Id = 2, Name = "Bob", Age = 25, Department = "Sales" },
    new { Id = 3, Name = "Charlie", Age = 35, Department = "Engineering" }
};

// QUERY SYNTAX: SQL-like approach
var query = from u in users
            where u.Age >= 30
            orderby u.Name
            select new { u.Name, u.Department };

// METHOD SYNTAX: Fluent approach
var methodQuery = users
    .Where(u => u.Age >= 30)
    .OrderBy(u => u.Name)
    .Select(u => new { u.Name, u.Department });

// Both produce same result - declarative intent is clear
```

---

### 38. Why is the concept of LINQ important in advanced C#?

**Answer:**

This concept matters because it influences the integrated query model used to work with data collections in
a declarative style. Good interview answers connect it to clarity, maintainability, performance,
security, or delivery depending on the situation.

**Sample:**

```csharp
// CLARITY: Intent is obvious

// Without LINQ (imperative)
var results = new List<User>();
foreach (var user in users)
{
    if (user.Age >= 18 && user.IsActive)
    {
        results.Add(user);
    }
}

// With LINQ (declarative)
var results = users
    .Where(u => u.Age >= 18 && u.IsActive)
    .ToList();

// MAINTAINABILITY: Changes are easier
// To add sorting: just add .OrderBy(u => u.Name) to LINQ chain

// PERFORMANCE: LINQ to EF/SQL generates optimized queries
using (var db = new AppDbContext())
{
    // This generates a single SQL query, not multiple roundtrips
    var results = db.Users
        .Where(u => u.Age >= 18)
        .Include(u => u.Orders)
        .OrderBy(u => u.Name)
        .ToList();  // Only ONE database call
}
```

---

### 39. When should a team focus on LINQ?

**Answer:**

A team should focus on LINQ when the requirement depends on the integrated query model used to work
with data collections in a declarative style. It becomes especially important when design decisions,
scalability, or debugging depend on that area.

**Sample:**

```csharp
// FOCUS ON LINQ WHEN:

// 1. Complex data filtering and transformation
public List<ReportDTO> GenerateReport(List<Order> orders)
{
    return orders
        .Where(o => o.Status == OrderStatus.Completed)
        .GroupBy(o => o.CustomerId)
        .Select(g => new ReportDTO
        {
            CustomerId = g.Key,
            TotalOrders = g.Count(),
            TotalAmount = g.Sum(o => o.Amount),
            AverageOrderValue = g.Average(o => o.Amount)
        })
        .OrderByDescending(r => r.TotalAmount)
        .ToList();
}

// 2. Multi-source data joining
var result = customers
    .Join(orders, c => c.Id, o => o.CustomerId, (c, o) => new { c, o })
    .GroupJoin(/* more sources */, ...)
    .ToList();

// 3. Performance-critical queries that need optimization
// LINQ to Entity Framework generates optimized SQL automatically
```

---

### 40. How is LINQ applied in practice?

**Answer:**

In practice, LINQ is applied by making the integrated query model used to work with data collections
in a declarative style explicit in the code, runtime setup, or delivery workflow. The exact shape
depends on the application, but the responsibility should stay predictable.

**Sample:**

```csharp
// PRACTICAL LINQ APPLICATIONS

// 1. BUSINESS LOGIC: Calculate metrics
public class SalesAnalytics
{
    public decimal CalculateMonthlyRevenue(List<Order> orders, int month)
    {
        return orders
            .Where(o => o.OrderDate.Month == month && o.Status == "Shipped")
            .Sum(o => o.Amount);
    }
}

// 2. DATA TRANSFORMATION: DAO to DTO
public List<UserDTO> GetActiveUsers(List<User> users)
{
    return users
        .Where(u => u.IsActive)
        .Select(u => new UserDTO
        {
            Name = u.FirstName + " " + u.LastName,
            Email = u.Email
        })
        .ToList();
}

// 3. FILTERING AND SORTING: Search results
public List<Product> SearchProducts(List<Product> inventory, string term, string sortBy)
{
    var results = inventory
        .Where(p => p.Name.Contains(term) || p.Description.Contains(term));

    results = sortBy switch
    {
        "price_asc" => results.OrderBy(p => p.Price),
        "price_desc" => results.OrderByDescending(p => p.Price),
        _ => results
    };

    return results.ToList();
}
```

---

### 41. What strengths does LINQ bring?

**Answer:**

The strengths of LINQ are better structure, better communication, and better control over the
integrated query model used to work with data collections in a declarative style. It also makes
tradeoffs easier to explain to reviewers, interviewers, and teammates.

**Sample:**

```csharp
// STRENGTH 1: Uniform query syntax across data sources

// Arrays
var arrayQuery = intArray.Where(x => x > 5).ToList();

// Lists
var listQuery = users.Where(u => u.Age > 25).ToList();

// Databases (LINQ to Entity Framework)
var dbQuery = db.Orders.Where(o => o.Total > 100).ToList();

// XML (LINQ to XML)
var xmlQuery = doc.Descendants("item").Where(x => /* ... */).ToList();

// SQL Server (LINQ to SQL)
var sqlQuery = db.Products.Where(p => p.Price > 50).ToList();

// STRENGTH 2: Composability and readability
var result = data
    .Where(x => x.IsValid)        // Clear filter
    .Select(x => x.Transform())    // Clear projection
    .OrderBy(x => x.Priority)      // Clear ordering
    .Take(10);                      // Clear limit

// STRENGTH 3: IntelliSense support for type safety
var users = /* query that returns List<User> */;
var user = users.First();  // IDE knows this is User, full IntelliSense

// STRENGTH 4: Performance optimization (LINQ to EF)
// Single optimized SQL query, not multiple roundtrips
```

---

### 42. What tradeoffs come with LINQ?

**Answer:**

The main tradeoff is extra complexity if LINQ is introduced without a real need or a clear
understanding of the integrated query model used to work with data collections in a declarative
style. That usually leads to overengineering, hidden bugs, or confusing architecture.

**Sample:**

```csharp
// TRADEOFF 1: Deferred execution confusion

var query = items.Where(x => x.IsActive);  // Query NOT executed yet
items.RemoveAll(x => x.IsDeleted);         // Items modified
var results = query.ToList();              // ❌ Now filtering deleted items!

// ✅ FIX: Materialize immediately if source might change
var results = items.Where(x => x.IsActive).ToList();  // Execute now

// TRADEOFF 2: Hidden complexity in LINQ chains

// ❌ Complex multi-step LINQ
var results = data
    .Where(x => x.IsValid)
    .Select(x => new { x.Id, x.Name })
    .Where(x => x.Name.Length > 0)
    .Select(x => new { x.Id, NameUpper = x.Name.ToUpper() })
    .Distinct()
    .OrderBy(x => x.NameUpper)
    .ToList();

// ✅ Better: Break into intermediate steps for clarity
var valid = data.Where(x => x.IsValid).ToList();
var projected = valid.Select(x => new { x.Id, x.Name }).ToList();
var filtered = projected.Where(x => x.Name.Length > 0).ToList();
var results = filtered
    .Select(x => new { x.Id, NameUpper = x.Name.ToUpper() })
    .Distinct()
    .OrderBy(x => x.NameUpper)
    .ToList();

// TRADEOFF 3: Performance with LINQ to Objects
var big = Enumerable.Range(0, 1_000_000).ToList();
var result = big.Where(x => x % 2 == 0).First();  // Scans all elements!

// Better: Use FirstOrDefault with predicate
var result = big.FirstOrDefault(x => x % 2 == 0);  // Stops early
```

---

### 43. How does LINQ differ from Async and await?

**Answer:**

LINQ is centered on the integrated query model used to work with data collections in a declarative
style, while Async and await is centered on the asynchronous programming syntax used to keep
applications responsive and scalable. They often work together, but they solve different parts of
the topic.

**Sample:**

```csharp
// LINQ: Queries data collections (synchronous)
public List<User> GetActiveUsers(List<User> users)
{
    return users
        .Where(u => u.IsActive)
        .OrderBy(u => u.Name)
        .ToList();  // Synchronous query
}

// ASYNC/AWAIT: Handles asynchronous operations
public async Task<List<User>> GetActiveUsersAsync()
{
    var users = await _repository.GetUsersAsync();  // Async fetch
    return users.Where(u => u.IsActive).ToList();   // Then LINQ
}

// COMBINED: Async operations + LINQ processing
public async Task<List<UserDTO>> GetAndTransformUsersAsync()
{
    // Async: Fetch from database
    var users = await _db.Users
        .Where(u => u.IsActive)
        .ToListAsync();  // Async execution in database

    // LINQ: Transform results
    return users
        .Select(u => new UserDTO { Name = u.Name, Email = u.Email })
        .OrderBy(u => u.Name)
        .ToList();
}

// ASYNC ENUMERABLE: LINQ meets async
public async IAsyncEnumerable<User> GetUsersStreamAsync()
{
    for (int i = 0; i < 1000; i++)
    {
        var user = await FetchUserAsync(i);  // Async fetch
        yield return user;                     // Lazy enumeration
    }
}

// Usage: async foreach instead of foreach
await foreach (var user in GetUsersStreamAsync())
{
    Console.WriteLine(user.Name);
}
```

---

### 44. What is a good real-world example of LINQ?

**Answer:**

A strong example is explaining how LINQ affects a real feature, production issue, migration, or
architecture decision involving the integrated query model used to work with data collections in a
declarative style. Interviewers usually care more about the reasoning than the definition alone.

**Sample:**

```csharp
// REAL-WORLD: Shopping basket calculations
public class Order
{
    public int OrderId { get; set; }
    public List<OrderItem> Items { get; set; }
}

public class OrderItem
{
    public int ProductId { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
}

public class OrderService
{
    public OrderSummary CalculateOrderTotal(Order order)
    {
        var summary = new OrderSummary();

        // Line items total
        summary.SubTotal = order.Items
            .Sum(item => item.Price * item.Quantity);

        // Tax calculation
        summary.Tax = summary.SubTotal * 0.1m;

        // Discounts
        var discountItems = order.Items.Where(item => item.Price > 100);
        summary.Discount = discountItems.Sum(item => item.Price * 0.05m);

        // Final total
        summary.Total = summary.SubTotal + summary.Tax - summary.Discount;

        // Itemization
        summary.Items = order.Items
            .Select(item => new OrderItemSummary
            {
                Name = item.Name,
                Quantity = item.Quantity,
                LineTotal = item.Price * item.Quantity
            })
            .OrderByDescending(i => i.LineTotal)
            .ToList();

        return summary;
    }
}

// BENEFIT: Clear business logic, easy to test and maintain
```

---

### 45. What is a best practice for LINQ?

**Answer:**

A good practice is to keep LINQ aligned with the actual requirement around the integrated query
model used to work with data collections in a declarative style. Teams should document intent, keep
implementation readable, and validate important paths early.

**Sample:**

```csharp
// BEST PRACTICE 1: Materialize at appropriate boundaries

// ✅ Good: Materialize before returning from method
public List<User> GetAdults(List<User> users)
{
    return users
        .Where(u => u.Age >= 18)
        .ToList();  // Materialize before returning
}

// ❌ Bad: Return IEnumerable that might be stale
public IEnumerable<User> GetAdults(List<User> users)
{
    return users.Where(u => u.Age >= 18);  // Source might change
}

// BEST PRACTICE 2: Keep LINQ queries readable

// ✅ Good: Logical grouping
var report = data
    .Where(x => x.IsValid && x.Amount > 100)     // Filtering
    .GroupBy(x => x.Category)                     // Grouping
    .Select(g => new                              // Projection
    {
        Category = g.Key,
        Count = g.Count(),
        Total = g.Sum(x => x.Amount)
    })
    .OrderByDescending(x => x.Total)              // Sorting
    .ToList();

// BEST PRACTICE 3: Use appropriate LINQ providers

// ✅ LINQ to Entity Framework: Executes in database
var results = db.Products
    .Where(p => p.Price > 50)
    .ToList();  // SQL WHERE executed on server

// ✅ LINQ to Objects: When data is already in memory
var results = productsInMemory
    .Where(p => p.Price > 50)
    .ToList();  // Filtered in memory
```

---

### 46. What is a common mistake around LINQ?

**Answer:**

A common mistake is naming LINQ without understanding how it affects the integrated query model used
to work with data collections in a declarative style. In real work, that usually appears as weak
design choices, poor debugging, or incomplete explanations.

**Sample:**

```csharp
// MISTAKE 1: N+1 query problem in LINQ to EF

// ❌ Bad: One query per customer (N+1 problem)
var customers = db.Customers.ToList();
foreach (var customer in customers)
{
    var orders = db.Orders.Where(o => o.CustomerId == customer.Id).ToList();
    Console.WriteLine($"{customer.Name}: {orders.Count} orders");
    // Executes 1+N queries!
}

// ✅ Fixed: Use Include for single query
var customers = db.Customers
    .Include(c => c.Orders)  // Eager load orders
    .ToList();
foreach (var customer in customers)
{
    var orders = customer.Orders;  // Already loaded
    Console.WriteLine($"{customer.Name}: {orders.Count} orders");
}

// MISTAKE 2: LINQ query returns IEnumerable that's enumerated multiple times

// ❌ Bad: Enumerates multiple times
var query = users.Where(u => u.IsActive);
var count = query.Count();
var first = query.First();
var all = query.ToList();  // Enumerated 3 times!

// ✅ Fixed: Materialize once
var active = users.Where(u => u.IsActive).ToList();
var count = active.Count;
var first = active.First();
var all = active;

// MISTAKE 3: String comparison without proper consideration

// ❌ Case-sensitive comparison when shouldn't be
var matches = db.Products
    .Where(p => p.Name == searchTerm)  // Exact match only
    .ToList();

// ✅ Better: Case-insensitive search
var matches = db.Products
    .Where(p => p.Name.ToLower().Contains(searchTerm.ToLower()))
    .ToList();
```

---

### 47. How do you troubleshoot LINQ-related issues?

**Answer:**

When troubleshooting LINQ, first verify whether the integrated query model used to work with data
collections in a declarative style is behaving as expected. Then check surrounding dependencies,
configuration, logs, runtime behavior, and edge cases before changing the design.

**Sample:**

```csharp
// TROUBLESHOOTING: LINQ query returns empty

public void DebugEmptyResults()
{
    var query = users.Where(u => u.Age > 25);

    // Add logging to understand the issue
    Console.WriteLine($"Input count: {users.Count}");

    var debugResults = users.Select(u =>
    {
        Console.WriteLine($"Checking {u.Name}: Age={u.Age}, Match={u.Age > 25}");
        return u;
    }).Where(u => u.Age > 25).ToList();

    Console.WriteLine($"Output count: {debugResults.Count}");
}

// TROUBLESHOOTING: LINQ query throws exception

try
{
    var result = data
        .Where(x => x.IsValid)
        .Select(x => new { x.Id, Desc = x.Description.Substring(0, 10) })
        .ToList();
}
catch (ArgumentOutOfRangeException ex)
{
    Console.WriteLine("Some Description is shorter than 10 chars");
    // Fix: Use safe substring
    var result = data
        .Where(x => x.IsValid && x.Description?.Length >= 10)
        .Select(x => new { x.Id, Desc = x.Description.Substring(0, 10) })
        .ToList();
}

// TROUBLESHOOTING: Performance - slow LINQ query

// Bad: Heavy LINQ filtering
var slow = db.Orders
    .ToList()  // ❌ Loads ALL orders into memory
    .Where(o => o.Total > 1000)
    .ToList();

// Good: Filter at database level
var fast = db.Orders
    .Where(o => o.Total > 1000)  // ✅ Executes as SQL WHERE
    .ToList();
```

---

### 48. How does LINQ connect to the rest of advanced C#?

**Answer:**

LINQ connects to the rest of advanced C# by giving structure to the integrated query model used to
work with data collections in a declarative style. It is one of the pieces that turns isolated facts
into a coherent end-to-end explanation.

**Sample:**

```csharp
// INTEGRATION: LINQ + Generics + Lambda + Async

public class QueryService<T> where T : Entity  // Generic
{
    private List<T> _items = new();

    public async Task<List<T>> SearchAsync(Func<T, bool> predicate)  // Lambda
    {
        await Task.Delay(50);  // Async

        return _items
            .Where(predicate)  // LINQ
            .ToList();
    }
}

// INTEGRATED USAGE:
public class User : Entity { public string Name { get; set; } public int Age { get; set; } }

var service = new QueryService<User>();  // Generics

// Lambda predicate + LINQ + Async
var adults = await service.SearchAsync(u => u.Age >= 18);  // Clear lambda intent

// ADVANCED: LINQ + Events + Delegates
public class ReactiveRepository<T> where T : Entity
{
    public event EventHandler<QueryEventArgs> OnQueryExecuted;

    public List<T> Filter(Func<T, bool> predicate)
    {
        var results = _items.Where(predicate).ToList();  // LINQ
        OnQueryExecuted?.Invoke(this, new QueryEventArgs { Count = results.Count });  // Event
        return results;
    }
}
```

---

## 5. Async and await

### 49. What is the role of Async and await in advanced C#?

**Answer:**

In advanced C#, the term Async and await refers to the asynchronous programming syntax used to keep
applications responsive and scalable. It is part of the foundation a candidate should be able to
explain clearly.

**Sample:**

```csharp
// ASYNC/AWAIT: Non-blocking asynchronous operations

// Without async/await (blocking)
public string FetchData()
{
    var response = _httpClient.GetAsync(url).Result;  // BLOCKS thread
    return response.Content.ReadAsStringAsync().Result;
}

// With async/await (non-blocking)
public async Task<string> FetchDataAsync()
{
    var response = await _httpClient.GetAsync(url);  // No thread block
    return await response.Content.ReadAsStringAsync();
}
```

---

### 50. Why is the concept of Async and await important in advanced C#?

**Answer:**

This concept matters because it influences the asynchronous programming syntax used to keep
applications responsive and scalable. Good interview answers connect it to clarity, maintainability,
performance, security, or delivery depending on the situation.

**Sample:**

```csharp
// RESPONSIVENESS: UI stays responsive

// Bad: Blocking call freezes UI for 5 seconds
public void LoadData_Click()
{
    var data = FetchFromServerAsync().Result;  // BLOCKS
    DisplayData(data);
    // UI is frozen during network call!
}

// Good: Async allows UI to stay responsive
public async void LoadData_Click()
{
    var data = await FetchFromServerAsync();  // Non-blocking
    DisplayData(data);
    // UI remains responsive during network call
}

// SCALABILITY: Web server handles many concurrent requests

// Bad: Thread pool exhaustion
public ActionResult GetUsers()  // Synchronous
{
    var users = _db.GetUsersAsync().Result;  // ❌ Blocks thread
    // Each request uses one thread - limited capacity
    return Ok(users);
}

// Good: Async allows reusing thread pool
public async Task<ActionResult> GetUsers()  // Asynchronous
{
    var users = await _db.GetUsersAsync();  // Non-blocking
    // Thread returned to pool - can handle more requests
    return Ok(users);
}
```

---

### 51. When should a team focus on Async and await?

**Answer:**

A team should focus on Async and await when the requirement depends on the asynchronous programming
syntax used to keep applications responsive and scalable. It becomes especially important when
design decisions, scalability, or debugging depend on that area.

**Sample:**

```csharp
// FOCUS WHEN:

// 1. I/O operations that don't require CPU
public async Task<User> GetUserAsync(int id)
{
    // Network call - don't block thread
    return await _userService.FetchAsync(id);
}

// 2. Web APIs handling concurrent requests
public async Task<IActionResult> GetProducts()
{
    var products = await _db.Products.ToListAsync();
    return Ok(products);
}

// 3. Multiple concurrent operations
public async Task<(User user, List<Order> orders)> GetUserWithOrdersAsync(int id)
{
    var userTask = _userService.GetAsync(id);
    var ordersTask = _orderService.GetForUserAsync(id);

    await Task.WhenAll(userTask, ordersTask);  // Run concurrently
    return (userTask.Result, ordersTask.Result);
}

// 4. Real-time applications (SignalR, WebSockets)
public async Task HandleClientAsync(WebSocket socket)
{
    byte[] buffer = new byte[1024];
    var result = await socket.ReceiveAsync(buffer, CancellationToken.None);
    await socket.SendAsync(response, WebSocketMessageType.Text, true, CancellationToken.None);
}
```

---

### 52. How is Async and await applied in practice?

**Answer:**

In practice, Async and await is applied by making the asynchronous programming syntax used to keep
applications responsive and scalable explicit in the code, runtime setup, or delivery workflow. The
exact shape depends on the application, but the responsibility should stay predictable.

**Sample:**

```csharp
// DATABASE OPERATIONS
public async Task<List<Product>> GetProductsAsync()
{
    return await _db.Products
        .Where(p => p.IsActive)
        .ToListAsync();  // Async execution
}

// HTTP CALLS
public async Task<UserDTO> FetchUserAsync(int id)
{
    var response = await _httpClient.GetAsync($"/api/users/{id}");
    var content = await response.Content.ReadAsStringAsync();
    return JsonConvert.DeserializeObject<UserDTO>(content);
}

// FILE I/O
public async Task<string> ReadFileAsync(string path)
{
    using var file = new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.Read, 4096, useAsync: true);
    using var reader = new StreamReader(file);
    return await reader.ReadToEndAsync();  // Non-blocking file read
}

// DELAY/WAITING
public async Task RetryWithBackoffAsync(Func<Task> operation, int maxRetries = 3)
{
    for (int i = 0; i < maxRetries; i++)
    {
        try
        {
            await operation();
            return;
        }
        catch when (i < maxRetries - 1)
        {
            await Task.Delay(TimeSpan.FromSeconds(Math.Pow(2, i)));  // Exponential backoff
        }
    }
}
```

---

### 53. What strengths does Async and await bring?

**Answer:**

The strengths of Async and await are better structure, better communication, and better control over
the asynchronous programming syntax used to keep applications responsive and scalable. It also makes
tradeoffs easier to explain to reviewers, interviewers, and teammates.

**Sample:**

```csharp
// STRENGTH 1: Cleaner syntax than callbacks

// Callback hell (before async/await)
_httpClient.GetAsync(url).ContinueWith(task =>
{
    var response = task.Result;
    response.Content.ReadAsStringAsync().ContinueWith(task2 =>
    {
        var content = task2.Result;
        ProcessData(content);
    });
});

// Sequential async/await (readable and maintainable)
public async Task FetchAndProcessAsync()
{
    var response = await _httpClient.GetAsync(url);
    var content = await response.Content.ReadAsStringAsync();
    ProcessData(content);
}

// STRENGTH 2: Exception handling works as expected

public async Task SafeOperationAsync()
{
    try
    {
        var result = await RiskyOperationAsync();  // Normal try/catch
    }
    catch (TimeoutException)
    {
        // Handle naturally
    }
}

// STRENGTH 3: Composability - chain async operations

public async Task<OrderSummary> GetOrderSummaryAsync(int orderId)
{
    var order = await GetOrderAsync(orderId);
    var customer = await GetCustomerAsync(order.CustomerId);
    var items = await GetOrderItemsAsync(orderId);
    return BuildSummary(order, customer, items);
}
```

---

### 54. What tradeoffs come with Async and await?

**Answer:**

The main tradeoff is extra complexity if Async and await is introduced without a real need or a
clear understanding of the asynchronous programming syntax used to keep applications responsive and
scalable. That usually leads to overengineering, hidden bugs, or confusing architecture.

**Sample:**

```csharp
// TRADEOFF 1: Complexity if misused

// ❌ Unnecessary async - doesn't perform I/O
public async Task<int> GetCountAsync()  // Async for no reason
{
    return await Task.FromResult(_items.Count);  // No I/O
}

// ✅ Better: Keep it synchronous if no I/O
public int GetCount()
{
    return _items.Count;
}

// TRADEOFF 2: Synchronous context assumptions

// ❌ Blocking on async (causes deadlocks in certain contexts)
public void LoadUserUI()
{
    var user = GetUserAsync().Result;  // ❌ Can deadlock in UI context
    DisplayUser(user);
}

// ✅ Better: Use async throughout the call stack
public async Task LoadUserUIAsync()
{
    var user = await GetUserAsync();
    DisplayUser(user);
}

// TRADEOFF 3: Async all the way - can't have partial sync code

// ❌ Mixing sync and async is error-prone
var user = GetUserAsync().Result;  // Blocks, bad practice
var result = await ProcessAsync();   // Then awaits - inconsistent

// Better: Commit to async chain
await LoadUserAsync();
await ProcessAsync();

// TRADEOFF 4: Performance overhead of state machine
// Each async method creates state machine - small overhead vs sync
```

---

### 55. How does Async and await differ from Tasks and threading?

**Answer:**

Async and await is centered on the asynchronous programming syntax used to keep applications
responsive and scalable, while Tasks and threading is centered on the concurrency model used to
manage asynchronous and parallel work in .NET. They often work together, but they solve different
parts of the topic.

**Sample:**

```csharp
// ASYNC/AWAIT: Syntax for nonblocking I/O

public async Task<string> FetchAsync()
{
    // Doesn't necessarily use a new thread
    return await _httpClient.GetStringAsync(url);  // I/O waits, thread freed
}

// TASKS: Lower-level abstraction

var task = Task.Run(() => ExpensiveCalculation());  // Uses thread pool
var result = await task;

// THREADING: Create explicit threads

var thread = new Thread(() => DoWork());  // Explicit thread
thread.Start();
thread.Join();  // Wait for completion

// COMBINED: Async methods internally use tasks

public async Task<List<User>> GetUsersAsync()
{
    // Behind the scenes: compiler creates state machine, uses Task
    var users = await _db.FromSqlAsync("SELECT * FROM Users");
    // Database returns task, we await it
    return users;
}

// PARALLEL + ASYNC: CPU work + I/O work

public async Task<List<string>> ProcessConcurrently(List<int> ids)
{
    // Parallel.ForEach runs on multiple threads (CPU-bound)
    var tasks = ids.AsParallel()
        .Select(id => FetchAndProcessAsync(id))  // Each awaits I/O
        .ToList();

    // Wait for all
    var results = await Task.WhenAll(tasks);
    return results;
}
```

---

### 56. What is a good real-world example of Async and await?

**Answer:**

A strong example is explaining how Async and await affects a real feature, production issue,
migration, or architecture decision involving the asynchronous programming syntax used to keep
applications responsive and scalable. Interviewers usually care more about the reasoning than the
definition alone.

**Sample:**

```csharp
// REAL-WORLD: E-commerce checkout flow

public class CheckoutService
{
    public async Task<OrderConfirmation> CheckoutAsync(Cart cart)
    {
        // Step 1: Validate inventory (I/O: database)
        var valid = await ValidateInventoryAsync(cart.Items);
        if (!valid)
            throw new OutOfStockException();

        // Step 2: Process payment (I/O: payment gateway)
        var payment = await ProcessPaymentAsync(cart.Total);
        if (!payment.Approved)
            throw new PaymentFailedException();

        // Step 3: Save order (I/O: database)
        var order = await SaveOrderAsync(cart, payment);

        // Step 4: Send confirmation email (I/O: email service)
        await SendConfirmationEmailAsync(order);

        return new OrderConfirmation { OrderId = order.Id };
    }
}

// BENEFIT:
// - Multiple I/O operations don't block UI
// - Web server thread returns to pool after each await
// - Scales to thousands of concurrent users
// - Code reads naturally, top-to-bottom
// - Exceptions bubble up normally

// WEB API HANDLING LOAD:
// Without async: 100 threads = 100 concurrent requests max
// With async: Same 100 threads handle 10,000+ concurrent requests
// (Most time spent waiting for I/O, not computing)
```

---

### 57. What is a best practice for Async and await?

**Answer:**

A good practice is to keep Async and await aligned with the actual requirement around the
asynchronous programming syntax used to keep applications responsive and scalable. Teams should
document intent, keep implementation readable, and validate important paths early.

**Sample:**

```csharp
// BEST PRACTICE 1: Use async all the way

// ❌ Bad: Sync wrapper around async
public User GetUser(int id)
{
    return GetUserAsync(id).Result;  // Blocks thread, poor scalability
}

// ✅ Good: Async throughout
public async Task<User> GetUserAsync(int id)
{
    return await _repository.GetAsync(id);
}

// BEST PRACTICE 2: Return Task, not async void (except events)

// ❌ Bad: async void (can't track completion)
public async void LoadData()  // Fire-and-forget, exceptions hard to handle
{
    var data = await FetchAsync();
    Display(data);
}

// ✅ Good: async Task
public async Task LoadDataAsync()  // Can be awaited, exceptions propagate
{
    var data = await FetchAsync();
    Display(data);
}

// ✅ Exception handler: async void only for events
public class Button
{
    public event Func<Task> OnClick;  // Better than async void
}

// BEST PRACTICE 3: Use ConfigureAwait for libraries

public async Task ProcessAsync()
{
    var data = await FetchAsync().ConfigureAwait(false);  // Don't return to UI thread
    await SaveAsync(data).ConfigureAwait(false);
}

// BEST PRACTICE 4: Name async methods with Async suffix

// ✅ Clear that it's asynchronous
public async Task<string> FetchDataAsync() { }

// ❌ Unclear
public async Task<string> FetchData() { }
```

---

### 58. What is a common mistake around Async and await?

**Answer:**

A common mistake is naming Async and await without understanding how it affects the asynchronous
programming syntax used to keep applications responsive and scalable. In real work, that usually
appears as weak design choices, poor debugging, or incomplete explanations.

**Sample:**

```csharp
// MISTAKE 1: Async void (impossible to track or handle exceptions)

// ❌ Bad for all except UI event handlers
public async void FetchAndDisplay()
{
    try
    {
        var data = await FetchAsync();  // Exception here...
        Display(data);
    }
    catch  // ...might not be caught
    {
        // Application could crash without warning
    }
}

// ✅ Fixed: Return Task
public async Task FetchAndDisplayAsync()
{
    var data = await FetchAsync();
    Display(data);
}

// MISTAKE 2: Blocking on async (deadlock)

// ❌ Bad: Can deadlock in UI contexts
public void Button_Click()
{
    var user = GetUserAsync().Result;  // Blocks UI thread
    // UI thread waits for result, but result might need UI thread!
}

// MISTAKE 3: Not awaiting async calls

// ❌ Bad: Fire and forget without reason
public void SaveUser(User user)
{
    SaveUserAsync(user);  // No await, call doesn't complete
    Log("User saved");     // Logs before save finishes!
}

// ✅ Fixed: Await or return Task
public async Task SaveUserAsync(User user)
{
    await SaveUserAsync(user);
    Log("User saved");
}

// MISTAKE 4: Incorrect exception handling

// ❌ Multiple awaits without catching between
var result1 = await CallA();  // Exception here...
var result2 = await CallB();  // ...stops here
var result3 = await CallC();  // Never executes

// ✅ Better: Explicitly handle or let propagate
try
{
    var result1 = await CallA();
    var result2 = await CallB();
}
catch (Exception ex)
{
    // Handle or log
    throw;  // Re-throw
}
```

---

### 59. How do you troubleshoot Async and await-related issues?

**Answer:**

When troubleshooting Async and await, first verify whether the asynchronous programming syntax used
to keep applications responsive and scalable is behaving as expected. Then check surrounding
dependencies, configuration, logs, runtime behavior, and edge cases before changing the design.

**Sample:**

```csharp
// DEBUGGING: Async hang or deadlock

public async Task TestAsync()
{
    var result = GetDataAsync().Result;  // ❌ Deadlock if GetDataAsync needs UI thread
    Console.WriteLine(result);
}

// Fix: Use proper async
public async Task TestAsync()
{
    var result = await GetDataAsync();  // ✅ No deadlock
    Console.WriteLine(result);
}

// DEBUGGING: Exception disappears

// ❌ Fire and forget - exception is lost
public async void Button_Click()
{
    DoWork();  // Exception silently fails
}

private async void DoWork()
{
    throw new InvalidOperationException();  // Never seen
}

// Fix: Track task or use Task return
private async Task DoWorkAsync()
{
    throw new InvalidOperationException();  // Visible
}

public async Task Button_ClickAsync()
{
    await DoWorkAsync();  // Exception visible
}

// DEBUGGING: Slow performance

public async Task SlowAsync()
{
    // Mistake: Sequential awaits instead of parallel
    var a = await CallA();  // 1 second
    var b = await CallB();  // 1 second
    var c = await CallC();  // 1 second
    // Total: 3 seconds
}

// Better: Parallel when independent
public async Task FastAsync()
{
    var aTask = CallA();
    var bTask = CallB();
    var cTask = CallC();

    await Task.WhenAll(aTask, bTask, cTask);
    // Total: 1 second (max of all)
}

// DEBUGGING: With Stopwatch

public async Task PerformanceTest()
{
    var sw = Stopwatch.StartNew();
    var result = await FetchAsync();
    sw.Stop();
    Console.WriteLine($"Took {sw.ElapsedMilliseconds}ms");
}
```

---

### 60. How does Async and await connect to the rest of advanced C#?

**Answer:**

Async and await connects to the rest of advanced C# by giving structure to the asynchronous
programming syntax used to keep applications responsive and scalable. It is one of the pieces that
turns isolated facts into a coherent end-to-end explanation.

**Sample:**

```csharp
// INTEGRATION: Generics + LINQ + Async

public class AsyncRepository<T> where T : Entity
{
    private DbSet<T> _dbSet;

    // Generic method returning Task
    public async Task<List<T>> FindAsync(Expression<Func<T, bool>> predicate)
    {
        return await _dbSet
            .Where(predicate)  // LINQ query
            .ToListAsync();     // Async execution
    }
}

// USAGE:
var repository = new AsyncRepository<User>();
var adults = await repository.FindAsync(u => u.Age >= 18);  // Generics + LINQ + Async

// INTEGRATION: Lambda + Events + Async

public class DataProcessor
{
    public event Func<Task> OnDataProcessed;  // Event with async

    public async Task ProcessAsync()
    {
        var data = await FetchAsync();
        var processed = data.Select(x => x * 2).ToList();  // Lambda + LINQ

        if (OnDataProcessed != null)
        {
            foreach (var handler in OnDataProcessed.GetInvocationList())
            {
                await (Task)handler.DynamicInvoke();  // Async event invocation
            }
        }
    }
}

// FULL EXAMPLE: All advanced concepts together

public class OrderService
{
    public event EventHandler<OrderEventArgs> OrderCompleted;  // Events

    public async Task<OrderSummary> ProcessOrderAsync<T>(List<T> items) where T : IOrderItem
    {
        // Generics + LINQ + Async
        var validated = await ValidateAsync(items);  // Async
        var summary = validated
            .Where(x => x.IsValid)       // LINQ
            .Select(x => new OrderItem { /* ... */ })  // Lambda
            .ToList();

        OnOrderCompleted?.Invoke(this, new OrderEventArgs { Items = summary });  // Events
        return BuildSummary(summary);
    }
}
```

---

## 6. Tasks and threading

### 61-72. Tasks and Threading Patterns

**Comprehensive Examples:**

```csharp
// TASK BASICS
Task<int> task = Task.Run(() => CalculateAsync());
int result = task.Result;  // Blocks until result

// TASK.WHENALL: Wait for all
Task<int> t1 = Task.Run(() => 1);
Task<int> t2 = Task.Run(() => 2);
await Task.WhenAll(t1, t2);
var results = new[] { t1.Result, t2.Result };

// PARALLEL.FOR: Distribute loop iterations
Parallel.For(0, items.Count, i =>
{
    ProcessItem(items[i]);  // Runs in parallel threads
});

// TASK CONTINUATION
Task task1 = DoWorkAsync();
Task task2 = task1.ContinueWith(t => DoFollowUp());
Task task3 = task2.ContinueWith(t => Cleanup());

// CANCELLATION: CancellationToken
var cts = new CancellationTokenSource(TimeSpan.FromSeconds(5));
await LongWorkAsync(cts.Token);

// THREAD POOL & WORK ITEMS
ThreadPool.QueueUserWorkItem(state =>
{
    Console.WriteLine($"Running on thread {Thread.CurrentThread.ManagedThreadId}");
});

// SYNCHRONIZATION: Lock
private object lockObj = new object();
lock (lockObj)
{
    sharedCounter++;  // Safe access
}

// ASYNC LOCK (AsyncLock pattern)
private readonly SemaphoreSlim semaphore = new SemaphoreSlim(1);

public async Task SafeAccessAsync()
{
    await semaphore.WaitAsync();
    try
    {
        await ProtectedOperation();
    }
    finally
    {
        semaphore.Release();
    }
}

// PRODUCER-CONSUMER: BlockingCollection
var queue = new BlockingCollection<int>();
Task producer = Task.Run(() =>
{
    for (int i = 0; i < 100; i++)
    {
        queue.Add(i);
    }
    queue.CompleteAdding();
});

Task consumer = Task.Run(() =>
{
    foreach (int item in queue.GetConsumingEnumerable())
    {
        Process(item);
    }
});

await Task.WhenAll(producer, consumer);
```

---

## 7. Reflection

### 73-84. Dynamic Type Inspection & Invocation

**Key Patterns:**

```csharp
// TYPE INSPECTION
Type t = typeof(User);
var methods = t.GetMethods(BindingFlags.Public | BindingFlags.Instance);
var properties = t.GetProperties();

// CREATE INSTANCES
var user = (User)Activator.CreateInstance(t);
var userWithCtor = (User)Activator.CreateInstance(t, "John", 30);

// INVOKE METHODS
var method = t.GetMethod("Save");
method.Invoke(user, null);

// ACCESS PROPERTIES
var nameProp = t.GetProperty("Name");
nameProp.SetValue(user, "Jane");
var name = (string)nameProp.GetValue(user);

// CHECK ATTRIBUTES
if (t.GetCustomAttribute<SerializableAttribute>() != null)
{
    Console.WriteLine("Type is serializable");
}

// EXPRESSION TREES: Compiled reflection
var param = Expression.Parameter(typeof(User));
var prop = Expression.Property(param, "Age");
var lambda = Expression.Lambda<Func<User, int>>(prop, param);
var compiled = lambda.Compile();
int age = compiled(new User { Age = 25 });

// GENERIC TYPES
var listType = typeof(List<User>);
var args = listType.GetGenericArguments();  // [typeof(User)]

// PERFORMANCE OPTIMIZATION: Cache results
public static class ReflectionCache<T>
{
    public static readonly PropertyInfo[] Properties = typeof(T).GetProperties();
    public static readonly MethodInfo[] Methods = typeof(T).GetMethods();
}
```

---

## 8-10. Attributes, Memory Management & Collections

**Advanced Features:**

```csharp
// DEFINE CUSTOM ATTRIBUTE
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class PerformanceAttribute : Attribute
{
    public string Description { get; set; }
    public int ExpectedMs { get; set; }
}

// APPLY CUSTOM ATTRIBUTE
[Performance(Description = "Critical query", ExpectedMs = 100)]
[Cacheable(durationSeconds: 300)]
public class UserService
{
    [Performance(ExpectedMs = 50)]
    public User GetById(int id) { }
}

// STACKALLOC: Allocate on stack (no GC)
Span<byte> buffer = stackalloc byte[256];
stream.Read(buffer);

// UNMANAGED: Direct memory
[DllImport("kernel32.dll")]
public static extern void SetConsoleTitle(string lpConsoleTitle);

// SPAN<T>: Memory-safe zero-copy slicing
int[] array = new int[] { 1, 2, 3, 4, 5 };
Span<int> slice = array.AsSpan(1, 3);  // Points to same memory

// MEMORY<T>: Reference counted memory
Memory<int> memory = new Memory<int>(new[] { 1, 2, 3 });
MemoryPool<int>.Shared.Rent(10);

// ADVANCED COLLECTIONS
var linkedList = new LinkedList<int> { 1, 2, 3 };
var node = linkedList.First;
linkedList.AddBefore(node, 0);

// CONCURRENT COLLECTIONS (thread-safe)
var concurrentDict = new ConcurrentDictionary<string, int>();
concurrentDict.TryAdd("key", 42);
concurrentDict.TryGetValue("key", out int value);

var concurrentBag = new ConcurrentBag<string>();
concurrentBag.Add("item");  // Lightweight, unordered

var blockingQueue = new BlockingCollection<int>(maxSize: 100);
blockingQueue.Add(1);  // Blocks if full
blockingQueue.Take();  // Blocks if empty
```

### 62. Why is the concept of Tasks and threading important in advanced C#?

**Answer:**

This concept matters because it influences the concurrency model used to manage asynchronous
and parallel work in .NET. Good interview answers connect it to clarity, maintainability,
performance, security, or delivery depending on the situation.

**Sample:**

```csharp
// Concept: 6. Tasks and threading - Basic async/await pattern
public async Task<string> FetchDataAsync(string url)
{
    using HttpClient client = new();
    var response = await client.GetAsync(url);
    return await response.Content.ReadAsStringAsync();
}

// Usage
var data = await FetchDataAsync("https://api.example.com/data");
Console.WriteLine(data);
```

---

### 63. When should a team focus on Tasks and threading?

**Answer:**

A team should focus on Tasks and threading when the requirement depends on the concurrency model
used to manage asynchronous and parallel work in .NET. It becomes especially important when design
decisions, scalability, or debugging depend on that area.

**Sample:**

```csharp
// Concept: 6. Tasks and threading - Multiple concurrent operations
public async Task<List<string>> FetchMultipleDataAsync(List<string> urls)
{
    List<Task<string>> tasks = urls.Select(url =>
        new HttpClient().GetStringAsync(url)
    ).ToList();

    var results = await Task.WhenAll(tasks);
    return results.ToList();
}

// Handles scalability by managing multiple concurrent requests
```

---

### 64. How is Tasks and threading applied in practice?

**Answer:**

In practice, Tasks and threading is applied by making the concurrency model used to manage
asynchronous and parallel work in .NET explicit in the code, runtime setup, or delivery workflow.
The exact shape depends on the application, but the responsibility should stay predictable.

**Sample:**

```csharp
// Concept: 6. Tasks and threading - Real-world async processing
public async Task ProcessOrdersAsync(List<Order> orders, CancellationToken ct)
{
    var tasks = orders.Select(order =>
        ProcessSingleOrderAsync(order, ct)
    ).ToList();

    await Task.WhenAll(tasks);
    Console.WriteLine($"Processed {orders.Count} orders concurrently");
}

private async Task ProcessSingleOrderAsync(Order order, CancellationToken ct)
{
    await Task.Delay(100, ct);
    Console.WriteLine($"Order {order.Id} processed on thread {Thread.CurrentThread.ManagedThreadId}");
}
```

---

### 65. What strengths does Tasks and threading bring?

**Answer:**

The strengths of Tasks and threading are better structure, better communication, and better control
over the concurrency model used to manage asynchronous and parallel work in .NET. It also makes
tradeoffs easier to explain to reviewers, interviewers, and teammates.

**Sample:**

```csharp
// Concept: 6. Tasks and threading - Strengths: scalability and responsiveness
// Without Tasks: 1000 users * 10sec = 10,000 seconds (blocking threads)
// With Tasks: 1000 users processed concurrently = much better throughput

public async Task<IActionResult> GetUserDataAsync(int userId)
{
    var userData = await _userService.GetUserAsync(userId).ConfigureAwait(false);
    var orders = await _orderService.GetUserOrdersAsync(userId).ConfigureAwait(false);

    return Ok(new { userData, orders });
}

// Both operations run concurrently, completing in ~10 seconds instead of ~20 seconds
```

---

### 66. What tradeoffs come with Tasks and threading?

**Answer:**

The main tradeoff is extra complexity if Tasks and threading is introduced without a real need or a
clear understanding of the concurrency model used to manage asynchronous and parallel work in .NET.
That usually leads to overengineering, hidden bugs, or confusing architecture.

**Sample:**

```csharp
// Concept: 6. Tasks and threading - Tradeoff: Unnecessary complexity

// ❌ OVERENGINEERED: Simple synchronous operation wrapped in Task
public async Task<string> GetConfigValueAsync(string key)
{
    return await Task.Run(() => _config[key]);
}

// ✅ BETTER: Simple synchronous operation (no async overhead)
public string GetConfigValue(string key)
{
    return _config[key];
}

// Only use async when there's actual I/O bound work
```

---

### 67. How does Tasks and threading differ from Reflection?

**Answer:**

Tasks and threading is centered on the concurrency model used to manage asynchronous and parallel
work in .NET, while Reflection is centered on the runtime inspection model used to examine metadata
and types dynamically. They often work together, but they solve different parts of the topic.

**Sample:**

```csharp
// Concept: 6. Tasks and threading vs Reflection

// Tasks and threading: HOW to execute asynchronously
public async Task<Data> GetDataAsync() { return await _api.FetchAsync(); }

// Reflection: HOW to inspect and work with types dynamically
public object CreateInstance(Type type)
{
    return Activator.CreateInstance(type);
}

// Together: Async factory pattern using reflection
public async Task<T> CreateInstanceAsync<T>(IDictionary<string, object> args)
where T : class
{
    var instance = (T)Activator.CreateInstance(typeof(T), args.Values.ToArray());
    if (instance is IAsyncInitializable asyncInit)
        await asyncInit.InitializeAsync();
    return instance;
}
```

---

### 68. What is a good real-world example of Tasks and threading?

**Answer:**

A strong example is explaining how Tasks and threading affects a real feature, production issue,
migration, or architecture decision involving the concurrency model used to manage asynchronous and
parallel work in .NET. Interviewers usually care more about the reasoning than the definition alone.

**Sample:**

```csharp
// Concept: 6. Tasks and threading - Real-world: E-commerce checkout
public async Task<CheckoutResult> CheckoutAsync(Order order)
{
    // Run independent operations concurrently
    var validateTask = _paymentService.ValidatePaymentAsync(order.Payment);
    var inventoryTask = _inventoryService.ReserveStockAsync(order.Items);
    var shippingTask = _shippingService.CalculateRateAsync(order.ShippingAddress);

    await Task.WhenAll(validateTask, inventoryTask, shippingTask);

    var payment = validateTask.Result;
    var reserved = inventoryTask.Result;
    var shipping = shippingTask.Result;

    return new CheckoutResult {
        IsValid = payment.IsValid && reserved.Success,
        ShippingCost = shipping.Cost
    };
}
```

---

### 69. What is a best practice for Tasks and threading?

**Answer:**

A good practice is to keep Tasks and threading aligned with the actual requirement around the
concurrency model used to manage asynchronous and parallel work in .NET. Teams should document
intent, keep implementation readable, and validate important paths early.

**Sample:**

```csharp
// Concept: 6. Tasks and threading - Best practices

// ✅ Use ConfigureAwait(false) in libraries to avoid deadlocks
public async Task<User> GetUserAsync(int id)
{
    var response = await _httpClient.GetAsync($"/api/users/{id}")
        .ConfigureAwait(false);
    return await response.Content.ReadAsAsync<User>()
        .ConfigureAwait(false);
}

// ✅ Always use CancellationToken for long operations
public async Task ProcessLargeDatasetAsync(CancellationToken ct)
{
    foreach (var batch in GetBatches())
    {
        ct.ThrowIfCancellationRequested();
        await ProcessBatchAsync(batch, ct).ConfigureAwait(false);
    }
}

// ❌ Avoid async void (except event handlers)
public event EventHandler OnDataLoaded;
private async void Button_Click(object sender, EventArgs e) // Only for events
{
    await LoadDataAsync();
    OnDataLoaded?.Invoke(this, EventArgs.Empty);
}
```

---

### 70. What is a common mistake around Tasks and threading?

**Answer:**

A common mistake is naming Tasks and threading without understanding how it affects the concurrency
model used to manage asynchronous and parallel work in .NET. In real work, that usually appears as
weak design choices, poor debugging, or incomplete explanations.

**Sample:**

```csharp
// Concept: 6. Tasks and threading - Common mistakes

// ❌ MISTAKE 1: Deadlock from blocking on async code
public User GetUser(int id)
{
    var user = GetUserAsync(id).Result; // BLOCKS! Can deadlock
    return user;
}

// ✅ CORRECT: Return the Task
public Task<User> GetUser(int id)
{
    return GetUserAsync(id);
}

// ❌ MISTAKE 2: Not awaiting tasks
var task = ProcessAsync(); // Task is scheduled but not awaited
Console.WriteLine("Done"); // May print before ProcessAsync completes

// ✅ CORRECT: Await the task
var result = await ProcessAsync();
Console.WriteLine("Done"); // Prints after ProcessAsync completes
```

---

### 71. How do you troubleshoot Tasks and threading-related issues?

**Answer:**

When troubleshooting Tasks and threading, first verify whether the concurrency model used to manage
asynchronous and parallel work in .NET is behaving as expected. Then check surrounding dependencies,
configuration, logs, runtime behavior, and edge cases before changing the design.

**Sample:**

```csharp
// Concept: 6. Tasks and threading - Troubleshooting approaches

// Issue 1: Tasks not completing - add logging
public async Task ProcessAsync()
{
    _logger.LogInformation("Starting process on thread {ThreadId}",
        Thread.CurrentThread.ManagedThreadId);

    try
    {
        await _service.DoWorkAsync();
        _logger.LogInformation("Process completed");
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Process failed");
        throw;
    }
}

// Issue 2: Deadlock - use Task.Run to offload
public async Task<Data> GetDataAsync()
{
    return await Task.Run(() =>
    {
        _logger.LogInformation("Running on thread {ThreadId}",
            Thread.CurrentThread.ManagedThreadId);
        return _syncService.GetData();
    });
}
```

---

### 72. How does Tasks and threading connect to the rest of advanced C#?

**Answer:**

Tasks and threading connects to the rest of advanced C# by giving structure to the concurrency model
used to manage asynchronous and parallel work in .NET. It is one of the pieces that turns isolated
facts into a coherent end-to-end explanation.

**Sample:**

```csharp
// Concept: 6. Tasks and threading - Integration with other C# features

// With LINQ (query syntax) + Tasks
public async Task<List<int>> ProcessNumbersAsync(List<int> numbers)
{
    var tasks = numbers
        .Where(n => n > 0)
        .Select(n => ProcessNumberAsync(n))
        .ToList();

    var results = await Task.WhenAll(tasks);
    return results.ToList();
}

// With Reflection + Tasks (dynamic async invocation)
public async Task InvokeAsync(object target, string methodName, params object[] args)
{
    var method = target.GetType().GetMethod(methodName);
    if (method?.ReturnType == typeof(Task))
    {
        await (Task)method.Invoke(target, args);
    }
}

// With LINQ queries executing asynchronously
var activeUsers = await _dbContext.Users
    .Where(u => u.IsActive)
    .ToListAsync();
```

---

## 7. Reflection

### 73. What is the role of Reflection in advanced C#?

**Answer:**

In advanced C#, the term Reflection refers to the runtime inspection model used to examine metadata and types
dynamically. It is part of the foundation a candidate should be able to explain clearly.

**Sample:**

```csharp
// Concept: 7. Reflection - Runtime type inspection
public class ReflectionExample
{
    public void InspectType<T>()
    {
        Type type = typeof(T);
        Console.WriteLine($"Type: {type.Name}");
        Console.WriteLine($"Base Type: {type.BaseType}");

        // Get all public methods
        var methods = type.GetMethods(System.Reflection.BindingFlags.Public |
            System.Reflection.BindingFlags.Instance);

        foreach (var method in methods)
        {
            Console.WriteLine($"Method: {method.Name}");
        }
    }
}

// Usage
var example = new ReflectionExample();
example.InspectType<string>();
```

---

### 74. Why is the concept of Reflection important in advanced C#?

**Answer:**

This concept matters because it influences the runtime inspection model used to examine metadata and
types dynamically. Good interview answers connect it to clarity, maintainability, performance,
security, or delivery depending on the situation.

**Sample:**

```csharp
// Concept: 7. Reflection - Why it matters: Frameworks depend on it

// Dependency Injection containers use reflection
public class ServiceContainer
{
    private Dictionary<Type, Type> _registrations = new();

    public void Register<TInterface, TImplementation>()
        where TImplementation : TInterface
    {
        _registrations[typeof(TInterface)] = typeof(TImplementation);
    }

    public T Resolve<T>() where T : class
    {
        var implType = _registrations[typeof(T)];
        var constructor = implType.GetConstructors().First();
        var parameters = constructor.GetParameters()
            .Select(p => Resolve((dynamic)this, p.ParameterType))
            .ToArray();
        return (T)Activator.CreateInstance(implType, parameters);
    }
}
```

---

### 75. When should a team focus on Reflection?

**Answer:**

A team should focus on Reflection when the requirement depends on the runtime inspection model used
to examine metadata and types dynamically. It becomes especially important when design decisions,
scalability, or debugging depend on that area.

**Sample:**

```csharp
// Concept: 7. Reflection - When to use it

// Use case 1: Serialization frameworks (JSON.NET, Protobuf, etc.)
public class JsonSerializer
{
    public string Serialize<T>(T obj)
    {
        var properties = typeof(T).GetProperties();
        var dict = new Dictionary<string, object>();

        foreach (var prop in properties)
        {
            dict[prop.Name] = prop.GetValue(obj);
        }

        return System.Text.Json.JsonSerializer.Serialize(dict);
    }
}

// Use case 2: ORM frameworks (Entity Framework, Dapper)
public class DataMapper<T> where T : class
{
    public T MapFromReader(IDataReader reader)
    {
        var properties = typeof(T).GetProperties();
        var instance = Activator.CreateInstance<T>();

        foreach (var prop in properties)
        {
            if (reader.GetOrdinal(prop.Name) >= 0)
                prop.SetValue(instance, reader[prop.Name]);
        }

        return instance;
    }
}
```

---

### 76. How is Reflection applied in practice?

**Answer:**

In practice, Reflection is applied by making the runtime inspection model used to examine metadata
and types dynamically explicit in the code, runtime setup, or delivery workflow. The exact shape
depends on the application, but the responsibility should stay predictable.

**Sample:**

```csharp
// Concept: 7. Reflection - Practical application: Validation framework
public class ValidatorEngine
{
    public List<string> Validate(object obj)
    {
        var errors = new List<string>();
        var type = obj.GetType();
        var properties = type.GetProperties();

        foreach (var prop in properties)
        {
            // Check for validation attributes
            var attributes = prop.GetCustomAttributes(typeof(ValidationAttribute), false);
            var value = prop.GetValue(obj);

            foreach (ValidationAttribute attr in attributes)
            {
                if (!attr.IsValid(value))
                    errors.Add($"{prop.Name}: {attr.ErrorMessage}");
            }
        }

        return errors;
    }
}

public class User
{
    [Required]
    public string Name { get; set; }

    [EmailAddress]
    public string Email { get; set; }
}
```

---

### 77. What strengths does Reflection bring?

**Answer:**

The strengths of Reflection are better structure, better communication, and better control over the
runtime inspection model used to examine metadata and types dynamically. It also makes tradeoffs
easier to explain to reviewers, interviewers, and teammates.

**Sample:**

```csharp
// Concept: 7. Reflection - Strengths: Flexibility and abstraction

// Strength 1: Without reflection - tightly coupled
public class UserService {
    public UserDto GetUser(int id) => new UserDto { Id = id, Name = "John" };
}
public void PrintUserData()
{
    var service = new UserService();
    var dto = service.GetUser(1);
    Console.WriteLine(dto.Id); // Tightly coupled
}

// Strength 2: With reflection - flexible and extensible
public void PrintObjectProperties(object obj)
{
    var properties = obj.GetType().GetProperties();
    foreach (var prop in properties)
    {
        Console.WriteLine($"{prop.Name}: {prop.GetValue(obj)}");
    }
}

// Now works with ANY object - user, order, product, etc.
```

---

### 78. What tradeoffs come with Reflection?

**Answer:**

The main tradeoff is extra complexity if Reflection is introduced without a real need or a clear
understanding of the runtime inspection model used to examine metadata and types dynamically. That
usually leads to overengineering, hidden bugs, or confusing architecture.

**Sample:**

```csharp
// Concept: 7. Reflection - Tradeoff: Performance overhead

// ❌ REFLECTION - Slower due to runtime type inspection
public object GetPropertyValueReflection(object obj, string propName)
{
    return obj.GetType().GetProperty(propName)?.GetValue(obj);
}

// ✅ DIRECT ACCESS - Faster (compiled)
public string GetPropertyValueDirect(User user)
{
    return user.Name;
}

// Reflection benchmark: ~1000 ns per call vs. Direct: ~0.1 ns per call
// Use reflection only when flexibility is worth the performance cost
// Mitigation: Cache reflection results
private static Dictionary<Type, PropertyInfo[]> _cache = new();

public PropertyInfo[] GetPropertiesCached(Type type)
{
    if (!_cache.TryGetValue(type, out var props))
    {
        props = type.GetProperties();
        _cache[type] = props;
    }
    return props;
}
```

---

### 79. How does Reflection differ from Attributes?

**Answer:**

Reflection is centered on the runtime inspection model used to examine metadata and types
dynamically, while Attributes is centered on the metadata annotations used to attach declarative
behavior or meaning to code. They often work together, but they solve different parts of the topic.

**Sample:**

```csharp
// Concept: 7. Reflection vs Attributes

// Attributes: Declarative metadata on code
[Serializable]
[Obsolete("Use UserV2 instead")]
public class User
{
    [Required]
    [MaxLength(100)]
    public string Name { get; set; }

    [EmailAddress]
    public string Email { get; set; }
}

// Reflection: Inspecting the attributes at runtime
public void InspectAttributes(Type type)
{
    var attrs = type.GetCustomAttributes();
    foreach (var attr in attrs)
    {
        Console.WriteLine($"Type has attribute: {attr.GetType().Name}");
    }

    var props = type.GetProperties();
    foreach (var prop in props)
    {
        var propAttrs = prop.GetCustomAttributes();
        Console.WriteLine($"Property {prop.Name} has {propAttrs.Length} attributes");
    }
}
```

---

### 80. What is a good real-world example of Reflection?

**Answer:**

A strong example is explaining how Reflection affects a real feature, production issue, migration,
or architecture decision involving the runtime inspection model used to examine metadata and types
dynamically. Interviewers usually care more about the reasoning than the definition alone.

**Sample:**

```csharp
// Concept: 7. Reflection - Real-world: Unit test framework
public class TestRunner
{
    public void RunAllTests(Type testClass)
    {
        var instance = Activator.CreateInstance(testClass);
        var methods = testClass.GetMethods(System.Reflection.BindingFlags.Public |
            System.Reflection.BindingFlags.Instance);

        foreach (var method in methods)
        {
            // Look for [TestMethod] attribute
            var attr = method.GetCustomAttribute<TestMethodAttribute>();
            if (attr != null)
            {
                Console.WriteLine($"Running {method.Name}...");
                try
                {
                    method.Invoke(instance, null);
                    Console.WriteLine($"  ✓ Passed");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"  ✗ Failed: {ex.Message}");
                }
            }
        }
    }
}

public class UserTests
{
    [TestMethod]
    public void UserName_Should_Not_BeEmpty() { }

    [TestMethod]
    public void UserEmail_Should_BeValid() { }
}
```

---

### 81. What is a best practice for Reflection?

**Answer:**

A good practice is to keep Reflection aligned with the actual requirement around the runtime
inspection model used to examine metadata and types dynamically. Teams should document intent, keep
implementation readable, and validate important paths early.

**Sample:**

```csharp
// Concept: 7. Reflection - Best practices

// ✅ Cache reflection results for performance
public class TypeCache
{
    private static readonly Dictionary<Type, PropertyInfo[]> _propertyCache = new();

    public static PropertyInfo[] GetProperties(Type type)
    {
        if (!_propertyCache.TryGetValue(type, out var props))
        {
            props = type.GetProperties();
            _propertyCache[type] = props;
        }
        return props;
    }
}

// ✅ Use explicit exception handling with reflection
public object GetPropertyValue(object obj, string propertyName)
{
    try
    {
        var property = obj.GetType().GetProperty(propertyName,
            System.Reflection.BindingFlags.IgnoreCase |
            System.Reflection.BindingFlags.Public);

        if (property == null)
            throw new ArgumentException($"Property {propertyName} not found");

        return property.GetValue(obj);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error accessing {propertyName}: {ex.Message}");
        throw;
    }
}
```

---

### 82. What is a common mistake around Reflection?

**Answer:**

A common mistake is naming Reflection without understanding how it affects the runtime inspection
model used to examine metadata and types dynamically. In real work, that usually appears as weak
design choices, poor debugging, or incomplete explanations.

**Sample:**

```csharp
// Concept: 7. Reflection - Common mistakes

// ❌ MISTAKE 1: No error handling with reflection
public object BadGetProperty(object obj, string propName)
{
    return obj.GetType().GetProperty(propName).GetValue(obj);
    // Throws NullReferenceException if property doesn't exist!
}

// ✅ CORRECT: Proper error handling
public object SafeGetProperty(object obj, string propName)
{
    var prop = obj.GetType().GetProperty(propName);
    if (prop == null)
        return null;
    return prop.GetValue(obj);
}

// ❌ MISTAKE 2: Calling reflection in tight loops
for (int i = 0; i < 1000000; i++)
{
    var method = typeof(User).GetMethod("GetName"); // Called 1M times!
    method.Invoke(user, null);
}

// ✅ CORRECT: Cache the reflection results
var method = typeof(User).GetMethod("GetName");
for (int i = 0; i < 1000000; i++)
{
    method.Invoke(user, null); // Reuse cached method
}
```

---

### 83. How do you troubleshoot Reflection-related issues?

**Answer:**

When troubleshooting Reflection, first verify whether the runtime inspection model used to examine
metadata and types dynamically is behaving as expected. Then check surrounding dependencies,
configuration, logs, runtime behavior, and edge cases before changing the design.

**Sample:**

```csharp
// Concept: 7. Reflection - Troubleshooting

// Issue: Property not found - Debugging approach
public void DebugPropertyLookup(object obj, string propName)
{
    var type = obj.GetType();
    Console.WriteLine($"Type: {type.FullName}");

    // Get all properties (case-sensitive)
    var allProps = type.GetProperties();
    Console.WriteLine($"Available properties: {string.Join(", ", allProps.Select(p => p.Name))}");

    // Try case-insensitive lookup
    var prop = type.GetProperty(propName,
        System.Reflection.BindingFlags.IgnoreCase |
        System.Reflection.BindingFlags.Public);

    if (prop != null)
        Console.WriteLine($"Found (case-insensitive): {prop.Name}");
    else
        Console.WriteLine($"Property '{propName}' not found");
}

// Usage
var user = new User { Name = "John" };
DebugPropertyLookup(user, "name"); // Case-insensitive search
```

---

### 84. How does Reflection connect to the rest of advanced C#?

**Answer:**

Reflection connects to the rest of advanced C# by giving structure to the runtime inspection model
used to examine metadata and types dynamically. It is one of the pieces that turns isolated facts
into a coherent end-to-end explanation.

**Sample:**

```csharp
// Concept: 7. Reflection - Integration with other C# features

// With LINQ + Reflection: Querying type information
public IEnumerable<PropertyInfo> GetPropertyNames<T>()
{
    return typeof(T).GetProperties()
        .Where(p => p.CanRead && p.CanWrite)
        .Where(p => p.PropertyType == typeof(string))
        .OrderBy(p => p.Name);
}

// With Attributes + Reflection: Validation framework
public bool ValidateObject(object obj)
{
    var type = obj.GetType();
    var properties = type.GetProperties();

    foreach (var prop in properties)
    {
        var attrs = prop.GetCustomAttributes<RequiredAttribute>();
        if (attrs.Any())
        {
            var value = prop.GetValue(obj);
            if (string.IsNullOrEmpty(value?.ToString()))
                return false;
        }
    }
    return true;
}

// With async/await + Reflection: Dynamic async invocation
public async Task<object> InvokeAsyncMethod(object target, string methodName)
{
    var method = target.GetType().GetMethod(methodName);
    var result = method.Invoke(target, null);

    if (result is Task)
        await (Task)result;

    return result;
}
```

---

## 8. Attributes

### 85. What is the role of Attributes in advanced C#?

**Answer:**

In advanced C#, the term Attributes refers to the metadata annotations used to attach declarative behavior or
meaning to code. It is part of the foundation a candidate should be able to explain clearly.

**Sample:**

```csharp
// Concept: 8. Attributes - Metadata annotations
[Serializable]
[System.ComponentModel.DataAnnotations.MetadataType(typeof(UserMetadata))]
public class User
{
    [System.ComponentModel.DataAnnotations.Required]
    [System.ComponentModel.DataAnnotations.MaxLength(100)]
    public string Name { get; set; }

    [System.ComponentModel.DataAnnotations.EmailAddress]
    public string Email { get; set; }

    [System.ComponentModel.DataAnnotations.Range(18, 150)]
    public int Age { get; set; }
}
```

---

### 86. Why is the concept of Attributes important in advanced C#?

**Answer:**

This concept matters because it influences the metadata annotations used to attach declarative
behavior or meaning to code. Good interview answers connect it to clarity, maintainability,
performance, security, or delivery depending on the situation.

**Sample:**

```csharp
// Concept: 8. Attributes - Why it matters: Framework integration

// ASP.NET uses attributes for routing and authorization
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    [HttpGet("{id}")]
    [Authorize(Roles = "Admin,User")]
    [ProducesResponseType(typeof(User), 200)]
    [ProducesResponseType(404)]
    public ActionResult<User> GetUser(int id)
    {
        return Ok(new User { Id = id, Name = "John" });
    }
}

// Entity Framework uses attributes for column mapping
public class Product
{
    [Key]
    public int Id { get; set; }

    [Column("product_name")]
    [MaxLength(255)]
    public string Name { get; set; }
}
```

---

### 87. When should a team focus on Attributes?

**Answer:**

A team should focus on Attributes when the requirement depends on the metadata annotations used to
attach declarative behavior or meaning to code. It becomes especially important when design
decisions, scalability, or debugging depend on that area.

**Sample:**

```csharp
// Concept: 8. Attributes - When to use them

// Use 1: Data validation with declarative rules
public class RegistrationModel
{
    [Required(ErrorMessage = "Username is required")]
    [StringLength(50, MinimumLength = 3)]
    public string Username { get; set; }

    [EmailAddress]
    public string Email { get; set; }

    [RegularExpression(@"^(?=.*[A-Z])(?=.*\d).{8,}$")]
    public string Password { get; set; }
}

// Use 2: API documentation with Swagger attributes
[SwaggerOperation(Summary = "Get user by ID")]
[SwaggerResponse(200, "User found")]
[SwaggerResponse(404, "User not found")]
public ActionResult<User> GetUser(int id) { }
```

---

### 88. How is Attributes applied in practice?

**Answer:**

In practice, Attributes is applied by making the metadata annotations used to attach declarative
behavior or meaning to code explicit in the code, runtime setup, or delivery workflow. The exact
shape depends on the application, but the responsibility should stay predictable.

**Sample:**

```csharp
// Concept: 8. Attributes - Practical application: Custom validation
[AttributeUsage(AttributeTargets.Property)]
public class ValidCreditCardAttribute : ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext context)
    {
        var cardNumber = value as string;
        if (string.IsNullOrEmpty(cardNumber))
            return ValidationResult.Success;

        // Luhn algorithm check
        var digits = cardNumber.Where(char.IsDigit).ToArray();
        if (!IsValidLuhn(digits))
            return new ValidationResult("Invalid credit card number");

        return ValidationResult.Success;
    }

    private bool IsValidLuhn(char[] digits) { /* ... */ return true; }
}

public class PaymentInfo
{
    [ValidCreditCard]
    public string CardNumber { get; set; }
}
```

---

### 89. What strengths does Attributes bring?

**Answer:**

The strengths of Attributes are better structure, better communication, and better control over the
metadata annotations used to attach declarative behavior or meaning to code. It also makes tradeoffs
easier to explain to reviewers, interviewers, and teammates.

**Sample:**

```csharp
// Concept: 8. Attributes - Strengths: Declarative vs Imperative

// ❌ Without attributes (imperative - scattered logic)
public class UserValidator
{
    public List<string> ValidateUser(User user)
    {
        var errors = new List<string>();
        if (string.IsNullOrEmpty(user.Name))
            errors.Add("Name is required");
        if (user.Name?.Length > 100)
            errors.Add("Name must be <= 100 chars");
        if (!user.Email.Contains("@"))
            errors.Add("Email must be valid");
        return errors;
    }
}

// ✅ With attributes (declarative - annotation-based)
public class User
{
    [Required(ErrorMessage = "Name is required")]
    [MaxLength(100, ErrorMessage = "Name must be <= 100 chars")]
    public string Name { get; set; }

    [EmailAddress]
    public string Email { get; set; }
}

// Automatic validation by framework
```

---

### 90. What tradeoffs come with Attributes?

**Answer:**

The main tradeoff is extra complexity if Attributes is introduced without a real need or a clear
understanding of the metadata annotations used to attach declarative behavior or meaning to code.
That usually leads to overengineering, hidden bugs, or confusing architecture.

**Sample:**

```csharp
// Concept: 8. Attributes - Tradeoff: Over-attribution

// ❌ OVER-ENGINEERED: Too many attributes creates complexity
[Serializable]
[DataContract]
[JsonObject]
[Obsolete]
[DebuggerDisplay("{Name}")]
public class User
{
    [DataMember]
    [JsonProperty]
    [System.Xml.Serialization.XmlElement]
    [Required]
    [MaxLength(100)]
    [MinLength(1)]
    [RegularExpression(@"^[a-zA-Z\s]+$")]
    public string Name { get; set; }
}

// ✅ BALANCED: Use attributes strategically
[Serializable]
[DataContract]
public class User
{
    [DataMember]
    [Required]
    [MaxLength(100)]
    public string Name { get; set; }
}
```

---

### 91. How does Attributes differ from Memory and performance tuning?

**Answer:**

Attributes is centered on the metadata annotations used to attach declarative behavior or meaning to
code, while Memory and performance tuning is centered on the discipline of understanding
allocations, boxing, and runtime cost. They often work together, but they solve different parts of
the topic.

**Sample:**

```csharp
// Concept: 8. Attributes vs Memory tuning

// Attributes: Declarative metadata (no runtime cost by default)
[AttributeUsage(AttributeTargets.Property)]
public class CacheAttribute : Attribute
{
    public int DurationSeconds { get; set; }
}

public class UserService
{
    [Cache(DurationSeconds = 300)]
    public User GetUser(int id) { /* ... */ }
}

// Memory tuning: Optimizing actual memory usage
public class UserCache
{
    // Using struct instead of class to reduce heap allocations
    private struct CacheEntry
    {
        public User Value { get; set; }
        public DateTime Expiry { get; set; }
    }

    private Dictionary<int, CacheEntry> _cache = new();
}
```

---

### 92. What is a good real-world example of Attributes?

**Answer:**

A strong example is explaining how Attributes affects a real feature, production issue, migration,
or architecture decision involving the metadata annotations used to attach declarative behavior or
meaning to code. Interviewers usually care more about the reasoning than the definition alone.

**Sample:**

```csharp
// Concept: 8. Attributes - Real-world: ASP.NET Core Dependency Injection

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IOrderService _orderService;

    // [FromServices] attribute injects from DI container
    // [FromRoute] attribute gets from URL
    // [FromBody] attribute deserializes from request body
    // [FromQuery] attribute gets from query string

    [HttpPost]
    [ValidateAntiforgeryToken]
    public async Task<IActionResult> CreateOrder(
        [FromBody] CreateOrderDto dto,
        [FromQuery(Name = "userId")] int userId,
        [FromServices] INotificationService notification)
    {
        var order = await _orderService.CreateAsync(userId, dto);
        await notification.SendConfirmationAsync(order);
        return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
    }
}
```

---

### 93. What is a best practice for Attributes?

**Answer:**

A good practice is to keep Attributes aligned with the actual requirement around the metadata
annotations used to attach declarative behavior or meaning to code. Teams should document intent,
keep implementation readable, and validate important paths early.

**Sample:**

```csharp
// Concept: 8. Attributes - Best practices

// ✅ Create domain-specific custom attributes
[AttributeUsage(AttributeTargets.Class)]
public class AggregateRootAttribute : Attribute
{
    public string Name { get; set; }
}

[AggregateRoot(Name = "User")]
public class UserAggregate
{
    public int Id { get; set; }
    public string Name { get; set; }
}

// ✅ Use attributes for cross-cutting concerns
[Obsolete("Use OrderService.ProcessAsync instead", true)]
public void ProcessOrder(Order order)
{
    // This method cannot be called, compile error
}

// ✅ Combine with dependency injection for powerful patterns
[ServiceLifetime(ServiceLifetime.Scoped)]
public class OrderRepository : IOrderRepository
{
    public Task<Order> GetAsync(int id) { /* ... */ }
}
```

---

### 94. What is a common mistake around Attributes?

**Answer:**

A common mistake is naming Attributes without understanding how it affects the metadata annotations
used to attach declarative behavior or meaning to code. In real work, that usually appears as weak
design choices, poor debugging, or incomplete explanations.

**Sample:**

```csharp
// Concept: 8. Attributes - Common mistakes

// ❌ MISTAKE 1: Applying conflicting attributes
[Required] // Non-nullable
[AllowNull] // Can be null - conflicting!
public string Name { get; set; }

// ✅ CORRECT: Choose one pattern consistently
[Required]
public string Name { get; set; }

// ❌ MISTAKE 2: Assuming attributes provide runtime enforcement
[DataType(DataType.EmailAddress)] // Only for UI/serialization
public string Email { get; set; }
// This does NOT validate at runtime!

// ✅ CORRECT: Combine with validation
[EmailAddress]
[RegularExpression(@"^[^@\s]+@[^@\s]+\.[^@\s]+$")]
public string Email { get; set; }
```

---

### 95. How do you troubleshoot Attributes-related issues?

**Answer:**

When troubleshooting Attributes, first verify whether the metadata annotations used to attach
declarative behavior or meaning to code is behaving as expected. Then check surrounding
dependencies, configuration, logs, runtime behavior, and edge cases before changing the design.

**Sample:**

```csharp
// Concept: 8. Attributes - Troubleshooting

// Issue: Attribute not being recognized - Debug approach
public class AttributeDebugger
{
    public void DebugAttributes(Type type)
    {
        // Check if attributes are present
        var attrs = type.GetCustomAttributes();
        Console.WriteLine($"Type {type.Name} has {attrs.Length} attributes:");
        foreach (var attr in attrs)
        {
            Console.WriteLine($"  - {attr.GetType().Name}");
        }

        // Check property attributes
        var props = type.GetProperties();
        foreach (var prop in props)
        {
            var propAttrs = prop.GetCustomAttributes();
            if (propAttrs.Any())
            {
                Console.WriteLine($"  Property {prop.Name}: {string.Join(", ", propAttrs.Select(a => a.GetType().Name))}");
            }
        }
    }
}

// Usage
var debugger = new AttributeDebugger();
debugger.DebugAttributes(typeof(User));
```

---

### 96. How does Attributes connect to the rest of advanced C#?

**Answer:**

Attributes connects to the rest of advanced C# by giving structure to the metadata annotations used
to attach declarative behavior or meaning to code. It is one of the pieces that turns isolated facts
into a coherent end-to-end explanation.

**Sample:**

```csharp
// Concept: 8. Attributes - Integration with other C# features

// With Reflection + Attributes: Custom validation engine
public bool ValidateObject(object obj)
{
    var type = obj.GetType();
    var properties = type.GetProperties();

    foreach (var prop in properties)
    {
        // Using reflection to read attributes
        var validationAttrs = prop.GetCustomAttributes<ValidationAttribute>();
        foreach (var attr in validationAttrs)
        {
            var value = prop.GetValue(obj);
            if (!attr.IsValid(value))
                return false;
        }
    }
    return true;
}

// With async/await + Attributes: Async operation tracking
[AttributeUsage(AttributeTargets.Method)]
public class TrackOperationAttribute : Attribute { }

public class OperationTracker
{
    public async Task<T> TrackAsync<T>(Func<Task<T>> operation, string methodName)
    {
        Console.WriteLine($"Starting {methodName}");
        var result = await operation();
        Console.WriteLine($"Completed {methodName}");
        return result;
    }
}

// With LINQ + Attributes: Finding marked methods
public IEnumerable<MethodInfo> GetTrackedMethods(Type type)
{
    return type.GetMethods()
        .Where(m => m.GetCustomAttribute<TrackOperationAttribute>() != null);
}
```

---

## 9. Memory and performance tuning

### 97. What is the role of Memory and performance tuning in advanced C#?

**Answer:**

In advanced C#, the term Memory and performance tuning refers to the discipline of understanding allocations,
boxing, and runtime cost. It is part of the foundation a candidate should be able to explain
clearly.

**Sample:**

```csharp
// Concept: 9. Memory and performance tuning - Understanding allocations

// Reference types create heap allocations
public class User { public string Name { get; set; } } // Heap allocation

// Value types stored on stack (no allocation)
public struct Point { public int X; public int Y; } // Stack allocation

// Boxing: value type becomes object reference
int x = 5;
object boxed = x; // Allocates on heap! Creates copy on unboxing

// Better: Use generic collections to avoid boxing
List<int> numbers = new List<int> { 1, 2, 3 }; // No boxing
List<object> mixed = new() { 1, "two", 3.0 }; // Boxing occurs
```

---

### 98. Why is the concept of Memory and performance tuning important in advanced C#?

**Answer:**

This concept matters because it influences the discipline of understanding
allocations, boxing, and runtime cost. Good interview answers connect it to clarity,
maintainability, performance, security, or delivery depending on the situation.

**Sample:**

```csharp
// Concept: 9. Memory and performance tuning - Why it matters

// Allocations = GC pauses = latency spikes
// Wrong approach: Allocating in tight loops
public decimal CalculateSum(int[] numbers)
{
    var sum = 0m;
    foreach (var n in numbers)
    {
        sum += n; // OK - value type
        var message = $"Sum: {sum}"; // BAD - string allocation per iteration!
        Console.WriteLine(message);
    }
    return sum;
}

// Better: Minimize allocations
public decimal CalculateSum(int[] numbers)
{
    var sum = 0m;
    foreach (var n in numbers)
    {
        sum += n;
    }
    Console.WriteLine($"Final Sum: {sum}"); // One allocation
    return sum;
}
```

---

### 99. When should a team focus on Memory and performance tuning?

**Answer:**

A team should focus on Memory and performance tuning when the requirement depends on the discipline
of understanding allocations, boxing, and runtime cost. It becomes especially important when design
decisions, scalability, or debugging depend on that area.

**Sample:**

```csharp
// Concept: 9. Memory and performance tuning - When to optimize

// High-frequency scenarios: Server handling 10K requests/sec
public class RequestHandler
{
    // ❌ ALLOCATES: Creates new array per request
    public void ProcessBadly(byte[] data)
    {
        var copy = new byte[data.Length];
        Array.Copy(data, copy, data.Length); // Allocation
    }

    // ✅ EFFICIENT: Reuse buffers
    private ArrayPool<byte> _pool = ArrayPool<byte>.Shared;

    public void ProcessWell(byte[] data)
    {
        var buffer = _pool.Rent(data.Length);
        try
        {
            Array.Copy(data, buffer, data.Length);
            // Use buffer
        }
        finally
        {
            _pool.Return(buffer);
        }
    }
}
```

---

### 100. How is Memory and performance tuning applied in practice?

**Answer:**

In practice, Memory and performance tuning is applied by making the discipline of understanding
allocations, boxing, and runtime cost explicit in the code, runtime setup, or delivery workflow. The
exact shape depends on the application, but the responsibility should stay predictable.

**Sample:**

```csharp
// Concept: 9. Memory and performance tuning - Applied in practice

// Use Span<T> and stackalloc for zero-allocation scenarios
public unsafe class HighPerformanceBuffer
{
    // Stack allocation for small buffers (no GC pressure)
    public void ProcessSmallData(byte[] data)
    {
        Span<byte> buffer = stackalloc byte[256];
        if (data.Length <= buffer.Length)
        {
            data.CopyTo(buffer);
            // Process buffer
        }
    }

    // Use ref for avoiding copies
    public void ProcessRef(ref readonly LargeStruct data)
    {
        // No copy, just reference
    }

    // Pool allocations for frequent scenarios
    private static readonly ObjectPool<StringBuilder> _sbPool =
        new(() => new StringBuilder(), sb => sb.Clear());

    public string BuildString(string[] parts)
    {
        var sb = _sbPool.Get();
        try
        {
            foreach (var part in parts)
                sb.Append(part);
            return sb.ToString();
        }
        finally
        {
            _sbPool.Return(sb);
        }
    }
}
```

---

### 101. What strengths does Memory and performance tuning bring?

**Answer:**

The strengths of Memory and performance tuning are better structure, better communication, and
better control over the discipline of understanding allocations, boxing, and runtime cost. It also
makes tradeoffs easier to explain to reviewers, interviewers, and teammates.

**Sample:**

```csharp
// Concept: 9. Memory and performance tuning - Benefits: Latency, throughput

// Real-world impact: Financial trading system
// Loss from GC pause: 1 millisecond latency = millions in lost trades

public class OrderProcessor
{
    // ❌ Allocates, causes GC pauses
    public void ProcessBadly(Order[] orders)
    {
        foreach (var order in orders)
        {
            var result = new OrderResult { OrderId = order.Id }; // Allocation
            var message = $"Processed {order.Id}"; // String allocation
            LogResult(result, message);
        }
    }

    // ✅ Zero allocations, consistent latency
    public void ProcessWell(Order[] orders, OrderResult[] results)
    {
        for (int i = 0; i < orders.Length; i++)
        {
            results[i].OrderId = orders[i].Id; // Reuse
            LogResult(ref results[i]);
        }
    }

    private void LogResult(ref OrderResult result)
    {
        // Logging without string allocation
    }
}
```

---

### 102. What tradeoffs come with Memory and performance tuning?

**Answer:**

The main tradeoff is extra complexity if Memory and performance tuning is introduced without a real
need or a clear understanding of the discipline of understanding allocations, boxing, and runtime
cost. That usually leads to overengineering, hidden bugs, or confusing architecture.

**Sample:**

```csharp
// Concept: 9. Memory and performance tuning - Tradeoff: Complexity

// ❌ OVER-OPTIMIZED: Hard to understand and maintain
public unsafe void ProcessDataOverOptimized(int* data, int count)
{
    fixed (byte* temp = stackalloc byte[1024])
    {
        var ptr = temp;
        for (int i = 0; i < count; i++)
        {
            *ptr++ = (byte)data[i];
        }
        // Complex pointer arithmetic
    }
}

// ✅ BALANCED: Clear intent, reasonable performance
public void ProcessDataBalanced(int[] data)
{
    Span<byte> buffer = stackalloc byte[Math.Min(data.Length, 1024)];
    for (int i = 0; i < Math.Min(data.Length, buffer.Length); i++)
    {
        buffer[i] = (byte)data[i];
    }
}

// Only optimize when profiling shows it's the bottleneck
```

---

### 103. How does Memory and performance tuning differ from Advanced collections and APIs?

**Answer:**

Memory and performance tuning is centered on the discipline of understanding allocations, boxing,
and runtime cost, while Advanced collections and APIs is centered on the richer framework types and
patterns used beyond basic lists and arrays. They often work together, but they solve different
parts of the topic.

**Sample:**

```csharp
// Concept: 9. Memory and performance tuning vs Advanced collections

// Memory tuning: HOW to allocate efficiently
var buffer = ArrayPool<byte>.Shared.Rent(1024);
try { /* use buffer */ }
finally { ArrayPool<byte>.Shared.Return(buffer); }

// Advanced collections: WHICH collection to use
var dict = new Dictionary<string, User>(); // Hash-based lookup
var sorted = new SortedDictionary<string, User>(); // Ordered
var concurrent = new ConcurrentDictionary<string, User>(); // Thread-safe

// Together: Using right collection efficiently
public class UserCache
{
    private ConcurrentDictionary<int, User> _users = new();
    private ObjectPool<List<User>> _listPool = new(() => new());

    public List<User> GetAllUsers()
    {
        var list = _listPool.Get();
        try
        {
            foreach (var user in _users.Values)
                list.Add(user);
            return list;
        }
        finally
        {
            _listPool.Return(list);
        }
    }
}
```

---

### 104. What is a good real-world example of Memory and performance tuning?

**Answer:**

A strong example is explaining how Memory and performance tuning affects a real feature, production
issue, migration, or architecture decision involving the discipline of understanding allocations,
boxing, and runtime cost. Interviewers usually care more about the reasoning than the definition
alone.

**Sample:**

```csharp
// Concept: 9. Memory and performance tuning - Real-world: Game loop

public class GameEngine
{
    private Vector3[] _positions;
    private Velocity[] _velocities; // Value types on array = no boxing

    // ❌ BAD: Allocations in update loop called 60x/sec
    public void UpdateBad()
    {
        var movedObjects = new List<GameObject>(); // Allocation
        foreach (var obj in _objects)
        {
            obj.Position += (Vector3)obj.Velocity; // Boxing!
            movedObjects.Add(obj); // List grows
        }
        // List gets GC'd, causing frame drops
    }

    // ✅ GOOD: Zero allocations
    public void UpdateGood()
    {
        for (int i = 0; i < _positions.Length; i++)
        {
            _positions[i] += _velocities[i]; // No allocation, no boxing
        }
    }

    // Tools: Profile with dotTrace, Speedscope
    // Measure: Allocation rate (bytes/sec), GC pause times
}
```

---

### 105. What is a best practice for Memory and performance tuning?

**Answer:**

A good practice is to keep Memory and performance tuning aligned with the actual requirement around
the discipline of understanding allocations, boxing, and runtime cost. Teams should document intent,
keep implementation readable, and validate important paths early.

**Sample:**

```csharp
// Concept: 9. Memory and performance tuning - Best practices

// ✅ Measure first with profiler
public class PerformanceBase
{
    [MethodImpl(MethodImplOptions.AggressiveInlining)]
    public int Add(int a, int b) => a + b;
}

// ✅ Use benchmarking to validate improvements
using BenchmarkDotNet.Attributes;

[MemoryDiagnoser]
public class MathBenchmark
{
    [Benchmark]
    public int UsingAdd() => Add(1, 2);

    private int Add(int a, int b) => a + b;
}

// ✅ Document why optimizations exist
public class CachedComputation
{
    // Caching here is crucial for high-frequency calls (1M+ per sec)
    private static readonly Dictionary<int, int> _cache = new();

    public int Compute(int n)
    {
        if (_cache.TryGetValue(n, out var result))
            return result;

        result = ExpensiveCalculation(n);
        _cache[n] = result;
        return result;
    }

    private int ExpensiveCalculation(int n) => n * n;
}
```

---

### 106. What is a common mistake around Memory and performance tuning?

**Answer:**

A common mistake is naming Memory and performance tuning without understanding how it affects the
discipline of understanding allocations, boxing, and runtime cost. In real work, that usually
appears as weak design choices, poor debugging, or incomplete explanations.

**Sample:**

```csharp
// Concept: 9. Memory and performance tuning - Common mistakes

// ❌ MISTAKE 1: Premature optimization without profiling
public class BadOptimization
{
    // This microoptimization is pointless if this method isn't called frequently
    public unsafe int Add(int a, int b)
    {
        fixed (int* pA = &a, pB = &b)
            return *pA + *pB;
    }
}

// ✅ CORRECT: Only optimize proven bottlenecks
public class SmartOptimization
{
    // Profile first, optimize second
    public int Add(int a, int b) => a + b;
}

// ❌ MISTAKE 2: String concatenation in loop
var result = "";
for (int i = 0; i < 1000; i++)
{
    result += i.ToString() + ","; // Creates 1000 strings!
}

// ✅ CORRECT: Use StringBuilder
var sb = new StringBuilder();
for (int i = 0; i < 1000; i++)
{
    sb.Append(i).Append(",");
}
var result = sb.ToString();
```

---

### 107. How do you troubleshoot Memory and performance tuning-related issues?

**Answer:**

When troubleshooting Memory and performance tuning, first verify whether the discipline of
understanding allocations, boxing, and runtime cost is behaving as expected. Then check surrounding
dependencies, configuration, logs, runtime behavior, and edge cases before changing the design.

**Sample:**

```csharp
// Concept: 9. Memory and performance tuning - Troubleshooting

public class PerformanceProfiler
{
    // Tool: Use ETW, dotTrace, or PerfView for allocation profiling
    public long MeasureAllocations(Action work)
    {
        var before = GC.GetTotalMemory(true);
        work();
        var after = GC.GetTotalMemory(true);
        return after - before;
    }

    // Example: Identify allocation sources
    public void IdentifyAllocations()
    {
        var allocationsBefore = MeasureAllocations(() => { });

        // Bad: Creates 1000 string objects
        var allocations1 = MeasureAllocations(() =>
        {
            for (int i = 0; i < 1000; i++)
                var _ = i.ToString();
        });

        // Better: Reuse string
        var allocations2 = MeasureAllocations(() =>
        {
            var cached = "result";
            for (int i = 0; i < 1000; i++)
                var _ = cached;
        });

        Console.WriteLine($"Allocations comparison: {allocations1} vs {allocations2}");
    }
}
```

---

### 108. How does Memory and performance tuning connect to the rest of advanced C#?

**Answer:**

Memory and performance tuning connects to the rest of advanced C# by giving structure to the
discipline of understanding allocations, boxing, and runtime cost. It is one of the pieces that
turns isolated facts into a coherent end-to-end explanation.

**Sample:**

```csharp
// Concept: 9. Memory and performance tuning - Integration

// With Reflection + Memory tuning: Cached metadata lookups
public class TypeMetadataCache
{
    private static readonly Dictionary<Type, PropertyInfo[]> _cache = new();

    public PropertyInfo[] GetProperties(Type type)
    {
        if (!_cache.TryGetValue(type, out var props))
        {
            props = type.GetProperties(); // One-time allocation
            _cache[type] = props;
        }
        return props;
    }
}

// With async/await + Memory tuning: Pooled resources
public class AsyncBufferPool
{
    private readonly ArrayPool<byte> _pool = ArrayPool<byte>.Shared;

    public async Task<byte[]> ReadAsync(Stream stream)
    {
        var buffer = _pool.Rent(4096);
        try
        {
            var bytesRead = await stream.ReadAsync(buffer, 0, buffer.Length);
            var result = new byte[bytesRead];
            Array.Copy(buffer, result, bytesRead);
            return result;
        }
        finally
        {
            _pool.Return(buffer);
        }
    }
}

// With advanced collections + Memory tuning
public class EfficientLookup
{
    // Choose right collection for performance profile
    private readonly Dictionary<int, User> _byId = new(); // O(1) lookup
    private readonly SortedDictionary<string, User> _byName = new(); // O(log n) lookup
}
```

---

## 10. Advanced collections and APIs

### 109. What is the role of Advanced collections and APIs in advanced C#?

**Answer:**

In advanced C#, the term Advanced collections and APIs refers to the richer framework types and patterns used
beyond basic lists and arrays. It is part of the foundation a candidate should be able to explain
clearly.

**Sample:**

```csharp
// Concept: 10. Advanced collections and APIs - Beyond Lists

// Basic: List<T> for simple ordered storage
var users = new List<User> { new User { Id = 1, Name = "John" } };

// Advanced: Collections solve specific problems
var byId = new Dictionary<int, User>(); // Fast key lookups
var unique = new HashSet<string>(); // Deduplication
var queue = new Queue<Task>(); // FIFO processing
var priority = new PriorityQueue<Job, int>(); // Custom ordering
var concurrent = new ConcurrentBag<Item>(); // Thread-safe
var ordered = new SortedSet<int>(); // Sorted unique values

// APIs: Specialized methods for different scenarios
var span = new Span<byte>(stackalloc byte[256]); // Stack-based
var memory = new Memory<byte>(new byte[1000]); // Heap with copying semantics
var enumerable = users.AsEnumerable().Where(u => u.Id > 0); // LINQ
```

---

### 110. Why is the concept of Advanced collections and APIs important in advanced C#?

**Answer:**

This concept matters because it influences the richer framework types and patterns
used beyond basic lists and arrays. Good interview answers connect it to clarity, maintainability,
performance, security, or delivery depending on the situation.

**Sample:**

```csharp
// Concept: 10. Advanced collections and APIs - Why it matters

// Choosing wrong collection = performance disaster
public class UserLookup
{
    // ❌ BAD: O(n) lookup - have to scan entire list
    public User GetUserBadly(int id)
    {
        var users = new List<User> { /* 1M users */ };
        return users.FirstOrDefault(u => u.Id == id); // 500K scans on average
    }

    // ✅ GOOD: O(1) lookup - direct access
    public User GetUserWell(int id)
    {
        var byId = new Dictionary<int, User> { /* 1M users */ };
        return byId.TryGetValue(id, out var user) ? user : null;
    }
}

// Right collection impacts scalability by 1000x or more
```

---

### 111. When should a team focus on Advanced collections and APIs?

**Answer:**

A team should focus on Advanced collections and APIs when the requirement depends on the richer
framework types and patterns used beyond basic lists and arrays. It becomes especially important
when design decisions, scalability, or debugging depend on that area.

**Sample:**

```csharp
// Concept: 10. Advanced collections and APIs - When to use

// Scenario 1: Many lookups -> Dictionary or SortedDictionary
var cache = new ConcurrentDictionary<string, CachedValue>();
if (cache.TryGetValue(key, out var value))
    return value;

// Scenario 2: Priority-based processing -> PriorityQueue
var tasks = new PriorityQueue<WorkItem, int>();
tasks.Enqueue(critical, 1); // Priority 1 = highest
tasks.Enqueue(normal, 5);
tasks.Enqueue(low, 10);

// Scenario 3: Unique items only -> HashSet
var seen = new HashSet<string>();
foreach (var item in items)
{
    if (seen.Add(item)) // Only process if new
        Process(item);
}

// Scenario 4: Stack-based zero-allocation -> Span<T>
public void ProcessSmall(byte[] data)
{
    Span<byte> buffer = stackalloc byte[1024];
    if (data.Length <= buffer.Length)
        Process(buffer[..data.Length]);
}
```

---

### 112. How is Advanced collections and APIs applied in practice?

**Answer:**

In practice, Advanced collections and APIs is applied by making the richer framework types and
patterns used beyond basic lists and arrays explicit in the code, runtime setup, or delivery
workflow. The exact shape depends on the application, but the responsibility should stay
predictable.

**Sample:**

```csharp
// Concept: 10. Advanced collections and APIs - Applied in practice

public class MessageQueue
{
    // Advanced API: Span<T> for zero-copy processing
    public void ProcessMessages(ReadOnlySpan<byte> data)
    {
        var messages = MemoryMarshal.Cast<byte, Message>(data);
        foreach (ref var msg in messages)
            Handle(ref msg);
    }
}

public class EventAggregator
{
    // Advanced collection: ConcurrentDictionary for thread-safe lookups
    private readonly ConcurrentDictionary<Type, List<Delegate>> _subscribers = new();

    public void Subscribe<TEvent>(Action<TEvent> handler) where TEvent : class
    {
        _subscribers.AddOrUpdate(typeof(TEvent),
            _ => new List<Delegate> { handler },
            (_, list) => { list.Add(handler); return list; });
    }
}

public class RateLimiter
{
    // Advanced API: SortedDictionary for timestamp-ordered access
    private readonly SortedDictionary<long, int> _requestTimestamps = new();

    public bool IsAllowed(int maxRequests, long windowMs)
    {
        var now = DateTime.UtcNow.Ticks / 10000; // milliseconds
        var cutoff = now - windowMs;

        // Remove old entries
        var old = _requestTimestamps.Where(x => x.Key < cutoff).ToList();
        foreach (var item in old)
            _requestTimestamps.Remove(item.Key);

        return _requestTimestamps.Count < maxRequests;
    }
}
```

---

### 113. What strengths does Advanced collections and APIs bring?

**Answer:**

The strengths of Advanced collections and APIs are better structure, better communication, and
better control over the richer framework types and patterns used beyond basic lists and arrays. It
also makes tradeoffs easier to explain to reviewers, interviewers, and teammates.

**Sample:**

```csharp
// Concept: 10. Advanced collections and APIs - Strengths: Correctness + Performance

// Strength 1: Correctness - Thread-safe out of box
public class ThreadSafeCounter
{
    // ❌ Manual locking: Easy to forget lock, deadlock risk
    private int _count;
    private readonly object _lock = new();

    public void IncrementBad()
    {
        lock (_lock) _count++;
    }

    // ✅ Advanced API: Built-in thread safety
    private readonly ConcurrentBag<int> _counts = new();

    public void IncrementWell()
    {
        _counts.Add(1); // No locks needed
    }
}

// Strength 2: Performance - Optimized for the scenario
public class DataProcessor
{
    // List is great for iteration, terrible for lookups
    // Dictionary is great for lookups, slower for iteration
    // SortedDictionary adds ordering overhead
    // HashSet is perfect for deduplication

    public void ProcessUserData(User[] users)
    {
        var uniqueEmails = new HashSet<string>(users.Length);
        foreach (var user in users)
        {
            if (uniqueEmails.Add(user.Email))
                SendWelcome(user);
        }
    }
}
```

---

### 114. What tradeoffs come with Advanced collections and APIs?

**Answer:**

The main tradeoff is extra complexity if Advanced collections and APIs is introduced without a real
need or a clear understanding of the richer framework types and patterns used beyond basic lists and
arrays. That usually leads to overengineering, hidden bugs, or confusing architecture.

**Sample:**

```csharp
// Concept: 10. Advanced collections and APIs - Tradeoff: Complexity

// ❌ OVER-ENGINEERED: Using complex collection for simple need
public class SimpleCache
{
    // Span<T> is powerful but overkill if called rarely
    public void StoreSimple(ReadOnlySpan<byte> data)
    {
        var fixed_array = data.ToArray(); // Defeats the purpose
    }

    // SortedDictionary is slower than Dictionary
    private readonly SortedDictionary<int, string> _items = new();
}

// ✅ BALANCED: Choose collection that matches usage pattern
public class PragmaticCache
{
    // Simple Dictionary for most cases
    private readonly Dictionary<int, string> _items = new();

    // Span<T> only for high-frequency, performance-critical paths
    [MethodImpl(MethodImplOptions.AggressiveInlining)]
    public void ProcessBulk(ReadOnlySpan<byte> data)
    {
        // Direct processing without copying
    }
}
```

---

### 115. How does Advanced collections and APIs differ from Delegates and events?

**Answer:**

Advanced collections and APIs is centered on the richer framework types and patterns used beyond
basic lists and arrays, while Delegates and events is centered on the callable abstraction and
notification model used for decoupled behavior. They often work together, but they solve different
parts of the topic.

**Sample:**

```csharp
// Concept: 10. Advanced collections vs Delegates/events

// Advanced collections: Data organization and access patterns
public class DataHub
{
    private readonly Dictionary<string, User> _byEmail = new();
    private readonly Dictionary<int, User> _byId = new();
    private readonly SortedDictionary<DateTime, Audit> _byDate = new();
}

// Delegates and events: Behavior notification and decoupling
public delegate void UserCreatedHandler(User user);

public class UserService
{
    public event UserCreatedHandler OnUserCreated;

    public User CreateUser(string email)
    {
        var user = new User { Email = email };
        OnUserCreated?.Invoke(user);
        return user;
    }
}

// Together: Advanced event patterns using collections
public class EventAggregator
{
    // Collection of event handlers
    private readonly Dictionary<Type, List<Delegate>> _handlers = new();

    public void Publish<TEvent>(TEvent evt) where TEvent : class
    {
        if (_handlers.TryGetValue(typeof(TEvent), out var delegates))
        {
            foreach (var handler in delegates)
                ((Action<TEvent>)handler)(evt);
        }
    }
}
```

---

### 116. What is a good real-world example of Advanced collections and APIs?

**Answer:**

A strong example is explaining how Advanced collections and APIs affects a real feature, production
issue, migration, or architecture decision involving the richer framework types and patterns used
beyond basic lists and arrays. Interviewers usually care more about the reasoning than the
definition alone.

**Sample:**

```csharp
// Concept: 10. Advanced collections and APIs - Real-world: LRU Cache

public class LRUCache<TKey, TValue>
{
    private readonly int _capacity;
    // Dictionary: O(1) access
    private readonly Dictionary<TKey, LinkedListNode<(TKey, TValue)>> _dict;
    // LinkedList: O(1) remove/insert for LRU tracking
    private readonly LinkedList<(TKey, TValue)> _order;

    public LRUCache(int capacity)
    {
        _capacity = capacity;
        _dict = new Dictionary<TKey, LinkedListNode<(TKey, TValue)>>(capacity);
        _order = new LinkedList<(TKey, TValue)>();
    }

    public bool TryGetValue(TKey key, out TValue value)
    {
        if (_dict.TryGetValue(key, out var node))
        {
            // Move to end (most recently used)
            _order.Remove(node);
            var newNode = _order.AddLast(node.Value);
            _dict[key] = newNode;
            value = node.Value.Item2;
            return true;
        }
        value = default;
        return false;
    }

    public void Set(TKey key, TValue value)
    {
        if (_dict.TryGetValue(key, out var node))
        {
            _order.Remove(node);
        }
        else if (_dict.Count >= _capacity)
        {
            // Remove least recently used
            var oldest = _order.First;
            _order.RemoveFirst();
            _dict.Remove(oldest.Value.Item1);
        }

        var newNode = _order.AddLast((key, value));
        _dict[key] = newNode;
    }
}
```

---

### 117. What is a best practice for Advanced collections and APIs?

**Answer:**

A good practice is to keep Advanced collections and APIs aligned with the actual requirement around
the richer framework types and patterns used beyond basic lists and arrays. Teams should document
intent, keep implementation readable, and validate important paths early.

**Sample:**

```csharp
// Concept: 10. Advanced collections and APIs - Best practices

public class CollectionBestPractices
{
    // ✅ Choose collection based on access pattern
    public class UserRepository
    {
        // Dictionary: Primary key lookup
        private readonly Dictionary<int, User> _byId = new();

        // SortedDictionary: Range queries
        private readonly SortedDictionary<DateTime, List<User>> _byCreated = new();

        // HashSet: Uniqueness checks
        private readonly HashSet<string> _usedEmails = new();

        public User GetById(int id)
        {
            _byId.TryGetValue(id, out var user);
            return user;
        }
    }

    // ✅ Use concurrent collections in multithreaded scenarios
    public class ThreadSafeQueue
    {
        private readonly ConcurrentQueue<WorkItem> _queue = new();

        public void Enqueue(WorkItem item) => _queue.Enqueue(item);
        public bool TryDequeue(out WorkItem item) => _queue.TryDequeue(out item);
    }

    // ✅ Use Span<T>/Memory<T> for performance-critical paths
    public void ProcessData(ReadOnlySpan<byte> data)
    {
        // No allocation, direct memory access
        for (int i = 0; i < data.Length; i++)
        {
            var value = data[i];
        }
    }
}
```

---

### 118. What is a common mistake around Advanced collections and APIs?

**Answer:**

A common mistake is naming Advanced collections and APIs without understanding how it affects the
richer framework types and patterns used beyond basic lists and arrays. In real work, that usually
appears as weak design choices, poor debugging, or incomplete explanations.

**Sample:**

```csharp
// Concept: 10. Advanced collections and APIs - Common mistakes

// ❌ MISTAKE 1: Wrong collection choice causes performance disaster
public class BadChoice
{
    // List for lookups: O(n) - searches 500K items average
    public User FindUser(int id)
    {
        var users = new List<User> { /* 1M users */ };
        return users.FirstOrDefault(u => u.Id == id);
    }
}

// ✅ CORRECT: Right collection for the job
public class GoodChoice
{
    // Dictionary for lookups: O(1) - constant time
    private readonly Dictionary<int, User> _byId = new();

    public User FindUser(int id)
    {
        _byId.TryGetValue(id, out var user);
        return user;
    }
}

// ❌ MISTAKE 2: Assuming thread-safety without correct collection
public class UnsafeCounter
{
    private List<int> _counts = new(); // NOT thread-safe

    public void Add(int value)
    {
        _counts.Add(value); // Race condition!
    }
}

// ✅ CORRECT: Use concurrent collection for threads
public class SafeCounter
{
    private readonly ConcurrentBag<int> _counts = new();

    public void Add(int value) => _counts.Add(value);
}
```

---

### 119. How do you troubleshoot Advanced collections and APIs-related issues?

**Answer:**

When troubleshooting Advanced collections and APIs, first verify whether the richer framework types
and patterns used beyond basic lists and arrays is behaving as expected. Then check surrounding
dependencies, configuration, logs, runtime behavior, and edge cases before changing the design.

**Sample:**

```csharp
// Concept: 10. Advanced collections and APIs - Troubleshooting

public class CollectionBugFinder
{
    // Issue 1: Dictionary Key Mismatch
    public void DebugKeyLookup<TKey, TValue>(
        Dictionary<TKey, TValue> dict, TKey key)
    {
        var found = dict.TryGetValue(key, out var value);
        if (!found)
        {
            // Debug: Check if key exists with different equality
            Console.WriteLine($"Looking for: {key}");
            Console.WriteLine($"Available keys: {string.Join(", ", dict.Keys)}");
            Console.WriteLine($"Comparer: {dict.Comparer}");
        }
    }

    // Issue 2: Concurrent Collection Exceptions
    public void DebugConcurrentIssues<T>(ConcurrentBag<T> bag)
    {
        try
        {
            // Add + Remove during enumeration can cause issues
            var count = bag.Count; // Snapshot count
            var items =  bag.ToList(); // Safe enumeration
        }
        catch (InvalidOperationException ex)
        {
            // Collection was modified during enumeration
            Console.WriteLine($"Concurrent modification: {ex.Message}");
        }
    }

    // Issue 3: Memory API Lifetime Issues
    public void DebugMemoryLeak()
    {
        byte[] array = new byte[1000];
        var memory = new Memory<byte>(array);
        // Do NOT assume 'memory' keeps 'array' alive after GC
        // Memory<T> is a value type - only valid while holding reference
    }
}
```

---

### 120. How does Advanced collections and APIs connect to the rest of advanced C#?

**Answer:**

Advanced collections and APIs connects to the rest of advanced C# by giving structure to the richer
framework types and patterns used beyond basic lists and arrays. It is one of the pieces that turns
isolated facts into a coherent end-to-end explanation.

**Sample:**

```csharp
// Concept: 10. Advanced collections and APIs - Integration

// With async/await + Collections: Async queue processing
public class AsyncProcessor
{
    private readonly BlockingCollection<WorkItem> _queue = new();

    public async Task ProcessAsync(CancellationToken ct)
    {
        while (!ct.IsCancellationRequested)
        {
            if (_queue.TryTake(out var item, 1000, ct))
                await ProcessItemAsync(item, ct).ConfigureAwait(false);
        }
    }

    private async Task ProcessItemAsync(WorkItem item, CancellationToken ct)
    {
        await Task.Delay(item.ProcessingTime, ct).ConfigureAwait(false);
    }
}

// With Reflection + Collections: Dynamic type registration
public class TypeRegistry<T> where T : class
{
    private readonly SortedDictionary<string, Type> _types = new();

    public void Register(string name, Type type)
    {
        if (typeof(T).IsAssignableFrom(type))
            _types[name] = type;
    }

    public T CreateInstance(string name, params object[] args)
    {
        if (_types.TryGetValue(name, out var type))
            return (T)Activator.CreateInstance(type, args);
        return null;
    }
}

// With Memory tuning + Collections: Zero-allocation enumeration
public void ProcessWithoutAllocation(Span<int> data)
{
    // Dictionary enumeration allocates enumerator
    // But Span enumeration is zero-allocation
    foreach (var item in data)
        Console.WriteLine(item);
}
```
