import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Chrome, Github, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ChatBot from '../components/chatbot/ChatBot';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGitHubLoading, setIsGitHubLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const { login, signInWithGoogle, signInWithGithub } = useAuth();

  // Helper function to determine user flow based on profile completion
  const navigateBasedOnUserState = (userProfile) => {
    // Set legacy localStorage for existing components
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user_logged_in', 'true');
    
    // Dispatch events for chatbot compatibility
    window.dispatchEvent(new Event('authStateChanged'));
    window.dispatchEvent(new Event('userLoggedIn'));
    window.dispatchEvent(new Event('loginSuccess'));
    
    if (!userProfile) {
      // New user - start onboarding flow
      navigate('/student-info', { replace: true });
    } else if (!userProfile.studentInfoCompleted) {
      // User hasn't completed student info
      navigate('/student-info', { replace: true });
    } else if (!userProfile.quizCompleted && !userProfile.onboardingCompleted) {
      // Student info completed but quiz not taken
      navigate('/quiz', { replace: true });
    } else {
      // Existing user with completed profile - go to dashboard
      navigate('/dashboard', { replace: true });
    }
  };

  // Helper function to check if user exists by email (for social logins)
  const findUserByEmail = (email) => {
    const existingUsers = JSON.parse(localStorage.getItem('futurenest_users') || '[]');
    return existingUsers.find(u => u.email === email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      console.log('🔐 Attempting login with:', email);
    
      // Use local authentication
      const result = await login(email, password);
      console.log('✅ Login successful:', result.user);
      
      // Wait a moment for profile to load, then navigate based on user state
      setTimeout(() => {
        // Get updated user profile from localStorage
        const profileData = localStorage.getItem(`futurenest_profile_${result.user.uid}`);
        const userProfile = profileData ? JSON.parse(profileData) : null;
        
        navigateBasedOnUserState(userProfile);
      }, 100);
      
    } catch (error) {
      console.error('❌ Login error:', error);
      setError(getErrorMessage(error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setError('');
    
    try {
      const result = await signInWithGoogle();
      console.log('✅ Google login successful:', result.user);
      
      // Set legacy localStorage for existing components
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user_logged_in', 'true');
      
      // Dispatch events for chatbot compatibility
      window.dispatchEvent(new Event('authStateChanged'));
      window.dispatchEvent(new Event('userLoggedIn'));
      window.dispatchEvent(new Event('loginSuccess'));
      
      // Check if existing user with this email exists
      const existingUser = findUserByEmail(result.user.email);
      
      setTimeout(() => {
        if (existingUser) {
          // Check profile of existing user
          const profileData = localStorage.getItem(`futurenest_profile_${existingUser.uid}`);
          const userProfile = profileData ? JSON.parse(profileData) : null;
          
          if (userProfile && userProfile.studentInfoCompleted && 
              (userProfile.quizCompleted || userProfile.onboardingCompleted)) {
            // Existing user with completed profile - go to dashboard
            console.log('✅ Existing Google user with completed profile - redirecting to dashboard');
            navigate('/dashboard', { replace: true });
          } else {
            // Existing user but incomplete profile
            navigateBasedOnUserState(userProfile);
          }
        } else {
          // New Google user - check profile created during signup
          const profileData = localStorage.getItem(`futurenest_profile_${result.user.uid}`);
          const userProfile = profileData ? JSON.parse(profileData) : null;
          
          // For new social login users, start with student info
          navigate('/student-info', { replace: true });
        }
      }, 100);
      
    } catch (error) {
      console.error('Google login failed:', error);
      setError(getErrorMessage(error.message));
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGitHubLogin = async () => {
    setIsGitHubLoading(true);
    setError('');
    
    try {
      const result = await signInWithGithub();
      console.log('✅ GitHub login successful:', result.user);
      
      // Set legacy localStorage for existing components
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user_logged_in', 'true');
      
      // Dispatch events for chatbot compatibility
      window.dispatchEvent(new Event('authStateChanged'));
      window.dispatchEvent(new Event('userLoggedIn'));
      window.dispatchEvent(new Event('loginSuccess'));
      
      // Check if existing user with this email exists
      const existingUser = findUserByEmail(result.user.email);
      
      setTimeout(() => {
        if (existingUser) {
          // Check profile of existing user
          const profileData = localStorage.getItem(`futurenest_profile_${existingUser.uid}`);
          const userProfile = profileData ? JSON.parse(profileData) : null;
          
          if (userProfile && userProfile.studentInfoCompleted && 
              (userProfile.quizCompleted || userProfile.onboardingCompleted)) {
            // Existing user with completed profile - go to dashboard
            console.log('✅ Existing GitHub user with completed profile - redirecting to dashboard');
            navigate('/dashboard', { replace: true });
          } else {
            // Existing user but incomplete profile
            navigateBasedOnUserState(userProfile);
          }
        } else {
          // New GitHub user - check profile created during signup
          const profileData = localStorage.getItem(`futurenest_profile_${result.user.uid}`);
          const userProfile = profileData ? JSON.parse(profileData) : null;
          
          // For new social login users, start with student info
          navigate('/student-info', { replace: true });
        }
      }, 100);
      
    } catch (error) {
      console.error('GitHub login failed:', error);
      setError(getErrorMessage(error.message));
    } finally {
      setIsGitHubLoading(false);
    }
  };

  const getErrorMessage = (errorMessage) => {
    if (errorMessage?.includes('User already exists')) {
      return 'An account with this email already exists. Please sign in instead.';
    }
    if (errorMessage?.includes('No user found')) {
      return 'No account found with this email address. Please sign up first.';
    }
    if (errorMessage?.includes('Invalid email')) {
      return 'Please enter a valid email address.';
    }
    return errorMessage || 'Login failed. Please try again.';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/" className="text-3xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
            FutureNest
          </Link>
          <h1 className="text-2xl font-bold text-slate-800 mt-4 mb-2">Welcome Back</h1>
          <p className="text-slate-600">Sign in to continue your career journey</p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700"
            >
              <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </motion.div>
          )}

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading || isGitHubLoading || isLoading}
              className="w-full flex items-center justify-center px-4 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Chrome className="w-5 h-5 mr-3 text-red-500" />
              <span className="text-slate-700">
                {isGoogleLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500 mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Continue with Google'
                )}
              </span>
            </button>
            <button
              onClick={handleGitHubLogin}
              disabled={isGoogleLoading || isGitHubLoading || isLoading}
              className="w-full flex items-center justify-center px-4 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Github className="w-5 h-5 mr-3 text-slate-800" />
              <span className="text-slate-700">
                {isGitHubLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-800 mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Continue with GitHub'
                )}
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-500">Or continue with email</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                <span className="ml-2 text-sm text-slate-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-700">
                Forgot password?
              </Link>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading || isGoogleLoading || isGitHubLoading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </motion.button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-slate-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-indigo-600 hover:text-indigo-700 font-medium">
                Sign up here
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Additional Page Content - Shows login page content */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-3">Why Choose FutureNest?</h2>
            <div className="grid grid-cols-1 gap-4 text-sm text-slate-600">
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                AI-Powered Career Guidance
              </div>
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                Personalized Learning Paths
              </div>
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                Industry Expert Mentorship
              </div>
            </div>
          </div>
          
          <p className="text-slate-500 text-sm">
            Join thousands of students discovering their perfect career path
          </p>
        </motion.div>
      </div>

      {/* Add Chatbot Component */}
      <ChatBot />
    </div>
  );
}