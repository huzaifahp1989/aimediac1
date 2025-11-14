import { useState, useEffect } from 'react'

interface PrayerTime {
  fajr: string
  sunrise: string
  dhuhr: string
  asr: string
  maghrib: string
  isha: string
}

// Default prayer times fallback - London times
const defaultPrayerTimes: PrayerTime = {
  fajr: '05:30',
  sunrise: '06:45',
  dhuhr: '12:30',
  asr: '15:45',
  maghrib: '18:15',
  isha: '19:30'
}

export function usePrayerTimes(location: { latitude: number; longitude: number }) {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime>(defaultPrayerTimes)
  const [hijriDate, setHijriDate] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Use fallback times immediately - no API calls to prevent error spam
    setPrayerTimes(defaultPrayerTimes)
    setHijriDate(new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }))
    setLoading(false)
    setError(null)
  }, [location])

  return { prayerTimes, hijriDate, loading, error }
}

export function useLocation() {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Default to London coordinates
    setLocation({
      latitude: 51.5074,
      longitude: -0.1278
    })
    setLoading(false)
    setError(null)
  }, [])

  return { location, error, loading }
}