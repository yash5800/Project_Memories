import React from 'react'
import { Link } from 'react-router-dom'

const StartGroup = () => {
  return (
    <div
      id="home"
      className="relative h-screen min-h-[600px] w-full overflow-hidden"
    >
      <Link to="/book">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${import.meta.env.BASE_URL}StartGroup.jpg)` }}
        />
      </Link>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

      <div className="absolute top-20 left-[15%] w-8 h-8 rounded-full bg-[#ff6b6b]/40 blur-[2px] animate-float-around" style={{ animationDelay: '0s', animationDuration: '7s' }} />
      <div className="absolute top-32 right-[20%] w-6 h-6 rounded-full bg-[#ffd43b]/40 blur-[2px] animate-float-around" style={{ animationDelay: '1s', animationDuration: '9s' }} />
      <div className="absolute top-48 left-[25%] w-10 h-10 rounded-full bg-[#69db7c]/30 blur-[2px] animate-float-around" style={{ animationDelay: '2s', animationDuration: '8s' }} />
      <div className="absolute top-64 right-[15%] w-7 h-7 rounded-full bg-[#4dabf7]/40 blur-[2px] animate-float-around" style={{ animationDelay: '0.5s', animationDuration: '10s' }} />
      <div className="absolute bottom-40 left-[10%] w-9 h-9 rounded-full bg-[#9775fa]/40 blur-[2px] animate-float-around" style={{ animationDelay: '1.5s', animationDuration: '7.5s' }} />
      <div className="absolute bottom-60 right-[25%] w-5 h-5 rounded-full bg-[#f06595]/40 blur-[2px] animate-float-around" style={{ animationDelay: '3s', animationDuration: '8.5s' }} />

      <div className="absolute top-1/3 left-[8%] w-3 h-3 bg-white/20 rounded-full animate-sparkle" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-1/2 right-[10%] w-2 h-2 bg-white/20 rounded-full animate-sparkle" style={{ animationDelay: '1.5s' }} />
      <div className="absolute bottom-1/3 left-[30%] w-3 h-3 bg-white/20 rounded-full animate-sparkle" style={{ animationDelay: '2.5s' }} />

      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
        <Link to="/book">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider mb-6 animate-slide-up">
            <span className="inline-block text-rainbow bg-clip-text">
              22
            </span>
            <span className="inline-block text-white mx-4">BATCH</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-8 animate-slide-up-delayed">
            Computer Science & Engineering
            <br />
            <span className="text-rainbow">Memories that last forever</span>
          </p>
        </Link>

        <div className="flex flex-wrap justify-center gap-4 animate-bounce-delayed">
          <Link
            to="/book"
            className="px-8 py-3 bg-rainbow rounded-full text-white font-semibold hover:scale-105 transition-transform duration-300 shadow-lg shadow-violet-500/30 animate-pulse-glow"
          >
            Explore Memories
          </Link>
          <a
            href="#profiles"
            className="px-8 py-3 border-2 border-white/30 rounded-full text-white font-semibold hover:bg-white/10 transition-all duration-300 hover:border-[#ffa94d] hover:shadow-lg hover:shadow-[#ffa94d]/20"
          >
            Meet Classmates
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-sm text-gray-400">Scroll</span>
        <svg
          className="w-6 h-6 text-rainbow"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  )
}

export default StartGroup
