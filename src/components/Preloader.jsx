import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { startMusic, useMusicStore } from '../stores/musicStore'

const BASE = import.meta.env.BASE_URL

const ALL_IMAGES = [
  `${BASE}StartGroup.jpg`,
  `${BASE}StartGroup.png`,
  `${BASE}textures/book-cover.png`,
  `${BASE}textures/book-back.jpg`,
  ...Array.from({ length: 26 }, (_, i) => `${BASE}textures/pg${i + 1}.jpg`),
  ...Array.from({ length: 18 }, (_, i) => `${BASE}projectBanners/${i + 1}.png`),
  `${BASE}icons/info.png`,
  `${BASE}classmeats/22-01.png`,
  `${BASE}classmeats/22-02.jpeg`,
  `${BASE}classmeats/22-03.jpg`,
  `${BASE}classmeats/22-04.jpeg`,
  `${BASE}classmeats/22-05.jpeg`,
  `${BASE}classmeats/22-06.JPG`,
  `${BASE}classmeats/22-07.jpg`,
  `${BASE}classmeats/22-08.jpg`,
  `${BASE}classmeats/22-09.jpg`,
  `${BASE}classmeats/22-10.jpg`,
  `${BASE}classmeats/22-11.jpeg`,
  `${BASE}classmeats/22-12.png`,
  `${BASE}classmeats/22-13.jpg`,
  `${BASE}classmeats/22-14.jpg`,
  `${BASE}classmeats/22-15.png`,
  `${BASE}classmeats/22-16.jpeg`,
  `${BASE}classmeats/22-17.jpg`,
  `${BASE}classmeats/22-18.jpg`,
  `${BASE}classmeats/22-19.jpg`,
  `${BASE}classmeats/22-20.jpg`,
  `${BASE}classmeats/22-21.jpg`,
  `${BASE}classmeats/22-22.jpg`,
  `${BASE}classmeats/22-23.jpeg`,
  `${BASE}classmeats/22-24.jpg`,
  `${BASE}classmeats/22-25.jpg`,
  `${BASE}classmeats/22-26.jpg`,
  `${BASE}classmeats/22-27.jpg`,
  `${BASE}classmeats/22-28.jpg`,
  `${BASE}classmeats/22-29.png`,
  `${BASE}classmeats/22-30.jpeg`,
  `${BASE}classmeats/22-31.jpg`,
  `${BASE}classmeats/22-32.JPG`,
  `${BASE}classmeats/22-33.jpg`,
  `${BASE}classmeats/22-34.jpg`,
  `${BASE}classmeats/22-35.jpg`,
  `${BASE}classmeats/22-36.jpg`,
  `${BASE}classmeats/22-37.jpg`,
  `${BASE}classmeats/22-38.jpg`,
  `${BASE}classmeats/22-39.jpeg`,
  `${BASE}classmeats/22-40.png`,
  `${BASE}classmeats/22-41.jpeg`,
  `${BASE}classmeats/22-42.png`,
  `${BASE}classmeats/22-43.jpg`,
  `${BASE}classmeats/22-44.jpg`,
  `${BASE}classmeats/22-45.jpg`,
  `${BASE}classmeats/22-46.png`,
  `${BASE}classmeats/22-47.png`,
  `${BASE}classmeats/22-48.jpg`,
  `${BASE}classmeats/22-49.jpg`,
  `${BASE}classmeats/22-50.png`,
  `${BASE}classmeats/22-51.jpg`,
  `${BASE}classmeats/22-52.jpg`,
  `${BASE}classmeats/22-53.jpg`,
  `${BASE}classmeats/22-54.webp`,
  `${BASE}classmeats/22-55.jpg`,
  `${BASE}classmeats/22-56.jpeg`,
  `${BASE}classmeats/22-57.jpg`,
  `${BASE}classmeats/22-58.jpeg`,
  `${BASE}classmeats/22-59.jpg`,
  `${BASE}classmeats/22-60.jpg`,
  `${BASE}classmeats/22-61.PNG`,
  `${BASE}classmeats/22-62.jpg`,
  `${BASE}classmeats/22-63.jpg`,
  `${BASE}classmeats/22-64.jpg`,
  `${BASE}classmeats/22-65.jpg`,
  `${BASE}classmeats/22-66.jpg`,
  `${BASE}classmeats/23-01.jpg`,
  `${BASE}classmeats/23-02.jpg`,
  `${BASE}classmeats/23-03.jpg`,
  `${BASE}classmeats/23-04.jpg`,
  `${BASE}classmeats/23-05.jpg`,
  `${BASE}classmeats/23-06.jpg`,
]

const progressMessages = [
  { threshold: 0, message: 'Hold tight, memories are loading...' },
  { threshold: 20, message: 'Gathering classmate photos...' },
  { threshold: 35, message: 'Preparing the 3D flipbook...' },
  { threshold: 50, message: 'Loading faculty reviews...' },
  { threshold: 65, message: 'Polishing project banners...' },
  { threshold: 80, message: 'Warming up the music...' },
  { threshold: 92, message: 'Almost there...' },
]

const Preloader = ({ children }) => {
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)
  const [started, setStarted] = useState(false)
  const [message, setMessage] = useState(progressMessages[0].message)
  const setMusicStarted = useMusicStore((s) => s.setMusicStarted)
  const navigate = useNavigate()

  useEffect(() => {
    let cancelled = false
    let loaded = 0
    const total = ALL_IMAGES.length
    const fallbackTimer = setTimeout(() => {
      if (!cancelled) setReady(true)
    }, 15000)

    const onLoad = () => {
      if (cancelled) return
      loaded++
      const pct = Math.min(100, Math.round((loaded / total) * 100))
      setProgress(pct)
      if (loaded >= total) {
        clearTimeout(fallbackTimer)
        setReady(true)
      }
    }

    ALL_IMAGES.forEach((src) => {
      const img = new Image()
      img.onload = onLoad
      img.onerror = onLoad
      img.src = src
    })

    return () => { cancelled = true; clearTimeout(fallbackTimer) }
  }, [])

  useEffect(() => {
    let current = progressMessages[0].message
    for (const entry of progressMessages) {
      if (progress >= entry.threshold) {
        current = entry.message
      }
    }
    setMessage(current)
  }, [progress])

  const handleBegin = useCallback(() => {
    startMusic()
    setMusicStarted(true)
    setStarted(true)
    navigate('/')
  }, [navigate, setMusicStarted])

  return (
    <>
      <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gray-950 transition-opacity duration-700 ${
        started ? 'opacity-0 pointer-events-none' : ''
      }`}>
        <div className="absolute top-20 left-[15%] w-8 h-8 rounded-full bg-[#ff6b6b]/20 blur-[2px] animate-float-around" style={{ animationDelay: '0s', animationDuration: '7s' }} />
        <div className="absolute top-32 right-[20%] w-6 h-6 rounded-full bg-[#ffd43b]/20 blur-[2px] animate-float-around" style={{ animationDelay: '1s', animationDuration: '9s' }} />
        <div className="absolute bottom-48 left-[25%] w-10 h-10 rounded-full bg-[#69db7c]/20 blur-[2px] animate-float-around" style={{ animationDelay: '2s', animationDuration: '8s' }} />
        <div className="absolute bottom-64 right-[15%] w-7 h-7 rounded-full bg-[#4dabf7]/20 blur-[2px] animate-float-around" style={{ animationDelay: '0.5s', animationDuration: '10s' }} />
        <div className="absolute top-1/3 left-[10%] w-9 h-9 rounded-full bg-[#9775fa]/20 blur-[2px] animate-float-around" style={{ animationDelay: '1.5s', animationDuration: '7.5s' }} />
        <div className="absolute bottom-1/3 right-[25%] w-5 h-5 rounded-full bg-[#f06595]/20 blur-[2px] animate-float-around" style={{ animationDelay: '3s', animationDuration: '8.5s' }} />

        <div className="relative z-10 text-center px-6">
          {!ready ? (
            <div>
              <div className="w-16 h-16 border-[3px] border-[#ffa94d] border-t-transparent rounded-full animate-spin mx-auto mb-8" />
              <p className="text-white/80 text-lg mb-2 tracking-wide min-h-[2rem] transition-all duration-500">{message}</p>
              <p className="text-white/40 text-sm mb-6 italic">Loading memories...</p>
              <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden mx-auto">
                <div
                  className="h-full bg-rainbow rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-white/30 text-sm mt-3 font-mono tracking-widest">{progress}%</p>
            </div>
          ) : (
            <div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-wider mb-4 animate-slide-up">
                <span className="text-rainbow bg-clip-text">22</span>
                <span className="text-white mx-3">BATCH</span>
              </h1>
              <p className="text-lg text-gray-400 mb-10 animate-slide-up-delayed">
                Computer Science & Engineering
              </p>
              <button
                onClick={handleBegin}
                className="px-10 py-4 bg-rainbow rounded-full text-white font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-violet-500/30 animate-pulse-glow animate-bounce-delayed cursor-pointer"
              >
                Begin Journey
              </button>
            </div>
          )}
        </div>
      </div>
      {children}
    </>
  )
}

export default Preloader
