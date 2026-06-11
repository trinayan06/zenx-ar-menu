import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function Hero({ openModal }) {
  const containerRef = useRef(null);
  
  // Mouse position values for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for parallax
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  // Transforms for different depth layers
  const x1 = useTransform(springX, [-1, 1], [-20, 20]);
  const y1 = useTransform(springY, [-1, 1], [-20, 20]);
  
  const x2 = useTransform(springX, [-1, 1], [30, -30]);
  const y2 = useTransform(springY, [-1, 1], [30, -30]);

  const x3 = useTransform(springX, [-1, 1], [-50, 50]);
  const y3 = useTransform(springY, [-1, 1], [-50, 50]);

  const x4 = useTransform(springX, [-1, 1], [60, -60]);
  const y4 = useTransform(springY, [-1, 1], [60, -60]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Normalize mouse position between -1 and 1
    const x = (e.clientX - rect.left) / rect.width * 2 - 1;
    const y = (e.clientY - rect.top) / rect.height * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen flex items-center justify-center bg-white overflow-hidden pt-20"
      style={{ perspective: '1000px' }}
    >
      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 flex flex-col items-center text-center pointer-events-none">
        
        {/* Top Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2 mb-10 pointer-events-auto shadow-sm"
          style={{ background: '#F5F5F5', border: '1px solid #E8E8E8', borderRadius: '999px' }}
        >
          <div className="w-2 h-2 rounded-full bg-[#C8F000]"></div>
          <span className="font-dm text-[13px] font-bold text-[#1A1A1A] tracking-wide uppercase">
            UNDERSTAND › DIAGNOSE › EXECUTE
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-dm font-extrabold text-black leading-[1.1] mb-6 max-w-5xl mx-auto"
          style={{ fontSize: 'clamp(48px, 6vw, 88px)' }}
        >
          We Grow <br />
          Your Business <br />
          <span 
            className="inline-block px-4 py-1 mx-2 shadow-sm"
            style={{ 
              background: '#C8F000', 
              borderRadius: '6px',
              color: '#1A1A1A',
              fontStyle: 'italic',
              transform: 'rotate(-2deg)'
            }}
          >
            Online
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-dm font-normal text-[#666666] text-[18px] leading-[1.6] max-w-[560px] mx-auto mb-10"
        >
          We first understand your business — then tell you exactly what you need to grow in the digital world.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 pointer-events-auto"
        >
          <button
            onClick={openModal}
            className="font-dm font-bold text-[#1A1A1A] bg-[#C8F000] px-9 py-4 transition-transform hover:scale-105 shadow-md"
            style={{ borderRadius: '999px' }}
          >
            Start Free Trial
          </button>
          <a
            href="#work"
            className="font-dm font-bold text-[#1A1A1A] bg-white px-9 py-4 transition-transform hover:scale-105 inline-flex items-center gap-2 shadow-sm"
            style={{ borderRadius: '999px', border: '1.5px solid #1A1A1A' }}
          >
            See Our Work <ArrowUpRight size={18} />
          </a>
        </motion.div>
      </div>

      {/* Floating Parallax Cards Layer */}
      <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block overflow-hidden">
        
        {/* 1. Left Dark Stat */}
        <motion.div
          style={{ x: x1, y: y1, rotate: '-5deg' }}
          className="absolute top-[35%] left-[6%] bg-[#0D0D0D] p-6 w-56 shadow-2xl transition-transform duration-200"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          whileHover={{ scale: 1.05, rotate: 0 }}
        >
          <div style={{ borderRadius: '16px' }} className="h-full w-full">
            <h3 className="font-dm font-medium text-white/60 text-[12px] uppercase tracking-wider mb-2">Performance</h3>
            <div className="font-dm font-extrabold text-[#C8F000] text-[40px] leading-none mb-1">20K+</div>
            <div className="font-dm font-bold text-white text-[14px]">Metrics Improved</div>
          </div>
        </motion.div>

        {/* 2. Left Bottom Gradient */}
        <motion.div
          style={{ x: x2, y: y2, rotate: '8deg' }}
          className="absolute bottom-[10%] left-[12%] w-64 h-48 shadow-2xl overflow-hidden bg-cover bg-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          whileHover={{ scale: 1.05, rotate: 0 }}
        >
          <div 
            style={{ borderRadius: '16px', background: 'linear-gradient(135deg, #5B6AF0 0%, #C8F000 100%)' }} 
            className="w-full h-full p-5 flex flex-col justify-end"
          >
             <span className="bg-[#C8F000] text-black text-[10px] font-extrabold uppercase px-2 py-1 rounded inline-block w-max mb-1">USER-FIRST</span>
             <span className="text-white font-dm font-extrabold text-[24px]">DESIGN</span>
          </div>
        </motion.div>

        {/* 3. Right Top Feature List */}
        <motion.div
          style={{ x: x3, y: y3, rotate: '3deg' }}
          className="absolute top-[18%] right-[8%] bg-white shadow-2xl p-6 w-64"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          whileHover={{ scale: 1.05, rotate: 0 }}
        >
          <div style={{ border: '1px solid #E8E8E8', borderRadius: '16px' }} className="h-full w-full bg-white relative p-4">
             <ul className="space-y-3 mb-6">
                <li className="flex items-center text-[12px] font-dm text-[#666]"><div className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A] mr-2"></div> Strategic Planning</li>
                <li className="flex items-center text-[12px] font-dm text-[#666]"><div className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A] mr-2"></div> Content Creation</li>
                <li className="flex items-center text-[12px] font-dm text-[#666]"><div className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A] mr-2"></div> Monthly Analytics</li>
             </ul>
             <div className="w-full bg-[#0D0D0D] text-white text-[12px] font-bold py-2 rounded text-center">Choose Plan</div>
          </div>
        </motion.div>

        {/* 4. Right Bottom Browser Mockup */}
        <motion.div
          style={{ x: x1, y: y2, rotate: '-4deg' }}
          className="absolute bottom-[15%] right-[5%] w-[320px] shadow-2xl bg-white overflow-hidden flex flex-col"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          whileHover={{ scale: 1.05, rotate: 0 }}
        >
          <div style={{ border: '1px solid #E8E8E8', borderRadius: '12px' }} className="w-full h-full flex flex-col">
            <div className="h-8 bg-[#F5F5F5] flex items-center px-3 gap-1.5 border-b border-[#E8E8E8]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
            </div>
            <div className="w-full h-48 relative overflow-hidden">
               <img 
                 src="/hero-image.jpg" 
                 alt="Laptop Setup" 
                 className="w-full h-full object-cover"
               />
            </div>
          </div>
        </motion.div>

        {/* 5. NEW: Top Left Mobile App Image Card */}
        <motion.div
          style={{ x: x4, y: y4, rotate: '12deg' }}
          className="absolute top-[12%] left-[4%] w-48 h-56 shadow-2xl bg-white overflow-hidden flex flex-col p-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          whileHover={{ scale: 1.05, rotate: 0 }}
        >
          <div style={{ border: '1px solid #E8E8E8', borderRadius: '12px' }} className="w-full h-full flex flex-col overflow-hidden relative">
            <img 
              src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=80" 
              alt="Mobile Social App" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3">
              <span className="bg-white/90 backdrop-blur-sm text-black text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                Social Growth
              </span>
            </div>
          </div>
        </motion.div>

        {/* 6. NEW: Far Right Middle Stats/Analytics Image */}
        <motion.div
          style={{ x: x2, y: y1, rotate: '-8deg' }}
          className="absolute top-[45%] right-[-2%] w-60 h-40 shadow-xl bg-white p-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          whileHover={{ scale: 1.05, rotate: 0 }}
        >
           <div style={{ border: '1px solid #E8E8E8', borderRadius: '12px' }} className="w-full h-full relative overflow-hidden">
             <img 
               src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80" 
               alt="Analytics Dashboard" 
               className="w-full h-full object-cover"
             />
             <div className="absolute top-2 right-2">
                <span className="bg-[#5B6AF0] text-white text-[10px] font-extrabold uppercase px-2 py-1 rounded shadow-sm">Data Driven</span>
             </div>
           </div>
        </motion.div>

        {/* 7. NEW: Bottom Middle AR Menu Image */}
        <motion.div
          style={{ x: x3, y: y4, rotate: '5deg' }}
          className="absolute bottom-[-5%] right-[35%] w-64 h-36 shadow-2xl bg-white p-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          whileHover={{ scale: 1.05, rotate: 0 }}
        >
          <div style={{ border: '1px solid #E8E8E8', borderRadius: '12px' }} className="w-full h-full relative overflow-hidden">
             <img 
               src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80" 
               alt="Food Menu" 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                <div className="font-dm font-bold text-white text-[16px] leading-tight">AR Restaurant Menus</div>
                <div className="font-dm text-[#C8F000] text-[12px] font-medium">+35% Order Value</div>
             </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
