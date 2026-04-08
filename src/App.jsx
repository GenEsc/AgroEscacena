import { useState, useCallback } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import PlantIdentifier from './components/PlantIdentifier'
import Contact from './components/Contact'
import Footer from './components/Footer'
import SplashScreen from './components/SplashScreen'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  const handleSplashFinished = useCallback(() => {
    setShowSplash(false)
  }, [])

  return (
    <>
      {showSplash && <SplashScreen onFinished={handleSplashFinished} />}
      {!showSplash && <Header />}
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <PlantIdentifier />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
