import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  updatePassword
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  serverTimestamp,
  connectFirestoreEmulator,
  enableNetwork,
  disableNetwork
} from 'firebase/firestore';
import { auth, db, googleProvider, githubProvider } from '../config/firebase';

// Add connection retry logic
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const retryOperation = async (operation, retries = MAX_RETRIES) => {
  try {
    return await operation();
  } catch (error) {
    if (retries > 0 && (error.code === 'unavailable' || error.code === 'deadline-exceeded')) {
      console.log(`Retrying operation... ${MAX_RETRIES - retries + 1}/${MAX_RETRIES}`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return retryOperation(operation, retries - 1);
    }
    throw error;
  }
};

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
  
  // Enable Firestore network on component mount
  useEffect(() => {
    const enableFirestoreNetwork = async () => {
      try {
        await enableNetwork(db);
        console.log('Firestore network enabled');
      } catch (error) {
        console.log('Firestore network already enabled or error:', error);
      }
    };
    
    enableFirestoreNetwork();
  }, []);

  // Create user profile in Firestore with retry logic
  const createUserProfile = async (user, additionalData = {}) => {
    if (!user) return;
    
    return retryOperation(async () => {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        const { displayName, email, photoURL } = user;
        const createdAt = serverTimestamp();
        
        await setDoc(userRef, {
          displayName: displayName || additionalData.name || '',
          email,
          photoURL: photoURL || '',
          createdAt,
          lastLogin: serverTimestamp(),
          level: 1,
          xp: 0,
          skillsCompleted: 0,
          testsTaken: 0,
          studyHours: 0,
          careerPaths: [],
          ...additionalData
        });
        console.log('User profile created successfully');
      } else {
        // Update last login
        await updateDoc(userRef, {
          lastLogin: serverTimestamp()
        });
        console.log('User login updated successfully');
      }
      
      return userRef;
    });
  };

  // Fetch user profile from Firestore with retry logic
  const fetchUserProfile = async (uid) => {
    return retryOperation(async () => {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        const profileData = userSnap.data();
        setUserProfile(profileData);
        console.log('User profile fetched successfully');
        return profileData;
      }
      return null;
    });
  };

  // Update user profile
  const updateUserProfile = async (updates) => {
    if (!currentUser) return;
    
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      
      // Update local state
      setUserProfile(prev => ({ ...prev, ...updates }));
      
      // Update Firebase Auth profile if name or photo changed
      if (updates.displayName || updates.photoURL) {
        await updateProfile(currentUser, {
          displayName: updates.displayName,
          photoURL: updates.photoURL
        });
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
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update the user's display name
      await updateProfile(result.user, {
        displayName: name
      });
      
      // Create user profile in Firestore
      await createUserProfile(result.user, { displayName: name });
      
      return result;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  // Email/Password login with better error handling
  const login = async (email, password) => {
    try {
      console.log('Starting email login...');
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('Email auth successful, updating profile...');
      
      // Don't block the auth success on profile update
      createUserProfile(result.user).catch(error => {
        console.error('Profile update failed, but auth succeeded:', error);
      });
      
      return result;
    } catch (error) {
      console.error('Login error:', error.code, error.message);
      throw error;
    }
  };

  // Google sign in with better error handling
  const signInWithGoogle = async () => {
    try {
      console.log('Starting Google sign-in...');
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google auth successful, creating profile...');
      
      // Don't block the auth success on profile creation
      createUserProfile(result.user).catch(error => {
        console.error('Profile creation failed, but auth succeeded:', error);
      });
      
      return result;
    } catch (error) {
      console.error('Google sign in error:', error.code, error.message);
      throw error;
    }
  };

  // GitHub sign in with better error handling
  const signInWithGithub = async () => {
    try {
      console.log('Starting GitHub sign-in...');
      const result = await signInWithPopup(auth, githubProvider);
      console.log('GitHub auth successful, creating profile...');
      
      // Don't block the auth success on profile creation
      createUserProfile(result.user).catch(error => {
        console.error('Profile creation failed, but auth succeeded:', error);
      });
      
      return result;
    } catch (error) {
      console.error('GitHub sign in error:', error.code, error.message);
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      setUserProfile(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  // Auth state change listener with better error handling
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          console.log('User authenticated:', user.email);
          setCurrentUser(user);
          
          // Try to fetch profile, but don't block if it fails
          try {
            await fetchUserProfile(user.uid);
          } catch (error) {
            console.error('Failed to fetch user profile:', error);
            // Set empty profile so user can still access the app
            setUserProfile({
              displayName: user.displayName || user.email,
              email: user.email,
              photoURL: user.photoURL || ''
            });
          }
        } else {
          console.log('User not authenticated');
          setCurrentUser(null);
          setUserProfile(null);
        }
      } catch (error) {
        console.error('Auth state change error:', error);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
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
    updateProfile: updateUserProfile,
    fetchUserProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};