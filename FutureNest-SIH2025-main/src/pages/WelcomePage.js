import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Brain,
  GraduationCap,
  MapPin,
  Calendar,
  Microscope,
  Calculator,
  Palette,
  Sparkles,
  Trophy,
  Database,
  TrendingUp,
  Star,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import ChatBot from '../components/chatbot/ChatBot';

export default function WelcomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  const handleLogin = () => {
    setLoading(true);
    setLoadingText('Preparing your login experience...');
    setTimeout(() => {
      navigate('/login');
    }, 800); // 0.8 seconds loading
  };

  const handleSignUp = () => {
    setLoading(true);
    setLoadingText('Setting up your registration...');
    setTimeout(() => {
      navigate('/signup');
    }, 800); // 0.8 seconds loading
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-[100] bg-white bg-opacity-95 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mr-3" />
              <div className="text-2xl font-bold text-indigo-600">Future Nest</div>
            </div>
            <p className="text-slate-600 text-lg font-medium">{loadingText}</p>
            <div className="mt-4 w-64 bg-slate-200 rounded-full h-2 mx-auto">
              <div className="bg-indigo-600 h-2 rounded-full animate-pulse" style={{width: '70%'}}></div>
            </div>
          </div>
        </div>
      )}
      
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">FutureNest</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleLogin}
                className="text-slate-600 px-4 py-2 rounded"
              >
                Login
              </button>
              <button 
                onClick={handleSignUp}
                className="bg-indigo-600 text-white px-6 py-2 rounded"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-4">
              India's #1 Platform for
              <br />
              <span className="text-indigo-600">Student Guidance in J&K</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-3xl mx-auto">
              From aptitude tests to college admissions, we provide the data-driven tools you need to make confident
              career decisions.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for Colleges, Courses, or Exams..."
                  className="w-full pl-12 pr-4 py-4 text-lg border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <button 
                onClick={handleSignUp}
                className="bg-indigo-600 text-white px-6 py-3 rounded font-semibold"
              >
                Start Exploring
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Top Tools & Resources */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-4">Top Tools & Resources</h2>
            <p className="text-base sm:text-lg text-slate-600">Everything you need to navigate your educational journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Brain,
                title: "Aptitude Test",
                description: "Discover your best-fit stream",
                color: "teal",
                bgColor: "bg-teal-100",
                iconColor: "text-teal-600",
                hoverColor: "hover:bg-teal-50",
              },
              {
                icon: GraduationCap,
                title: "College Directory",
                description: "Explore all Govt. colleges in J&K",
                color: "amber",
                bgColor: "bg-amber-100",
                iconColor: "text-amber-600",
                hoverColor: "hover:bg-amber-50",
              },
              {
                icon: MapPin,
                title: "Career Mapping",
                description: "See the path from course to career",
                color: "rose",
                bgColor: "bg-rose-100",
                iconColor: "text-rose-600",
                hoverColor: "hover:bg-rose-50",
              },
              {
                icon: Calendar,
                title: "Deadline Tracker",
                description: "Never miss an important date",
                color: "indigo",
                bgColor: "bg-indigo-100",
                iconColor: "text-indigo-600",
                hoverColor: "hover:bg-indigo-50",
              },
            ].map((tool, index) => {
              const getColorValues = (color) => {
                const colorMap = {
                  teal: { 
                    shadow: 'rgba(20, 184, 166, 0.3)', 
                    gradient: 'from-teal-50/50',
                    textHover: 'group-hover:text-teal-700',
                    shadowClass: 'hover:shadow-teal-500/20'
                  },
                  amber: { 
                    shadow: 'rgba(245, 158, 11, 0.3)', 
                    gradient: 'from-amber-50/50',
                    textHover: 'group-hover:text-amber-700',
                    shadowClass: 'hover:shadow-amber-500/20'
                  },
                  rose: { 
                    shadow: 'rgba(244, 63, 94, 0.3)', 
                    gradient: 'from-rose-50/50',
                    textHover: 'group-hover:text-rose-700',
                    shadowClass: 'hover:shadow-rose-500/20'
                  },
                  indigo: { 
                    shadow: 'rgba(99, 102, 241, 0.3)', 
                    gradient: 'from-indigo-50/50',
                    textHover: 'group-hover:text-indigo-700',
                    shadowClass: 'hover:shadow-indigo-500/20'
                  }
                };
                return colorMap[color] || colorMap.indigo;
              };
              
              const colors = getColorValues(tool.color);
              
              return (
                <div
                  key={index}
                  className={`group bg-white p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-2xl ${colors.shadowClass} hover:scale-105 transition-all duration-300 relative overflow-hidden`}
                  style={{
                    filter: 'drop-shadow(0 0 0 transparent)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = `drop-shadow(0 0 15px ${colors.shadow})`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'drop-shadow(0 0 0 transparent)';
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`}></div>
                  <div className="relative z-10">
                    <div className={`w-12 h-12 ${tool.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                      <tool.icon className={`w-6 h-6 ${tool.iconColor}`} />
                    </div>
                    <h3 className={`text-lg font-semibold text-slate-800 mb-2 ${colors.textHover} transition-colors duration-300`}>{tool.title}</h3>
                    <p className="text-slate-600 group-hover:text-slate-700 transition-colors duration-300">{tool.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Explore Top Streams */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-4">Explore Top Streams</h2>
            <p className="text-base sm:text-lg text-slate-600">
              Find your passion and discover the courses that align with your interests
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Microscope,
                title: "Science",
                courses: ["B.Sc.", "Engineering", "Medicine", "Research"],
                color: "teal",
                bgGradient: "from-teal-500 to-teal-600",
                iconBg: "bg-teal-100",
              },
              {
                icon: Calculator,
                title: "Commerce",
                courses: ["B.Com", "BBA", "CA", "Finance"],
                color: "rose",
                bgGradient: "from-rose-500 to-rose-600",
                iconBg: "bg-rose-100",
              },
              {
                icon: Palette,
                title: "Arts & Humanities",
                courses: ["B.A.", "Fine Arts", "Literature", "Psychology"],
                color: "amber",
                bgGradient: "from-amber-500 to-amber-600",
                iconBg: "bg-amber-100",
              },
            ].map((stream, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${stream.bgGradient} p-6 rounded-xl text-white cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300`}
              >
                <div className={`w-12 h-12 ${stream.iconBg} rounded-lg flex items-center justify-center mb-4 hover:scale-110 transition-transform`}>
                  <stream.icon className={`w-6 h-6 text-${stream.color}-600`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{stream.title}</h3>
                <div className="space-y-1">
                  {stream.courses.map((course, courseIndex) => (
                    <div key={courseIndex} className="flex items-center">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      <span>{course}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose FutureNest */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-4">A Personalized, AI-Powered Approach</h2>
              <div className="space-y-4">
                {[
                  {
                    icon: Sparkles,
                    title: "AI Recommendation Engine",
                    description: "Get suggestions tailored to your profile",
                  },
                  {
                    icon: Trophy,
                    title: "Gamified Progress",
                    description: "Earn badges and stay motivated",
                  },
                  {
                    icon: Database,
                    title: "Complete J&K College Database",
                    description: "All the information you need in one place",
                  },
                  {
                    icon: TrendingUp,
                    title: "Visual Roadmaps",
                    description: "See the path from your degree to career",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3"
                  >
                    <div className="bg-indigo-100 p-2 rounded-lg">
                      <feature.icon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-slate-800 mb-1 pr-8 sm:pr-16 lg:pr-32">{feature.title}</h3>
                      <p className="text-sm sm:text-base text-slate-600 pr-4 sm:pr-8 lg:pr-16">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-xl text-white">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-3">95%</div>
                  <div className="text-lg mb-4">Student Success Rate</div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <div className="text-xl font-bold">10K+</div>
                      <div>Students Guided</div>
                    </div>
                    <div className="bg-white/20 p-3 rounded-lg">
                      <div className="text-xl font-bold">500+</div>
                      <div>Colleges Listed</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-4">What Students Say</h2>
            <p className="text-base sm:text-lg text-slate-600">Real stories from students who found their path</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Priya Sharma",
                role: "Engineering Student",
                quote:
                  "FutureNest helped me discover my passion for computer science. The aptitude test was incredibly accurate!",
                rating: 5,
              },
              {
                name: "Rahul Kumar",
                role: "Commerce Graduate",
                quote:
                  "The college directory feature saved me so much time. I found the perfect B.Com program in just minutes.",
                rating: 5,
              },
              {
                name: "Dr. Anjali Verma",
                role: "Career Counselor",
                quote:
                  "As an educator, I'm impressed by the comprehensive approach FutureNest takes to student guidance.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-indigo-600 font-bold">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">{testimonial.name}</div>
                    <div className="text-slate-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">Start Building Your Future Today</h2>
            <p className="text-base sm:text-lg text-indigo-100 mb-6 max-w-2xl mx-auto">
              Join thousands of students who have already discovered their perfect career path with FutureNest.
            </p>
            <button 
              onClick={handleSignUp}
              className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
            >
              Create Your Free Account
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-2xl font-bold text-indigo-400 mb-4">FutureNest</h3>
              <p className="text-slate-300">Empowering students in J&K to make informed career decisions.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <button className="hover:text-white transition-colors text-left">
                    Aptitude Test
                  </button>
                </li>
                <li>
                  <button className="hover:text-white transition-colors text-left">
                    College Directory
                  </button>
                </li>
                <li>
                  <button className="hover:text-white transition-colors text-left">
                    Career Mapping
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <button className="hover:text-white transition-colors text-left">
                    Study Guides
                  </button>
                </li>
                <li>
                  <button className="hover:text-white transition-colors text-left">
                    Exam Calendar
                  </button>
                </li>
                <li>
                  <button className="hover:text-white transition-colors text-left">
                    Success Stories
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <button className="hover:text-white transition-colors text-left">
                    Help Center
                  </button>
                </li>
                <li>
                  <button className="hover:text-white transition-colors text-left">
                    Contact Us
                  </button>
                </li>
                <li>
                  <button className="hover:text-white transition-colors text-left">
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-300">
            <p>&copy; 2025 FutureNest. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <ChatBot />
    </div>
  );
}