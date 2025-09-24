"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  User,
  MapPin,
  Mail,
  Calendar,
  Award,
  BookOpen,
  Target,
  TrendingUp,
  Heart,
  Download,
  Edit,
  Settings,
  Bell,
  Search,
  ChevronRight,
  Briefcase,
  Users,
  BarChart3,
} from "lucide-react"

export default function FutureNestProfile() {
  const [activeTab, setActiveTab] = useState("overview")

  const profileData = {
    name: "Priya Sharma",
    title: "Aspiring Software Engineer",
    location: "Mumbai, India",
    email: "priya.sharma@futurenest.com",
    phone: "+91 98765 43210",
    joinDate: "September 2024",
    avatar: "/professional-student-portrait.png",
    level: 7,
    xp: 2840,
    nextLevelXp: 3500,
  }

  const stats = [
    { label: "Aptitude Tests", value: 24, icon: Target, color: "text-green-600" },
    { label: "Career Paths Explored", value: 8, icon: Briefcase, color: "text-blue-600" },
    { label: "Skills Assessed", value: 18, icon: Award, color: "text-purple-600" },
    { label: "Study Hours", value: 156, icon: BookOpen, color: "text-orange-600" },
  ]

  const recentActivity = [
    { action: "Completed Aptitude Test", subject: "Logical Reasoning", time: "2 hours ago", icon: Target },
    { action: "Saved Career Path", subject: "Data Science", time: "1 day ago", icon: Heart },
    { action: "Updated Profile", subject: "Skills & Interests", time: "3 days ago", icon: User },
    { action: "Joined Study Group", subject: "Python Programming", time: "1 week ago", icon: Users },
  ]

  const savedCareers = [
    { title: "Software Engineer", match: 92, company: "Tech Startups", icon: "💻" },
    { title: "Data Scientist", match: 88, company: "Analytics Firms", icon: "📊" },
    { title: "UX Designer", match: 75, company: "Design Studios", icon: "🎨" },
  ]

  const testScores = [
    { test: "Logical Reasoning", score: 85, maxScore: 100, date: "Dec 15, 2024" },
    { test: "Quantitative Aptitude", score: 78, maxScore: 100, date: "Dec 10, 2024" },
    { test: "Verbal Ability", score: 92, maxScore: 100, date: "Dec 5, 2024" },
    { test: "Technical Skills", score: 88, maxScore: 100, date: "Nov 28, 2024" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-futurenest text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-heading font-bold">FutureNest</h1>
              <div className="hidden md:flex items-center gap-6 ml-8">
                <a href="#" className="hover:text-purple-200 transition-colors">
                  Dashboard
                </a>
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

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-xl shadow-sm border border-border p-6"
            >
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <img
                    src={profileData.avatar || "/placeholder.svg"}
                    alt={profileData.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-full">
                    Level {profileData.level}
                  </div>
                </div>

                <h2 className="text-xl font-heading font-bold text-foreground mb-1">{profileData.name}</h2>
                <p className="text-muted-foreground mb-4">{profileData.title}</p>

                {/* XP Progress */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>XP Progress</span>
                    <span>
                      {profileData.xp}/{profileData.nextLevelXp}
                    </span>
                  </div>
                  <div className="bg-secondary rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(profileData.xp / profileData.nextLevelXp) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="gradient-futurenest rounded-full h-2"
                    />
                  </div>
                </div>

                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{profileData.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{profileData.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Joined {profileData.joinDate}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <button className="flex-1 gradient-futurenest text-white py-2 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity">
                    <Edit className="w-4 h-4 inline mr-2" />
                    Edit Profile
                  </button>
                  <button className="p-2 border border-border rounded-lg hover:bg-secondary transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-xl shadow-sm border border-border p-6 mt-6"
            >
              <h3 className="font-heading font-semibold text-foreground mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <div className="bg-card rounded-xl shadow-sm border border-border mb-6">
              <div className="flex border-b border-border">
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
                        ? "text-primary border-b-2 border-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === "overview" && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div>
                      <h3 className="font-heading font-semibold text-foreground mb-4">Recent Activity</h3>
                      <div className="space-y-3">
                        {recentActivity.map((activity, index) => (
                          <div key={index} className="flex items-center gap-4 p-3 bg-accent/50 rounded-lg">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <activity.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-foreground">{activity.action}</p>
                              <p className="text-sm text-muted-foreground">{activity.subject}</p>
                            </div>
                            <span className="text-xs text-muted-foreground">{activity.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "progress" && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div>
                      <h3 className="font-heading font-semibold text-foreground mb-4">Learning Progress</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { skill: "Problem Solving", progress: 85, color: "bg-green-500" },
                          { skill: "Communication", progress: 72, color: "bg-blue-500" },
                          { skill: "Technical Skills", progress: 88, color: "bg-purple-500" },
                          { skill: "Leadership", progress: 65, color: "bg-orange-500" },
                        ].map((item, index) => (
                          <div key={item.skill} className="p-4 bg-accent/30 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium text-foreground">{item.skill}</span>
                              <span className="text-sm text-muted-foreground">{item.progress}%</span>
                            </div>
                            <div className="bg-secondary rounded-full h-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${item.progress}%` }}
                                transition={{ duration: 1, delay: index * 0.2 }}
                                className={`${item.color} rounded-full h-2`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "careers" && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <h3 className="font-heading font-semibold text-foreground mb-4">Saved Career Paths</h3>
                    {savedCareers.map((career, index) => (
                      <div key={career.title} className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
                        <div className="flex items-center gap-4">
                          <span className="text-2xl">{career.icon}</span>
                          <div>
                            <h4 className="font-medium text-foreground">{career.title}</h4>
                            <p className="text-sm text-muted-foreground">{career.company}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-sm font-medium text-primary">{career.match}% Match</div>
                            <div className="text-xs text-muted-foreground">Compatibility</div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === "scores" && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <h3 className="font-heading font-semibold text-foreground mb-4">Test Scores</h3>
                    {testScores.map((test, index) => (
                      <div key={test.test} className="p-4 bg-accent/30 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-foreground">{test.test}</h4>
                          <span className="text-sm text-muted-foreground">{test.date}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <div className="bg-secondary rounded-full h-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(test.score / test.maxScore) * 100}%` }}
                                transition={{ duration: 1, delay: index * 0.2 }}
                                className="gradient-futurenest rounded-full h-2"
                              />
                            </div>
                          </div>
                          <span className="font-semibold text-foreground">
                            {test.score}/{test.maxScore}
                          </span>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
