import { motion } from 'framer-motion';
import { Camera, Scan, Globe, TrendingUp, Check } from 'lucide-react';

const servicesData = [
  {
    id: 1,
    title: 'Instagram Handling',
    icon: Camera,
    image: 'https://images.unsplash.com/photo-1616469829941-c7200edec809?w=1200&q=100',
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
    icon: Scan,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=100',
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
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&q=100',
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
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=100',
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
      {/* Background Image */}
      <div 
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-fixed-desktop z-0"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=90')" }}
      ></div>

      {/* Dark overlay */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.75), rgba(0,0,0,0.90))' }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="block text-gray-light font-dm text-[11px] uppercase tracking-[0.2em] mb-2">OUR EXPERTISE</span>
          <h2 className="text-[48px] md:text-[64px] text-white font-bebas tracking-wide mb-2">
            What We Provide
          </h2>
          <p className="text-gray-light text-[15px] font-dm">
            End-to-end digital solutions tailored for growing businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
            >
              <div className="h-full relative group transition-all duration-300 hover:-translate-y-1.5 overflow-hidden flex flex-col"
                style={{ 
                  background: 'rgba(255,255,255,0.04)', 
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
              >
                {service.popular && (
                  <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md text-white border border-white text-[10px] font-dm uppercase font-bold tracking-wider px-3 py-1 rounded-full">
                    🔥 MOST POPULAR
                  </div>
                )}
                
                {/* Image Header */}
                <div className="relative h-[240px] w-full overflow-hidden shrink-0">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    loading="lazy" 
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-[0.6s] ease-in-out group-hover:scale-110 group-hover:brightness-110"
                  />
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-[rgba(0,0,0,0.7)] pointer-events-none"></div>
                  
                  {/* Icon overlaid on image bottom-left */}
                  <div className="absolute bottom-4 left-6 z-10">
                    <service.icon className="text-white drop-shadow-md" size={32} />
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-[20px] font-dm font-medium text-white mb-6">
                    {service.title}
                  </h3>
                  
                  <ul className="flex-1 space-y-3 mb-10">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-gray-light text-[14px] font-dm">
                        <Check size={16} className="text-white mr-3 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={openModal}
                    className="text-white font-dm text-[14px] font-medium inline-flex items-center hover:underline decoration-white underline-offset-4 mt-auto"
                  >
                    Get Quote →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
