import { Phone } from 'lucide-react'
import { t } from '../i18n'
import logoFavicon from '../assets/logos/LogoFavicon.png'

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src={logoFavicon}
              alt="Agroescacena"
              className="h-10 w-auto"
            />
            <span className="text-white font-heading text-lg tracking-wider">
              AGROESCACENA
            </span>
          </div>

          <a
            href="tel:657661148"
            className="flex items-center gap-2 text-gold hover:text-gold-light transition-colors"
          >
            <Phone size={16} />
            657 661 148
          </a>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}
