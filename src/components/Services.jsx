import { motion } from 'framer-motion';
import { Camera, ScanLine, Globe, TrendingUp, Check } from 'lucide-react';
import TiltCard from './TiltCard';

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
    <section id="services" className="relative py-32 w-full bg-dot-pattern">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="block text-accent font-bebas text-[13px] uppercase tracking-[0.3em] mb-4">OUR EXPERTISE</span>
          <h2 className="text-[48px] md:text-[64px] text-white font-syne font-extrabold tracking-wide mb-4">
            What We Provide
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
            >
              <TiltCard className="p-8 md:p-10 flex flex-col h-full relative group">
                {service.popular && (
                  <div className="absolute top-6 right-6 bg-gradient-to-r from-accent to-accent2 text-white text-[11px] font-space uppercase font-bold tracking-wider px-4 py-1.5 rounded-full z-10 shadow-[0_0_15px_rgba(108,99,255,0.4)]">
                    🔥 MOST POPULAR
                  </div>
                )}
                
                <div className="w-[60px] h-[60px] rounded-full bg-gradient-to-br from-accent to-accent2 flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(108,99,255,0.3)]">
                  <service.icon className="text-white" size={28} />
                </div>
                
                <h3 className="text-[22px] font-syne font-bold text-white mb-6">
                  {service.title}
                </h3>
                
                <ul className="flex-1 space-y-4 mb-10">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-gray text-[15px] font-space">
                      <Check size={18} className="text-accent mr-3 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={openModal}
                  className="text-accent font-space font-medium text-left inline-flex items-center hover:underline self-start mt-auto relative"
                >
                  Get Quote <span className="ml-2">→</span>
                  <div className="absolute -bottom-2 left-0 w-0 h-[1px] bg-gradient-to-r from-accent to-accent2 transition-all duration-300 group-hover:w-full"></div>
                </button>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
