import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  // Local storage keys
  const USER_STORAGE_KEY = 'futurenest_user';
  const PROFILE_STORAGE_KEY = 'futurenest_profile';

  // Generate unique user ID
  const generateUserId = () => {
    return 'user_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  };

  // Create user profile in local storage
  const createUserProfile = async (user, additionalData = {}) => {
    if (!user) return;
    
    const existingProfile = localStorage.getItem(PROFILE_STORAGE_KEY + '_' + user.uid);
    
    if (!existingProfile) {
      const createdAt = new Date().toISOString();
      const userProfileData = {
        uid: user.uid,
        displayName: user.displayName || additionalData.name || '',
        email: user.email,
        photoURL: user.photoURL || '',
        createdAt,
        lastLogin: new Date().toISOString(),
        level: 1,
        xp: 0,
        skillsCompleted: 0,
        testsTaken: 0,
        studyHours: 0,
        careerPaths: [],
        ...additionalData
      };
      
      localStorage.setItem(PROFILE_STORAGE_KEY + '_' + user.uid, JSON.stringify(userProfileData));
      setUserProfile(userProfileData);
    } else {
      // Update last login
      const profile = JSON.parse(existingProfile);
      profile.lastLogin = new Date().toISOString();
      localStorage.setItem(PROFILE_STORAGE_KEY + '_' + user.uid, JSON.stringify(profile));
      setUserProfile(profile);
    }
  };

  // Fetch user profile from local storage
  const fetchUserProfile = async (uid) => {
    try {
      const profileData = localStorage.getItem(PROFILE_STORAGE_KEY + '_' + uid);
      
      if (profileData) {
        const profile = JSON.parse(profileData);
        setUserProfile(profile);
        return profile;
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
    return null;
  };

  // Update user profile
  const updateUserProfile = async (updates) => {
    if (!currentUser) return;
    
    try {
      const existingProfile = localStorage.getItem(PROFILE_STORAGE_KEY + '_' + currentUser.uid);
      let profile = existingProfile ? JSON.parse(existingProfile) : {};
      
      profile = {
        ...profile,
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem(PROFILE_STORAGE_KEY + '_' + currentUser.uid, JSON.stringify(profile));
      setUserProfile(profile);
      
      // Update current user if name or photo changed
      if (updates.displayName || updates.photoURL) {
        const updatedUser = {
          ...currentUser,
          displayName: updates.displayName || currentUser.displayName,
          photoURL: updates.photoURL || currentUser.photoURL
        };
        setCurrentUser(updatedUser);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      }
      
      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  // Email/Password signup
  const signup = async (email, password, name) => {
    try {
      console.log('🔥 Local signup started for:', email);
      
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('futurenest_users') || '[]');
      const userExists = existingUsers.find(u => u.email === email);
      
      if (userExists) {
        throw new Error('User already exists with this email');
      }
      
      // Create new user
      const newUser = {
        uid: generateUserId(),
        email,
        displayName: name,
        photoURL: '',
        createdAt: new Date().toISOString()
      };
      
      // Save user to users list
      existingUsers.push(newUser);
      localStorage.setItem('futurenest_users', JSON.stringify(existingUsers));
      
      // Set as current user
      setCurrentUser(newUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
      
      // Create user profile
      await createUserProfile(newUser, { displayName: name });
      
      console.log('✅ User created:', newUser.uid);
      
      return { user: newUser };
    } catch (error) {
      console.error('❌ Signup error:', error);
      throw error;
    }
  };

  // Email/Password login
  const login = async (email, password) => {
    try {
      console.log('🔥 Local login started for:', email);
      
      // Find user in local storage
      const existingUsers = JSON.parse(localStorage.getItem('futurenest_users') || '[]');
      const user = existingUsers.find(u => u.email === email);
      
      if (!user) {
        throw new Error('No user found with this email');
      }
      
      // Set as current user
      setCurrentUser(user);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      
      // Load/create user profile
      await createUserProfile(user);
      
      console.log('✅ User logged in:', user.uid);
      
      return { user };
    } catch (error) {
      console.error('❌ Login error:', error);
      throw error;
    }
  };

  // Google sign in (mock implementation)
  const signInWithGoogle = async () => {
    try {
      // Mock Google user data
      const googleUser = {
        uid: generateUserId(),
        email: 'user@gmail.com',
        displayName: 'Google User',
        photoURL: 'https://via.placeholder.com/150',
        createdAt: new Date().toISOString()
      };
      
      setCurrentUser(googleUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(googleUser));
      await createUserProfile(googleUser);
      
      return { user: googleUser };
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    }
  };

  // GitHub sign in (mock implementation)
  const signInWithGithub = async () => {
    try {
      // Mock GitHub user data
      const githubUser = {
        uid: generateUserId(),
        email: 'user@github.com',
        displayName: 'GitHub User',
        photoURL: 'https://via.placeholder.com/150',
        createdAt: new Date().toISOString()
      };
      
      setCurrentUser(githubUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(githubUser));
      await createUserProfile(githubUser);
      
      return { user: githubUser };
    } catch (error) {
      console.error('GitHub sign in error:', error);
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
      setCurrentUser(null);
      setUserProfile(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  // Update student information
  const updateStudentInfo = async (studentData) => {
    if (!currentUser) return;
    
    try {
      const existingProfile = localStorage.getItem(PROFILE_STORAGE_KEY + '_' + currentUser.uid);
      let profile = existingProfile ? JSON.parse(existingProfile) : {};
      
      profile = {
        ...profile,
        ...studentData,
        studentInfoCompleted: true,
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem(PROFILE_STORAGE_KEY + '_' + currentUser.uid, JSON.stringify(profile));
      setUserProfile(profile);
      
      return true;
    } catch (error) {
      console.error('Error updating student info:', error);
      throw error;
    }
  };

  // Save quiz results
  const saveQuizResults = async (quizData) => {
    if (!currentUser) return;
    
    try {
      const existingProfile = localStorage.getItem(PROFILE_STORAGE_KEY + '_' + currentUser.uid);
      let profile = existingProfile ? JSON.parse(existingProfile) : {};
      
      profile = {
        ...profile,
        quizResults: quizData,
        quizCompleted: true,
        onboardingCompleted: true,
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem(PROFILE_STORAGE_KEY + '_' + currentUser.uid, JSON.stringify(profile));
      setUserProfile(profile);
      
      return true;
    } catch (error) {
      console.error('Error saving quiz results:', error);
      throw error;
    }
  };

  // Initialize auth state on component mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem(USER_STORAGE_KEY);
        
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setCurrentUser(user);
          await fetchUserProfile(user.uid);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const value = {
    currentUser,
    userProfile,
    signup,
    login,
    logout,
    signInWithGoogle,
    signInWithGithub,
    updateUserProfile,
    updateProfile: updateUserProfile, // Alias for compatibility
    fetchUserProfile,
    updateStudentInfo,
    saveQuizResults,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};