import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { fadeUp, stagger, viewport } from '../utils/animations';

const faqs = [
  {
    q: 'Is the 15-day free trial really free?',
    a: 'Yes, 100% free. No credit card required, no hidden charges. Full access for 15 days. Walk away anytime — no questions asked.'
  },
  {
    q: 'How much does Instagram handling cost after the trial?',
    a: 'Plans start at ₹3,000/month Basic, ₹5,000/month Standard (most popular), ₹8,000/month Premium (includes free AR Menu).'
  },
  {
    q: 'How fast can you start?',
    a: 'Within 24 hours. First post within 2-3 days of onboarding.'
  },
  {
    q: 'What is the AR Menu system?',
    a: 'Customers scan QR code, see 3D dish models in AR on their table. Boosts order value by up to 35%.'
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. No lock-in contracts. Cancel at end of any billing cycle.'
  },
  {
    q: 'How long before I see Instagram results?',
    a: 'Engagement increases within 2 weeks. Follower growth in 30-60 days.'
  },
  {
    q: 'What are WhatsApp Automation Bots?',
    a: 'AI bots handling customer inquiries, orders, follow-ups, 24/7 through WhatsApp.'
  },
  {
    q: 'Do you offer custom packages?',
    a: 'Yes. Custom quote within 24 hours. Just reach out via WhatsApp.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative w-full bg-white" style={{ padding: 'clamp(80px, 10vw, 160px) clamp(24px, 6vw, 120px)' }}>
      <div className="max-w-[800px] mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeUp}
            className="font-dm font-extrabold text-[#1A1A1A] tracking-tight leading-[1.1] mb-4"
            style={{ fontSize: 'clamp(36px, 5vw, 48px)' }}
          >
            Got Questions?
          </motion.h2>
        </motion.div>

        <div>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
              >
                <div
                  className="border-b transition-all duration-300"
                  style={{
                    borderBottomColor: '#E8E8E8',
                    borderLeft: isOpen ? '3px solid #C8F000' : '3px solid transparent',
                    backgroundColor: isOpen ? '#FAFAFA' : 'transparent'
                  }}
                >
                  <button
                    className="w-full py-6 px-6 flex items-center justify-between text-left focus:outline-none"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="font-dm font-bold text-[17px] text-[#1A1A1A]">
                      {faq.q}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-6 shrink-0"
                    >
                      {isOpen ? (
                        <X size={20} className="text-[#C8F000]" />
                      ) : (
                        <Plus size={20} className="text-[#1A1A1A]" />
                      )}
                    </motion.div>
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="pb-6 px-6 pr-12 text-[#666666] font-dm text-[15px] leading-[1.6]">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
