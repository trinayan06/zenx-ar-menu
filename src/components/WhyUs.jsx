import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Zap, Users } from 'lucide-react';

const features = [
  {
    icon: DollarSign,
    title: 'Affordable for Small Businesses',
    desc: 'Premium quality at prices small businesses can actually afford.'
  },
  {
    icon: TrendingUp,
    title: 'Real Growth Focus',
    desc: 'We don\'t just post — we strategize, analyze, and optimize for actual results.'
  },
  {
    icon: Zap,
    title: 'Fast Execution',
    desc: 'Get started within 24 hours. No long onboarding — results from day one.'
  },
  {
    icon: Users,
    title: 'Creative + Technical Team',
    desc: 'You work directly with the founders — not interns or junior employees.'
  }
];

export default function WhyUs() {
  return (
    <section id="why-us" className="relative py-24 w-full">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-overlay md:bg-fixed"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1920&q=90")' }}
      ></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="block text-gray-light text-[11px] uppercase tracking-[0.25em] mb-4">THE ZEN_X DIFFERENCE</span>
          <h2 className="text-5xl md:text-[64px] text-white font-heading tracking-wide mb-4">
            Why Choose Us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ borderColor: '#FFF' }}
              className="group bg-black/50 backdrop-blur-md border border-white/10 rounded p-8 flex flex-col transition-colors duration-300"
            >
              <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-black transition-colors text-white">
                <feature.icon size={28} className="transition-colors" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">{feature.title}</h3>
              <p className="text-gray-light text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
