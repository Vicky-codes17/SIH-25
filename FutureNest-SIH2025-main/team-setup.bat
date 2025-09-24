@echo off
echo 🚀 FutureNest SIH2025 - Team Setup
echo =================================

echo 📦 Installing dependencies...
npm install

echo 🔨 Building the app...
npm run build

echo 📦 Installing serve...
npm install -g serve

echo ✅ Setup complete!
echo.
echo 🌐 Starting app at: http://localhost:3000
echo Press Ctrl+C to stop

serve -s build -p 3000
pause