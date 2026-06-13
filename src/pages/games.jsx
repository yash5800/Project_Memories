import React from 'react'
import { Link } from 'react-router-dom'
import CseBingo from '../components/CseBingo'
import MemoryGame from '../components/MemoryGame'

const GamesPage = () => {
  const year = new Date().getFullYear()

  return (
    <>
      <main className="min-h-screen">
        <div className="px-6 pt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#9775fa] hover:text-[#b197fc] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
        <CseBingo />
        <MemoryGame />
        <footer className="py-8 text-center text-gray-500 text-sm">
          <p>© {year} 22 Batch CSE • Built to preserve every memory</p>
        </footer>
      </main>
    </>
  )
}

export default GamesPage
