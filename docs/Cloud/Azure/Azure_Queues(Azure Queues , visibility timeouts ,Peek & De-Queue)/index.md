**Azure Queues , visibility timeouts ,Peek & De-Queue.**

### 1. What is the need of Queues?

🔑 Purpose of Queues

- **Decouple application components:**  
  Queues enable different parts of a system to communicate asynchronously without tight coupling.

- **Buffering and load leveling:**  
  They smooth out bursts of work by buffering requests, preventing system overload.

- **Reliable message delivery:**  
  Ensure that messages are stored durably until processed, even if consumers are temporarily unavailable.

- **Enable asynchronous processing:**  
  Producers can send messages and continue working without waiting for consumers to finish processing.

- **Improve scalability:**  
  Multiple consumers can process messages concurrently, improving throughput and scalability.

📌 Common Use Cases

- Task scheduling and background processing
- Communication between microservices
- Workload distribution in distributed systems
- Event-driven architectures and workflows

✅ Summary

| Need                    | Explanation                                  |
| ----------------------- | -------------------------------------------- |
| Decoupling              | Enables loose coupling between components    |
| Load leveling           | Buffers spikes in workload                   |
| Reliability             | Guarantees message delivery                  |
| Asynchronous processing | Allows non-blocking communication            |
| Scalability             | Supports parallel and distributed processing |

### 2. What is FIFO in Queues?

🔑 Definition

- **FIFO** stands for **First-In, First-Out**.
- It is a message processing order where the **first message added to the queue is the first one to be processed**.
- Ensures messages are handled in the exact order they were received.

⚙️ How FIFO Works in Queues

- Messages are enqueued (added) at the **tail**.
- Messages are dequeued (removed) from the **head**.
- Guarantees **ordered processing**, critical for workflows requiring sequence integrity.

📌 Importance of FIFO

- Maintains **data consistency** when order matters.
- Prevents **out-of-order processing** that could cause errors or incorrect results.
- Vital for scenarios like:

        - Transaction processing
        - Event sourcing
        - Workflow orchestration

✅ Summary

| Term    | Meaning                            |
| ------- | ---------------------------------- |
| FIFO    | First-In, First-Out processing     |
| Purpose | Process messages in order received |

### 3. How to add message read the next record?

➕ How to Add a Message and Read the Next Record in Azure Queue Storage (C#)

**1. Add a Message to the Queue**

```csharp
using Azure.Storage.Queues;
using System;
using System.Threading.Tasks;

string connectionString = "<your_connection_string>";
string queueName = "myqueue";

var queueClient = new QueueClient(connectionString, queueName);

// Ensure queue exists
await queueClient.CreateIfNotExistsAsync();

string messageText = "Hello, Azure Queue!";

// Add message to the queue
await queueClient.SendMessageAsync(messageText);
Console.WriteLine("Message added to queue.");
```

**2. Read the Next Message from the Queue**

```
// Receive the next message (peek-lock)
var receivedMessage = await queueClient.ReceiveMessageAsync();

if (receivedMessage.Value != null)
{
    Console.WriteLine($"Dequeued message: {receivedMessage.Value.MessageText}");

    // Process message here...

    // Delete message after processing to remove it from the queue
    await queueClient.DeleteMessageAsync(receivedMessage.Value.MessageId, receivedMessage.Value.PopReceipt);
}
else
{
    Console.WriteLine("No messages in queue.");
}
```

📝 Notes

- `ReceiveMessageAsync()` retrieves one message with a default visibility timeout (message becomes invisible temporarily).
- After processing, delete the message to prevent it from becoming visible again.
- You can receive multiple messages using `ReceiveMessagesAsync(int maxMessages)`.

📋 Summary

| Operation                | Method                  |
| ------------------------ | ----------------------- |
| Add message              | `SendMessageAsync()`    |
| Read next message        | `ReceiveMessageAsync()` |
| Delete processed message | `DeleteMessageAsync()`  |

### 4. Does PeekMessage read the next record?

📘 What is `PeekMessage`?

- `PeekMessage` **retrieves a message from the queue without changing its visibility**.
- It **does NOT dequeue** the message; the message remains visible and available to other consumers.
- Useful for **inspecting the next message** without removing it from the queue.

  ⚙️ How It Differs from `ReceiveMessage`

| Method           | Behavior                                                              |
| ---------------- | --------------------------------------------------------------------- |
| `ReceiveMessage` | Retrieves and temporarily hides the message (locks it) for processing |
| `PeekMessage`    | Retrieves the message without locking or hiding it                    |

🔑 Key Points

- `PeekMessage` lets you **read the next message without affecting the queue state**.
- It does **not** remove or mark the message as processed.
- The same message can be peeked multiple times by multiple consumers.

✅ Summary

| Method           | Reads Next Record? | Removes from Queue? | Changes Visibility? |
| ---------------- | ------------------ | ------------------- | ------------------- |
| `PeekMessage`    | Yes                | No                  | No                  |
| `ReceiveMessage` | Yes                | No (until deleted)  | Yes (locks message) |

### 5. How to do a De-queue in Queues?

Steps to Dequeue (Read & Remove) a Message

1. **Receive the message** (makes it invisible temporarily).
2. **Process the message** as needed.
3. **Delete the message** from the queue to complete dequeue.

```csharp
using Azure.Storage.Queues;
using System;
using System.Threading.Tasks;

string connectionString = "<your_connection_string>";
string queueName = "myqueue";

var queueClient = new QueueClient(connectionString, queueName);
await queueClient.CreateIfNotExistsAsync();

// Receive the next message
var receivedMessage = await queueClient.ReceiveMessageAsync();

if (receivedMessage.Value != null)
{
    Console.WriteLine($"Dequeued message: {receivedMessage.Value.MessageText}");

    // Process your message here

    // Delete message to remove it permanently from the queue
    await queueClient.DeleteMessageAsync(receivedMessage.Value.MessageId, receivedMessage.Value.PopReceipt);
}
else
{
    Console.WriteLine("No messages available to dequeue.");
}
```

📝 Notes

- The visibility timeout prevents other consumers from processing the same message simultaneously.
- If you don't delete the message after processing, it becomes visible again once the timeout expires.

📋 Summary

| Operation       | Method                  |
| --------------- | ----------------------- |
| Receive message | `ReceiveMessageAsync()` |
| Delete message  | `DeleteMessageAsync()`  |

### 6. Explain visibility time out concept?

🔑 What is Visibility Timeout?

- When a message is received (dequeued) from a queue, it becomes **invisible to other consumers** for a specific period called the **visibility timeout**.
- During this time, the receiver can **process the message without other consumers seeing or processing it**.
- If the message is **deleted before the timeout expires**, it is permanently removed from the queue.
- If not deleted within the timeout, the message becomes **visible again** and can be processed by other consumers.

⚙️ How It Works

1. **Message retrieved** by a consumer using `ReceiveMessageAsync()`.
2. Message is **hidden (invisible)** from other consumers for the visibility timeout duration.
3. Consumer processes the message.
4. Consumer **deletes the message** upon successful processing.
5. If consumer fails to delete the message, it **reappears** in the queue after the timeout for retry.

📌 Importance

- Prevents **duplicate processing** of the same message by multiple consumers.
- Supports **reliable processing** with automatic retries on failure.
- Allows **scaling** with multiple consumers processing messages independently.

📝 Default and Configurable

- Default visibility timeout is typically **30 seconds** but can be configured up to **7 days**.
- Can be set per message when receiving or updated dynamically.

✅ Summary

| Concept            | Description                                            |
| ------------------ | ------------------------------------------------------ |
| Visibility Timeout | Period a message is hidden after being dequeued        |
| Purpose            | Prevents concurrent processing and ensures reliability |
| Behavior           | Message reappears if not deleted within timeout        |

### 7. How is GetMessage different from Peek?

📘 GetMessage

- **Also known as:** `ReceiveMessageAsync()` in Azure SDK.
- **Purpose:** Retrieves and locks the next message for processing.
- **Behavior:**
  - Message becomes **invisible** to other consumers for the duration of the **visibility timeout**.
  - Requires **explicit deletion** after processing to remove it from the queue.
- **Use Case:** When you want to **process and then remove** the message from the queue.

👀 PeekMessage

- **Also known as:** `PeekMessageAsync()`
- **Purpose:** Inspects the next message **without locking or removing** it.
- **Behavior:**
  - Message remains **visible** to other consumers.
  - No effect on message state or visibility.
- **Use Case:** When you just want to **look at the message** without affecting queue processing.

✅ Summary

| Feature            | `GetMessage` (`ReceiveMessageAsync`) | `PeekMessage` (`PeekMessageAsync`) |
| ------------------ | ------------------------------------ | ---------------------------------- |
| Reads next message | ✅ Yes                               | ✅ Yes                             |
| Locks message      | ✅ Yes                               | ❌ No                              |
| Removes message    | ❌ No (until deleted manually)       | ❌ No                              |
| Affects visibility | ✅ Temporarily hides message         | ❌ No impact                       |
| Use case           | For processing and removing messages | For inspecting messages only       |

### 8. How to read bulk messages from Queues?

🔄 Use `ReceiveMessagesAsync(int maxMessages)` Method

- Azure Queue Storage allows you to retrieve up to **32 messages at a time** using:

```
  ReceiveMessagesAsync(maxMessages: 32)
  using Azure.Storage.Queues;
  using System;
  using System.Threading.Tasks;
  string connectionString = "<your_connection_string>";
  string queueName = "myqueue";
  var queueClient = new QueueClient(connectionString, queueName);
  await queueClient.CreateIfNotExistsAsync();
  // Read up to 10 messages in one call
  var messages = await queueClient.ReceiveMessagesAsync(maxMessages: 10);
  foreach (var message in messages.Value)
  {
  Console.WriteLine($"Message: {message.MessageText}");

    // Process and delete
    await queueClient.DeleteMessageAsync(message.MessageId, message.PopReceipt);
  }

```

📌 Notes

- Maximum `maxMessages` allowed: **32** per request.
- Each message becomes **temporarily invisible** (default: 30 seconds) unless deleted.
- Always call `DeleteMessageAsync()` after processing each message to **prevent reprocessing**.

📋 Summary

| Operation           | Method                              |
| ------------------- | ----------------------------------- |
| Read bulk messages  | `ReceiveMessagesAsync(maxMessages)` |
| Delete each message | `DeleteMessageAsync()`              |

### 9. By default In GetMessage visibility time out \_\_\_seconds.

- By default, when using `GetMessage` / `ReceiveMessageAsync()` in Azure Queue Storage:
  - The **visibility timeout is 30 seconds**.

📌 What This Means

- After receiving a message, it becomes **invisible to other consumers** for 30 seconds.
- If not deleted within that time, the message **reappears** in the queue and may be reprocessed.

✅ Summary

| Setting            | Default Value |
| ------------------ | ------------- |
| Visibility Timeout | 30 seconds    |

### 10. How to update a message?

🔄 How to Update a Message in Azure Queue Storage (C#)

🛠️ Purpose

- Use `UpdateMessageAsync()` to **modify the content** of an existing message **without removing it** from the queue.
- You can also optionally **reset the visibility timeout**.

✅ Example Code

```
using Azure.Storage.Queues;
using System;
using System.Threading.Tasks;

string connectionString = "<your_connection_string>";
string queueName = "myqueue";

var queueClient = new QueueClient(connectionString, queueName);
await queueClient.CreateIfNotExistsAsync();

// Step 1: Get the message
var received = await queueClient.ReceiveMessageAsync();

if (received.Value != null)
{
    string newContent = "Updated message content";

    // Step 2: Update the message
    await queueClient.UpdateMessageAsync(
        received.Value.MessageId,
        received.Value.PopReceipt,
        newContent,
        TimeSpan.FromSeconds(0) // Make it immediately visible again
    );

    Console.WriteLine("Message updated.");
}
```

📌 Notes

- You must provide both the **MessageId** and **PopReceipt**.
- The **PopReceipt** changes each time the message is accessed; use the **most recent one**.
- You can also update the **visibility timeout** to delay re-processing.

📋 Summary

| Operation        | Method                 | Requirement            |
| ---------------- | ---------------------- | ---------------------- |
| Update a message | `UpdateMessageAsync()` | MessageId + PopReceipt |

### 11. What is the MessageUpdateField meant for?

🧾 What is `MessageUpdateFields` Used For?

📘 Definition

- `MessageUpdateFields` is an **enumeration** in the Azure Queue SDK.
- It specifies **which parts of a queue message** should be updated when calling `UpdateMessageAsync()`.

🔧 Options

| Enum Value          | Meaning                                    |
| ------------------- | ------------------------------------------ |
| `None`              | Do not update any field                    |
| `Content`           | Update the message text only               |
| `VisibilityTimeout` | Update the visibility timeout only         |
| `All`               | Update both content and visibility timeout |

🛠️ Usage Example

```
await queueClient.UpdateMessageAsync(
    messageId: msg.MessageId,
    popReceipt: msg.PopReceipt,
    messageText: "Updated content",
    visibilityTimeout: TimeSpan.FromSeconds(0),
    MessageUpdateFields.All
);
```

📌 Notes

- `MessageUpdateFields` gives **fine-grained control** over what gets updated.
- Defaults to **All** if not specified.

✅ Summary

| Field               | Purpose                          |
| ------------------- | -------------------------------- |
| `Content`           | Updates the message body         |
| `VisibilityTimeout` | Changes the reappearance delay   |
| `All`               | Updates both content and timeout |

### 12. What is importance of MessageId and Popreceiptid?

🆔 Importance of `MessageId` and `PopReceipt` in Azure Queues

📘 What is `MessageId`?

- A **unique identifier** assigned to each message when it is added to the queue.
- Used to **target a specific message** for operations like delete or update.

🔐 What is `PopReceipt`?

- A **token (receipt)** generated each time a message is retrieved using `ReceiveMessageAsync()`.
- Ensures that only the **current processor** of the message can delete or update it.
- Acts like a **proof-of-access** to prevent race conditions in distributed systems.

🛠️ Why Both Are Required?

| Reason                        | Explanation                                                                                          |
| ----------------------------- | ---------------------------------------------------------------------------------------------------- |
| Message identification        | `MessageId` tells **which message** to operate on                                                    |
| Safe concurrency & versioning | `PopReceipt` ensures that only the **latest owner** of the message can change it                     |
| Prevents accidental deletion  | If a message was retrieved earlier but not yet processed, a new `PopReceipt` is issued upon re-fetch |

✅ Summary

| Property     | Purpose                              |
| ------------ | ------------------------------------ |
| `MessageId`  | Uniquely identifies a message        |
| `PopReceipt` | Authorizes and secures update/delete |
