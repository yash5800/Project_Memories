import React from 'react'

const StartGroup = () => {
  return (
    <div
      id="home"
      className="relative h-[85vh] min-h-[600px] w-full overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('StartGroup.jpg')" }}
      />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-pink-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider mb-6">
          <span className="inline-block bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            22
          </span>
          <span className="inline-block text-white mx-4">BATCH</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-8">
          Computer Science & Engineering
          <br />
          <span className="text-violet-400">Memories that last forever</span>
        </p>

        <div className="flex gap-4">
          <a
            href="#book"
            className="px-8 py-3 bg-gradient-to-r from-violet-600 to-pink-600 rounded-full text-white font-semibold hover:scale-105 transition-transform duration-300 shadow-lg shadow-violet-500/30"
          >
            Explore Memories
          </a>
          <a
            href="#profiles"
            className="px-8 py-3 border-2 border-white/30 rounded-full text-white font-semibold hover:bg-white/10 transition-all duration-300"
          >
            Meet Classmates
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-sm text-gray-400">Scroll</span>
        <svg
          className="w-6 h-6 text-violet-400"
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
