import { Link } from 'react-router-dom'
import { Card, CardContent } from '../ui/card'
import { BookOpen, Radio, Users, Award, Play, Book, Star, Heart, Headphones, Gamepad2, Trophy, MessageCircle, Clock, Calendar, Gift } from 'lucide-react'

const quickActions = [
  { name: 'Quran', icon: BookOpen, href: '/quran', color: 'from-islamic-blue-500 to-islamic-blue-600' },
  { name: 'Hadith', icon: Book, href: '/hadith', color: 'from-islamic-green-500 to-islamic-green-600' },
  { name: 'Kids Zone', icon: Users, href: '/kids', color: 'from-islamic-gold-500 to-islamic-gold-600' },
  { name: 'Radio Stream', icon: Headphones, href: '/radio', color: 'from-purple-500 to-purple-600' },
  { name: 'Articles', icon: Star, href: '/articles', color: 'from-orange-500 to-orange-600' },
  { name: 'Podcasts', icon: Play, href: '/podcasts', color: 'from-red-500 to-red-600' },
  { name: 'Quizzes', icon: Gamepad2, href: '/quizzes', color: 'from-teal-500 to-teal-600' },
  { name: 'Competitions', icon: Trophy, href: '/competitions', color: 'from-indigo-500 to-indigo-600' },
  { name: 'Q&A', icon: MessageCircle, href: '/qa', color: 'from-pink-500 to-pink-600' },
  { name: 'Prayer Times', icon: Clock, href: '/prayer-times', color: 'from-cyan-500 to-cyan-600' },
  { name: 'Events', icon: Calendar, href: '/events', color: 'from-amber-500 to-amber-600' },
  { name: 'Donate', icon: Gift, href: '/donate', color: 'from-rose-500 to-rose-600' },
]

export function QuickActions() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-islamic-blue-900 mb-4">
            Explore Our Features
          </h2>
          <p className="text-lg text-islamic-blue-700 max-w-2xl mx-auto">
            Discover a wide range of Islamic resources and services designed to enrich your spiritual journey
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link key={action.name} to={action.href}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-islamic-blue-100 hover:border-islamic-blue-200">
                  <CardContent className="p-6 text-center space-y-3">
                    <div className={`w-16 h-16 bg-gradient-to-br ${action.color} rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-islamic-blue-900 group-hover:text-islamic-blue-700">
                      {action.name}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}