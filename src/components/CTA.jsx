import { motion } from 'framer-motion';

export default function CTA({ openModal }) {
  return (
    <section className="relative py-40 overflow-hidden mesh-bg">
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/20 rounded-full filter blur-[80px] opacity-20 animate-[mesh-blob-1_20s_infinite_alternate]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent2/20 rounded-full filter blur-[100px] opacity-20 animate-[mesh-blob-2_25s_infinite_alternate]"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[56px] md:text-[80px] font-syne font-extrabold tracking-tight mb-8 leading-[1.1] text-white"
        >
          Let's Grow Your<br />
          <span className="text-gradient">Business</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-gray text-[18px] font-space mb-12 max-w-2xl mx-auto"
        >
          Join businesses already scaling with ZEN_X. First 15 days completely free.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <button
            onClick={openModal}
            className="btn-gradient text-white px-[40px] py-[18px] rounded-[12px] font-space font-medium text-[18px] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(108,99,255,0.4)] relative overflow-hidden group"
          >
            <span className="relative z-10">Start Free Trial 🚀</span>
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-12 text-[14px] font-space text-gray-main"
        >
          <span>✓ No credit card</span>
          <span className="hidden sm:inline text-white/20">·</span>
          <span>✓ Cancel anytime</span>
          <span className="hidden sm:inline text-white/20">·</span>
          <span>✓ Response within 24hrs</span>
        </motion.div>
      </div>
    </section>
  );
}
