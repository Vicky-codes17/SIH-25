import React, { useState, useEffect } from 'react';
import {
  Trophy, BookOpen, Target, Calendar, Award, TrendingUp, Users, Star,
  User, MapPin, Mail, Download, Edit, Settings, Bell, Search, ChevronRight,
  Briefcase, BarChart3, Heart
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ChatBot from '../components/chatbot/ChatBot';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showProfileNav, setShowProfileNav] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  
  const { currentUser, userProfile, updateUserProfile, logout } = useAuth();
  const navigate = useNavigate();

  // Use currentUser data from dummy auth
  const profileData = {
    displayName: currentUser?.displayName || "User",
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    title: "Aspiring Software Engineer",
    location: "Mumbai, India",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "+91 98765 43210",
    joinDate: "September 2024",
    photoURL: currentUser?.photoURL || "/professional-student-portrait.png",
    level: 1,
    xp: 0,
    nextLevelXp: 1000,
  };

  const stats = [
    { label: "Aptitude Tests", value: profileData.aptitudeTests || 0, icon: Target, color: "text-green-600" },
    { label: "Career Paths Explored", value: profileData.careerPathsExplored || 0, icon: Briefcase, color: "text-blue-600" },
    { label: "Skills Assessed", value: profileData.skillsAssessed || 0, icon: Award, color: "text-purple-600" },
    { label: "Study Hours", value: profileData.studyHours || 0, icon: BookOpen, color: "text-orange-600" },
  ];

  // Handle profile editing
  const handleEditProfile = () => {
    setIsEditing(true);
    setEditData({
      displayName: profileData.displayName || "",
      title: profileData.title || "",
      location: profileData.location || "",
      phone: profileData.phone || ""
    });
  };

  const handleSaveProfile = async () => {
    try {
      await updateUserProfile(editData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({});
  };

  const recentActivity = [
    { action: "Completed Aptitude Test", subject: "Logical Reasoning", time: "2 hours ago", icon: Target },
    { action: "Saved Career Path", subject: "Data Science", time: "1 day ago", icon: Heart },
    { action: "Updated Profile", subject: "Skills & Interests", time: "3 days ago", icon: User },
    { action: "Joined Study Group", subject: "Python Programming", time: "1 week ago", icon: Users },
  ];

  const savedCareers = [
    { title: "Software Engineer", match: 92, company: "Tech Startups", icon: "💻" },
    { title: "Data Scientist", match: 88, company: "Analytics Firms", icon: "📊" },
    { title: "UX Designer", match: 75, company: "Design Studios", icon: "🎨" },
  ];

  const testScores = [
    { test: "Logical Reasoning", score: 85, maxScore: 100, date: "Dec 15, 2024" },
    { test: "Quantitative Aptitude", score: 78, maxScore: 100, date: "Dec 10, 2024" },
    { test: "Verbal Ability", score: 92, maxScore: 100, date: "Dec 5, 2024" },
    { test: "Technical Skills", score: 88, maxScore: 100, date: "Nov 28, 2024" },
  ];

  useEffect(() => {
    if (!currentUser) {
      navigate('/', { replace: true });
    }
  }, [currentUser, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header - Only shows in profile section */}
      {showProfileNav && (
        <header className="text-white shadow-lg gradient-futurenest">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold">FutureNest Profile</h1>
                <div className="hidden md:flex items-center gap-6 ml-8">
                  <button 
                    onClick={() => window.history.back()}
                    className="hover:text-purple-200 transition-colors"
                  >
                    ← Dashboard
                  </button>
                  <a href="#" className="hover:text-purple-200 transition-colors">
                    Career Mapping
                  </a>
                  <a href="#" className="hover:text-purple-200 transition-colors">
                    Aptitude Tests
                  </a>
                  <a href="#" className="hover:text-purple-200 transition-colors">
                    Study Groups
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white placeholder-purple-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                  <Bell className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>
      )}

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-lg transition-shadow duration-300 animate-fade-in">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <img
                    src={profileData.photoURL || "/professional-student-portrait.png"}
                    alt={profileData.displayName || "User"}
                    className="w-24 h-24 rounded-full object-cover border-4 border-purple-200"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div 
                    className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-2xl font-bold flex items-center justify-center" 
                    style={{display: 'none'}}
                  >
                    {(profileData.displayName || "U")
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="absolute -bottom-2 -right-2 gradient-futurenest text-white text-xs font-semibold px-2 py-1 rounded-full">
                    Level {profileData.level || 1}
                  </div>
                </div>

                {isEditing ? (
                  <div className="space-y-3 mb-4">
                    <input
                      type="text"
                      value={editData.displayName}
                      onChange={(e) => setEditData({...editData, displayName: e.target.value})}
                      className="text-xl font-bold text-gray-900 bg-gray-50 border rounded px-3 py-1 w-full text-center"
                      placeholder="Your Name"
                    />
                    <input
                      type="text"
                      value={editData.title}
                      onChange={(e) => setEditData({...editData, title: e.target.value})}
                      className="text-gray-600 bg-gray-50 border rounded px-3 py-1 w-full text-center"
                      placeholder="Your Title"
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">{profileData.displayName || "User"}</h2>
                    <p className="text-gray-600 mb-4">{profileData.title || "Student"}</p>
                  </>
                )}

                {/* XP Progress */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>XP Progress</span>
                    <span>
                      {profileData.xp}/{profileData.nextLevelXp}
                    </span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="gradient-futurenest rounded-full h-2 transition-all duration-1000 ease-out"
                      style={{ 
                        width: `${(profileData.xp / profileData.nextLevelXp) * 100}%`
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.location}
                        onChange={(e) => setEditData({...editData, location: e.target.value})}
                        className="bg-gray-50 border rounded px-2 py-1 flex-1"
                        placeholder="Your location"
                      />
                    ) : (
                      <span>{profileData.location || "Not specified"}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>{profileData.email || currentUser?.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>Joined {profileData.joinDate || "Recently"}</span>
                  </div>
                  {isEditing && (
                    <div className="flex items-center gap-3 text-sm">
                      <User className="w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        value={editData.phone}
                        onChange={(e) => setEditData({...editData, phone: e.target.value})}
                        className="bg-gray-50 border rounded px-2 py-1 flex-1"
                        placeholder="Phone number"
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-6">
                  {isEditing ? (
                    <>
                      <button 
                        onClick={handleSaveProfile}
                        className="flex-1 gradient-futurenest text-white py-2 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity"
                      >
                        Save Changes
                      </button>
                      <button 
                        onClick={handleCancelEdit}
                        className="p-2 border rounded-lg hover:bg-gray-100 transition-colors px-4"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={handleEditProfile}
                        className="flex-1 gradient-futurenest text-white py-2 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </button>
                      <button className="p-2 border rounded-lg hover:bg-gray-100 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mt-6 hover:shadow-lg transition-shadow duration-300 animate-fade-in-delay">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-sm border mb-6 animate-fade-in">
              <div className="flex border-b border-gray-200">
                {[
                  { id: "overview", label: "Overview", icon: BarChart3 },
                  { id: "progress", label: "My Progress", icon: TrendingUp },
                  { id: "careers", label: "Saved Careers", icon: Heart },
                  { id: "scores", label: "Test Scores", icon: Award },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                      activeTab === tab.id
                        ? "text-purple-600 border-b-2 border-purple-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
                      <div className="space-y-3">
                        {recentActivity.map((activity, index) => (
                          <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                              <activity.icon className="w-5 h-5 text-purple-600" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                              <p className="text-sm text-gray-600">{activity.subject}</p>
                            </div>
                            <span className="text-xs text-gray-500">{activity.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "progress" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Learning Progress</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { skill: "Problem Solving", progress: 85, color: "bg-green-500" },
                          { skill: "Communication", progress: 72, color: "bg-blue-500" },
                          { skill: "Technical Skills", progress: 88, color: "bg-purple-500" },
                          { skill: "Leadership", progress: 65, color: "bg-orange-500" },
                        ].map((item, index) => (
                          <div key={item.skill} className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium text-gray-900">{item.skill}</span>
                              <span className="text-sm text-gray-600">{item.progress}%</span>
                            </div>
                            <div className="bg-gray-200 rounded-full h-2">
                              <div
                                className={`${item.color} rounded-full h-2 transition-all duration-1000 ease-out`}
                                style={{ 
                                  width: `${item.progress}%`,
                                  transitionDelay: `${index * 200}ms`
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "careers" && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 mb-4">Saved Career Paths</h3>
                    {savedCareers.map((career, index) => (
                      <div key={career.title} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                        <div className="flex items-center gap-4">
                          <span className="text-2xl">{career.icon}</span>
                          <div>
                            <h4 className="font-medium text-gray-900">{career.title}</h4>
                            <p className="text-sm text-gray-600">{career.company}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-sm font-medium text-purple-600">{career.match}% Match</div>
                            <div className="text-xs text-gray-500">Compatibility</div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "scores" && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 mb-4">Test Scores</h3>
                    {testScores.map((test, index) => (
                      <div key={test.test} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-gray-900">{test.test}</h4>
                          <span className="text-sm text-gray-600">{test.date}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <div className="bg-gray-200 rounded-full h-2">
                              <div
                                className="gradient-futurenest rounded-full h-2 transition-all duration-1000 ease-out"
                                style={{ 
                                  width: `${(test.score / test.maxScore) * 100}%`,
                                  transitionDelay: `${index * 200}ms`
                                }}
                              />
                            </div>
                          </div>
                          <span className="font-semibold text-gray-900">
                            {test.score}/{test.maxScore}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      <ChatBot />
    </div>
  );
}