import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export function RouteGuard({ children }) {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true' ||
                          localStorage.getItem('userToken') ||
                          localStorage.getItem('googleAuthData') ||
                          localStorage.getItem('githubAuthData')

    // If not authenticated and not on public routes, redirect to welcome
    const publicRoutes = ['/', '/login', '/signup', '/auth']
    if (!isAuthenticated && !publicRoutes.includes(location.pathname)) {
      navigate('/', { replace: true })
      return
    }

    // If authenticated and on auth routes, redirect to dashboard
    if (isAuthenticated && publicRoutes.includes(location.pathname)) {
      navigate('/dashboard', { replace: true })
      return
    }

    // Prevent back navigation to auth pages when authenticated
    const handlePopState = () => {
      if (isAuthenticated) {
        const currentPath = window.location.pathname
        if (publicRoutes.includes(currentPath)) {
          navigate('/dashboard', { replace: true })
        }
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [navigate, location])

  return children
}