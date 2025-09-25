// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC0T_xCnDGNVyoUqRhkWtFtjEBLcCmUM80",
  authDomain: "sih-2025app.firebaseapp.com",
  databaseURL: "https://sih-2025app-default-rtdb.firebaseio.com",
  projectId: "sih-2025app",
  storageBucket: "sih-2025app.firebasestorage.app",
  messagingSenderId: "594078392304",
  appId: "1:594078392304:web:e7e0be9e2a8e418bec8735",
  measurementId: "G-M95N42D431"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

// Configure providers
googleProvider.addScope('email');
googleProvider.addScope('profile');
githubProvider.addScope('user:email');

// Set custom parameters
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;