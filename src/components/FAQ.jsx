import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

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

  const toggle = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section id="faq" className="py-32 bg-bg">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="block text-accent font-bebas text-[13px] uppercase tracking-[0.3em] mb-4">FAQ</span>
          <h2 className="text-[48px] md:text-[64px] text-white font-syne font-extrabold tracking-wide">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="flex flex-col">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border-b border-white/[0.06]"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full py-8 flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className="text-white text-[18px] font-syne font-semibold pr-8 group-hover:text-accent transition-colors">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 text-accent group-hover:text-accent2 transition-colors"
                  >
                    <Plus size={24} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 text-gray text-[16px] font-space leading-[1.8]">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
