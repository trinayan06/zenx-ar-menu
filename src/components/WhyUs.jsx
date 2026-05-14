import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Zap, Users } from 'lucide-react';
import TiltCard from './TiltCard';

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
    <section id="why-us" className="relative py-32 w-full bg-bg2 overflow-hidden">
      {/* Background large text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-syne font-extrabold text-[150px] md:text-[250px] text-white opacity-[0.02] whitespace-nowrap">
          ZEN_X
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="block text-accent font-bebas text-[13px] uppercase tracking-[0.3em] mb-4">THE ZEN_X DIFFERENCE</span>
          <h2 className="text-[48px] md:text-[64px] text-white font-syne font-extrabold tracking-wide mb-4">
            Why Choose Us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
            >
              <TiltCard className="p-10 flex flex-col h-full group">
                <div className="w-[64px] h-[64px] rounded-full bg-gradient-to-br from-accent to-accent2 flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(108,99,255,0.3)] transition-transform duration-400 group-hover:scale-110">
                  <feature.icon size={28} className="text-white" />
                </div>
                <h3 className="text-[24px] font-syne font-bold text-white mb-4 group-hover:text-accent2 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray text-[16px] font-space leading-relaxed">
                  {feature.desc}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
