import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Calendar, MapPin, GraduationCap, BookOpen, Target, ArrowRight } from 'lucide-react';
import ChatBot from '../components/chatbot/ChatBot';

const StudentInfo = () => {
  const navigate = useNavigate();
  const { updateStudentInfo } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    age: '',
    grade: '',
    school: '',
    city: '',
    state: '',
    interests: [],
    careerGoals: '',
    studyHours: '',
    preferredSubjects: []
  });

  const grades = [
    '9th Grade', '10th Grade', '11th Grade', '12th Grade', 
    '1st Year College', '2nd Year College', '3rd Year College', '4th Year College'
  ];

  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science',
    'English', 'History', 'Geography', 'Economics', 'Arts'
  ];

  const interests = [
    'Technology', 'Science', 'Arts', 'Sports', 'Music', 'Literature',
    'Business', 'Medicine', 'Engineering', 'Design', 'Teaching', 'Research'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMultiSelect = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.age || !formData.grade || !formData.school) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      console.log('💾 Saving student info:', formData);
      
      await updateStudentInfo({
        age: parseInt(formData.age),
        grade: formData.grade,
        school: formData.school,
        city: formData.city,
        state: formData.state,
        interests: formData.interests,
        careerGoals: formData.careerGoals,
        studyHours: formData.studyHours,
        preferredSubjects: formData.preferredSubjects
      });

      console.log('✅ Student info saved successfully');
      
      // Navigate to quiz
      navigate('/quiz', { replace: true });
      
    } catch (error) {
      console.error('❌ Error saving student info:', error);
      setError('Failed to save information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tell Us About Yourself</h1>
            <p className="text-gray-600">Help us personalize your learning experience</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age *
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  min="13"
                  max="30"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Grade/Year *
                </label>
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Grade/Year</option>
                  {grades.map(grade => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                School/College Name *
              </label>
              <input
                type="text"
                name="school"
                value={formData.school}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Location */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Interests */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Areas of Interest (Select multiple)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {interests.map(interest => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => handleMultiSelect('interests', interest)}
                    className={`p-3 text-sm rounded-lg border-2 transition-colors ${
                      formData.interests.includes(interest)
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            {/* Preferred Subjects */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Preferred Subjects (Select multiple)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {subjects.map(subject => (
                  <button
                    key={subject}
                    type="button"
                    onClick={() => handleMultiSelect('preferredSubjects', subject)}
                    className={`p-3 text-sm rounded-lg border-2 transition-colors ${
                      formData.preferredSubjects.includes(subject)
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>

            {/* Career Goals */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Career Goals
              </label>
              <textarea
                name="careerGoals"
                value={formData.careerGoals}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell us about your career aspirations..."
              />
            </div>

            {/* Study Hours */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Study Hours
              </label>
              <select
                name="studyHours"
                value={formData.studyHours}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Study Hours</option>
                <option value="1-2 hours">1-2 hours</option>
                <option value="3-4 hours">3-4 hours</option>
                <option value="5-6 hours">5-6 hours</option>
                <option value="7+ hours">7+ hours</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving Information...
                </>
              ) : (
                <>
                  Continue to Assessment
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
      
      <ChatBot />
    </div>
  );
};

export default StudentInfo;