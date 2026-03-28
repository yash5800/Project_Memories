import React from 'react'
import Book from './Book'
import { useTheme } from '../context/ThemeContext'

const Branch = () => {
  const { isDark } = useTheme()

  return (
    <section
      id="branch"
      className={`relative min-h-screen py-20 px-6 ${
        isDark ? 'bg-gray-950' : 'bg-gray-100'
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Our Journey
          </span>
        </h2>
        <p className={`text-center mb-12 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Flip through the pages of our memories
        </p>

        <Book />
      </div>
    </section>
  )
}

export default Branch
