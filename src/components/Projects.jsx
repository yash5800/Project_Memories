import React, { useEffect, useRef, useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const projectColors = [
  'from-[#ff6b6b] to-[#ee5a24]',
  'from-[#f06595] to-[#e84393]',
  'from-[#ffd43b] to-[#f59f00]',
  'from-[#69db7c] to-[#2b8a3e]',
  'from-[#4dabf7] to-[#1c7ed6]',
  'from-[#9775fa] to-[#7048e8]',
  'from-[#ffa94d] to-[#fd7e14]',
  'from-[#20c997] to-[#099268]',
]

const Projects = () => {
  const { isDark } = useTheme()
  const [projects, setProjects] = useState([])
  const [profiles, setProfiles] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const closeTimerRef = useRef(null)
  const baseUrl = import.meta.env.BASE_URL || '/'

  useEffect(() => {
    let cancelled = false
    const fetchJson = (url) =>
      fetch(`${url}?t=${Date.now()}`)
        .then(res => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`)
          return res.json()
        })

    fetchJson(`${baseUrl}projects.json`)
      .then(data => { if (!cancelled) setProjects(data) })
      .catch(err => console.error('Error loading projects:', err))

    fetchJson(`${baseUrl}profilesDetails.json`)
      .then(data => { if (!cancelled) setProfiles(data) })
      .catch(err => console.error('Error loading profiles:', err))

    return () => { cancelled = true }
  }, [baseUrl])

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!selectedProject) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const animationFrame = window.requestAnimationFrame(() => setIsModalVisible(true))

    return () => {
      window.cancelAnimationFrame(animationFrame)
      document.body.style.overflow = previousOverflow
    }
  }, [selectedProject])

  useEffect(() => {
    if (!selectedProject) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleCloseProjectDetails()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedProject])

  const normalizeGithubUrl = (url) => {
    if (!url || !url.trim()) {
      return ''
    }
    const normalized = url.trim().replace(/^https:\/(?!\/)/, 'https://')
    return /^https?:\/\//i.test(normalized) ? normalized : ''
  }

  const getProfileByRollno = (rollno) => {
    return profiles.find(p => p.rollno === rollno)
  }

  const getProjectBanner = (project) => {
    const banner = project.banner || project.bannerImage || ''
    if (!banner) {
      return ''
    }

    return `${baseUrl}projectBanners/${banner}`
  }

  const openProjectDetails = (project) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }

    setSelectedProject(project)
  }

  const handleCloseProjectDetails = () => {
    setIsModalVisible(false)

    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
    }

    closeTimerRef.current = window.setTimeout(() => {
      setSelectedProject(null)
      closeTimerRef.current = null
    }, 220)
  }

  const handleCardKeyDown = (event, project) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openProjectDetails(project)
    }
  }

  const filteredProjects = projects.filter((project) => {
    const normalizedSearch = searchTerm.trim().toLowerCase()
    const title = (project.title || '').toLowerCase()
    const description = (project.description || '').toLowerCase()
    const matchesSearch =
      normalizedSearch.length === 0 ||
      title.includes(normalizedSearch) ||
      description.includes(normalizedSearch)

    return matchesSearch
  })

  return (
    <section
      id="projects"
      className={`relative min-h-screen py-20 px-6 ${
        isDark ? 'bg-[#0f0f1a]' : 'bg-white'
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4dabf7]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#9775fa]/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-rainbow">Our Projects</span>
          </h2>
          <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Innovative solutions built by our talented students
          </p>

          <div className="max-w-4xl mx-auto mt-8 space-y-4">
            <div className={`relative rounded-2xl border focus-within:border-[#9775fa] transition-all duration-300 ${
              isDark ? 'border-white/10 bg-gray-900/80' : 'border-gray-200 bg-white/90'
            } backdrop-blur-sm`}>
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search projects by title, description, or domain"
                className={`w-full rounded-2xl py-3 pl-12 pr-4 outline-none ${isDark ? 'text-white placeholder:text-gray-500' : 'text-gray-900 placeholder:text-gray-400'}`}
              />
            </div>
          </div>
        </div>

        <div className="mb-6 text-center">
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Showing {filteredProjects.length} of {projects.length} projects
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => {
            const githubUrl = normalizeGithubUrl(project.github)
            const bannerUrl = getProjectBanner(project)
            const hasBanner = Boolean(bannerUrl)

            return (
            <article
              key={project.title || index}
              role="button"
              tabIndex={0}
              onClick={() => openProjectDetails(project)}
              onKeyDown={(event) => handleCardKeyDown(event, project)}
              className="group relative h-full cursor-pointer overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 shadow-xl shadow-black/20 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9775fa] animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-52 overflow-hidden">
                {hasBanner ? (
                  <img
                    src={bannerUrl}
                    alt={`${project.title} banner`}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className={`flex h-full w-full items-end bg-gradient-to-br ${projectColors[index % projectColors.length]} p-5`}>
                    <div className="max-w-[16rem] rounded-2xl border border-white/15 bg-black/20 px-3 py-2 text-xs font-medium uppercase tracking-[0.3em] text-white/80 backdrop-blur-sm">
                      Banner not provided
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/25 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/90 backdrop-blur-sm bg-rainbow border-0">
                  Project
                </div>
              </div>

              <div className={`flex flex-col p-6 ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-sm`}>
                <h2 className={`text-xl md:text-2xl font-bold leading-tight text-balance break-words line-clamp-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {project.title}
                </h2>
                <p className={`mt-4 text-sm leading-6 line-clamp-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {project.description}
                </p>

                {project.team && project.team.length > 0 && (
                  <div className="mt-5 flex items-center gap-2">
                    <span className={`text-xs font-medium ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Team:</span>
                    <div className="flex -space-x-2">
                      {project.team.slice(0, 4).map((rollno, idx) => {
                        const member = getProfileByRollno(rollno)
                        const hasPhoto = member?.profileUrl

                        return (
                          <div key={rollno} className="relative group/member">
                            {hasPhoto ? (
                              <img
                                src={`${baseUrl}classmeats/${member.profileUrl}`}
                                alt={member.name}
                                className="h-9 w-9 rounded-full border-2 border-white object-cover shadow-md shadow-black/20 dark:border-gray-900"
                              />
                            ) : (
                              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-rainbow text-xs font-bold text-white shadow-md shadow-black/20 dark:border-gray-900">
                                {member?.name?.charAt(0) || '?'}
                              </div>
                            )}
                            <span className={`absolute -top-7 left-1/2 -translate-x-1/2 rounded px-2 py-1 text-xs whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover/member:opacity-100 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow-lg z-10`}>
                              {idx === 0 ? '👑 ' : ''}{member?.name?.toLowerCase() || rollno}
                            </span>
                            <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-white bg-rainbow text-[8px] font-bold text-white dark:border-gray-900">
                              {idx + 1}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <div className="flex flex-wrap items-center justify-end gap-3">
                    {githubUrl ? (
                      <a
                        href={githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-[#9775fa] transition-colors hover:text-[#f06595]"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                        View repo
                      </a>
                    ) : (
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${isDark ? 'bg-gray-800 text-gray-500' : 'bg-gray-100 text-gray-400'}`}>
                        Repo unavailable
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition-colors hover:text-[#ffd43b]"
                    onClick={(event) => {
                      event.stopPropagation()
                      openProjectDetails(project)
                    }}
                  >
                    View full details
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </article>
            )
          })}
        </div>

        {filteredProjects.length === 0 && (
          <p className={`text-center mt-10 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            No projects match your current filters.
          </p>
        )}
      </div>

      {selectedProject && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center px-4 py-6 transition-all duration-300 ${
            isModalVisible ? 'bg-black/85 opacity-100 backdrop-blur-md' : 'bg-black/0 opacity-0 backdrop-blur-none'
          }`}
          onClick={handleCloseProjectDetails}
        >
          <div
            className={`relative w-full max-w-5xl min-h-0 max-h-[90vh] overflow-y-auto lg:overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-black/40 transition-all duration-300 ${
              isModalVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-6 scale-[0.98] opacity-0'
            } ${isDark ? 'bg-gray-950' : 'bg-white'}`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="grid min-h-0 lg:h-[90vh] lg:grid-cols-[1.15fr_0.85fr]">
              <div className="relative flex min-h-[240px] items-center justify-center overflow-hidden bg-[#070b14] p-4 lg:min-h-full">
                {getProjectBanner(selectedProject) ? (
                  <img
                    src={getProjectBanner(selectedProject)}
                    alt={`${selectedProject.title} banner`}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className={`flex h-full w-full min-h-[240px] items-end bg-gradient-to-br ${projectColors[0]} p-6`}>
                    <div className="max-w-md rounded-3xl border border-white/15 bg-black/20 px-4 py-3 text-sm font-medium tracking-wide text-white/90 backdrop-blur-sm">
                      No banner provided for this project.
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <button
                  type="button"
                  aria-label="Close project details"
                  className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/30 text-2xl text-white backdrop-blur-md transition-transform duration-300 hover:scale-110 hover:bg-[#ff6b6b]/60"
                  onClick={handleCloseProjectDetails}
                >
                  ×
                </button>
              </div>

              <div className={`custom-scroll flex min-h-0 flex-col gap-6 p-6 md:p-8 lg:overflow-y-auto ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
                <span className="inline-flex w-fit rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-white bg-rainbow">
                  Project Details
                </span>

                <h4 className={`text-2xl font-bold leading-snug break-words ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {selectedProject.title}
                </h4>

                <div>
                  <h4 className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-gray-400">
                    About the project
                  </h4>
                  <p className={`text-base leading-7 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {selectedProject.description}
                  </p>
                </div>

                {selectedProject.team && selectedProject.team.length > 0 && (
                  <div>
                    <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-gray-400">
                      Team
                    </h4>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {selectedProject.team.map((rollno, idx) => {
                        const member = getProfileByRollno(rollno)
                        const hasPhoto = member?.profileUrl

                        return (
                          <div key={rollno} className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${isDark ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-white'}`}>
                            {hasPhoto ? (
                              <img
                                src={`${baseUrl}classmeats/${member.profileUrl}`}
                                alt={member.name}
                                className="h-12 w-12 rounded-full object-cover"
                              />
                            ) : (
                              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rainbow text-sm font-bold text-white">
                                {member?.name?.charAt(0) || '?'}
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold capitalize break-words">
                                {member?.name?.toLowerCase() || rollno}
                              </p>
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                Member {idx + 1} • {rollno}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                <div className="grid gap-3">
                  <div className={`rounded-2xl border px-4 py-4 ${isDark ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-white'}`}>
                    <p className="text-xs uppercase tracking-[0.24em] text-gray-400">Repository</p>
                    <p className="mt-2 text-sm font-semibold">{normalizeGithubUrl(selectedProject.github) ? 'Available' : 'Not shared'}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {normalizeGithubUrl(selectedProject.github) ? (
                    <a
                      href={normalizeGithubUrl(selectedProject.github)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-rainbow px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-transform duration-300 hover:-translate-y-0.5"
                      onClick={(event) => event.stopPropagation()}
                    >
                      Open repository
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                  <button
                    type="button"
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 ${isDark ? 'bg-white/10 text-white hover:bg-white/15' : 'bg-gray-900 text-white hover:bg-gray-800'}`}
                    onClick={handleCloseProjectDetails}
                  >
                    Close details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects
