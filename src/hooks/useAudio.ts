import { useState, useEffect } from 'react'

export function useAudio(url: string) {
  const [audio] = useState(new Audio(url))
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    const setAudioData = () => {
      setDuration(audio.duration)
      setCurrentTime(audio.currentTime)
    }

    const setAudioTime = () => setCurrentTime(audio.currentTime)

    audio.addEventListener('loadedmetadata', setAudioData)
    audio.addEventListener('timeupdate', setAudioTime)

    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData)
      audio.removeEventListener('timeupdate', setAudioTime)
    }
  }, [audio])

  const play = () => {
    audio.play()
    setIsPlaying(true)
  }

  const pause = () => {
    audio.pause()
    setIsPlaying(false)
  }

  const stop = () => {
    audio.pause()
    audio.currentTime = 0
    setIsPlaying(false)
  }

  return {
    play,
    pause,
    stop,
    isPlaying,
    duration,
    currentTime,
    setCurrentTime: (time: number) => {
      audio.currentTime = time
      setCurrentTime(time)
    },
  }
}