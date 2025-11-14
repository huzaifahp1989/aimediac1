import { Layout } from '../components/layout/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Search, BookOpen, Bookmark, Volume2, Settings, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

// Mock Quran data
const quranData = {
  surahs: [
    { number: 1, name: 'Al-Fatiha', englishName: 'The Opening', revelationType: 'Meccan', totalAyahs: 7 },
    { number: 2, name: 'Al-Baqarah', englishName: 'The Cow', revelationType: 'Medinan', totalAyahs: 286 },
    { number: 3, name: 'Aal-Imran', englishName: 'Family of Imran', revelationType: 'Medinan', totalAyahs: 200 },
    { number: 4, name: 'An-Nisa', englishName: 'The Women', revelationType: 'Medinan', totalAyahs: 176 },
    { number: 5, name: 'Al-Maidah', englishName: 'The Table Spread', revelationType: 'Medinan', totalAyahs: 120 },
  ],
  ayahs: [
    {
      number: 1,
      text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      translation: 'In the name of Allah, the Most Gracious, the Most Merciful',
      urduTranslation: 'اللہ کے نام سے جو بڑا مہربان اور رحم والا ہے',
      tafsir: 'This verse teaches us to begin all our actions with the name of Allah, seeking His blessings and guidance.'
    },
    {
      number: 2,
      text: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
      translation: 'All praise is due to Allah, Lord of all the worlds',
      urduTranslation: 'تمام تعریف اللہ ہی کے لیے ہے جو تمام جہانوں کا پروردگار ہے',
      tafsir: 'This verse establishes the foundation of our relationship with Allah - recognizing Him as the Lord and praising Him.'
    },
    {
      number: 3,
      text: 'الرَّحْمَٰنِ الرَّحِيمِ',
      translation: 'The Most Gracious, the Most Merciful',
      urduTranslation: 'بڑا مہربان اور رحم والا',
      tafsir: 'These beautiful names of Allah remind us of His infinite mercy and compassion towards His creation.'
    }
  ]
}

export function QuranPage() {
  const [selectedSurah, setSelectedSurah] = useState(quranData.surahs[0])
  const [currentAyah] = useState(0)
  const [fontSize, setFontSize] = useState(24)
  const [showTranslation, setShowTranslation] = useState(true)
  const [showUrdu, setShowUrdu] = useState(false)
  const [showTafsir, setShowTafsir] = useState(false)
  const [bookmarks, setBookmarks] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  const toggleBookmark = (ayahNumber: number) => {
    setBookmarks(prev => 
      prev.includes(ayahNumber) 
        ? prev.filter(num => num !== ayahNumber)
        : [...prev, ayahNumber]
    )
  }

  const filteredSurahs = quranData.surahs.filter(surah =>
    surah.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.englishName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-islamic-blue-900 mb-2">The Holy Quran</h1>
          <p className="text-islamic-blue-700">Read the Quran with translations, tafsir, and audio</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-islamic-blue-900">
                  <Search className="w-5 h-5 mr-2" />
                  Search Surah
                </CardTitle>
              </CardHeader>
              <CardContent>
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-islamic-blue-500"
                />
              </CardContent>
            </Card>

            {/* Surah List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-islamic-blue-900">Surahs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredSurahs.map((surah) => (
                    <button
                      key={surah.number}
                      onClick={() => setSelectedSurah(surah)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedSurah.number === surah.number
                          ? 'bg-islamic-blue-100 text-islamic-blue-900'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold">{surah.number}. {surah.name}</div>
                          <div className="text-sm text-gray-500">{surah.englishName}</div>
                        </div>
                        <div className="text-sm text-gray-400">{surah.totalAyahs} verses</div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-islamic-blue-900">
                  <Settings className="w-5 h-5 mr-2" />
                  Display Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
                  <input
                    type="range"
                    min="16"
                    max="40"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-500 mt-1">{fontSize}px</div>
                </div>
                
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={showTranslation}
                      onChange={(e) => setShowTranslation(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm">Show English Translation</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={showUrdu}
                      onChange={(e) => setShowUrdu(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm">Show Urdu Translation</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={showTafsir}
                      onChange={(e) => setShowTafsir(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm">Show Tafsir</span>
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-islamic-blue-900">
                      Surah {selectedSurah.name} ({selectedSurah.englishName})
                    </CardTitle>
                    <p className="text-sm text-gray-500">
                      {selectedSurah.revelationType} • {selectedSurah.totalAyahs} verses
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Volume2 className="w-4 h-4 mr-1" />
                      Audio
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="space-y-8">
                  {quranData.ayahs.map((ayah) => (
                    <div key={ayah.number} className="border-b border-gray-100 pb-6 last:border-b-0">
                      {/* Ayah Header */}
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-3">
                          <span className="bg-islamic-blue-100 text-islamic-blue-900 px-3 py-1 rounded-full text-sm font-medium">
                            {ayah.number}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleBookmark(ayah.number)}
                            className={bookmarks.includes(ayah.number) ? 'text-islamic-gold-500' : 'text-gray-400'}
                          >
                            <Bookmark className="w-4 h-4" fill={bookmarks.includes(ayah.number) ? 'currentColor' : 'none'} />
                          </Button>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Volume2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Arabic Text */}
                      <div 
                        className="arabic-text text-right mb-4 leading-relaxed"
                        style={{ fontSize: `${fontSize}px` }}
                      >
                        {ayah.text}
                      </div>
                      
                      {/* Translations */}
                      {showTranslation && (
                        <div className="bg-blue-50 p-4 rounded-lg mb-3">
                          <h4 className="font-semibold text-blue-900 mb-2">English Translation</h4>
                          <p className="text-blue-800">{ayah.translation}</p>
                        </div>
                      )}
                      
                      {showUrdu && (
                        <div className="bg-green-50 p-4 rounded-lg mb-3">
                          <h4 className="font-semibold text-green-900 mb-2">اردو ترجمہ</h4>
                          <p className="text-green-800 text-right">{ayah.urduTranslation}</p>
                        </div>
                      )}
                      
                      {showTafsir && ayah.tafsir && (
                        <div className="bg-amber-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-amber-900 mb-2">Tafsir</h4>
                          <p className="text-amber-800">{ayah.tafsir}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Navigation */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                  <Button variant="outline" disabled={currentAyah === 0}>
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous Ayah
                  </Button>
                  
                  <div className="text-sm text-gray-500">
                    Ayah {currentAyah + 1} of {selectedSurah.totalAyahs}
                  </div>
                  
                  <Button variant="outline" disabled={currentAyah >= selectedSurah.totalAyahs - 1}>
                    Next Ayah
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}