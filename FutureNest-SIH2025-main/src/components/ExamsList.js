import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import {
  ArrowLeft,
  FileText,
  Building2,
  Target,
  Users,
  Filter,
  Search,
  BookOpen,
  Award,
  ChevronRight,
  ExternalLink,
  Calendar,
  MapPin,
  Star,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Stethoscope
} from "lucide-react"
import examsData from "../data/examsData.json"
import { Footer } from "./Footer"

const categoryIcons = {
  "Civil Services": ShieldCheck,
  "Banking": Briefcase,
  "Defence": Award,
  "Engineering (Public Sector)": Building2,
  "Management": Briefcase,
  "Engineering (Private & Deemed Universities)": GraduationCap,
  "Medical (Private & Govt.)": Stethoscope
}

export function ExamsList({ onBack }) {
  const [examCategories, setExamCategories] = useState([])
  const [filteredCategories, setFilteredCategories] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSubCategory, setSelectedSubCategory] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading exams data
    setTimeout(() => {
      setExamCategories(examsData.examCategories)
      setFilteredCategories(examsData.examCategories)
      setLoading(false)
    }, 500)
  }, [])

  useEffect(() => {
    let filtered = examCategories

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.map(category => ({
        ...category,
        subCategories: category.subCategories.map(subCategory => ({
          ...subCategory,
          exams: subCategory.exams.filter(exam =>
            exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            exam.abbreviation.toLowerCase().includes(searchQuery.toLowerCase()) ||
            exam.conductingBody.toLowerCase().includes(searchQuery.toLowerCase()) ||
            exam.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
            exam.rolesOrCourses.some(role => 
              role.toLowerCase().includes(searchQuery.toLowerCase())
            )
          )
        })).filter(subCategory => subCategory.exams.length > 0)
      })).filter(category => category.subCategories.length > 0)
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(category => category.categoryName === selectedCategory)
    }

    // Filter by sub-category
    if (selectedSubCategory !== "all") {
      filtered = filtered.map(category => ({
        ...category,
        subCategories: category.subCategories.filter(subCategory => 
          subCategory.subCategoryName === selectedSubCategory
        )
      })).filter(category => category.subCategories.length > 0)
    }

    setFilteredCategories(filtered)
  }, [examCategories, searchQuery, selectedCategory, selectedSubCategory])

  const getAllSubCategories = () => {
    const subCategories = []
    examCategories.forEach(category => {
      category.subCategories.forEach(subCategory => {
        if (!subCategories.includes(subCategory.subCategoryName)) {
          subCategories.push(subCategory.subCategoryName)
        }
      })
    })
    return subCategories.sort()
  }

  const handleExamDetails = (exam) => {
    alert(`Exam Details:\n\nName: ${exam.name}\nConducting Body: ${exam.conductingBody}\nPurpose: ${exam.purpose}`)
  }

  const handleApplyExam = (exam) => {
    alert(`Apply for: ${exam.abbreviation}`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading exams...</p>
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
                <FileText className="w-8 h-8 text-blue-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Competitive Exams</h1>
                  <p className="text-gray-600">Explore government and private sector opportunities</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">
                {filteredCategories.reduce((total, category) => 
                  total + category.subCategories.reduce((subTotal, subCategory) => 
                    subTotal + subCategory.exams.length, 0), 0
                )} exams available
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
                placeholder="Search exams, roles, conducting bodies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="all">All Categories</option>
              {examCategories.map(category => (
                <option key={category.categoryName} value={category.categoryName}>
                  {category.categoryName}
                </option>
              ))}
            </select>

            {/* Sub-Category Filter */}
            <select
              value={selectedSubCategory}
              onChange={(e) => setSelectedSubCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="all">All Sub-Categories</option>
              {getAllSubCategories().map(subCategory => (
                <option key={subCategory} value={subCategory}>{subCategory}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Exam Categories */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No exams found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredCategories.map((category) => (
              <div key={category.categoryName} className="bg-white rounded-lg shadow-sm p-6">
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-200">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{category.categoryName}</h2>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </div>

                {/* Sub-Categories */}
                <div className="space-y-6">
                  {category.subCategories.map((subCategory) => {
                    const IconComponent = categoryIcons[subCategory.subCategoryName] || Target
                    return (
                      <div key={subCategory.subCategoryName}>
                        {/* Sub-Category Header */}
                        <div className="flex items-center gap-3 mb-4">
                          <IconComponent className="w-5 h-5 text-purple-600" />
                          <h3 className="text-lg font-semibold text-gray-900">
                            {subCategory.subCategoryName}
                          </h3>
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                            {subCategory.exams.length} exam{subCategory.exams.length !== 1 ? 's' : ''}
                          </span>
                        </div>

                        {/* Exams Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          {subCategory.exams.map((exam, examIndex) => (
                            <Card key={examIndex} className="bg-gray-50 hover:shadow-md transition-shadow duration-300 border-l-4 border-l-purple-500">
                              <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <CardTitle className="text-lg font-bold text-gray-900 mb-1 leading-tight">
                                      {exam.name}
                                    </CardTitle>
                                    <div className="flex items-center gap-3 mb-2">
                                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                        {exam.abbreviation}
                                      </span>
                                      <div className="flex items-center gap-1 text-gray-600">
                                        <Building2 className="w-3 h-3" />
                                        <span className="text-xs">{exam.conductingBody}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CardHeader>

                              <CardContent className="space-y-3">
                                {/* Purpose */}
                                <div>
                                  <h4 className="text-sm font-semibold text-gray-900 mb-1 flex items-center gap-2">
                                    <Target className="w-3 h-3 text-green-600" />
                                    Purpose
                                  </h4>
                                  <p className="text-xs text-gray-600 bg-green-50 p-2 rounded leading-relaxed">
                                    {exam.purpose}
                                  </p>
                                </div>

                                {/* Roles/Courses */}
                                <div>
                                  <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                    <Users className="w-3 h-3 text-orange-600" />
                                    Opportunities
                                  </h4>
                                  <div className="flex flex-wrap gap-1">
                                    {exam.rolesOrCourses.slice(0, 3).map((role, idx) => (
                                      <span key={idx} className="px-2 py-1 bg-orange-50 text-orange-700 rounded text-xs">
                                        {role}
                                      </span>
                                    ))}
                                    {exam.rolesOrCourses.length > 3 && (
                                      <span className="px-2 py-1 bg-orange-50 text-orange-700 rounded text-xs">
                                        +{exam.rolesOrCourses.length - 3} more
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2 pt-3 border-t border-gray-200">
                                  <Button
                                    size="sm"
                                    onClick={() => handleExamDetails(exam)}
                                    variant="outline"
                                    className="flex-1 flex items-center gap-2 text-xs"
                                  >
                                    <BookOpen className="w-3 h-3" />
                                    Details
                                  </Button>
                                  
                                  <Button
                                    size="sm"
                                    onClick={() => handleApplyExam(exam)}
                                    className="flex-1 bg-purple-600 hover:bg-purple-700 flex items-center gap-2 text-xs"
                                  >
                                    <ChevronRight className="w-3 h-3" />
                                    Learn More
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
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Footer */}
      <Footer />
    </div>
  )
}