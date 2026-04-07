import { useState, useEffect } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { t } from '../i18n'
import logoTopLeft from '../assets/logos/LogoTopLeft.png'

const navLinks = [
  { label: t('nav.home'), href: '#inicio' },
  { label: t('nav.services'), href: '#servicios' },
  { label: t('nav.portfolio'), href: '#portfolio' },
  { label: t('nav.identifier'), href: '#identificador' },
  { label: t('nav.contact'), href: '#contacto' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#inicio" className="flex-shrink-0">
            <img
              src={logoTopLeft}
              alt="Agroescacena"
              className="h-10 md:h-14 w-auto"
            />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-gold transition-colors text-sm font-medium tracking-wide uppercase"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:657661148"
              className="flex items-center gap-2 text-white/80 hover:text-gold transition-colors text-sm"
            >
              <Phone size={16} />
              657 661 148
            </a>
            <a
              href="#contacto"
              className="bg-gold hover:bg-gold-light text-white font-semibold px-5 py-2 rounded-sm text-sm transition-colors"
            >
              {t('nav.budget')}
            </a>
          </div>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={t('nav.openMenu')}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-dark/98 backdrop-blur-md border-t border-white/10">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-white/80 hover:text-gold transition-colors text-base py-2 border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:657661148"
              className="flex items-center gap-2 text-gold text-base py-2"
            >
              <Phone size={18} />
              657 661 148
            </a>
            <a
              href="#contacto"
              onClick={() => setMenuOpen(false)}
              className="bg-gold text-white font-semibold px-5 py-3 rounded-sm text-center mt-2"
            >
              {t('nav.requestBudget')}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
