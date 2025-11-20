import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore'
import { Heart, Link2, Loader2, MapPin, RefreshCcw, Search, Waypoints } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState, type TouchEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Layout } from '../components/layout/Layout'
import { useFavoriteMasjids } from '../hooks/useFavoriteMasjids'
import { db, isFirebaseConfigured } from '../lib/firebase'
import { City, Masjid } from '../types/firestore'

export function MasjidListPage() {
  const { cityId } = useParams<{ cityId: string }>()
  const [masjids, setMasjids] = useState<Masjid[]>([])
  const [city, setCity] = useState<City | null>(null)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pullDistance, setPullDistance] = useState(0)
  const touchStartY = useRef<number | null>(null)
  const { isFavorite, toggleFavorite } = useFavoriteMasjids()

  const fetchMasjids = useCallback(async () => {
    if (!isFirebaseConfigured || !db) {
      setError('Firebase is not configured. Please add your Firebase keys to .env.')
      setLoading(false)
      return
    }

    if (!cityId) return

    setLoading(true)
    setError(null)

    try {
      const [cityDoc, masjidSnapshot] = await Promise.all([
        getDoc(doc(db, 'cities', cityId)),
        getDocs(query(collection(db, 'cities', cityId, 'masjids'), orderBy('name', 'asc'))),
      ])

      if (cityDoc.exists()) {
        setCity({ id: cityDoc.id, ...(cityDoc.data() as Omit<City, 'id'>) })
      }

      const masjidData: Masjid[] = masjidSnapshot.docs.map((item) => ({
        id: item.id,
        ...(item.data() as Omit<Masjid, 'id'>),
      }))

      setMasjids(masjidData)
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : 'Unable to load masjids')
    } finally {
      setLoading(false)
      setPullDistance(0)
    }
  }, [cityId])

  useEffect(() => {
    fetchMasjids()
  }, [fetchMasjids])

  const filteredMasjids = useMemo(() => {
    const term = search.toLowerCase()
    return masjids
      .filter(
        (masjid) =>
          masjid.name.toLowerCase().includes(term) ||
          masjid.address.toLowerCase().includes(term),
      )
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [masjids, search])

  const handleDirections = (address: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    window.open(url, '_blank', 'noopener')
  }

  const handleTouchStart = (event: TouchEvent) => {
    if (window.scrollY === 0) {
      touchStartY.current = event.touches[0].clientY
    }
  }

  const handleTouchMove = (event: TouchEvent) => {
    if (touchStartY.current === null) return
    const delta = event.touches[0].clientY - touchStartY.current
    setPullDistance(Math.max(0, Math.min(120, delta)))
  }

  const handleTouchEnd = () => {
    if (pullDistance > 80) {
      fetchMasjids()
    }
    touchStartY.current = null
    setPullDistance(0)
  }

  return (
    <Layout>
      <div
        className="min-h-screen bg-gradient-to-b from-islamic-blue-50 via-white to-islamic-blue-100"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="container mx-auto px-4 py-10 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase text-islamic-blue-700 font-semibold">Masjid Finder</p>
              <h1 className="text-2xl font-bold text-islamic-blue-900">
                {city?.name ?? 'Masjids'}
                <span className="block text-base text-islamic-blue-700 font-normal">{city?.country}</span>
              </h1>
            </div>
            <button
              type="button"
              onClick={fetchMasjids}
              className="inline-flex items-center gap-2 rounded-full bg-islamic-blue-600 text-white px-4 py-2 shadow hover:bg-islamic-blue-700"
            >
              <RefreshCcw className="w-4 h-4" /> Refresh
            </button>
          </div>

          <div
            className="flex items-center gap-3 bg-white border border-islamic-blue-100 rounded-2xl shadow px-4 py-3"
            style={{ transform: `translateY(${pullDistance / 4}px)` }}
          >
            <Search className="w-5 h-5 text-islamic-blue-500" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="flex-1 outline-none text-islamic-blue-900"
              placeholder="Search masjids by name or address"
            />
            {pullDistance > 20 && (
              <span className="text-xs text-islamic-blue-600 flex items-center gap-1">
                <Loader2 className="w-3 h-3 animate-spin" /> Pull to refresh
              </span>
            )}
          </div>

          {loading && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="p-6 bg-white rounded-2xl shadow-lg border border-islamic-blue-100 animate-pulse">
                  <div className="h-6 bg-islamic-blue-100 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-islamic-blue-50 rounded w-1/2" />
                  <div className="h-4 bg-islamic-blue-50 rounded w-1/3 mt-2" />
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
              {filteredMasjids.map((masjid) => (
                <div key={masjid.id} className="p-6 bg-white rounded-2xl shadow-lg border border-islamic-blue-100 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-islamic-blue-900 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-islamic-blue-600" />
                        {masjid.name}
                      </h3>
                      <p className="text-sm text-islamic-blue-700 leading-relaxed">{masjid.address}</p>
                      {masjid.website && (
                        <a
                          className="text-islamic-blue-600 hover:text-islamic-blue-800 inline-flex items-center gap-1 text-sm"
                          href={masjid.website}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Link2 className="w-4 h-4" /> Website
                        </a>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleFavorite({
                        cityId: cityId ?? '',
                        masjidId: masjid.id,
                        masjidName: masjid.name,
                        address: masjid.address,
                      })}
                      className={`p-2 rounded-full border ${isFavorite(cityId ?? '', masjid.id)
                        ? 'bg-islamic-blue-50 border-islamic-blue-300 text-islamic-blue-700'
                        : 'border-islamic-blue-100 text-islamic-blue-500 hover:bg-islamic-blue-50'
                        }`}
                      title="Favourite masjid"
                    >
                      <Heart className={`w-5 h-5 ${isFavorite(cityId ?? '', masjid.id) ? 'fill-islamic-blue-400 text-islamic-blue-700' : ''}`} />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 text-sm text-islamic-blue-800">
                    <button
                      type="button"
                      onClick={() => handleDirections(masjid.address)}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-islamic-blue-100 text-islamic-blue-800 hover:bg-islamic-blue-200"
                    >
                      <Waypoints className="w-4 h-4" /> Directions
                    </button>
                    <Link
                      to={`/prayer-times/${cityId}/${masjid.id}`}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-islamic-blue-600 text-white hover:bg-islamic-blue-700"
                    >
                      <MapPin className="w-4 h-4" /> View Timetable
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
