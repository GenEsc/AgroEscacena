import {
  TreePine,
  Flower2,
  Scissors,
  Droplets,
  Axe,
  Leaf,
  Sprout,
  Truck,
} from 'lucide-react'
import { t } from '../i18n'

const services = [
  { icon: Flower2, titleKey: 'services.gardenDesign', descKey: 'services.gardenDesignDesc' },
  { icon: TreePine, titleKey: 'services.landscaping', descKey: 'services.landscapingDesc' },
  { icon: Leaf, titleKey: 'services.maintenance', descKey: 'services.maintenanceDesc' },
  { icon: Scissors, titleKey: 'services.pruning', descKey: 'services.pruningDesc' },
  { icon: Axe, titleKey: 'services.felling', descKey: 'services.fellingDesc' },
  { icon: Droplets, titleKey: 'services.irrigation', descKey: 'services.irrigationDesc' },
  { icon: Sprout, titleKey: 'services.supplies', descKey: 'services.suppliesDesc' },
  { icon: Truck, titleKey: 'services.containers', descKey: 'services.containersDesc' },
]

export default function Services() {
  return (
    <section id="servicios" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            {t('services.title')}{' '}
            <span className="text-gold">{t('services.titleHighlight')}</span>
          </h2>
          <p className="text-dark/60 max-w-2xl mx-auto text-lg">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => (
            <div
              key={service.titleKey}
              className="group p-8 rounded-sm border border-dark/5 hover:border-gold/30 bg-white hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-sm bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                <service.icon className="text-gold" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-dark mb-3">
                {t(service.titleKey)}
              </h3>
              <p className="text-dark/60 leading-relaxed">
                {t(service.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
