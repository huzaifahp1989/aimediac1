import { Layout } from '../components/layout/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Play, BookOpen, Gamepad2, Trophy, Palette, Music, Mic, Star, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

const kidsActivities = [
  {
    id: 1,
    title: 'Islamic Stories',
    description: 'Listen to beautiful Islamic stories and learn valuable lessons',
    icon: BookOpen,
    color: 'from-purple-500 to-purple-600',
    href: '/kids/stories',
    ageGroup: '4-12 years'
  },
  {
    id: 2,
    title: 'Fun Quizzes',
    description: 'Test your knowledge about Islam with fun and interactive quizzes',
    icon: Gamepad2,
    color: 'from-green-500 to-green-600',
    href: '/kids/quizzes',
    ageGroup: '6-14 years'
  },
  {
    id: 3,
    title: 'Coloring Pages',
    description: 'Color beautiful Islamic designs and mosques',
    icon: Palette,
    color: 'from-pink-500 to-pink-600',
    href: '/kids/coloring',
    ageGroup: '3-10 years'
  },
  {
    id: 4,
    title: 'Word Search',
    description: 'Find Islamic words hidden in fun word search puzzles',
    icon: Users,
    color: 'from-blue-500 to-blue-600',
    href: '/kids/word-search',
    ageGroup: '7-15 years'
  },
  {
    id: 5,
    title: 'Nasheeds',
    description: 'Listen to beautiful Islamic songs and nasheeds',
    icon: Music,
    color: 'from-orange-500 to-orange-600',
    href: '/kids/nasheeds',
    ageGroup: 'All ages'
  },
  {
    id: 6,
    title: 'Voice Recorder',
    description: 'Record yourself reciting Quran or telling Islamic stories',
    icon: Mic,
    color: 'from-teal-500 to-teal-600',
    href: '/kids/recorder',
    ageGroup: '5-15 years'
  }
]

const featuredStories = [
  {
    id: 1,
    title: 'The Story of Prophet Nuh (AS)',
    duration: '15 min',
    rating: 4.8,
    thumbnail: '/story-nuh.jpg'
  },
  {
    id: 2,
    title: 'The Honest Trader',
    duration: '8 min',
    rating: 4.9,
    thumbnail: '/story-trader.jpg'
  },
  {
    id: 3,
    title: 'The Clever Boy and the Dates',
    duration: '12 min',
    rating: 4.7,
    thumbnail: '/story-dates.jpg'
  }
]

const weeklyChallenge = {
  title: 'Memorize Surah Al-Fatiha',
  description: 'Complete this week\'s challenge and earn bonus points!',
  reward: '50 Points',
  deadline: '5 days left'
}

export function KidsZonePage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-islamic-blue-900 mb-4">Kids Zone</h1>
          <p className="text-xl text-islamic-blue-700 max-w-2xl mx-auto">
            A fun and safe place for Muslim children to learn about Islam through games, stories, and interactive activities
          </p>
          <div className="mt-6 flex justify-center">
            <div className="bg-gradient-to-r from-islamic-gold-400 to-islamic-gold-500 text-islamic-blue-900 px-6 py-2 rounded-full font-semibold">
              🌟 Safe & Educational Content
            </div>
          </div>
        </div>

        {/* Weekly Challenge */}
        <div className="mb-12">
          <Card className="border-islamic-gold-200 bg-gradient-to-r from-islamic-gold-50 to-islamic-gold-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-islamic-gold-500 rounded-full flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-islamic-blue-900">{weeklyChallenge.title}</h3>
                    <p className="text-islamic-blue-700">{weeklyChallenge.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-islamic-gold-600">{weeklyChallenge.reward}</div>
                  <div className="text-sm text-islamic-blue-600">{weeklyChallenge.deadline}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activities Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-islamic-blue-900 mb-8 text-center">Fun Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kidsActivities.map((activity) => {
              const Icon = activity.icon
              return (
                <Link key={activity.id} to={activity.href}>
                  <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                    <CardContent className="p-6 text-center space-y-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${activity.color} rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-islamic-blue-900 mb-2 group-hover:text-islamic-blue-700">
                          {activity.title}
                        </h3>
                        <p className="text-gray-600 mb-3">{activity.description}</p>
                        <div className="flex items-center justify-center space-x-2">
                          <Star className="w-4 h-4 text-islamic-gold-500" />
                          <span className="text-sm text-gray-500">{activity.ageGroup}</span>
                        </div>
                      </div>
                      <div className="pt-2">
                        <Button variant="islamic" size="sm" className="group-hover:shadow-lg transition-shadow">
                          <Play className="w-4 h-4 mr-2" />
                          Start Activity
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Featured Stories */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-islamic-blue-900">Featured Stories</h2>
            <Link to="/kids/stories">
              <Button variant="outline" className="border-islamic-blue-200 text-islamic-blue-700 hover:bg-islamic-blue-50">
                View All Stories
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredStories.map((story) => (
              <Card key={story.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg h-32 mb-4 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-islamic-blue-900 mb-2">{story.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span className="flex items-center">
                      <Play className="w-4 h-4 mr-1" />
                      {story.duration}
                    </span>
                    <span className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-islamic-gold-500" />
                      {story.rating}
                    </span>
                  </div>
                  <Button variant="islamic" size="sm" className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    Play Story
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Safety Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Users className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Parental Guidance</h3>
              <p className="text-blue-800">
                All content in the Kids Zone is carefully curated to be appropriate for children. 
                Parents are encouraged to explore these activities with their children for a better learning experience. 
                All content follows Islamic principles and values.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}