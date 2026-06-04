import React from 'react'
import StartGroup from '../components/StartGroup'
import Branch from '../components/Branch'
import Profiles from '../components/Profiles'
import Projects from '../components/Projects'
import Reviews from '../components/Reviews'
import NavBar from '../components/NavBar'

const HomePage = () => {
  const year = new Date().getFullYear()

  return (
    <>
      <main className="min-h-screen bg-gray-950">
        <NavBar />  
        <StartGroup />
        <Branch />
        <Profiles />
        <Projects />
        <Reviews />
        
        <footer className="py-8 text-center text-gray-500 text-sm bg-gray-950">
          <p>© {year} 22 Batch CSE • Built to preserve every memory</p>
        </footer>
      </main>
    </>
  )
}

export default HomePage
