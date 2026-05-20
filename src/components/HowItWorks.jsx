import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, stagger, viewport } from '../utils/animations';

const steps = [
  {
    num: '01',
    title: 'We Understand Your Business',
    desc: 'Deep dive into your goals, audience, and competition to lay a rock-solid foundation.',
  },
  {
    num: '02',
    title: 'We Plan Your Content',
    desc: 'Build content calendar, design customized templates, and map out a growth roadmap.',
  },
  {
    num: '03',
    title: 'We Execute & Manage',
    desc: 'Handle everything from high-quality posting and engagement to data optimization.',
  },
  {
    num: '04',
    title: 'You Get Customers',
    desc: 'Watch your followers, engagement rates, reach, and business revenue grow automatically.',
  }
];

function StepCard({ step }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex flex-col p-8 bg-white transition-all duration-300 overflow-hidden"
      style={{
        border: '1.5px solid #E8E8E8',
        borderRadius: '24px',
        minHeight: '280px',
        boxShadow: isHovered ? '0 16px 40px rgba(0,0,0,0.04)' : 'none',
        borderColor: isHovered ? '#C8F000' : '#E8E8E8'
      }}
    >
      {/* Glow effect overlay */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 180px at ${coords.x}px ${coords.y}px, rgba(200, 240, 0, 0.12) 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Step number badge */}
      <div 
        className="font-dm font-bold text-[13px] text-black px-4 py-1.5 mb-6 w-max shadow-sm relative z-10"
        style={{ background: '#F5F5F5', borderRadius: '999px', border: '1px solid #E8E8E8' }}
      >
        {step.num}
      </div>

      <h3 className="font-dm font-extrabold text-black text-[20px] leading-tight mb-4 relative z-10">
        {step.title}
      </h3>

      <p className="font-dm font-normal text-[#666666] text-[15px] leading-[1.6] relative z-10">
        {step.desc}
      </p>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative w-full bg-white" style={{ padding: 'clamp(100px, 12vw, 200px) clamp(24px, 6vw, 120px)' }}>
      <div className="max-w-[1200px] mx-auto relative z-10">
        
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center mb-20"
        >
          <motion.h2
            variants={fadeUp}
            className="font-dm font-extrabold text-black tracking-tight mb-4"
            style={{ fontSize: 'clamp(40px, 5vw, 56px)' }}
          >
            How we operate.
          </motion.h2>
          <motion.p variants={fadeUp} className="font-dm text-[#666666] text-[18px]">
            A simple, transparent process to scale your business.
          </motion.p>
        </motion.div>

        <div className="relative">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10"
          >
            {steps.map((step, index) => (
              <motion.div key={step.num} variants={fadeUp}>
                <StepCard step={step} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
