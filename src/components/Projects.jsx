import React, { useEffect, useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const Projects = () => {
  const { isDark } = useTheme()
  const [projects, setProjects] = useState([])
  const [profiles, setProfiles] = useState([])
  const baseUrl = import.meta.env.BASE_URL || '/'

  useEffect(() => {
    fetch(`${baseUrl}projects.json`)
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error('Error loading projects:', err))

    fetch(`${baseUrl}profilesDetails.json`)
      .then(res => res.json())
      .then(data => setProfiles(data))
      .catch(err => console.error('Error loading profiles:', err))
  }, [])

  const getProfileByRollno = (rollno) => {
    return profiles.find(p => p.rollno === rollno)
  }

  const projectColors = [
    'from-violet-500 to-purple-600',
    'from-pink-500 to-rose-600',
    'from-cyan-500 to-blue-600',
    'from-amber-500 to-orange-600',
    'from-emerald-500 to-teal-600',
  ]

  return (
    <section
      id="projects"
      className={`relative min-h-screen py-20 px-6 ${
        isDark ? 'bg-gray-950' : 'bg-white'
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Our Projects
            </span>
          </h2>
          <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Innovative solutions built by our talented students
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <article
              key={index}
              className="project-card group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${projectColors[index % projectColors.length]} opacity-90`} />
                <img
                  src={project.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800'}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              <div className={`absolute bottom-0 left-0 right-0 p-6 ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-sm`}>
                <h2 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {project.title}
                </h2>
                <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {project.description}
                </p>

                {project.team && project.team.length > 0 && (
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Team:</span>
                    <div className="flex -space-x-2">
                      {project.team.map((rollno, idx) => {
                        const member = getProfileByRollno(rollno)
                        const hasPhoto = member?.profileUrl
                        return (
                          <div
                            key={rollno}
                            className="relative group/member"
                          >
                            {hasPhoto ? (
                              <img
                                src={`${baseUrl}classmeats/${member.profileUrl}`}
                                alt={member.name}
                                className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 object-cover"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                                {member?.name?.charAt(0) || '?'}
                              </div>
                            )}
                            <span className={`absolute -top-6 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover/member:opacity-100 transition-opacity ${
                              isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                            } shadow-lg z-10`}>
                              {idx === 0 ? '👑 ' : ''}{member?.name?.toLowerCase() || rollno}
                            </span>
                            <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 text-white text-[8px] font-bold flex items-center justify-center border border-white dark:border-gray-900">
                              {idx + 1}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {project.profession || 'CSE Project'}
                  </span>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-violet-500 hover:text-violet-400 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      View
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
