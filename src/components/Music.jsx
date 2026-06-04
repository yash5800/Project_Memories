import React, { useCallback, useEffect, useRef } from 'react'
import {
  useMusicStore,
  audioRef,
  audioContextRef,
  audioSourceRef,
  analyserRef,
  dataArrayRef,
  waveformArrayRef,
} from '../stores/musicStore'

const WAVE_WIDTH = 28
const WAVE_HEIGHT = 20

const buildWavePath = (amplitude, phase, waveformArray) => {
  const steps = 28
  const midY = WAVE_HEIGHT / 2
  let path = ''

  for (let i = 0; i <= steps; i += 1) {
    const progress = i / steps
    const x = progress * WAVE_WIDTH
    const sampleIndex = Math.min(
      waveformArray.length - 1,
      Math.max(0, Math.floor(progress * (waveformArray.length - 1)))
    )
    const sample = (waveformArray[sampleIndex] - 128) / 128
    const y = midY + Math.sin(progress * Math.PI * 2.2 + phase) * amplitude + sample * amplitude * 0.45
    const clampedY = Math.min(WAVE_HEIGHT - 1, Math.max(1, y))

    path += `${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${clampedY.toFixed(2)} `
  }

  return path.trim()
}

const Music = () => {
  const isPlaying = useMusicStore((s) => s.isPlaying)
  const animationFrameRef = useRef(null)
  const wavePathRef = useRef(null)
  const glowPathRef = useRef(null)
  const phaseRef = useRef(0)
  const smoothedLevelRef = useRef(0)
  const modeRef = useRef('idle')
  const playingIndexRef = useRef(0)

  const rainbowColors = ['#ff6b6b', '#ffa94d', '#ffd43b', '#69db7c', '#4dabf7', '#9775fa', '#f06595']

  const applyStyles = useCallback((mode, level) => {
    const wavePath = wavePathRef.current
    const glowPath = glowPathRef.current
    if (!wavePath || !glowPath) return

    const isMusicActive = mode === 'music'
    const opacity = isMusicActive
      ? Math.min(0.92, 0.7 + level * 0.2)
      : Math.min(0.82, 0.62 + level * 0.08)
    const dashArray = isMusicActive ? `${Math.max(1.6, 0.6 + level * 3)} ${Math.max(1.2, 0.4 + level * 1.4)}` : '2.2 3.2'

    const baseStroke = isPlaying ? rainbowColors[Math.floor(playingIndexRef.current) % rainbowColors.length] : '#f8fafc'
    const glowStroke = isPlaying ? baseStroke.replace(')', ',0.56)').replace('rgb', 'rgba') : 'rgba(255,255,255,0.56)'

    wavePath.style.stroke = baseStroke
    wavePath.style.strokeDasharray = dashArray
    wavePath.style.opacity = Math.max(0.48, opacity).toFixed(3)
    wavePath.style.filter = isPlaying
      ? 'drop-shadow(0 0 4px rgba(255,107,107,0.6)) drop-shadow(0 0 10px rgba(151,117,250,0.4))'
      : 'drop-shadow(0 0 2px rgba(255,255,255,0.45)) drop-shadow(0 0 7px rgba(255,255,255,0.2))'

    glowPath.style.stroke = glowStroke
    glowPath.style.strokeDasharray = dashArray
    glowPath.style.opacity = Math.max(0.12, opacity * 0.28).toFixed(3)
    glowPath.style.filter = isPlaying
      ? 'blur(1.6px) drop-shadow(0 0 8px rgba(255,107,107,0.3))'
      : 'blur(1.6px) drop-shadow(0 0 6px rgba(255,255,255,0.22))'
  }, [isPlaying])

  const renderWave = useCallback((mode) => {
    const analyser = analyserRef.current
    const dataArray = dataArrayRef.current
    const waveformArray = waveformArrayRef.current

    let amplitude = 1.05
    let phaseStep = 0.055
    let level = 0.08

    if (isPlaying) {
      playingIndexRef.current += 0.03
    }

    if (mode === 'music' && analyser && dataArray && waveformArray) {
      analyser.getByteFrequencyData(dataArray)
      analyser.getByteTimeDomainData(waveformArray)

      let lowBandEnergy = 0
      const lowBandSize = Math.min(14, dataArray.length)
      for (let i = 0; i < lowBandSize; i += 1) {
        lowBandEnergy += dataArray[i]
      }

      let waveformEnergy = 0
      for (let i = 0; i < waveformArray.length; i += 1) {
        const centered = (waveformArray[i] - 128) / 128
        waveformEnergy += centered * centered
      }

      const frequencyLevel = lowBandEnergy / (lowBandSize * 255)
      const rmsLevel = Math.sqrt(waveformEnergy / waveformArray.length)
      const sharedLevel = Math.min(1, frequencyLevel * 0.65 + rmsLevel * 1.4)

      smoothedLevelRef.current = smoothedLevelRef.current * 0.8 + sharedLevel * 0.2
      amplitude = 1.4 + smoothedLevelRef.current * 4.2
      phaseStep = 0.12 + smoothedLevelRef.current * 0.18
      level = smoothedLevelRef.current
    } else {
      const idleBreath = 0.5 + (Math.sin(performance.now() / 650) + 1) * 0.2
      const idleGlow = 0.04 + (Math.sin(performance.now() / 500) + 1) * 0.04
      amplitude = idleBreath
      phaseStep = 0.05
      level = idleGlow
    }

    phaseRef.current += phaseStep

    const data = waveformArray || new Uint8Array(32).fill(128)
    const d = buildWavePath(amplitude, phaseRef.current, data)

    const wavePath = wavePathRef.current
    const glowPath = glowPathRef.current
    if (wavePath) {
      wavePath.setAttribute('d', d)
    }
    if (glowPath) {
      glowPath.setAttribute('d', d)
    }

    applyStyles(mode, level)
  }, [applyStyles, isPlaying])

  const suspendCheckRef = useRef(0)
  useEffect(() => {
    const tick = () => {
      renderWave(modeRef.current)
      suspendCheckRef.current++
      if (suspendCheckRef.current % 10 === 0) {
        const ctx = audioContextRef.current
        if (ctx && ctx.state === 'suspended') {
          ctx.resume()
        }
      }
      animationFrameRef.current = requestAnimationFrame(tick)
    }
    animationFrameRef.current = requestAnimationFrame(tick)
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }
  }, [renderWave])

  useEffect(() => {
    modeRef.current = isPlaying ? 'music' : 'idle'
  }, [isPlaying])

  const setupAudioAnalyser = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return

    if (audioContextRef.current && analyserRef.current) return

    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    audioContextRef.current = new AudioContextClass()

    const audioContext = audioContextRef.current

    if (audioContext.state === 'suspended') {
      await audioContext.resume()
    }

    const analyser = audioContext.createAnalyser()
    analyser.fftSize = 128
    analyser.smoothingTimeConstant = 0.9
    analyserRef.current = analyser
    dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount)
    waveformArrayRef.current = new Uint8Array(analyser.fftSize)

    const source = audioContext.createMediaElementSource(audio)
    source.connect(analyser)
    analyser.connect(audioContext.destination)
    audioSourceRef.current = source
  }, [])

  useEffect(() => {
    renderWave(modeRef.current)
  }, [renderWave])

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const ctx = audioContextRef.current
        if (ctx && ctx.state === 'suspended') {
          ctx.resume()
        }
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  const handleToggleMusic = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (!audio.paused && audio.muted) {
      audio.muted = false
      await setupAudioAnalyser()
      const ctx = audioContextRef.current
      if (ctx && ctx.state === 'suspended') {
        await ctx.resume()
      }
      return
    }

    if (!audio.paused) {
      audio.pause()
      return
    }

    await setupAudioAnalyser()
    try {
      await audio.play()
    } catch {
      // autoplay blocked
    }

    const ctx = audioContextRef.current
    if (ctx && ctx.state === 'suspended') {
      await ctx.resume()
    }
  }

  return (
    <div className='relative inline-flex items-center justify-center overflow-visible w-12 h-12'>
      <button
        type='button'
        onClick={handleToggleMusic}
        className={`relative z-10 rounded-full w-12 h-12 border-2 flex items-center justify-center cursor-pointer transition-all duration-200 overflow-visible hover:scale-110 ${
          isPlaying ? 'animate-pulse-glow border-[#9775fa]' : ''
        }`}
        style={{
          backgroundColor: '#000000',
          borderColor: isPlaying ? '#9775fa' : '#6b7280'
        }}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        title={isPlaying ? 'Pause music' : 'Play music'}
      >
        <svg
          width={WAVE_WIDTH}
          height={WAVE_HEIGHT}
          viewBox={`0 0 ${WAVE_WIDTH} ${WAVE_HEIGHT}`}
          className='overflow-visible'
        >
          <path
            ref={glowPathRef}
            d='M0 10 L28 10'
            fill='none'
            stroke='#f8fafc'
            strokeWidth='5.2'
            strokeLinecap='round'
            strokeLinejoin='round'
            style={{
              filter: 'blur(1.6px) drop-shadow(0 0 7px rgba(255,255,255,0.22))',
              opacity: 0.18
            }}
          />
          <path
            ref={wavePathRef}
            d='M0 10 L28 10'
            fill='none'
            stroke='#f8fafc'
            strokeWidth='2.1'
            strokeLinecap='round'
            strokeLinejoin='round'
            style={{
              filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.42)) drop-shadow(0 0 7px rgba(255,255,255,0.18))',
              opacity: 0.65,
              strokeDasharray: '1.8 2.8'
            }}
          />
        </svg>
      </button>
    </div>
  )
}

export default Music
