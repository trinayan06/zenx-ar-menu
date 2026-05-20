import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Zap, Users } from 'lucide-react';
import { fadeUp, stagger, viewport } from '../utils/animations';

const features = [
  {
    icon: DollarSign,
    title: 'Affordable for Small Businesses',
    desc: 'Premium quality at prices small businesses can actually afford.',
  },
  {
    icon: TrendingUp,
    title: 'Real Growth Focus',
    desc: 'We don\'t just post — we strategize, analyze, and optimize for actual results.',
  },
  {
    icon: Zap,
    title: 'Fast Execution',
    desc: 'Get started within 24 hours. No long onboarding — results from day one.',
  },
  {
    icon: Users,
    title: 'Creative + Technical Team',
    desc: 'You work directly with the founders — not interns or junior employees.',
  }
];

export default function WhyUs() {
  return (
    <section id="why-us" className="relative w-full bg-[#0D0D0D]" style={{ borderRadius: '24px 24px 0 0', padding: 'clamp(80px, 10vw, 160px) clamp(24px, 6vw, 120px)' }}>
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeUp}
            className="font-dm font-extrabold text-white text-[36px] md:text-[48px] tracking-tight leading-[1.1] mb-4"
          >
            The ZEN_X Difference
          </motion.h2>
          <motion.p variants={fadeUp} className="font-dm text-[#888888] text-[16px]">
            Why ambitious brands choose to partner with us.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-[#1A1A1A] p-8 flex flex-col items-start transition-transform hover:-translate-y-1"
              style={{ border: '1px solid #222222', borderRadius: '16px' }}
            >
              <div className="w-12 h-12 flex items-center justify-center mb-6">
                <feature.icon size={32} className="text-[#C8F000]" strokeWidth={2} />
              </div>
              <h3 className="font-dm font-bold text-[20px] text-white mb-3 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-[#888888] font-dm font-normal text-[15px] leading-[1.6]">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
