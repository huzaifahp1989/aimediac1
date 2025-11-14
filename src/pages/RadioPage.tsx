import { Layout } from '../components/layout/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Play, Pause, Volume2, Radio, Heart, Share2, Headphones } from 'lucide-react'
import { useAudio } from '../hooks/useAudio'
import { useState, useEffect } from 'react'

const RADIO_STREAM_URL = 'https://a4.asurahosting.com:7820/radio.mp3'

export function RadioPage() {
  const { play, pause, isPlaying } = useAudio(RADIO_STREAM_URL)
  const [volume, setVolume] = useState(0.7)
  const [isLoading, setIsLoading] = useState(false)
  const [nowPlaying, setNowPlaying] = useState({
    title: 'Connecting to stream...',
    artist: 'Islamic Radio',
    album: 'Live Stream'
  })

  useEffect(() => {
    // Simulate getting now playing info
    const timer = setTimeout(() => {
      setNowPlaying({
        title: 'Surah Ar-Rahman Recitation',
        artist: 'Sheikh Mishary Rashid Alafasy',
        album: 'Quran Recitation'
      })
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handlePlayPause = async () => {
    setIsLoading(true)
    try {
      if (isPlaying) {
        pause()
      } else {
        await play()
      }
    } catch (error) {
      console.error('Error playing audio:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
    // Update audio element volume if available
    const audioElement = document.querySelector('audio')
    if (audioElement) {
      audioElement.volume = newVolume
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-islamic-blue-900 mb-2">Islamic Radio</h1>
          <p className="text-islamic-blue-700">24/7 Islamic content streaming live</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Player */}
            <div className="lg:col-span-2">
              <Card className="border-islamic-blue-200 bg-gradient-to-br from-islamic-blue-50 to-white">
                <CardHeader>
                  <CardTitle className="flex items-center text-islamic-blue-900">
                    <Radio className="w-6 h-6 mr-2 text-islamic-blue-600" />
                    Live Radio Stream
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Now Playing */}
                  <div className="bg-gradient-to-r from-islamic-blue-600 to-islamic-blue-700 rounded-xl p-6 text-white">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        <Headphones className="w-8 h-8" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1">{nowPlaying.title}</h3>
                        <p className="text-blue-100 text-sm">{nowPlaying.artist}</p>
                        <p className="text-blue-200 text-xs">{nowPlaying.album}</p>
                      </div>
                      {isPlaying && (
                        <div className="flex space-x-1">
                          <div className="w-1 h-4 bg-white rounded animate-pulse" style={{animationDelay: '0ms'}}></div>
                          <div className="w-1 h-6 bg-white rounded animate-pulse" style={{animationDelay: '150ms'}}></div>
                          <div className="w-1 h-4 bg-white rounded animate-pulse" style={{animationDelay: '300ms'}}></div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex justify-center">
                    <Button
                      onClick={handlePlayPause}
                      disabled={isLoading}
                      variant="islamic"
                      size="lg"
                      className="px-8"
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      ) : isPlaying ? (
                        <><Pause className="w-5 h-5 mr-2" /> Pause</>
                      ) : (
                        <><Play className="w-5 h-5 mr-2" /> Play</>
                      )}
                    </Button>
                  </div>

                  {/* Volume Control */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <Volume2 className="w-4 h-4 text-gray-500" />
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={(e) => handleVolumeChange(Number(e.target.value))}
                        className="flex-1"
                      />
                      <span className="text-sm text-gray-500 w-8">{Math.round(volume * 100)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Station Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-islamic-blue-900">Station Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bitrate:</span>
                    <span className="font-medium">128 kbps</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Format:</span>
                    <span className="font-medium">MP3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`font-medium ${isPlaying ? 'text-green-600' : 'text-gray-500'}`}>
                      {isPlaying ? 'Playing' : 'Stopped'}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-islamic-blue-900">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Heart className="w-4 h-4 mr-2" />
                    Add to Favorites
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Station
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Programs */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-islamic-blue-900">Recent Programs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-sm">Morning Qur'an Recitation</h4>
                    <p className="text-xs text-gray-500">Daily at 6:00 AM</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-sm">Evening Hadith Study</h4>
                    <p className="text-xs text-gray-500">Daily at 8:00 PM</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-sm">Friday Khutbah</h4>
                    <p className="text-xs text-gray-500">Fridays at 1:00 PM</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}