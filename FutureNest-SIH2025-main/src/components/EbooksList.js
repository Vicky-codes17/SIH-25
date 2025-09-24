import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import {
  ArrowLeft,
  Star,
  Download,
  BookOpen,
  Calendar,
  FileText,
  User,
  Filter,
  Search,
  ExternalLink,
  Eye,
  CheckCircle,
  Globe,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import ebooksData from "../data/ebooksData.json"
import { Footer } from "./Footer"

// Expanded book cover images pool for different subjects with multiple options
const BOOK_COVERS_POOL = {
  'Computer Science': [
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=200&h=280&fit=crop'
  ],
  'Mathematics': [
    'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=200&h=280&fit=crop'
  ],
  'Physics': [
    'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?w=200&h=280&fit=crop'
  ],
  'Chemistry': [
    'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=200&h=280&fit=crop'
  ],
  'Biology': [
    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=200&h=280&fit=crop'
  ],
  'Engineering': [
    'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1562813733-b31f71025d54?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1565022052991-d56bf5ac1fc1?w=200&h=280&fit=crop'
  ],
  'Business': [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1486312338219-ce68e2c6f44d?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=200&h=280&fit=crop'
  ],
  'Psychology': [
    'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1472289065668-ce650ac443d2?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=280&fit=crop'
  ],
  'History': [
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=280&fit=crop'
  ],
  'Literature': [
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=200&h=280&fit=crop'
  ],
  'default': [
    'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=280&fit=crop',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=280&fit=crop'
  ]
}

// Sample preview pages content
const PREVIEW_PAGES = {
  default: [
    {
      pageNumber: 1,
      content: `
        <div class="p-6 bg-white h-full">
          <h1 class="text-2xl font-bold mb-4 text-center">Table of Contents</h1>
          <div class="space-y-2">
            <div class="flex justify-between border-b pb-1">
              <span>Chapter 1: Introduction</span>
              <span>1</span>
            </div>
            <div class="flex justify-between border-b pb-1">
              <span>Chapter 2: Fundamentals</span>
              <span>15</span>
            </div>
            <div class="flex justify-between border-b pb-1">
              <span>Chapter 3: Advanced Concepts</span>
              <span>32</span>
            </div>
            <div class="flex justify-between border-b pb-1">
              <span>Chapter 4: Practical Applications</span>
              <span>58</span>
            </div>
            <div class="flex justify-between border-b pb-1">
              <span>Chapter 5: Case Studies</span>
              <span>78</span>
            </div>
            <div class="flex justify-between border-b pb-1">
              <span>Appendix</span>
              <span>95</span>
            </div>
          </div>
        </div>
      `
    },
    {
      pageNumber: 2,
      content: `
        <div class="p-6 bg-white h-full">
          <h2 class="text-xl font-bold mb-4">Chapter 1: Introduction</h2>
          <p class="mb-4 leading-relaxed">
            Welcome to this comprehensive guide. This book has been designed to provide you with 
            a thorough understanding of the subject matter through practical examples and 
            real-world applications.
          </p>
          <p class="mb-4 leading-relaxed">
            Throughout this text, you will encounter various concepts that build upon each other, 
            creating a solid foundation for advanced learning. Each chapter includes exercises 
            and examples to reinforce your understanding.
          </p>
          <h3 class="text-lg font-semibold mb-2">Learning Objectives</h3>
          <ul class="list-disc list-inside space-y-1">
            <li>Understand core principles and concepts</li>
            <li>Apply theoretical knowledge to practical scenarios</li>
            <li>Develop problem-solving skills</li>
            <li>Build confidence in the subject area</li>
          </ul>
        </div>
      `
    },
    {
      pageNumber: 3,
      content: `
        <div class="p-6 bg-white h-full">
          <h3 class="text-lg font-semibold mb-4">Prerequisites</h3>
          <p class="mb-4 leading-relaxed">
            Before diving into the main content, it's important to have a basic understanding 
            of foundational concepts. This section outlines what you should know before 
            proceeding with the material.
          </p>
          <div class="bg-blue-50 p-4 rounded-lg mb-4">
            <h4 class="font-semibold text-blue-800 mb-2">💡 Study Tips</h4>
            <ul class="text-blue-700 space-y-1">
              <li>• Take notes while reading</li>
              <li>• Practice exercises regularly</li>
              <li>• Review previous chapters before moving forward</li>
              <li>• Join study groups or online forums</li>
            </ul>
          </div>
          <p class="text-gray-600 italic">
            "The journey of a thousand miles begins with one step." - Start your learning 
            journey today and unlock your potential.
          </p>
        </div>
      `
    }
  ]
}

export function EbooksList({ onBack }) {
  const [ebooks, setEbooks] = useState([])
  const [filteredEbooks, setFilteredEbooks] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")
  const [loading, setLoading] = useState(true)
  const [previewBook, setPreviewBook] = useState(null)
  const [currentPreviewPage, setCurrentPreviewPage] = useState(0)
  const [downloadingBook, setDownloadingBook] = useState(null)
  const [usedImages, setUsedImages] = useState(new Set())

  // Function to get unique image for each book
  const getUniqueImageForBook = (ebook, index) => {
    const subjectImages = BOOK_COVERS_POOL[ebook.subject] || BOOK_COVERS_POOL.default
    const allImages = [...BOOK_COVERS_POOL.default, ...subjectImages]
    
    // Create a unique seed based on book properties
    const bookSeed = `${ebook.title}-${ebook.author}-${ebook.year}-${index}`
    let hash = 0
    for (let i = 0; i < bookSeed.length; i++) {
      const char = bookSeed.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    
    // Use hash to select a consistent but unique image
    const imageIndex = Math.abs(hash) % allImages.length
    return allImages[imageIndex]
  }

  useEffect(() => {
    // Simulate loading ebooks data and add unique covers
    setTimeout(() => {
      const ebooksWithCovers = ebooksData.map((ebook, index) => ({
        ...ebook,
        coverImage: ebook.images && ebook.images.length > 0 
          ? ebook.images[0] 
          : getUniqueImageForBook(ebook, index)
      }))
      setEbooks(ebooksWithCovers)
      setFilteredEbooks(ebooksWithCovers)
      setLoading(false)
    }, 500)
  }, [])

  useEffect(() => {
    let filtered = ebooks

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(ebook =>
        ebook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ebook.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ebook.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ebook.publisher.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by subject
    if (selectedSubject !== "all") {
      filtered = filtered.filter(ebook => ebook.subject === selectedSubject)
    }

    // Filter by year
    if (selectedYear !== "all") {
      filtered = filtered.filter(ebook => ebook.year.toString() === selectedYear)
    }

    // Sort by popularity (descending)
    filtered.sort((a, b) => b.metadata.popularity - a.metadata.popularity)

    setFilteredEbooks(filtered)
  }, [ebooks, searchQuery, selectedSubject, selectedYear])

  const getUniqueSubjects = () => {
    return [...new Set(ebooks.map(ebook => ebook.subject))]
  }

  const getUniqueYears = () => {
    return [...new Set(ebooks.map(ebook => ebook.year))].sort((a, b) => b - a)
  }

  const handleDownload = async (ebook) => {
    setDownloadingBook(ebook.ebookId)
    
    try {
      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Create a blob with sample PDF content
      const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
100 700 Td
(${ebook.title}) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000214 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
309
%%EOF`

      const blob = new Blob([pdfContent], { type: 'application/pdf' })
      const URL = window.URL || window.webkitURL
      const downloadUrl = URL.createObjectURL(blob)
      
      // Create download link
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = `${ebook.title.replace(/[^a-z0-9]/gi, '_')}.pdf`
      link.style.display = 'none'
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Clean up
      URL.revokeObjectURL(downloadUrl)
      
      // Show success message
      alert(`✅ Successfully downloaded: ${ebook.title}`)
      
    } catch (error) {
      console.error('Download failed:', error)
      alert(`❌ Download failed for: ${ebook.title}. Please try again.`)
    } finally {
      setDownloadingBook(null)
    }
  }

  const handlePreview = (ebook) => {
    setPreviewBook(ebook)
    setCurrentPreviewPage(0)
  }

  const closePreview = () => {
    setPreviewBook(null)
    setCurrentPreviewPage(0)
  }

  const nextPreviewPage = () => {
    if (currentPreviewPage < PREVIEW_PAGES.default.length - 1) {
      setCurrentPreviewPage(currentPreviewPage + 1)
    }
  }

  const prevPreviewPage = () => {
    if (currentPreviewPage > 0) {
      setCurrentPreviewPage(currentPreviewPage - 1)
    }
  }

  // Enhanced image error handler with fallback system
  const handleImageError = (e, ebook, index) => {
    const currentSrc = e.target.src
    const subjectImages = BOOK_COVERS_POOL[ebook.subject] || BOOK_COVERS_POOL.default
    const allImages = [...BOOK_COVERS_POOL.default, ...subjectImages]
    
    // Find next available image that hasn't been used
    let fallbackImage = null
    for (let i = 0; i < allImages.length; i++) {
      const testImage = allImages[(index + i) % allImages.length]
      if (testImage !== currentSrc) {
        fallbackImage = testImage
        break
      }
    }
    
    if (fallbackImage) {
      e.target.src = fallbackImage
    } else {
      // Ultimate fallback - a solid color placeholder
      e.target.style.background = `linear-gradient(135deg, #${Math.floor(Math.random()*16777215).toString(16)}, #${Math.floor(Math.random()*16777215).toString(16)})`
      e.target.style.display = 'flex'
      e.target.style.alignItems = 'center'
      e.target.style.justifyContent = 'center'
      e.target.innerHTML = '📚'
      e.target.style.fontSize = '2rem'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading ebooks...</p>
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
                onClick={onBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
              <div className="flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-blue-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Digital Library</h1>
                  <p className="text-gray-600">Access thousands of educational ebooks</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Showing {filteredEbooks.length} of {ebooks.length} ebooks</p>
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
                placeholder="Search books, authors, subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Subject Filter */}
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="all">All Subjects</option>
              {getUniqueSubjects().map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>

            {/* Year Filter */}
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="all">All Years</option>
              {getUniqueYears().map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Ebooks Grid */}
        {filteredEbooks.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No ebooks found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEbooks.map((ebook, index) => (
              <Card key={ebook.ebookId} className="bg-white hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex gap-4 mb-4">
                    {/* Book Cover */}
                    <div className="flex-shrink-0">
                      <img
                        src={ebook.coverImage}
                        alt={ebook.title}
                        className="w-20 h-28 object-cover rounded-lg shadow-md"
                        onError={(e) => handleImageError(e, ebook, index)}
                      />
                    </div>
                    
                    {/* Book Info */}
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                        {ebook.title}
                      </CardTitle>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span className="truncate">{ebook.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{ebook.year} • {ebook.edition}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          <span>{ebook.publisher}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Subject Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {ebook.subject}
                    </span>
                    {ebook.metadata.verified && (
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-xs text-green-600">Verified</span>
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Book Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-gray-50 p-2 rounded">
                      <div className="flex items-center gap-1 mb-1">
                        <FileText className="w-3 h-3 text-gray-600" />
                        <span className="text-xs text-gray-600">Pages</span>
                      </div>
                      <p className="font-medium text-gray-900">{ebook.pages}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-2 rounded">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-3 h-3 text-gray-600" />
                        <span className="text-xs text-gray-600">Popularity</span>
                      </div>
                      <p className="font-medium text-gray-900">{ebook.metadata.popularity}</p>
                    </div>
                  </div>

                  {/* Format & Language */}
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Format: {ebook.format}</span>
                    <span>Language: {ebook.language}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      onClick={() => handlePreview(ebook)}
                      variant="outline"
                      className="flex-1 flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </Button>
                    
                    <Button
                      size="sm"
                      onClick={() => handleDownload(ebook)}
                      disabled={downloadingBook === ebook.ebookId}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
                    >
                      {downloadingBook === ebook.ebookId ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                          Downloading...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          Download
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {previewBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Preview Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gray-50">
              <div className="flex items-center gap-3">
                <img
                  src={previewBook.coverImage}
                  alt={previewBook.title}
                  className="w-12 h-16 object-cover rounded shadow-sm"
                  onError={(e) => handleImageError(e, previewBook, 0)}
                />
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{previewBook.title}</h3>
                  <p className="text-gray-600 text-sm">by {previewBook.author}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  Page {currentPreviewPage + 1} of {PREVIEW_PAGES.default.length}
                </span>
                <Button onClick={closePreview} variant="outline" size="sm">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Preview Content */}
            <div className="flex h-96">
              {/* Navigation */}
              <div className="flex flex-col justify-center p-2">
                <Button
                  onClick={prevPreviewPage}
                  disabled={currentPreviewPage === 0}
                  variant="outline"
                  size="sm"
                  className="mb-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  onClick={nextPreviewPage}
                  disabled={currentPreviewPage === PREVIEW_PAGES.default.length - 1}
                  variant="outline"
                  size="sm"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              {/* Page Content */}
              <div className="flex-1 overflow-auto">
                <div 
                  className="h-full"
                  dangerouslySetInnerHTML={{ 
                    __html: PREVIEW_PAGES.default[currentPreviewPage].content 
                  }}
                />
              </div>
            </div>

            {/* Preview Footer */}
            <div className="flex items-center justify-between p-4 border-t bg-gray-50">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Eye className="w-4 h-4" />
                <span>Free Preview - {PREVIEW_PAGES.default.length} pages shown</span>
              </div>
              <div className="flex gap-2">
                <Button onClick={closePreview} variant="outline" size="sm">
                  Close Preview
                </Button>
                <Button 
                  onClick={() => {
                    closePreview()
                    handleDownload(previewBook)
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                  size="sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Full Book
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Footer */}
      <Footer />
    </div>
  )
}