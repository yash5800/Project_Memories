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
  setIsPlaying: (v) => set({ isPlaying: v }),
  setIsReady: (v) => set({ isReady: v }),
}))
