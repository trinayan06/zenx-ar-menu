import { motion } from 'framer-motion';

export default function CTA({ openModal }) {
  return (
    <section className="py-32 bg-[#F2F1EE] text-black">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-[72px] font-heading tracking-wide mb-6"
        >
          Let's Grow Your Business 🚀
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[#555555] text-lg mb-10 max-w-2xl mx-auto"
        >
          Join businesses already scaling with ZEN_X. First 15 days completely free.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button
            onClick={openModal}
            className="bg-black text-white px-10 py-4 rounded-sm font-medium text-lg hover:bg-gray-800 transition-colors shadow-lg shadow-black/10"
          >
            Start Free Trial
          </button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-10 text-sm text-[#9A9A9A]"
        >
          <span>✓ No credit card</span>
          <span className="hidden sm:inline">·</span>
          <span>✓ Cancel anytime</span>
          <span className="hidden sm:inline">·</span>
          <span>✓ Response within 24hrs</span>
        </motion.div>
      </div>
    </section>
  );
}
