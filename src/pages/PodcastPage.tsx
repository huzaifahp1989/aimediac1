import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Play, Pause, Clock, Calendar, User, Search, Filter, Headphones, Mic, BookOpen, Heart } from 'lucide-react'

interface Podcast {
  id: string
  title: string
  description: string
  speaker: string
  duration: string
  date: string
  category: string
  audioUrl: string
  thumbnail: string
  tags: string[]
  likes: number
  plays: number
}

const mockPodcasts: Podcast[] = [
  {
    id: '1',
    title: 'The Life of Prophet Muhammad (PBUH)',
    description: 'A comprehensive series exploring the life, teachings, and legacy of the final Prophet.',
    speaker: 'Sheikh Ahmed Ali',
    duration: '45:30',
    date: '2024-11-10',
    category: 'Seerah',
    audioUrl: '#',
    thumbnail: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Islamic%20podcast%20thumbnail%20with%20mosque%20silhouette%20and%20Arabic%20calligraphy%2C%20warm%20golden%20colors%2C%20professional%20design&image_size=square',
    tags: ['Prophet', 'History', 'Islam'],
    likes: 1250,
    plays: 5420
  },
  {
    id: '2',
    title: 'Understanding the Quran - Surah Al-Fatiha',
    description: 'Deep dive into the opening chapter of the Quran and its profound meanings.',
    speaker: 'Dr. Fatima Hassan',
    duration: '32:15',
    date: '2024-11-08',
    category: 'Quran',
    audioUrl: '#',
    thumbnail: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Quran%20study%20podcast%20thumbnail%20with%20Quran%20pages%20and%20soft%20lighting%2C%20peaceful%20Islamic%20design&image_size=square',
    tags: ['Quran', 'Tafsir', 'Guidance'],
    likes: 980,
    plays: 3890
  },
  {
    id: '3',
    title: 'Ramadan Preparations - Spiritual Readiness',
    description: 'Essential guidance on preparing spiritually, mentally, and physically for Ramadan.',
    speaker: 'Imam Yusuf Patel',
    duration: '28:45',
    date: '2024-11-05',
    category: 'Ramadan',
    audioUrl: '#',
    thumbnail: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Ramadan%20podcast%20thumbnail%20with%20crescent%20moon%20and%20lantern%2C%20spiritual%20atmosphere%2C%20Islam%20theme&image_size=square',
    tags: ['Ramadan', 'Fasting', 'Spirituality'],
    likes: 1580,
    plays: 6720
  },
  {
    id: '4',
    title: 'Parenting in Islam - Raising Righteous Children',
    description: 'Islamic principles and practical advice for Muslim parents in the modern world.',
    speaker: 'Umm Aisha Johnson',
    duration: '51:20',
    date: '2024-11-03',
    category: 'Family',
    audioUrl: '#',
    thumbnail: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Islamic%20parenting%20podcast%20thumbnail%20with%20happy%20Muslim%20family%2C%20warm%20colors%2C%20educational%20theme&image_size=square',
    tags: ['Parenting', 'Family', 'Education'],
    likes: 2100,
    plays: 8900
  },
  {
    id: '5',
    title: 'The Power of Dua - Connecting with Allah',
    description: 'Understanding the importance and etiquette of supplication in Islam.',
    speaker: 'Sheikh Abdullah Khan',
    duration: '38:10',
    date: '2024-10-30',
    category: 'Worship',
    audioUrl: '#',
    thumbnail: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Islamic%20dua%20podcast%20thumbnail%20with%20praying%20hands%20and%20soft%20light%2C%20spiritual%20Islamic%20design&image_size=square',
    tags: ['Dua', 'Prayer', 'Worship'],
    likes: 1750,
    plays: 7200
  },
  {
    id: '6',
    title: 'Islamic Finance - Halal Investment Strategies',
    description: 'Guidance on managing wealth according to Islamic principles.',
    speaker: 'Dr. Bilal Ahmed',
    duration: '42:30',
    date: '2024-10-28',
    category: 'Finance',
    audioUrl: '#',
    thumbnail: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Islamic%20finance%20podcast%20thumbnail%20with%20modern%20business%20elements%20and%20Islamic%20patterns%2C%20professional%20design&image_size=square',
    tags: ['Finance', 'Business', 'Halal'],
    likes: 890,
    plays: 3450
  }
]

const categories = ['All', 'Quran', 'Seerah', 'Ramadan', 'Family', 'Worship', 'Finance', 'Youth', 'History']

export function PodcastPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [playingPodcast, setPlayingPodcast] = useState<string | null>(null)

  const filteredPodcasts = mockPodcasts.filter(podcast => {
    const matchesSearch = podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          podcast.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          podcast.speaker.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || podcast.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handlePlay = (podcastId: string) => {
    if (playingPodcast === podcastId) {
      setPlayingPodcast(null)
    } else {
      setPlayingPodcast(podcastId)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-islamic-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-islamic-blue-100 p-4 rounded-full">
              <Headphones className="w-12 h-12 text-islamic-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-islamic-blue-900 mb-4">Islamic Podcasts</h1>
          <p className="text-lg text-islamic-blue-700 max-w-2xl mx-auto">
            Discover inspiring Islamic podcasts featuring renowned scholars and speakers. 
            Listen to lectures, discussions, and educational content to enrich your Islamic knowledge.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-islamic-blue-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search podcasts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border-islamic-blue-200 focus:border-islamic-blue-500 focus:ring-islamic-blue-500"
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`px-4 py-2 text-sm ${
                  selectedCategory === category 
                    ? 'bg-islamic-blue-600 text-white' 
                    : 'border-islamic-blue-200 text-islamic-blue-700 hover:bg-islamic-blue-50'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-islamic-blue-50 to-white border-islamic-blue-200">
            <CardContent className="p-6 text-center">
              <Mic className="w-8 h-8 text-islamic-blue-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-islamic-blue-900">{mockPodcasts.length}</h3>
              <p className="text-islamic-blue-700">Total Episodes</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-islamic-gold-50 to-white border-islamic-gold-200">
            <CardContent className="p-6 text-center">
              <BookOpen className="w-8 h-8 text-islamic-gold-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-islamic-gold-900">{categories.length - 1}</h3>
              <p className="text-islamic-gold-700">Categories</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-islamic-green-50 to-white border-islamic-green-200">
            <CardContent className="p-6 text-center">
              <User className="w-8 h-8 text-islamic-green-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-islamic-green-900">15+</h3>
              <p className="text-islamic-green-700">Speakers</p>
            </CardContent>
          </Card>
        </div>

        {/* Podcasts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPodcasts.map(podcast => (
            <Card key={podcast.id} className="bg-white border-islamic-blue-200 hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="p-0">
                <div className="relative">
                  <img 
                    src={podcast.thumbnail} 
                    alt={podcast.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 rounded-t-lg" />
                  <Button
                    onClick={() => handlePlay(podcast.id)}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white hover:bg-islamic-blue-50 text-islamic-blue-600 p-3 rounded-full shadow-lg"
                  >
                    {playingPodcast === podcast.id ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-islamic-blue-100 text-islamic-blue-800 text-xs px-2 py-1 rounded-full">
                    {podcast.category}
                  </span>
                  <Button variant="ghost" size="sm" className="p-1">
                    <Heart className="w-4 h-4 text-islamic-blue-600" />
                  </Button>
                </div>
                
                <h3 className="font-bold text-islamic-blue-900 mb-2 line-clamp-2">
                  {podcast.title}
                </h3>
                
                <p className="text-sm text-islamic-blue-700 mb-3 line-clamp-2">
                  {podcast.description}
                </p>
                
                <div className="flex items-center text-xs text-islamic-blue-600 mb-3">
                  <User className="w-4 h-4 mr-1" />
                  <span className="mr-3">{podcast.speaker}</span>
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="mr-3">{podcast.duration}</span>
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{new Date(podcast.date).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center justify-between text-xs text-islamic-blue-600">
                  <span>{podcast.plays.toLocaleString()} plays</span>
                  <span>{podcast.likes.toLocaleString()} likes</span>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-3">
                  {podcast.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="bg-islamic-gold-100 text-islamic-gold-700 text-xs px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPodcasts.length === 0 && (
          <div className="text-center py-12">
            <Headphones className="w-16 h-16 text-islamic-blue-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-islamic-blue-700 mb-2">No podcasts found</h3>
            <p className="text-islamic-blue-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}