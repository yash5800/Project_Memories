import React, { useEffect, useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const labels = [
  { min: 0, max: 25, text: 'Legends never attend', emoji: '👑' },
  { min: 25, max: 45, text: 'Masters of "medical emergency"', emoji: '🕵️' },
  { min: 45, max: 60, text: 'Living on the edge', emoji: '🎲' },
  { min: 60, max: 75, text: 'Optimal procrastinator', emoji: '⚖️' },
  { min: 75, max: 85, text: 'Regular but reluctant', emoji: '😐' },
  { min: 85, max: 100, text: 'Teacher\'s pet energy', emoji: '📖' },
]

const getLabel = (val) => labels.find((l) => val >= l.min && val < l.max) || labels[labels.length - 1]

const AttendanceMeter = () => {
  const { isDark } = useTheme()
  const [value, setValue] = useState(0)
  const [target] = useState(() => Math.floor(Math.random() * 101))
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!animated) return
    const duration = 2000
    const start = performance.now()
    const frame = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }, [animated, target])

  const radius = 100
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference
  const label = getLabel(value)

  const needleAngle = -90 + (value / 100) * 180

  return (
    <section
      id="attendance-meter"
      className={`relative py-20 px-6 ${
        isDark ? 'bg-[#0f0f1a]' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#ffd43b]/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-lg mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className={isDark ? 'text-white' : 'text-gray-800'}>Attendance</span>{' '}
          <span className="text-rainbow">Meter</span>
        </h2>
        <p className={`mb-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          How's your attendance looking this semester?
        </p>

        <div className="relative w-72 h-72 mx-auto">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 240 240">
            <circle cx="120" cy="120" r={radius} fill="none" stroke={isDark ? '#1e1e3a' : '#e2e8f0'} strokeWidth="14" />
            <circle
              cx="120" cy="120" r={radius}
              fill="none"
              stroke="url(#gauge-gradient)"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={animated ? offset : circumference}
              className="transition-all duration-100 ease-out"
            />
            <defs>
              <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff6b6b" />
                <stop offset="50%" stopColor="#ffd43b" />
                <stop offset="100%" stopColor="#69db7c" />
              </linearGradient>
            </defs>
          </svg>

          <div
            className="absolute top-1/2 left-1/2 w-1 h-20 origin-bottom transition-all duration-1000 ease-out"
            style={{
              transform: `translate(-50%, -100%) rotate(${needleAngle}deg)`,
              transition: 'transform 2s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <div className="w-1 h-16 mx-auto rounded-full bg-gradient-to-t from-[#9775fa] to-[#ff6b6b]" />
            <div className="w-4 h-4 -mt-1 mx-auto rounded-full bg-[#9775fa] shadow-lg shadow-[#9775fa]/50" />
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {value}%
            </span>
            <span className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>attendance</span>
          </div>
        </div>

        <div className={`mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium ${
          isDark ? 'bg-white/5 text-gray-300' : 'bg-white/70 text-gray-700 border border-black/5'
        }`}>
          <span className="text-lg">{label.emoji}</span>
          <span>{label.text}</span>
        </div>

        <div className="flex justify-center gap-6 mt-8">
          {[
            { label: 'Low', color: '#ff6b6b', pos: '0%' },
            { label: 'Med', color: '#ffd43b', pos: '50%' },
            { label: 'High', color: '#69db7c', pos: '100%' },
          ].map((p) => (
            <div key={p.label} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
              <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{p.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AttendanceMeter
