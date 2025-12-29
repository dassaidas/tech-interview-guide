### 1. What is the goal of Cosmos DB ?

**Azure Cosmos DB** is Microsoft’s globally distributed, multi-model database service designed to meet the modern application needs of scalability, performance, and availability.

The **primary goal** of Azure Cosmos DB is to provide a **globally distributed, highly available, low-latency database platform** that supports multiple data models and offers **guaranteed performance** at scale.

✅ Key Objectives

1.  **Global Distribution**

    - Offer seamless **multi-region replication**.
    - Enable users to **read and write data locally** from anywhere in the world.
    - Built-in **multi-master replication** for high availability.

2.  **High Availability**

    - **99.999% availability SLA** for multi-region deployments.
    - Automatic failover and redundancy for disaster recovery.

3.  **Low Latency**

    - Target **<10ms latency for reads** and **<15ms for writes** at the 99th percentile.
    - Optimized for high-performance real-time applications.

4.  **Elastic Scalability**

    - **Instant and automatic scaling** of throughput (RU/s) and storage.
    - Supports millions of transactions per second across regions.

5.  **Multi-Model Support**

    - Allows storing and querying data in multiple formats:
    - Document (JSON - MongoDB API)
    - Key-Value
    - Graph (Gremlin)
    - Column-family (Cassandra API)
    - Table API

6.  **Multiple APIs**

    - Supports multiple APIs to integrate with popular databases:
    - **SQL (Core API)**

    - **MongoDB**

    - **Cassandra**
    - **Gremlin**
    - **Azure Table Storage**

7.  **Comprehensive SLAs**

    - Only database to offer **guaranteed SLAs** on:
    - Availability
    - Throughput
    - Consistency
    - Latency

8.  **Five Consistency Levels**

    - Strong
    - Bounded Staleness
    - Session (default)
    - Consistent Prefix
    - Eventual

🚀 Real-World Use Cases

    - Global e-commerce platforms
    - IoT & telemetry ingestion
    - Real-time personalization & recommendation engines
    - Gaming leaderboards
    - Financial transaction processing
    - Supply chain and logistics systems

🔗 References

- [Azure Cosmos DB Overview – Microsoft Docs](https://learn.microsoft.com/en-us/azure/cosmos-db/introduction)
- [SLA for Azure Cosmos DB](https://azure.microsoft.com/en-us/support/legal/sla/cosmos-db/)

### 2. Explain the word planet-scale ?

🌍 Definition

**Planet-scale** refers to the ability of a software system — especially databases and cloud applications — to **operate reliably, efficiently, and securely across the entire globe**, serving **millions or billions of users** simultaneously from multiple geographic locations.

✅ Key Characteristics of Planet-Scale Systems

| Feature                        | Description                                                                                        |
| ------------------------------ | -------------------------------------------------------------------------------------------------- |
| **Global Distribution**        | Data and services are automatically replicated across multiple continents and regions.             |
| **Low Latency Worldwide**      | Reads and writes are served from the nearest datacenter to reduce delay for end users globally.    |
| **Elastic Scalability**        | Can instantly scale up/down to handle sudden changes in workload or user traffic across countries. |
| **Multi-Master Write Support** | Allows write operations from multiple regions with automatic conflict resolution.                  |
| **High Availability**          | Designed for 99.999% uptime using built-in failover and redundancy across regions.                 |
| **Geo-Compliance**             | Supports data residency, privacy, and compliance requirements in different countries.              |

🚀 Example: Planet-Scale in Azure Cosmos DB

Azure Cosmos DB is called a **"planet-scale" database** because it provides:

- Global data replication across any Azure region.
- Sub-10 ms latency read/write performance at 99th percentile.
- Multi-region writes and automatic failover.
- Support for localized access and compliance (e.g., GDPR, data sovereignty).

📦 Real-World Scenarios

| Use Case                               | Why Planet-Scale Matters                                 |
| -------------------------------------- | -------------------------------------------------------- |
| **Global e-commerce platforms**        | Users expect fast performance globally.                  |
| **Real-time multiplayer gaming**       | Millisecond latency is critical.                         |
| **IoT/Telemetry across continents**    | Devices constantly sending data from all over the world. |
| **Social networks and messaging apps** | Users from different countries interacting 24/7.         |

🧠 Summary

> **Planet-scale** means building software and systems that perform reliably, quickly, and securely for a **global audience**, no matter where users are located.

It’s about **scaling across the planet**, not just within a single region or datacenter.

🔗 References

- [Planet-Scale Databases – Microsoft Azure Cosmos DB](https://learn.microsoft.com/en-us/azure/cosmos-db/introduction)
- [Distributed Systems Principles](https://en.wikipedia.org/wiki/Distributed_computing)

### 3. Explain consistency problem in Cosmos ?

What is Consistency?

Consistency refers to the **guarantee that all users see the same data at the same time** after a write operation. In distributed databases like Cosmos DB, ensuring consistency across multiple geographically distributed replicas is challenging.

The Consistency Problem

In a globally distributed system, data is **replicated across multiple regions** to provide high availability and low latency. However, this replication introduces **challenges in keeping data consistent** everywhere:

- When a client writes data to one region, **other regions may not immediately see that update**.
- This can lead to **conflicting versions** or **stale reads**, where some users see older data.
- The system must **balance trade-offs** between consistency, availability, and latency (the CAP theorem).

Cosmos DB Consistency Levels

Azure Cosmos DB addresses the consistency problem by offering **five tunable consistency levels**, allowing developers to choose the right balance for their application:

| Consistency Level     | Description                                                                      | Use Case                              |
| --------------------- | -------------------------------------------------------------------------------- | ------------------------------------- |
| **Strong**            | Guarantees linearizability; reads always see the latest committed write.         | Financial transactions, critical apps |
| **Bounded Staleness** | Reads lag behind writes by a known, fixed amount of time or versions.            | Gaming leaderboards, social feeds     |
| **Session (default)** | Guarantees monotonic reads and writes within a single client session.            | User sessions, personalized apps      |
| **Consistent Prefix** | Reads see updates in the order they were committed, without gaps.                | Event processing                      |
| **Eventual**          | Reads may see out-of-order or stale data but eventual consistency is guaranteed. | Non-critical analytics, caching       |

Why is Consistency Challenging?

- **Network latency:** Propagating changes worldwide takes time.
- **Partition tolerance:** In case of network partitions, consistency may be sacrificed for availability.
- **Multi-master writes:** Allowing writes in multiple regions simultaneously can cause conflicts.

Trade-Offs in Cosmos DB

| Property           | Strong   | Bounded Staleness | Session        | Consistent Prefix | Eventual |
| ------------------ | -------- | ----------------- | -------------- | ----------------- | -------- |
| **Latency**        | High     | Medium            | Low            | Low               | Lowest   |
| **Availability**   | Lower    | High              | High           | High              | Highest  |
| **Throughput**     | Lower    | Medium            | High           | High              | Highest  |
| **Data Freshness** | Absolute | Bounded           | Session-scoped | Ordered           | Eventual |

Summary

The **consistency problem** in Cosmos DB arises from the need to keep **distributed replicas synchronized** while providing **low latency and high availability** globally. Cosmos DB’s **tunable consistency levels** give developers control over this trade-off to best fit their application's needs.

References

- [Azure Cosmos DB Consistency Levels](https://learn.microsoft.com/en-us/azure/cosmos-db/consistency-levels)
- [CAP Theorem Explained](https://en.wikipedia.org/wiki/CAP_theorem)

### 4. Why is DR , BCP not the main goal of cosmos , how is it different ?

Understanding DR and BCP

- **Disaster Recovery (DR)** refers to the strategies and processes to **recover data and resume operations after catastrophic events** (e.g., data center failure, natural disasters).
- **Business Continuity Planning (BCP)** is a broader approach to ensure that **critical business functions continue during and after a disaster**.

Both focus on **minimizing downtime and data loss after an incident**.

Azure Cosmos DB’s Primary Goal

Azure Cosmos DB is designed to be a **planet-scale, globally distributed, multi-model database** that offers:

- **Seamless global distribution** of data with **multi-region replication**.
- **Low latency and high availability** with **99.999% SLA**.
- Tunable **consistency models** for application-specific requirements.
- **Elastic scalability** across throughput and storage.
- **Multi-master writes** and **automatic conflict resolution**.

Why DR and BCP Are Not Its Main Goal

| Aspect                    | DR & BCP Focus                                             | Cosmos DB Focus                                                |
| ------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------- |
| **Objective**             | Recovery and resumption after failures                     | Continuous availability and global scale                       |
| **Scope**                 | Prepare for rare catastrophic events                       | Built-in global distribution and availability for everyday use |
| **Data Availability**     | Restore data from backups or replicas post-disaster        | Always-on read/write access across regions                     |
| **Latency**               | Not primary concern                                        | Sub-10 ms latency globally                                     |
| **User Experience**       | Possible downtime during failover                          | Transparent failover with no downtime                          |
| **Consistency Trade-off** | May sacrifice consistency for availability during recovery | Offers tunable consistency levels with predictable SLAs        |

How Cosmos DB Differs from Traditional DR/BCP Solutions

- **Built-in Geo-Replication:** Cosmos DB replicates data across regions automatically, providing **continuous data availability**, not just backup copies.
- **Multi-Master Writes:** Allows writes in multiple regions simultaneously with **automatic conflict resolution**, reducing failover complexity.
- **Automatic Failover:** Cosmos DB provides **automatic and transparent regional failover**, minimizing downtime without manual intervention.
- **SLAs Cover Availability & Latency:** Cosmos DB guarantees **99.999% availability** and low latency as a core design goal, not just post-disaster recovery.

Summary

- DR and BCP are about **recovering from disasters**, often with some downtime or data loss.
- Cosmos DB’s goal is to provide **always-on, globally distributed data access** with **low latency and high availability**, making downtime or data loss a **non-issue** in most scenarios.
- Cosmos DB **enables business continuity as part of its core functionality**, not as an afterthought.

References

- [Azure Cosmos DB Overview](https://learn.microsoft.com/en-us/azure/cosmos-db/introduction)
- [Disaster Recovery and Business Continuity](https://en.wikipedia.org/wiki/Business_continuity_management)
- [Azure Cosmos DB SLA](https://azure.microsoft.com/en-us/support/legal/sla/cosmos-db/)

### 5. consistency is best when Performance is more important than consistency.

When Is Consistency Relaxed for Better Performance?

In distributed systems, **there is often a trade-off between consistency and performance** due to network latency and replication delays.

- **Consistency is relaxed (weaker consistency levels)** when **performance (latency and throughput) is more important than always reading the latest data**.
- This means the system may return **slightly stale or out-of-date data** to achieve **lower latency and higher availability**.
- Examples include using **Eventual Consistency** or **Consistent Prefix**, where reads may lag behind writes but performance is optimized.

Summary

| Priority                                          | Choose Consistency Level                                                        |
| ------------------------------------------------- | ------------------------------------------------------------------------------- |
| **Strong Consistency**                            | When correctness and latest data are critical, accepting higher latency         |
| **Relaxed Consistency** (e.g., Session, Eventual) | When fast response and high availability matter more than immediate consistency |

This trade-off is a key design consideration in systems like **Azure Cosmos DB**, which offers tunable consistency levels to fit your application needs.

### 6. consistency should be selected for high consistency and for most recent data.

**Strong consistency** should be selected when your application requires:

- **High data accuracy**
- Always reading the **most recent and up-to-date data**
- Operations where stale or outdated data can cause errors or inconsistencies (e.g., financial transactions, inventory systems)

Key Benefits of Strong Consistency

- Guarantees that **all reads return the latest committed write**
- Ensures **linearizability** across all replicas
- Suitable for **mission-critical applications** demanding correctness over latency

Trade-Offs

- May incur **higher latency** due to synchronization between replicas
- Potentially lower availability during network partitions (CAP theorem)

Choose strong consistency when **data correctness is paramount** and slight latency increases are acceptable.

### 7. Explain session , bounded and prefix consistencies ?

Azure Cosmos DB offers multiple consistency levels to balance latency, availability, and data freshness. Below are explanations for three commonly used levels:

1.  Session Consistency

    **Scope:** Guarantees consistency **within a single client session**.

    **Behavior:**

    Reads your own writes — after a write completes, subsequent reads from the same client session will see that write or a more recent one.

    Provides **monotonic reads** and **monotonic writes** within a session.

    **Use Cases:**

    Personalized user experiences (e.g., user profiles, shopping carts).

    Scenarios where clients need to see their latest writes, but strict global consistency is not necessary.

    Performance: Low latency, high availability.

2.  Bounded Staleness Consistency

    **Scope:** Guarantees reads lag behind writes by at most a **specified time interval** or **number of versions** (staleness window)

    **Behavior:**

    Reads might not see the most recent writes but will see all writes within the configured staleness bound.

    Provides **global order** of updates within the staleness window.

    **Use Cases:**

    Applications tolerating slightly stale data but requiring some ordering guarantees, e.g., leaderboards, social feeds.

    **Performance:** Moderate latency with stronger consistency guarantees than session.

3.  Consistent Prefix Consistency

    - **Scope:** Guarantees that reads see **writes in the order they were committed** without gaps.
    - **Behavior:**
    - Reads never see out-of-order writes. For example, if updates A, B, and C occur in that order, a client will never see C before B.
    - However, reads may lag and see earlier writes (e.g., A only), but **never a later write without seeing all previous ones**.

    **Use Cases:**

    Event processing pipelines, logging systems, or any workload that needs ordered events but can tolerate some staleness.

    **Performance:** Lower latency than bounded staleness, but no absolute freshness guarantee.

Summary Table

| Consistency Level     | Guarantees                                             | Typical Use Cases              | Latency         |
| --------------------- | ------------------------------------------------------ | ------------------------------ | --------------- |
| **Session**           | Monotonic reads/writes per session                     | User sessions, personalization | Low             |
| **Bounded Staleness** | Reads lag behind writes by a fixed time/version window | Leaderboards, social feeds     | Moderate        |
| **Consistent Prefix** | Reads see writes in order, no gaps                     | Event streams, logs            | Low to moderate |

References

- [Azure Cosmos DB Consistency Levels](https://learn.microsoft.com/en-us/azure/cosmos-db/consistency-levels)
- [CAP Theorem and Distributed Consistency](https://en.wikipedia.org/wiki/CAP_theorem)

### 8. What is multi-api support in cosmos ?

Azure Cosmos DB is a **multi-model, globally distributed database service** that supports multiple APIs, enabling developers to use familiar data models and query languages while benefiting from Cosmos DB’s scalability and low latency.

What Does Multi-API Support Mean?

**Multi-API Support** means that Cosmos DB allows you to interact with the same underlying database service using different APIs, each designed for a specific data model or developer ecosystem. This flexibility lets you:

- Use the APIs and tools you already know.
- Migrate existing applications to Cosmos DB with minimal changes.
- Work with multiple data models (document, graph, key-value, column-family) within a single service.

Supported APIs in Azure Cosmos DB

| API Name           | Data Model      | Description                                                                        | Use Cases                               |
| ------------------ | --------------- | ---------------------------------------------------------------------------------- | --------------------------------------- |
| **Core (SQL) API** | Document (JSON) | Native Cosmos DB API for querying JSON documents using SQL-like syntax.            | Web apps, mobile apps, IoT data         |
| **MongoDB API**    | Document (JSON) | Enables applications written for MongoDB to run on Cosmos DB without code changes. | Apps using MongoDB drivers & tools      |
| **Cassandra API**  | Column-family   | Supports Cassandra Query Language (CQL) for wide-column data.                      | Big data, time series, distributed apps |
| **Gremlin API**    | Graph           | Enables graph database features using Gremlin traversal language.                  | Social networks, recommendation engines |
| **Table API**      | Key-Value       | Provides a key-value store compatible with Azure Table Storage API.                | Simple key-value storage, metadata      |

Benefits of Multi-API Support

- **Flexibility:** Choose the API that best fits your application requirements.
- **Compatibility:** Migrate existing workloads easily to Cosmos DB without rewriting application logic.
- **Unified Service:** All APIs benefit from Cosmos DB’s global distribution, elastic scalability, and SLAs.
- **Simplified Management:** One backend service to manage multiple data models and APIs.

Summary

Azure Cosmos DB’s multi-API support enables developers to use their preferred database models and query languages while leveraging Cosmos DB’s globally distributed, scalable, and low-latency architecture — all within a single fully managed service.

References

- [Azure Cosmos DB APIs](https://learn.microsoft.com/en-us/azure/cosmos-db/apis-overview)
- [Choosing the Right API in Cosmos DB](https://learn.microsoft.com/en-us/azure/cosmos-db/choose-api)

### 9. Explain the hierarchical structure of Cosmos DB ?

Azure Cosmos DB organizes data and resources in a hierarchy to manage and scale globally distributed applications efficiently.

Hierarchy Levels

1.  **Account**

    - The top-level resource.
    - Represents a Cosmos DB service endpoint.
    - Associated with one or more Azure regions for global distribution.
    - Contains databases, offers throughput provisioning.

2.  **Database**

    - Logical container for a set of containers (collections).
    - Acts as a scope for provisioning throughput (manual or shared).
    - Can contain multiple containers.
    - Similar to a database in traditional database systems.

3.  **Container**

    - Core unit of scalability and distribution.
    - Also known as **Collection**, **Table**, or **Graph** depending on the API used.
    - Stores JSON documents, key-value pairs, or graph data.
    - Has a **partition key** to distribute data across physical partitions.
    - Provisioned with throughput measured in Request Units (RUs).

4.  **Item (Document/Row/Vertex/Edge)**

    - The individual data entity stored in a container.
    - For Core (SQL) and MongoDB APIs, an item is a **JSON document**.
    - For Cassandra API, an item is a **row**.
    - For Gremlin API, items are **vertices** and **edges**.
    - Each item is uniquely identified by an **id** (or primary key).

Visualization of the Hierarchy

Cosmos DB Account
└── Database
└── Container (Collection/Table/Graph)
└── Items (Documents/Rows/Vertices/Edges)

Additional Notes

- **Partitioning:** Containers use partition keys to shard data across multiple physical partitions for scalability.
- **Throughput:** Throughput (RU/s) can be provisioned at the account, database, or container level depending on configuration.
- **Global Distribution:** Cosmos DB accounts can replicate data across multiple regions transparently.

References

- [Azure Cosmos DB Core Concepts](https://learn.microsoft.com/en-us/azure/cosmos-db/introduction)
- [Data Model in Azure Cosmos DB](https://learn.microsoft.com/en-us/azure/cosmos-db/data-model)

### 10. How to connect to Cosmos DB using C# language ?

This guide shows you how to connect to Azure Cosmos DB using the **Azure Cosmos DB .NET SDK** in C#.

Prerequisites

- An **Azure Cosmos DB account** (Core SQL API)
- Your **connection string** or **URI and primary key**
- .NET development environment (Visual Studio, .NET SDK)
- Install the **Azure Cosmos SDK** NuGet package:

  ```
  dotnet add package Microsoft.Azure.Cosmos
  ```

```csharp
  using System;
  using System.Threading.Tasks;
  using Microsoft.Azure.Cosmos;
  class Program
  {
  private static readonly string endpointUri = "https://<your-account>.documents.azure.com:443/";
  private static readonly string primaryKey = "<your-primary-key>";
  private CosmosClient cosmosClient;
  private Database database;
  private Container container;

    private string databaseId = "SampleDatabase";
    private string containerId = "SampleContainer";

    public static async Task Main(string[] args)
    {
        try
        {
            Program p = new Program();
            await p.ConnectCosmosAsync();
        }
        catch (CosmosException ex)
        {
            Console.WriteLine($"Cosmos DB error: {ex.StatusCode} - {ex.Message}");
        }
        catch (Exception e)
        {
            Console.WriteLine($"Error: {e.Message}");
        }
    }

    public async Task ConnectCosmosAsync()
    {
        // Create a new CosmosClient instance
        cosmosClient = new CosmosClient(endpointUri, primaryKey);

        // Create the database if it does not exist
        database = await cosmosClient.CreateDatabaseIfNotExistsAsync(databaseId);
        Console.WriteLine($"Created Database: {database.Id}");

        // Create the container if it does not exist
        container = await database.CreateContainerIfNotExistsAsync(containerId, "/partitionKey");
        Console.WriteLine($"Created Container: {container.Id}");

        // Example: Add an item to the container
        var newItem = new { id = Guid.NewGuid().ToString(), partitionKey = "example", name = "Sample Item" };
        ItemResponse<dynamic> response = await container.CreateItemAsync(newItem, new PartitionKey(newItem.partitionKey));
        Console.WriteLine($"Created item with id: {response.Resource.id}");
    }
  }
```

Explanation of Key Cosmos DB SDK Methods in C#

- **CosmosClient:**
  The main client class used to establish a connection to Azure Cosmos DB.

- **CreateDatabaseIfNotExistsAsync:**
  Creates the database if it does not already exist in the Cosmos DB account.

- **CreateContainerIfNotExistsAsync:**
  Creates the container (also called collection) within the database if it doesn’t exist, specifying the partition key path.

- **CreateItemAsync:**
  Adds a new item (document) to the specified container.

References

- [Azure Cosmos DB .NET SDK documentation](https://learn.microsoft.com/en-us/azure/cosmos-db/sql/sql-api-sdk-dotnet)
- [Quickstart: Use Azure Cosmos DB SDK for .NET](https://learn.microsoft.com/en-us/azure/cosmos-db/sql/create-sql-api-dotnet)
