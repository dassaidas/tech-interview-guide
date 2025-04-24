# Tech Interview Guide

Browse categorized interview questions with real-world examples and best practices.

# How to Add Python, pip, and MkDocs to PATH in Windows

## Step 1: Find the Python Installation Path

1. Open File Explorer and navigate to:

   ```
   C:\Users\<YourName>\AppData\Local\Programs\Python\Python3x\
   ```

   Example:

   ```
   C:\Users\sai\AppData\Local\Programs\Python\Python311\
   ```

2. Inside, copy these paths:

   - Main install folder (for `python.exe`):
     ```
     C:\Users\sai\AppData\Local\Programs\Python\Python311\
     ```
   - Scripts folder (for `pip.exe`):
     ```
     C:\Users\sai\AppData\Local\Programs\Python\Python311\Scripts\
     ```

---

## Step 2: Add to Environment Variables

1. Press **Windows + S**, type `"environment variables"`, and click **Edit the system environment variables**.

2. In the System Properties window → Click **Environment Variables**.

3. Under **User Variables** or **System Variables**, find the variable named `Path`, and click **Edit**.

4. Click **New** and paste both paths:

   ```
   C:\Users\sai\AppData\Local\Programs\Python\Python311\
   C:\Users\sai\AppData\Local\Programs\Python\Python311\Scripts\
   ```

5. Click **OK** on all dialogs to apply changes.

---

## Step 3: Restart Your Terminal

Close and reopen **PowerShell**, **CMD**, or **VS Code Terminal**.

---

## Step 4: Verify Python and pip

Run:

```powershell
python --version
pip --version
```

---

## Step-by-Step to Get MkDocs Working on Your System

### 1. Verify `pip` Works

```powershell
python -m pip --version
```

---

### 2. Install MkDocs Material

```powershell
python -m pip install mkdocs-material
```

This installs:

- `mkdocs` (core)
- `mkdocs-material` (for UI, search, dark mode)

---

### 3. Find the MkDocs Script Path

Run:

```powershell
python -m site --user-base
```

You’ll get a path like:

```
C:\Users\saish\AppData\Roaming\Python\Python311
```

Now go to:

```
C:\Users\saish\AppData\Roaming\Python\Python311\Scripts
```

You’ll see `mkdocs.exe`

---

### 4. Add MkDocs to Your System PATH

1. Open **Edit environment variables** as before.

2. Under **User variables > Path**, click **Edit**.

3. Click **New**, then add:

   ```
   C:\Users\saish\AppData\Roaming\Python\Python311\Scripts
   ```

4. Click **OK → OK → OK**

---

### 5. Restart Terminal and Test

Run:

```powershell
mkdocs --version
```

You should see:

```
mkdocs, version 1.5.3
```

---

You're now fully ready to run:

```powershell
cd path\to\crack-interview
mkdocs build --clean
mkdocs serve -a 127.0.0.1:8088
```

### Deploy application into github

## Step 1: Find the Python Installation Path

1. install suing below command in terminal

```
 pip install mkdocs-material
 pip install mkdocs-git-revision-date-localized-plugin
```

2. delpy using buitin command

```
 mkdocs gh-deploy
```

### applicationn url

**https://dassaidas.github.io/tech-interview-guide/Angular/migration/**

---

### step-by step: push project into git hib

1. initialize your Repo Locally(if not done already)

```
 cd your- project-folder
 git init
```

2. delpy using buitin command

```
 git add .
 git commit -m "intitial commit"
```

3. create a git hub repo

```
Go to https://github.com/new
 Name it (e.g., tech-interview-guide)

Do NOT initialize with README or license (since we already have files locally)

Click Create Repository
```

4. link to git hub repo

```
git remote add origin https://github.com/your-username/tech-interview-guide.git
```

5.  Push to GitHub

```
git branch -M main
git push -u origin main
```

---

### Thanks

GitHub Actions is using the github-actions[bot] user behind the scenes, and it doesn't have permission to push to your repo unless you give it a personal access token (PAT).

## solution: Use a Secure Deployment Token

1. Generate a GitHub Token (with repo access)

```
Go to: GitHub → Developer Settings → Tokens → Fine-grained tokens

Click "Generate new token" (classic is fine too)

Give it:

repo scope (full control)

Expire in 90 days or longer

Copy the token (you won't be able to view it again)
```

2.  Add the Token as a Secret in GitHub

```
Go to your repo → Settings → Secrets and variables → Actions

Click New repository secret

Name it: GH_TOKEN

Paste the token
```

3. update your deploy.yml

```
- name: Deploy to GitHub Pages
  run: mkdocs gh-deploy --force --remote-name origin
  env:
    GIT_AUTHOR_NAME: github-actions
    GIT_AUTHOR_EMAIL: github-actions@github.com
    GIT_COMMITTER_NAME: github-actions
    GIT_COMMITTER_EMAIL: github-actions@github.com
    GH_TOKEN: ${{ secrets.GH_TOKEN }}
```

4. Also, set the remote URL inside your workflow using the token:

```
- name: Set GitHub remote with token
  run: |
    git remote set-url origin https://x-access-token:${{ secrets.GH_TOKEN }}@github.com/${{ github.repository }}

```

## Thanks
