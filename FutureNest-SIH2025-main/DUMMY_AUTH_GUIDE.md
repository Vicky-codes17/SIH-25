# 🧪 Dummy Authentication System - Test Credentials

Your FutureNest application is now set up with a **dummy authentication system** for testing purposes. Here are the test credentials you can use:

## 🔑 **Test Login Credentials**

### **Method 1: Pre-defined Test Users**
| Name | Email | Password |
|------|-------|----------|
| **John Doe** | `john.doe@test.com` | `test123` |
| **Priya Sharma** | `priya.sharma@test.com` | `test123` |
| **Admin User** | `admin@test.com` | `admin123` |

### **Method 2: Social Sign-In (Simulated)**
- **Google Sign-In**: Creates `Google Test User` account automatically
- **GitHub Sign-In**: Creates `GitHub Test User` account automatically

### **Method 3: Sign Up New Users**
- Create any new user with email/password
- All new signups are automatically stored for future logins
- Names will be displayed throughout the app based on signup data

## 🎯 **How to Test**

1. **Go to Login Page** (`/login`)
2. **Click any test credential** in the blue box to auto-fill the form
3. **Or manually enter** any of the credentials above
4. **Or try social sign-in** (Google/GitHub - simulated)
5. **Or create a new account** via signup page

## 📱 **What You'll See**

- ✅ **Welcome message** with your name on dashboard
- ✅ **Profile page** showing your details  
- ✅ **User name** in navigation dropdown
- ✅ **Persistent login** across browser sessions
- ✅ **Proper logout** functionality

## 🔄 **Easy Switching Between Firebase & Dummy Auth**

The app is currently using **DummyAuthContext**. To switch back to Firebase:

1. In `src/App.js`: Change `DummyAuthProvider` → `AuthProvider`
2. In `src/components/ProtectedRoute.js`: Change `useDummyAuth` → `useAuth`
3. In `src/pages/LoginPage.js`: Change `useDummyAuth` → `useAuth`
4. In `src/pages/SignUpPage.js`: Change `useDummyAuth` → `useAuth`
5. In `src/pages/UserProfile.js`: Change `useDummyAuth` → `useAuth`
6. In `src/components/learning-dashboard.js`: Change `useDummyAuth` → `useAuth`

## 🚀 **Features Working**

- ✅ **Login/Signup forms** with validation
- ✅ **Protected routes** (redirects to login if not authenticated)
- ✅ **User data persistence** (localStorage)
- ✅ **Name display** across all pages
- ✅ **Profile management**
- ✅ **Session management**
- ✅ **Logout functionality**

## 📝 **Technical Notes**

- **Storage**: Uses `localStorage` for session persistence
- **Context**: `DummyAuthContext` provides same interface as Firebase
- **Simulation**: Includes network delays for realistic testing
- **Fallback**: Default profile data when user details are minimal

---

**🎉 Ready to test! Start by clicking any test credential on the login page.**