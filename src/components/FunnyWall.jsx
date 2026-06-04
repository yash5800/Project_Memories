import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const captions = [
  { text: 'When sir says "last slide" but opens 12 more', emoji: '😵', color: '#ff6b6b' },
  { text: 'Me pretending to understand OOP concepts', emoji: '🤡', color: '#ffa94d' },
  { text: 'Coding at 3AM — this is fine', emoji: '🔥', color: '#ffd43b' },
  { text: 'Group project: me carrying the whole team', emoji: '💪', color: '#69db7c' },
  { text: 'Attendance: exists. Me:', emoji: '🏃', color: '#4dabf7' },
  { text: 'Internship interview vs reality', emoji: '💀', color: '#9775fa' },
  { text: 'When the code works on first try', emoji: '🤯', color: '#f06595' },
  { text: 'Last bench energy', emoji: '😎', color: '#ff6b6b' },
  { text: 'Endsem prep (day 1): full confidence', emoji: '📚', color: '#ffd43b' },
  { text: 'Endsem prep (day before): ', emoji: '😰', color: '#69db7c' },
  { text: 'Sir: "any doubts?" Class:', emoji: '🤐', color: '#4dabf7' },
  { text: 'Walking into class 2 hours late like nothing happened', emoji: '😤', color: '#9775fa' },
]

const FunnyWall = () => {
  const { isDark } = useTheme()
  const [likes, setLikes] = useState({})
  const [hovered, setHovered] = useState(null)

  const toggleLike = (i) => {
    setLikes((prev) => ({ ...prev, [i]: (prev[i] || 0) + 1 }))
  }

  return (
    <section
      id="funny-wall"
      className={`relative py-20 px-6 ${
        isDark ? 'bg-[#0f0f1a]' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-0 w-72 h-72 bg-[#ff6b6b]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-0 w-72 h-72 bg-[#4dabf7]/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-rainbow">Classroom</span>{' '}
            <span className={isDark ? 'text-white' : 'text-gray-800'}>Chaos</span>
          </h2>
          <p className={`max-w-xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Relatable moments only 22 Batch CSE will understand
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {captions.map((c, i) => (
            <div
              key={i}
              className={`break-inside-avoid rounded-2xl p-5 transition-all duration-300 cursor-pointer ${
                isDark ? 'bg-white/5 hover:bg-white/[0.07]' : 'bg-white/70 hover:bg-white/90 border border-black/5'
              }`}
              style={{
                boxShadow: isDark
                  ? `0 0 30px ${c.color}08`
                  : `0 4px 20px ${c.color}15`,
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl">{c.emoji}</span>
                <p className={`text-sm leading-relaxed flex-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{c.text}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleLike(i)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                      likes[i]
                        ? 'bg-[#f06595]/20 text-[#f06595]'
                        : isDark
                          ? 'bg-white/5 text-gray-400 hover:bg-white/10'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${likes[i] ? 'scale-110' : ''} ${hovered === i ? 'scale-110' : ''}`}
                      fill={likes[i] ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                    {likes[i] || 'Like'}
                  </button>
                </div>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FunnyWall
