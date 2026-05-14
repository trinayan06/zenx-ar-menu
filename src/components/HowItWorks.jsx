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
    <section id="how-it-works" className="py-32 bg-bg2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24 relative z-10">
          <span className="block text-accent font-bebas text-[13px] uppercase tracking-[0.3em] mb-4">THE PROCESS</span>
          <h2 className="text-[48px] md:text-[64px] text-white font-syne font-extrabold tracking-wide">
            How It Works
          </h2>
        </div>

        <div className="relative flex flex-col md:flex-row md:justify-between gap-16 md:gap-6">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[1px] border-t border-dashed border-accent/40 z-0"></div>

          {steps.map((step, index) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.15 }}
              className="relative z-10 flex flex-col flex-1 items-center text-center"
            >
              {/* Giant ghost number */}
              <div className="absolute -top-10 md:-top-16 left-1/2 -translate-x-1/2 text-[120px] font-syne font-extrabold text-accent/5 pointer-events-none select-none">
                {step.num}
              </div>

              {/* Number circle */}
              <div className="w-[56px] h-[56px] rounded-full border-2 border-accent bg-bg2 flex items-center justify-center font-bebas text-white text-[24px] mb-8 z-10 relative shadow-[0_0_20px_rgba(108,99,255,0.2)]">
                {parseInt(step.num, 10)}
              </div>

              <div className="px-4">
                <h3 className="text-[20px] font-syne font-bold text-white mb-4">{step.title}</h3>
                <p className="text-gray text-[15px] font-space">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
