import React, { useState, useEffect } from 'react'
import { Search, Filter, MessageCircle, ThumbsUp, ThumbsDown, Send, User, Calendar, Tag, BookOpen, Lightbulb, Heart } from 'lucide-react'

interface QAItem {
  id: string
  question: string
  answer: string
  category: string
  tags: string[]
  askedBy: string
  answeredBy: string
  askedDate: string
  answeredDate: string
  likes: number
  dislikes: number
  isHelpful: boolean | null
  views: number
  status: 'answered' | 'pending'
}

interface QuestionForm {
  question: string
  category: string
  tags: string
  name: string
  email: string
}

const CATEGORIES = [
  'Aqeedah (Belief)',
  'Fiqh (Jurisprudence)',
  'Tafseer (Quranic Exegesis)',
  'Hadith',
  'Seerah (Prophetic Biography)',
  'Akhlaaq (Morals & Manners)',
  'Dua & Dhikr',
  'Family Matters',
  'Business & Finance',
  'Youth Issues',
  'Contemporary Issues',
  'General'
]

const POPULAR_TAGS = [
  'prayer', 'fasting', 'zakat', 'hajj', 'marriage', 'divorce', 'inheritance',
  'halal', 'haram', 'sunnah', 'bidah', 'shirk', 'taqwa', 'sabr', 'tawbah'
]

const MOCK_QA_DATA: QAItem[] = [
  {
    id: '1',
    question: 'What is the ruling on praying while wearing shoes?',
    answer: 'Praying while wearing shoes is permissible in Islam as long as the shoes are clean and free from impurities. The Prophet (peace be upon him) prayed wearing his shoes on several occasions. However, if praying in a masjid, it is respectful to remove shoes following the practice of the Prophet and the customs of the masjid.',
    category: 'Fiqh (Jurisprudence)',
    tags: ['prayer', 'sunnah', 'etiquette'],
    askedBy: 'Ahmed M.',
    answeredBy: 'Sheikh Abdullah Al-Mansouri',
    askedDate: '2024-01-15',
    answeredDate: '2024-01-16',
    likes: 45,
    dislikes: 2,
    isHelpful: null,
    views: 234,
    status: 'answered'
  },
  {
    id: '2',
    question: 'How should one perform ghusl (ritual bath) properly?',
    answer: 'Ghusl involves three main steps: 1) Intention (niyyah) to purify oneself, 2) Washing the entire body ensuring water reaches every part, starting with the right side then left, 3) Following the Sunnah method which includes washing hands, private parts, performing wudu, then pouring water over the head and body three times.',
    category: 'Fiqh (Jurisprudence)',
    tags: ['ghusl', 'purification', 'ritual'],
    askedBy: 'Fatima S.',
    answeredBy: 'Sheikh Muhammad Al-Hassan',
    askedDate: '2024-01-10',
    answeredDate: '2024-01-11',
    likes: 67,
    dislikes: 1,
    isHelpful: null,
    views: 412,
    status: 'answered'
  },
  {
    id: '3',
    question: 'What is the significance of saying "Bismillah" before eating?',
    answer: 'Saying "Bismillah" (In the name of Allah) before eating is a Sunnah practice that brings multiple benefits: it seeks Allah\'s blessing for the food, follows the Prophet\'s example, protects from Shaytan\'s participation, and reminds us of Allah\'s presence in daily activities.',
    category: 'Sunnah Practices',
    tags: ['bismillah', 'eating', 'sunnah', 'etiquette'],
    askedBy: 'Omar K.',
    answeredBy: 'Sheikh Yusuf Al-Qaradawi',
    askedDate: '2024-01-08',
    answeredDate: '2024-01-09',
    likes: 89,
    dislikes: 0,
    isHelpful: null,
    views: 567,
    status: 'answered'
  },
  {
    id: '4',
    question: 'Is it permissible to delay prayer due to work commitments?',
    answer: 'Delaying prayer beyond its prescribed time is not permissible in Islam. The prayers have fixed times mentioned in the Quran. Work commitments should be arranged around prayer times, not vice versa. If work genuinely conflicts, one should discuss prayer accommodations with employers or seek alternative employment that respects religious obligations.',
    category: 'Fiqh (Jurisprudence)',
    tags: ['prayer', 'work', 'timing', 'obligation'],
    askedBy: 'Aisha R.',
    answeredBy: 'Sheikh Khalid Al-Rashid',
    askedDate: '2024-01-05',
    answeredDate: '2024-01-06',
    likes: 123,
    dislikes: 5,
    isHelpful: null,
    views: 789,
    status: 'answered'
  },
  {
    id: '5',
    question: 'What are the signs of Laylatul Qadr (Night of Power)?',
    answer: 'The Prophet (peace be upon him) described signs of Laylatul Qadr: it is a peaceful, pleasant night, neither very hot nor very cold, the moon appears like a piece of a plate (not bright), and the sun rises the next morning without rays, appearing like a brass dish. However, these signs may not always be apparent, so seeking it through worship in the last ten nights is recommended.',
    category: 'Aqeedah (Belief)',
    tags: ['laylatul-qadr', 'ramadan', 'signs', 'worship'],
    askedBy: 'Hassan A.',
    answeredBy: 'Sheikh Abdullah Ibn Jibreen',
    askedDate: '2024-01-03',
    answeredDate: '2024-01-04',
    likes: 156,
    dislikes: 3,
    isHelpful: null,
    views: 923,
    status: 'answered'
  }
]

export default function QAPage() {
  const [qaItems, setQaItems] = useState<QAItem[]>(MOCK_QA_DATA)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedTag, setSelectedTag] = useState('All')
  const [showQuestionForm, setShowQuestionForm] = useState(false)
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'unanswered'>('newest')
  const [questionForm, setQuestionForm] = useState<QuestionForm>({
    question: '',
    category: 'General',
    tags: '',
    name: '',
    email: ''
  })

  const filteredItems = qaItems.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    const matchesTag = selectedTag === 'All' || item.tags.includes(selectedTag)
    
    return matchesSearch && matchesCategory && matchesTag
  }).sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.views - a.views
      case 'unanswered':
        return a.status === 'pending' ? -1 : 1
      default:
        return new Date(b.askedDate).getTime() - new Date(a.askedDate).getTime()
    }
  })

  const handleHelpful = (id: string, isHelpful: boolean) => {
    setQaItems(prev => prev.map(item => {
      if (item.id === id) {
        const currentHelpful = item.isHelpful
        const newLikes = isHelpful ? item.likes + 1 : item.likes - 1
        const newDislikes = !isHelpful ? item.dislikes + 1 : item.dislikes - 1
        
        return {
          ...item,
          likes: Math.max(0, newLikes),
          dislikes: Math.max(0, newDislikes),
          isHelpful: currentHelpful === isHelpful ? null : isHelpful
        }
      }
      return item
    }))
  }

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Your question has been submitted successfully! Our scholars will review and respond soon.')
    setShowQuestionForm(false)
    setQuestionForm({
      question: '',
      category: 'General',
      tags: '',
      name: '',
      email: ''
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Islamic Q&A</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get authentic answers to your Islamic questions from qualified scholars. 
            Ask, learn, and grow in your understanding of Islam.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <MessageCircle className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{qaItems.length}</div>
            <div className="text-gray-600">Questions Answered</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <User className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{qaItems.filter(i => i.status === 'answered').length}</div>
            <div className="text-gray-600">Active Scholars</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <Heart className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{qaItems.reduce((sum, item) => sum + item.likes, 0)}</div>
            <div className="text-gray-600">Helpful Votes</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <BookOpen className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{CATEGORIES.length}</div>
            <div className="text-gray-600">Categories</div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search questions, answers, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              >
                <option value="All">All Categories</option>
                {CATEGORIES.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              >
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
                <option value="unanswered">Unanswered</option>
              </select>
              <button
                onClick={() => setShowQuestionForm(true)}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Ask Question
              </button>
            </div>
          </div>
        </div>

        {/* Popular Tags */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Topics</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag('All')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedTag === 'All' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All Topics
            </button>
            {POPULAR_TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedTag === tag 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Q&A List */}
        <div className="space-y-6">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.question}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      Asked by {item.askedBy}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {item.askedDate}
                    </span>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {item.status === 'answered' && (
                <div className="border-l-4 border-emerald-500 pl-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-emerald-600" />
                    <span className="font-semibold text-gray-900">Answer by {item.answeredBy}</span>
                    <span className="text-sm text-gray-600">on {item.answeredDate}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">{item.answer}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleHelpful(item.id, true)}
                        className={`flex items-center gap-1 px-3 py-1 rounded transition-colors ${
                          item.isHelpful === true 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'hover:bg-gray-100 text-gray-600'
                        }`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                        Helpful ({item.likes})
                      </button>
                      <button
                        onClick={() => handleHelpful(item.id, false)}
                        className={`flex items-center gap-1 px-3 py-1 rounded transition-colors ${
                          item.isHelpful === false 
                            ? 'bg-red-100 text-red-700' 
                            : 'hover:bg-gray-100 text-gray-600'
                        }`}
                      >
                        <ThumbsDown className="w-4 h-4" />
                        Not Helpful ({item.dislikes})
                      </button>
                    </div>
                    <span className="text-sm text-gray-500">{item.views} views</span>
                  </div>
                </div>
              )}
              
              {item.status === 'pending' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800">
                    <strong>Pending Answer:</strong> This question is awaiting response from our scholars.
                    Questions are typically answered within 24-48 hours.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No questions found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or browse all questions.</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('All')
                setSelectedTag('All')
              }}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Question Form Modal */}
        {showQuestionForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Ask Your Question</h2>
                  <button
                    onClick={() => setShowQuestionForm(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <form onSubmit={handleSubmitQuestion} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Question *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={questionForm.question}
                      onChange={(e) => setQuestionForm(prev => ({ ...prev, question: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Please provide details about your question..."
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        required
                        value={questionForm.category}
                        onChange={(e) => setQuestionForm(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      >
                        {CATEGORIES.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tags (comma separated)
                      </label>
                      <input
                        type="text"
                        value={questionForm.tags}
                        onChange={(e) => setQuestionForm(prev => ({ ...prev, tags: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        placeholder="e.g., prayer, fasting, zakat"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        required
                        type="text"
                        value={questionForm.name}
                        onChange={(e) => setQuestionForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        required
                        type="email"
                        value={questionForm.email}
                        onChange={(e) => setQuestionForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800 text-sm">
                      <strong>Note:</strong> Questions are reviewed by qualified scholars before being answered. 
                      Please allow 24-48 hours for a response. All questions and answers are moderated for accuracy and appropriateness.
                    </p>
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Submit Question
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowQuestionForm(false)}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export { QAPage }