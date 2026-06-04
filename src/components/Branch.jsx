import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const milestones = [
  { year: '2022', label: 'First Step', color: '#ff6b6b', icon: '👣', desc: 'The journey began with 60 curious minds stepping into college.' },
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
      className={`relative min-h-screen py-20 px-6 overflow-hidden ${
        isDark ? 'bg-[#0f0f1a]' : 'bg-gray-100'
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-[8%] w-3 h-3 rounded-full bg-[#ff6b6b]/30 animate-sparkle" />
        <div className="absolute bottom-20 right-[12%] w-4 h-4 rounded-full bg-[#4dabf7]/30 animate-sparkle" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-[10%] w-2 h-2 rounded-full bg-[#69db7c]/30 animate-sparkle" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-rainbow">Our Journey</span>
          </h2>
          <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            A four-year adventure packed with growth, code, and camaraderie
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 hidden md:block pointer-events-none opacity-50"
            style={{ background: 'linear-gradient(to bottom, #ff6b6b, #ffd43b, #69db7c, #4dabf7, #9775fa)' }}
          />
          <div className="absolute left-[19px] top-0 bottom-0 w-0.5 md:hidden pointer-events-none opacity-40"
            style={{ background: 'linear-gradient(to bottom, #ff6b6b, #ffd43b, #69db7c, #4dabf7, #9775fa)' }}
          />
          {milestones.map((m, i) => {
            const isLeft = i % 2 === 0
            const ShapeComponent = shapeMap[shapes[i % shapes.length]]

            return (
              <div
                key={m.year}
                className={`relative flex items-center mb-16 md:mb-24 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-row`}
              >
                <div className={`flex-1 ${isLeft ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} hidden md:block`}>
                  <div
                    className={`inline-block p-5 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                      isDark
                        ? 'bg-white/5 border-white/10 hover:bg-white/10'
                        : 'bg-white/80 border-gray-200 hover:bg-white'
                    }`}
                    style={{ borderLeftColor: isLeft ? m.color : undefined, borderRightColor: !isLeft ? m.color : undefined }}
                  >
                    <span className="text-2xl mb-2 block">{m.icon}</span>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {m.desc}
                    </p>
                  </div>
                </div>

                <div className="flex-shrink-0 relative z-10 flex flex-col items-center">
                  <div
                    className="group cursor-pointer transition-transform duration-300 hover:scale-125"
                  >
                    <ShapeComponent color={m.color} />
                  </div>
                  <span
                    className="mt-2 text-xs font-bold whitespace-nowrap md:hidden"
                    style={{ color: m.color }}
                  >
                    {m.year}
                  </span>
                </div>

                <div className={`flex-1 ${isLeft ? 'md:text-left md:pl-12' : 'md:text-right md:pr-12'} hidden md:block`}>
                  <div className="flex flex-col items-start">
                    <span
                      className="text-sm font-bold tracking-wide"
                      style={{ color: m.color }}
                    >
                      {m.year}
                    </span>
                    <h3 className={`text-lg font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {m.icon} {m.label}
                    </h3>
                  </div>
                </div>

                <div className={`md:hidden ml-6 flex-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{m.icon}</span>
                    <span className="text-sm font-bold" style={{ color: m.color }}>{m.year}</span>
                  </div>
                  <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{m.label}</h3>
                  <p className="text-sm mt-1 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="relative mt-8 md:mt-4 flex justify-center">
          <Link to="/book" className="block group">
            <div className="relative w-full max-w-xs animate-float">
              <div className="absolute -top-4 -left-4 text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ transform: 'rotate(-15deg)' }}>🗺️</div>
              <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-full bg-rainbow flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-purple-500/30 animate-pulse-glow">
                ✦
              </div>
              <div className={`relative overflow-hidden rounded-[2rem] border-2 transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-1 ${
                isDark
                  ? 'border-white/10 bg-white/5 group-hover:shadow-[#9775fa]/30'
                  : 'border-black/10 bg-white/70 group-hover:shadow-[#9775fa]/20'
              } shadow-xl shadow-black/20`}>
                <div
                  className="aspect-[4/5] bg-cover bg-center"
                  style={{ backgroundImage: `url(${import.meta.env.BASE_URL}textures/book-cover.png)` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-rainbow mb-2 font-semibold">The Destination</p>
                  <p className="text-white text-lg font-bold">Memory Book</p>
                  <p className="text-white/70 text-sm mt-1">Every chapter, every laugh, every memory — preserved.</p>
                </div>
              </div>
            </div>
          </Link>
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
