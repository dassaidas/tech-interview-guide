### 1. Why automation is must for Micro-services?

Microservices architecture breaks down applications into many small, independently deployable services. This distributed nature creates complexities that make **automation essential**.

Key Reasons Automation is Crucial

1.  **Continuous Integration & Continuous Deployment (CI/CD)**

    - Frequent changes require automated build, test, and deployment pipelines.

    - Ensures quick and reliable delivery of new features and bug fixes.
    - Reduces human errors during deployments.

2.  **Service Scalability**

    - Automation enables dynamic scaling of individual microservices based on demand.
    - Manual scaling is impractical and error-prone in distributed environments.

3.  **Consistency Across Environments**

    - Automated provisioning and configuration management maintain consistency across dev, test, staging, and production.
    - Avoids configuration drift and environment-specific bugs.

4.  **Efficient Resource Management**

    - Automates resource allocation, monitoring, and cleanup.
    - Improves cost efficiency and system reliability.

5.  **Resilience and Recovery**

    - Automated health checks and self-healing mechanisms can detect and recover from failures.
    - Minimizes downtime without manual intervention.

6.  **Complexity Management**

    - Microservices often have many interdependent components.
    - Automation orchestrates service dependencies, startup order, and updates seamlessly.

Summary

| Challenge in Microservices      | How Automation Helps                  |
| ------------------------------- | ------------------------------------- |
| Frequent deployments            | Enables fast, reliable CI/CD          |
| Scaling                         | Automates dynamic resource scaling    |
| Environment drift               | Ensures configuration consistency     |
| Service failures                | Provides automated recovery           |
| Complex inter-service workflows | Orchestrates and manages dependencies |

Automation is not just helpful — it’s **critical** to manage, deploy, and maintain microservices efficiently and reliably.

References

- [Microservices Automation](https://martinfowler.com/articles/microservice-testing/)
- [CI/CD for Microservices](https://azure.microsoft.com/en-us/overview/continuous-integration/)

### 2. What are the infrastructure issues when deploying Micro-services?

Deploying microservices introduces several infrastructure challenges due to their distributed and decoupled nature.

Key Infrastructure Issues

1.  Service Discovery

    - Microservices dynamically scale and move, requiring mechanisms to locate service instances.
    - Without proper service discovery, services cannot communicate reliably.

2.  Load Balancing

    - Efficiently distributing requests across multiple instances of a service is essential.
    - Balancing load to avoid hotspots or downtime is complex.

3.  Network Complexity

    - Increased inter-service communication leads to more network traffic.
    - Handling latency, retries, failures, and network partitions becomes harder.

4.  Configuration Management

    - Managing diverse configurations across many services.
    - Propagating configuration changes without downtime is difficult.

5.  Security

    - Securing communication between services (authentication, authorization, encryption).
    - Managing secrets and credentials securely.

6.  Logging, Monitoring, and Tracing

    - Collecting and correlating logs and metrics from many distributed services.
    - Implementing distributed tracing to track requests end-to-end.

7.  Deployment and Orchestration

    - Coordinating deployments of multiple interdependent services.
    - Managing versioning, rollbacks, and zero-downtime deployments.
    - Often requires container orchestration platforms like Kubernetes.

8.  Data Management

    - Managing data consistency across distributed services.
    - Handling distributed transactions or eventual consistency.

9.  Resource Management

    - Allocating compute, memory, and storage efficiently.
    - Preventing resource contention and ensuring availability.

Summary Table

| Infrastructure Issue       | Description                                   |
| -------------------------- | --------------------------------------------- |
| Service Discovery          | Dynamically locating service instances        |
| Load Balancing             | Distributing traffic evenly                   |
| Network Complexity         | Managing inter-service communication          |
| Configuration Management   | Handling configuration at scale               |
| Security                   | Protecting data and services                  |
| Logging & Monitoring       | Centralizing logs and metrics                 |
| Deployment & Orchestration | Managing service lifecycle and dependencies   |
| Data Management            | Ensuring data integrity and consistency       |
| Resource Management        | Efficient allocation and scaling of resources |

References

- [Microservices Architecture - Martin Fowler](https://martinfowler.com/articles/microservices.html)
- [Kubernetes Documentation](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Service Mesh Concepts](https://istio.io/latest/docs/concepts/what-is-istio/)

### 3. Define Azure fabric in one sentence ?

**Azure Service Fabric** is a distributed systems platform that simplifies the packaging, deployment, and management of scalable and reliable microservices and containers in the cloud.

### 4. What is the use of Azure fabric SDK and Local cluster manager tool ?

- **Azure Service Fabric SDK**:  
  Provides developers with libraries, tools, and APIs to build, test, and deploy Service Fabric applications and microservices efficiently.

- **Local Cluster Manager Tool**:  
  Enables creating and managing a local Service Fabric cluster on a development machine to test and debug Service Fabric applications locally before deploying to the cloud.

### 5. Differentiate between stateful and stateless microservices ?

| Aspect               | Stateful Microservices                                                          | Stateless Microservices                                                     |
| -------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **Definition**       | Maintain and manage state (data) across multiple requests                       | Do not retain any state between requests                                    |
| **Data Storage**     | Store data either in-memory or durable storage                                  | No internal data storage; rely on external storage if needed                |
| **Use Case**         | Applications that require data persistence, e.g., shopping carts, user sessions | Services that perform independent operations, e.g., authentication, logging |
| **Scalability**      | More complex due to state synchronization between nodes                         | Easier to scale out since any instance can handle requests                  |
| **Failure Recovery** | Needs mechanisms to recover or replicate state                                  | Can recover easily by simply restarting without data loss                   |
| **Examples**         | Databases, session management, chat applications                                | Stateless APIs, microservices handling requests without data retention      |

### 6. Explain the importance of configuration project in Azure fabric projects ?

The **Configuration Project** in Azure Service Fabric is crucial because it manages and centralizes all the configurable settings for your Service Fabric applications, such as connection strings, environment-specific variables, and feature toggles. This separation allows you to:

- Easily update settings without redeploying or changing the application code.
- Support multiple environments (development, testing, production) with different configurations.
- Maintain clean code by externalizing environment-specific data.
- Enable dynamic configuration updates to running services without downtime.
- Simplify deployment and management by keeping configuration organized and version-controlled separately from application logic.

### 7. Explain the importance of “StateManager” in stateful projects ?

The **`StateManager`** is a key component in stateful Service Fabric applications that provides reliable, transactional storage for the service’s state. Its importance lies in:

- **Reliable State Persistence:** Ensures that state data is durably stored and survives service restarts and failures.
- **Transactional Consistency:** Supports transactions that guarantee atomic updates to the state, preventing partial or corrupt data.
- **Simplifies State Handling:** Abstracts complex state management tasks, allowing developers to work with reliable collections (like dictionaries, queues) easily.
- **Enables High Availability:** Replicates state across multiple nodes to ensure data availability and fault tolerance.
- **Facilitates Stateful Microservices:** Makes it possible to build microservices that maintain and manage their own data reliably within the cluster.

### 8. Where is Web application URL configured ?

The **Web Application URL** is typically configured in one or more of the following places depending on the project setup:

- **In Azure Service Fabric projects:**  
  The URL is specified in the **ServiceManifest.xml** file inside the `<Endpoints>` section, defining the port and protocol the service listens on.

- **In configuration files:**  
  Such as `appsettings.json` (for ASP.NET Core apps) or `web.config` (for older ASP.NET apps), where base URLs or API endpoints can be set.

- **In the Azure Portal:**  
  When deployed, the public-facing URL is configured as part of the Azure App Service or Azure Load Balancer settings.

- **In code or environment variables:**  
  Sometimes URLs are set programmatically or via environment variables for flexibility across environments.

In summary, the primary configuration for the web application URL in Service Fabric is inside the **ServiceManifest.xml** under the endpoint definitions.

### 9. Differentiate between LTSC and SAC ?

| Aspect                | LTSC (Long-Term Servicing Channel)                                      | SAC (Semi-Annual Channel)                         |
| --------------------- | ----------------------------------------------------------------------- | ------------------------------------------------- |
| **Release Frequency** | Every 2–3 years                                                         | Twice a year (every 6 months)                     |
| **Support Duration**  | 5 years of mainstream support + 5 years extended                        | 18 months per release                             |
| **Use Case**          | Stable environments needing long-term support, e.g., production servers | Rapid innovation and feature testing environments |
| **Features**          | Receives only security and critical updates                             | Receives new features and improvements frequently |
| **Update Model**      | In-place upgrades are rare; major upgrades at LTSC release              | Frequent feature updates and improvements         |
| **Examples**          | Windows Server 2019, Windows 10 Enterprise LTSC                         | Windows Server versions released every 6 months   |

### 10. What role does certificate play in fabric ?

Certificates in Azure Service Fabric are used to:

- **Authenticate and secure communication** between clients, nodes, and services within the cluster.
- **Encrypt data in transit** to ensure confidentiality and prevent eavesdropping.
- **Enable cluster security** by validating identities and establishing trust.
- **Support mutual authentication** between cluster nodes and external clients.
- **Protect sensitive configuration and management operations** by restricting access only to authorized parties.
- **Facilitate secure management** of the cluster via tools and APIs.

Overall, certificates are critical for ensuring the security, integrity, and trustworthiness of the Service Fabric cluster and its services.

### 11. what is the use AD user in fabric ?

An **AD User** in Azure Service Fabric is used to:

- **Authenticate and authorize users or services** accessing the Service Fabric cluster, ensuring secure access control.
- **Manage role-based access control (RBAC)** by assigning permissions to AD users or groups for performing cluster management tasks.
- **Integrate with enterprise identity systems**, enabling seamless single sign-on (SSO) and centralized user management.
- **Secure cluster operations** by restricting administrative and operational actions to authenticated AD identities.
- **Facilitate auditing and compliance** by tracking user activities based on their AD credentials.

In essence, AD users help enforce security policies and manage access within Service Fabric clusters in enterprise environments.

### 12. Explain Azure vault ?

**Azure Key Vault** is a cloud service that provides secure storage and management of sensitive information such as secrets, encryption keys, and certificates. It helps safeguard cryptographic keys and secrets used by cloud applications and services, enabling:

- **Centralized secret management** for passwords, API keys, connection strings, and certificates.
- **Secure key management** with hardware security modules (HSMs) for cryptographic keys.
- **Access control and auditing** using Azure Active Directory (AAD) and detailed logging.
- **Simplified compliance** with regulatory requirements by securely handling sensitive data.
- **Seamless integration** with other Azure services and custom applications for secure secret retrieval.

Azure Key Vault helps improve security posture by reducing the risk of accidental exposure and simplifying secret lifecycle management.

### 13. How to publish using visual studio to Azure fabric ?

1.  **Open your Service Fabric project** in Visual Studio.

2.  **Right-click the project** (usually the application project, not the service project) in Solution Explorer and select **Publish**.

3.  In the **Publish Service Fabric Application** dialog:

    - Choose **Azure Service Fabric Cluster** as the target.
    - Click **Next**.

4.  **Select or enter the cluster connection details**:

    - Provide the **cluster endpoint URL** (e.g., `https://<clustername>.<region>.cloudapp.azure.com:19080`).
    - Specify the **management certificate** or **Azure Active Directory credentials** for authentication.

5.  Choose the **target application name** on the cluster.

6.  Select the **publish profile** or create a new one for repeated use.

7.  Optionally configure **advanced settings**, such as:

    - Application parameters.
    - Upgrade modes (e.g., rolling upgrade).
    - Timeout settings.

8.  Click **Publish** to build, package, and deploy your Service Fabric application to the Azure cluster.

9.  Monitor the output window for deployment progress and completion status.

Visual Studio simplifies the deployment by handling packaging, connection, and versioning automatically.

### 14. How to use client certificates for deployment and management ?

Client certificates provide secure authentication for deployment and management operations in an Azure Service Fabric cluster, ensuring only authorized users or tools can perform sensitive actions.

Steps to Use Client Certificates

1.  **Generate or Obtain a Client Certificate**

    - Create a certificate (e.g., using PowerShell, OpenSSL, or a certificate authority) that will identify the client (user or management tool).

2.  **Upload the Client Certificate to the Service Fabric Cluster**

    - Add the client certificate’s public key (thumbprint) to the cluster's security configuration (in `ClusterManifest.json` or via Azure portal) under the `ClientCertificateCommonNames` or `ClientCertificateThumbprints` section.
    - This allows the cluster to recognize and trust the client certificate for authentication.

3.  **Install the Client Certificate Locally**

    - Install the private key of the client certificate into the local certificate store on the machine that will run deployment or management commands (e.g., under Personal Certificates in Windows).

4.  **Configure Client Tools to Use the Certificate**

    - For PowerShell or Service Fabric CLI tools, specify the client certificate when connecting to the cluster using parameters like `-FindType`, `-FindValue`, or by referencing the certificate’s thumbprint.
    - For Visual Studio publishing, configure the publish profile to use the client certificate.

5.  **Perform Deployment and Management**
    - Use the client certificate authenticated session to deploy applications, manage the cluster, and perform administrative operations securely.

Benefits

- Provides **mutual authentication** between client and cluster.
- Enhances **security** by restricting access to authorized certificate holders.
- Supports **non-interactive, automated deployment** scenarios with certificates.
