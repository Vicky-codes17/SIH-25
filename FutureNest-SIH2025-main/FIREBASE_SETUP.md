# 🔥 Firebase Setup Guide for FutureNest

## 📋 Overview
This guide will help you set up Firebase authentication and Firestore database for your FutureNest application with Google and GitHub sign-in capabilities.

## 🚀 Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name: `futurenest-sih2025` (or your preferred name)
4. Enable Google Analytics (optional but recommended)
5. Click "Create project"

## 🔑 Step 2: Get Firebase Configuration

1. In Firebase Console, click the gear icon ⚙️ → "Project settings"
2. Scroll down to "Your apps" section
3. Click the web icon `</>` to add a web app
4. Enter app nickname: `FutureNest Web App`
5. Check "Also set up Firebase Hosting" (optional)
6. Click "Register app"
7. Copy the Firebase configuration object

## 📝 Step 3: Update Firebase Config

Replace the placeholder config in `src/config/firebase.js`:

```javascript
// Your Firebase config (replace the placeholder values)
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id" // Optional
};
```

## 🔐 Step 4: Enable Authentication

1. In Firebase Console, go to "Authentication" → "Sign-in method"
2. Enable these providers:

### Email/Password:
- Click "Email/Password"
- Enable the first option (Email/Password)
- Click "Save"

### Google Sign-In:
- Click "Google"
- Enable the provider
- Select project support email
- Click "Save"

### GitHub Sign-In:
- Click "GitHub"
- Enable the provider
- You'll need to create a GitHub OAuth App:

#### GitHub OAuth Setup:
1. Go to GitHub → Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: `FutureNest SIH2025`
   - **Homepage URL**: `http://localhost:3000` (for development)
   - **Authorization callback URL**: `https://your-project-id.firebaseapp.com/__/auth/handler`
4. Click "Register application"
5. Copy the **Client ID** and **Client Secret**
6. Paste them in Firebase GitHub provider settings
7. Click "Save"

## 🗄️ Step 5: Set Up Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location (choose closest to your users)
5. Click "Done"

### Firestore Security Rules (for development):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to authenticated users
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow read access to public data
    match /public/{document=**} {
      allow read: if true;
    }
  }
}
```

## 🏗️ Step 6: Update Production URLs

When deploying to production, update these URLs:

### In Firebase Console → Authentication → Settings:
- **Authorized domains**: Add your production domain

### In GitHub OAuth App:
- **Homepage URL**: Your production URL
- **Authorization callback URL**: `https://your-project-id.firebaseapp.com/__/auth/handler`

## 📦 Step 7: Install Dependencies

Make sure you have Firebase installed:

```bash
npm install firebase
```

## 🧪 Step 8: Test Authentication

1. Start your development server:
   ```bash
   npm start
   ```

2. Navigate to the signup page and test:
   - ✅ Email/Password registration
   - ✅ Google Sign-In
   - ✅ GitHub Sign-In

## 🔍 Step 9: Verify Database Integration

1. Create a test account
2. Check Firebase Console → Firestore Database
3. You should see a new document in the `users` collection with user data

## 🚨 Important Security Notes

### For Production:
1. **Update Firestore Rules**: Replace test mode with proper security rules
2. **Environment Variables**: Store Firebase config in environment variables
3. **Domain Whitelist**: Only allow your production domains in Firebase settings

### Firestore Production Rules Example:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null; // Allow reading other users' public data
    }
  }
}
```

## 🔧 Troubleshooting

### Common Issues:

1. **"Firebase config not found"**
   - Ensure you've replaced the placeholder config in `firebase.js`

2. **"GitHub OAuth error"**
   - Check callback URL in GitHub OAuth App settings
   - Verify Client ID and Secret in Firebase

3. **"Google Sign-In failed"**
   - Ensure Google provider is enabled in Firebase
   - Check if project support email is set

4. **"Firestore permission denied"**
   - Update Firestore rules to allow authenticated users

### Debug Steps:
1. Open browser Developer Tools → Console
2. Check for any error messages
3. Verify Firebase config is loaded correctly
4. Test authentication methods one by one

## 📱 Features Implemented

- ✅ Email/Password authentication
- ✅ Google OAuth sign-in
- ✅ GitHub OAuth sign-in  
- ✅ Real-time user profile data
- ✅ Protected routes
- ✅ Automatic user profile creation
- ✅ Persistent authentication state
- ✅ Error handling and loading states

## 🎯 Next Steps

1. Set up your Firebase project using this guide
2. Test the authentication flow
3. Customize the user profile fields as needed
4. Deploy to production with proper security rules

---

**Need Help?** 
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Auth Guide](https://firebase.google.com/docs/auth)
- [Firestore Guide](https://firebase.google.com/docs/firestore)