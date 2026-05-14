import { motion } from 'framer-motion';
import { Camera, ScanLine, Globe, TrendingUp, Check } from 'lucide-react';

const servicesData = [
  {
    id: 1,
    title: 'Instagram Handling',
    icon: Camera,
    popular: true,
    features: [
      'Content creation & scheduling',
      'Reels & posts production',
      'Growth strategy & hashtag research',
      'Community management'
    ]
  },
  {
    id: 2,
    title: 'AR Menu System',
    icon: ScanLine,
    popular: false,
    features: [
      '3D food experience for restaurants',
      'QR-based interactive menu',
      'Realistic dish visualization',
      'Boost orders by 35%'
    ]
  },
  {
    id: 3,
    title: 'Website Development',
    icon: Globe,
    popular: false,
    features: [
      'Business websites & portfolios',
      'Landing pages & funnels',
      'Mobile responsive design',
      'SEO optimized'
    ]
  },
  {
    id: 4,
    title: 'Digital Growth',
    icon: TrendingUp,
    popular: false,
    features: [
      'Brand identity & strategy',
      'Online presence management',
      'Competitor analysis',
      'Performance tracking'
    ]
  }
];

export default function Services({ openModal }) {
  return (
    <section id="services" className="relative py-24 w-full">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-overlay md:bg-fixed"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=90")' }}
      ></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="block text-gray-light text-[11px] uppercase tracking-[0.25em] mb-4">OUR EXPERTISE</span>
          <h2 className="text-5xl md:text-[64px] text-white font-heading tracking-wide mb-4">
            What We Provide
          </h2>
          <p className="text-gray-light text-lg">
            End-to-end digital solutions tailored for growing businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6, borderColor: 'rgba(255,255,255,0.25)' }}
              className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded p-8 flex flex-col transition-colors duration-300 relative"
            >
              {service.popular && (
                <div className="absolute top-8 right-8 border border-white/20 bg-black/50 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full">
                  🔥 MOST POPULAR
                </div>
              )}
              
              <service.icon className="text-white mb-6" size={32} />
              
              <h3 className="text-2xl font-medium text-white mb-6">
                {service.title}
              </h3>
              
              <ul className="flex-1 space-y-4 mb-8">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-gray-light text-sm">
                    <Check size={16} className="text-white mr-3 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={openModal}
                className="text-white font-medium text-left inline-flex items-center hover:underline self-start mt-auto"
              >
                Get Quote <span className="ml-2">→</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
