import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, OrbitControls } from '@react-three/drei';

export default function Hero({ openModal }) {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden mesh-bg">
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full h-full flex flex-col md:flex-row items-center justify-center md:justify-between pt-24 md:pt-0">
        
        {/* LEFT TEXT COLUMN */}
        <motion.div 
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left"
        >
          <div className="border border-accent rounded-full px-4 py-1.5 mb-6 text-[13px] font-space text-white inline-flex items-center bg-accent/10">
            <span className="text-accent mr-2">✦</span> Digital Growth Agency
          </div>

          <h1 className="text-[48px] md:text-[90px] leading-[1.1] text-white font-syne font-extrabold tracking-tight mb-6">
            YOUR DIGITAL<br />
            GROWTH<br />
            <span className="text-gradient">PARTNER</span>
          </h1>

          <p className="text-[16px] md:text-[18px] text-gray font-space max-w-[480px] mb-10 leading-relaxed">
            We help businesses grow online with Instagram handling, websites, and smart automation solutions.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto">
            <button
              onClick={openModal}
              className="w-full sm:w-auto btn-gradient text-white px-[32px] py-[14px] rounded-[10px] font-space font-medium hover:scale-105 hover:shadow-[0_0_24px_rgba(108,99,255,0.4)] transition-all"
            >
              🚀 Start Free Trial
            </button>
            <a
              href="#services"
              className="w-full sm:w-auto border border-white/20 bg-transparent text-white px-[32px] py-[14px] rounded-[10px] font-space font-medium hover:scale-105 hover:bg-white/5 transition-all text-center"
            >
              View Services
            </a>
          </div>

          {/* Stats Row */}
          <div className="flex items-center gap-8 md:gap-12 w-full justify-center md:justify-start">
            <div className="flex flex-col items-center md:items-start">
              <span className="font-syne font-extrabold text-[36px] md:text-[44px] text-white leading-none mb-1">10+</span>
              <span className="text-gray text-[13px] font-space uppercase tracking-wide">Businesses</span>
            </div>
            <div className="w-[1px] h-12 bg-white/10"></div>
            <div className="flex flex-col items-center md:items-start">
              <span className="font-syne font-extrabold text-[36px] md:text-[44px] text-white leading-none mb-1">2x</span>
              <span className="text-gray text-[13px] font-space uppercase tracking-wide">Growth Rate</span>
            </div>
            <div className="w-[1px] h-12 bg-white/10"></div>
            <div className="flex flex-col items-center md:items-start">
              <span className="font-syne font-extrabold text-[36px] md:text-[44px] text-white leading-none mb-1">4.9<span className="text-[28px] md:text-[32px] ml-1 text-gold">★</span></span>
              <span className="text-gray text-[13px] font-space uppercase tracking-wide">Satisfaction</span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT 3D CANVAS (Hidden on Mobile) */}
        <motion.div 
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="hidden md:block w-1/2 h-[600px] relative"
        >
          <div className="absolute inset-0 bg-accent/20 rounded-full filter blur-[120px] transform -translate-y-12 scale-75"></div>
          <Canvas camera={{ position: [0, 0, 4] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#6C63FF" />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
            <Sphere args={[1.4, 64, 64]}>
              <MeshDistortMaterial 
                color="#6C63FF" 
                attach="material" 
                distort={0.4} 
                speed={2} 
                roughness={0.2}
                metalness={0.8}
              />
            </Sphere>
          </Canvas>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-accent animate-bounce"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
}
