import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword 
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db, googleProvider, githubProvider } from '../config/firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create or update user profile in Firestore
  const createUserProfile = async (user, additionalData = {}) => {
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      const { displayName, email, photoURL, providerData } = user;
      const provider = providerData[0]?.providerId || 'email';
      
      try {
        await setDoc(userRef, {
          displayName: displayName || email?.split('@')[0] || 'User',
          email,
          photoURL,
          provider,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          // Default profile data
          level: 1,
          xp: 0,
          nextLevelXp: 1000,
          totalProgress: 0,
          challengesAttended: 0,
          timeSpent: "0h 0m",
          coursesCompleted: 0,
          totalCourses: 0,
          currentStreak: 0,
          rank: "#999",
          points: 0,
          // Career and academic data
          title: "Student",
          location: "Not specified",
          phone: "",
          joinDate: new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long' 
          }),
          // Stats
          aptitudeTests: 0,
          careerPathsExplored: 0,
          skillsAssessed: 0,
          studyHours: 0,
          // Additional data from social login
          ...additionalData
        });
      } catch (error) {
        console.error('Error creating user profile:', error);
      }
    } else {
      // Update last login time
      try {
        await updateDoc(userRef, {
          updatedAt: serverTimestamp(),
          lastLogin: serverTimestamp()
        });
      } catch (error) {
        console.error('Error updating user profile:', error);
      }
    }
  };

  // Fetch user profile data
  const fetchUserProfile = async (uid) => {
    if (!uid) return null;
    
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        const profileData = userSnap.data();
        setUserProfile(profileData);
        return profileData;
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
    return null;
  };

  // Update user profile
  const updateUserProfile = async (uid, updates) => {
    if (!uid) return;
    
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      
      // Refresh local profile data
      await fetchUserProfile(uid);
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

  // Sign up with email and password
  const signup = async (email, password, additionalData = {}) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await createUserProfile(result.user, additionalData);
      return result;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  // Sign in with email and password
  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await createUserProfile(result.user);
      return result;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Extract additional info from Google profile
      const additionalData = {
        provider: 'google.com',
        photoURL: user.photoURL,
      };
      
      await createUserProfile(user, additionalData);
      return result;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  // Sign in with GitHub
  const signInWithGithub = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;
      
      // Extract additional info from GitHub profile
      const additionalData = {
        provider: 'github.com',
        photoURL: user.photoURL,
      };
      
      await createUserProfile(user, additionalData);
      return result;
    } catch (error) {
      console.error('Error signing in with GitHub:', error);
      throw error;
    }
  };

  // Sign out
  const logout = async () => {
    try {
      await signOut(auth);
      setUserProfile(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Ensure user profile exists
        await createUserProfile(user);
        // Fetch user profile data
        await fetchUserProfile(user.uid);
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    signup,
    login,
    signInWithGoogle,
    signInWithGithub,
    logout,
    updateUserProfile,
    fetchUserProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}