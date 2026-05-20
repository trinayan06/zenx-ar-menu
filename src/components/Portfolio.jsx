import { motion, useInView } from 'framer-motion';
import { useCountUp } from 'react-countup';
import { ArrowUpRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { fadeUp, stagger, viewport } from '../utils/animations';
import TiltCard from './TiltCard';

const projects = [
  { 
    title: 'VIP Cafe', 
    category: 'Instagram Management', 
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=100'
  },
  { 
    title: 'Restaurant AR Menu', 
    category: 'AR Experience', 
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=100'
  },
  { 
    title: 'ZEN_X Website', 
    category: 'Website Development', 
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1200&q=100'
  },
  { 
    title: 'Client Automation Bot', 
    category: 'WhatsApp Automation', 
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=100'
  },
];

const stats = [
  { value: 10, suffix: '+', label: 'Happy Clients' },
  { value: 4, suffix: '', label: 'Core Services' },
  { value: 35, suffix: '%', label: 'Avg ROI Boost' },
  { value: 24, suffix: '/7', label: 'Support' },
];

function AnimatedCounter({ end, suffix }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  
  const { start } = useCountUp({
    ref,
    start: 0,
    end,
    duration: 2.5,
    suffix,
    startOnMount: false,
  });

  useEffect(() => {
    if (isInView) {
      start();
    }
  }, [isInView, start]);

  return <span ref={ref}>0</span>;
}

export default function Portfolio() {
  return (
    <section id="work" className="relative w-full bg-[#0D0D0D]" style={{ borderRadius: '24px 24px 0 0', padding: 'clamp(80px, 10vw, 160px) clamp(24px, 6vw, 120px)' }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Section header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <motion.h2
              variants={fadeUp}
              className="text-[36px] md:text-[48px] font-dm font-extrabold text-white leading-[1.1] tracking-tight mb-3"
            >
              Selected Work.
            </motion.h2>
            <motion.p variants={fadeUp} className="font-dm text-[#888888] text-[16px]">
              A glimpse into what we've built for our partners.
            </motion.p>
          </div>
          <motion.a
            variants={fadeUp}
            href="#"
            className="inline-flex items-center justify-center font-dm font-bold text-[14px] text-white hover:bg-white hover:text-black transition-colors"
            style={{ border: '1.5px solid #555555', borderRadius: '999px', padding: '12px 24px' }}
          >
            View All Projects →
          </motion.a>
        </motion.div>

        {/* Project grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
            >
              <TiltCard className="group w-full">
                <div className="w-full aspect-[4/3] bg-[#1A1A1A] overflow-hidden mb-5" style={{ borderRadius: '16px' }}>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-dm font-bold text-white text-[20px] tracking-tight mb-1">{project.title}</h3>
                    <span className="font-dm text-[#888888] text-[14px]">{project.category}</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center transition-colors group-hover:bg-[#C8F000]">
                    <ArrowUpRight size={20} className="text-white group-hover:text-black transition-colors" />
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col md:flex-row justify-between items-center py-10"
          style={{ borderTop: '1px solid #333333', borderBottom: '1px solid #333333' }}
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={fadeUp} className="flex-1 text-center py-6 md:py-0 w-full md:w-auto border-b md:border-b-0 md:border-r border-[#333333] last:border-0">
              <div className="font-dm font-extrabold text-[#C8F000] text-[48px] leading-none mb-2">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-dm text-[#888888] text-[14px]">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
