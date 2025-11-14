import { Link, useLocation } from 'react-router-dom'
import { Button } from '../ui/button'
import { Menu, X, Moon, Sun, User, Award, BookOpen, Radio, Users, Play, Gift, MessageCircle, Clock, Calendar } from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from '../../stores/authStore'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const location = useLocation()
  const { user, isAuthenticated } = useAuthStore()

  const navigation = [
    { name: 'Home', href: '/', icon: BookOpen },
    { name: 'Quran', href: '/quran', icon: BookOpen },
    { name: 'Hadith', href: '/hadith', icon: BookOpen },
    { name: 'Articles', href: '/articles', icon: BookOpen },
    { name: 'Radio', href: '/radio', icon: Radio },
    { name: 'Kids Zone', href: '/kids', icon: Users },
    { name: 'Podcasts', href: '/podcasts', icon: Play },
    { name: 'Competitions', href: '/competitions', icon: Award },
    { name: 'Q&A', href: '/qa', icon: MessageCircle },
    { name: 'Prayer Times', href: '/prayer-times', icon: Clock },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Donate', href: '/donate', icon: Gift },
  ]

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <header className="bg-white shadow-lg border-b-4 border-islamic-blue-600">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-islamic-blue-600 to-islamic-gold-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">IMC</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-islamic-blue-900">Islam Media Central</h1>
              <p className="text-xs text-islamic-blue-700">Your Islamic Digital Hub</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigation.slice(0, 6).map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.href
                      ? 'bg-islamic-blue-100 text-islamic-blue-900'
                      : 'text-islamic-blue-700 hover:bg-islamic-blue-50 hover:text-islamic-blue-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="text-islamic-blue-700 hover:text-islamic-blue-900"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link to="/profile">
                  <Button variant="ghost" size="icon" className="text-islamic-blue-700 hover:text-islamic-blue-900">
                    <User className="w-5 h-5" />
                  </Button>
                </Link>
                <div className="hidden md:flex items-center space-x-2 bg-islamic-gold-100 px-3 py-1 rounded-full">
                  <Award className="w-4 h-4 text-islamic-gold-600" />
                  <span className="text-sm font-medium text-islamic-gold-700">{user?.points || 0} pts</span>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="islamic" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-islamic-blue-700 hover:text-islamic-blue-900"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-islamic-blue-100 py-4">
            <nav className="grid grid-cols-2 gap-2">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === item.href
                        ? 'bg-islamic-blue-100 text-islamic-blue-900'
                        : 'text-islamic-blue-700 hover:bg-islamic-blue-50 hover:text-islamic-blue-900'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        )}
      </div>

      {/* World Map Wave Design */}
      <div className="world-map-wave h-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-islamic-blue-600/10 via-islamic-gold-500/10 to-islamic-green-600/10"></div>
      </div>
    </header>
  )
}