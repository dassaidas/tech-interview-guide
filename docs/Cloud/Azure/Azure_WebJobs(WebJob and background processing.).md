**WebJob and background processing.**

### 1. Why WebJobs?

🤔 Why Use Azure WebJobs?

Azure WebJobs provide an easy way to run background tasks or scripts in the context of an Azure App Service (Web App). They simplify running scheduled or continuous jobs without managing separate infrastructure.

**Key Benefits of WebJobs**

- **Integrated with App Services:** Runs inside the same environment as your web app, sharing resources and scaling.
- **Simple to Deploy:** Deploy code or scripts alongside your web app without separate VM or service.

- **Multiple Execution Modes:**

        - Continuous: Runs continuously in the background.
        - Triggered: Runs on demand or scheduled (using Azure Scheduler or TimerTriggers).

- **Supports Various Languages:** Run .NET, PowerShell, Python, Node.js, and more.
- **Cost-Effective:** No need for separate VMs or services for background processing.
- **Easy Management:** Use Azure Portal or CLI to monitor, start, stop WebJobs.
- **Ideal for:**

         - Processing queues or blobs.
         - Scheduled maintenance tasks.
         - Data import/export.
         - Any background processing tasks related to your web app.

**When to Use WebJobs?**

- When you want to add background or scheduled jobs without extra infrastructure.
- When your background task is tightly coupled with your web app lifecycle.
- For lightweight to moderate background processing needs.

**Alternatives**

- For more complex or independent background processing, consider:

  - Azure Functions (serverless)
  - Azure Logic Apps
  - Azure Service Bus with worker roles or microservices

### 2. Types of Webjobs (Triggered, Continuos.)

🌀 Types of Azure WebJobs

Azure WebJobs run background tasks in an Azure App Service environment and come in two main types:

**1. Continuous WebJobs**

- **Runs:** Continuously in the background as long as the App Service is running.
- **Use Cases:** Real-time processing, long-running tasks, listening to queues or events.

- **Behavior:**

        - Starts automatically when the App Service starts.
        - Runs in an infinite loop or waits for events/messages.

- **Example:** Monitoring a queue for incoming messages to process.

**2. Triggered WebJobs**

- **Runs:** On-demand or on a schedule.
- **Use Cases:** Periodic tasks, batch jobs, maintenance scripts.

- **Behavior:**

        - Manually triggered via Azure Portal, API, or CLI.
        - Scheduled using Azure Scheduler or TimerTrigger (if using WebJobs SDK).

- **Example:** Nightly database cleanup or report generation.

  **Summary Table**

| Type              | Execution Mode | Trigger              | Common Use Cases            |
| ----------------- | -------------- | -------------------- | --------------------------- |
| Continuous WebJob | Always running | Starts automatically | Real-time queue processing  |
| Triggered WebJob  | Runs on demand | Manual or scheduled  | Scheduled maintenance tasks |

** Notes**

- Both types support various programming languages and scripts (.exe, .cmd, PowerShell, Python, etc.).
- Continuous jobs consume resources continuously, so use carefully to avoid excess cost.

### 3. View logs of WebJobs.

📄 How to View Logs of Azure WebJobs

Azure WebJobs provide built-in logging capabilities to monitor the execution and diagnose issues. Logs can be accessed through several methods.

Ways to View WebJob Logs

**1. Azure Portal**

- Navigate to your **App Service** in the Azure Portal.
- Select **WebJobs** under the **Settings** section.
- Click on the specific WebJob.

- Use the **Logs** tab to view output logs, including:

        - Invocation history
        - Console output
        - Error messages

** 2. Kudu Console**

- Go to your App Service's **Advanced Tools (Kudu)** by navigating to:

### 4. CRON expressions

⏰ CRON Expressions Overview

**What is a CRON Expression?**

- A **CRON expression** is a string used to define schedules for running tasks periodically.
- Commonly used in schedulers like **Azure WebJobs**, **Azure Functions TimerTrigger**, Linux cron jobs, Jenkins, etc.

**CRON Format (Standard 6 or 7 fields)**

| Field           | Allowed Values  | Description             |
| --------------- | --------------- | ----------------------- |
| Seconds         | 0-59            | Seconds                 |
| Minutes         | 0-59            | Minutes                 |
| Hours           | 0-23            | Hours (24-hour format)  |
| Day of Month    | 1-31            | Day of the month        |
| Month           | 1-12 or JAN-DEC | Month                   |
| Day of Week     | 0-6 or SUN-SAT  | Day of the week (0=Sun) |
| Year (optional) | 1970–2099       | Year (optional)         |

**Special Characters**

| Character | Meaning                                         |
| --------- | ----------------------------------------------- |
| \*        | All values                                      |
| ,         | Value list separator                            |
| -         | Range of values                                 |
| /         | Step values (increments)                        |
| ?         | No specific value (Day of Month or Day of Week) |
| L         | Last day of the week or month                   |
| W         | Nearest weekday                                 |
| #         | Nth day of the week of the month                |

**Example CRON Expressions**

| Expression            | Meaning                                   |
| --------------------- | ----------------------------------------- |
| `0 0 * * * *`         | Every hour at minute 0 and second 0       |
| `0 0 12 * * ?`        | Every day at 12:00 PM                     |
| `0 15 10 ? * MON-FRI` | At 10:15 AM every weekday (Mon-Fri)       |
| `0 0/5 * * * *`       | Every 5 minutes                           |
| `0 0 0 1 * ?`         | At midnight on the 1st day of every month |

**Notes**

- Azure Functions TimerTrigger uses a 6-field CRON (seconds included).
- Make sure to test CRON expressions with online tools like [crontab.guru](https://crontab.guru/).

### 5. Always on importance in continous webjob

🔄 Importance of "Always On" in Continuous WebJobs

**What is "Always On"?**

- **"Always On"** is an App Service setting that keeps your web app (and its associated WebJobs) running continuously, even when there is no HTTP traffic.
- By default, Azure may **idle** or **sleep** your app after a period of inactivity to save resources.

**Why is "Always On" Important for Continuous WebJobs?**

- **Continuous WebJobs require the app to be always running** to ensure the background job executes without interruption.

- If "Always On" is **disabled**:

        - The App Service may go idle after inactivity.
        - Continuous WebJobs will **stop running** until the app is accessed again.
        - This leads to missed processing, delays, or failure in real-time tasks.

  **Key Points**

| Aspect                            | Explanation                                                 |
| --------------------------------- | ----------------------------------------------------------- |
| Keeps App Active                  | Prevents app from unloading due to inactivity               |
| Ensures WebJob Runs               | Continuous WebJobs keep running as expected                 |
| Required for Real-time Processing | Necessary for tasks like queue monitoring, event processing |
| Only Applies to App Service Plans | Not available for Free or Shared tiers                      |

**How to Enable "Always On"**

1. Go to your App Service in the Azure Portal.
2. Under **Settings**, select **Configuration**.
3. Select the **General settings** tab.
4. Set **Always On** to **On**.
5. Save the changes.

**Summary**

- For reliable execution of **Continuous WebJobs**, always enable **Always On**.
- Without it, your continuous background tasks may be paused, causing unexpected downtime.

### 6. Storage accounts in Webjobs

💾 Storage Accounts in Azure WebJobs

**Overview**

- Azure WebJobs often rely on **Azure Storage Accounts** to enable messaging, state management, and logging.
- Storage accounts provide:

  - **Queues:** For triggering and coordinating WebJobs.
  - **Blobs:** For storing input/output data.
  - **Tables:** For storing metadata or state information.

**Role of Storage Accounts in WebJobs**

| Feature                  | Purpose                                                                                   |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| **Queue Storage**        | WebJobs SDK can listen to Azure Queues to trigger job execution (e.g., process messages). |
| **Blob Storage**         | Input/output bindings for file processing or status data.                                 |
| **Table Storage**        | Store execution logs, checkpoints, or metadata for WebJobs.                               |
| **Logging & Monitoring** | WebJobs SDK uses storage accounts to persist logs and runtime status.                     |

**Why Use Storage Accounts with WebJobs?**

- **Triggering:** Many WebJobs run in response to queue messages or blob changes.
- **Scalability:** Storage queues decouple producers and consumers for load leveling.
- **Durability:** Durable storage ensures reliable processing and retry mechanisms.
- **Monitoring:** Tracks job executions and failures for diagnostics.

  **Configuration**

- WebJobs SDK requires a **connection string** to an Azure Storage Account.
- This is usually set in the `appsettings.json` or Azure Portal under **Application Settings** as `AzureWebJobsStorage`.
- Example connection string format:

**DefaultEndpointsProtocol=https;AccountName=youraccount;AccountKey=yourkey;EndpointSuffix=core.windows.net**

**Best Practices**

- Use a **separate storage account** for WebJobs to isolate workload and improve security.
- Enable **soft delete and lifecycle management** on storage to protect and manage data.
- Monitor storage account usage and scale accordingly.

**Summary**

| Aspect        | Description                                 |
| ------------- | ------------------------------------------- |
| Storage Types | Queues, Blobs, Tables                       |
| Purpose       | Triggering, state management, logging       |
| Configuration | Connection string via `AzureWebJobsStorage` |
| Best Practice | Use dedicated storage accounts for WebJobs  |

### 7. Publish website and webjob using VS

🚀 Publish Website and WebJob Using Visual Studio

**Prerequisites**

- Visual Studio installed with **Azure development workload**.
- Azure subscription with an existing **App Service**.
- Website and WebJob projects ready in your solution.

**Steps to Publish Website and WebJob**

**1. Prepare Your WebJob**

- Add your WebJob project to the solution (Console App recommended).
- Right-click the **WebJob project** > **Properties** > Ensure output type is **Console Application**.
- Add the WebJob project as a **WebJob** to your Web App project:

        - Right-click your **Web App project** > **Add** > **Existing Project as Azure WebJob** (in newer VS versions, or manually configure).

- In **Web App project’s** properties, under **Azure WebJobs** tab, ensure the WebJob is configured to deploy with the web app.

**2. Publish the Web App and WebJob**

- Right-click on your **Web App project** > **Publish**.
- Choose **Azure** as the target.
- Select the appropriate **App Service** or create a new one.
- In the **Publish** settings, make sure the WebJob is included.
- Click **Publish**.

**3. Verify Deployment**

- After publishing, go to the Azure Portal.
- Navigate to your **App Service**.
- Under **Settings**, click **WebJobs**.
- You should see your WebJob listed and its status (Running, Stopped).
- You can view logs, start, stop, or run the WebJob manually from the portal.

**Tips**

- For **Continuous WebJobs**, ensure **Always On** is enabled in the App Service settings.
- For **Triggered WebJobs**, you can run them manually or schedule via Azure Scheduler.
- Use **Application Settings** in Azure Portal to configure connection strings or environment variables.
- Use **Publish Profiles** to save and reuse publish configurations.

**Summary Table**

| Step                   | Description                                     |
| ---------------------- | ----------------------------------------------- |
| Add WebJob project     | Create and prepare console app as WebJob        |
| Link WebJob to Web App | Configure in Web App project to deploy WebJob   |
| Publish Web App        | Use Visual Studio Publish wizard to deploy both |
| Verify in Azure Portal | Check WebJob status and logs                    |
