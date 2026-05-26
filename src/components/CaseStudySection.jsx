import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useCountUp } from 'react-countup';
import { Check, XCircle, MapPin, Calendar, User, CreditCard } from 'lucide-react';
import { fadeUp, stagger, viewport } from '../utils/animations';

const caseStudiesData = [
  {
    id: 'vip-cafe',
    badge: 'Instagram Management',
    clientName: 'VIP Cafe Chevella',
    location: 'Chevella, Hyderabad',
    problemTitle: 'The Problem',
    problemItems: [
      'Low online reach and visibility',
      'Inconsistent content posting',
      'Weak branding and visual identity',
      'Low audience engagement'
    ],
    solutionTitle: 'What ZEN_X Did',
    solutionItems: [
      'Full Instagram account management',
      'Food posters & Reels creation',
      'Content strategy and scheduling',
      'Audience engagement support',
      'Branding and feed improvement'
    ],
    metrics: [
      { label: 'Posts', value: 16, suffix: '' },
      { label: 'Followers', value: 102, suffix: '' },
      { label: 'Views', value: 6.7, decimals: 1, suffix: 'k' },
      { label: 'Reel Views', value: 1.5, suffix: 'k' }
    ],
    footer: {
      client: 'Basheer Shaik',
      date: 'May 2026',
      price: '₹3,000/month',
      badgeText: 'PAID'
    },
    pdfUrl: '/assets/ZEN_X_BRD_VIPCafe_Chevella.pdf'
  }
];

function AnimatedCounter({ end, suffix, decimals = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  const { start } = useCountUp({
    ref,
    start: 0,
    end,
    duration: 2.5,
    suffix,
    decimals,
    startOnMount: false,
  });

  useEffect(() => {
    if (isInView) {
      start();
    }
  }, [isInView, start]);

  return <span ref={ref}>0</span>;
}

export default function CaseStudySection() {
  return (
    <section
      id="case-studies"
      className="relative w-full bg-[#0D0D0D]"
      style={{ padding: 'clamp(80px, 10vw, 160px) clamp(24px, 6vw, 120px)' }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mb-16 text-left"
        >
          <motion.span variants={fadeUp} className="section-label" style={{ color: '#888888' }}>
            CASE STUDIES
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-[36px] md:text-[56px] font-dm font-extrabold text-white leading-[1.1] tracking-tight mb-4"
          >
            Results that speak.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-dm text-[#888888] text-[18px] md:text-[20px]"
          >
            Real clients. Real numbers.
          </motion.p>
        </motion.div>

        {/* Case Studies List */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="space-y-12"
        >
          {caseStudiesData.map((study) => (
            <motion.div
              key={study.id}
              variants={fadeUp}
              className="bg-[#1A1A1A] p-6 md:p-12 transition-all duration-300 hover:shadow-2xl"
              style={{
                border: '1.5px solid #333333',
                borderRadius: '24px',
                transform: 'translateY(0px)',
              }}
              // Custom inline hover effect handling lift
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Card Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <span className="inline-block bg-[#0D0D0D] text-[#C8F135] border border-[#333333] font-dm font-bold text-[11px] uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
                    {study.badge}
                  </span>
                  <h3 className="font-dm font-extrabold text-white text-[28px] md:text-[38px] leading-tight tracking-tight">
                    {study.clientName}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-[#888888] font-dm font-medium text-[14px]">
                    <MapPin size={16} className="text-[#C8F135]" />
                    <span>{study.location}</span>
                  </div>
                </div>
              </div>

              {/* Two Columns: Problem & Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-10">
                {/* Left Column: Problem */}
                <div className="bg-[#0D0D0D] p-6 md:p-8 rounded-2xl border border-[#333333]/50">
                  <h4 className="font-dm font-extrabold text-white text-[18px] md:text-[20px] mb-4 flex items-center gap-2">
                    <XCircle size={20} className="text-[#888888]" />
                    {study.problemTitle}
                  </h4>
                  <ul className="space-y-3">
                    {study.problemItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 bg-[#666666] rounded-full mt-2.5 shrink-0" />
                        <span className="font-dm text-[#888888] text-[15px] leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Column: Solution */}
                <div className="bg-[#0D0D0D] p-6 md:p-8 rounded-2xl border border-[#333333]/50">
                  <h4 className="font-dm font-extrabold text-white text-[18px] md:text-[20px] mb-4 flex items-center gap-2">
                    <Check size={20} className="text-[#C8F135]" />
                    {study.solutionTitle}
                  </h4>
                  <ul className="space-y-3">
                    {study.solutionItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check size={16} className="text-[#C8F135] mt-1 shrink-0" strokeWidth={3} />
                        <span className="font-dm text-[#AAAAAA] text-[15px] leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Metrics Strip */}
              <div className="bg-[#0D0D0D] p-6 md:p-8 rounded-2xl border border-[#333333]/50 mb-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  {study.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col justify-center py-2 ${idx < study.metrics.length - 1 ? 'md:border-r md:border-white/10' : ''
                        }`}
                    >
                      <span className="font-dm font-extrabold text-[#C8F135] text-[32px] md:text-[40px] leading-none mb-2">
                        <AnimatedCounter
                          end={metric.value}
                          suffix={metric.suffix}
                          decimals={metric.decimals}
                        />
                      </span>
                      <span className="font-dm text-white/70 font-bold uppercase tracking-wider text-[11px] md:text-[12px]">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer and CTA */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-6 border-t border-[#333333]">
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 font-dm text-[14px] text-[#888888]">
                  <span className="flex items-center gap-1.5">
                    <User size={15} className="text-[#888888]" />
                    <strong>Client:</strong> {study.footer.client}
                  </span>
                  <span className="text-white/10 hidden sm:inline">·</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={15} className="text-[#888888]" />
                    {study.footer.date}
                  </span>
                  <span className="text-white/10 hidden sm:inline">·</span>
                  <span className="flex items-center gap-1.5">
                    <CreditCard size={15} className="text-[#888888]" />
                    {study.footer.price}
                  </span>
                  <span className="text-white/10 hidden sm:inline">·</span>
                  <span className="inline-flex items-center bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] font-extrabold px-2.5 py-1 rounded uppercase tracking-wider leading-none">
                    {study.footer.badgeText}
                  </span>
                </div>

                <a
                  href={study.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-black text-[#C8F135] hover:bg-[#C8F135] hover:text-black font-dm font-bold text-[14px] uppercase tracking-wider px-8 py-4 transition-all duration-300 border border-[#C8F135]/30 hover:border-transparent"
                  style={{ borderRadius: '999px' }}
                >
                  View Full Case Study →
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
