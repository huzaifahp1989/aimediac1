import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Clock, MapPin, Moon, Sun } from 'lucide-react'
import { usePrayerTimes, useLocation } from '../../hooks/usePrayerTimes'

export function PrayerTimesWidget() {
  const { location, loading: locationLoading } = useLocation()
  const { prayerTimes, hijriDate, loading: prayerLoading, error } = usePrayerTimes(location || { latitude: 51.5074, longitude: -0.1278 })
  
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })

  if (error) {
    return (
      <Card className="border-islamic-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-islamic-blue-900 text-sm">
            <Clock className="w-4 h-4 mr-2" />
            Prayer Times
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600 text-sm">{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-islamic-blue-200 bg-gradient-to-br from-islamic-blue-50 to-white">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-islamic-blue-900 text-sm">
          <Clock className="w-4 h-4 mr-2" />
          Prayer Times
        </CardTitle>
        {hijriDate && (
          <p className="text-xs text-islamic-blue-700 mt-1">{hijriDate}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Current Time */}
        <div className="bg-islamic-blue-100 rounded-lg p-3 text-center">
          <p className="text-xs text-islamic-blue-700">Current Time</p>
          <p className="text-lg font-bold text-islamic-blue-900">{currentTime}</p>
        </div>
        
        {/* Prayer Times */}
        {prayerLoading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-islamic-blue-100 last:border-b-0">
                <div className="h-4 bg-islamic-blue-100 rounded w-16 animate-pulse"></div>
                <div className="h-4 bg-islamic-blue-100 rounded w-12 animate-pulse"></div>
              </div>
            ))}
          </div>
        ) : prayerTimes ? (
          <div className="space-y-2">
            {Object.entries(prayerTimes).map(([prayer, time]) => (
              <div key={prayer} className="flex justify-between items-center py-2 border-b border-islamic-blue-100 last:border-b-0">
                <span className="text-sm font-medium text-islamic-blue-800 capitalize">{prayer}</span>
                <span className="text-sm font-bold text-islamic-blue-900">{time}</span>
              </div>
            ))}
          </div>
        ) : null}
        
        {/* Location */}
        <div className="flex items-center text-xs text-islamic-blue-600 pt-2">
          <MapPin className="w-3 h-3 mr-1" />
          <span>London, UK</span>
        </div>
      </CardContent>
    </Card>
  )
}