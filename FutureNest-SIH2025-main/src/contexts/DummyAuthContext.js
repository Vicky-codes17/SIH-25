import React, { createContext, useContext, useState, useEffect } from 'react';

const DummyAuthContext = createContext();

export const useDummyAuth = () => {
  const context = useContext(DummyAuthContext);
  if (!context) {
    throw new Error('useDummyAuth must be used within a DummyAuthProvider');
  }
  return context;
};

export const DummyAuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dummy test credentials
  const testCredentials = [
    {
      email: 'vigneshramesh@test.com',
      password: 'test123',
      name: 'Vignesh Ramesh',
      firstName: 'Vignesh',
      lastName: 'Ramesh',
      phone: '+91 98765 43210',
      avatar: '/placeholder.svg'
    },
    {
      email: 'priya.sharma@test.com',
      password: 'test123',
      name: 'Priya Sharma',
      firstName: 'Priya',
      lastName: 'Sharma',
      phone: '+91 98765 43211',
      avatar: '/professional-student-portrait.png'
    },
    {
      email: 'admin@test.com',
      password: 'admin123',
      name: 'Admin User',
      firstName: 'Admin',
      lastName: 'User',
      phone: '+91 98765 43212',
      avatar: '/placeholder.svg'
    }
  ];

  // Check for existing session on load
  useEffect(() => {
    const savedUser = localStorage.getItem('dummyAuthUser');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading saved user:', error);
        localStorage.removeItem('dummyAuthUser');
      }
    }
    setLoading(false);
  }, []);

  // Save user session
  const saveUserSession = (user) => {
    localStorage.setItem('dummyAuthUser', JSON.stringify(user));
    setCurrentUser(user);
  };

  // Login function
  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = testCredentials.find(
          cred => cred.email === email && cred.password === password
        );
        
        if (user) {
          const userData = {
            uid: `dummy_${Date.now()}`,
            email: user.email,
            displayName: user.name,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            photoURL: user.avatar,
            createdAt: new Date().toISOString(),
            lastLoginAt: new Date().toISOString()
          };
          
          saveUserSession(userData);
          resolve(userData);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000); // Simulate network delay
    });
  };

  // Signup function
  const signup = async (email, password, additionalData = {}) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if user already exists
        const existingUser = testCredentials.find(cred => cred.email === email);
        if (existingUser) {
          reject(new Error('User already exists with this email'));
          return;
        }

        // Create new user
        const userData = {
          uid: `dummy_${Date.now()}`,
          email: email,
          displayName: additionalData.displayName || `${additionalData.firstName} ${additionalData.lastName}`,
          firstName: additionalData.firstName || '',
          lastName: additionalData.lastName || '',
          phone: additionalData.phone || '',
          photoURL: '/placeholder.svg',
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString()
        };

        // Add to test credentials for future logins
        testCredentials.push({
          email: email,
          password: password,
          name: userData.displayName,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
          avatar: userData.photoURL
        });

        saveUserSession(userData);
        resolve(userData);
      }, 1000); // Simulate network delay
    });
  };

  // Google sign-in simulation
  const signInWithGoogle = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const googleUser = {
          uid: `google_dummy_${Date.now()}`,
          email: 'google.user@gmail.com',
          displayName: 'Google Test User',
          firstName: 'Google',
          lastName: 'User',
          phone: '+91 98765 43213',
          photoURL: '/placeholder.svg',
          provider: 'google',
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString()
        };
        
        saveUserSession(googleUser);
        resolve(googleUser);
      }, 1500);
    });
  };

  // GitHub sign-in simulation
  const signInWithGithub = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const githubUser = {
          uid: `github_dummy_${Date.now()}`,
          email: 'github.user@github.com',
          displayName: 'GitHub Test User',
          firstName: 'GitHub',
          lastName: 'User',
          phone: '+91 98765 43214',
          photoURL: '/placeholder.svg',
          provider: 'github',
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString()
        };
        
        saveUserSession(githubUser);
        resolve(githubUser);
      }, 1500);
    });
  };

  // Logout function
  const logout = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem('dummyAuthUser');
        setCurrentUser(null);
        resolve();
      }, 500);
    });
  };

  // Update user profile
  const updateProfile = async (updates) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedUser = { ...currentUser, ...updates };
        saveUserSession(updatedUser);
        resolve(updatedUser);
      }, 1000);
    });
  };

  // Alias for Firebase compatibility
  const updateUserProfile = async (uid, updates) => {
    return updateProfile(updates);
  };

  // Fetch user profile (dummy implementation)
  const fetchUserProfile = async (uid) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(currentUser);
      }, 500);
    });
  };

  const value = {
    currentUser,
    userProfile: currentUser, // For Firebase compatibility
    login,
    signup,
    signInWithGoogle,
    signInWithGithub,
    logout,
    updateProfile,
    updateUserProfile,
    fetchUserProfile,
    loading
  };

  return (
    <DummyAuthContext.Provider value={value}>
      {children}
    </DummyAuthContext.Provider>
  );
};

// Test credentials for development (not exported for UI display)
const TEST_CREDENTIALS = [
  { name: 'Vignesh Ramesh', email: 'vigneshramesh@test.com', password: 'test123' },
  { name: 'Priya Sharma', email: 'priya.sharma@test.com', password: 'test123' },
  { name: 'Admin User', email: 'admin@test.com', password: 'admin123' }
];