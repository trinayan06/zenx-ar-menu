import { motion } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'We Understand Your Business',
    desc: 'Deep dive into your goals, audience, and competition'
  },
  {
    num: '02',
    title: 'We Plan Your Content & Strategy',
    desc: 'Build content calendar, design templates, growth roadmap'
  },
  {
    num: '03',
    title: 'We Execute & Manage',
    desc: 'Handle everything: posting, engagement, analytics, optimization'
  },
  {
    num: '04',
    title: 'You Get Growth & Customers',
    desc: 'Watch followers, reach, and revenue grow'
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-[#0A0A0A] bg-dot-pattern relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-[48px] md:text-[64px] text-white font-bebas tracking-wide mb-2">
            How It Works
          </h2>
        </div>

        <div className="relative flex flex-col md:flex-row md:justify-between gap-12 md:gap-6">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[48px] left-[10%] right-[10%] h-[1px] bg-white/20 z-0"></div>

          {steps.map((step, index) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }}
              className="relative z-10 flex flex-col flex-1 items-center text-center px-4"
            >
              <div className="font-bebas text-[96px] text-[#1A1A1A] leading-none mb-4 select-none">
                {step.num}
              </div>

              <div className="absolute top-[32px] md:top-[38px] w-full">
                <h3 className="text-[20px] font-dm font-medium text-white mb-3 max-w-[200px] mx-auto leading-tight">{step.title}</h3>
                <p className="text-[#9A9A9A] text-[14px] font-dm max-w-[240px] mx-auto leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
