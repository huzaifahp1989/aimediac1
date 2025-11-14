import React, { useState, useEffect, useMemo } from 'react'
import { Layout } from '../components/layout/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Search, Book, Bookmark, Share2, ChevronLeft, ChevronRight, Filter } from 'lucide-react'

interface Hadith {
  id: string
  collection: string
  bookNumber: number
  hadithNumber: string
  arabicText: string
  englishText: string
  narrator: string
  grade: string
  category: string
  tags: string[]
}

const MOCK_HADITH_DATA: Hadith[] = [
  {
    id: '1',
    collection: 'Sahih al-Bukhari',
    bookNumber: 1,
    hadithNumber: '1',
    arabicText: 'عَنْ عَمْرِو بْنِ عَبَسَةَ قَالَ: أَتَيْتُ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ وَهُوَ يَقُولُ: "يَا عِبَادِي إِنِّي حَرَّمْتُ الظُّلْمَ عَلَى نَفْسِي وَجَعَلْتُهُ بَيْنَكُمْ مُحَرَّمًا فَلَا تَظَالَمُوا"',
    englishText: 'Amr ibn Abasah reported: I came to the Messenger of Allah, peace and blessings be upon him, and I heard him saying, "O servants of Allah, I have forbidden injustice for Myself and I have made it forbidden among you, so do not oppress one another."',
    narrator: 'Amr ibn Abasah',
    grade: 'Sahih',
    category: 'Faith',
    tags: ['justice', 'tawheed', 'rights']
  },
  {
    id: '2',
    collection: 'Sahih Muslim',
    bookNumber: 1,
    hadithNumber: '1',
    arabicText: 'عَنْ عُمَرَ بْنِ الْخَطَّابِ قَالَ: قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى"',
    englishText: 'Umar ibn al-Khattab reported: The Messenger of Allah, peace and blessings be upon him, said, "Verily, deeds are only with intentions, and every person will have only what they intended."',
    narrator: 'Umar ibn al-Khattab',
    grade: 'Sahih',
    category: 'Intentions',
    tags: ['intentions', 'actions', 'heart']
  },
  {
    id: '3',
    collection: 'Jami at-Tirmidhi',
    bookNumber: 4,
    hadithNumber: '1',
    arabicText: 'عَنْ أَبِي هُرَيْرَةَ قَالَ: قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: "مَنْ تَوَضَّأَ فَأَحْسَنَ الْوُضُوءَ خَرَجَتْ خَطَايَاهُ مِنْ جَسَدِهِ حَتَّى تَخْرُجَ مِنْ تَحْتِ أَظْفَارِهِ"',
    englishText: 'Abu Huraira reported: The Messenger of Allah, peace and blessings be upon him, said, "Whoever performs ablution and does it well, his sins will depart from his body, even from under his fingernails."',
    narrator: 'Abu Huraira',
    grade: 'Hasan',
    category: 'Purification',
    tags: ['wudu', 'purification', 'sins']
  },
  {
    id: '4',
    collection: 'Sunan Abu Dawud',
    bookNumber: 3,
    hadithNumber: '1',
    arabicText: 'عَنْ أَبِي سَعِيدٍ الْخُدْرِيِّ قَالَ: قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: "الْغَسْلُ يَوْمَ الْجُمُعَةِ وَاجِبٌ عَلَى كُلِّ مُحْرِمٍ"',
    englishText: 'Abu Sa\'id al-Khudri reported: The Messenger of Allah, peace and blessings be upon him, said, "Taking a bath on Friday is obligatory for every adult."',
    narrator: 'Abu Sa\'id al-Khudri',
    grade: 'Sahih',
    category: 'Friday Prayer',
    tags: ['friday', 'ghusl', 'purification']
  },
  {
    id: '5',
    collection: 'Sunan an-Nasa\'i',
    bookNumber: 6,
    hadithNumber: '1',
    arabicText: 'عَنْ أَنَسِ بْنِ مَالِكٍ قَالَ: قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: "صَلُّوا كَمَا رَأَيْتُمُونِي أُصَلِّي"',
    englishText: 'Anas ibn Malik reported: The Messenger of Allah, peace and blessings be upon him, said, "Pray as you have seen me praying."',
    narrator: 'Anas ibn Malik',
    grade: 'Sahih',
    category: 'Prayer',
    tags: ['prayer', 'sunnah', 'method']
  },
  {
    id: '6',
    collection: 'Sunan Ibn Majah',
    bookNumber: 7,
    hadithNumber: '1',
    arabicText: 'عَنْ أَبِي أُمَامَةَ قَالَ: قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: "مَنْ قَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ"',
    englishText: 'Abu Umamah reported: The Messenger of Allah, peace and blessings be upon him, said, "Whoever stands for prayer in Ramadan with faith and seeking reward, his previous sins will be forgiven."',
    narrator: 'Abu Umamah',
    grade: 'Sahih',
    category: 'Ramadan',
    tags: ['ramadan', 'taraweeh', 'forgiveness']
  }
]

const hadithCollections = [
  { id: 1, name: 'Sahih al-Bukhari', total: 7563 },
  { id: 2, name: 'Sahih Muslim', total: 3033 },
  { id: 3, name: 'Jami at-Tirmidhi', total: 3956 },
  { id: 4, name: 'Sunan Abu Dawud', total: 5274 },
  { id: 5, name: 'Sunan an-Nasa\'i', total: 5758 },
  { id: 6, name: 'Sunan Ibn Majah', total: 4341 }
]

const hadithCategories = [
  'All', 'Faith', 'Intentions', 'Purification', 'Prayer', 'Friday Prayer', 'Ramadan', 'Zakat', 'Hajj', 'Marriage', 'Business', 'Etiquette'
]

export default function HadithPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCollection, setSelectedCollection] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [bookmarks, setBookmarks] = useState<string[]>([])

  const filteredHadiths = useMemo(() => {
    return MOCK_HADITH_DATA.filter(hadith => {
      const matchesSearch = searchQuery === '' || 
        hadith.arabicText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hadith.englishText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hadith.narrator.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hadith.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesCollection = selectedCollection === 'all' || hadith.collection === selectedCollection
      const matchesCategory = selectedCategory === 'all' || hadith.category === selectedCategory
      
      return matchesSearch && matchesCollection && matchesCategory
    })
  }, [searchQuery, selectedCollection, selectedCategory])

  const currentHadith = filteredHadiths[currentIndex]

  useEffect(() => {
    setCurrentIndex(0)
  }, [searchQuery, selectedCollection, selectedCategory])

  const toggleBookmark = (hadithId: string) => {
    setBookmarks(prev => 
      prev.includes(hadithId) 
        ? prev.filter(id => id !== hadithId)
        : [...prev, hadithId]
    )
  }

  const navigateHadith = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else if (direction === 'next' && currentIndex < filteredHadiths.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const shareHadith = () => {
    if (currentHadith) {
      const shareText = `${currentHadith.englishText} - ${currentHadith.narrator} (${currentHadith.collection})`
      if (navigator.share) {
        navigator.share({
          title: 'Hadith',
          text: shareText,
          url: window.location.href
        })
      } else {
        navigator.clipboard.writeText(shareText)
        alert('Hadith copied to clipboard!')
      }
    }
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Hadith Collection</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore authentic sayings of Prophet Muhammad (ﷺ) from the six major hadith collections
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search hadith by text, narrator, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 w-full"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={selectedCollection}
                  onChange={(e) => setSelectedCollection(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-islamic-blue-500"
                >
                  <option value="all">All Collections</option>
                  {hadithCollections.map(collection => (
                    <option key={collection.id} value={collection.name}>
                      {collection.name}
                    </option>
                  ))}
                </select>
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-islamic-blue-500"
              >
                <option value="all">All Categories</option>
                {hadithCategories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Collections Sidebar */}
            <div className="lg:col-span-1">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Book className="w-5 h-5 mr-2 text-islamic-blue-600" />
                    Hadith Collections
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {hadithCollections.map(collection => (
                      <button
                        key={collection.id}
                        onClick={() => setSelectedCollection(collection.name)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          selectedCollection === collection.name
                            ? 'bg-islamic-blue-100 text-islamic-blue-800'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <div className="font-medium">{collection.name}</div>
                        <div className="text-sm text-gray-500">{collection.total.toLocaleString()} hadith</div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Hadith:</span>
                      <span className="font-semibold">{filteredHadiths.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bookmarked:</span>
                      <span className="font-semibold">{bookmarks.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current:</span>
                      <span className="font-semibold">{currentIndex + 1} of {filteredHadiths.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Hadith Display */}
            <div className="lg:col-span-2">
              {currentHadith ? (
                <>
                  <Card className="mb-6">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-islamic-blue-800">
                            {currentHadith.collection}
                          </CardTitle>
                          <p className="text-sm text-gray-600 mt-1">
                            Book {currentHadith.bookNumber} • Hadith {currentHadith.hadithNumber}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleBookmark(currentHadith.id)}
                            className={bookmarks.includes(currentHadith.id) ? 'text-islamic-gold-500' : ''}
                          >
                            <Bookmark className={`w-4 h-4 ${bookmarks.includes(currentHadith.id) ? 'fill-current' : ''}`} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={shareHadith}
                          >
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Arabic Text */}
                      <div className="bg-islamic-blue-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-islamic-blue-800 mb-3 flex items-center">
                          <Book className="w-5 h-5 mr-2" />
                          Arabic Text
                        </h3>
                        <p className="text-right text-xl leading-relaxed text-gray-800 font-arabic">
                          {currentHadith.arabicText}
                        </p>
                      </div>

                      {/* English Translation */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                          <Book className="w-5 h-5 mr-2" />
                          English Translation
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {currentHadith.englishText}
                        </p>
                      </div>

                      {/* Hadith Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-1">Narrator:</h4>
                          <p className="text-gray-600">{currentHadith.narrator}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-1">Grade:</h4>
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                            currentHadith.grade === 'Sahih' 
                              ? 'bg-green-100 text-green-800'
                              : currentHadith.grade === 'Hasan'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {currentHadith.grade}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-1">Category:</h4>
                          <p className="text-gray-600">{currentHadith.category}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-1">Tags:</h4>
                          <div className="flex flex-wrap gap-1">
                            {currentHadith.tags.map(tag => (
                              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Navigation */}
                  <div className="flex justify-between items-center">
                    <Button
                      onClick={() => navigateHadith('prev')}
                      disabled={currentIndex === 0}
                      variant="outline"
                      className="flex items-center space-x-2"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </Button>

                    <div className="text-center">
                      <p className="text-sm text-gray-600">
                        Hadith {currentIndex + 1} of {filteredHadiths.length}
                      </p>
                    </div>

                    <Button
                      onClick={() => navigateHadith('next')}
                      disabled={currentIndex === filteredHadiths.length - 1}
                      variant="outline"
                      className="flex items-center space-x-2"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No Hadith Found</h3>
                    <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export { HadithPage }