# Azure step by step

## 1. Define SSAS, PAAS and IAAS ?

Cloud computing offers different levels of service models to fit various needs. The three primary models are:

| Feature      | SaaS                    | PaaS                             | IaaS                        |
| ------------ | ----------------------- | -------------------------------- | --------------------------- |
| Use Case     | End-user applications   | App development & deployment     | Full infrastructure control |
| Managed By   | Provider                | Shared (provider + developer)    | Mostly user                 |
| User Manages | Just usage (no backend) | Code & app config                | OS, middleware, app, data   |
| Examples     | Gmail, Zoom, Salesforce | Heroku, App Engine, Azure AppSvc | EC2, Azure VM, GCP Compute  |

---

> ✅ **SaaS** is best for end users.  
> 👨‍💻 **PaaS** is for developers.  
> 🛠️ **IaaS** is for sysadmins and architects.

### 2. How is cloud different from normal webhosting ?

| Feature            | Traditional Hosting         | Cloud Hosting              |
| ------------------ | --------------------------- | -------------------------- |
| **Infrastructure** | Single physical server      | Cluster of virtual servers |
| **Scalability**    | Limited/manual              | Auto-scalable              |
| **Uptime**         | Low (server failure = down) | High (failover built-in)   |
| **Cost**           | Fixed pricing               | Pay-as-you-use             |
| **Performance**    | Affected by neighbors       | Load-balanced              |
| **Best For**       | Small/static sites          | Scalable, dynamic apps     |

### 3. Explain the 2 big O’s in cloud ?

| Concept                    | Description                                 | Real-World Analogy              |
| -------------------------- | ------------------------------------------- | ------------------------------- |
| **On-Demand**              | Provision resources instantly when needed   | Like streaming movies (no DVDs) |
| **Operatinal Expenditure** | Pay for usage instead of upfront investment | Like paying utility bills       |

### 4. What is a resource and why do we need Resource groups ?

- Understanding Resources and Resource Groups in Cloud Computing

**What is a Resource?**

**Definition:**  
A **resource** is any manageable item available in your cloud environment. These are individual services that you create, manage, and pay for.

**Examples of Resources:**

- Virtual Machines (VMs)
- Storage Accounts
- SQL Databases
- Web Apps
- Virtual Networks (VNet)
- Kubernetes Clusters

Each resource represents a **single service** that performs a specific function.

**What is a Resource Group?**

**Definition:**  
A **Resource Group** is a **logical container** that holds related cloud resources. It helps organize and manage them as a unit.

**Why Do We Need Resource Groups?**

### 1. **Logical Organization**

Group resources by application, environment (dev/test/prod), or project. Makes it easier to locate and manage related items.

### 2. **Unified Management**

Apply permissions, tags, and policies at the group level. This ensures consistency across all resources inside it.

### 3. **Simplified Monitoring & Billing**

Monitor usage, set budgets, and track costs at the resource group level.

### 4. **Efficient Deployment**

Deploy, update, or delete all resources in a group together using templates (e.g., ARM or Bicep templates).

### 5. **Access Control**

Assign **role-based access** (RBAC) to an entire group, ensuring users can only interact with the resources they’re allowed to manage.

---

## Example

Let’s say you’re building a web application called `MyApp`.

You could create a resource group named `MyApp-RG`, and include:

- `MyApp-VM` (Virtual Machine)
- `MyApp-SQL` (Database)
- `MyApp-Storage` (Blob Storage)
- `MyApp-WebApp` (App Service)

All of these resources will be grouped logically, and you can manage them together.

---

## Summary

| Term               | Description                               | Example                        |
| ------------------ | ----------------------------------------- | ------------------------------ |
| **Resource**       | A cloud service instance                  | Azure VM, SQL DB, Blob Storage |
| **Resource Group** | A logical container for related resources | Group for `MyApp` services     |

**Think of a **Resource Group** as a folder, and **Resources** as the files inside it.**

### 5. What is the importance of Resource group location ?

When creating a **Resource Group** in Azure, you're asked to specify a **location (region)** — but why does it matter?

## What Is a Resource Group Location?

The **location** of a resource group refers to the **region where the metadata** for that group is stored.  
It does **not dictate** where all the resources inside must reside.

## Why Is Resource Group Location Important?

### 1. **Metadata Storage**

The region determines where the **deployment data, management info, and tags** for the resource group are stored.

### 2. **Resource Deployment**

- Resources **can be deployed in any region**, regardless of the resource group's location.
- But some **services (like Azure Managed Identity, automation, or policy enforcement)** may rely on the resource group’s region.

### 3. **Compliance & Governance**

If your organization has **data residency** or **compliance requirements**, storing metadata in a specific region may be necessary.

### 4. **Availability & Disaster Recovery**

In case of a regional outage:

- The ability to **manage or update** resources might be affected if the **resource group’s location is down**, even if the actual resource is in a healthy region.

### 5. **Consistency in Deployment Templates**

Some ARM templates or scripts may use the resource group’s location as a default value for deploying resources.

---

## Example Scenario

You create a resource group `MyApp-RG` in **East US**.

- You deploy a **VM** in **West US** and a **SQL DB** in **East US 2** — both are valid.
- However, metadata like access policies or tags for `MyApp-RG` are stored in **East US**.
- If **East US** is down, you might not be able to update or delete the group until it's restored.

---

## Best Practice

- Choose a **stable and compliant region** for the resource group location.
- If most of your resources are in a specific region, align the resource group with that region to reduce latency and simplify deployment.

---

## Summary Table

| Aspect                  | Impact of Resource Group Location            |
| ----------------------- | -------------------------------------------- |
| **Metadata Storage**    | Determines where group metadata is stored    |
| **Resource Deployment** | Resources can live in any region             |
| **Outage Impact**       | Managing group may fail if location is down  |
| **Compliance**          | Important for legal/data governance          |
| **Template Defaults**   | Used in scripts to default resource location |

---

> **Note:** Resource group location ≠ resource location — but it still plays a key role in stability and governance.

### 6. What are app services ?

**Azure App Service** is a fully managed Platform-as-a-Service (PaaS) offering from Microsoft Azure that allows developers to build, deploy, and scale web applications and APIs quickly and efficiently.

It supports multiple programming languages and frameworks, including:

- ASP.NET / .NET Core
- Java
- Node.js
- PHP
- Python
- Ruby
- Custom containers (Docker, Linux)

---

## ✅ Key Benefits

| Feature                            | Description                                                                                              |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Fully Managed Hosting**          | No need to manage infrastructure — Microsoft handles OS, server patching, scaling, and security updates. |
| **Built-in CI/CD**                 | Integration with GitHub, Azure DevOps, and Bitbucket for continuous integration and deployment.          |
| **Scaling Options**                | Automatically scale your application based on demand or schedule.                                        |
| **Global Availability**            | Deploy to data centers around the world for high availability.                                           |
| **Custom Domains & SSL**           | Easily configure your own domain name and secure your app with HTTPS.                                    |
| **Monitoring and Logging**         | Built-in tools for diagnostics, logging, and performance monitoring using Application Insights.          |
| **Authentication & Authorization** | Built-in user authentication with Azure AD, Facebook, Google, Twitter, etc.                              |

---

## 🧱 App Service Types

| Type            | Description                                                                     |
| --------------- | ------------------------------------------------------------------------------- |
| **Web Apps**    | Host websites and web applications using .NET, Java, Node.js, Python, PHP, etc. |
| **API Apps**    | Host RESTful APIs with Swagger/OpenAPI support.                                 |
| **Mobile Apps** | Backend services for mobile applications with offline sync, push notifications. |
| **WebJobs**     | Run background tasks triggered by events or on schedules.                       |

---

## 🛠️ Hosting Plans

| Plan                    | Use Case                                                      |
| ----------------------- | ------------------------------------------------------------- |
| **Free (F1)**           | Basic development and testing                                 |
| **Shared (D1)**         | Shared resources for simple workloads                         |
| **Basic (B1-B3)**       | Dedicated compute for dev/test                                |
| **Standard (S1-S3)**    | Production-ready with autoscaling and SSL                     |
| **Premium (P1v3-P3v3)** | High performance with VNET support                            |
| **Isolated (I1-I3)**    | Apps needing high security, compliance, and network isolation |

---

## 🚀 Use Cases

- Hosting public-facing websites and portals
- Deploying RESTful APIs
- Running internal line-of-business applications
- Building backend systems for mobile or IoT apps
- Migrating on-premise .NET web apps to the cloud

---

## 📦 Supported Deployment Methods

- Visual Studio / VS Code
- Azure CLI / PowerShell
- GitHub Actions / Azure DevOps Pipelines
- FTP / FTPS
- Zip deploy
- Container Registry (ACR / Docker Hub)

---

## 🔐 Security Features

- Managed Identity integration for secure Azure resource access
- VNET integration (Premium/Isolated tiers)
- TLS/SSL certificates with automatic renewal
- App-level authentication and RBAC
- Azure Key Vault support for secret management

---

## 📈 Monitoring and Diagnostics

Azure App Services integrates with:

- **Azure Monitor**
- **Application Insights**
- **Log Analytics**

Provides insights into:

- Request/response times
- Error tracking
- Memory and CPU usage
- Dependency tracking (e.g., DB calls)

## Summary

Azure App Services is ideal for developers and teams who want to focus on **code**, not infrastructure. It delivers a fast, secure, and scalable environment for hosting modern web applications and APIs.

---

### 7. Which appservice will you choose to host a website ?

Azure App Service provides different types of hosting plans to suit a variety of web application needs. When choosing an App Service plan to host a website, consider factors such as performance, scalability, traffic, budget, and required features.

✅ Recommended App Service Plan for Hosting a Website

### **App Service Plan: Basic / Standard / Premium (Windows or Linux)**

- **Use Case**: Hosting production websites with moderate to high traffic, requiring custom domains, SSL, scaling, and deployment slots.
- **Recommendation**: Use **Standard (S1/S2/S3)** or **Premium (P1v3/P2v3)** for best performance and features.

---

## 🔍 App Service Plan Options

| Plan Type                    | Description                                                     | Ideal For                            |
| ---------------------------- | --------------------------------------------------------------- | ------------------------------------ |
| **Free (F1)**                | Shared compute; limited resources, no custom domains or SSL.    | Testing, learning, non-public        |
| **Shared (D1)**              | Shared infrastructure; basic scaling.                           | Low-traffic dev/test apps            |
| **Basic (B1/B2/B3)**         | Dedicated VMs, custom domain support.                           | Small production workloads           |
| **Standard (S1/S2/S3)**      | Autoscaling, staging slots, custom domains + SSL.               | Business websites, web APIs          |
| **Premium (P1v3/P2v3)**      | Faster processors, VNet integration, autoscaling, more slots.   | High-traffic websites                |
| **Isolated (I1/I2/I3)**      | Runs in VNet with dedicated environment (ASE).                  | Secure, compliance-heavy apps        |
| **Container (Linux Docker)** | Host web apps in Docker containers using App Service for Linux. | Microservices & container-based apps |

---

## 🎯 Hosting Static Sites?

- Use **Azure Static Web Apps** if you are hosting a static site (HTML/CSS/JS) with optional backend via Azure Functions.
- Benefits: Global CDN, GitHub/Azure DevOps integration, custom domain & SSL.

---

## ✅ Example: Ideal App Services for Common Website Types

| Website Type            | Recommended Plan              |
| ----------------------- | ----------------------------- |
| Personal blog           | Free or Basic                 |
| Business landing page   | Basic or Standard             |
| E-commerce website      | Standard or Premium           |
| High-traffic CMS        | Premium or Isolated           |
| React/Angular SPA + API | Static Web App + Premium Plan |

---

## 📌 Additional Considerations

- **Platform**: Choose **Linux** for Node.js, Python, PHP apps or Dockerized apps. Use **Windows** for .NET Framework apps.
- **Scaling**: Standard and above support **Auto Scaling** and **Deployment Slots**.
- **Networking**: Premium and Isolated plans support **VNet Integration**.

---

## 💡 Final Recommendation

If you're deploying a typical production-ready website (e.g. using React, Angular, or ASP.NET), go with:

```bash
App Service Plan: **Standard S1** or **Premium P1v3**
OS: **Linux** (preferred for container support and lower cost)

```

### 8. What is the importance of Service plan and pricing tier?

When deploying a web application on **Azure App Services**, choosing the **right App Service Plan and Pricing Tier** is crucial. It directly impacts your app's **performance, scalability, availability, cost, and feature set**.

---

## 📌 1. What is an App Service Plan?

An **App Service Plan** defines:

- **How much** your app pays (pricing tier)
- **What kind** of resources are available (CPU, memory, storage)
- **How** your app runs (Windows/Linux, regional deployment)
- **How many** apps you can host in the same plan

---

## 💡 2. Importance of Choosing the Right Pricing Tier

### ✅ **Performance and Resources**

- Higher tiers offer **more CPU, memory, and storage**.
- Directly affects how many users your site can handle without crashing.

| Tier     | CPU & Memory | Scaling | Ideal For                         |
| -------- | ------------ | ------- | --------------------------------- |
| Free     | Very Low     | None    | Learning/testing                  |
| Basic    | Low          | Manual  | Low-traffic apps                  |
| Standard | Medium       | Auto    | Production apps                   |
| Premium  | High         | Auto    | High-traffic or enterprise apps   |
| Isolated | Very High    | Auto    | Secure, VNet-integrated workloads |

---

### 🔐 **Features and Capabilities**

- Only certain tiers support **custom domains**, **SSL**, **auto-scaling**, **staging slots**, **VNet integration**, etc.

| Feature          | Free | Basic | Standard | Premium | Isolated |
| ---------------- | ---- | ----- | -------- | ------- | -------- |
| Custom Domain    | ❌   | ✅    | ✅       | ✅      | ✅       |
| SSL Support      | ❌   | ✅    | ✅       | ✅      | ✅       |
| Auto-scaling     | ❌   | ❌    | ✅       | ✅      | ✅       |
| Staging Slots    | ❌   | ❌    | ✅ (5)   | ✅ (20) | ✅ (20)  |
| VNet Integration | ❌   | ❌    | ✅       | ✅      | ✅       |

---

### 💰 **Cost Optimization**

- Underprovisioning can lead to **performance issues**, while overprovisioning leads to **unnecessary cost**.
- Pricing tier affects **billing per hour** whether the app is being used or not.

> ⚠️ You are billed for the entire App Service Plan, not per app. All apps hosted under the same plan share the same resources.

---

### 🔄 **Scalability**

- Only Standard and higher tiers support **horizontal scaling** (adding more instances).
- Needed when your website gets **high traffic** or needs **high availability**.

---

### 🛠️ **DevOps and CI/CD Support**

- Deployment slots (Standard+) allow **zero-downtime deployments** and easy **rollback**.
- Premium tiers support **more slots**, ideal for **multi-stage environments** (dev/stage/prod).

---

## 🎯 Final Thoughts

Choosing the right App Service Plan and Pricing Tier ensures:

- ✅ Optimal user experience
- ✅ Reliable performance under load
- ✅ Cost-effective infrastructure
- ✅ Access to enterprise-level features

> 🔽 **Recommendation**:
> For most production web apps, start with **Standard S1** or **Premium P1v3**, and scale based on usage and growth.

---

### 9. How to upload a site by using FTP on Azure ?

Azure App Service provides FTP/S access to deploy website files manually. This method is especially useful for uploading static content or performing quick file edits.

---

## 📁 Prerequisites

- An Azure App Service Web App is already created.
- Your website files (e.g., HTML, CSS, JS, etc.) are ready.
- An FTP client like **FileZilla**, **WinSCP**, or **Visual Studio Code with FTP extension**.

---

## 🔐 Step 1: Get FTP Deployment Credentials

1. Go to the **Azure Portal** → **App Services** → Select your Web App.
2. Under **Deployment** > click **Deployment Center** (or **FTP** tab).
3. Click on **User Credentials** or **Application Scope Credentials**.
4. Take note of:
   - **FTP Hostname**
   - **FTP Username**
   - Set or view your **FTP Password**

Alternatively, under **"Overview" → "Essentials"**, note down the **FTP/FTPS hostname**.

---

## 💾 Step 2: Prepare FTP Client (Example: FileZilla)

1. Open **FileZilla**.
2. Go to **File → Site Manager** and add a new site:

   - **Protocol**: FTP or FTPS (recommended)
   - **Host**: `<yourappname>.ftp.azurewebsites.windows.net`
   - **Port**: 21 (FTP) or 990 (FTPS)
   - **Logon Type**: Normal
   - **User**: `\<app-name>\$\<username>` (from Azure)
   - **Password**: Your FTP password

3. Click **Connect**.

---

## 📂 Step 3: Upload Website Files

1. Once connected, navigate to: /site/wwwroot/

This is the root folder of your web app.

2. On the left panel, browse your local site files.

3. Drag and drop your website files into the `/site/wwwroot` directory.

> ⚠️ Uploading files here **overwrites** existing content. Be cautious when deploying to a live site.

---

## ✅ Step 4: Verify the Upload

- Go to your web app's URL in a browser: This is the root folder of your web app.

2. On the left panel, browse your local site files.

3. Drag and drop your website files into the `/site/wwwroot` directory.

> ⚠️ Uploading files here **overwrites** existing content. Be cautious when deploying to a live site.

---

## ✅ Step 4: Verify the Upload

- Go to your web app's URL in a browser: https://<yourappname>.azurewebsites.net

- You should see your uploaded site running live.

---

## 🔄 Optional: Enable FTP Logs

If facing issues, enable diagnostic logs:

1. Go to **App Service → Monitoring → App Service logs**.
2. Enable **Application Logging (Filesystem)** and **FTP Logs** for troubleshooting.

---

## 📌 Notes

- FTP is convenient for quick uploads but **not recommended** for production CI/CD workflows.
- Use **Azure DevOps, GitHub Actions, or ZipDeploy** for automated and secure deployments.
- Ensure you use **FTPS** over FTP for encrypted upload.

---

## 📚 Related Docs

- [Deploy via FTP](https://learn.microsoft.com/en-us/azure/app-service/deploy-ftp)
- [Configure deployment credentials](https://learn.microsoft.com/en-us/azure/app-service/deploy-configure-credentials)

---

## ✅ Summary

| Step | Action                                |
| ---- | ------------------------------------- |
| 1    | Get FTP credentials from Azure Portal |
| 2    | Connect via FTP client                |
| 3    | Upload files to `/site/wwwroot/`      |
| 4    | Test website                          |

### 10. What is the importance of “wwwroot” folder ?

The `wwwroot` folder is a **critical directory** in Azure App Service and many web frameworks (like ASP.NET Core). It serves as the **public root** of your web application.

---

## 📁 What is `wwwroot`?

`wwwroot` is the **web root** directory for a hosted web app.

- All files placed inside `wwwroot` are **publicly accessible via HTTP/S**.
- It is the **default location** where Azure App Service looks to serve content for incoming web requests.

> 🔗 Example:
> If your file `index.html` is located in `/site/wwwroot/index.html`, it will be accessible at:
>
> ```
> https://<yourappname>.azurewebsites.net/index.html
> ```

---

## 🎯 Why is `wwwroot` Important?

### 1. 📤 Deployment Target

- All **FTP**, **zip deployment**, or **build pipelines** upload your app to `wwwroot`.
- It’s the **entry point** for your app on Azure App Service.

### 2. 🌍 Public Access Area

- Files in `wwwroot` are **exposed to users**.
- Ideal for placing:
  - Static HTML files
  - JavaScript files
  - CSS
  - Images
  - Frontend bu
- 🗂️ Directory Structure in Azure App Service
  When connecting via FTP or Kudu (Advanced Tools), you typically see this structure:
  /site
  ├── deployments
  ├── diagnostics
  ├── locks
  └── wwwroot ← Your application’s actual web content lives here

### 11. How can you go to the console of Azure ?

Azure provides a built-in **Kudu Console** (also known as SCM) for App Services. This powerful tool gives you terminal-like access to your app's environment.

---

## 🧭 Steps to Access the Azure Console for App Service

### ✅ Method 1: Using Azure Portal

1. **Login to Azure Portal**  
   Go to [https://portal.azure.com](https://portal.azure.com)

2. **Navigate to App Services**

   - Click on **App Services** from the left menu.
   - Select your Web App (e.g., `my-web-app`).

3. **Go to Advanced Tools (Kudu)**

   - In the left pane, scroll to **Development Tools**.
   - Click on **Advanced Tools** > Click **Go**.

4. **Kudu Portal Opens in a New Tab**  
   You’ll be redirected to: https://<appname>.scm.azurewebsites.net
5. **Open Console**

- In the top menu, click on **Debug Console** → **CMD** or **PowerShell**.

6. ✅ You now have terminal access to your app's file system and environment.

---

### ✅ Method 2: Direct URL Access to Kudu

You can directly access the console using this URL format:

https://<yourappname>.scm.azurewebsites.net/DebugConsole

> 📌 Replace `<yourappname>` with your actual Azure Web App name.

---

## 🔧 What Can You Do in Azure Console?

- Browse and edit files (e.g., wwwroot)
- Run PowerShell or CMD commands
- Deploy apps manually (zip deploy)
- View environment variables
- Inspect logs and temp files

---

## 🚫 Limitations

- Only available for **App Service** (not for VMs or AKS).
- Has access only to the App Service sandboxed environment.
- Cannot access full Azure environment or other services (e.g., DB, storage directly).

---

## 🛡️ Security Note

Only users with proper Azure portal access (e.g., Contributor or higher role) can access the console.

---

## ✅ Summary

| Feature       | Description                                            |
| ------------- | ------------------------------------------------------ |
| Tool Used     | Kudu (Advanced Tools) Console                          |
| Access Method | Azure Portal → App Service → Advanced Tools → Go       |
| Direct URL    | `https://<appname>.scm.azurewebsites.net/DebugConsole` |
| Modes         | CMD or PowerShell                                      |
| Use Cases     | File edits, logs, manual deploys, environment checks   |

---

### 12. What is the need to App Service editor ?

# ✍️ What is the Need for Azure App Service Editor?

The **App Service Editor** in Azure is a **browser-based IDE** that allows you to **edit your web app’s code directly** in the cloud — without needing to re-deploy from a local machine.

---

## 🚀 What is App Service Editor?

- A lightweight web-based **code editor**, built on **Monaco** (same engine as VS Code).
- Runs directly inside your App Service environment.
- Allows real-time edits to your files under `/site/wwwroot`.

---

## 🧠 Why Do You Need It?

### ✅ 1. Quick Fixes in Production

You can:

- Instantly update HTML, CSS, JavaScript, or config files.
- Apply minor bug fixes without redeploying from GitHub or DevOps.

> ⚠️ Not recommended for large production changes, but useful for hotfixes or debugging.

---

### ✅ 2. Real-Time Editing

- Live preview and edit of files deployed in your app.
- Immediate effect without rebuilding or publishing.

---

### ✅ 3. No Local Setup Required

- No need to clone repo or set up a development environment.
- Works entirely in the browser from any location.

---

### ✅ 4. Debug and Inspect Files

- Browse the complete file system of your app.
- Useful for checking deployed builds or log files.

---

### ✅ 5. Developer Convenience

- Ideal for small frontend changes in static sites or single-page apps.
- Especially useful for demos, proof-of-concepts, and MVP apps.

---

## 🔓 How to Open App Service Editor

1. Go to **Azure Portal** → **App Services**
2. Select your App → Under **Development Tools**, click **App Service Editor**
3. Click **Go**, and it will open:https://<yourappname>.scm.azurewebsites.net/dev

---

## ⚠️ Limitations

| Limitation             | Notes                                                  |
| ---------------------- | ------------------------------------------------------ |
| Not version controlled | Manual changes won't be in Git or DevOps pipelines     |
| No CI/CD integration   | Bypasses standard deployment pipelines                 |
| Not ideal for .NET     | Editing compiled backends like ASP.NET Core is limited |
| Not scalable           | Not recommended for large or team-based projects       |

---

## ✅ When to Use App Service Editor

| Scenario                    | Use App Service Editor?  |
| --------------------------- | ------------------------ |
| Fixing a typo in HTML/CSS   | ✅ Yes                   |
| Adding a console log in JS  | ✅ Yes                   |
| Changing `appsettings.json` | ⚠️ Temporary, not ideal  |
| Refactoring backend logic   | ❌ No (use IDE + deploy) |
| Managing large projects     | ❌ No                    |

---

## 📌 Summary

The **App Service Editor** is a **lightweight, web-based code editor** useful for:

- Quick edits
- Debugging
- Fast fixes without redeploy

> Best used for **frontend changes** and **static content updates**, not for major backend development.

---

### 13. Explain the importance of publish profile of Azure ?

# 📤 Importance of Azure Publish Profile

An **Azure Publish Profile** is an XML configuration file that contains all the necessary settings and credentials needed to **deploy your web application to Azure App Service** directly from development tools like Visual Studio, VS Code, or CI/CD pipelines.

---

## 🧾 What is a Publish Profile?

- A `.PublishSettings` file downloaded from the Azure Portal.
- Contains:
  - Web app name
  - Deployment method (Web Deploy, FTP)
  - Credentials (usernames/passwords)
  - Target URL
  - Configuration settings

> 📁 File format: `appname.PublishSettings`

---

## 🎯 Why is a Publish Profile Important?

### ✅ 1. **Simplifies Deployment**

- Enables **one-click publishing** from Visual Studio or VS Code.
- No need to manually configure FTP or deployment endpoints.

> 🎯 Especially useful for developers deploying from local environments.

---

### ✅ 2. **Secure Deployment Credentials**

- Includes **deployment credentials** for FTP/WebDeploy in encrypted form.
- You don’t need to remember or manually enter credentials each time.

---

### ✅ 3. **Supports Multiple Deployment Methods**

- Works with:
  - **Web Deploy (MSDeploy)**: Common for .NET apps via Visual Studio.
  - **FTP/S**: For manual uploads.
  - **CI/CD Pipelines**: Can be used in GitHub Actions or Azure DevOps.

---

### ✅ 4. **Consistent and Repeatable Deployments**

- Developers and build servers use the **same configuration**, reducing setup errors.
- Ideal for teams where multiple people deploy the same app.

---

### ✅ 5. **Integrates with Dev Tools**

- Visual Studio automatically reads and configures deployment settings after importing the profile.
- Works with MSBuild, GitHub Actions, Azure DevOps, etc.

---

#### 🔐 Security Considerations

- ⚠️ **Do not commit** the publish profile file to source control (e.g., GitHub).
- Treat it like a **password file** — it contains encoded credentials.
- Rotate or regenerate if exposed.

---

## 🧭 How to Download Publish Profile

1. Go to **Azure Portal** → **App Services**
2. Select your app
3. Click **"Get Publish Profile"** on the Overview blade
4. A `.PublishSettings` file will be downloaded

---

## 🛠️ How to Use in Visual Studio

1. In Visual Studio, right-click your project → **Publish**
2. Click **"Import Profile"**
3. Browse and select the downloaded `.PublishSettings` file
4. Click **Publish**

---

## ✅ Summary

| Feature                    | Benefit                                      |
| -------------------------- | -------------------------------------------- |
| Deployment Configuration   | Contains all required settings               |
| Easy Integration with IDEs | Works seamlessly with Visual Studio, VS Code |
| Supports Multiple Methods  | Web Deploy, FTP, MSBuild                     |
| Simplifies CI/CD           | Use in automated pipelines                   |
| Security Risk if Misused   | Should never be checked into version control |

> 🔐 Always treat your publish profile like a sensitive credential. Use Key Vault or secrets in CI/CD when needed.

---

### 14. How to deploy application in Azure Web app?

**Answer**

- Please find the below tutorial do deploy application in Azure Web App.
  [Deployment link](https://www.youtube.com/watch?v=VLTNyM8DGds)

# SQL Server on Azure ( DTU & EDTU)

### 1. What is the problem of mapping work load with Azure configuration ?

### 2. Explain DTU and EDTU ?

### 3. On which factors does DTU depend ?

### 4. How to calculate DTU ?

### 5. How to measure the five factors which derive DTU ?

### 6. How can you create SQL Server DB on Azure ?

# Azure Function Apps

### 1. Explain function apps ?

### 2. Explain the term “ServerLess” ?

### 3. How to create function apps using portal ?

### 4. For function app template in visual studio , what has to be installed ?

### 5. How to create function apps using visual studio ?

### 6. Consumption plan VS Service plan

### 7. What is the importance of Scale controller ?

### 8. What is a Web Hook / API function app?

# Azure storage (Blobs,Table,File and Queue)

### 1. Differentiate between resource manager and classic ?

### 2. Explain the difference between blobs , files , queues and table ?

### 3. Differentiate between general storage v1 vs v2 vs blob ?

### 4. When should we select hot access tier or cold access tier ?

### 5. When should we choose standard vs premium ?

### 6. Differentiate between SDD vs HDD ?

### 7. Differentiate between LRS , ZRS , GRS and RA-GRS ?

### 8. How can azure storage explorer make your life easy ?

# Azure Cosmos DB

### 1. What is the goal of Cosmos DB ?

### 2. Explain the word planet-scale ?

### 3. Explain consistency problem in Cosmos ?

### 4. Why is DR , BCP not the main goal of cosmos , how is it different ?

### 5. consistency is best when Performance is more important than consistency.

### 6. consistency should be selected for high consistency and for most recent data.

### 7. Explain session , bounded and prefix consistencies ?

### 8. What is multi-api support in cosmos ?

### 9. Explain the hierarchical structure of Cosmos DB ?

### 10. How to connect to Cosmos DB using C# language ?

# Azure Fabric and Micro-services

### 1. Why automation is must for Micro-services?

### 2. What are the infrastructure issues when deploying Micro-services?

### 3. Define Azure fabric in one sentence ?

### 4. What is the use of Azure fabric SDK and Local cluster manager tool ?

### 5. Differentiate between stateful and stateless microservices ?

### 6. Explain the importance of configuration project in Azure fabric projects ?

### 7. Explain the importance of “StateManager” in stateful projects ?

### 8. Where is Web application URL configured ?

### 9. Differentiate between LTSC and SAC ?

### 10. What role does certificate play in fabric ?

### 11. what is the use AD user in fabric ?

### 12. Explain Azure vault ?

### 13. How to publish using visual studio to Azure fabric ?

### 14. How to use client certificates for deployment and management ?

# Azure Table , Partition , Rowkey

### 1. Define Azure Tables ?

### 2. Explain the importance of Partition and Row key ?

### 3. Azure tables are same like RDBMS database , true or false ?

### 4. Explain the architecture of Azure tables ?

### 5. How to connect to Azure tables using C# language ?

### 6. C# Entity classes should inherit from \_ to receive Azure records ?

### 7. What are TableQuery classes in C# ?

### 8. How to perform insert,update and delete using C# on Azure tables?

### 9. How to do batch inserts using Azure API ?

### 10. What is the consequence of not writing point queries ?

### 11. How does duplicate data increase search performance in Azure tables ?

### 12. How does storing aggregate data benefit in terms of performance ?

### 13. When should we use compound key in Azure tables ?

### 14. What is EGT , can EGT be done across tables ?

# Block blobs , Append blobs and Page blobs

### 1. What are the different types of Blobs?

### 2. In which scenarios we should use which type of blobs?

### 3. Can you explain the working of block blobs ?

### 4. What is the size of individual block blob ?

### 5. How many block blobs can be accommodated in one blob ?

### 6. Explain the hierarchal structure of account , container and blobs ?

### 7. Explain private , container and blob access levels ?

### 8. What are the broader steps to create blobs ?

### 9. What is the importance of “SingleBlobThreshHoldInBytes” ?

### 10. What happens when we specify “StreamWriteSizeInBytes” ?

### 11. Differentiate between “SingleBlobThreshHoldInBytes” VS “StreamWriteSizeInBytes” ?

### 12. When should we use “PutBlock” and “PutBlockList” ?

### 13. How can we get committed and uncommitted blobs ?

### 14. How can we download block blob ?

### 15. Explain the importance of “StreamMinimumReadSizeInBytes” ?

### 16. How to use AppendBlockBlobs ?

### 17. Can we update appendBlockBlob ?

### 18. Explain “WritePages” and “Read” methods of page blobs ?

### 19. What does “Seek” method do of page blob ?

# Azure Queues , visibility timeouts ,Peek & De-Queue.

### 1. What is the need of Queues?

### 2. What is FIFO in Queues?

### 3. How to add message read the next record?

### 4. Does PeekMessage read the next record?

### 5. How to do a De-queue in Queues?

### 6. Explain visibility time out concept?

### 7. How is GetMessage different from Peek?

### 8. How to read bulk messages from Queues?

### 9. By default In GetMessage visibility time out \_\_\_seconds.

### 10. How to update a message?

### 11. What is the MessageUpdateField meant for?

### 12. What is importance of MessageId and Popreceiptid?

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
