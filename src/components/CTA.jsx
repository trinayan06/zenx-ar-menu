import { motion } from 'framer-motion';

export default function CTA({ openModal }) {
  return (
    <section className="py-32 bg-[#F2F1EE]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[48px] md:text-[72px] text-black font-bebas tracking-wide leading-[1.1] mb-6"
        >
          Let's Grow Your Business 🚀
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-dark font-dm text-[18px] md:text-[20px] mb-12 max-w-2xl mx-auto"
        >
          Stop losing customers to competitors with better online presence. Partner with ZEN_X today.
        </motion.p>
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onClick={openModal}
          className="bg-black text-white px-10 py-4 rounded-[2px] font-dm font-medium text-[16px] hover:bg-gray-dark transition-colors mb-6 shadow-xl"
        >
          Start Free Trial
        </motion.button>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-gray-mid font-dm text-[13px] flex flex-wrap justify-center items-center gap-x-6 gap-y-2"
        >
          <span>✓ No credit card</span>
          <span>✓ Cancel anytime</span>
          <span>✓ Response within 24hrs</span>
        </motion.div>
      </div>
    </section>
  );
}
