import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { QuranPage } from './pages/QuranPage'
import { HadithPage } from './pages/HadithPage'
import { QAPage } from './pages/QAPage'
import { RadioPage } from './pages/RadioPage'
import { KidsZonePage } from './pages/KidsZonePage'
import { LoginPage } from './pages/LoginPage'
import { PodcastPage } from './pages/PodcastPage'

function App() {
  return (
    <BrowserRouter basename="/aimediac1">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quran" element={<QuranPage />} />
        <Route path="/hadith" element={<HadithPage />} />
        <Route path="/articles" element={<div>Articles Page - Coming Soon</div>} />
        <Route path="/radio" element={<RadioPage />} />
        <Route path="/kids" element={<KidsZonePage />} />
        <Route path="/podcasts" element={<PodcastPage />} />
        <Route path="/quizzes" element={<div>Quizzes Page - Coming Soon</div>} />
        <Route path="/competitions" element={<div>Competitions Page - Coming Soon</div>} />
        <Route path="/qa" element={<QAPage />} />
        <Route path="/prayer-times" element={<div>Prayer Times Page - Coming Soon</div>} />
        <Route path="/events" element={<div>Events Page - Coming Soon</div>} />
        <Route path="/donate" element={<div>Donate Page - Coming Soon</div>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<div>Profile Page - Coming Soon</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
