import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import Music from './Music'

const NavBar = () => {
  const { isDark, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Journey', href: '#branch' },
    { name: 'Memories', to: '/book' },
    { name: 'Classmates', href: '#profiles' },
    { name: 'Projects', href: '#projects' },
    { name: 'Faculty', href: '#reviews' },
  ]

  const handleSectionNav = (event, href) => {
    if (!href || !href.startsWith('#')) {
      return
    }
    event.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsMenuOpen(false)
    }
  }

  const themeButtonStyles = `p-2 rounded-full transition-all duration-300 ${
    isDark
      ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400'
      : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
  }`

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${ 
          isDark
              ? 'bg-[#0f0f1a]/50 backdrop-blur-md shadow-lg shadow-black/20'
              : 'bg-white/50 backdrop-blur-md shadow-lg shadow-black/10'
        } ${isDark ? 'text-white' : 'text-black'}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
          <a href="#home" className="group" onClick={(event) => handleSectionNav(event, '#home')}>
            <h1 className="text-2xl font-bold tracking-wider relative">
              <span className="relative z-10">Memories</span>
              <span className="absolute inset-0 bg-rainbow blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></span>
            </h1>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.to ? (
                <Link
                  key={link.name}
                  to={link.to}
                  className="relative text-sm font-medium transition-colors duration-300 group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rainbow group-hover:w-full transition-all duration-300"></span>
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative text-sm font-medium transition-colors duration-300 group"
                  onClick={(event) => handleSectionNav(event, link.href)}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rainbow group-hover:w-full transition-all duration-300"></span>
                </a>
              )
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Music />
            <button
              onClick={toggleTheme}
              className={themeButtonStyles}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            <button
              className={`md:hidden ${themeButtonStyles}`}
              aria-label="Toggle menu"
              onClick={() => setIsMenuOpen((value) => !value)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className={`md:hidden px-6 pb-4 ${isDark ? 'bg-[#0f0f1a]/95' : 'bg-white/95'} backdrop-blur-md`}>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                link.to ? (
                  <Link
                    key={link.name}
                    to={link.to}
                    className={`rounded-xl px-4 py-3 text-sm font-semibold ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`rounded-xl px-4 py-3 text-sm font-semibold ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
                    onClick={(event) => handleSectionNav(event, link.href)}
                  >
                    {link.name}
                  </a>
                )
              ))}
            </div>
          </div>
        )}
      </nav>

      <div className="fixed top-0 left-0 right-0 z-[60] h-0.5">
        <div
          className="h-full bg-rainbow transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </>
  )
}

export default NavBar
