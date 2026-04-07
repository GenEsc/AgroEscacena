import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react'
import { t } from '../i18n'

export default function Contact() {
  return (
    <section id="contacto" className="py-20 md:py-28 bg-dark-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('contact.titleStart')}{' '}
            <span className="text-gold">{t('contact.titleHighlight')}</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="reveal max-w-3xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6">
            <a
              href="tel:657661148"
              className="group flex flex-col items-center gap-4 bg-dark/50 border border-white/10 hover:border-gold/40 rounded-sm p-8 transition-all hover:shadow-lg"
            >
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                <Phone className="text-gold" size={28} />
              </div>
              <div className="text-center">
                <p className="text-white font-semibold mb-1">{t('contact.call')}</p>
                <p className="text-white/50 text-sm">657 661 148</p>
              </div>
            </a>

            <a
              href="https://wa.me/34657661148"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 bg-dark/50 border border-white/10 hover:border-gold/40 rounded-sm p-8 transition-all hover:shadow-lg"
            >
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                <MessageCircle className="text-gold" size={28} />
              </div>
              <div className="text-center">
                <p className="text-white font-semibold mb-1">{t('contact.whatsapp')}</p>
                <p className="text-white/50 text-sm">{t('contact.whatsappHint')}</p>
              </div>
            </a>

            <a
              href="mailto:contacto@agroescacena.com"
              className="group flex flex-col items-center gap-4 bg-dark/50 border border-white/10 hover:border-gold/40 rounded-sm p-8 transition-all hover:shadow-lg"
            >
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                <Mail className="text-gold" size={28} />
              </div>
              <div className="text-center">
                <p className="text-white font-semibold mb-1">{t('contact.email')}</p>
                <p className="text-white/50 text-sm">{t('contact.emailHint')}</p>
              </div>
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 mt-10 text-white/40 text-sm">
            <MapPin size={16} />
            <span>{t('contact.location')}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
