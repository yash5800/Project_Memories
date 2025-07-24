import React from 'react'
import StartGroup from './components/StartGroup'
import Branch from './components/Branch'
import Profiles from './components/Profiles'
import Reviews from './components/Reviews'
import Home from './components/Home'
import NavBar from './components/NavBar'

const App = () => {
  return (
    <section>
      <NavBar />
      <StartGroup />
      <Branch />
      <Profiles />
      <Home />
      <Reviews />
    </section>

  )
}

export default App