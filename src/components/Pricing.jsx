import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { fadeUp, stagger, viewport } from '../utils/animations';
import TiltCard from './TiltCard';

const services = [
  {
    name: 'Website Development',
    price: '₹5,000',
    priceLabel: 'Starting from',
    features: [
      'Custom Design & Mobile Responsive',
      'SEO Friendly Setup',
      'Admin Dashboard Support'
    ],
    bestValue: false
  },
  {
    name: 'Instagram Handling',
    price: '₹3,000',
    priceLabel: 'Starting from',
    period: '/month',
    features: [
      'Post Designing',
      'Reels & Story Management',
      'Page Growth Strategy',
      'Customer Engagement'
    ],
    bestValue: true
  },
  {
    name: 'Digital Menu Design',
    price: '₹100',
    period: '/dish',
    features: [
      'Modern QR Menu Design',
      'Restaurant/Café Menu Customization'
    ],
    bestValue: false
  },
  {
    name: 'Website Maintenance',
    price: '₹1,200',
    period: '/month',
    features: [
      'Website Updates',
      'Bug Fixes',
      'Basic Technical Support',
      'Security & Backup Monitoring'
    ],
    bestValue: false
  },
  {
    name: 'AI Automation Services',
    price: '₹25,000',
    priceLabel: 'Starting from',
    features: [
      'AI Chatbots',
      'Auto Reply Systems',
      'Booking Automation',
      'Business Workflow Automation',
      'AI Customer Support'
    ],
    bestValue: false
  }
];

export default function Pricing({ openModal }) {
  return (
    <section id="pricing" className="relative w-full bg-white" style={{ padding: 'clamp(80px, 10vw, 160px) clamp(24px, 6vw, 120px)' }}>
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
            className="font-dm font-extrabold text-[#1A1A1A] tracking-tight leading-[1.1] mb-6"
            style={{ fontSize: 'clamp(36px, 5vw, 48px)' }}
          >
            Simple, transparent pricing.
          </motion.h2>
          <motion.p variants={fadeUp} className="font-dm text-[#666666] text-[16px]">
            🎁 15-Day Free Trial — No payment required · Cancel anytime
          </motion.p>
        </motion.div>

        {/* Pricing Cards Grid using Flexwrap for auto-centering of leftover items */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-wrap justify-center gap-8"
        >
          {services.map((plan, i) => (
            <motion.div
              key={plan.name}
              variants={fadeUp}
              className="w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] max-w-[370px] min-h-[460px] flex"
            >
              <TiltCard 
                className="w-full flex" 
                style={{ borderRadius: '24px' }}
              >
                <div
                  className="w-full h-full flex flex-col p-8 bg-white transition-all duration-300 relative"
                  style={{
                    border: plan.bestValue ? '2px solid #C8F000' : '1.5px solid #E8E8E8',
                    borderRadius: '24px',
                  }}
                >
                  {plan.bestValue && (
                    <div className="absolute top-0 right-8 -translate-y-1/2">
                      <span className="bg-[#C8F000] text-black font-dm font-bold text-[11px] uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm">
                        MOST POPULAR
                      </span>
                    </div>
                  )}

                  <h4 className="font-dm font-extrabold text-[22px] text-[#1A1A1A] mb-4 leading-tight">{plan.name}</h4>
                  
                  {/* Pricing Block */}
                  <div className="mb-8 flex flex-col justify-end min-h-[64px]">
                    {plan.priceLabel && (
                      <span className="text-[11px] font-dm text-[#666666] mb-1 font-extrabold uppercase tracking-widest">
                        {plan.priceLabel}
                      </span>
                    )}
                    <div className="flex items-baseline">
                      <span className="font-dm font-extrabold text-[38px] text-[#1A1A1A] leading-none tracking-tight">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-[13px] font-dm text-[#666666] ml-1.5 font-bold uppercase tracking-wider">
                          {plan.period}
                        </span>
                      )}
                    </div>
                  </div>

                  <ul className="flex-1 space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check size={16} className="mr-3 mt-1 shrink-0 text-[#C8F000]" strokeWidth={3} />
                        <span className="text-[14px] font-dm text-[#1A1A1A] font-medium leading-[1.5]">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={openModal}
                    className="w-full py-3.5 px-6 font-dm font-bold text-[14px] transition-all duration-300"
                    style={{
                      background: plan.bestValue ? '#C8F000' : '#1A1A1A',
                      color: plan.bestValue ? '#1A1A1A' : '#FFFFFF',
                      borderRadius: '999px',
                    }}
                  >
                    Start Free Trial
                  </button>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
