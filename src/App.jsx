import React, { Suspense } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home'
import BookPage from './pages/book'
import MusicProvider from './components/MusicProvider'

const Loading = () => (
  <div className="min-h-screen bg-gray-950 flex items-center justify-center">
    <div className="text-white text-xl">Loading...</div>
  </div>
)

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '')

const App = () => {
  return (
    <ThemeProvider>
      <MusicProvider />
      <Suspense fallback={<Loading />}>
        <BrowserRouter basename={routerBasename}> 
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/book" element={<BookPage />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </ThemeProvider>
  )
}

export default App
