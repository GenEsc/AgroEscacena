import { useState, useEffect } from 'react'
import logoNombre from '../assets/logos/LogoNombre.png'

export default function SplashScreen({ onFinished }) {
  const [imgVisible, setImgVisible] = useState(false)
  const [hiding, setHiding] = useState(false)

  useEffect(() => {
    const fadeInTimer = setTimeout(() => setImgVisible(true), 50)
    const hideTimer = setTimeout(() => setHiding(true), 1500)
    const doneTimer = setTimeout(() => onFinished(), 2100)

    return () => {
      clearTimeout(fadeInTimer)
      clearTimeout(hideTimer)
      clearTimeout(doneTimer)
    }
  }, [onFinished])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor: '#FAF9F6',
        opacity: hiding ? 0 : 1,
        transition: 'opacity 0.6s ease-in-out',
      }}
    >
      <img
        src={logoNombre}
        alt="AgroEscacena"
        className="w-72 sm:w-80 md:w-96 h-auto"
        style={{
          opacity: imgVisible ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out',
        }}
      />
    </div>
  )
}
