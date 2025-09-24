# 🚀 FutureNest SIH2025 - Team Setup Guide

## For Team Members (Super Simple!)

### Option 1: One-Command Setup ⚡
```bash
npm run team-setup
```
**That's it!** Opens at http://localhost:3000

### Option 2: Step by Step 📋
```bash
# 1. Install dependencies
npm install

# 2. Build and serve
npm run serve
```

### Option 3: Development Mode 💻
```bash
# For coding/development
npm start
```
Opens at http://localhost:3000 with hot-reload

### Option 4: Use Setup Scripts 🛠️

**Linux/Mac:**
```bash
chmod +x team-setup.sh
./team-setup.sh
```

**Windows:**
Double-click `team-setup.bat` or run:
```cmd
team-setup.bat
```

## 📁 What You Need

1. **Install Node.js** (https://nodejs.org)
2. **Get the project files**
3. **Run any command above**

## 🌐 Access Points

- **Development**: http://localhost:3000 (with `npm start`)
- **Production**: http://localhost:3000 (with `npm run serve`)

## 🎯 For Quick Demo

**Just run this:**
```bash
npm install && npm start
```

**For production build:**
```bash
npm install && npm run build && npx serve -s build -p 3000
```

---

## 📤 Sharing Methods

### Method 1: GitHub/Git
```bash
git clone <repository-url>
cd project-folder
npm run team-setup
```

### Method 2: Zip File
1. Download/extract project
2. Open terminal in project folder
3. Run `npm run team-setup`

### Method 3: USB/Drive Share
1. Copy project folder to USB
2. Give to team member
3. They run `npm install && npm start`

---

## 🛠️ Available Commands

```bash
npm start          # Development server (hot-reload)
npm run build      # Build for production  
npm run serve      # Build + serve production
npm run team-setup # One-command setup
npm test           # Run tests
```

## 🎉 That's It!

**No Docker needed!** Your team can run the app with just Node.js installed.

**Questions?** Just run `npm start` and go to http://localhost:3000