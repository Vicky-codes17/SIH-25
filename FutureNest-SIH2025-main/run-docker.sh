#!/bin/bash

# Simple Docker run script for FutureNest SIH2025
echo "🐳 Starting FutureNest SIH2025 with Docker"

# Create a simple Dockerfile that doesn't rely on external images initially
cat > Dockerfile.local << 'EOF'
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production --no-audit
COPY . .
RUN npm run build

# Serve stage - using Node.js to serve static files
FROM node:18-alpine AS serve

WORKDIR /app

# Install a simple HTTP server
RUN npm install -g serve

# Copy built app
COPY --from=builder /app/build ./build

# Expose port
EXPOSE 3000

# Serve the app
CMD ["serve", "-s", "build", "-l", "3000"]
EOF

echo "📦 Building Docker image..."

# Build with the local Dockerfile
if docker build -f Dockerfile.local -t futurenest-local .; then
    echo "✅ Image built successfully!"
    
    # Stop any existing container
    docker stop futurenest-app 2>/dev/null || true
    docker rm futurenest-app 2>/dev/null || true
    
    # Run the container
    echo "🚀 Starting container..."
    if docker run -d -p 3000:3000 --name futurenest-app futurenest-local; then
        echo "✅ Container started successfully!"
        echo ""
        echo "🎉 Your app is now running at: http://localhost:3000"
        echo ""
        echo "📋 Useful commands:"
        echo "   docker logs futurenest-app      # View logs"
        echo "   docker stop futurenest-app      # Stop the app"
        echo "   docker start futurenest-app     # Start the app"
        echo "   docker restart futurenest-app   # Restart the app"
        echo ""
    else
        echo "❌ Failed to start container"
        exit 1
    fi
else
    echo "❌ Failed to build Docker image"
    echo "🔄 Trying local development setup..."
    
    # Fallback to local setup
    if command -v npm &> /dev/null; then
        echo "📦 Installing dependencies locally..."
        npm install
        echo "🚀 Starting development server..."
        npm start
    else
        echo "❌ npm not found. Please install Node.js and npm"
        exit 1
    fi
fi
