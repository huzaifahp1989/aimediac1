import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-islamic-blue-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-islamic-gold-400 to-islamic-gold-600 rounded-full flex items-center justify-center">
                <span className="text-islamic-blue-900 font-bold text-lg">IMC</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Islam Media Central</h3>
                <p className="text-islamic-blue-200 text-sm">Your Islamic Digital Hub</p>
              </div>
            </div>
            <p className="text-islamic-blue-200 text-sm leading-relaxed">
              Providing authentic Islamic content, Quran recitations, Hadith collections, 
              educational resources, and community services for Muslims worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-islamic-gold-400">Quick Links</h4>
            <nav className="space-y-2">
              <Link to="/quran" className="block text-islamic-blue-200 hover:text-islamic-gold-400 transition-colors">Quran</Link>
              <Link to="/hadith" className="block text-islamic-blue-200 hover:text-islamic-gold-400 transition-colors">Hadith</Link>
              <Link to="/articles" className="block text-islamic-blue-200 hover:text-islamic-gold-400 transition-colors">Articles</Link>
              <Link to="/kids" className="block text-islamic-blue-200 hover:text-islamic-gold-400 transition-colors">Kids Zone</Link>
              <Link to="/competitions" className="block text-islamic-blue-200 hover:text-islamic-gold-400 transition-colors">Competitions</Link>
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-islamic-gold-400">Resources</h4>
            <nav className="space-y-2">
              <Link to="/prayer-times" className="block text-islamic-blue-200 hover:text-islamic-gold-400 transition-colors">Prayer Times</Link>
              <Link to="/radio" className="block text-islamic-blue-200 hover:text-islamic-gold-400 transition-colors">Islamic Radio</Link>
              <Link to="/podcasts" className="block text-islamic-blue-200 hover:text-islamic-gold-400 transition-colors">Podcasts</Link>
              <Link to="/qa" className="block text-islamic-blue-200 hover:text-islamic-gold-400 transition-colors">Q&A</Link>
              <Link to="/events" className="block text-islamic-blue-200 hover:text-islamic-gold-400 transition-colors">Events</Link>
            </nav>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-islamic-gold-400">Connect With Us</h4>
            <div className="space-y-3">
              <a href="mailto:info@imediac.com" className="flex items-center space-x-2 text-islamic-blue-200 hover:text-islamic-gold-400 transition-colors">
                <Mail className="w-4 h-4" />
                <span className="text-sm">info@imediac.com</span>
              </a>
              <a href="tel:+1234567890" className="flex items-center space-x-2 text-islamic-blue-200 hover:text-islamic-gold-400 transition-colors">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+1 (234) 567-890</span>
              </a>
              <div className="flex items-center space-x-2 text-islamic-blue-200">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Global Islamic Center</span>
              </div>
            </div>
            
            <div className="flex space-x-4 pt-4">
              <a href="https://facebook.com/islammediacentral" target="_blank" rel="noopener noreferrer" className="text-islamic-blue-200 hover:text-islamic-gold-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/islammediacentral" target="_blank" rel="noopener noreferrer" className="text-islamic-blue-200 hover:text-islamic-gold-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/islammediacentral" target="_blank" rel="noopener noreferrer" className="text-islamic-blue-200 hover:text-islamic-gold-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com/islammediacentral" target="_blank" rel="noopener noreferrer" className="text-islamic-blue-200 hover:text-islamic-gold-400 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-islamic-blue-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-islamic-blue-200 text-sm">
                © 2024 Islam Media Central. All rights reserved.
              </p>
              <div className="flex space-x-4 mt-2">
                <Link to="/privacy" className="text-xs text-islamic-blue-300 hover:text-islamic-gold-400 transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="text-xs text-islamic-blue-300 hover:text-islamic-gold-400 transition-colors">Terms of Service</Link>
                <Link to="/contact" className="text-xs text-islamic-blue-300 hover:text-islamic-gold-400 transition-colors">Contact Us</Link>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-islamic-blue-200 text-sm mb-2">Visit our other platforms:</p>
              <div className="flex space-x-4">
                <a href="https://www.imediac.com" target="_blank" rel="noopener noreferrer" className="text-islamic-gold-400 hover:text-islamic-gold-300 text-sm font-medium transition-colors">
                  www.imediac.com
                </a>
                <a href="https://www.imediackids.com" target="_blank" rel="noopener noreferrer" className="text-islamic-gold-400 hover:text-islamic-gold-300 text-sm font-medium transition-colors">
                  www.imediackids.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mosque Silhouette Bottom Border */}
      <div className="mosque-silhouette h-8 bg-islamic-blue-800"></div>
    </footer>
  )
}