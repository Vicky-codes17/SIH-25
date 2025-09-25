import { useState, useRef, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import {
  Search,
  User,
  ChevronDown,
  BookOpen,
  GraduationCap,
  School,
  Map,
  FileText,
  Users,
  ChevronUp,
  Library,
  LogOut,
  Settings,
  Award,
  Loader2,
  Trophy,
  Monitor,
} from "lucide-react"
import { CollegesList } from "./CollegesList"
import { EbooksList } from "./EbooksList"
import { CoursesList } from "./CoursesList"
import { ExamsList } from "./ExamsList"
import { Footer } from "./Footer"
import { useAuth } from '../contexts/AuthContext';
import ChatBot from './chatbot/ChatBot';

const dashboardSections = [
  {
    id: 1,
    title: "E-books",
    description: "Access thousands of educational resources",
    icon: BookOpen,
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Scholarships",
    description: "Find funding opportunities for your education",
    icon: GraduationCap,
    color: "bg-green-500",
  },
  {
    id: 3,
    title: "Colleges",
    description: "Explore top educational institutions",
    icon: School,
    color: "bg-purple-500",
  },
  {
    id: 4,
    title: "Roadmaps",
    description: "Follow structured learning paths",
    icon: Map,
    color: "bg-orange-500",
  },
  {
    id: 5,
    title: "Exams",
    description: "Prepare for competitive examinations",
    icon: FileText,
    color: "bg-red-500",
  },
  {
    id: 6,
    title: "Courses",
    description: "Enroll in comprehensive learning courses",
    icon: Monitor,
    color: "bg-indigo-500",
  },
  {
    id: 7,
    title: "Expert Counselling",
    description: "Get guidance from education experts",
    icon: Users,
    color: "bg-teal-500",
  },
]

export function LearningDashboard() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showCollegesList, setShowCollegesList] = useState(false)
  const [showEbooksList, setShowEbooksList] = useState(false)
  const [showCoursesList, setShowCoursesList] = useState(false)
  const [showExamsList, setShowExamsList] = useState(false)
  const [navigationHistory, setNavigationHistory] = useState([])
  const dropdownRef = useRef(null)
  
  const { currentUser, logout } = useAuth();
  // Prevent back navigation to login/auth pages
  useEffect(() => {
    const handlePopState = (event) => {
      // Check if user is trying to go back to login/auth pages
      const currentPath = window.location.pathname
      const previousPath = event.state?.previousPath || document.referrer
      
      // If trying to go back to login/auth pages, prevent it
      if (previousPath && (
        previousPath.includes('/login') || 
        previousPath.includes('/signup') || 
        previousPath.includes('/auth') ||
        previousPath.includes('/welcome') ||
        previousPath === '/'
      )) {
        // Push current state back to prevent going to login
        window.history.pushState({ previousPath: currentPath }, '', currentPath)
        return
      }
      
      // If we're in a list view, go back to dashboard instead of browser back
      if (showCollegesList || showEbooksList || showCoursesList || showExamsList) {
        event.preventDefault()
        // Reset all list states to show dashboard
        setShowCollegesList(false)
        setShowEbooksList(false)
        setShowCoursesList(false)
        setShowExamsList(false)
      }
    }

    // Add event listener for browser back button
    window.addEventListener('popstate', handlePopState)
    
    // Set initial state to prevent going back to login
    window.history.replaceState({ 
      previousPath: '/dashboard',
      preventBackToAuth: true 
    }, '', window.location.pathname)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [showCollegesList, showEbooksList, showCoursesList, showExamsList])

  // Store the previous page in navigation history
  useEffect(() => {
    // Get the previous page from location state or browser history
    const previousPage = location.state?.from || document.referrer
    
    if (previousPage && !navigationHistory.includes(previousPage)) {
      setNavigationHistory(prev => [...prev, previousPage])
    }
  }, [location])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSectionClick = (section) => {
    if (section.title === "Roadmaps") {
      // Use replace instead of navigate to prevent back to dashboard in browser history
      navigate('/roadmaps', { 
        state: { from: '/dashboard' },
        replace: false 
      })
    } else if (section.title === "Colleges") {
      setShowCollegesList(true)
      // Update browser state but don't create new history entry
      window.history.pushState({ 
        view: 'colleges',
        previousPath: '/dashboard' 
      }, '', '/dashboard/colleges')
    } else if (section.title === "E-books") {
      setShowEbooksList(true)
      window.history.pushState({ 
        view: 'ebooks',
        previousPath: '/dashboard' 
      }, '', '/dashboard/ebooks')
    } else if (section.title === "Courses") {
      setShowCoursesList(true)
      window.history.pushState({ 
        view: 'courses',
        previousPath: '/dashboard' 
      }, '', '/dashboard/courses')
    } else if (section.title === "Exams") {
      setShowExamsList(true)
      window.history.pushState({ 
        view: 'exams',
        previousPath: '/dashboard' 
      }, '', '/dashboard/exams')
    } else {
      alert(`${section.title} feature coming soon!`)
    }
  }

  // Separate back handlers for each list component - these always go back to dashboard
  const handleBackFromColleges = () => {
    setShowCollegesList(false)
    // Update URL back to dashboard
    window.history.pushState({ 
      previousPath: '/dashboard' 
    }, '', '/dashboard')
  }

  const handleBackFromEbooks = () => {
    setShowEbooksList(false)
    window.history.pushState({ 
      previousPath: '/dashboard' 
    }, '', '/dashboard')
  }

  const handleBackFromCourses = () => {
    setShowCoursesList(false)
    window.history.pushState({ 
      previousPath: '/dashboard' 
    }, '', '/dashboard')
  }

  const handleBackFromExams = () => {
    setShowExamsList(false)
    window.history.pushState({ 
      previousPath: '/dashboard' 
    }, '', '/dashboard')
  }

  // This function is for external navigation (when dashboard itself needs to go back)
  const handleBackToDashboard = () => {
    // Check if there's a previous page to go back to (but not login/auth pages)
    const previousPage = location.state?.from
    if (previousPage && 
        previousPage !== '/dashboard' && 
        !previousPage.includes('/login') && 
        !previousPage.includes('/signup') && 
        !previousPage.includes('/auth') &&
        !previousPage.includes('/welcome') &&
        previousPage !== '/') {
      navigate(previousPage)
    } else {
      // Reset to dashboard view
      setShowCollegesList(false)
      setShowEbooksList(false)
      setShowCoursesList(false)
      setShowExamsList(false)
    }
  }

  const handleLogout = () => {
    setIsLoggingOut(true)
    setShowProfileDropdown(false)
    
    // Simulate logout process with a delay
    setTimeout(() => {
      // Clear any user data, tokens, etc.
      localStorage.removeItem('userToken')
      localStorage.removeItem('userData')
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('googleAuthData')
      localStorage.removeItem('githubAuthData')
      
      // Clear browser history to prevent going back to authenticated pages
      window.history.replaceState(null, '', '/')
      
      // Navigate to welcome page
      navigate('/', { replace: true })
      setIsLoggingOut(false)
    }, 2000)
  }

  const handleProfileClick = () => {
    navigate('/profile', { state: { from: '/dashboard' } })
    setShowProfileDropdown(false)
  }

  const handleLeaderboardClick = () => {
    alert('Leaderboard feature coming soon!')
    setShowProfileDropdown(false)
  }

  const handleSettingsClick = () => {
    navigate('/settings', { state: { from: '/dashboard' } })
    setShowProfileDropdown(false)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`)
    }
  }

  const filteredSections = dashboardSections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Show colleges list if requested - use specific back handler
  if (showCollegesList) {
    return <CollegesList onBack={handleBackFromColleges} />
  }

  // Show ebooks list if requested - use specific back handler
  if (showEbooksList) {
    return <EbooksList onBack={handleBackFromEbooks} />
  }

  // Show courses list if requested - use specific back handler
  if (showCoursesList) {
    return <CoursesList onBack={handleBackFromCourses} />
  }

  // Show exams list if requested - use specific back handler
  if (showExamsList) {
    return <ExamsList onBack={handleBackFromExams} />
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Logout Loading Overlay */}
      {isLoggingOut && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4 shadow-2xl">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <p className="text-gray-700 font-medium">Logging out...</p>
            <p className="text-gray-500 text-sm">Redirecting to welcome page...</p>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="bg-white shadow-md border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                FutureNest
              </span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  placeholder="Search resources, courses, colleges..."
                />
              </form>
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${showProfileDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <button
                    onClick={handleProfileClick}
                    className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200"
                  >
                    <User className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700">Profile</span>
                  </button>
                  
                  <button
                    onClick={handleLeaderboardClick}
                    className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Trophy className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700">Leaderboard</span>
                  </button>

                  <button
                    onClick={handleSettingsClick}
                    className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Settings className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700">Settings</span>
                  </button>

                  <div className="border-t border-gray-200 my-1"></div>
                  
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-red-50 transition-colors duration-200 disabled:opacity-50"
                  >
                    {isLoggingOut ? (
                      <Loader2 className="w-4 h-4 text-red-600 animate-spin" />
                    ) : (
                      <LogOut className="w-4 h-4 text-red-600" />
                    )}
                    <span className="text-red-600">
                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Library className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Learning Resources</h1>
          </div>
          <p className="text-gray-600 text-lg">Explore educational opportunities and resources</p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSections.map((section) => (
            <Card
              key={section.id}
              className="cursor-pointer bg-white border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              onClick={() => handleSectionClick(section)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 ${section.color} rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                  >
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {section.title}
                </CardTitle>
                <p className="text-gray-600 leading-relaxed">{section.description}</p>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all duration-300 group">
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 bg-white bg-opacity-20 rounded-full flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
                      <ChevronUp className="w-3 h-3 rotate-0 group-hover:rotate-90 transition-transform duration-300" />
                    </span>
                    Explore Now
                  </span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results Message */}
        {searchQuery && filteredSections.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">Try searching with different keywords</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
      
      {/* Add ChatBot at the end */}
      <ChatBot />
    </div>
  )
}
