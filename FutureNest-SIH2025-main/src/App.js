import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import StudentInfo from './pages/StudentInfo';
import SmartRoadmaps from './pages/SmartRoadmaps';
import UserProfile from './pages/UserProfile';
import ChatBot from './components/chatbot/ChatBot';
import { RouteGuard } from './components/RouteGuard';
import { LearningDashboard } from './components/learning-dashboard';
import { DummyAuthProvider } from './contexts/DummyAuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <DummyAuthProvider>
      <Router>
        <RouteGuard>
          <div className="App">
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/student-info" element={
                <ProtectedRoute>
                  <StudentInfo />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <LearningDashboard />
                </ProtectedRoute>
              } />
              <Route path="/roadmaps" element={
                <ProtectedRoute>
                  <SmartRoadmaps />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              } />
            </Routes>
            
            {/* ChatBot - Available on all pages */}
            <ChatBot />
          </div>
        </RouteGuard>
      </Router>
    </DummyAuthProvider>
  );
}

export default App;