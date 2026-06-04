import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const pool = ['🐶', '🐱', '🐸', '🦊', '🐼', '🐨', '🦁', '🐮', '🐷', '🐵', '🐰', '🦄', '🐙', '🦋', '🐝', '🐞', '🐳', '🦖', '🐧', '🦉', '🐺', '🐲', '🐯', '🦝']

const shuffle = (arr) => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const buildCards = () => {
  const picked = shuffle(pool).slice(0, 8)
  const pairs = shuffle([...picked, ...picked])
  return pairs.map((emoji, i) => ({ id: i, emoji }))
}

const MemoryGame = () => {
  const { isDark } = useTheme()
  const [cards, setCards] = useState(buildCards)
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)
  const [won, setWon] = useState(false)

  const handleFlip = (id) => {
    if (flipped.length === 2 || flipped.includes(id) || matched.includes(id)) return

    const next = [...flipped, id]
    setFlipped(next)

    if (next.length === 2) {
      setMoves((m) => m + 1)
      const [a, b] = next
      if (cards[a].emoji === cards[b].emoji) {
        const newMatched = [...matched, a, b]
        setMatched(newMatched)
        setFlipped([])
        if (newMatched.length === cards.length) setWon(true)
      } else {
        setTimeout(() => setFlipped([]), 800)
      }
    }
  }

  const reset = () => {
    setCards(buildCards())
    setFlipped([])
    setMatched([])
    setMoves(0)
    setWon(false)
  }

  return (
    <section
      id="memory-game"
      className={`relative py-20 px-6 ${
        isDark ? 'bg-[#0f0f1a]' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-[#9775fa]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-[#f06595]/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-lg mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className={isDark ? 'text-white' : 'text-gray-800'}>Spot the</span>{' '}
          <span className="text-rainbow">Batchmate</span>
        </h2>
        <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Match the pairs — like finding friends in a crowded corridor.
        </p>

        <div className="flex items-center justify-center gap-6 mb-6">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
            isDark ? 'bg-white/5 text-gray-300' : 'bg-white/70 text-gray-700 border border-black/5'
          }`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Moves: {moves}
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
            isDark ? 'bg-white/5 text-gray-300' : 'bg-white/70 text-gray-700 border border-black/5'
          }`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {matched.length / 2} / 8
          </div>
          <button
            onClick={reset}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              isDark ? 'bg-white/10 text-white hover:bg-white/15' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            ↻ New
          </button>
        </div>

        <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto">
          {cards.map((card) => {
            const isFlipped = flipped.includes(card.id) || matched.includes(card.id)
            return (
              <button
                key={card.id}
                onClick={() => handleFlip(card.id)}
                disabled={matched.includes(card.id)}
                className={`aspect-square rounded-2xl text-3xl flex items-center justify-center transition-all duration-300 ${
                  isFlipped
                    ? 'rotate-y-0'
                    : 'rotate-y-180'
                } ${
                  matched.includes(card.id)
                    ? isDark ? 'bg-green-900/30' : 'bg-green-100'
                    : isFlipped
                      ? isDark ? 'bg-white/10' : 'bg-white/80 border border-black/5'
                      : isDark
                        ? 'bg-white/10 hover:bg-white/15 cursor-pointer'
                        : 'bg-gray-200 hover:bg-gray-300 cursor-pointer'
                }`}
                style={{
                  transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <span style={{ opacity: isFlipped ? 1 : 0, transition: 'opacity 0.2s' }}>
                  {isFlipped ? card.emoji : '?'}
                </span>
              </button>
            )
          })}
        </div>

        {won && (
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-[#9775fa]/20 to-[#ff6b6b]/20 backdrop-blur-sm border border-[#9775fa]/20">
            <span className="text-4xl">🎉</span>
            <h3 className={`text-2xl font-bold mt-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>You did it!</h3>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Found all batchmates in {moves} moves. Now go find them IRL.
            </p>
            <button
              onClick={reset}
              className="mt-4 px-6 py-2 bg-rainbow rounded-full text-white font-semibold hover:scale-105 transition-transform"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default MemoryGame
