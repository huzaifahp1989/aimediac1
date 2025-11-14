import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { BookOpen, Radio, ArrowRight } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-islamic-blue-600 via-islamic-blue-700 to-islamic-blue-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 islamic-pattern opacity-10"></div>
      
      {/* Mosque Silhouette */}
      <div className="absolute bottom-0 left-0 right-0 mosque-silhouette h-32 opacity-20"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Welcome to
                <span className="block text-islamic-gold-400">Islam Media Central</span>
              </h1>
              <p className="text-xl text-islamic-blue-100 leading-relaxed">
                Your comprehensive Islamic digital hub featuring Quran recitations, Hadith collections, 
                educational content, and community services for Muslims worldwide.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/quran">
                <Button variant="default" size="lg" className="bg-islamic-gold-500 hover:bg-islamic-gold-600 text-islamic-blue-900 font-semibold">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Read Quran
                </Button>
              </Link>
              <Link to="/radio">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-islamic-blue-800">
                  <Radio className="w-5 h-5 mr-2" />
                  Listen to Radio
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Quran Image & Mosque Silhouette */}
          <div className="relative animate-float">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <div className="text-center space-y-6">
                {/* Quran Representation */}
                <div className="bg-gradient-to-br from-islamic-gold-400 to-islamic-gold-600 rounded-2xl p-6 mx-auto w-48 h-64 flex items-center justify-center shadow-2xl">
                  <div className="text-center text-islamic-blue-900">
                    <div className="text-4xl font-bold mb-2">القرآن</div>
                    <div className="text-sm font-medium">The Holy Quran</div>
                  </div>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-2xl font-bold">114</div>
                    <div className="text-xs text-islamic-blue-100">Surahs</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-2xl font-bold">30</div>
                    <div className="text-xs text-islamic-blue-100">Juz</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-2xl font-bold">6236</div>
                    <div className="text-xs text-islamic-blue-100">Ayahs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowRight className="w-6 h-6 text-islamic-gold-400 rotate-90" />
      </div>
    </section>
  )
}