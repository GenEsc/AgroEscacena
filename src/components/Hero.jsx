import { ChevronDown } from 'lucide-react'
import { t } from '../i18n'
import logoContacto from '../assets/logos/LogoContacto.png'

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1920&q=80')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-dark/70" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-block bg-white/90 backdrop-blur-sm rounded-lg px-10 pt-5 pb-10 mb-10 shadow-xl animate-[fadeInUp_0.8s_ease_forwards]">
          <img
            src={logoContacto}
            alt="Agroescacena - Jardinería y Paisajismo"
            className="w-72 sm:w-80 md:w-96 lg:w-[28rem] h-auto"
          />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-[fadeInUp_0.8s_ease_0.2s_both]">
          {t('hero.titleStart')}{' '}
          <span className="text-gold">{t('hero.titleHighlight')}</span>
        </h1>
        <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto animate-[fadeInUp_0.8s_ease_0.4s_both]">
          {t('hero.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-[fadeInUp_0.8s_ease_0.6s_both]">
          <a
            href="#portfolio"
            className="bg-gold hover:bg-gold-light text-white font-semibold px-8 py-3.5 rounded-sm text-base transition-colors"
          >
            {t('hero.ctaPortfolio')}
          </a>
          <a
            href="https://wa.me/34657661148"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-white/40 hover:border-gold text-white hover:text-gold font-semibold px-8 py-3.5 rounded-sm text-base transition-colors"
          >
            {t('hero.ctaWhatsapp')}
          </a>
        </div>
      </div>

      <a
        href="#servicios"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-gold transition-colors animate-bounce"
        aria-label={t('hero.scrollDown')}
      >
        <ChevronDown size={32} />
      </a>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
