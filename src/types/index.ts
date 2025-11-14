export interface User {
  id: string
  email: string
  username?: string
  full_name?: string
  avatar_url?: string
  points: number
  created_at: string
  updated_at: string
}

export interface QuranProgress {
  id: string
  user_id: string
  surah_number: number
  ayah_number: number
  bookmarked: boolean
  last_read: string
  created_at: string
}

export interface QuizResult {
  id: string
  user_id: string
  quiz_type: string
  score: number
  total_questions: number
  completed_at: string
}

export interface ChildProgress {
  id: string
  parent_id: string
  child_name: string
  salah_tracker: Record<string, boolean>
  surah_yaseen_progress: number
  quran_memorization: Record<string, number>
  behavior_points: number
  created_at: string
  updated_at: string
}

export interface Surah {
  number: number
  name: string
  englishName: string
  revelationType: string
  totalAyahs: number
}

export interface Ayah {
  number: number
  text: string
  translation: string
  urduTranslation?: string
  tafsir?: string
}

export interface Hadith {
  id: string
  collection: string
  bookNumber: string
  hadithNumber: string
  text: string
  narrator: string
  reference: string
}

export interface Article {
  id: string
  title: string
  content: string
  excerpt: string
  category: string
  author: string
  image?: string
  published_at: string
  read_time: number
}

export interface Podcast {
  id: string
  title: string
  description: string
  audio_url: string
  duration: number
  published_at: string
  thumbnail?: string
}

export interface Competition {
  id: string
  title: string
  description: string
  type: 'gaza' | 'general' | 'kids'
  start_date: string
  end_date: string
  prize: string
  rules: string
  is_active: boolean
}