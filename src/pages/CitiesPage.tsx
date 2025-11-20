import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Layout } from '../components/layout/Layout'
import { db, isFirebaseConfigured } from '../lib/firebase'
import { City } from '../types/firestore'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { MapPin, Globe2, Loader2 } from 'lucide-react'

export function CitiesPage() {
  const [cities, setCities] = useState<City[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCities = async () => {
      if (!isFirebaseConfigured || !db) {
        setError('Firebase is not configured. Please add your Firebase keys to .env.')
        setLoading(false)
        return
      }

      try {
        const citiesQuery = query(collection(db, 'cities'), orderBy('name', 'asc'))
        const snapshot = await getDocs(citiesQuery)
        const cityData: City[] = snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<City, 'id'>) }))
        setCities(cityData)
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : 'Unable to load cities')
      } finally {
        setLoading(false)
      }
    }

    fetchCities()
  }, [])

  const sortedCities = useMemo(
    () => [...cities].sort((a, b) => a.name.localeCompare(b.name)),
    [cities],
  )

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-islamic-blue-50 via-white to-islamic-blue-100 py-12">
        <div className="container mx-auto px-4 space-y-6">
          <div className="text-center space-y-2">
            <p className="text-sm uppercase tracking-widest text-islamic-blue-700 font-semibold">Salah Timetable</p>
            <h1 className="text-3xl font-bold text-islamic-blue-900">Cities & Masjid Finder</h1>
            <p className="text-islamic-blue-700 max-w-2xl mx-auto">
              Browse cities to explore verified masjid prayer times, timetables, and directions.
            </p>
          </div>

          {loading && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="p-6 bg-white rounded-2xl shadow-lg border border-islamic-blue-100 animate-pulse">
                  <div className="h-6 bg-islamic-blue-100 rounded w-2/3 mb-4" />
                  <div className="h-4 bg-islamic-blue-50 rounded w-1/3" />
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sortedCities.map((city) => (
                <Link
                  key={city.id}
                  to={`/prayer-times/${city.id}`}
                  className="group p-6 bg-white rounded-2xl shadow-lg border border-islamic-blue-100 hover:border-islamic-blue-400 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2 text-islamic-blue-700">
                      <MapPin className="w-5 h-5" />
                      <span className="font-semibold text-lg">{city.name}</span>
                    </div>
                    <Globe2 className="w-5 h-5 text-islamic-blue-500" />
                  </div>
                  <p className="mt-2 text-sm text-islamic-blue-700">{city.region}</p>
                  <p className="text-xs text-islamic-blue-600">{city.country}</p>
                  <div className="mt-4 flex items-center gap-2 text-islamic-blue-600 text-sm">
                    <span className="font-medium group-hover:text-islamic-blue-700">View masjids</span>
                    <Loader2 className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
