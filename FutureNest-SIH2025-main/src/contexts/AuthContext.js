import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  serverTimestamp,
  enableNetwork,
  disableNetwork
} from 'firebase/firestore';
import { auth, db, googleProvider, githubProvider } from '../config/firebase';

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
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Monitor network status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      console.log('Network connection restored');
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      console.log('Network connection lost');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Create user profile with better error handling
  const createUserProfile = async (user, additionalData = {}) => {
    if (!user) return;
    
    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        const { displayName, email, photoURL } = user;
        const profileData = {
          displayName: displayName || additionalData.name || '',
          email,
          photoURL: photoURL || '',
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
          level: 1,
          xp: 0,
          skillsCompleted: 0,
          testsTaken: 0,
          studyHours: 0,
          careerPaths: [],
          ...additionalData
        };
        
        await setDoc(userRef, profileData);
        setUserProfile(profileData);
        console.log('User profile created successfully');
      } else {
        // Update last login
        await updateDoc(userRef, {
          lastLogin: serverTimestamp()
        });
        const existingProfile = userSnap.data();
        setUserProfile(existingProfile);
        console.log('User login updated successfully');
      }
      
      return userRef;
    } catch (error) {
      console.error('Profile creation/update failed:', error);
      
      // If offline, create a minimal local profile
      if (error.code === 'unavailable' || !isOnline) {
        const fallbackProfile = {
          displayName: user.displayName || user.email,
          email: user.email,
          photoURL: user.photoURL || '',
          offline: true
        };
        setUserProfile(fallbackProfile);
        console.log('Using offline fallback profile');
      }
      
      // Don't throw error - allow auth to succeed even if profile creation fails
      return null;
    }
  };

  // Fetch user profile with offline handling
  const fetchUserProfile = async (uid) => {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        const profileData = userSnap.data();
        setUserProfile(profileData);
        return profileData;
      }
      return null;
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      // Return null instead of throwing - let the app continue
      return null;
    }
  };

  // Update user profile with offline handling
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
      
      // If offline, update local state only
      if (error.code === 'unavailable' || !isOnline) {
        setUserProfile(prev => ({ ...prev, ...updates, offline: true }));
        console.log('Profile updated locally (offline mode)');
        return true;
      }
      
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
      
      // Try to create profile, but don't fail if it doesn't work
      createUserProfile(result.user, { displayName: name }).catch(error => {
        console.error('Profile creation failed during signup:', error);
      });
      
      return result;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  // Email/Password login
  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // Try to update profile, but don't fail if it doesn't work
      createUserProfile(result.user).catch(error => {
        console.error('Profile update failed during login:', error);
      });
      
      return result;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Google sign in with better error handling
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      
      // Try to create/update profile, but don't block authentication
      createUserProfile(result.user).catch(error => {
        console.error('Profile creation failed during Google sign-in:', error);
      });
      
      return result;
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    }
  };

  // GitHub sign in with better error handling
  const signInWithGithub = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      
      // Try to create/update profile, but don't block authentication
      createUserProfile(result.user).catch(error => {
        console.error('Profile creation failed during GitHub sign-in:', error);
      });
      
      return result;
    } catch (error) {
      console.error('GitHub sign in error:', error);
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

  // Auth state change listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          setCurrentUser(user);
          
          // Try to fetch profile, but use fallback if it fails
          try {
            await fetchUserProfile(user.uid);
          } catch (error) {
            console.error('Failed to fetch profile on auth change:', error);
            // Create minimal fallback profile
            setUserProfile({
              displayName: user.displayName || user.email,
              email: user.email,
              photoURL: user.photoURL || '',
              offline: true
            });
          }
        } else {
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
    loading,
    isOnline
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};