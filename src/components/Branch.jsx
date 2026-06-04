import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const baseUrl = import.meta.env.BASE_URL || '/'

const milestones = [
  { year: '2022', label: 'First Step', color: '#ff6b6b', icon: '👣', desc: '72 curious minds stepped into college. The journey began.' },
  { year: '2023', label: 'Growing Strong', color: '#ffd43b', icon: '🌱', desc: 'Late-night study sessions, first hackathons, friendships that clicked.' },
  { year: '2024', label: 'Building Dreams', color: '#69db7c', icon: '⚡', desc: 'Projects came alive. Ideas turned into code. We found our rhythm.' },
  { year: '2025', label: 'Almost There', color: '#4dabf7', icon: '🚀', desc: 'Internships, placements, and the final sprint toward graduation.' },
  { year: '2026', label: 'Graduation', color: '#9775fa', icon: '🎓', desc: 'Four years, countless memories. This is where we shine.' },
]

const shapes = ['circle', 'hexagon', 'diamond', 'star', 'square']

const Branch = () => {
  const { isDark } = useTheme()

  return (
    <section
      id="branch"
      className={`relative py-20 px-6 overflow-hidden ${
        isDark ? 'bg-[#0f0f1a]' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full blur-sm"
            style={{
              width: `${8 + i * 4}px`,
              height: `${8 + i * 4}px`,
              backgroundColor: milestones[i % 5].color,
              opacity: isDark ? 0.2 : 0.12,
              top: `${10 + i * 15}%`,
              left: i % 2 === 0 ? `${5 + i * 3}%` : `${80 - i * 3}%`,
              animation: `float-around ${6 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}
        <div className={`absolute top-1/4 left-[10%] w-2 h-2 rounded-full animate-sparkle ${isDark ? 'bg-white/10' : 'bg-gray-400'}`} />
        <div className={`absolute top-3/4 right-[15%] w-3 h-3 rounded-full animate-sparkle ${isDark ? 'bg-white/10' : 'bg-gray-400'}`} style={{ animationDelay: '1.5s' }} />
        <div className={`absolute top-1/2 left-[90%] w-2 h-2 rounded-full animate-sparkle ${isDark ? 'bg-white/10' : 'bg-gray-400'}`} style={{ animationDelay: '3s' }} />
      </div>

      <div className='flex justify-center items-center flex-col lg:flex-row gap-12 lg:gap-24 relative z-10'>
        <div className='flex justify-center items-start flex-col max-w-lg gap-6'>
          <h1 className='text-4xl sm:text-5xl font-extrabold leading-tight'>
            <span className="text-rainbow">Our</span>{' '}
            <span className={isDark ? 'text-white' : 'text-gray-800'}>Memories</span>
          </h1>
          <p className={`text-start text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            From the first day to the last, our journey has been filled with unforgettable moments. Each year brought new challenges, growth, and memories that we will cherish forever.
          </p>

          <Link
            to="/book"
            className={`group relative inline-flex items-center gap-2 px-6 py-3 bg-rainbow rounded-full text-white font-semibold overflow-hidden transition-transform duration-300 hover:scale-105 shadow-lg ${
              isDark ? 'shadow-violet-500/30' : 'shadow-violet-400/40'
            }`}
          >
            <span className="relative z-10">Flip Through the Book</span>
            <svg className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </div>

        <div className='relative group'>
          <div className={`absolute -inset-4 rounded-3xl opacity-30 blur-xl transition-all duration-500 group-hover:opacity-60 group-hover:blur-2xl`}
            style={{
              background: 'linear-gradient(135deg, #ff6b6b, #ffd43b, #69db7c, #4dabf7, #9775fa)',
              backgroundSize: '200% 200%',
              animation: 'rainbow 4s ease infinite',
            }}
          />

          <Link to="/book">
          <div className='relative w-[320px] sm:w-[350px] p-2 rounded-3xl overflow-hidden backdrop-blur-sm'
            style={{
              background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.8)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.06)'}`,
              boxShadow: isDark ? 'none' : '0 8px 32px rgba(0,0,0,0.06)',
            }}
          >
            <img
              src={`${baseUrl}textures/book-cover.png`}
              alt="Branch"
              className="object-contain rounded-3xl transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
          </Link>

          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {milestones.map((m, i) => (
              <div key={i} className="w-2 h-2 rounded-full animate-pulse-glow" style={{ backgroundColor: m.color, animationDelay: `${i * 0.3}s` }} />
            ))}
          </div>
        </div>
      </div>

      <div className="relative mt-24 max-w-5xl mx-auto">
        <div className={`absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 ${isDark ? 'bg-white/10' : 'bg-gradient-to-b from-[#ff6b6b]/30 via-[#69db7c]/30 to-[#9775fa]/30'}`} />

        <div className="space-y-16">
          {milestones.map((m, i) => {
            const ShapeComp = shapeMap[shapes[i]]
            const isLeft = i % 2 === 0
            return (
              <div
                key={i}
                className="group relative flex items-center gap-6 sm:gap-12"
                style={{ flexDirection: isLeft ? 'row' : 'row-reverse' }}
              >
                <div className={`flex-1 ${isLeft ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block p-5 rounded-2xl backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 cursor-default ${
                    isDark
                      ? 'bg-white/5 hover:bg-white/[0.07]'
                      : 'bg-white/70 hover:bg-white/90 border border-black/5'
                  }`}
                    style={{
                      boxShadow: isDark
                        ? `0 0 30px ${m.color}15`
                        : `0 4px 20px ${m.color}20, 0 0 30px ${m.color}10`,
                    }}
                  >
                    <span className="text-sm font-bold tracking-widest uppercase" style={{ color: m.color }}>{m.year}</span>
                    <h3 className={`text-xl font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      {m.icon} {m.label}
                    </h3>
                    <p className={`text-sm mt-2 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{m.desc}</p>
                  </div>
                </div>

                <div className="relative flex-shrink-0 z-10">
                  <div className="relative transition-transform duration-300 group-hover:scale-125">
                    <ShapeComp color={m.color} />
                  </div>
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-md`}
                    style={{ backgroundColor: m.color }}
                  />
                </div>

                <div className={`flex-1 ${isLeft ? 'text-left' : 'text-right'}`}>
                  <div className={`h-0 border-t ${isDark ? 'border-white/5' : 'border-transparent'}`} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const Circle = ({ color }) => (
  <div className="relative flex items-center justify-center">
    <div className="w-5 h-5 rounded-full border-4 border-white/30 shadow-lg" style={{ backgroundColor: color }} />
    <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: color }} />
  </div>
)

const Hexagon = ({ color }) => (
  <div className="relative flex items-center justify-center">
    <svg width="22" height="22" viewBox="0 0 22 22" className="drop-shadow-lg">
      <polygon points="11,1 20,6 20,16 11,21 2,16 2,6" fill={color} stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
    </svg>
  </div>
)

const Diamond = ({ color }) => (
  <div className="relative flex items-center justify-center">
    <svg width="22" height="22" viewBox="0 0 22 22" className="drop-shadow-lg">
      <rect x="11" y="1" width="14" height="14" rx="2" fill={color} stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" transform="rotate(45 11 11)" />
    </svg>
  </div>
)

const Star = ({ color }) => (
  <div className="relative flex items-center justify-center">
    <svg width="24" height="24" viewBox="0 0 24 24" className="drop-shadow-lg">
      <polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" fill={color} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
    </svg>
  </div>
)

const Square = ({ color }) => (
  <div className="relative flex items-center justify-center">
    <div className="w-[18px] h-[18px] border-2 border-white/30 shadow-lg" style={{ backgroundColor: color, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', borderRadius: '3px' }} />
  </div>
)

const shapeMap = { circle: Circle, hexagon: Hexagon, diamond: Diamond, star: Star, square: Square }

export default Branch
