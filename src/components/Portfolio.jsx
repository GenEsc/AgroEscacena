import { useRef, useEffect, useCallback } from 'react'
import { t } from '../i18n'

const portfolioImages = Object.values(
  import.meta.glob('../assets/portfolio/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
  })
)

const placeholderImages = [
  'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1200&q=80',
  'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200&q=80',
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80',
  'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=1200&q=80',
  'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=1200&q=80',
  'https://images.unsplash.com/photo-1598902108854-d1446c06ca49?w=1200&q=80',
]

const CARD_WIDTH = 400
const GAP = 24
const SPEED = 50 // pixels per second

export default function Portfolio() {
  const images =
    portfolioImages.length > 0 ? portfolioImages : placeholderImages
  const trackRef = useRef(null)
  const offsetRef = useRef(0)
  const rafRef = useRef(null)
  const pausedRef = useRef(false)
  const lastTimeRef = useRef(null)

  const singleSetWidth = images.length * (CARD_WIDTH + GAP)

  const animate = useCallback((time) => {
    if (lastTimeRef.current == null) lastTimeRef.current = time
    const delta = (time - lastTimeRef.current) / 1000
    lastTimeRef.current = time

    const track = trackRef.current
    if (track && !pausedRef.current) {
      offsetRef.current += SPEED * delta
      if (offsetRef.current >= singleSetWidth) {
        offsetRef.current -= singleSetWidth
      }
      track.style.transform = `translateX(-${offsetRef.current}px)`
    }
    rafRef.current = requestAnimationFrame(animate)
  }, [singleSetWidth])

  useEffect(() => {
    if (images.length === 0) return
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [images, animate])

  const displayImages = [...images, ...images, ...images]

  return (
    <section id="portfolio" className="py-20 md:py-28 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('portfolio.title')}{' '}
            <span className="text-gold">{t('portfolio.titleHighlight')}</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            {t('portfolio.subtitle')}
          </p>
        </div>

        <div
          className="relative overflow-hidden mx-auto"
          style={{
            maskImage:
              'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
          }}
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
        >
          <div
            ref={trackRef}
            className="flex will-change-transform"
            style={{ gap: `${GAP}px` }}
          >
            {displayImages.map((src, i) => (
              <div
                key={i} 
                className="flex-shrink-0 rounded-sm overflow-hidden group"
                style={{ width: `${CARD_WIDTH}px` }}
              >
                <img
                  src={src}
                  alt={`${t('portfolio.imageAlt')} ${(i % images.length) + 1}`}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
