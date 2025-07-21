import React from 'react'
import StartGroup from './components/StartGroup'
import Branch from './components/Branch'
import Profiles from './components/Profiles'
import Reviews from './components/Reviews'
import Home from './components/Home'


const App = () => {
  return (
    <section>
      <StartGroup />
      <Branch />
      <Profiles />
      <Home />
      <Reviews />
    </section>

  )
}

export default App