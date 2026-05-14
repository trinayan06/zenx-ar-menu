import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Hero({ openModal }) {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 hidden md:block"
      >
        <source src="/bg-vid.mp4" type="video/mp4" />
      </video>
      
      {/* Mobile background fallback (since video is hidden on mobile for performance) */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80')] bg-cover bg-center z-0 md:hidden"></div>

      {/* Dark overlay so text is readable */}
      <div className="absolute inset-0 bg-black/60 z-[1]"></div>

      {/* Mesh Background blobs for extra color */}
      <div className="absolute inset-0 mesh-bg opacity-40 z-[2] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full h-full flex flex-col items-center justify-center pt-24 md:pt-0">
        
        {/* CENTERED TEXT */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full flex flex-col items-center text-center"
        >
          <div className="border border-accent rounded-full px-4 py-1.5 mb-6 text-[13px] font-space text-white inline-flex items-center bg-accent/20 backdrop-blur-md">
            <span className="text-accent mr-2">✦</span> Helping local businesses grow faster 🚀
          </div>

          <h1 className="text-[42px] md:text-[80px] leading-[1.1] text-white font-syne font-extrabold tracking-tight mb-6">
            ZEN_X — YOUR DIGITAL<br />
            GROWTH <span className="text-gradient">PARTNER</span>
          </h1>

          <p className="text-[16px] md:text-[20px] text-gray font-space max-w-[600px] mb-10 leading-relaxed">
            We help businesses grow online with Instagram handling, websites, and smart automation solutions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 w-full">
            <button
              onClick={openModal}
              className="w-full sm:w-auto btn-gradient text-white px-[32px] py-[16px] rounded-[10px] font-space font-medium text-[16px] hover:scale-105 hover:shadow-[0_0_24px_rgba(108,99,255,0.4)] transition-all"
            >
              🚀 Start Free Trial
            </button>
            <a
              href="#services"
              className="w-full sm:w-auto border border-white/20 bg-black/20 backdrop-blur-md text-white px-[32px] py-[16px] rounded-[10px] font-space font-medium text-[16px] hover:scale-105 hover:bg-white/10 transition-all text-center"
            >
              ⚡ View Services
            </a>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 w-full">
            <div className="flex flex-col items-center">
              <span className="font-syne font-extrabold text-[36px] md:text-[48px] text-white leading-none mb-1">10+</span>
              <span className="text-gray text-[12px] md:text-[14px] font-space uppercase tracking-wide">Businesses Served</span>
            </div>
            <div className="w-[1px] h-12 bg-white/20 hidden md:block"></div>
            <div className="flex flex-col items-center">
              <span className="font-syne font-extrabold text-[36px] md:text-[48px] text-white leading-none mb-1">2x</span>
              <span className="text-gray text-[12px] md:text-[14px] font-space uppercase tracking-wide">Avg. Growth Rate</span>
            </div>
            <div className="w-[1px] h-12 bg-white/20 hidden md:block"></div>
            <div className="flex flex-col items-center">
              <span className="font-syne font-extrabold text-[36px] md:text-[48px] text-white leading-none mb-1">4.9<span className="text-[28px] md:text-[36px] ml-1 text-gold">★</span></span>
              <span className="text-gray text-[12px] md:text-[14px] font-space uppercase tracking-wide">Client Satisfaction</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-accent animate-bounce z-10"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
}
