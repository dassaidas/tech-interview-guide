### 1. Define Azure Tables ?

**Azure Tables** is a NoSQL key-value store that allows applications to store and query large amounts of structured, non-relational data. It is part of **Azure Table Storage** and is optimized for fast access and high availability.

🔍 Key Features

- Schema-less data storage: flexible and scalable
- Stores data as key-value pairs in a structured format (entities and properties)
- Supports **OData protocol** for querying
- PartitionKey and RowKey used for indexing and efficient access
- Integrated with **Azure Storage Account**

🧱 Core Concepts

| Component    | Description                                                     |
| ------------ | --------------------------------------------------------------- |
| Table        | A collection of entities                                        |
| Entity       | A set of properties, like a row in traditional database         |
| Property     | A name-value pair, like a column in traditional databases       |
| PartitionKey | Determines the partition (used for scalability and performance) |
| RowKey       | Uniquely identifies an entity within a partition                |

📦 Use Cases

- Audit logs and telemetry data
- IoT device data storage
- User metadata storage
- Lightweight, scalable app backends

🛠️ Sample Code (C# using Azure.Data.Tables SDK)

```csharp
var client = new TableClient("UseYourConnectionString", "MyTable");
var entity = new TableEntity("Partition1", "Row1")
{
    { "Name", "John Doe" },
    { "Email", "john@example.com" }
};
client.AddEntity(entity);

```

🔗 Related Services

- Azure Cosmos DB Table API (for global distribution and richer querying)

- Azure Blob Storage (for unstructured data)

- Azure Queue Storage (for messaging)

### 2. Explain the importance of Partition and Row key ?

🔑 Importance of PartitionKey and RowKey in Azure Tables

Azure Table Storage uses **PartitionKey** and **RowKey** as a **composite primary key** to uniquely identify each entity and enable fast data access and scalability.

📌 PartitionKey

✅ What is it?

- A string value that **groups entities** within the same partition.
- Entities with the same PartitionKey are **stored together**, improving query performance.

🚀 Why is it important?

- Enables **horizontal partitioning** (sharding) for scalability.
- Efficient range queries and batch transactions are only possible **within the same partition**.
- Controls **data locality** and **read/write throughput**.

📌 RowKey

✅ What is it?

- A unique identifier for an entity **within a given partition**.
- Acts like the **primary key** in a relational database.

🚀 Why is it important?

- Together with PartitionKey, it ensures **uniqueness** of each entity.
- Used to **directly retrieve a specific entity** without scanning the entire table.

---

🧠 Together: Composite Primary Key

| Key          | Purpose                        | Example Value |
| ------------ | ------------------------------ | ------------- |
| PartitionKey | Defines the partition/shard    | "CustomerUSA" |
| RowKey       | Unique per entity in partition | "Cust12345"   |

> Composite Key = `"CustomerUSA"` + `"Cust12345"`

---

📈 Performance Benefits

- Fast **point lookups** using both keys.
- Optimal **query routing** to the correct partition.
- Supports **batch operations** on entities with the same PartitionKey.

---

❗ Best Practices

- Design PartitionKey to **balance load** across partitions.
- Avoid **hot partitions** (many writes to the same PartitionKey).
- Keep PartitionKey and RowKey **immutable** if possible.

---

📦 Sample Retrieval Code (C#)

```csharp
var entity = client.GetEntity<TableEntity>("CustomerUSA", "Cust12345");
```

### 3. Azure tables are same like RDBMS database , true or false ?

❓ Are Azure Tables same as RDBMS?

**Answer:** ❌ **False**

Azure Tables and Relational Database Management Systems (RDBMS) serve different purposes and follow different data models.

🔄 Key Differences

| Feature            | **Azure Table Storage**                         | **RDBMS (e.g., SQL Server, MySQL)**     |
| ------------------ | ----------------------------------------------- | --------------------------------------- |
| **Data Model**     | NoSQL, key-value pair (schema-less)             | Relational, schema-based (tables, rows) |
| **Schema**         | Flexible, no enforced schema                    | Fixed schema (defined columns, types)   |
| **Query Language** | OData, REST, LINQ                               | SQL (Structured Query Language)         |
| **Transactions**   | Limited (only within a partition)               | Full ACID support                       |
| **Relationships**  | Not supported (no JOINs)                        | Supported (foreign keys, joins)         |
| **Scalability**    | Horizontally scalable                           | Typically vertically scalable           |
| **Use Case**       | Lightweight, fast-access data (e.g., IoT, logs) | Complex relational operations           |
| **Indexing**       | PartitionKey + RowKey                           | Custom indexes, primary & foreign keys  |

📌 Conclusion

> Azure Tables are **not the same** as RDBMS.  
> They are best suited for **large-scale, unstructured, and semi-structured data** where schema flexibility and horizontal scalability are important.

### 4. Explain the architecture of Azure tables ?

🏗️ Azure Table Storage Architecture

Azure Table Storage is a **NoSQL key-value datastore** that provides highly available, scalable, and schema-less storage for structured data. It’s part of the **Azure Storage Account** services.

🔧 Core Components

**1.Storage Account**

- The entry point for all storage services (Blob, Table, Queue, File).
- All tables live inside a **single storage account**.

**2. Table**

- A collection of entities (similar to rows).
- Tables do **not enforce schema**; each entity can have different properties.

**3. Entity**

- A single data item (like a row in a relational DB).
- Consists of a **PartitionKey**, **RowKey**, **Timestamp**, and other custom properties.

**4. PartitionKey**

- Determines how entities are grouped and stored.
- Used for **scalability and load balancing** across servers.

**5. RowKey**

- Uniquely identifies an entity within a partition.
- Together with PartitionKey forms a **composite primary key**.

🧠 Logical Architecture Diagram

```plaintext
+----------------------+
|  Azure Storage       |
|  (Storage Account)   |
+----------+-----------+
           |
        Tables
           |
    +------+-------+
    |              |
+-------+      +-------+
| Table1|      | Table2|
+---+---+      +---+---+
    |              |
+---v---+      +---v---+
|Entity1|      |Entity1|
| P: A  |      | P: B  |
| R: 1  |      | R: 1  |
+-------+      +-------+
```

**How It Works**

- Client Application uses Azure SDK or REST API to interact with tables.

- PartitionKey routes the request to the correct partition server.

- RowKey locates the exact entity within that partition.

- Azure Storage Backend ensures durability, replication, and availability.

🚀 **Key Features of the Architecture**

- Massive Scalability: Partitions distributed across many servers.

- High Availability: Automatic replication and geo-redundancy.

- Efficient Querying: Optimized for point lookups via PartitionKey + RowKey.

- Cost-Effective: Pay only for what you use (no complex schema or indexing).

📦 **Sample Use Case**

Azure Table Storage allows you to organize data using `PartitionKey` and `RowKey`. Here's a simple example:

| PartitionKey | RowKey | Property | Value       |
| ------------ | ------ | -------- | ----------- |
| "USA-Cust"   | "001"  | Name     | John Doe    |
| "USA-Cust"   | "002"  | Name     | Jane Smith  |
| "EU-Cust"    | "003"  | Name     | Erik Muller |

> Each row is uniquely identified and grouped logically by `PartitionKey`.

---

🛡️ **Security & Access**

- Supports **Shared Access Signature (SAS)** for granular delegated access.
- Integrates with **Azure Role-Based Access Control (RBAC)** for secure resource-level authorization.
- Uses **HTTPS** for all data transmission, ensuring encryption in transit.

🔗 **Integration**

Azure Table Storage can be seamlessly integrated with:

- ⚙️ **Azure Functions** – for serverless processing and triggers
- 🔄 **Azure Logic Apps** – for low-code automation workflows
- 🌐 **Custom APIs and Web Apps** – for building scalable backend services

---

✅ **Summary**

Azure Table Storage uses a **partitioned, distributed architecture** to store massive volumes of semi-structured data efficiently. It is:

- 🚀 **Fast** – optimized for high-throughput operations
- 📈 **Scalable** – automatically handles large datasets
- 💰 **Cost-effective** – pay only for what you use
- 🧩 **Flexible** – ideal for scenarios like logging, telemetry, user data, and IoT workloads

### 5. How to connect to Azure tables using C# language ?

This guide demonstrates how to connect to **Azure Table Storage** using **C#** with the `Azure.Data.Tables` SDK.

📦 **Prerequisites**

- ✔️ .NET SDK installed (preferably .NET 6 or later)
- ✔️ An active **Azure Storage Account**
- ✔️ A table created in Azure (e.g., `Customers`)
- ✔️ NuGet package: `Azure.Data.Tables`

📥 **Install NuGet Package**

Use the following command to install the required SDK:

```bash
dotnet add package Azure.Data.Tables
```

**Sample Code: Connect and Insert Data**

```
using System;
using Azure;
using Azure.Data.Tables;

// Define the entity model
public class CustomerEntity : ITableEntity
{
    public string PartitionKey { get; set; }
    public string RowKey { get; set; }
    public DateTimeOffset? Timestamp { get; set; }
    public ETag ETag { get; set; }

    // Custom properties
    public string Name { get; set; }
    public string Email { get; set; }
}

class Program
{
    static void Main()
    {
        // 🔐 Replace with your actual connection string from Azure Portal
        string connectionString = "<Your_Storage_Account_Connection_String>";
        string tableName = "Customers";

        // Create the TableClient
        var serviceClient = new TableServiceClient(connectionString);
        var tableClient = serviceClient.GetTableClient(tableName);

        // Create the table if it doesn't exist
        tableClient.CreateIfNotExists();

        // Create a new entity
        var customer = new CustomerEntity
        {
            PartitionKey = "USA",
            RowKey = Guid.NewGuid().ToString(),
            Name = "John Doe",
            Email = "john@example.com"
        };

        // Insert the entity into the table
        tableClient.AddEntity(customer);

        Console.WriteLine("Customer inserted successfully.");
    }
}
```

**🔐 How to Get the Connection String**

- Go to the Azure Portal

- Navigate to your Storage Account

- Select Access Keys under Security + networking

- Copy the Connection string

**Other Useful Operations**

- Update or Upsert an Entity

```
tableClient.UpsertEntity(customer);
```

**🔍 Query Entities**

```
var customers = tableClient.Query<CustomerEntity>(c => c.PartitionKey == "USA");
foreach (var c in customers)
{
    Console.WriteLine($"{c.Name} - {c.Email}");
}

```

**❌ Delete an Entity**

```
tableClient.DeleteEntity("USA", "rowKeyValue");

```

**✅ Summary**

- Azure Table Storage is easy to access in C# using the Azure.Data.Tables SDK.

- You can perform full CRUD operations using simple, strongly-typed models.

- Use PartitionKey and RowKey for fast and scalable access patterns.

### 6. C# Entity classes should inherit from \_ to receive Azure records ?

**C# entity classes should inherit from \_ to receive Azure Table records?**

✅ Answer

C# entity classes should **implement the `ITableEntity` interface** to work with Azure Table Storage.

```csharp
public class MyEntity : ITableEntity
{
    public string PartitionKey { get; set; }
    public string RowKey { get; set; }
    public DateTimeOffset? Timestamp { get; set; }
    public ETag ETag { get; set; }

    // Custom properties
    public string Name { get; set; }
    public int Age { get; set; }
}
```

**Why ITableEntity?**

- Implementing ITableEntity enables the entity to:

- Map directly to a record in Azure Table Storage

- Support serialization/deserialization

- Include system properties:

        - PartitionKey

        -RowKey

        -Timestamp

        -ETag

**Alternative: Use TableEntity (Dynamic)**

If you don’t want a strongly-typed class, you can use the built-in TableEntity:

```
var entity = new TableEntity("Partition1", "Row1")
{
    { "Name", "John" },
    { "Age", 30 }
};
```

**Summary**

To receive and manipulate records from Azure Table Storage in a strongly-typed manner:

    - Implement the ITableEntity interface

    - Define custom properties for your entity

    - Ensure PartitionKey and RowKey are always set

### 7. What are TableQuery classes in C# ?

🔍 TableQuery Classes in C#

📘 Overview

In older Azure SDKs (like `Microsoft.Azure.Cosmos.Table` or `WindowsAzure.Storage`), the `TableQuery<T>` class was used to **query entities** from Azure Table Storage using **LINQ-like expressions** or filter strings.

> ⚠️ In the **latest SDK** (`Azure.Data.Tables`), `TableQuery<T>` is no longer used. Instead, queries are made directly via `TableClient.Query<T>()`.

🧾 TableQuery<T> (Legacy SDK)

✅ Namespace

```csharp
using Microsoft.Azure.Cosmos.Table;
```

🧱 **Example Entity**

```
public class CustomerEntity : TableEntity
{
    public string Name { get; set; }
    public string Email { get; set; }
}
```

**Example Query Using TableQuery**

```
CloudTable table = tableClient.GetTableReference("Customers");

TableQuery<CustomerEntity> query = new TableQuery<CustomerEntity>()
    .Where(TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, "USA"));

foreach (CustomerEntity customer in table.ExecuteQuery(query))
{
    Console.WriteLine($"{customer.Name} - {customer.Email}");
}
```

**Deprecated in New SDK (Azure.Data.Tables)**

In the modern SDK, the approach is simpler and more LINQ-friendly:

✅ Modern Query Example

```
var tableClient = new TableClient(connectionString, "Customers");

var customers = tableClient.Query<CustomerEntity>(entity => entity.PartitionKey == "USA");

foreach (var customer in customers)
{
    Console.WriteLine($"{customer.Name} - {customer.Email}");
}
```

✅ Summary: TableQuery<T> vs TableClient.Query<T>()

| Feature                       | TableQuery<T>                           | TableClient.Query<T>()       |
| ----------------------------- | --------------------------------------- | ---------------------------- |
| **SDK**                       | Legacy (`Microsoft.Azure.Cosmos.Table`) | Modern (`Azure.Data.Tables`) |
| **Query Style**               | Filter string or LINQ                   | LINQ-style expression        |
| **Recommended for New Apps?** | ❌ No                                   | ✅ Yes                       |

### 8. How to perform insert,update and delete using C# on Azure tables?

🔄 Performing Insert, Update, and Delete Operations on Azure Tables Using C#

This guide explains how to perform **CRUD** operations on Azure Table Storage using the **Azure.Data.Tables** SDK in C#.

📦 Prerequisites

- .NET SDK installed (e.g., .NET 6+)
- Azure Storage Account with Table service enabled
- NuGet package: `Azure.Data.Tables`

Install SDK

```bash
dotnet add package Azure.Data.Tables
```

**Entity Definition Example**

```
using Azure;
using Azure.Data.Tables;
using System;

public class CustomerEntity : ITableEntity
{
    public string PartitionKey { get; set; }
    public string RowKey { get; set; }
    public DateTimeOffset? Timestamp { get; set; }
    public ETag ETag { get; set; }

    public string Name { get; set; }
    public string Email { get; set; }
}

```

➕ **Insert Entity**

```
var tableClient = new TableClient(connectionString, "Customers");
tableClient.CreateIfNotExists();

var newCustomer = new CustomerEntity
{
    PartitionKey = "USA",
    RowKey = Guid.NewGuid().ToString(),
    Name = "John Doe",
    Email = "john@example.com"
};

// Insert the entity
tableClient.AddEntity(newCustomer);
Console.WriteLine("Entity inserted successfully.");
```

**Update or Upsert Entity**

- Update: Use UpdateEntity to modify an existing entity.

- Upsert: Use UpsertEntity to insert if not exists, or update if exists.

```
// Fetch existing entity or create new one
var customer = new CustomerEntity
{
    PartitionKey = "USA",
    RowKey = "existing-row-key",
    Name = "John Smith",
    Email = "john.smith@example.com"
};

// Update existing entity - must provide ETag for concurrency control
tableClient.UpdateEntity(customer, customer.ETag, TableUpdateMode.Replace);

// Or Upsert (insert or update)
tableClient.UpsertEntity(customer);
Console.WriteLine("Entity updated/upserted successfully.");
```

**❌ Delete Entity**

```
string partitionKey = "USA";
string rowKey = "existing-row-key";

// Delete the entity
tableClient.DeleteEntity(partitionKey, rowKey);
Console.WriteLine("Entity deleted successfully.");

```

**Notes**

- AddEntity throws if the entity already exists.

- UpdateEntity requires the current ETag for optimistic concurrency.

- UpsertEntity simplifies insert or update logic.

- DeleteEntity requires both PartitionKey and RowKey.

✅ Summary: Azure Table Storage CRUD Operations in C#

| Operation | Method           | Notes                            |
| --------- | ---------------- | -------------------------------- |
| Insert    | `AddEntity()`    | Adds new entity, fails if exists |
| Update    | `UpdateEntity()` | Requires ETag, updates existing  |
| Upsert    | `UpsertEntity()` | Insert or update without error   |
| Delete    | `DeleteEntity()` | Deletes by PartitionKey + RowKey |

> Use the `Azure.Data.Tables` SDK for efficient and simple Azure Table Storage CRUD operations in C#.

### 9. How to do batch inserts using Azure API ?

🚀 How to Perform Batch Inserts Using Azure Table Storage API in C#

Azure Table Storage supports batch operations to perform multiple insert, update, or delete operations in a single atomic transaction **within the same partition**.

📌 Important Notes

- All entities in a batch must share the **same PartitionKey**.
- Maximum of **100 entities** per batch.
- Batch operations are atomic: either all succeed or all fail.

📦 Prerequisites

- Azure.Data.Tables SDK installed

```bash
dotnet add package Azure.Data.Tables
```

**Sample Code: Batch Insert**

```
using Azure;
using Azure.Data.Tables;
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        string connectionString = "<Your_Storage_Account_Connection_String>";
        string tableName = "Customers";

        var tableClient = new TableClient(connectionString, tableName);
        tableClient.CreateIfNotExists();

        // Create a list of entities with the same PartitionKey
        var entities = new List<TableEntity>
        {
            new TableEntity("USA", Guid.NewGuid().ToString())
            {
                { "Name", "John Doe" },
                { "Email", "john.doe@example.com" }
            },
            new TableEntity("USA", Guid.NewGuid().ToString())
            {
                { "Name", "Jane Smith" },
                { "Email", "jane.smith@example.com" }
            }
            // Add more entities as needed (max 100)
        };

        // Create a batch
        var batch = new List<TableTransactionAction>();

        foreach (var entity in entities)
        {
            batch.Add(new TableTransactionAction(TableTransactionActionType.Add, entity));
        }

        // Submit the batch
        tableClient.SubmitTransaction(batch);

        Console.WriteLine("Batch insert completed successfully.");
    }
}
```

**🔍 Explanation**

- TableTransactionAction defines the action type (Add, Update, Delete, etc.) and the entity.

- Use SubmitTransaction() to execute the batch.

- All entities must share the same PartitionKey, otherwise the batch will fail.

### 10. What is the consequence of not writing point queries ?

🔍 What Are Point Queries?

- **Point queries** retrieve an entity using its **PartitionKey** and **RowKey**.
- They provide **direct, efficient access** to a single entity without scanning the table.

❌ Consequences of Not Using Point Queries

| Consequence                     | Explanation                                                                                                |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Poor Performance**            | Queries without PartitionKey and RowKey may scan many partitions, causing high latency and slow responses. |
| **Increased Cost**              | Scanning large amounts of data leads to higher transaction and bandwidth costs.                            |
| **Limited Scalability**         | Inefficient queries can overload partitions and reduce overall system scalability.                         |
| **Higher Resource Consumption** | Increased CPU, memory, and network usage on Azure servers.                                                 |
| **No Transactional Guarantees** | Complex queries across partitions can’t benefit from atomic batch transactions.                            |

✅ Best Practice

Always design your queries to use **PartitionKey** and **RowKey** whenever possible to ensure:

- ⚡ Fast, direct lookups
- 💰 Cost-effective operations
- 📈 High scalability and throughput
- 🔒 Consistent and reliable data access

🔗 Additional Notes

- If you must query by other properties, consider **secondary indexing** strategies or **Azure Cosmos DB** with richer query capabilities.
- Use **filters** that include PartitionKey for more efficient scans.

### 11. How does duplicate data increase search performance in Azure tables ?

🔍 Concept Overview

In Azure Table Storage, **duplicate data** (also known as **denormalization**) involves storing redundant copies of the same data in multiple entities or partitions to optimize query performance.

✅ Benefits of Duplicate Data for Search Performance

| Benefit                           | Explanation                                                                                                        |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Faster Queries**                | Duplicate data enables queries to use **PartitionKey + RowKey** for direct lookups, avoiding costly scans.         |
| **Improved Partitioning**         | Data duplication across different partitions allows queries to target a specific partition efficiently.            |
| **Reduced Joins/Complex Queries** | Since Azure Tables don’t support joins, duplicating data eliminates the need to combine data from multiple tables. |
| **Optimized Access Patterns**     | Data is stored in the shape most suitable for read operations, improving latency and throughput.                   |

⚠️ Trade-offs

- **Increased Storage Costs:** More data stored means higher storage costs.
- **Data Consistency Challenges:** Keeping duplicated data in sync requires additional logic.
- **Write Amplification:** More write operations are needed when data changes.

📌 When to Use Duplicate Data

- When your application requires **fast read/query performance**.
- When **query patterns** are known and predictable.
- When you can handle the **additional complexity** in data maintenance.

---

📝 Summary

Denormalization via duplicate data is a common pattern in Azure Table Storage to optimize for **fast, scalable searches** by leveraging efficient partition keys and avoiding costly queries.

### 12. How does storing aggregate data benefit in terms of performance ?

🔍 Concept Overview

Storing **aggregate data** means precomputing and saving summarized or combined data (e.g., totals, counts, averages) to optimize query performance and reduce computation overhead at runtime.

✅ Performance Benefits of Storing Aggregate Data

| Benefit                  | Explanation                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------- |
| **Faster Queries**       | Queries retrieving aggregate values are instantaneous, avoiding expensive real-time calculations. |
| **Reduced Compute Load** | Offloads aggregation work from the application or database to a pre-calculation step.             |
| **Lower Latency**        | Results are ready to serve, improving user experience in time-sensitive scenarios.                |
| **Improved Scalability** | Reduces resource consumption on storage and compute layers, allowing handling of more requests.   |

⚠️ Considerations

- Aggregates must be **updated carefully** when underlying data changes to avoid stale results.
- Additional storage is required to maintain aggregate tables or fields.
- Logic complexity increases to keep aggregates in sync.

📌 Use Cases

- Dashboards showing totals, averages, or counts.
- Real-time analytics.
- Reporting systems needing fast response times.
  📝 Summary

Pre-storing aggregate data significantly boosts performance by enabling quick access to summarized information, reducing on-the-fly processing and resource usage.

### 13. When should we use compound key in Azure tables ?

📌 What is a Compound Key?

- In Azure Table Storage, the **compound key** is the combination of:
  - **PartitionKey** (defines the partition)
  - **RowKey** (unique within the partition)
- Together, they **uniquely identify** each entity.

✅ When to Use Compound Keys

| Scenario                        | Explanation                                                                                   |
| ------------------------------- | --------------------------------------------------------------------------------------------- |
| **Uniquely Identify Entities**  | When you need a unique identifier that involves multiple attributes (e.g., region + user ID). |
| **Efficient Data Partitioning** | To logically group related entities while keeping uniqueness.                                 |
| **Fast Lookups**                | To enable **point queries** that are highly efficient and cost-effective.                     |
| **Batch Operations**            | When you want to perform atomic batch transactions on entities in the same partition.         |
| **Hierarchical Data Modeling**  | Represent hierarchical or composite relationships via keys.                                   |

⚠️ Considerations

- Choose `PartitionKey` to maximize scalability by balancing workload across partitions.
- Choose `RowKey` to uniquely identify items **within** a partition.
- Avoid overly large partitions that can become performance bottlenecks.

📝 Summary

Use compound keys (`PartitionKey` + `RowKey`) in Azure Tables whenever you need **unique, efficient, and scalable entity identification** that supports fast queries and batch transactions.

### 14. What is EGT , can EGT be done across tables ?

📘 Definition

- **ETag** (Entity Tag) is a system-generated string value that represents the **version** of an entity in Azure Table Storage.
- It is used for **optimistic concurrency control** to prevent conflicts when multiple clients update the same entity concurrently.

🔧 **How ETag Works**

- When an entity is retrieved, it comes with an ETag.
- When updating or deleting, the ETag is sent back to ensure the entity has not changed since retrieval.
- If the ETag does not match the current version in the table, the operation fails with a **412 Precondition Failed** error.

❓ **Can ETag be Used Across Tables?**

- **No**, ETag is scoped to a **single entity** in a specific table.
- It **cannot be used across different tables** because each table manages its own entities and versions independently.
- Concurrency control with ETag applies only to **individual entities within their own tables**.

✅ **Summary**

| Aspect           | Details                                         |
| ---------------- | ----------------------------------------------- |
| What is ETag?    | A version identifier for concurrency control    |
| Purpose          | Prevents conflicting updates on the same entity |
| Scope            | Single entity within a single table             |
| Cross-table use? | ❌ Not supported                                |

🔗 **Additional Notes**

- Use ETag with `UpdateEntity` or `DeleteEntity` operations to ensure safe concurrency.
- For cross-entity or cross-table transactions, consider application-level logic or alternative storage solutions.
