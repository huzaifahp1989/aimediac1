import { useState, useEffect } from 'react'
import { Card } from '../ui/card'
import { ChevronRight } from 'lucide-react'

const newsItems = [
  "🕌 New Ramadan resources available - Download our comprehensive guide",
  "📚 Daily Hadith series starting this week - Join our learning journey",
  "🎯 Kids Competition: Learn Surah Yaseen and win exciting prizes",
  "📻 Live Islamic Radio now streaming 24/7 - Tune in for spiritual content",
  "🌙 Moon sighting updates for your location - Accurate prayer times",
  "📱 Mobile app now available - Download for iOS and Android",
  "🏆 Monthly Quran memorization challenge - Register now",
  "💝 Gaza relief fund - Your donations make a difference",
]

export function NewsTicker() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bg-islamic-gold-500 py-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <span className="bg-islamic-blue-900 text-white px-3 py-1 rounded-full text-sm font-semibold mr-4 flex-shrink-0">
            Latest News
          </span>
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 text-islamic-blue-900 flex-shrink-0 mr-2" />
              <p className="text-islamic-blue-900 font-medium truncate">
                {newsItems[currentIndex]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}