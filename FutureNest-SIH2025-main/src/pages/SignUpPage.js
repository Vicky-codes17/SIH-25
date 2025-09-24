import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Chrome, Github, User, Mail, Phone, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDummyAuth } from '../contexts/DummyAuthContext';

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGitHubLoading, setIsGitHubLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
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
  const { signup, signInWithGoogle, signInWithGithub } = useDummyAuth();

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (!agreedToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const additionalData = {
        displayName: `${formData.firstName} ${formData.lastName}`,
        phone: formData.phone,
        firstName: formData.firstName,
        lastName: formData.lastName,
        provider: 'email'
      };
      
      await signup(formData.email, formData.password, additionalData);
      handleSuccessfulAuth();
    } catch (error) {
      console.error('Signup failed:', error);
      setError(getFirebaseErrorMessage(error.code));
    }
    setIsLoading(false);
  };

  const handleSuccessfulAuth = () => {
    // Set legacy localStorage for existing components
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user_logged_in', 'true');
    
    // Dispatch events for chatbot compatibility
    window.dispatchEvent(new Event('authStateChanged'));
    window.dispatchEvent(new Event('userSignedUp'));
    window.dispatchEvent(new Event('signupSuccess'));
    window.dispatchEvent(new Event('userLoggedIn'));
    
    // Navigate to dashboard
    navigate('/dashboard');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleGoogleSignup = async () => {
    setIsGoogleLoading(true);
    setError('');
    
    try {
      await signInWithGoogle();
      handleSuccessfulAuth();
    } catch (error) {
      console.error('Google signup failed:', error);
      setError(getFirebaseErrorMessage(error.code));
    }
    setIsGoogleLoading(false);
  };

  const handleGitHubSignup = async () => {
    setIsGitHubLoading(true);
    setError('');
    
    try {
      await signInWithGithub();
      handleSuccessfulAuth();
    } catch (error) {
      console.error('GitHub signup failed:', error);
      setError(getFirebaseErrorMessage(error.code));
    }
    setIsGitHubLoading(false);
  };

  const getFirebaseErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'An account with this email already exists.';
      case 'auth/invalid-email':
        return 'Invalid email address format.';
      case 'auth/operation-not-allowed':
        return 'Email/password accounts are not enabled.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters long.';
      case 'auth/popup-closed-by-user':
        return 'Sign-up was cancelled.';
      case 'auth/popup-blocked':
        return 'Pop-up blocked. Please allow pop-ups and try again.';
      default:
        return 'An error occurred during sign-up. Please try again.';
    }
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

          {/* Social Sign Up Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={handleGoogleSignup}
              disabled={isGoogleLoading || isGitHubLoading || isLoading}
              className="flex items-center justify-center px-4 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGoogleLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-500"></div>
              ) : (
                <Chrome className="w-5 h-5 text-red-500" />
              )}
            </button>
            <button
              onClick={handleGitHubSignup}
              disabled={isGoogleLoading || isGitHubLoading || isLoading}
              className="flex items-center justify-center px-4 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGitHubLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-800"></div>
              ) : (
                <Github className="w-5 h-5 text-slate-800" />
              )}
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
          <form onSubmit={handleEmailSignup} className="space-y-4">
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
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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

            {/* Password Validation */}
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <div className="text-red-600 text-sm">
                Passwords do not match
              </div>
            )}

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
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
              disabled={isLoading || isGoogleLoading || isGitHubLoading || formData.password !== formData.confirmPassword || !agreedToTerms}
              className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-3 rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all font-medium flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
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