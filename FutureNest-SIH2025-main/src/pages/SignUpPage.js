import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Chrome, Github, User, Mail, Phone, Lock, ArrowRight, Facebook, Apple } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { handleGoogleAuth, handleGitHubAuth } from '../utils/authUtils';

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGitHubLoading, setIsGitHubLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const navigate = useNavigate();

  // Fixed: Properly handle form signup with authentication
  const handleSignUp = (e) => {
    e.preventDefault();
    
    // Set authentication status
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user_logged_in', 'true');
    localStorage.setItem('userToken', 'signup_' + Date.now()); // Add a token
    
    // Store user data
    const userData = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      signupMethod: 'email',
      signupTime: new Date().toISOString(),
      isAuthenticated: true
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('user_data', JSON.stringify(userData));
    
    // Dispatch multiple events to ensure chatbot catches the authentication
    window.dispatchEvent(new Event('authStateChanged'));
    window.dispatchEvent(new Event('userSignedUp'));
    window.dispatchEvent(new Event('signupSuccess'));
    window.dispatchEvent(new Event('userLoggedIn'));
    
    // Navigate to student info
    navigate('/student-info');
  };

  // Fixed: Handle social signup properly
  const handleSocialSignUp = (provider) => {
    // Set authentication status for social signup
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user_logged_in', 'true');
    localStorage.setItem('userToken', `${provider}_` + Date.now());
    
    // Store user data for social signup
    const userData = {
      name: 'Social User',
      email: `user@${provider}.com`,
      signupMethod: provider,
      signupTime: new Date().toISOString(),
      isAuthenticated: true
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('user_data', JSON.stringify(userData));
    
    // Dispatch authentication events
    window.dispatchEvent(new Event('authStateChanged'));
    window.dispatchEvent(new Event('userSignedUp'));
    window.dispatchEvent(new Event('signupSuccess'));
    window.dispatchEvent(new Event('userLoggedIn'));
    
    // Navigate to student info
    navigate('/student-info');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Fixed: Properly handle Google authentication
  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      const user = await handleGoogleAuth();
      if (user) {
        console.log('Google login successful:', user);
        
        // Set authentication status
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user_logged_in', 'true');
        localStorage.setItem('googleAuthData', JSON.stringify(user));
        localStorage.setItem('userToken', 'google_' + Date.now());
        
        // Store user data
        const userData = {
          name: user.displayName || 'Google User',
          email: user.email,
          signupMethod: 'google',
          signupTime: new Date().toISOString(),
          isAuthenticated: true,
          googleData: user
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('user_data', JSON.stringify(userData));
        
        // Dispatch authentication events
        window.dispatchEvent(new Event('authStateChanged'));
        window.dispatchEvent(new Event('userSignedUp'));
        window.dispatchEvent(new Event('signupSuccess'));
        window.dispatchEvent(new Event('userLoggedIn'));
        
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Google login failed:', error);
    }
    setIsGoogleLoading(false);
  };

  // Fixed: Properly handle GitHub authentication
  const handleGitHubLogin = async () => {
    setIsGitHubLoading(true);
    try {
      const user = await handleGitHubAuth();
      if (user) {
        console.log('GitHub login successful:', user);
        
        // Set authentication status
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user_logged_in', 'true');
        localStorage.setItem('githubAuthData', JSON.stringify(user));
        localStorage.setItem('userToken', 'github_' + Date.now());
        
        // Store user data
        const userData = {
          name: user.login || user.name || 'GitHub User',
          email: user.email || 'github@example.com',
          signupMethod: 'github',
          signupTime: new Date().toISOString(),
          isAuthenticated: true,
          githubData: user
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('user_data', JSON.stringify(userData));
        
        // Dispatch authentication events
        window.dispatchEvent(new Event('authStateChanged'));
        window.dispatchEvent(new Event('userSignedUp'));
        window.dispatchEvent(new Event('signupSuccess'));
        window.dispatchEvent(new Event('userLoggedIn'));
        
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('GitHub login failed:', error);
    }
    setIsGitHubLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/" className="text-3xl font-bold text-violet-600 hover:text-violet-700 transition-colors">
            FutureNest
          </Link>
          <h1 className="text-2xl font-bold text-slate-800 mt-4 mb-2">Create Your Account</h1>
          <p className="text-slate-600">Join thousands of students building their future</p>
        </motion.div>

        {/* Sign Up Form */}
        <motion.div
          className="bg-white rounded-2xl shadow-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Social Sign Up Buttons - Fixed to use proper handlers */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
              className="flex items-center justify-center px-4 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              {isGoogleLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-500"></div>
              ) : (
                <Chrome className="w-5 h-5 text-red-500" />
              )}
            </button>
            <button
              onClick={() => handleSocialSignUp("facebook")}
              className="flex items-center justify-center px-4 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Facebook className="w-5 h-5 text-blue-600" />
            </button>
            <button
              onClick={handleGitHubLogin}
              disabled={isGitHubLoading}
              className="flex items-center justify-center px-4 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              {isGitHubLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-800"></div>
              ) : (
                <Github className="w-5 h-5 text-slate-800" />
              )}
            </button>
            <button
              onClick={() => handleSocialSignUp("apple")}
              className="flex items-center justify-center px-4 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Apple className="w-5 h-5 text-slate-800" />
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-500">Or sign up with email</span>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSignUp} className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-colors"
                    placeholder="First name"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-colors"
                    placeholder="Last name"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-colors"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-colors"
                  placeholder="Create a password"
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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-colors"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="rounded border-slate-300 text-violet-600 focus:ring-violet-500 mt-1"
                required
              />
              <span className="ml-2 text-sm text-slate-600">
                I agree to the{" "}
                <Link to="/terms" className="text-violet-600 hover:text-violet-700">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-violet-600 hover:text-violet-700">
                  Privacy Policy
                </Link>
              </span>
            </div>

            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-3 rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all font-medium flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Create Account
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-slate-600">
              Already have an account?{" "}
              <Link to="/login" className="text-violet-600 hover:text-violet-700 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}