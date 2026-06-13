import React, { useEffect, useRef, useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const confessions = [
  { text: 'I once submitted last sem\'s project with just the title changed. Got an A.', emoji: '🤫', color: '#ff6b6b' },
  { text: 'Still don\'t know the difference between TCP and UDP. Don\'t tell sir.', emoji: '🙈', color: '#ffa94d' },
  { text: 'I joined the study group for the snacks. Worth it.', emoji: '🍪', color: '#ffd43b' },
  { text: 'My code works. Please don\'t ask me how.', emoji: '🤷', color: '#69db7c' },
  { text: 'Said "I\'ll start early next time" for the 47th time.', emoji: '🔄', color: '#4dabf7' },
  { text: 'The only thing I consistently attended was the canteen.', emoji: '🍛', color: '#9775fa' },
  { text: 'Got placed because I nodded confidently when they said "REST API".', emoji: '😬', color: '#f06595' },
  { text: 'ChatGPT wrote 60% of my assignments. The other 40%? Also ChatGPT.', emoji: '🤖', color: '#ff6b6b' },
  { text: 'I practiced the "asking doubt" face for 3 years. Never had a doubt.', emoji: '🎭', color: '#ffd43b' },
  { text: 'Sir: "This is easy." Me, sweating:', emoji: '😅', color: '#69db7c' },
  { text: 'Group project contribution: group name.', emoji: '🏷️', color: '#4dabf7' },
  { text: 'Paid 4 years of tuition for the Wi-Fi, honestly.', emoji: '📶', color: '#9775fa' },
  { text: 'That one guy who asked "will this be in the exam" every single class.', emoji: '🙋', color: '#f06595' },
  { text: 'My internship project was just a to-do app. They were impressed.', emoji: '✨', color: '#ff6b6b' },
  { text: 'I still use the same pen I borrowed in first year. Sorry.', emoji: '🖊️', color: '#ffa94d' },
  { text: 'Came to college on a holiday. Sat for 2 hours. No one else came.', emoji: '🧍', color: '#ffd43b' },
]

const Confessions = () => {
  const { isDark } = useTheme()
  const scrollRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      const cardWidth = el.querySelector('div:first-child')?.offsetWidth || 340
      const idx = Math.round(el.scrollLeft / (cardWidth + 32))
      setActiveIndex(Math.min(idx, confessions.length - 1))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      id="confessions"
      className={`relative py-20 px-6 ${
        isDark ? 'bg-[#0f0f1a]' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-0 w-64 h-64 bg-[#f06595]/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/3 left-0 w-64 h-64 bg-[#ffa94d]/10 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className={isDark ? 'text-white' : 'text-gray-800'}>Confessions</span>{' '}
            <span className="text-rainbow">& Quotes</span>
          </h2>
          <p className={`max-w-xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Anonymously relatable. Definitely not about you. Or is it?
          </p>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide px-4 pb-4 snap-x snap-mandatory scroll-smooth"
          >
            {confessions.map((c, i) => {
              const colors = ['#ff6b6b', '#ffa94d', '#ffd43b', '#69db7c', '#4dabf7', '#9775fa', '#f06595']
              const accent = colors[i % colors.length]
              return (
                <div
                  key={i}
                  className="snap-center flex-shrink-0 w-80"
                >
                  <div
                    className={`group relative rounded-2xl p-6 transition-all duration-500 cursor-default ${
                      isDark
                        ? 'bg-white/5 hover:bg-white/[0.07]'
                        : 'bg-white/70 hover:bg-white/90 border border-black/5'
                    }`}
                    style={{
                      boxShadow: `0 0 30px ${accent}10`,
                    }}
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                      style={{ backgroundColor: accent }}
                    />
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{c.emoji}</span>
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
                    </div>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      "{c.text}"
                    </p>
                    <div className={`mt-4 text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                      — Anonymous #{String(i + 1).padStart(2, '0')}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex justify-center items-center gap-2 mt-8">
            {confessions.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  const el = scrollRef.current
                  if (!el) return
                  const card = el.querySelector('div:first-child')
                  if (!card) return
                  const w = card.offsetWidth + 32
                  el.scrollTo({ left: i * w, behavior: 'smooth' })
                }}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? 'w-8 h-2 bg-[#9775fa]'
                    : `w-2 h-2 ${isDark ? 'bg-white/20 hover:bg-white/40' : 'bg-gray-300 hover:bg-gray-400'}`
                }`}
              />
            ))}
          </div>
        </div>

        <p className={`text-center mt-4 text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
          ← Swipe or scroll to see more confessions →
        </p>
      </div>
    </section>
  )
}

export default Confessions
