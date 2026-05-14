import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Zap, Users } from 'lucide-react';

const features = [
  {
    icon: DollarSign,
    title: 'Affordable for Small Businesses',
    desc: 'Premium quality at prices small businesses can actually afford.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=100'
  },
  {
    icon: TrendingUp,
    title: 'Real Growth Focus',
    desc: 'We don\'t just post — we strategize, analyze, and optimize for actual results.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=100'
  },
  {
    icon: Zap,
    title: 'Fast Execution',
    desc: 'Get started within 24 hours. No long onboarding — results from day one.',
    image: 'https://images.unsplash.com/photo-1596003906949-67221c37965c?w=1200&q=100'
  },
  {
    icon: Users,
    title: 'Creative + Technical Team',
    desc: 'You work directly with the founders — not interns or junior employees.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=100'
  }
];

export default function WhyUs() {
  return (
    <section id="why-us" className="relative py-24 w-full">
      {/* Background Image */}
      <div 
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-fixed-desktop z-0"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1920&q=90')" }}
      ></div>

      {/* Dark overlay */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.75), rgba(0,0,0,0.90))' }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="block text-gray-light font-dm text-[11px] uppercase tracking-[0.2em] mb-2">Why Choose Us</span>
          <h2 className="text-[48px] md:text-[64px] text-white font-bebas tracking-wide mb-2">
            The ZEN_X Difference
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            >
              <div 
                className="h-full flex flex-col group transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                style={{ 
                  background: 'rgba(0,0,0,0.5)', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '4px',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'white';
                  const iconWrap = e.currentTarget.querySelector('.icon-wrap');
                  if(iconWrap) iconWrap.style.background = 'white';
                  const iconSvg = e.currentTarget.querySelector('.icon-svg');
                  if(iconSvg) iconSvg.style.color = 'black';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  const iconWrap = e.currentTarget.querySelector('.icon-wrap');
                  if(iconWrap) iconWrap.style.background = 'transparent';
                  const iconSvg = e.currentTarget.querySelector('.icon-svg');
                  if(iconSvg) iconSvg.style.color = 'white';
                }}
              >
                {/* Image Header */}
                <div className="relative h-[240px] w-full overflow-hidden shrink-0 border-b border-white/10">
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    loading="lazy" 
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-[0.6s] ease-in-out group-hover:scale-110 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-[rgba(0,0,0,0.7)] pointer-events-none"></div>
                  
                  {/* Icon overlaid */}
                  <div className="absolute bottom-4 left-6 z-10">
                    <div className="icon-wrap w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-300">
                      <feature.icon size={28} className="icon-svg text-white transition-colors duration-300" />
                    </div>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-[18px] font-dm font-medium text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-light text-[14px] font-dm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
