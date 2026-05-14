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
    <section id="how-it-works" className="py-24 bg-[#0A0A0A] bg-dot-pattern">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="block text-gray-light text-[11px] uppercase tracking-[0.25em] mb-4">THE PROCESS</span>
          <h2 className="text-5xl md:text-[64px] text-white font-heading tracking-wide">
            How It Works
          </h2>
        </div>

        <div className="relative flex flex-col md:flex-row md:justify-between gap-12 md:gap-6">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[48px] left-[10%] right-[10%] h-[1px] bg-white/10 z-0"></div>

          {steps.map((step, index) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative z-10 flex flex-col flex-1"
            >
              <div className="text-[96px] font-heading leading-none text-[#1A1A1A] mb-4 md:text-center">
                {step.num}
              </div>
              <div className="md:text-center px-4 -mt-12 md:-mt-16">
                <h3 className="text-xl font-medium text-white mb-3">{step.title}</h3>
                <p className="text-gray-light text-sm">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
