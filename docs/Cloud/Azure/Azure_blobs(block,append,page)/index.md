### 1. What are the different types of Blobs?

Azure Blob Storage supports different types of blobs optimized for various scenarios and performance characteristics.

**1. Block Blobs**

- **Purpose:** Store text and binary data.
- **Use Cases:** Documents, images, videos, backups, etc.
- **Characteristics:**

        - Composed of blocks of data.
        - Supports efficient uploads and updates by uploading blocks independently.
        - Maximum size: up to about 190.7 TiB.
        - Ideal for streaming and storing files.

**2. Append Blobs**

- **Purpose:** Optimized for append operations.
- **Use Cases:** Logging, auditing, telemetry data.
- **Characteristics:**

        - Composed of blocks but optimized for append-only operations.
        - New data can only be added to the end of the blob.
        - Supports efficient append with low latency.
        - Maximum size: up to about 195 GiB.

**3. Page Blobs**

- **Purpose:** Store random-access files.
- **Use Cases:** Virtual hard disks (VHDs), databases, or any scenario requiring frequent read/write operations.
- **Characteristics:**

        - Composed of 512-byte pages.
        - Supports random read/write operations.
        -  Maximum size: up to 8 TiB.
        - Suitable for scenarios requiring frequent updates.

✅ Summary

| Blob Type   | Use Case                      | Max Size    | Key Feature                     |
| ----------- | ----------------------------- | ----------- | ------------------------------- |
| Block Blob  | General file storage          | ~190.7 TiB  | Efficient block uploads         |
| Append Blob | Append-only data (logs)       | ~195 GiB    | Optimized for append operations |
| Page Blob   | Random read/write (VHDs, DBs) | Up to 8 TiB | Supports random access pages    |

🔗 Additional Info

- Blob storage is scalable, durable, and accessible via REST APIs, SDKs, and Azure Portal.
- Choose blob type based on your application needs.

### 2. In which scenarios we should use which type of blobs?

Azure Blob Storage offers **Block Blobs**, **Append Blobs**, and **Page Blobs**, each suited to different scenarios.

1.  Block Blobs

**Use When:**

- You need to **store large files** like images, videos, documents, backups.
- Your workload involves **uploading or downloading entire files**.
- You want **efficient uploads** with support for resumable transfers.
- You are **streaming media or files**.
- File size can be very large (up to ~190.7 TiB).

**Common Scenarios:**

- Media storage (videos, photos)
- Document storage (PDFs, Word files)
- Backup and restore systems
- Content delivery

**2. Append Blobs**

Use When:

- You need to **append data frequently** without modifying existing content.
- You want to **store logs, audit trails, or telemetry data**.
- Data grows by adding new records continuously.
- Order of records is important.

Common Scenarios:

- Application logging
- Event and telemetry capture
- Audit and compliance trails

**3. Page Blobs**

Use When:

- You require **random read/write access** to the data.
- You need to **store virtual hard disks (VHDs)** for Azure Virtual Machines.
- Your application involves **frequent updates to specific byte ranges**.
- Low-latency I/O operations are necessary.

Common Scenarios:

- Azure VM disks (VHD storage)
- Databases requiring page-level updates
- Random access files that need frequent modifications

✅ Summary Table

| Blob Type   | Best Use Case                  | Key Feature             |
| ----------- | ------------------------------ | ----------------------- |
| Block Blob  | Large file storage, streaming  | Efficient block uploads |
| Append Blob | Logging, appending data        | Append-only writes      |
| Page Blob   | Random read/write, VHD storage | Random access pages     |

---

🔍 Tips

- Choose **Block Blobs** for most general-purpose file storage.
- Use **Append Blobs** only if you need append-only semantics.
- Use **Page Blobs** when low-latency random access or VM disks are required.

### 3. Can you explain the working of block blobs ?

**🔍 What Are Block Blobs?**

- Block blobs store **text and binary data** as a collection of **blocks**.
- Each block is identified by a **block ID** (a Base64 string).
- Blocks can be uploaded **independently** and in **parallel**.

⚙️ How Block Blobs Work

**1. Uploading Blocks**

- The client splits the blob data into smaller chunks called **blocks**.
- Each block is uploaded separately with a unique block ID.
- Blocks can be uploaded in any order and in parallel, improving upload speed.

**2. Committing Blocks**

- After uploading all blocks, the client sends a **commit block list** request.
- The commit operation assembles the blocks into the final blob in the specified order.
- Only committed blocks form the visible blob.

**3. Downloading Blobs**

- When a blob is requested, Azure serves the committed blocks in order.
- Supports streaming large blobs efficiently.

**4. Modifying Blobs**

- To modify a block blob, upload new blocks and commit an updated block list.
- Uncommitted blocks expire after a week if not committed.

✅ Benefits of Block Blob Architecture

- **Efficient Uploads**: Upload large blobs in parallel smaller chunks.
- **Resumable Uploads**: If upload is interrupted, only missing blocks need to be uploaded.
- **Flexible**: Update parts of a blob by committing new block lists.
- **Scalable**: Supports blobs up to approximately 190.7 TiB.

🔗 Summary

| Step          | Description                          |
| ------------- | ------------------------------------ |
| Upload Blocks | Upload blocks independently with IDs |
| Commit Blocks | Assemble blocks into final blob      |
| Download Blob | Read committed blocks in order       |
| Modify Blob   | Upload new blocks and commit list    |

Block blobs are ideal for storing files where large size, efficient upload, and streaming are important.

### 4. What is the size of individual block blob ?

✅ Key Size Limits

| Aspect                                | Limit                                                |
| ------------------------------------- | ---------------------------------------------------- |
| **Maximum size of a single block**    | 4000 MiB (4,000 MiB or ~4 GB)                        |
| **Maximum number of blocks per blob** | 50,000 blocks                                        |
| **Maximum size of a block blob**      | Approximately 190.7 TiB (50,000 blocks × 4 MiB each) |

🔍 Explanation

- A **block blob** is made up of multiple blocks.
- Each block can be up to **4000 MiB** in size.
- You can upload up to **50,000 blocks** per blob.
- Therefore, the maximum total size of a block blob is roughly **190.7 TiB**.
- Blocks are combined when committing the blob.

📌 Notes

- For optimal performance, Azure recommends using smaller blocks (e.g., 4 MiB).
- Large block sizes reduce the number of blocks but may affect upload reliability.
- Uncommitted blocks expire after 7 days.

🔗 Summary

| Limit                | Value           |
| -------------------- | --------------- |
| Max block size       | 4000 MiB (4 GB) |
| Max number of blocks | 50,000          |
| Max block blob size  | ~190.7 TiB      |

### 5. How many block blobs can be accommodated in one blob ?

📌 Answer

- A **single block blob** in Azure Blob Storage can contain **up to 50,000 blocks**.
- Each block can be **up to 4000 MiB (approximately 4 GiB)** in size.

🧾 Calculation

| Parameter       | Value                          |
| --------------- | ------------------------------ |
| Max blocks/blob | 50,000                         |
| Max size/block  | 4000 MiB (~4 GiB)              |
| Max blob size   | 50,000 × 4000 MiB = ~190.7 TiB |

> 🧠 **Note**: You do not store _multiple block blobs_ inside another blob. Each **block blob is a single object** made up of multiple blocks.

❓ Clarification

- A **block blob** ≠ a container of multiple blobs.
- Rather, it is **a single blob object composed of multiple blocks**.
- You can store **multiple block blobs** in a **blob container**, not inside each other.

✅ Summary

| Concept                   | Value                               |
| ------------------------- | ----------------------------------- |
| Max blocks per block blob | 50,000                              |
| Max block size            | 4000 MiB (≈4 GiB)                   |
| Max total blob size       | ~190.7 TiB                          |
| Block blobs inside a blob | ❌ Not possible (1 blob = 1 object) |

### 6. Explain the hierarchal structure of account , container and blobs ?

🏗️ Hierarchical Structure of Azure Blob Storage

Azure Blob Storage is organized in a **three-level hierarchy** to manage and access data efficiently.

📘 1. Storage Account

- The **top-level namespace** for all your Azure Storage data.
- Each storage account provides a **unique namespace** in Azure for your data.
- It can contain multiple containers.
- URL format:https://<storage-account-name>.blob.core.windows.net/

📂 2. Container

- A **container** organizes a set of blobs.
- It's similar to a directory or folder in traditional file systems.
- All blobs must be stored in a container.
- You can define access levels at the container level: Private, Blob (public read), or Container (full public read).
- URL format: https://<storage-account-name>.blob.core.windows.net/<container-name>

📄 3. Blob

- The actual **file or object** you store in Azure Blob Storage.
- Can be of types: **Block Blob**, **Append Blob**, or **Page Blob**.
- Blobs are stored inside containers and can be large binary/text files.
- Each blob is uniquely identified within its container by its name.
- URL format: https://<storage-account-name>.blob.core.windows.net/<container-name>/<blob-name>

```
Storage Account
│
├── Container 1
│ ├── blob-a.txt
│ ├── image1.jpg
│ └── video.mp4
│
├── Container 2
│ ├── log-2024.txt
│ └── snapshot.json
│
└── Container 3
└── invoice.pdf
```

✅ Summary Table

| Level           | Description               | Example URL                                                |
| --------------- | ------------------------- | ---------------------------------------------------------- |
| Storage Account | Root namespace in Azure   | `https://mystorage.blob.core.windows.net/`                 |
| Container       | Logical grouping of blobs | `https://mystorage.blob.core.windows.net/photos/`          |
| Blob            | Actual data file (object) | `https://mystorage.blob.core.windows.net/photos/image.jpg` |

🔐 Access Control

- Authentication and authorization are typically applied at the **account or container level**.
- You can use Shared Access Signatures (SAS), Azure RBAC, or access policies.

### 7. Explain private , container and blob access levels ?

Azure Blob Storage provides **three levels of public access** for containers and blobs to control visibility and security.

**1. 🚫 Private (No Anonymous Access)**

- **Description:**  
  No anonymous access is allowed. Only authorized users (via Azure AD, SAS tokens, or account keys) can access data.

- **Use Case:**  
  Ideal for **secure enterprise data**, private backups, confidential documents.

- **Who Can Access?**  
  Only users/applications with proper credentials.

**2. 📂 Container (Full Public Read Access for Container and Blobs)**

- **Description:**  
  Allows **anonymous read access** to both the blobs and the list of blobs in the container.

- **Use Case:**  
  Useful for **public media galleries**, static websites, or shared public datasets.

- **Who Can Access?**  
  Anyone with the container URL can:
  - List all blobs in the container.
  - Read blob content.

**3. 📄 Blob (Public Read Access for Blobs Only)**

- **Description:**  
  Allows **anonymous read access to blobs**, but not to the container metadata or list of blobs.

- **Use Case:**  
  Share **specific files (like PDFs or images)** without exposing the full container.

- **Who Can Access?**  
  Anyone with the blob’s direct URL can read the blob. They **cannot list blobs** in the container.

✅ Summary Table

| Access Level  | Container Listing | Blob Read Access | Authentication Required   |
| ------------- | ----------------- | ---------------- | ------------------------- |
| **Private**   | ❌ No             | ❌ No            | ✅ Yes                    |
| **Container** | ✅ Yes            | ✅ Yes           | ❌ No (anonymous allowed) |
| **Blob**      | ❌ No             | ✅ Yes           | ❌ No (anonymous allowed) |

🔐 How to Set Access Level

You can configure access levels:

- From **Azure Portal** (Container → Change access level)
- Using **Azure CLI**:
  ```bash
  az storage container set-permission --name <container-name> --public-access <level>
  ```

**🛡️ Best Practice**

- Use Private for sensitive and internal data.

- Use Blob for publicly shared files.

- Use Container with caution, only for fully public use cases.

### 8. What are the broader steps to create blobs ?

Creating blobs in Azure involves setting up the environment, organizing your storage hierarchy, and uploading your data.

✅ Step-by-Step Overview
**1. 🔐 Create an Azure Storage Account**

- Go to Azure Portal.
- Click on **Storage Accounts** → **Create**.
- Choose a **resource group**, provide a **unique name**, region, and **performance tier**.
- Select **BlobStorage** or **General-purpose v2** as the account type.

  **2. 📂 Create a Blob Container**

- Navigate to the **storage account** you just created.
- Select **Containers** → **+ Container**.
- Provide a **container name** (lowercase only).
- Set the **access level**: `Private`, `Blob`, or `Container`.

**3. 📤 Upload a Blob**

- Go to the container.
- Click **Upload**.
- Select the file you want to upload (supports images, videos, docs, etc.).
- Choose **block blob** (default) unless you need append/page blob.
- Click **Upload**.

**4. 🔗 Access or Secure Your Blob**

- Once uploaded, you’ll get a URL like: https://<account>.blob.core.windows.net/<container>/<blob>

- Use **SAS tokens**, **Azure RBAC**, or **container policies** to secure or share the blob.

📌 Optional: Programmatic Upload (C# Example)

```csharp
var blobServiceClient = new BlobServiceClient("<connection-string>");
var containerClient = blobServiceClient.GetBlobContainerClient("mycontainer");
var blobClient = containerClient.GetBlobClient("myfile.txt");

using FileStream uploadFileStream = File.OpenRead("myfile.txt");
blobClient.Upload(uploadFileStream, true);
uploadFileStream.Close();
```

📋 Summary – Steps to Create Blobs in Azure

| Step | Description                   |
| ---- | ----------------------------- |
| 1    | Create a storage account      |
| 2    | Create a container            |
| 3    | Upload blob (file)            |
| 4    | Access or secure the blob URL |

### 9. What is the importance of “SingleBlobThreshHoldInBytes” ?

📘 What Is It?

`SingleBlobUploadThresholdInBytes` is a configuration setting in Azure SDKs that determines:

> 🔧 **The maximum size (in bytes) of a blob that can be uploaded in a single operation.**  
> If the blob size exceeds this threshold, it is automatically uploaded in **blocks** (i.e., multipart upload).

⚙️ How It Works

- If a file is **smaller than or equal** to the threshold:
  - It is uploaded as a **single PUT operation**.
- If a file is **larger** than the threshold:
  - It is uploaded in **multiple blocks** using `PutBlock` + `PutBlockList`.

✅ Why It's Important

| Benefit                     | Explanation                                                                  |
| --------------------------- | ---------------------------------------------------------------------------- |
| **Optimized Performance**   | Uploading small files in one request reduces overhead.                       |
| **Automatic Block Uploads** | Automatically switches to block upload for large files.                      |
| **Better Reliability**      | Large uploads benefit from retry logic per block, improving fault tolerance. |
| **Customization**           | Developers can tune this value to balance performance and reliability.       |

📌 Default Value

- Typically: **256 MiB (268,435,456 bytes)**
- Can be configured in the SDK for performance tuning:
  ```csharp
  new BlobClientOptions
  {
      SingleBlobUploadThreshold = 100 * 1024 * 1024 // 100 MB
  };
  ```
  **🔐 Best Practice**
- For large files: Use lower thresholds to enable block uploads with retry support.

- For small files: Use higher thresholds to avoid overhead of block management.

📝 Summary – SingleBlobUploadThresholdInBytes

| Setting Name | `SingleBlobUploadThresholdInBytes`                       |
| ------------ | -------------------------------------------------------- |
| Purpose      | Switch between single PUT and block upload automatically |
| Default      | ~256 MiB                                                 |
| Benefit      | Optimizes performance, fault tolerance, and control      |

### 10. What happens when we specify “StreamWriteSizeInBytes” ?

📘 Definition

`StreamWriteSizeInBytes` is a configuration property used in Azure Blob Storage SDKs to define:

> 💡 **The size of data chunks written to the blob when uploading a stream (e.g., FileStream or MemoryStream).**

⚙️ How It Works

- When uploading a blob from a stream (e.g., `UploadAsync(Stream)`), Azure writes the stream in **chunks of size = `StreamWriteSizeInBytes`**.
- This value controls the **buffer size** used internally during the upload process.

✅ Why It Matters

| Impact                 | Explanation                                                             |
| ---------------------- | ----------------------------------------------------------------------- |
| **Performance Tuning** | Larger sizes reduce number of write calls and can improve upload speed. |
| **Memory Consumption** | Larger buffer sizes use more memory per upload thread.                  |
| **Network Efficiency** | Helps balance between network throughput and responsiveness.            |
| **Parallel Uploads**   | Can be combined with concurrency settings for better performance.       |

📌 Typical Values

- Common default: `4 MiB` to `8 MiB` (depends on SDK version)
- Recommended range: **2 MiB to 100 MiB**
- Example in C#:

  ```csharp
  var options = new BlockBlobClientOptions
  {
      TransferOptions = new StorageTransferOptions
      {
          InitialTransferSize = 8 * 1024 * 1024,           // 8 MiB
          MaximumTransferSize = 8 * 1024 * 1024,           // 8 MiB
          MaximumConcurrency = 4
      }
  };
  ```

⚠️ Important Notes

- Increasing this too much may lead to **high memory usage** in concurrent uploads.
- Too small can result in **slower uploads** due to too many small network operations.

📝 Summary – StreamWriteSizeInBytes

| Setting Name            | `StreamWriteSizeInBytes`                      |
| ----------------------- | --------------------------------------------- |
| Purpose                 | Chunk size for writing blob data from streams |
| Default (SDK-dependent) | ~4–8 MiB                                      |
| Effect                  | Impacts upload performance and memory usage   |
| Best Practice           | Tune based on file size, memory, and network  |

### 11. Differentiate between “SingleBlobThreshHoldInBytes” VS “StreamWriteSizeInBytes” ?

🔍 Difference Between `SingleBlobUploadThresholdInBytes` vs `StreamWriteSizeInBytes`

These two settings control how data is uploaded to Azure Blob Storage, but they serve different purposes.

📌 Key Differences

| Aspect                      | `SingleBlobUploadThresholdInBytes`                           | `StreamWriteSizeInBytes`                            |
| --------------------------- | ------------------------------------------------------------ | --------------------------------------------------- |
| **Purpose**                 | Determines when to switch from single upload to block upload | Sets the chunk size when writing from a stream      |
| **Applies To**              | Entire blob upload                                           | Streaming uploads (e.g., FileStream, MemoryStream)  |
| **Triggers Block Upload**   | ✅ Yes – if blob size exceeds threshold                      | ❌ No – just controls buffer size per chunk         |
| **Performance Impact**      | Impacts upload mode selection                                | Impacts memory usage and write performance          |
| **Typical Use Case**        | Full file uploads (e.g., `UploadAsync(filePath)`)            | Uploading large blobs via streams                   |
| **Default Value**           | ~256 MiB                                                     | ~4–8 MiB                                            |
| **Risk of High Memory Use** | Low – switches upload method                                 | High – if set too large in multi-threaded scenarios |

📝 Summary

- Use `SingleBlobUploadThresholdInBytes` to decide **when Azure uses block upload**.
- Use `StreamWriteSizeInBytes` to **control buffer size** when uploading from a stream.
- Both settings can be fine-tuned for **performance and scalability**.

### 12. When should we use “PutBlock” and “PutBlockList” ?

⚙️ When to Use `PutBlock` and `PutBlockList` in Azure Blob Storage

Azure Block Blob uploads use two key operations when working with blocks:

**1. 📌 `PutBlock`**

- **Purpose:** Uploads a single block of data to Azure Blob Storage.
- **Use Case:**

         - When you want to upload a **part (block)** of a large blob independently.
         - Supports **parallel or chunked uploads** of large files.
         - Blocks can be uploaded **in any order**.

- **Note:**

         - Blocks uploaded with `PutBlock` are **not committed** until `PutBlockList` is called.
         - Uncommitted blocks expire after 7 days if not committed.

**2. 📌 `PutBlockList`**

- **Purpose:** Commits a list of blocks to assemble the final blob.
- **Use Case:**

        - After all blocks are uploaded via `PutBlock`, call `PutBlockList` to **commit** the blocks.
        - Defines the **final order** of blocks in the blob.
        - Makes the blob **available and readable**.

- **Note:**

        - Only blocks included in the `PutBlockList` become part of the committed blob.
        - Blocks not included remain uncommitted and will expire.

**🔄 Workflow Summary**

| Step             | Action                                                       |
| ---------------- | ------------------------------------------------------------ |
| 1. Upload Blocks | Use `PutBlock` to upload individual blocks in any order      |
| 2. Commit Blocks | Use `PutBlockList` to commit the block list in desired order |

**✅ When to Use**

| Scenario                       | Operation                                                    |
| ------------------------------ | ------------------------------------------------------------ |
| Upload large blobs in chunks   | `PutBlock`                                                   |
| Finalize and assemble the blob | `PutBlockList`                                               |
| Resume interrupted uploads     | Use `PutBlock` to upload missing blocks, then `PutBlockList` |

📝 **Summary**

- **`PutBlock`** uploads blocks independently (uncommitted).
- **`PutBlockList`** commits the blocks to form the final blob.
- Together they enable **reliable, resumable, and parallel uploads** of large blobs.

### 13. How can we get committed and uncommitted blobs ?

Azure Blob Storage allows you to manage and inspect both **committed** and **uncommitted** blocks within a block blob.

Definitions

- **Committed blocks:** Blocks that have been committed by a `PutBlockList` operation and form the visible blob.
- **Uncommitted blocks:** Blocks uploaded by `PutBlock` but **not yet committed**. They are invisible until committed and expire after 7 days.

⚙️ Retrieving Blocks

Using Azure SDK (C# Example)

```csharp
var blobClient = containerClient.GetBlockBlobClient("myblob.txt");
var blockList = await blobClient.GetBlockListAsync(BlockListTypes.All);

Console.WriteLine("Committed Blocks:");
foreach (var block in blockList.Value.CommittedBlocks)
{
    Console.WriteLine($"Block ID: {block.Name}, Size: {block.Size}");
}

Console.WriteLine("Uncommitted Blocks:");
foreach (var block in blockList.Value.UncommittedBlocks)
{
    Console.WriteLine($"Block ID: {block.Name}, Size: {block.Size}");
}
```

**Using REST API**

- Use the Get Block List operation with blocklisttype=all query parameter.

- The response contains two sections: <CommittedBlocks> and <UncommittedBlocks>.

✅ Summary Table

| Block Type         | Description                           | Visibility       | Lifetime                           |
| ------------------ | ------------------------------------- | ---------------- | ---------------------------------- |
| Committed Blocks   | Part of the committed blob            | Visible to reads | Persist until overwritten          |
| Uncommitted Blocks | Uploaded but not yet committed blocks | Invisible        | Expire after 7 days if uncommitted |

---

📝 Notes

- Use block list info to manage resumable uploads.
- Uncommitted blocks consume storage but are not visible.
- Commit blocks with `PutBlockList` to finalize the blob.

### 14. How can we download block blob ?

You can download a block blob from Azure Blob Storage using various SDKs. Below is a common example using C# Azure SDK.

## Using Azure SDK for .NET (C#)

```csharp
using Azure.Storage.Blobs;
using System.IO;
using System.Threading.Tasks;

public async Task DownloadBlockBlobAsync(string connectionString, string containerName, string blobName, string downloadFilePath)
{
    // Create BlobServiceClient
    BlobServiceClient blobServiceClient = new BlobServiceClient(connectionString);

    // Get the container client
    BlobContainerClient containerClient = blobServiceClient.GetBlobContainerClient(containerName);

    // Get the blob client
    BlobClient blobClient = containerClient.GetBlobClient(blobName);

    // Download the blob's contents to a local file
    await blobClient.DownloadToAsync(downloadFilePath);
}
```

**Steps Explained**

- Create a BlobServiceClient with your storage account connection string.

- Get the container client using the container name.

- Get the blob client using the blob name.

- Call DownloadToAsync() to download the blob content to a local file path.

**Notes**

- You can also download to a stream instead of a file by using DownloadToAsync(Stream).

- For large blobs, consider using asynchronous or chunked downloads for better performance.

### 15. Explain the importance of “StreamMinimumReadSizeInBytes” ?

`StreamMinimumReadSizeInBytes` is a configuration setting used in Azure Blob Storage SDKs that defines:

> 🔧 **The minimum size of data (in bytes) to read from the blob stream in one operation.**

⚙️ How It Works

- When reading data from a blob stream, the SDK reads data in chunks.
- This setting controls the **minimum buffer size** used for each read operation.
- Helps optimize the balance between **number of read calls** and **memory usage**.

✅ Why It Matters

| Benefit                      | Explanation                                                                 |
| ---------------------------- | --------------------------------------------------------------------------- |
| **Performance Optimization** | Larger read sizes reduce the number of network calls, improving throughput. |
| **Memory Management**        | Controls how much memory is allocated for buffering during reads.           |
| **Smooth Streaming**         | Ensures efficient streaming of blob data with fewer pauses.                 |

📌 Typical Values

- Default values vary by SDK but usually range from **256 KB to 4 MB**.
- Can be adjusted based on application needs and available memory.

🔐 Best Practice

- Increase this value for large sequential reads to improve performance.
- Decrease it if memory usage needs to be minimized or for small reads.

📝 Summary

| Setting Name            | `StreamMinimumReadSizeInBytes`                     |
| ----------------------- | -------------------------------------------------- |
| Purpose                 | Minimum size to read from blob stream per call     |
| Effect                  | Balances network calls and memory use              |
| Default (SDK-dependent) | Typically 256 KB to 4 MB                           |
| Best Practice           | Tune based on workload size and memory constraints |

### 16. How to use AppendBlockBlobs ?

**What is an Append Blob?**

- Append blobs are optimized for **append operations**.
- You can only **add data to the end** of the blob.
- Ideal for logging, audit trails, and telemetry data.

**Using Azure SDK for .NET**

```csharp
using Azure.Storage.Blobs.Specialized;
using System.Text;
using System.Threading.Tasks;

var connectionString = "<your_connection_string>";
var containerName = "mycontainer";
var blobName = "logfile.txt";

var blobServiceClient = new BlobServiceClient(connectionString);
var containerClient = blobServiceClient.GetBlobContainerClient(containerName);

// Get the Append Blob client
var appendBlobClient = containerClient.GetAppendBlobClient(blobName);
```

**Create the Append Blob (if not exists)**

```
await appendBlobClient.CreateIfNotExistsAsync();
```

**Append Data to the Blob**

```
string logMessage = "This is a new log entry.\n";
byte[] byteArray = Encoding.UTF8.GetBytes(logMessage);

using var stream = new MemoryStream(byteArray);
await appendBlobClient.AppendBlockAsync(stream);
```

📝 Notes

- Append blobs only support **append operations**; you cannot modify existing content.
- Each append operation adds data to the **end** of the blob.
- Append blobs have a maximum size of about **195 GiB**.

📋 Summary

| Operation          | Method                   |
| ------------------ | ------------------------ |
| Create Append Blob | `CreateIfNotExistsAsync` |
| Append Data        | `AppendBlockAsync`       |

### 17. Can we update appendBlockBlob ?

❌ Can We Update Append Blobs?

- **No**, append blobs do **not support updating or modifying existing data** once written.
- You can **only append new data to the end** of an append blob using `AppendBlockAsync`.
- To modify content, you must:

        - Download the entire blob,
        - Make changes locally,
        - Then upload a new blob (replace the old one).

🔄 Summary

| Operation            | Supported?                       |
| -------------------- | -------------------------------- |
| Append data          | ✅ Yes                           |
| Update existing data | ❌ No                            |
| Delete data          | Only by deleting the entire blob |

Append blobs are designed primarily for **append-only scenarios** like logs and audit trails.

### 18. Explain “WritePages” and “Read” methods of page blobs ?

📄 What is a Page Blob?

- A Page Blob stores data optimized for **random read/write operations**.
- Data is organized in **512-byte pages**.
- Ideal for virtual machine disks, databases, or scenarios requiring frequent partial updates.

✍️ `WritePages` Method

- **Purpose:** Writes data to specific pages (offsets) within the page blob.
- **Key Features:**
  - Allows **random writes** at specified byte offsets.
  - Requires data length and offset to be aligned to 512-byte boundaries.
  - Efficient for updating parts of large blobs without rewriting the entire blob.
- **Usage Example:**

```csharp
// Parameters
long offset = 0; // must be multiple of 512
byte[] data = ...; // data to write, multiple of 512 bytes

using MemoryStream stream = new MemoryStream(data);
await pageBlobClient.WritePagesAsync(stream, offset);
```

**📖 Read Method**

- Purpose: Reads data from specified ranges (offset and length) of the page blob.

- Key Features:

            - Supports random reads from any offset.

            - Reads can be partial, allowing efficient access to portions of large blobs.

            - Offset and length should align to 512-byte boundaries for best performance.

**Usage Example:**

```
long offset = 0;    // byte offset to start reading from
long length = 512;  // number of bytes to read

var response = await pageBlobClient.ReadAsync(new HttpRange(offset, length));
using Stream stream = response.Value.Content;
// Process stream as needed

```

✅ Summary

| Method     | Purpose                        | Key Points                               |
| ---------- | ------------------------------ | ---------------------------------------- |
| WritePages | Write data to specific pages   | Random, aligned writes in 512-byte units |
| Read       | Read data from specific ranges | Random reads, efficient partial access   |

📌 Notes

- Both methods require **512-byte alignment** for offsets and lengths.
- Page blobs support **efficient random read/write**, unlike block blobs which are optimized for sequential writes.

### 19. What does “Seek” method do of page blob ?

- The `Seek` method is used when working with **streams** that represent page blobs.
- It **changes the current position** of the stream pointer to a specified location.
- This allows **reading from or writing to** different parts of the page blob without sequential access.

⚙️ How It Works

- The method takes an **offset** and a **reference point** (origin) which can be:

  - `Begin` — offset is from the start of the stream.
  - `Current` — offset is relative to the current position.
  - `End` — offset is from the end of the stream.

- After `Seek`, the next read or write operation will start from the new position.

📌 Importance in Page Blob Operations

- Page blobs support **random access** read/write.
- Using `Seek` lets you efficiently navigate to the exact page (512-byte aligned position) you want to read or write.
- Enables partial updates without needing to load or rewrite the entire blob.

📝 Example (C#)

```csharp
Stream pageBlobStream = await pageBlobClient.OpenWriteAsync(true);
pageBlobStream.Seek(1024, SeekOrigin.Begin); // Move to byte offset 1024
// Next write will start at byte 1024
```

✅ Summary

| Method | Purpose                                                                                  |
| ------ | ---------------------------------------------------------------------------------------- |
| Seek   | Moves the stream position to a specified offset, enabling random access to the blob data |
