import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Search, 
  ExternalLink, 
  Award, 
  GraduationCap,
  Users,
  Filter,
  BookOpen
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import scholarshipsData from '../data/scholarships.json';

export function ScholarshipsList({ onBack }) {
  const [scholarships, setScholarships] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredScholarships, setFilteredScholarships] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Handle browser back button to go back to dashboard
  useEffect(() => {
    const handlePopState = (event) => {
      // Prevent the default browser navigation
      event.preventDefault();
      
      // Force navigation back to dashboard
      onBack();
      
      // Ensure URL stays on dashboard
      window.history.replaceState(
        { page: 'dashboard' }, 
        '', 
        '/dashboard'
      );
    };

    // Replace current history state instead of pushing new one
    window.history.replaceState(
      { 
        page: 'scholarships',
        from: 'dashboard' 
      }, 
      '', 
      '/dashboard/scholarships'
    );

    // Add event listener for browser back button
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [onBack]);

  // Load scholarships data
  useEffect(() => {
    setIsLoading(true);
    // Simulate loading delay for better UX
    setTimeout(() => {
      setScholarships(scholarshipsData);
      setFilteredScholarships(scholarshipsData);
      setIsLoading(false);
    }, 300);
  }, []);

  // Filter scholarships based on search and level
  useEffect(() => {
    let filtered = scholarships;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(scholarship =>
        scholarship.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scholarship.level.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scholarship.eligibility.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by level
    if (selectedLevel !== 'all') {
      filtered = filtered.filter(scholarship =>
        scholarship.level.toLowerCase().includes(selectedLevel.toLowerCase())
      );
    }

    setFilteredScholarships(filtered);
  }, [searchQuery, selectedLevel, scholarships]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLevelFilter = (level) => {
    setSelectedLevel(level);
  };

  const handleScholarshipClick = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  // Handle back button click
  const handleBackClick = () => {
    // Update URL to dashboard before calling onBack
    window.history.replaceState(
      { page: 'dashboard' }, 
      '', 
      '/dashboard'
    );
    onBack();
  };

  const getLevelColor = (level) => {
    if (level.includes('Class 10')) return 'bg-blue-100 text-blue-800';
    if (level.includes('Class 12')) return 'bg-green-100 text-green-800';
    if (level.includes('higher education') || level.includes('college')) return 'bg-purple-100 text-purple-800';
    if (level.includes('Class 9')) return 'bg-orange-100 text-orange-800';
    return 'bg-gray-100 text-gray-800';
  };

  const levels = ['all', 'Class 10', 'Class 12', 'higher education', 'Class 9'];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading scholarships...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={handleBackClick}
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 hover:bg-gray-100 text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Scholarships</h1>
                  <p className="text-gray-600 text-sm">Find funding opportunities for your education</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                {filteredScholarships.length} scholarship{filteredScholarships.length !== 1 ? 's' : ''} available
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search scholarships by name, level, or eligibility..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* Level Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={selectedLevel}
                onChange={(e) => handleLevelFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white min-w-[150px]"
              >
                <option value="all">All Levels</option>
                {levels.slice(1).map(level => (
                  <option key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Scholarships Grid */}
        {filteredScholarships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScholarships.map((scholarship, index) => (
              <motion.div
                key={scholarship.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-green-500">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(scholarship.level)}`}>
                        {scholarship.level}
                      </span>
                    </div>
                    
                    <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2">
                      {scholarship.name}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <Users className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {scholarship.eligibility}
                        </p>
                      </div>

                      <Button
                        onClick={() => handleScholarshipClick(scholarship.link)}
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 rounded-lg transition-all duration-300 group/btn"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          Apply Now
                          <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No scholarships found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {searchQuery || selectedLevel !== 'all' 
                ? "Try adjusting your search criteria or filters"
                : "No scholarships available at the moment"
              }
            </p>
            {(searchQuery || selectedLevel !== 'all') && (
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedLevel('all');
                }}
                variant="outline"
                className="mt-4"
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}