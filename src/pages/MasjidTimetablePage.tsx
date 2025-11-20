import { doc, getDoc } from 'firebase/firestore'
import { BookCopy, Clock, Download, Heart, Link as LinkIcon, MapPin, MoonStar, Sun, SunMedium, Sunrise, Sunset } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Layout } from '../components/layout/Layout'
import { useFavoriteMasjids } from '../hooks/useFavoriteMasjids'
import { db, isFirebaseConfigured } from '../lib/firebase'
import { Masjid } from '../types/firestore'

const isImageUrl = (url?: string) => Boolean(url && url.match(/\.(png|jpg|jpeg|gif)$/i))

export function MasjidTimetablePage() {
  const { cityId, masjidId } = useParams<{ cityId: string; masjidId: string }>()
  const [masjid, setMasjid] = useState<Masjid | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isFavorite, toggleFavorite } = useFavoriteMasjids()

  useEffect(() => {
    const fetchMasjid = async () => {
      if (!isFirebaseConfigured || !db) {
        setError('Firebase is not configured. Please add your Firebase keys to .env.')
        setLoading(false)
        return
      }

      if (!cityId || !masjidId) return

      try {
        const masjidDoc = await getDoc(doc(db, 'cities', cityId, 'masjids', masjidId))
        if (masjidDoc.exists()) {
          setMasjid({ id: masjidDoc.id, ...(masjidDoc.data() as Omit<Masjid, 'id'>) })
        } else {
          setError('Masjid not found')
        }
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : 'Unable to load masjid')
      } finally {
        setLoading(false)
      }
    }

    fetchMasjid()
  }, [cityId, masjidId])

  const prayerCards = useMemo(() => ([
    { label: 'Fajr', value: masjid?.fajr, icon: Sunrise },
    { label: 'Zuhr', value: masjid?.zuhr, icon: Sun },
    { label: 'Asr', value: masjid?.asr, icon: SunMedium },
    { label: 'Maghrib', value: masjid?.maghrib, icon: Sunset },
    { label: 'Isha', value: masjid?.isha, icon: MoonStar },
    { label: 'Jummah 1', value: masjid?.jummah_1, icon: Clock },
    { label: 'Jummah 2', value: masjid?.jummah_2, icon: BookCopy },
  ]), [masjid])

  const openTimetable = () => {
    if (!masjid?.timetable_pdf_url) {
      setError('No timetable available for this masjid yet.')
      return
    }

    if (isImageUrl(masjid.timetable_pdf_url)) return

    window.open(masjid.timetable_pdf_url, '_blank', 'noopener')
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-islamic-blue-50 via-white to-islamic-blue-100">
        <div className="container mx-auto px-4 py-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-xs uppercase text-islamic-blue-700 font-semibold">Prayer Times</p>
              <h1 className="text-2xl font-bold text-islamic-blue-900">{masjid?.name ?? 'Masjid Timetable'}</h1>
              <p className="text-islamic-blue-700 flex items-center gap-2"><MapPin className="w-4 h-4" /> {masjid?.address}</p>
            </div>
            <button
              type="button"
              onClick={() => toggleFavorite({
                cityId: cityId ?? '',
                masjidId: masjidId ?? '',
                masjidName: masjid?.name ?? '',
                address: masjid?.address ?? '',
              })}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${isFavorite(cityId ?? '', masjidId ?? '')
                ? 'bg-islamic-blue-50 border-islamic-blue-300 text-islamic-blue-700'
                : 'border-islamic-blue-100 text-islamic-blue-500 hover:bg-islamic-blue-50'
                }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite(cityId ?? '', masjidId ?? '') ? 'fill-islamic-blue-400 text-islamic-blue-700' : ''}`} />
              Favourite
            </button>
          </div>

          {loading && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 7 }).map((_, index) => (
                <div key={index} className="p-6 bg-white rounded-2xl shadow-lg border border-islamic-blue-100 animate-pulse">
                  <div className="h-6 bg-islamic-blue-100 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-islamic-blue-50 rounded w-1/2" />
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {!loading && masjid && (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {prayerCards.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="p-6 bg-white rounded-2xl shadow-lg border border-islamic-blue-100">
                    <div className="flex items-center gap-3 text-islamic-blue-900">
                      <Icon className="w-6 h-6 text-islamic-blue-600" />
                      <div>
                        <p className="text-sm text-islamic-blue-700">{label}</p>
                        <p className="text-lg font-semibold">{value || 'Not set'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white border border-islamic-blue-100 rounded-2xl shadow-lg p-6 space-y-4">
                <h2 className="text-xl font-semibold text-islamic-blue-900 flex items-center gap-2">
                  <Download className="w-5 h-5" /> Timetable PDF
                </h2>

                {!masjid.timetable_pdf_url && (
                  <p className="text-islamic-blue-700">No timetable available yet. Please check again soon.</p>
                )}

                {masjid.timetable_pdf_url && (
                  <div className="space-y-3">
                    {isImageUrl(masjid.timetable_pdf_url) ? (
                      <img
                        src={masjid.timetable_pdf_url}
                        alt={`${masjid.name} timetable`}
                        className="rounded-xl border border-islamic-blue-100"
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={openTimetable}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-islamic-blue-600 text-white hover:bg-islamic-blue-700"
                      >
                        <Download className="w-4 h-4" /> Open Timetable PDF
                      </button>
                    )}

                    <div className="flex flex-wrap gap-2 text-sm text-islamic-blue-700">
                      {masjid.website && (
                        <a
                          href={masjid.website}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-islamic-blue-50 text-islamic-blue-800 hover:bg-islamic-blue-100"
                        >
                          <LinkIcon className="w-4 h-4" /> Website
                        </a>
                      )}
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(masjid.address)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-islamic-blue-50 text-islamic-blue-800 hover:bg-islamic-blue-100"
                      >
                        <MapPin className="w-4 h-4" /> Directions
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}
