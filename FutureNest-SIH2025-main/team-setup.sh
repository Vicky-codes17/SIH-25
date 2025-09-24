#!/bin/bash

echo "🚀 FutureNest SIH2025 - Team Setup"
echo "================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Please install Node.js first: https://nodejs.org"
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building the app..."
npm run build

echo "📦 Installing serve..."
npm install -g serve

echo "✅ Setup complete!"
echo ""
echo "🌐 Starting app at: http://localhost:3000"
echo "Press Ctrl+C to stop"

# Start the app
serve -s build -p 3000