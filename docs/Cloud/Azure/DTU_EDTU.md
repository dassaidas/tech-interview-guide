### 1. What is the problem of mapping work load with Azure configuration ?

Problem of Mapping Workload with Azure Configuration

Mapping workloads correctly with Azure configurations is critical to ensure optimal performance, cost-efficiency, and reliability. However, there are several challenges and problems that organizations face during this process:

⚠️ Common Problems

**1. Incorrect Sizing of Resources**

- **Issue**: Choosing VM sizes or App Service plans that are too small or too large.
- **Impact**: Under-provisioning leads to performance bottlenecks; over-provisioning causes unnecessary costs.

**2. Lack of Understanding of Workload Characteristics**

- **Issue**: Not analyzing CPU, memory, I/O, and scaling behavior of the workload.
- **Impact**: Results in misaligned service selection, such as using an App Service when a Function App would be more cost-effective.

**3. Improper Use of Service Tiers**

- **Issue**: Selecting wrong pricing tiers (e.g., Basic instead of Premium).
- **Impact**: Missing out on features like auto-scaling, staging slots, or high availability.

**4. Ignoring Network and Storage Needs**

- **Issue**: Workload requires specific networking or storage configurations not accounted for.
- **Impact**: Leads to network bottlenecks or data latency issues.

**5. Overlooking Compliance and Security Requirements**

- **Issue**: Not mapping workloads to services that meet regulatory or security needs.
- **Impact**: Non-compliance with industry standards (e.g., HIPAA, GDPR).

  🛠 Best Practices for Mapping

- **Use Azure Advisor**: Get real-time suggestions for performance and cost optimizations.
- **Perform Workload Assessment**: Analyze workload behavior using tools like Azure Migrate.
- **Right-size Continuously**: Use autoscaling and cost monitoring tools to adjust as usage changes.
- **Align with Business SLAs**: Choose configurations that support your uptime, latency, and DR requirements.
- **Leverage Azure Well-Architected Framework**: Follow guidelines to optimize reliability, performance, and cost.

✅ Conclusion

Mapping workloads with the correct Azure configurations is not a one-time task. It requires continuous assessment and alignment with workload behavior, business goals, and cost considerations. Failure to do so can lead to degraded performance, security issues, and increased cloud bills.

### 2. Explain DTU and EDTU ?

Understanding DTU and eDTU in Azure SQL Database

When using Azure SQL Database, it's important to understand how Microsoft defines and allocates performance using **DTUs** and **eDTUs**. These units simplify resource management but can be confusing without proper context.

💡 What is a DTU?

**DTU (Database Transaction Unit)** is a blended measure of:

- **CPU**
- **Memory**
- **Reads and Writes (I/O)**

It represents the overall performance level for a **single Azure SQL database** in the **DTU-based purchasing model**.

> 💬 Think of it as a performance "package" that wraps CPU, memory, and storage IOPS into one simplified number.

🔢 Example DTU Tiers:

| **Tier** | **DTUs** | **Max Storage** |
| -------- | -------- | --------------- |
| Basic    | 5        | 2 GB            |
| Standard | 10–300   | 250 GB          |
| Premium  | 125–4000 | 1 TB            |

📘 What is an eDTU?

**eDTU (Elastic DTU)** is the equivalent of DTU but applied to **Elastic Pools**.

- Elastic Pools are collections of databases that **share resources**.
- **eDTUs** are the total pooled performance capacity available to all databases within the pool.

> 🧠 eDTU = Shared DTU capacity across all databases in a pool

🔄 Key Difference:

- **DTU** = For **single database**
- **eDTU** = For **elastic pool of databases**

🆚 DTU vs vCore Model

| Feature         | DTU Model                      | vCore Model                               |
| --------------- | ------------------------------ | ----------------------------------------- |
| Unit of measure | DTU (bundled)                  | vCore (CPU + memory separately)           |
| Flexibility     | Less granular                  | More control over resources               |
| Use case        | Simpler workloads, cost limits | Enterprise workloads, predictable scaling |
| Transparency    | Lower                          | Higher (you know exact CPU/memory)        |

✅ When to Use

| Scenario                                                      | Choose                     |
| ------------------------------------------------------------- | -------------------------- |
| You want simple pricing and don't need fine-grained control   | **DTU model**              |
| You want transparency, control, and scalability               | **vCore model**            |
| You have multiple databases with unpredictable usage patterns | **eDTU with Elastic Pool** |

📌 Summary

- **DTU**: Performance metric for a **single database**, combining CPU, memory, and I/O.
- **eDTU**: Shared DTU performance metric for **elastic pools** (multiple databases).
- Useful for simplified performance planning, but less flexible than vCore-based pricing.

### 3. On which factors does DTU depend ?

🔍 Factors on Which DTU Depends

A **DTU (Database Transaction Unit)** in Azure SQL Database is a pre-configured blend of three core resources:

1. **CPU (Compute Power)**

- Represents the **processing capability** of the database engine.
- DTU includes CPU cycles for:
  - Query execution
  - Indexing
  - Stored procedure processing
  - Complex joins or calculations

> ⚠️ CPU-bound queries can max out DTUs quickly.

2.  **Memory (RAM)**

- Used for:
  - **Query caching**
  - **Data buffering**
  - Sorting and hashing operations
  - Execution plans

> 💡 Efficient use of memory can significantly reduce I/O and boost performance. 3. **Disk I/O (Reads and Writes)**

- Includes:
  - **Transaction log writes**
  - **Data page reads/writes**
  - TempDB usage
- I/O-heavy operations (bulk inserts, frequent reads) consume more DTUs.

> 📉 Poor indexing or large table scans increase I/O load and DTU usage.
> 🔁 DTU = Blended Metric

The DTU is essentially a **performance throttle** that balances:
DTU = f(CPU, Memory, Disk I/O)
If any one of the three resources hits its threshold, your **DTU usage approaches 100%**, throttling further performance.

📊 What Affects DTU Consumption?

| Factor                           | Impact on DTU         |
| -------------------------------- | --------------------- |
| Complex or nested queries        | High CPU usage        |
| Missing indexes                  | Increased I/O         |
| Large result sets                | More memory and I/O   |
| High transaction volume          | CPU + I/O             |
| Long-running or blocking queries | CPU + Memory          |
| Poor query design                | All 3 (CPU, Mem, I/O) |

---

🛠 Tools to Monitor DTU Usage

- **Azure Portal → SQL Database → Monitoring → DTU %**
- **Query Performance Insight**
- **Extended Events or Query Store**

---

✅ Optimization Tips

- Use proper **indexing** and **query tuning**
- Reduce **I/O operations** by filtering and batching
- Enable **automatic tuning** in Azure SQL
- Consider scaling to a higher DTU or switch to **vCore** model for more control

---

📌 Summary

DTU depends on:

- **CPU usage**
- **Memory pressure**
- **Disk I/O operations**

Understanding workload behavior helps you choose the right DTU tier and optimize performance effectively.

### 4. How to calculate DTU ?

📐 How to Calculate DTU (Database Transaction Units)

Azure does not provide a direct formula to calculate DTUs because they are **abstract performance units**, blending CPU, memory, and I/O. However, Microsoft offers tools and guidance to help **estimate DTU requirements** based on your on-premise or existing workloads.

⚙️ What is DTU?

> **DTU = A blended measure of CPU + Memory + IOPS**  
> It helps you choose the right Azure SQL Database performance level (Basic, Standard, Premium)

🧮 How to Calculate or Estimate DTU Requirements

✅ Option 1: Use Microsoft DTU Calculator (Recommended)

Microsoft provides a tool:  
👉 [DTU Calculator](https://dtucalculator.azurewebsites.net/)

📋 Steps:

1. Run a workload on your existing SQL Server (on-premise or VM).
2. Collect performance metrics using **Performance Monitor (PerfMon)** for:
   - Processor: `% Processor Time`
   - Logical Disk: `Disk Reads/sec`, `Disk Writes/sec`
   - SQL Server: `Batch Requests/sec`
3. Export the data to a CSV.
4. Upload to the DTU Calculator.
5. The tool estimates the **minimum DTU tier** needed for Azure SQL Database.

📊 Example Metrics Collected

| Metric             | Description        |
| ------------------ | ------------------ |
| % Processor Time   | CPU utilization    |
| Disk Reads/sec     | Read I/O load      |
| Disk Writes/sec    | Write I/O load     |
| Batch Requests/sec | Workload intensity |

✅ Option 2: Use Azure SQL Query Performance Insight

If you're already in Azure:

- Go to **SQL Database → Monitoring → Query Performance Insight**
- Check **DTU usage** over time
- Analyze **top-consuming queries**

⚠️ Notes

- DTUs are only relevant in the **DTU-based pricing model**.
- For **vCore-based models**, resource estimation is done separately (vCPU, RAM, IOPS).
- DTUs do **not map 1:1** with any physical resource; they are **relative units**.

📌 Summary

| Method                              | Use When                                  |
| ----------------------------------- | ----------------------------------------- |
| DTU Calculator                      | Migrating from on-prem or VM to Azure SQL |
| Azure Monitor & Insights            | Already in Azure environment              |
| Manual Estimation (not recommended) | Lacks precision without real metrics      |

> 🧠 DTU calculation is **estimative**, not exact. Always monitor after deployment to adjust tier if needed.

### 5. How to measure the five factors which derive DTU ?

📏 How to Measure the Five Factors That Drive DTU

DTU (Database Transaction Unit) is a composite measure of **five core performance metrics** related to:

1. CPU
2. Memory
3. Data Reads
4. Data Writes
5. Transaction Log Writes

These metrics help estimate the **workload intensity** and choose the correct DTU tier.
🧠 Why Measure These?

Azure bundles CPU, memory, and I/O into DTUs. Understanding the **individual contributors** lets you:

- Right-size your Azure SQL tier
- Optimize queries and performance
- Migrate on-prem workloads accurately using the **DTU Calculator**

🖥️ Tools to Use

- **Performance Monitor (PerfMon)** for on-prem SQL Server
- **Azure Monitor / Query Performance Insight** for Azure SQL
- **SQL Server Management Studio (SSMS)** for DMVs

🔍 Factor-by-Factor Measurement

**1. CPU Usage**

**Metric**: `% Processor Time` (instance-wide)

**How to Measure**:

- PerfMon counter: `Processor(_Total)\% Processor Time`
- DMV:
  ```sql
  SELECT record_id, SQLProcessUtilization FROM sys.dm_os_ring_buffers
  ```

**2. Memory Usage**

**Metric**: Buffer cache usage / memory grants

**How to Measure**:

- PerfMon counter: `SQLServer:Memory Manager\Target Server Memory` & `Total Server Memory`
- DMV:
  ```sql
  SELECT total_physical_memory_kb, available_physical_memory_kb FROM sys.dm_os_sys_memory;
  ```

**3. Data Reads (Logical/Physical)**

**Metric**: `Disk Reads/sec`, `Page Reads/sec`

**How to Measure**:

- PerfMon counter: `LogicalDisk(_Total)\Disk Reads/sec`
- DMV:
  ```sql
  SELECT * FROM sys.dm_io_virtual_file_stats(NULL, NULL);
  ```

**4. Data Writes**

**Metric**: `Disk Writes/sec`

**How to Measure**:

- PerfMon counter: `LogicalDisk(_Total)\Disk Writes/sec`
- DMV:
  ```sql
  SELECT * FROM sys.dm_io_virtual_file_stats(NULL, NULL);
  ```

**5. Transaction Log Writes**

**Metric**: Log I/O throughput

**How to Measure**:

- PerfMon: `SQLServer:Databases\Log Bytes Flushed/sec`
- DMV:
  ```sql
  SELECT database_id, log_write_percent, log_bytes_flushed FROM sys.dm_db_log_space_usage;
  ```
  📊 Suggested PerfMon Counters for DTU Estimation

| Category           | Counter                    |
| ------------------ | -------------------------- |
| CPU                | `% Processor Time`         |
| Memory             | `Total Server Memory (KB)` |
| Data Read I/O      | `Disk Reads/sec`           |
| Data Write I/O     | `Disk Writes/sec`          |
| Log Writes         | `Log Bytes Flushed/sec`    |
| Workload Intensity | `Batch Requests/sec`       |

🧪 Using the DTU Calculator

1. Collect PerfMon logs with above counters over typical workload.
2. Export the data to CSV.
3. Upload to [Azure DTU Calculator](https://dtucalculator.azurewebsites.net/)
4. View estimated DTU requirements and recommended pricing tier.

✅ Summary

| Factor      | Measurement Tool | PerfMon Counter / DMV                            |
| ----------- | ---------------- | ------------------------------------------------ |
| CPU         | PerfMon, DMV     | `% Processor Time`, `SQLProcessUtilization`      |
| Memory      | PerfMon, DMV     | `Total/Target Server Memory`, `dm_os_sys_memory` |
| Data Reads  | PerfMon, DMV     | `Disk Reads/sec`, `dm_io_virtual_file_stats`     |
| Data Writes | PerfMon, DMV     | `Disk Writes/sec`, `dm_io_virtual_file_stats`    |
| Log Writes  | PerfMon, DMV     | `Log Bytes Flushed/sec`, `dm_db_log_space_usage` |

---

> 💡 Tip: Monitor during **peak usage** periods to get the most accurate DTU estimation.

### 6. How can you create SQL Server DB on Azure ?

🛠️ How to Create a SQL Server Database on Azure

You can create an Azure SQL Database (PaaS) via the **Azure Portal**, **Azure CLI**, **ARM Templates**, or **PowerShell**. Below is the most common and beginner-friendly method: **Azure Portal**.

🌐 Option 1: Create via Azure Portal (GUI)
✅ Step-by-Step

**1. Sign in to Azure Portal**

Go to 👉 https://portal.azure.com

**Create a SQL Server (Logical Server)**

-Search for `SQL Server` in the search bar.

- Click **Create** > **SQL Server**.

**1. Fill in the following:**

- **Server Name**: globally unique
- **Admin Username** & **Password**
- **Region**: where the server will reside

- Click **Review + Create** → **Create**

**Create SQL Database**

- Go to the **SQL databases** service.

- Click **Create** → **SQL Database**.

Fill in:

- **Database Name**
- **Subscription** and **Resource Group**
- **Select SQL Server** (use the one you just created)
- **Compute + Storage**: choose DTU or vCore model
- **Backup and Geo-redundancy** options

- Click **Review + Create** → **Create**

**Configure Firewall & Networking**

- After creation, go to the SQL Server resource.

- Open **Networking > Firewalls and virtual networks**.

- Add your **client IP address** to allow external access.

- Save changes.

**Connect to the Database**

- Use **SQL Server Management Studio (SSMS)** or **Azure Data Studio**
- Server name format: <your-server-name>.database.windows.net
- Use the admin username/password you provided.

---

⚙️ Option 2: Create via Azure CLI

```bash
 Create Resource Group
az group create --name myResourceGroup --location eastus

 Create SQL Server
az sql server create \
--name my-sql-server \
--resource-group myResourceGroup \
--location eastus \
--admin-user myadmin \
--admin-password MyP@ssword123

 Create SQL Database
az sql db create \
--resource-group myResourceGroup \
--server my-sql-server \
--name mySampleDatabase \
--service-objective S0
```

### 7. Error while connecting to the azure database from SSMS

**ERROR**

```
An instance-specific error occurred while establishing a connection to SQL Server.
Connection was denied since Deny Public Network Access is set to
Yes (https://docs.microsoft.com/azure/azure-sql/database/connectivity-settings#deny-public-network-access).
To connect to this server, use the Private Endpoint from inside your virtual network (https://docs.microsoft.com/azure/sql-database/sql-database-private-endpoint-overview#how-to-set-up-private-link-for-azure-sql-database). (Microsoft SQL Server, Error: 47073)
```

Azure SQL Connectivity Setup

This document outlines how to configure connectivity to an Azure SQL Server for **Production** and **Development/Test** environments.

🔒 Production: Secure Access via Private Endpoint

✅ Use Case:
For production environments where public access is not permitted.

🔧 Steps:

**1. Create a Private Endpoint**

- Go to the Azure Portal → SQL Server (not database).
- Navigate to **Networking** → **Private endpoint connections**.
- Click **+ Private endpoint** and follow the wizard.
- Associate it with the correct **Virtual Network (VNet)** and **subnet**.

**2. Configure Private DNS**

- Use Azure Private DNS Zone: `privatelink.database.windows.net`
- Link it to your VNet.
- Ensure the DNS resolves the SQL Server name to the private IP.

**3. Access from Azure Resources**

- Ensure clients (VMs, App Services, Functions) are in the same VNet or peered VNet.
- Use the regular server name (e.g., `yourserver.database.windows.net`) — it will resolve to the private IP.

**4. Test Connection**

- RDP into a VM within the VNet (or use VNet-integrated app).
- Use SSMS or app connection string to verify access.

**5. Ensure Public Access is Disabled**

- Navigate to **SQL Server** → **Networking**.
- Set **Public network access** to **Deny**.

📘 [Private Link Setup Guide](https://learn.microsoft.com/azure/sql-database/sql-database-private-endpoint-overview)

---

🧪 Development/Test: Controlled Public Access

⚠️ Use Case:
For local development or testing scenarios where secure access is relaxed.

🔧 Steps:

**1. Allow Public Network Access**

- Go to **SQL Server** → **Networking**.
- Set **Public network access** to **Yes**.

**3. Add Client IP to Firewall Rules**

- Under **Firewall and virtual networks**, add your current IP address.
- Use `0.0.0.0 - 255.255.255.255` only for testing (not recommended).

**3. Test SQL Connection**

- Use SSMS, Azure Data Studio, or your application with:
  - Server: `yourserver.database.windows.net`
  - Authentication: SQL Auth / Azure AD / Managed Identity

**4. Restrict When Done**

- Remove test IPs and reset **Public network access** to **Deny** when testing is complete.

📘 [Firewall Configuration Guide](https://learn.microsoft.com/azure/azure-sql/database/firewall-configure)

---

🧠 Best Practices

- ✅ Always use **Private Endpoints** in production.
- ✅ Monitor and alert on unexpected public access attempts.
- ✅ Periodically review firewall rules and audit access.
- 🚫 Never use `Allow All` IP range in production.

# App services and Cloud services.

### 1. Different ways of publishing on Azure

### 2. Cloud vs App services

### 3. Impact on resource groups

### 4. Web role , Worker roles and Web jobs

### 5. Loosely coupled vs tightly couples deployment

### 6. Configuration files in Azure deployment

### 7. Doing RDP in virtual machines.

# WebJob and background processing.

### 1. Why WebJobs?

### 2. Types of Webjobs (Triggered, Continuos.)

### 3. View logs of WebJobs.

### 4. CRON expressions

### 5. Always on importance in continous webjob

### 6. Storage accounts in Webjobs

### 7. Publish website and webjob using VS

```

```
