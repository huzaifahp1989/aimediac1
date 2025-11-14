import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { ArrowRight, Clock, User } from 'lucide-react'

const latestContent = [
  {
    id: 1,
    type: 'article',
    title: 'The Importance of Tahajjud Prayer',
    excerpt: 'Discover the spiritual benefits and significance of the night prayer in Islam...',
    author: 'Sheikh Ahmad',
    readTime: 5,
    date: '2 hours ago',
    image: '/quran-image.jpg',
    href: '/articles/tahajjud-prayer'
  },
  {
    id: 2,
    type: 'podcast',
    title: 'Tafsir of Surah Ar-Rahman',
    excerpt: 'A detailed explanation of the beautiful verses of Surah Ar-Rahman...',
    author: 'Imam Hassan',
    duration: 25,
    date: '1 day ago',
    image: '/podcast-image.jpg',
    href: '/podcasts/tafsir-ar-rahman'
  },
  {
    id: 3,
    type: 'quiz',
    title: 'Prophets of Islam Quiz',
    excerpt: 'Test your knowledge about the prophets mentioned in the Quran...',
    questions: 15,
    difficulty: 'Medium',
    date: '3 days ago',
    image: '/quiz-image.jpg',
    href: '/quizzes/prophets-quiz'
  },
  {
    id: 4,
    type: 'hadith',
    title: 'Hadith of the Day',
    excerpt: '"The best among you are those who have the best manners and character..."',
    narrator: 'Prophet Muhammad (PBUH)',
    book: 'Sahih Bukhari',
    date: 'Today',
    image: '/hadith-image.jpg',
    href: '/hadith/daily-hadith'
  }
]

export function LatestContent() {
  return (
    <section className="py-12">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-islamic-blue-900">Latest Content</h2>
          <Link to="/articles">
            <Button variant="outline" className="border-islamic-blue-200 text-islamic-blue-700 hover:bg-islamic-blue-50">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {latestContent.map((content) => (
            <Card key={content.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    content.type === 'article' ? 'bg-islamic-blue-100 text-islamic-blue-700' :
                    content.type === 'podcast' ? 'bg-purple-100 text-purple-700' :
                    content.type === 'quiz' ? 'bg-green-100 text-green-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
                  </span>
                  <span className="text-sm text-gray-500 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {content.date}
                  </span>
                </div>
                <CardTitle className="text-xl text-islamic-blue-900">{content.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-2">{content.excerpt}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <User className="w-4 h-4" />
                    <span>{content.author || content.narrator}</span>
                    {'duration' in content && (
                      <>
                        <span>•</span>
                        <span>{content.duration} min</span>
                      </>
                    )}
                    {'readTime' in content && (
                      <>
                        <span>•</span>
                        <span>{content.readTime} min read</span>
                      </>
                    )}
                    {'questions' in content && (
                      <>
                        <span>•</span>
                        <span>{content.questions} questions</span>
                      </>
                    )}
                  </div>
                  
                  <Link to={content.href}>
                    <Button variant="ghost" size="sm" className="text-islamic-blue-600 hover:text-islamic-blue-700">
                      {content.type === 'quiz' ? 'Start Quiz' : 'Read More'}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}