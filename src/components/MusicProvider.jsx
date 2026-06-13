import { useEffect, useRef } from 'react'
import { useMusicStore, audioRef } from '../stores/musicStore'

const MUSIC_SRC = `${import.meta.env.BASE_URL}music/onepiecebrook.mp3`

const MusicProvider = () => {
  const internalRef = useRef(null)
  const setIsPlaying = useMusicStore((s) => s.setIsPlaying)
  const setIsReady = useMusicStore((s) => s.setIsReady)

  useEffect(() => {
    const audio = internalRef.current
    if (!audio) return

    audioRef.current = audio
    audio.src = MUSIC_SRC
    audio.loop = true
    audio.preload = 'auto'
    audio.playsInline = true
    audio.load()

    setIsReady(true)

    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)

    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
    }
  }, [setIsPlaying, setIsReady])

  return <audio ref={internalRef} />
}

export default MusicProvider
