import { motion } from 'framer-motion';

export default function Preloader() {
  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex flex-col items-center justify-center"
    >
      <div className="flex flex-col items-center w-[240px]">
        
        {/* Logo Section */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-[#C8F000] flex items-center justify-center shadow-lg" style={{ borderRadius: '12px' }}>
            <span className="font-dm font-extrabold text-[#1A1A1A] text-[22px] leading-none">Z</span>
          </div>
          <span className="font-dm font-bold text-white text-[32px] tracking-tight leading-none pt-1">
            ZEN_X
          </span>
        </div>

        {/* Loading Bar Layer */}
        <div className="w-full h-[1px] bg-[#333333] relative overflow-hidden mb-6">
          <motion.div 
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 left-0 h-full bg-[#C8F000]"
          />
        </div>

        {/* Loading Text */}
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="font-dm text-[#666666] text-[10px] uppercase tracking-[0.3em] font-bold"
        >
          LOADING EXPERIENCE
        </motion.span>
      </div>
    </motion.div>
  );
}
