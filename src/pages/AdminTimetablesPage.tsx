import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { Loader2, PlusCircle, UploadCloud } from 'lucide-react'
import { FormEvent, useEffect, useState } from 'react'
import { Layout } from '../components/layout/Layout'
import { db, isFirebaseConfigured, storage } from '../lib/firebase'
import { City } from '../types/firestore'

const initialMasjidTimes = {
  name: '',
  address: '',
  website: '',
  fajr: '',
  zuhr: '',
  asr: '',
  maghrib: '',
  isha: '',
  jummah_1: '',
  jummah_2: '',
  timetable_pdf_url: '',
}

const toSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '') || 'masjid'

export function AdminTimetablesPage() {
  const [cities, setCities] = useState<City[]>([])
  const [newCity, setNewCity] = useState({ name: '', region: '', country: '' })
  const [selectedCityId, setSelectedCityId] = useState('')
  const [masjidForm, setMasjidForm] = useState(initialMasjidTimes)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchCities = async () => {
      if (!db || !isFirebaseConfigured) return
      const snapshot = await getDocs(collection(db, 'cities'))
      const cityData: City[] = snapshot.docs.map((city) => ({ id: city.id, ...(city.data() as Omit<City, 'id'>) }))
      setCities(cityData)
    }

    fetchCities()
  }, [])

  const handleCitySubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!db || !isFirebaseConfigured) {
      setMessage('Firebase is not configured yet')
      return
    }

    const newCityDoc = await addDoc(collection(db, 'cities'), newCity)
    const createdCity: City = { id: newCityDoc.id, ...newCity }
    setCities((prev) => [...prev, createdCity])
    setSelectedCityId(newCityDoc.id)
    setNewCity({ name: '', region: '', country: '' })
    setMessage('City added successfully')
  }

  const handleMasjidSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!db || !storage || !isFirebaseConfigured || !selectedCityId) {
      setMessage('Please configure Firebase and select a city first')
      return
    }

    setSaving(true)
    const target = event.target as HTMLFormElement & { timetable?: { files?: FileList } }
    const uploadFile = target.timetable?.files?.[0] as File | undefined

    try {
      let timetableUrl = masjidForm.timetable_pdf_url

      if (uploadFile) {
        setUploading(true)
        const selectedCity = cities.find((city) => city.id === selectedCityId)
        const safeCity = toSlug(selectedCity?.name ?? 'city')
        const safeMasjid = toSlug(masjidForm.name)
        const extension = uploadFile.name.split('.').pop() ?? 'pdf'
        const storagePath = `timetables/${safeCity}/${safeMasjid}.${extension}`
        const storageRef = ref(storage, storagePath)
        await uploadBytes(storageRef, uploadFile)
        timetableUrl = await getDownloadURL(storageRef)
        setUploading(false)
      }

      const masjidDoc = doc(collection(db, 'cities', selectedCityId, 'masjids'))
      await setDoc(masjidDoc, { ...masjidForm, timetable_pdf_url: timetableUrl })
      setMasjidForm(initialMasjidTimes)
      setMessage('Masjid saved successfully')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to save masjid')
    } finally {
      setSaving(false)
      setUploading(false)
    }
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-islamic-blue-50 via-white to-islamic-blue-100 py-10">
        <div className="container mx-auto px-4 space-y-8">
          <div className="bg-white rounded-2xl shadow-lg border border-islamic-blue-100 p-6 space-y-4">
            <h1 className="text-2xl font-bold text-islamic-blue-900 flex items-center gap-2">
              <UploadCloud className="w-6 h-6" /> Admin Timetables
            </h1>
            <p className="text-islamic-blue-700">Hidden admin screen for managing cities, masjids, and timetables.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <form onSubmit={handleCitySubmit} className="bg-white rounded-2xl shadow-lg border border-islamic-blue-100 p-6 space-y-4">
              <h2 className="text-xl font-semibold text-islamic-blue-900 flex items-center gap-2">
                <PlusCircle className="w-5 h-5" /> Add City
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  className="border border-islamic-blue-100 rounded-lg px-3 py-2"
                  placeholder="City name"
                  value={newCity.name}
                  onChange={(event) => setNewCity((prev) => ({ ...prev, name: event.target.value }))}
                  required
                />
                <input
                  className="border border-islamic-blue-100 rounded-lg px-3 py-2"
                  placeholder="Region"
                  value={newCity.region}
                  onChange={(event) => setNewCity((prev) => ({ ...prev, region: event.target.value }))}
                  required
                />
                <input
                  className="border border-islamic-blue-100 rounded-lg px-3 py-2"
                  placeholder="Country"
                  value={newCity.country}
                  onChange={(event) => setNewCity((prev) => ({ ...prev, country: event.target.value }))}
                  required
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-islamic-blue-600 text-white hover:bg-islamic-blue-700"
              >
                <PlusCircle className="w-4 h-4" /> Save City
              </button>
            </form>

            <form onSubmit={handleMasjidSubmit} className="bg-white rounded-2xl shadow-lg border border-islamic-blue-100 p-6 space-y-4">
              <h2 className="text-xl font-semibold text-islamic-blue-900 flex items-center gap-2">
                <PlusCircle className="w-5 h-5" /> Add Masjid
              </h2>

              <div className="space-y-3">
                <select
                  className="w-full border border-islamic-blue-100 rounded-lg px-3 py-2"
                  value={selectedCityId}
                  onChange={(event) => setSelectedCityId(event.target.value)}
                  required
                >
                  <option value="">Select city</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>{city.name} - {city.country}</option>
                  ))}
                </select>

                <input
                  className="w-full border border-islamic-blue-100 rounded-lg px-3 py-2"
                  placeholder="Masjid name"
                  value={masjidForm.name}
                  onChange={(event) => setMasjidForm((prev) => ({ ...prev, name: event.target.value }))}
                  required
                />
                <input
                  className="w-full border border-islamic-blue-100 rounded-lg px-3 py-2"
                  placeholder="Address"
                  value={masjidForm.address}
                  onChange={(event) => setMasjidForm((prev) => ({ ...prev, address: event.target.value }))}
                  required
                />
                <input
                  className="w-full border border-islamic-blue-100 rounded-lg px-3 py-2"
                  placeholder="Website"
                  value={masjidForm.website}
                  onChange={(event) => setMasjidForm((prev) => ({ ...prev, website: event.target.value }))}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['fajr', 'zuhr', 'asr', 'maghrib', 'isha', 'jummah_1', 'jummah_2'].map((field) => (
                  <input
                    key={field}
                    className="w-full border border-islamic-blue-100 rounded-lg px-3 py-2"
                    placeholder={`${field.replace('_', ' ')} time`}
                    value={(masjidForm as Record<string, string>)[field]}
                    onChange={(event) => setMasjidForm((prev) => ({ ...prev, [field]: event.target.value }))}
                    required={['fajr', 'zuhr', 'asr', 'maghrib', 'isha'].includes(field)}
                  />
                ))}
              </div>

              <div className="space-y-2">
                <label className="text-sm text-islamic-blue-800">Upload timetable PDF</label>
                <input type="file" name="timetable" accept="application/pdf,image/*" />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-islamic-blue-600 text-white hover:bg-islamic-blue-700 disabled:opacity-70"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />} Save Masjid
              </button>

              {uploading && (
                <p className="text-sm text-islamic-blue-700 flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Uploading timetable...</p>
              )}
            </form>
          </div>

          {message && (
            <div className="bg-islamic-blue-50 border border-islamic-blue-100 text-islamic-blue-800 px-4 py-3 rounded-lg">
              {message}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
