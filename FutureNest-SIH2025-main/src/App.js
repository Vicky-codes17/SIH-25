import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import StudentInfo from './pages/StudentInfo';
import Dashboard from './pages/Dashboard';
import SmartRoadmaps from './pages/SmartRoadmaps';
import UserProfile from './pages/UserProfile';
import ChatBot from './components/chatbot/ChatBot';
import { RouteGuard } from './components/RouteGuard';
import { LearningDashboard } from './components/learning-dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <RouteGuard>
        <div className="App">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/student-info" element={<StudentInfo />} />
            <Route path="/dashboard" element={<LearningDashboard />} />
            <Route path="/roadmaps" element={<SmartRoadmaps />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
          
          {/* ChatBot - Available on all pages */}
          <ChatBot />
        </div>
      </RouteGuard>
    </Router>
  );
}

export default App;