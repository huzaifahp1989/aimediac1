import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { QuranPage } from './pages/QuranPage'
import { HadithPage } from './pages/HadithPage'
import { QAPage } from './pages/QAPage'
import { RadioPage } from './pages/RadioPage'
import { KidsZonePage } from './pages/KidsZonePage'
import { LoginPage } from './pages/LoginPage'
import { PodcastPage } from './pages/PodcastPage'
import { CitiesPage } from './pages/CitiesPage'
import { MasjidListPage } from './pages/MasjidListPage'
import { MasjidTimetablePage } from './pages/MasjidTimetablePage'
import { AdminTimetablesPage } from './pages/AdminTimetablesPage'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
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
        <Route path="/prayer-times" element={<CitiesPage />} />
        <Route path="/prayer-times/:cityId" element={<MasjidListPage />} />
        <Route path="/prayer-times/:cityId/:masjidId" element={<MasjidTimetablePage />} />
        <Route path="/admin/timetables" element={<AdminTimetablesPage />} />
        <Route path="/events" element={<div>Events Page - Coming Soon</div>} />
        <Route path="/donate" element={<div>Donate Page - Coming Soon</div>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<div>Profile Page - Coming Soon</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
