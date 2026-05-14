import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Hero({ openModal }) {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=95")' }}
      ></div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/85 to-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block border border-white/20 rounded-full px-4 py-1.5 mb-6 text-sm text-gray-light"
        >
          📸 @zen_x_2026
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[46px] md:text-[88px] leading-[1.1] text-white tracking-[0.02em] mb-6"
        >
          ZEN_X — Your Digital Growth Partner
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-light max-w-2xl mx-auto mb-10"
        >
          We help businesses grow online with Instagram handling, websites, and smart automation solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={openModal}
            className="w-full sm:w-auto bg-white text-black px-8 py-3 rounded-sm font-medium hover:bg-gray-200 transition-colors"
          >
            🚀 Start Free Trial
          </button>
          <a
            href="#services"
            className="w-full sm:w-auto bg-transparent border border-white/30 text-white px-8 py-3 rounded-sm font-medium hover:bg-white/10 transition-colors text-center"
          >
            ⚡ View Services
          </a>
        </motion.div>

        {/* Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-8 md:gap-16"
        >
          <div className="flex flex-col items-center">
            <span className="font-heading text-4xl text-white">10+</span>
            <span className="text-gray-light text-xs uppercase tracking-wider">Businesses</span>
          </div>
          <div className="w-[1px] h-10 bg-gray-dark"></div>
          <div className="flex flex-col items-center">
            <span className="font-heading text-4xl text-white">2x</span>
            <span className="text-gray-light text-xs uppercase tracking-wider">Growth Rate</span>
          </div>
          <div className="w-[1px] h-10 bg-gray-dark hidden md:block"></div>
          <div className="flex flex-col items-center hidden md:flex">
            <span className="font-heading text-4xl text-white">4.9★</span>
            <span className="text-gray-light text-xs uppercase tracking-wider">Satisfaction</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
}
