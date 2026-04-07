import { useScrollReveal } from './hooks/useScrollReveal'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import PlantIdentifier from './components/PlantIdentifier'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  useScrollReveal()

  return (
    <>
      <Header />
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
