# 🎓 EduBuddy - AI Student Advisor Platform

[![SIH 2025](https://img.shields.io/badge/SIH-2025-blue.svg)](https://sih.gov.in/)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC.svg)](https://tailwindcss.com/)

> **Smart India Hackathon 2025 Project** - An intelligent student advisor platform that provides personalized guidance for college recommendations, career roadmaps, and learning resources.

## 🌟 Features

### 🤖 AI-Powered Chatbot
- **3 Free Guest Chats** for unregistered users
- **Smart Intent Detection** with multi-language support (English, Hindi, Telugu)
- **Voice Input/Output** capabilities
- **Context-aware Suggestions** and quick action chips
- **Animated Mascot** with peek interactions

### 📊 Student Dashboard
- **Learning Progress Tracking** with visual analytics
- **Skill Assessment** and progress bars
- **Achievement Badges** and milestone celebrations
- **Personalized Roadmaps** for career development

### 🎯 Core Functionality
- **College Recommendations** based on marks, stream, and preferences
- **Career Guidance** with step-by-step learning paths
- **Resource Curation** - books, courses, tutorials
- **Progress Analytics** with detailed insights

### 🎨 Modern UI/UX
- **Responsive Design** - mobile-first approach
- **Glass-morphism Styling** with smooth animations
- **Accessibility Features** - ARIA compliant
- **Professional Logout** with loading states

## 🚀 Tech Stack

- **Frontend**: React 18, React Router DOM
- **Styling**: Tailwind CSS, Custom CSS animations
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Voice**: Web Speech API
- **Storage**: Local Storage for persistence

## 📁 Project Structure

```
src/
├── components/
│   ├── chatbot/
│   │   ├── ChatBot.js          # Main chatbot component
│   │   └── ChatBot.css         # Chatbot styling
│   ├── ui/                     # Reusable UI components
│   │   ├── avatar.js           # Avatar component
│   │   ├── badge.js            # Badge component  
│   │   ├── button.js           # Button component
│   │   ├── card.js             # Card component
│   │   └── progress.js         # Progress component
│   └── learning-dashboard.js   # Main dashboard component
├── pages/                      # Application pages
│   ├── Dashboard.js            # Main dashboard page
│   ├── LoginPage.js            # User login
│   ├── RoadmapsPage.js         # Learning roadmaps
│   ├── SignUpPage.js           # User registration
│   ├── StudentInfo.js          # Student information
│   ├── UserProfile.js          # User profile page
│   └── WelcomePage.js          # Landing page
├── utils/
│   └── chatbotUtils.js         # AI logic and utilities
├── lib/
│   └── utils.js                # Utility functions
└── App.js                      # Main app with routing
```

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/edubuddy-sih2025.git
   cd edubuddy-sih2025
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   - Navigate to `http://localhost:3000`

## 🎮 Usage Guide

### For Guests
1. Visit the platform and interact with the AI mascot
2. Get 3 free chat sessions to explore features
3. Ask about colleges, careers, or study resources
4. Register for unlimited access

### For Registered Users
1. Complete student information setup
2. Access personalized dashboard
3. Track learning progress and skills
4. Get customized career roadmaps
5. Use unlimited AI advisor sessions

## 🎯 Key Pages

- **`/`** - Welcome/Landing page
- **`/login`** - User authentication
- **`/signup`** - New user registration
- **`/student-info`** - Student profile setup
- **`/dashboard`** - Main learning dashboard
- **`/profile`** - User profile management
- **`/roadmaps`** - Career roadmaps page

## 🔧 Configuration

### Environment Setup
```bash
# Optional environment variables
REACT_APP_CHATBOT_API_URL=your_api_endpoint
REACT_APP_GUEST_CHAT_LIMIT=3
REACT_APP_ENABLE_VOICE=true
REACT_APP_DEFAULT_LANGUAGE=en
```

## 🎨 Design System

### Color Palette
- **Primary**: `#2563eb` (Blue)
- **Secondary**: `#52da2d` (Green)
- **Accent**: `#f59e0b` (Orange)
- **Background**: `#ffffff` (White)
- **Text**: `#1f2937` (Dark Gray)

### Key Animations
- Slide-in/out transitions
- Loading spinners
- Hover effects
- Pulse animations

## 📊 Features Breakdown

### ✅ Completed Features
- [x] AI Chatbot with guest limits
- [x] User authentication flow
- [x] Student dashboard
- [x] Profile management
- [x] Responsive design
- [x] Professional logout
- [x] Progress tracking
- [x] Voice input/output
- [x] Multi-language support

### 🚧 Future Enhancements
- [ ] Backend API integration
- [ ] Real-time chat features
- [ ] Advanced analytics
- [ ] Mobile app version
- [ ] Social features
- [ ] Gamification elements

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is created for **Smart India Hackathon 2025**. All rights reserved.

## 👥 Team

**Team Name**: [Your Team Name]
**Institution**: SVCET
**Hackathon**: Smart India Hackathon 2025

## 📧 Contact

- **GitHub**: 
- **Email**: 

---

<div align="center">
  <strong>Built with ❤️ for SIH'2025</strong>
  <br>
  <sub>Empowering students with AI-driven guidance</sub>
</div>