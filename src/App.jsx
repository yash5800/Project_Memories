import React, { Suspense } from 'react'
import { ThemeProvider } from './context/ThemeContext'

const NavBar = React.lazy(() => import('./components/NavBar'))
const StartGroup = React.lazy(() => import('./components/StartGroup'))
const Branch = React.lazy(() => import('./components/Branch'))
const Profiles = React.lazy(() => import('./components/Profiles'))
const Projects = React.lazy(() => import('./components/Projects'))
const Reviews = React.lazy(() => import('./components/Reviews'))

const Loading = () => (
  <div className="min-h-screen bg-gray-950 flex items-center justify-center">
    <div className="text-white text-xl">Loading...</div>
  </div>
)

const App = () => {
  return (
    <ThemeProvider>
      <Suspense fallback={<Loading />}>
        <main className="min-h-screen bg-gray-950">
          <NavBar />
          <StartGroup />
          <Branch />
          <Profiles />
          <Projects />
          <Reviews />
          
          <footer className="py-8 text-center text-gray-500 text-sm bg-gray-950">
            <p>© 2024 22 Batch CSE • Made with ❤️</p>
          </footer>
        </main>
      </Suspense>
    </ThemeProvider>
  )
}

export default App
