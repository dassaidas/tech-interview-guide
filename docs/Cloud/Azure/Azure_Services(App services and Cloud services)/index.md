**Azure App services and Cloud serives**

### 1. Different ways of publishing on Azure

🚀 Different Ways of Publishing on Azure

**1. 🔧 Visual Studio**

- Direct deployment from IDE.
- Supports:
  - Web Apps
  - Azure Functions
  - Azure App Service
- Easy for developers with built-in wizards.

✅ Best For: Rapid dev/test deployments.

** 2. 🌐 Azure Portal**

- Manual upload or configuration via browser.
- Use for:
  - ARM template deployments
  - App Service ZIP Deploy
  - Function App package uploads

✅ Best For: One-time setups and admin tasks.

**3. 🧱 Azure CLI**

```
az webapp up --name myapp --resource-group myrg --location eastus
```

- Scriptable deployment via command line.
- Works on Linux, macOS, Windows.

✅ Best For: DevOps, automation, scripting.

- 4. 📦 Azure DevOps (Pipelines)\*

* CI/CD pipelines for:
  - Web Apps
  - Azure Functions
  - Containers
* Supports YAML & Classic UI-based pipelines.

✅ Best For: Enterprise-grade DevOps workflows.

**5. 🐙 GitHub Actions**

- CI/CD workflows using GitHub.
- Direct integration with Azure using actions like:

```
- uses: azure/webapps-deploy@v2
```

✅ Best For: GitHub-hosted repositories.

**6. 📁 FTP/SFTP Deployment**

- Use FTP credentials to manually upload files to Azure Web Apps or App Service.

✅ Best For: Legacy or emergency hotfixes.

**7. 🐳 Docker & Containers**

- Push container images to:
  - Azure Container Registry (ACR)
  - Docker Hub
- Deploy using:
  - Azure App Service for Containers
  - Azure Kubernetes Service (AKS)

✅ Best For: Containerized microservices & scale.

**8. 🧾 ARM Templates / Bicep**

- Infrastructure-as-Code (IaC) method.
- Declaratively deploy Azure resources.
- Repeatable and version-controllable.

✅ Best For: Repeatable infra deployments, governance.

---

**9. 📜 Terraform**

- Popular open-source IaC tool.
- Azure support via the `azurerm` provider.

✅ Best For: Multi-cloud IaC setups.

---

**10. 🛰️ Azure Resource Manager REST API**

- Advanced programmatic deployments using RESTful API endpoints.

✅ Best For: Custom apps or tools automating Azure.

✅ Summary Table

| Method              | Type         | Use Case                              |
| ------------------- | ------------ | ------------------------------------- |
| Visual Studio       | Manual       | Dev/testing workflows                 |
| Azure Portal        | Manual       | Admin tasks, monitoring, quick deploy |
| Azure CLI           | Scripted     | Automation & scripting                |
| Azure DevOps        | CI/CD        | Enterprise deployments                |
| GitHub Actions      | CI/CD        | GitHub-based automation               |
| FTP/SFTP            | Manual       | Legacy or emergency deploy            |
| Docker/Containers   | Container    | Microservices, cloud-native apps      |
| ARM Templates/Bicep | IaC          | Repeatable, structured deployments    |
| Terraform           | IaC          | Multi-cloud infrastructure management |
| REST API            | Programmatic | Deep automation and integrations      |

### 2. Cloud vs App services

☁️ Azure Cloud Services vs Azure App Services

**1. Azure Cloud Services**

- **Type:** Platform as a Service (PaaS)
- **Use Case:** Hosting scalable, multi-tier web applications and background processing.
- **Architecture:**

        - Uses **Web Roles** (for web apps) and **Worker Roles** (for background tasks).
        - Supports full OS control and startup tasks.

- **Management:** Requires managing VM instances, OS updates (though managed by Azure), and configuration.
- **Scaling:** Manual or automatic scaling of instances.
- **Deployment:** Deploys via packages (.cspkg) and configuration (.cscfg).
- **Customization:** Higher control over environment and installed software.
- **Ideal for:** Legacy cloud apps needing OS-level access, or apps needing custom startup tasks.

**2. Azure App Services**

- **Type:** Platform as a Service (PaaS)
- **Use Case:** Hosting web apps, REST APIs, mobile backends, and serverless functions.
- **Architecture:**

            - Fully managed app hosting environment.
            - No OS-level management required.

- **Management:** Azure manages patching, scaling, and infrastructure.
- **Scaling:** Built-in autoscaling and load balancing.
- **Deployment:** Supports Git, FTP, ZIP deploy, Azure DevOps, GitHub Actions.
- **Customization:** Limited OS access but easy integration with Azure services.
- **Ideal for:** Modern web apps, APIs, mobile backends needing fast deployment and easy scaling.

✅ Summary Table

| Feature             | Azure Cloud Services          | Azure App Services               |
| ------------------- | ----------------------------- | -------------------------------- |
| Service Type        | PaaS                          | PaaS                             |
| OS Control          | Yes                           | No                               |
| Scaling             | Manual or auto                | Built-in autoscaling             |
| Deployment Method   | Packages (.cspkg/.cscfg)      | Git, FTP, ZIP, DevOps, Actions   |
| Management Overhead | Higher (VM and OS management) | Lower (fully managed)            |
| Use Cases           | Legacy apps, complex setups   | Modern web apps, APIs, functions |
| Customization       | High                          | Moderate                         |

📌 Notes

- Azure Cloud Services is considered a **classic model**, with many scenarios now better suited to App Services or Azure Kubernetes Service.
- App Services offer easier and faster deployment with less management effort.

### 3. Impact on resource groups

🔄 Impact on Resource Groups: Azure Cloud Services vs Azure App Services

Azure Resource Groups Overview

- A **Resource Group** is a logical container in Azure that holds related resources for an application or workload.
- It helps manage, deploy, and monitor resources as a single entity.

**Impact on Resource Groups**

| Aspect                | Azure Cloud Services                                                                                       | Azure App Services                                                          |
| --------------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Resource Group Scope  | Cloud Services (web roles, worker roles) and associated VMs, storage, networking grouped together          | App Service plan and all related apps grouped within the resource group     |
| Granularity           | Multiple related resources (VMs, roles) bundled, sometimes across resource groups if not carefully planned | Typically simpler, with App Service Plan + apps in one resource group       |
| Management Complexity | Higher — more resources to manage within or across groups due to multiple roles and VMs                    | Lower — fewer resource types, easier to organize and maintain               |
| Deployment Impact     | Updates may affect multiple related resources, requiring coordinated deployment                            | App Services deploy as single unit, simplified deployment in resource group |
| Monitoring & Billing  | Can be complex due to multiple associated resources                                                        | Easier aggregation of usage and costs per resource group                    |
| Resource Dependencies | Needs careful planning to avoid resource sprawl across groups                                              | Usually contained within fewer resources in a group                         |

**Summary**

- Both Cloud Services and App Services use resource groups as containers, but Cloud Services often involve **more complex resource structures**.
- App Services simplify resource group management by consolidating app components under fewer resources.
- Proper planning of resource groups is important for **cost management, access control, and deployment orchestration**.

### 4. Web role , Worker roles and Web jobs

**1. Web Role**

- Part of **Azure Cloud Services** (classic PaaS).
- Designed to host **web applications** and **web APIs**.
- Runs IIS (Internet Information Services) by default.
- Supports HTTP/HTTPS requests.
- Can be scaled by increasing the number of instances.
- Used for **front-end web workloads**.

**2. Worker Role**

- Also part of **Azure Cloud Services**.
- Designed to run **background processing** or **asynchronous tasks**.
- Does **not** run IIS and cannot serve HTTP requests directly.
- Runs custom code continuously or triggered by a schedule.
- Typically used for tasks like:
  - Queue processing
  - Batch jobs
  - Data processing
- Can be scaled independently of Web Roles.

**3. WebJobs**

- Feature of **Azure App Services** (modern PaaS).
- Runs background or scheduled jobs within an **App Service Plan**.
- Supports continuous, triggered (on-demand), or scheduled execution.
- Can run any executable or script (e.g., .exe, PowerShell, Python).
- Easy to deploy and manage alongside web apps.
- Ideal for lightweight background tasks without managing separate roles or VMs.

✅ Summary Table

| Feature          | Web Role               | Worker Role            | WebJobs                      |
| ---------------- | ---------------------- | ---------------------- | ---------------------------- |
| Platform         | Azure Cloud Services   | Azure Cloud Services   | Azure App Services           |
| Purpose          | Host web applications  | Background processing  | Background jobs/tasks        |
| Runs IIS?        | Yes                    | No                     | No                           |
| Deployment Model | Package-based (.cspkg) | Package-based (.cspkg) | Deployed within App Service  |
| Scalability      | Scalable instances     | Scalable instances     | Scales with App Service Plan |
| Use Cases        | Web front-end apps     | Queues, batch jobs     | Scheduled/continuous tasks   |

📌 Notes

- **Web Roles and Worker Roles** belong to the classic Azure Cloud Services model and are less commonly used for new projects.
- **WebJobs** provide a simpler, more flexible way to run background tasks within App Services.

### 5. Loosely coupled vs tightly couples deployment

**1. Tightly Coupled Deployment**

- **Definition:** Components or services are highly dependent on each other.

- **Characteristics:**

         - Changes in one component often require changes in others.
         - Deployment must be coordinated; often deployed together as a single unit.
         - Harder to scale or update parts independently.
         - Common in monolithic applications.

- **Pros:**

        - Simpler initial development.
        - Easier to test as a whole.

- **Cons:**

        - Difficult to maintain and evolve.
        - Higher risk of downtime during updates.
        - Poor scalability and flexibility.

**2. Loosely Coupled Deployment**

- **Definition:** Components or services operate independently with minimal dependencies.

- **Characteristics:**

        - Each service/component can be deployed, scaled, updated independently.
        - Communicate through well-defined APIs or messaging.
        - Supports microservices architecture.

- **Pros:**

        - Greater flexibility and scalability.
        - Easier maintenance and faster deployments.
        - Fault isolation — one component failure less likely to impact others.

- **Cons:**

        - More complex to design and implement.
        - Requires robust inter-service communication mechanisms.

✅ Summary Table

| Aspect          | Tightly Coupled                          | Loosely Coupled                        |
| --------------- | ---------------------------------------- | -------------------------------------- |
| Dependency      | High dependency between components       | Minimal dependencies, independent      |
| Deployment      | Monolithic, coordinated deployment       | Independent deployments                |
| Scalability     | Limited, whole system scales             | Each component scales individually     |
| Flexibility     | Low, difficult to change parts           | High, easy to modify and evolve        |
| Fault Isolation | Poor — one failure affects entire system | Good — isolated failures               |
| Complexity      | Simpler initially                        | More complex design and infrastructure |

📌 Notes

        - Loosely coupled deployment is preferred for modern cloud-native and microservices applications.
        - Tightly coupled deployment might still be used for simple or legacy systems.

### 6. Configuration files in Azure deployment

**Overview**

Configuration files store settings and parameters that control application behavior and deployment environment without changing code. Azure supports multiple types of configuration files depending on the service and deployment model.

**Common Configuration Files in Azure**

| File Type                      | Purpose                                                            | Typical Usage                                         |
| ------------------------------ | ------------------------------------------------------------------ | ----------------------------------------------------- |
| **appsettings.json**           | Application-specific settings (e.g., connection strings, API keys) | ASP.NET Core and other modern apps                    |
| **web.config**                 | IIS and .NET Framework app configuration                           | Traditional ASP.NET apps on Azure App Service         |
| **ARM Templates**              | Infrastructure-as-Code for deploying Azure resources               | Declarative deployment of resources and configs       |
| **Bicep Files**                | Simplified ARM templates                                           | Infrastructure deployments with more readable syntax  |
| **.env files**                 | Environment variables for local development                        | Local development and containerized app configuration |
| **applicationHost.config**     | IIS server-level settings                                          | Azure App Service advanced IIS configuration          |
| **host.json**                  | Azure Functions runtime configuration                              | Configure triggers, logging, retry policies           |
| **local.settings.json**        | Local settings for Azure Functions development                     | Local development environment variables               |
| **service.json / config.json** | Custom app config files                                            | App-specific custom configurations                    |

**Deployment Configuration Approaches**

- **Slot Settings:** In Azure App Services, deployment slots can have slot-specific settings to avoid overriding production values.
- **Azure App Configuration:** Centralized service to manage app settings and feature flags dynamically.
- **Azure Key Vault:** Secure storage for sensitive configuration data like secrets, keys, and certificates.
- **Environment Variables:** Supported in all Azure services for injecting configurations dynamically.

Best Practices

- Keep sensitive data out of config files; use Key Vault or environment variables.
- Use separate config files or slots for dev, test, and prod environments.
- Use ARM/Bicep templates for infrastructure config versioning and automation.
- Validate configuration files locally before deployment.

📌 Notes

- Many Azure SDKs and services have native support to load configs from these files or services.
- Configurations can be overridden at runtime via portal, CLI, or API for flexibility.

### 7. Doing RDP in virtual machines.

🖥️ How to Use RDP to Connect to Azure Virtual Machines

**What is RDP?**

- **Remote Desktop Protocol (RDP)** allows you to remotely connect to a Windows virtual machine (VM) and interact with its desktop environment.

  **Prerequisites**

- Azure VM must be **running Windows OS**.
- VM should have **RDP port (TCP 3389)** open in its Network Security Group (NSG).
- You need the VM's **public IP address** or DNS name.
- A valid **username and password** (or SSH key for Linux, but RDP is for Windows).

**Steps to Connect via RDP**

**1. Enable RDP Access**

- When creating the VM, ensure **RDP port 3389** is allowed in the **Inbound security rules** of the VM’s Network Security Group (NSG).
- If the VM is behind a firewall, make sure port 3389 is open.

**2. Obtain Connection Details**

- Go to the Azure Portal.
- Navigate to **Virtual Machines > Your VM**.
- Find the **Public IP address** or **DNS name**.

**3. Launch Remote Desktop Client**

- On Windows: Use built-in **Remote Desktop Connection** (`mstsc.exe`).
- On macOS/Linux: Use Microsoft Remote Desktop app or compatible RDP client.

**4. Connect to the VM**

- Open the RDP client.
- Enter the **public IP address** or **DNS name**.
- Enter your **VM username and password**.
- Click **Connect**.

**5. Accept the Security Certificate (if prompted)**

- Confirm and proceed with the connection.

**Troubleshooting Tips**

- **Port blocked:** Verify NSG and firewall settings allow inbound traffic on port 3389.
- **Incorrect credentials:** Make sure username and password are correct.
- **VM not running:** Ensure the VM is started.
- **Public IP change:** If the VM uses a dynamic IP, the address might have changed.

**Security Best Practices**

- Use **Just-In-Time (JIT) VM Access** to limit RDP exposure.
- Restrict RDP access by **IP address ranges**.
- Use **Azure Bastion** for secure RDP access without exposing port 3389 publicly.
- Enable **Network Security Groups (NSGs)** properly.

**Summary**

| Step              | Description                         |
| ----------------- | ----------------------------------- |
| Enable port 3389  | Open in NSG for inbound RDP traffic |
| Get public IP/DNS | From Azure portal VM overview       |
| Use RDP client    | Windows MSTSC or compatible client  |
| Connect & login   | Provide credentials and accept cert |
| Secure access     | Use JIT, Bastion, NSGs for security |
