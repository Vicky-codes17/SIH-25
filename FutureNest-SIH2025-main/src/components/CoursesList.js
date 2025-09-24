import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import {
  ArrowLeft,
  Clock,
  GraduationCap,
  Users,
  BookOpen,
  Filter,
  Search,
  Monitor,
  Briefcase,
  Stethoscope,
  Cpu,
  Atom,
  ChevronRight,
  CheckCircle
} from "lucide-react"
import coursesData from "../data/coursesData.json"
import { Footer } from "./Footer"

const iconMap = {
  Cpu: Cpu,
  Stethoscope: Stethoscope,
  Briefcase: Briefcase,
  Atom: Atom,
  Monitor: Monitor
}

export function CoursesList({ onBack }) {
  const [fieldsOfStudy, setFieldsOfStudy] = useState([])
  const [filteredFields, setFilteredFields] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedField, setSelectedField] = useState("all")
  const [selectedDuration, setSelectedDuration] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading courses data
    setTimeout(() => {
      setFieldsOfStudy(coursesData.fieldsOfStudy)
      setFilteredFields(coursesData.fieldsOfStudy)
      setLoading(false)
    }, 500)
  }, [])

  useEffect(() => {
    let filtered = fieldsOfStudy

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.map(field => ({
        ...field,
        courses: field.courses.filter(course =>
          course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.abbreviation.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.careerPaths.some(path => 
            path.toLowerCase().includes(searchQuery.toLowerCase())
          )
        )
      })).filter(field => field.courses.length > 0)
    }

    // Filter by field
    if (selectedField !== "all") {
      filtered = filtered.filter(field => field.id === selectedField)
    }

    // Filter by duration
    if (selectedDuration !== "all") {
      filtered = filtered.map(field => ({
        ...field,
        courses: field.courses.filter(course => course.duration === selectedDuration)
      })).filter(field => field.courses.length > 0)
    }

    setFilteredFields(filtered)
  }, [fieldsOfStudy, searchQuery, selectedField, selectedDuration])

  const getUniqueDurations = () => {
    const durations = []
    fieldsOfStudy.forEach(field => {
      field.courses.forEach(course => {
        if (!durations.includes(course.duration)) {
          durations.push(course.duration)
        }
      })
    })
    return durations.sort()
  }

  const handleCourseDetails = (course) => {
    alert(`Course Details:\n\nName: ${course.courseName}\nDuration: ${course.duration}\nEligibility: ${course.eligibility}`)
  }

  const handleApplyCourse = (course) => {
    alert(`Apply for: ${course.courseName}`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading courses...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={onBack} // Use the onBack prop directly
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
              <div className="flex items-center gap-3">
                <Monitor className="w-8 h-8 text-blue-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Course Directory</h1>
                  <p className="text-gray-600">Explore comprehensive learning programs</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">
                {filteredFields.reduce((total, field) => total + field.courses.length, 0)} courses available
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses, careers, descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Field Filter */}
            <select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="all">All Fields</option>
              {fieldsOfStudy.map(field => (
                <option key={field.id} value={field.id}>{field.fieldName}</option>
              ))}
            </select>

            {/* Duration Filter */}
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="all">All Durations</option>
              {getUniqueDurations().map(duration => (
                <option key={duration} value={duration}>{duration}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Fields and Courses */}
        {filteredFields.length === 0 ? (
          <div className="text-center py-12">
            <Monitor className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredFields.map((field) => {
              const IconComponent = iconMap[field.icon] || Monitor
              return (
                <div key={field.id} className="bg-white rounded-lg shadow-sm p-6">
                  {/* Field Header */}
                  <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-200">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{field.fieldName}</h2>
                      <p className="text-gray-600">{field.description}</p>
                    </div>
                  </div>

                  {/* Courses Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {field.courses.map((course, index) => (
                      <Card key={index} className="bg-gray-50 hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-blue-500">
                        <CardHeader className="pb-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-lg font-bold text-gray-900 mb-1">
                                {course.courseName}
                              </CardTitle>
                              <div className="flex items-center gap-4 mb-3">
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                  {course.abbreviation}
                                </span>
                                <div className="flex items-center gap-1 text-gray-600">
                                  <Clock className="w-4 h-4" />
                                  <span className="text-sm">{course.duration}</span>
                                </div>
                              </div>
                              <p className="text-gray-600 text-sm leading-relaxed">
                                {course.description}
                              </p>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          {/* Eligibility */}
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              Eligibility Criteria
                            </h4>
                            <p className="text-sm text-gray-600 bg-green-50 p-2 rounded">
                              {course.eligibility}
                            </p>
                          </div>

                          {/* Career Paths */}
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                              <Users className="w-4 h-4 text-purple-600" />
                              Career Opportunities
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {course.careerPaths.slice(0, 4).map((career, idx) => (
                                <span key={idx} className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs">
                                  {career}
                                </span>
                              ))}
                              {course.careerPaths.length > 4 && (
                                <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs">
                                  +{course.careerPaths.length - 4} more
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2 pt-4 border-t border-gray-200">
                            <Button
                              size="sm"
                              onClick={() => handleCourseDetails(course)}
                              variant="outline"
                              className="flex-1 flex items-center gap-2"
                            >
                              <BookOpen className="w-4 h-4" />
                              Details
                            </Button>
                            
                            <Button
                              size="sm"
                              onClick={() => handleApplyCourse(course)}
                              className="flex-1 bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                            >
                              <ChevronRight className="w-4 h-4" />
                              Apply Now
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Add Footer here - always last */}
      <Footer />
    </div>
  )
}