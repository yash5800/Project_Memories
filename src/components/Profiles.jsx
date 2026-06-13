import React, { useEffect, useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const borderColors = [
  'border-[#ff6b6b]', 'border-[#ffa94d]', 'border-[#ffd43b]',
  'border-[#69db7c]', 'border-[#4dabf7]', 'border-[#9775fa]', 'border-[#f06595]',
]

const Profiles = () => {
  const [profileDetails, setProfileDetails] = useState([])
  const [selectedImg, setSelectedImg] = useState(null)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const { isDark } = useTheme()
  const baseUrl = import.meta.env.BASE_URL || '/'

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    let cancelled = false
    const baseUrl = import.meta.env.BASE_URL || '/'
    fetch(`${baseUrl}profilesDetails.json?t=${Date.now()}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(data => {
        if (!cancelled) setProfileDetails(data)
      })
      .catch(err => console.error('Error loading profiles:', err))
    return () => { cancelled = true }
  }, [])

  const filteredProfiles = profileDetails.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollno.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <section
      id="profiles"
      className={`relative min-h-screen py-20 px-6 ${
        isDark ? 'bg-[#0f0f1a]' : 'bg-gray-100'
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-[#9775fa]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-[#f06595]/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-rainbow">Our Classmates</span>
          </h2>
          <p className={`mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {profileDetails.length} students
          </p>

          <div className="max-w-md mx-auto">
            <div className={`relative rounded-full ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg focus-within:ring-2 focus-within:ring-[#9775fa] transition-all duration-300`}>
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by name or roll number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full py-3 pl-12 pr-4 rounded-full outline-none ${
                  isDark ? 'bg-gray-800 text-white placeholder-gray-500' : 'bg-white text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredProfiles.map((student, index) => (
            <ProfileCard
              key={student.rollno}
              student={student}
              onView={() => setSelectedImg(`${baseUrl}classmeats/${student.profileUrl}`)}
              isDark={isDark}
              borderColor={borderColors[index % borderColors.length]}
              index={index}
            />
          ))}
        </div>

        {filteredProfiles.length === 0 && (
          <p className={`text-center py-12 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            No students found matching "{searchTerm}"
          </p>
        )}
      </div>

      {selectedImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setSelectedImg(null)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white text-2xl hover:bg-white/20 transition-colors"
            onClick={() => setSelectedImg(null)}
          >
            ×
          </button>
          <img
            src={selectedImg}
            alt="Profile"
            className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {showScrollTop && (
        <button
          className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-rainbow text-white flex items-center justify-center shadow-lg shadow-purple-500/30 hover:scale-110 transition-transform duration-300 z-40"
          onClick={scrollToTop}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      )}
    </section>
  )
}

const ProfileCard = ({ student, onView, isDark, borderColor, index }) => {
  const { name, rollno, insta, linkedin, profileUrl, github } = student
  const hasPhoto = profileUrl && profileUrl.trim() !== ''
  const baseUrl = import.meta.env.BASE_URL || '/'
  const imgSrc = hasPhoto ? `${baseUrl}classmeats/${profileUrl}` : null

  function capitalizeNames(str) {
    const words = str.split(' ')
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    return capitalizedWords.join(' ')
  }

  return (
    <div
      className={`group relative bg-white/5 dark:bg-gray-800/50 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl animate-bounce-in border-2 ${borderColor}`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div
        className="aspect-square overflow-hidden cursor-pointer"
        onClick={hasPhoto ? onView : undefined}
      >
        {hasPhoto ? (
          <img
            src={imgSrc}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
            <span className={`text-5xl font-bold ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
              {name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className={`absolute bottom-0 left-0 right-0 p-3 ${isDark ? 'bg-gradient-to-t from-gray-900' : 'bg-gradient-to-t from-white'} to-transparent`}>
        <h3 className={`font-semibold text-sm truncate capitalize ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {capitalizeNames(name)}
        </h3>
        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {rollno}
        </p>
      </div>

      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {insta && (
          <a
            href={insta}
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-full bg-gradient-to-br from-[#f06595] to-[#ff6b6b] flex items-center justify-center hover:scale-110 transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        )}
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4dabf7] to-[#228be6] flex items-center justify-center hover:scale-110 transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        )}
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center hover:scale-110 transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
        )}
      </div>
    </div>
  )
}

export default Profiles
