import { motion } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'We Understand Your Business',
    desc: 'Deep dive into your goals, audience, and competition',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=100'
  },
  {
    num: '02',
    title: 'We Plan Your Content & Strategy',
    desc: 'Build content calendar, design templates, growth roadmap',
    image: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=1200&q=100'
  },
  {
    num: '03',
    title: 'We Execute & Manage',
    desc: 'Handle everything: posting, engagement, analytics, optimization',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=100'
  },
  {
    num: '04',
    title: 'You Get Growth & Customers',
    desc: 'Watch followers, reach, and revenue grow',
    image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=1200&q=100'
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

        <div className="relative flex flex-col md:flex-row md:justify-between gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }}
              className="relative z-10 flex flex-col flex-1 group transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
              style={{ 
                background: 'rgba(255,255,255,0.02)', 
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
            >
              {/* Image Header */}
              <div className="relative h-[240px] w-full overflow-hidden shrink-0">
                <img 
                  src={step.image} 
                  alt={step.title} 
                  loading="lazy" 
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-[0.6s] ease-in-out group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-[rgba(0,0,0,0.7)] pointer-events-none"></div>
                
                {/* Step Number Overlaid */}
                <div className="absolute bottom-4 left-6 z-10 font-bebas text-[64px] text-white/80 leading-none select-none">
                  {step.num}
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-[20px] font-dm font-medium text-white mb-3 leading-tight">{step.title}</h3>
                <p className="text-[#9A9A9A] text-[14px] font-dm leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
