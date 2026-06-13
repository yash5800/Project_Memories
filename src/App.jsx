import React, { Suspense } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home'
import BookPage from './pages/book'
import GamesPage from './pages/games'
import MusicProvider from './components/MusicProvider'
import Preloader from './components/Preloader'

const Loading = () => (
  <div className="min-h-screen bg-gray-950 dark:bg-gray-950 flex items-center justify-center">
    <div className="text-white text-xl">Loading...</div>
  </div>
)

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '')

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter basename={routerBasename}> 
        <Preloader>
          <MusicProvider />
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/book" element={<BookPage />} />
              <Route path="/games" element={<GamesPage />} />
            </Routes>
          </Suspense>
        </Preloader>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
