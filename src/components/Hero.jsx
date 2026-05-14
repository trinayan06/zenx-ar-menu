import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Hero({ openModal }) {
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0 md:bg-fixed"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=100')" }}
      ></div>

      {/* Dark overlay */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.65) 100%)' }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full h-full flex flex-col items-center justify-center pt-20">
        
        {/* CENTERED TEXT */}
        <motion.div 
          variants={containerVars}
          initial="hidden"
          animate="show"
          className="w-full flex flex-col items-center text-center max-w-4xl"
        >
          <motion.div variants={itemVars} className="border border-white/20 rounded-full px-4 py-1.5 mb-6 text-[12px] font-dm text-white inline-flex items-center">
            📸 @zen_x_2026
          </motion.div>

          <motion.h1 variants={itemVars} className="text-[46px] md:text-[88px] leading-[1.05] text-white font-bebas tracking-[0.02em] mb-6">
            ZEN_X — YOUR DIGITAL GROWTH PARTNER
          </motion.h1>

          <motion.p variants={itemVars} className="text-[16px] md:text-[18px] text-gray-light font-dm max-w-[600px] mb-12 leading-relaxed">
            We help businesses grow online with Instagram handling, websites, and smart automation solutions.
          </motion.p>

          <motion.div variants={itemVars} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 w-full">
            <button
              onClick={openModal}
              className="w-full sm:w-auto bg-white text-black px-8 py-3 rounded-full font-dm font-medium text-[15px] hover:bg-gray-200 transition-colors"
            >
              🚀 Start Free Trial
            </button>
            <a
              href="#services"
              className="w-full sm:w-auto border border-white bg-transparent text-white px-8 py-3 rounded-full font-dm font-medium text-[15px] hover:bg-white/10 transition-colors text-center"
            >
              ⚡ View Services
            </a>
          </motion.div>

          {/* Stats Row */}
          <motion.div variants={itemVars} className="flex flex-row items-center justify-center gap-6 md:gap-12 w-full">
            <div className="flex flex-col items-center">
              <span className="font-bebas text-[36px] md:text-[48px] text-white leading-none mb-1">10+</span>
              <span className="text-gray-light text-[11px] md:text-[12px] font-dm uppercase tracking-wider">Businesses</span>
            </div>
            <div className="w-[1px] h-10 bg-gray-dark"></div>
            <div className="flex flex-col items-center">
              <span className="font-bebas text-[36px] md:text-[48px] text-white leading-none mb-1">2x</span>
              <span className="text-gray-light text-[11px] md:text-[12px] font-dm uppercase tracking-wider">Growth Rate</span>
            </div>
            <div className="w-[1px] h-10 bg-gray-dark"></div>
            <div className="flex flex-col items-center">
              <span className="font-bebas text-[36px] md:text-[48px] text-white leading-none mb-1">4.9<span className="text-[24px] md:text-[32px] ml-1">★</span></span>
              <span className="text-gray-light text-[11px] md:text-[12px] font-dm uppercase tracking-wider">Satisfaction</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce z-10"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
}
