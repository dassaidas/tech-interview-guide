# 🚀 Tech Interview Guide

[![MkDocs](https://img.shields.io/badge/MkDocs-526CFE?style=flat-square&logo=mkdocs&logoColor=white)](https://www.mkdocs.org/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)](https://www.python.org/)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=flat-square&logo=github&logoColor=white)](https://pages.github.com/)

> A comprehensive, categorized guide to technical interview questions with real-world examples and industry best practices.

---

## 📋 Table of Contents

1. [⚡ Quick Start](#-quick-start)
2. [🛠️ Installation Guide](#️-installation-guide)
3. [🖥️ Setup Python & MkDocs on Windows](#️-setup-python--mkdocs-on-windows)
4. [🚀 Running the Project](#-running-the-project)
5. [🌐 Deployment](#-deployment)
6. [📤 Contributing](#-contributing)

---

## ⚡ Quick Start

**Prerequisites:**

- 🐍 Python 3.8+ installed
- 💻 Git installed
- 📦 pip (comes with Python)

**Get started in 3 steps:**

```bash
# 1️⃣  Clone the repository
git clone https://github.com/dassaidas/tech-interview-guide.git
cd tech-interview-guide

# 2️⃣  Install dependencies
pip install mkdocs-material mkdocs-git-revision-date-localized-plugin

# 3️⃣  Run locally
mkdocs serve
```

Then open **[http://localhost:8000](http://localhost:8000)** in your browser! 🎉

---

## 🛠️ Installation Guide

### Step 1️⃣: Install Python (if not already installed)

1. Download Python 3.8+ from [python.org](https://www.python.org/downloads/)
2. Run the installer
3. ✅ **Important**: Check `Add Python to PATH` during installation

### Step 2️⃣: Verify Python & pip Installation

Open **PowerShell** or **Command Prompt** and run:

```bash
python --version
pip --version
```

You should see version numbers for both. ✅

### Step 3️⃣: Clone the Repository

```bash
git clone https://github.com/dassaidas/tech-interview-guide.git
cd tech-interview-guide
```

### Step 4️⃣: Install MkDocs and Dependencies

```bash
pip install mkdocs-material mkdocs-git-revision-date-localized-plugin
```

This installs:

- 📦 **mkdocs** - The static site generator
- 🎨 **mkdocs-material** - Beautiful Material Design theme with search and dark mode
- 📅 **mkdocs-git-revision-date-localized-plugin** - Git revision tracking

### Step 5️⃣: Verify Installation

```bash
mkdocs --version
```

Expected output: `mkdocs, version 1.5.x` or higher ✅

---

## 🖥️ Setup Python & MkDocs on Windows

### ⚠️ If you get "command not found" errors, follow these steps:

#### Step 1: Locate Your Python Installation

1. **Open PowerShell** and run:

   ```bash
   python -c "import site; print(site.USER_BASE)"
   ```

2. **Note the path**, for example:

   ```
   C:\Users\YourUsername\AppData\Roaming\Python\Python311
   ```

3. The **Scripts folder** is at:
   ```
   C:\Users\YourUsername\AppData\Roaming\Python\Python311\Scripts
   ```

#### Step 2: Add Python to Windows PATH

1. **Press** `Windows + S`
2. **Type** `"environment variables"`
3. **Click** `Edit the system environment variables`

   ![System Properties window will open]

4. **Click** the `Environment Variables` button

5. Under **User variables**, find `Path` and click `Edit`

6. **Click** `New` and paste:

   ```
   C:\Users\YourUsername\AppData\Roaming\Python\Python311\Scripts
   ```

7. **Click** `OK` → `OK` → `OK` to save

#### Step 3: Restart Terminal & Verify

1. **Close** your current PowerShell/CMD window
2. **Open** a new PowerShell/CMD window
3. **Run**:
   ```bash
   mkdocs --version
   ```

Expected output: `mkdocs, version 1.5.x` ✅

---

## 🚀 Running the Project

### Local Development (with live reload)

```bash
mkdocs serve
```

- 📍 Open **http://localhost:8000** in your browser
- ♻️ Changes to files auto-refresh in the browser
- ⏹️ Press `Ctrl + C` to stop

### Build Static Site (Production)

```bash
mkdocs build --clean
```

- 📁 Static files generated in `site/` folder
- ✅ Ready for deployment to any web server

---

## 🌐 Deployment

### Deploy to GitHub Pages

#### Step 1: Install GitHub Deployment Tool

```bash
pip install ghp-import
```

#### Step 2: Create GitHub Repository

1. Go to **[github.com/new](https://github.com/new)**
2. **Name** your repo: `tech-interview-guide`
3. Make it **Public** (required for GitHub Pages)
4. **Create repository**

#### Step 3: Connect Local Repository to GitHub

```bash
# Add remote
git remote add origin https://github.com/YourUsername/tech-interview-guide.git

# Set main branch
git branch -M main

# Push initial commit
git add .
git commit -m "Initial commit: Tech Interview Guide"
git push -u origin main
```

#### Step 4: Deploy to GitHub Pages

```bash
mkdocs gh-deploy
```

This will:

- 🔨 Build the static site
- 📤 Push to `gh-pages` branch
- 🌐 Deploy to GitHub Pages automatically

#### Step 5: Enable GitHub Pages (if needed)

1. Go to your repository on GitHub
2. **Settings** → **Pages**
3. **Select** `gh-pages` branch
4. **Save**

#### Step 6: Access Your Site

Your site is now live at:

```
https://YourUsername.github.io/tech-interview-guide/
```

📌 **Example**: https://dassaidas.github.io/tech-interview-guide/

---

## ⚙️ GitHub Actions Deployment (CI/CD)

### ⚠️ If you're using GitHub Actions to deploy automatically:

GitHub Actions bot needs permission to push to your repository. Follow these steps to set it up securely.

#### Step 1: Generate a Personal Access Token (PAT)

1. **Go to GitHub**:
   - Visit: https://github.com/settings/tokens
   - Click **Developer settings** → **Personal access tokens** → **Fine-grained tokens**

2. **Create new token**:
   - Click **"Generate new token"**
   - Name it: `GH_ACTIONS_DEPLOY`
   - Expiration: **90 days or longer**

3. **Set permissions**:
   - Select your repository
   - Under **Repository permissions**, give:
     - ✅ `Contents` → **Read & Write**
     - ✅ `Actions` → **Read & Write**

4. **Copy the token**:
   - 📋 Copy the generated token (you won't see it again!)

#### Step 2: Add Token as GitHub Secret

1. **Go to your repository on GitHub**
2. **Navigate to**: Settings → Secrets and variables → Actions
3. **Click**: `New repository secret`
4. **Create secret**:
   - Name: `GH_TOKEN`
   - Value: _Paste the token you copied_
5. **Click**: `Add secret`

#### Step 3: Create GitHub Actions Workflow File

1. **Create folder structure**:

   ```bash
   mkdir -p .github/workflows
   ```

2. **Create file**: `.github/workflows/deploy.yml`

3. **Add this content**:

   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches:
         - main

   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout code
           uses: actions/checkout@v3
           with:
             fetch-depth: 0

         - name: Set up Python
           uses: actions/setup-python@v4
           with:
             python-version: "3.9"

         - name: Install dependencies
           run: |
             pip install mkdocs-material mkdocs-git-revision-date-localized-plugin

         - name: Configure Git
           run: |
             git config --global user.name "github-actions[bot]"
             git config --global user.email "github-actions[bot]@users.noreply.github.com"

         - name: Set GitHub remote with token
           run: |
             git remote set-url origin https://x-access-token:${{ secrets.GH_TOKEN }}@github.com/${{ github.repository }}

         - name: Deploy to GitHub Pages
           run: mkdocs gh-deploy --force
           env:
             GIT_AUTHOR_NAME: github-actions
             GIT_AUTHOR_EMAIL: github-actions@github.com
             GIT_COMMITTER_NAME: github-actions
             GIT_COMMITTER_EMAIL: github-actions@github.com
   ```

4. **Commit and push**:
   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "Add: GitHub Actions deployment workflow"
   git push origin main
   ```

#### Step 4: Verify Deployment

1. **Check Actions tab**:
   - Go to your repo → **Actions** tab
   - You should see the workflow running automatically
   - ✅ If successful, your site is deployed!

2. **Troubleshooting**:
   - If workflow fails, check the logs
   - Verify the `GH_TOKEN` secret is set correctly
   - Ensure token has **Read & Write** permissions

---

## 📤 Contributing

### How to Add or Update Content

1. **Create a new branch**:

   ```bash
   git checkout -b feature/add-new-topic
   ```

2. **Add your content** in the appropriate `docs/` folder

3. **Test locally**:

   ```bash
   mkdocs serve
   ```

4. **Commit your changes**:

   ```bash
   git add .
   git commit -m "Add: New interview questions for [Topic]"
   ```

5. **Push to GitHub**:

   ```bash
   git push origin feature/add-new-topic
   ```

6. **Create a Pull Request** on GitHub

### Content Guidelines

- 📝 Write clear, concise explanations
- 💡 Include real-world examples
- ✅ Focus on best practices
- 🏷️ Organize content logically

---

## 📚 Project Structure

```
tech-interview-guide/
├── mkdocs.yml              # MkDocs configuration
├── README.md               # This file
├── docs/
│   ├── index.md           # Home page
│   ├── Angular/           # Angular interview questions
│   ├── Dotnet/            # .NET interview questions
│   ├── React/             # React interview questions
│   ├── Cloud/             # Cloud/Azure questions
│   └── ...                # Other topics
└── site/                  # Generated static site (don't edit)
```

---

## ❓ Troubleshooting

| Problem                     | Solution                                                          |
| --------------------------- | ----------------------------------------------------------------- |
| `mkdocs: command not found` | [See Windows PATH setup above](#️-setup-python--mkdocs-on-windows) |
| Port 8000 already in use    | Run `mkdocs serve -a 127.0.0.1:8088`                              |
| Changes not showing locally | Refresh browser (Ctrl + F5) or restart `mkdocs serve`             |
| GitHub deployment fails     | Ensure `gh-pages` branch exists in your repo                      |

---

## 📞 Support

Need help?

- 📖 Check [MkDocs Documentation](https://www.mkdocs.org/)
- 🐍 Check [Python Documentation](https://docs.python.org/)
- 💬 Open an [Issue on GitHub](https://github.com/dassaidas/tech-interview-guide/issues)

---

<div align="center">

⭐ **If this guide helps you, please star the repository!**

Built with ❤️ using MkDocs & Material Design

</div>
