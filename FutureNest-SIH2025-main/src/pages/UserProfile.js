import React from 'react';
import { Trophy, BookOpen, Target, Calendar, Award, TrendingUp, Users, Star } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar } from '../components/ui/avatar';
import { Progress } from '../components/ui/progress';

export default function UserProfile() {
  // Mock user data - in real app this would come from props or API
  const userData = {
    name: "Alex Johnson",
    level: "Advanced Learner",
    avatar: "/professional-avatar.png",
    totalProgress: 78,
    challengesAttended: 24,
    timeSpent: "156h 32m",
    coursesCompleted: 12,
    totalCourses: 18,
    currentStreak: 15,
    rank: "#47",
    points: 2840,
  };

  const recentCourses = [
    { name: "Advanced React Patterns", completion: 100, rating: 5, completedDate: "2024-01-15" },
    { name: "TypeScript Mastery", completion: 85, rating: 4, completedDate: "2024-01-10" },
    { name: "Node.js Backend Development", completion: 100, rating: 5, completedDate: "2024-01-05" },
    { name: "Database Design Principles", completion: 92, rating: 4, completedDate: "2023-12-28" },
  ];

  const achievements = [
    { name: "Code Warrior", description: "Completed 10+ coding challenges", icon: Trophy },
    { name: "Speed Learner", description: "Finished 3 courses in one month", icon: Award },
    { name: "Consistent Learner", description: "15-day learning streak", icon: Target },
    { name: "Community Helper", description: "Helped 5+ fellow learners", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="container mx-auto p-4 space-y-4">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row gap-4">
          <Card className="flex-1 bg-white border rounded-lg hover:shadow-lg hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-6">
              <div className="flex items-center gap-3">
                <Avatar className="h-20 w-20 hover:scale-105 transition-transform duration-300">
                  <img 
                    src={userData.avatar || "/placeholder.svg"} 
                    alt={userData.name}
                    className="h-20 w-20 rounded-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="h-20 w-20 rounded-full bg-indigo-600 text-white text-2xl font-bold flex items-center justify-center" style={{display: 'none'}}>
                    {userData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-300">{userData.name}</h1>
                  <p className="text-lg text-gray-600 hover:text-gray-800 transition-colors duration-300 mt-1">{userData.level}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    <Badge variant="secondary" className="bg-gray-100 text-black px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-gray-200 hover:shadow-lg hover:scale-105 transition-all duration-300">
                      <TrendingUp className="h-4 w-4 mr-1.5 text-white" />
                      {userData.rank} Global
                    </Badge>
                    <Badge variant="secondary" className="bg-gray-100 text-black px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-gray-200 hover:shadow-lg hover:scale-105 transition-all duration-300">
                      <Star className="h-4 w-4 mr-1.5 text-gray-700 fill-yellow-400" />
                      {userData.points} Points
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 pb-4">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                <div className="text-center p-2 rounded hover:bg-blue-50 transition-colors duration-300">
                  <div className="text-xl font-bold text-gray-900">{userData.challengesAttended}</div>
                  <div className="text-sm text-gray-600">Challenges</div>
                </div>
                <div className="text-center p-2 rounded hover:bg-green-50 transition-colors duration-300">
                  <div className="text-xl font-bold text-gray-900">{userData.timeSpent}</div>
                  <div className="text-sm text-gray-600">Time Spent</div>
                </div>
                <div className="text-center p-2 rounded hover:bg-purple-50 transition-colors duration-300">
                  <div className="text-xl font-bold text-gray-900">{userData.coursesCompleted}</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="text-center p-2 rounded hover:bg-orange-50 transition-colors duration-300">
                  <div className="text-xl font-bold text-gray-900">{userData.currentStreak}</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Overall Progress */}
          <Card className="lg:w-80 bg-white border rounded-lg hover:shadow-lg hover:border-green-300 transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-4">
              <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                <Target className="h-4 w-4 text-green-600" />
                Overall Progress
              </h2>
            </div>
            <div className="px-4 pb-4 space-y-2">
              <div className="text-center">
                <div className="text-2xl font-bold mb-2 text-green-600">{userData.totalProgress}%</div>
                <Progress value={userData.totalProgress} className="h-2" />
              </div>
              <div className="text-sm text-gray-600 text-center">
                {userData.coursesCompleted} of {userData.totalCourses} courses completed
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Progress Chart */}
            <Card className="bg-white border rounded-lg hover:shadow-lg hover:border-purple-300 transition-all duration-300 transform hover:-translate-y-1">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Learning Progress</h2>
                <p className="text-sm text-gray-600">Your learning journey over time</p>
              </div>
              <div className="p-4">
                <div className="h-48 flex items-center justify-center bg-purple-50 rounded hover:bg-purple-100 transition-colors duration-300">
                  <p className="text-purple-600 font-medium">Progress chart visualization would go here</p>
                </div>
              </div>
            </Card>

            {/* Recent Courses */}
            <Card className="bg-white border rounded-lg hover:shadow-lg hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                  Recent Courses
                </h2>
                <p className="text-sm text-gray-600">Your latest learning achievements</p>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {recentCourses.map((course, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 hover:shadow-md">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{course.name}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-gray-700">{course.rating}/5</span>
                          </div>
                          <span className="text-sm text-gray-600">Completed {course.completedDate}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">{course.completion}%</div>
                        <Progress value={course.completion} className="w-16 h-1 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Monthly Report */}
            <Card className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg hover:border-indigo-300 transition-all duration-300 transform hover:-translate-y-1">
              <div className="p-6 pb-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Monthly Report</h2>
                <p className="text-sm text-gray-600">Your performance this month</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-300 hover:scale-105 transform">
                    <div className="text-2xl font-bold text-blue-700">8</div>
                    <div className="text-sm text-blue-700 font-medium">Courses Started</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-300 hover:scale-105 transform">
                    <div className="text-2xl font-bold text-green-700">5</div>
                    <div className="text-sm text-green-700 font-medium">Courses Completed</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-300 hover:scale-105 transform">
                    <div className="text-2xl font-bold text-purple-700">32h</div>
                    <div className="text-sm text-purple-700 font-medium">Time Studied</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors duration-300 hover:scale-105 transform">
                    <div className="text-2xl font-bold text-orange-700">15</div>
                    <div className="text-sm text-orange-700 font-medium">Streak Days</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Achievements */}
            <Card className="bg-white border rounded-lg hover:shadow-lg hover:border-yellow-300 transition-all duration-300 transform hover:-translate-y-1">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                  <Trophy className="h-4 w-4 text-yellow-600" />
                  Achievements
                </h2>
                <p className="text-sm text-gray-600">Your learning milestones</p>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 border rounded hover:border-yellow-300 hover:bg-yellow-50 transition-all duration-300">
                      <div className="p-1 bg-amber-100 rounded hover:bg-amber-200 transition-colors">
                        <achievement.icon className="h-4 w-4 text-amber-700" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-gray-900">{achievement.name}</h4>
                        <p className="text-xs text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Challenge Stats */}
            <Card className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg hover:border-indigo-300 transition-all duration-300 transform hover:-translate-y-1">
              <div className="p-6 pb-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                  <Target className="h-5 w-5 text-indigo-600" />
                  Challenge Stats
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Coding Challenges</span>
                  <span className="font-bold text-gray-900">18/24</span>
                </div>
                <Progress value={75} className="h-2" />

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Algorithm Problems</span>
                  <span className="font-bold text-gray-900">12/15</span>
                </div>
                <Progress value={80} className="h-2" />

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">System Design</span>
                  <span className="font-bold text-gray-900">6/8</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            </Card>

            {/* Social Connections */}
            <Card className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1">
              <div className="p-6 pb-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Social Connections</h2>
                <p className="text-sm text-gray-600">Connect with fellow learners</p>
              </div>
              <div className="p-6">
                <div className="text-center space-y-4">
                  <div className="text-2xl font-bold text-blue-600">127</div>
                  <div className="text-sm text-gray-600">Learning Partners</div>
                  <Button variant="outline" className="w-full bg-transparent border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 transition-colors">
                    <Users className="h-4 w-4 mr-2" />
                    Find Study Buddy
                  </Button>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg hover:border-green-300 transition-all duration-300 transform hover:-translate-y-1">
              <div className="p-6 pb-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-4 space-y-2">
                <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors transform hover:scale-105" size="sm">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Start New Course
                </Button>
                <Button variant="outline" className="w-full border-orange-300 text-orange-700 hover:bg-orange-50 hover:border-orange-400 transition-colors transform hover:scale-105" size="sm">
                  <Target className="h-4 w-4 mr-2" />
                  Take Challenge
                </Button>
                <Button variant="outline" className="w-full border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 transition-colors transform hover:scale-105" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Schedule
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}