import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import {
  ArrowLeft,
  MapPin,
  Star,
  Users,
  DollarSign,
  Award,
  Phone,
  Globe,
  Filter,
  Search,
  Building,
  BookOpen,
  Trophy,
  ExternalLink
} from "lucide-react"
import collegesData from "../data/collegesData.json"
import { Footer } from "./Footer"

export function CollegesList({ onBack }) {
  const [colleges, setColleges] = useState([])
  const [filteredColleges, setFilteredColleges] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedState, setSelectedState] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading colleges data
    setTimeout(() => {
      setColleges(collegesData)
      setFilteredColleges(collegesData)
      setLoading(false)
    }, 500)
  }, [])

  useEffect(() => {
    let filtered = colleges

    // Filter by search query - ADD NULL SAFETY HERE
    if (searchQuery) {
      filtered = filtered.filter(college =>
        college.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        college.location?.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        college.location?.state?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by type
    if (selectedType !== "all") {
      filtered = filtered.filter(college => college.type === selectedType)
    }

    // Filter by state - ADD NULL SAFETY HERE
    if (selectedState !== "all") {
      filtered = filtered.filter(college => college.location?.state === selectedState)
    }

    setFilteredColleges(filtered)
  }, [colleges, searchQuery, selectedType, selectedState])

  const formatCurrency = (amount) => {
    // ADD NULL SAFETY HERE
    if (!amount) return "N/A"
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getUniqueStates = () => {
    // ADD NULL SAFETY HERE
    return [...new Set(colleges.map(college => college.location?.state).filter(Boolean))]
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading colleges...</p>
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
                <Building className="w-8 h-8 text-blue-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Top Colleges</h1>
                  <p className="text-gray-600">Find your perfect educational institution</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Showing {filteredColleges.length} of {colleges.length} colleges</p>
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
                placeholder="Search colleges, cities, states..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="all">All Types</option>
              <option value="government">Government</option>
              <option value="private">Private</option>
            </select>

            {/* State Filter */}
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="all">All States</option>
              {getUniqueStates().map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Colleges Grid */}
        {filteredColleges.length === 0 ? (
          <div className="text-center py-12">
            <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No colleges found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredColleges.map((college) => (
              <Card key={college.collegeId} className="bg-white hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                        {college.name || "College Name"}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <MapPin className="w-4 h-4" />
                        {/* ADD NULL SAFETY HERE */}
                        <span className="text-sm">
                          {college.location?.city || "City"}, {college.location?.state || "State"}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          college.type === 'government' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {college.type === 'government' ? 'Government' : 'Private'}
                        </span>
                        {college.rankings?.nirf && (
                          <div className="flex items-center gap-1">
                            <Trophy className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm font-medium">NIRF #{college.rankings.nirf}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Streams - ADD NULL SAFETY HERE */}
                  {college.streams && college.streams.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Available Streams
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {college.streams.slice(0, 3).map((stream, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {stream.code || stream.name || stream}
                          </span>
                        ))}
                        {college.streams.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            +{college.streams.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Key Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="text-xs font-medium text-gray-600">Annual Fees</span>
                      </div>
                      {/* ADD NULL SAFETY HERE */}
                      <p className="text-sm font-bold text-gray-900">
                        {formatCurrency(college.fees?.total)}
                      </p>
                    </div>

                    {college.placements && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Award className="w-4 h-4 text-blue-600" />
                          <span className="text-xs font-medium text-gray-600">Avg. Package</span>
                        </div>
                        <p className="text-sm font-bold text-gray-900">
                          {formatCurrency(college.placements.averagePackage)}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Facilities - ADD NULL SAFETY HERE */}
                  {college.facilities && college.facilities.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Top Facilities</h4>
                      <div className="flex flex-wrap gap-1">
                        {college.facilities.slice(0, 4).map((facility, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                            {facility}
                          </span>
                        ))}
                        {college.facilities.length > 4 && (
                          <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                            +{college.facilities.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Contact - ADD NULL SAFETY HERE */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-4">
                      {college.contact?.phone && (
                        <a href={`tel:${college.contact.phone}`} className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                          <Phone className="w-4 h-4" />
                          <span className="text-xs">Call</span>
                        </a>
                      )}
                      {college.contact?.website && (
                        <a 
                          href={college.contact.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
                        >
                          <Globe className="w-4 h-4" />
                          <span className="text-xs">Website</span>
                        </a>
                      )}
                    </div>
                    
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add Footer here - always last */}
      <Footer />
    </div>
  )
}