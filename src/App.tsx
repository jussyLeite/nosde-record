import { useState } from 'react'
import Navbar from './components/NavBar'
import Hero from './components/Hero'
import MusicSection from './components/MusicSection'
import ArtistsSection from './components/ArtistsSection'
import NewsSidebar from './components/NewsSidebar'
import DemoForm from './components/DemoForm'

function App() {

  return<div>
      <Navbar />
      <Hero />

      <div className="container main-layout">
        <div>
          <MusicSection />
          <ArtistsSection />
        </div>
        <NewsSidebar />
      </div>

      <DemoForm />
    </div>
}

export default App
