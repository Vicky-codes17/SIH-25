# FutureNest SIH2025 - Team Guide 🚀

Welcome to the FutureNest SIH2025 project! This guide will help you get started quickly.

## 🎯 Quick Start Options

### Option 1: Automated Setup (Recommended)
```bash
# Make the setup script executable and run it
chmod +x setup-team.sh
./setup-team.sh
```

### Option 2: Docker Quick Start
```bash
# Make the Docker script executable and run it
chmod +x run-docker.sh
./run-docker.sh
```

### Option 3: Manual Local Setup
```bash
# Install dependencies and start
npm install
npm start
```

### Option 4: Docker Compose (Advanced)
```bash
# Build and run with Docker Compose
docker-compose up --build

# For development mode with hot-reload
docker-compose --profile dev up futurenest-dev --build
```

## 🌐 Access Points

- **Development Server**: http://localhost:3000
- **Docker Production**: http://localhost:3000
- **Docker Development**: http://localhost:3001

## 🛠️ Available Commands

### NPM Commands
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from Create React App (⚠️ irreversible)
```

### Docker Commands
```bash
# Basic Docker operations
docker build -t futurenest .                    # Build image
docker run -p 3000:3000 futurenest             # Run container
docker ps                                       # List running containers
docker logs futurenest-app                     # View container logs
docker stop futurenest-app                     # Stop container

# Docker Compose operations
docker-compose up                               # Start services
docker-compose up -d                           # Start in background
docker-compose down                            # Stop services
docker-compose logs -f                         # Follow logs
docker-compose build --no-cache               # Rebuild without cache
```

## 🏗️ Project Structure

```
FutureNest-SIH2025-main/
├── public/                 # Static files
├── src/                    # React source code
│   ├── components/         # Reusable components
│   ├── pages/             # Page components
│   ├── data/              # Static data files
│   ├── lib/               # Utilities
│   └── utils/             # Helper functions
├── build/                 # Production build (generated)
├── Dockerfile             # Production Docker configuration
├── docker-compose.yml     # Multi-container setup
├── setup-team.sh         # Automated setup script
├── run-docker.sh         # Simple Docker runner
└── package.json          # Dependencies and scripts
```

## 🔧 Development Workflow

### For New Team Members

1. **Clone the repository**
   ```bash
   git clone https://github.com/yanugonda-karthi-knaidu/SIH-25.git
   cd SIH-25/FutureNest-SIH2025-main
   ```

2. **Choose your setup method**
   - Run `./setup-team.sh` for guided setup
   - Or follow manual steps below

3. **Manual setup**
   ```bash
   npm install              # Install dependencies
   npm start               # Start development server
   ```

### For Active Development

1. **Start development server**
   ```bash
   npm start
   ```

2. **Make changes** to files in `src/`

3. **Test your changes** - the server auto-reloads

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Test production build locally**
   ```bash
   # Using serve (install globally: npm install -g serve)
   serve -s build -l 3000
   
   # Or using Docker
   ./run-docker.sh
   ```

## 🐳 Docker Deep Dive

### Why Use Docker?
- **Consistency**: Same environment for all team members
- **Isolation**: No conflicts with local system
- **Production-like**: Closer to deployment environment
- **Easy sharing**: Share exact environment setup

### Docker Files Explained

- **Dockerfile**: Multi-stage build (Node.js → Nginx)
- **docker-compose.yml**: Orchestrates multiple services
- **Dockerfile.dev**: Development-focused container
- **.dockerignore**: Excludes unnecessary files

### Troubleshooting Docker

1. **Docker daemon not running**
   ```bash
   # Start Docker service
   sudo systemctl start docker
   ```

2. **Permission denied**
   ```bash
   # Add user to docker group
   sudo usermod -aG docker $USER
   # Logout and login again
   ```

3. **Port already in use**
   ```bash
   # Find what's using the port
   lsof -i :3000
   # Kill the process or use different port
   docker run -p 3001:3000 futurenest
   ```

4. **Build failures**
   ```bash
   # Clear Docker cache
   docker system prune -f
   # Rebuild without cache
   docker-compose build --no-cache
   ```

## 📱 Features Overview

### Current Features
- 🏠 **Dashboard**: Learning progress tracking
- 📚 **Smart Roadmaps**: Personalized learning paths
- 🎓 **Colleges List**: Educational institutions
- 📖 **Courses**: Available courses
- 📝 **Exams**: Examination information
- 📚 **E-books**: Digital learning resources
- 🤖 **Chatbot**: AI-powered assistance
- 👤 **User Management**: Authentication and profiles

### Tech Stack
- ⚛️ **React 18**: Frontend framework
- 🎨 **Tailwind CSS**: Styling
- 📦 **Framer Motion**: Animations
- 🧩 **Radix UI**: UI components
- 📊 **Recharts**: Data visualization
- 🚀 **React Router**: Navigation

## 🚀 Deployment

### Local Deployment
```bash
# Build production version
npm run build

# Serve locally
serve -s build -l 3000
```

### Docker Deployment
```bash
# Build and run with Docker
docker-compose up --build

# Or use the simple script
./run-docker.sh
```

### Cloud Deployment (Future)
- **Netlify**: Connect GitHub repo for auto-deploy
- **Vercel**: Easy React app deployment
- **AWS S3 + CloudFront**: Scalable static hosting
- **Docker Hub + Cloud Run**: Containerized deployment

## 🤝 Team Collaboration

### Git Workflow
1. **Pull latest changes**
   ```bash
   git pull origin main
   ```

2. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make changes and commit**
   ```bash
   git add .
   git commit -m "Add your feature description"
   ```

4. **Push branch**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request** on GitHub

### Code Standards
- Use **functional components** with hooks
- Follow **ES6+** syntax
- Use **Tailwind CSS** for styling
- Keep components **small and focused**
- Add **comments** for complex logic

## 📞 Getting Help

### Common Issues & Solutions

1. **npm start fails**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   npm start
   ```

2. **Docker build fails**
   ```bash
   # Use the setup script which has fallbacks
   ./setup-team.sh
   ```

3. **Port conflicts**
   ```bash
   # Kill processes using port 3000
   sudo lsof -t -i:3000 | xargs kill -9
   ```

4. **Permission issues on Linux/Mac**
   ```bash
   # Make scripts executable
   chmod +x setup-team.sh run-docker.sh
   ```

### Contact Team Lead
- Check GitHub Issues for known problems
- Ask in team chat for quick help
- Create detailed bug reports with steps to reproduce

---

## 🎉 Ready to Code!

You're all set! Choose your preferred setup method and start contributing to FutureNest SIH2025.

**Happy coding! 🚀**
