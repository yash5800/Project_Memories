import { create } from 'zustand'

export const audioRef = { current: null }
export const audioContextRef = { current: null }
export const audioSourceRef = { current: null }
export const analyserRef = { current: null }
export const dataArrayRef = { current: null }
export const waveformArrayRef = { current: null }

export const useMusicStore = create((set) => ({
  isPlaying: false,
  isReady: false,
  musicStarted: false,
  setIsPlaying: (v) => set({ isPlaying: v }),
  setIsReady: (v) => set({ isReady: v }),
  setMusicStarted: (v) => set({ musicStarted: v }),
}))

export const startMusic = () => {
  const audio = audioRef.current
  if (!audio) return
  audio.muted = false
  audio.play().catch(() => {})
  const ctx = audioContextRef.current
  if (ctx && ctx.state === 'suspended') {
    ctx.resume()
  }
}
