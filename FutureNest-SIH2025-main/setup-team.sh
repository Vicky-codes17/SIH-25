#!/bin/bash

# FutureNest SIH2025 - Team Setup Script
# This script helps team members get started quickly

echo "🚀 FutureNest SIH2025 - Team Setup Script"
echo "========================================="

# Check if Node.js is installed (required for all methods)
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first:"
    echo "   https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first"
    exit 1
fi

echo "✅ Node.js $(node --version) and npm $(npm --version) are installed"

# Check Docker availability (optional)
DOCKER_AVAILABLE=false
if command -v docker &> /dev/null && docker info &> /dev/null; then
    DOCKER_AVAILABLE=true
    echo "✅ Docker is available"
else
    echo "⚠️  Docker not available (will use local setup)"
fi

# Function to run without Docker (fallback)
run_without_docker() {
    echo "🔄 Setting up without Docker..."
    
    # Check if Node.js is installed
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js is not installed. Please install Node.js 18+ first:"
        echo "   https://nodejs.org/"
        exit 1
    fi
    
    # Check if npm is installed
    if ! command -v npm &> /dev/null; then
        echo "❌ npm is not installed. Please install npm first"
        exit 1
    fi
    
    echo "✅ Node.js and npm are installed"
    
    # Install dependencies
    echo "📦 Installing dependencies..."
    npm install
    
    if [ $? -eq 0 ]; then
        echo "✅ Dependencies installed successfully!"
        echo ""
        echo "🎉 Setup complete! You can now run:"
        echo "   npm start          # Start development server"
        echo "   npm run build      # Build for production"
        echo ""
        echo "🌐 The app will be available at: http://localhost:3000"
    else
        echo "❌ Failed to install dependencies"
        exit 1
    fi
}

# Function to run with Docker
run_with_docker() {
    echo "🐳 Setting up with Docker..."
    
    # Fix potential Docker credential issues
    echo "🔧 Checking Docker configuration..."
    docker logout &>/dev/null || true
    
    # Try to build and run with local Dockerfile first
    echo "📦 Building Docker containers..."
    
    # Create a simple local Dockerfile to avoid registry issues
    cat > Dockerfile.simple << 'EOF'
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production --no-audit --quiet
COPY . .
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
EOF
    
    if docker build -f Dockerfile.simple -t futurenest-local . && docker run -d -p 3000:3000 --name futurenest-app futurenest-local; then
        echo "✅ Docker container started successfully!"
        echo ""
        echo "🎉 Setup complete! Your app is now running:"
        echo "   🌐 App URL: http://localhost:3000"
        echo ""
        echo "📋 Useful commands:"
        echo "   docker logs futurenest-app      # View logs"
        echo "   docker stop futurenest-app      # Stop container"
        echo "   docker restart futurenest-app   # Restart container"
        echo ""
    else
        echo "❌ Docker setup failed. Falling back to local setup..."
        run_without_docker
    fi
}

# Ask user preference
echo ""
echo "Choose setup method:"
echo "1) Local Node.js (Recommended - Fast and reliable)"
echo "2) Docker (Containerized environment)"
echo "3) Auto-detect (Try local first, Docker as backup)"
echo ""
read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        run_without_docker
        ;;
    2)
        if [ "$DOCKER_AVAILABLE" = true ]; then
            run_with_docker
        else
            echo "❌ Docker not available. Using local setup..."
            run_without_docker
        fi
        ;;
    3)
        echo "🔍 Auto-detecting best setup method..."
        # Try local first (more reliable), Docker as backup
        run_without_docker
        ;;
    *)
        echo "❌ Invalid choice. Using local setup..."
        run_without_docker
        ;;
esac
