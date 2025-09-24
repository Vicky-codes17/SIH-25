// Authentication utility functions for Google and GitHub OAuth

export const saveAuthData = (provider, userData) => {
  try {
    const storageKey = `${provider}AuthData`
    const existingData = JSON.parse(localStorage.getItem(storageKey) || '{"users": []}')
    
    // Check if user already exists
    const existingUserIndex = existingData.users.findIndex(
      user => user.email === userData.email
    )
    
    const userWithTimestamp = {
      ...userData,
      lastLogin: new Date().toISOString(),
      provider: provider
    }
    
    if (existingUserIndex >= 0) {
      // Update existing user
      existingData.users[existingUserIndex] = userWithTimestamp
    } else {
      // Add new user
      existingData.users.push(userWithTimestamp)
    }
    
    localStorage.setItem(storageKey, JSON.stringify(existingData))
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('currentUser', JSON.stringify(userWithTimestamp))
    
    return userWithTimestamp
  } catch (error) {
    console.error('Error saving auth data:', error)
    return null
  }
}

export const getAuthData = (provider) => {
  try {
    const storageKey = `${provider}AuthData`
    return JSON.parse(localStorage.getItem(storageKey) || '{"users": []}')
  } catch (error) {
    console.error('Error getting auth data:', error)
    return { users: [] }
  }
}

export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem('currentUser') || 'null')
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

export const clearAuthData = () => {
  localStorage.removeItem('googleAuthData')
  localStorage.removeItem('githubAuthData')
  localStorage.removeItem('isAuthenticated')
  localStorage.removeItem('currentUser')
  localStorage.removeItem('userToken')
  localStorage.removeItem('userData')
}

// Simulate Google OAuth flow
export const handleGoogleAuth = () => {
  return new Promise((resolve) => {
    // Simulate API response delay
    setTimeout(() => {
      const mockGoogleUser = {
        id: `google_${Date.now()}`,
        name: "John Doe",
        email: "john.doe@gmail.com",
        picture: "https://via.placeholder.com/150",
        given_name: "John",
        family_name: "Doe",
        verified_email: true
      }
      
      const savedUser = saveAuthData('google', mockGoogleUser)
      resolve(savedUser)
    }, 1500)
  })
}

// Simulate GitHub OAuth flow  
export const handleGitHubAuth = () => {
  return new Promise((resolve) => {
    // Simulate API response delay
    setTimeout(() => {
      const mockGitHubUser = {
        id: `github_${Date.now()}`,
        login: "johndoe",
        name: "John Doe",
        email: "john.doe@users.noreply.github.com",
        avatar_url: "https://via.placeholder.com/150",
        bio: "Software Developer",
        public_repos: 25,
        followers: 100
      }
      
      const savedUser = saveAuthData('github', mockGitHubUser)
      resolve(savedUser)
    }, 1500)
  })
}