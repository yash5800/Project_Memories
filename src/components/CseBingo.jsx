import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const items = [
  'Fell asleep in 8AM class',
  'Said "chal lunch pe chalte hain"',
  'Asked sir if there\'s a holiday',
  'Submitted assignment at 11:59 PM',
  'Forgot lab record at home',
  'Copied code from friend',
  'Sat on last bench intentionally',
  'Ate vada pav in library',
  'Said "network issue" for late submission',
  'Wore half-uniform on purpose',
  'Googled during online exam',
  'Group project: did nothing',
  'Made a fake medical certificate',
  'Called sir "bro" by accident',
  'Lost the lab file completely',
  'Asked "will this come in exam?"',
  'Came to wrong room for exam',
  'Slept through online class with mic on',
  'Charged phone in classroom',
  'Pretended to understand DSA',
  'Got caught passing chits',
  'Said "I studied" but didn\'t',
  'Left phone on silent, mom called 5 times',
  'Ate during lecture (caught on cam)',
  'Zoned out for entire lecture',
]

const CseBingo = () => {
  const { isDark } = useTheme()
  const [marked, setMarked] = useState({})
  const [showWin, setShowWin] = useState(false)
  const [shuffled] = useState(() => [...items].sort(() => Math.random() - 0.5).slice(0, 24))

  const board = [...shuffled.slice(0, 12), 'FREE SPACE', ...shuffled.slice(12, 24)]

  const toggle = (i) => {
    if (i === 12) return
    const next = { ...marked, [i]: !marked[i] }
    setMarked(next)
    checkWin(next)
  }

  const checkWin = (marks) => {
    const winPatterns = []
    for (let r = 0; r < 5; r++) winPatterns.push([r * 5, r * 5 + 1, r * 5 + 2, r * 5 + 3, r * 5 + 4])
    for (let c = 0; c < 5; c++) winPatterns.push([c, c + 5, c + 10, c + 15, c + 20])
    winPatterns.push([0, 6, 12, 18, 24], [4, 8, 12, 16, 20])

    for (const pattern of winPatterns) {
      if (pattern.every((i) => marks[i])) {
        setShowWin(true)
        setTimeout(() => setShowWin(false), 3000)
        return
      }
    }
  }

  return (
    <section
      id="cse-bingo"
      className={`relative py-20 px-6 ${
        isDark ? 'bg-[#0f0f1a]' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#69db7c]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#ffd43b]/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-rainbow">CSE</span>{' '}
          <span className={isDark ? 'text-white' : 'text-gray-800'}>Bingo</span>
        </h2>
        <p className={`mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Tap the ones you've experienced. Bingo = you lived college right.
        </p>

        {showWin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-bounce-in">
            <div className="text-center p-10 rounded-3xl bg-gradient-to-br from-[#9775fa] via-[#ff6b6b] to-[#ffd43b] p-[3px]">
              <div className={`rounded-3xl p-10 ${isDark ? 'bg-[#0f0f1a]' : 'bg-white'}`}>
                <span className="text-6xl">🎉</span>
                <h3 className={`text-3xl font-bold mt-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>BINGO!</h3>
                <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>You definitely went to college.</p>
                <button
                  onClick={() => setShowWin(false)}
                  className="mt-6 px-6 py-2 bg-rainbow rounded-full text-white font-semibold"
                >
                  Keep Playing
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          {board.map((text, i) => {
            const isFree = i === 12
            const isMarked = marked[i]
            return (
              <button
                key={i}
                onClick={() => toggle(i)}
                className={`relative aspect-square rounded-lg text-[10px] sm:text-xs leading-tight font-medium p-1 transition-all duration-200 ${
                  isFree
                    ? 'bg-rainbow text-white cursor-default'
                    : isMarked
                      ? 'bg-[#9775fa]/20 text-[#9775fa] border-2 border-[#9775fa]/40 scale-[0.95]'
                      : isDark
                        ? 'bg-white/5 text-gray-400 hover:bg-white/10 border border-transparent'
                        : 'bg-white/60 text-gray-600 hover:bg-white/90 border border-gray-200'
                }`}
              >
                <span className="block leading-[1.1]">{text}</span>
              </button>
            )
          })}
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={() => { setMarked({}); setShowWin(false) }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              isDark ? 'bg-white/10 text-white hover:bg-white/15' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Reset
          </button>
          <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            {Object.values(marked).filter(Boolean).length} / 24 marked
          </span>
        </div>
      </div>
    </section>
  )
}

export default CseBingo
