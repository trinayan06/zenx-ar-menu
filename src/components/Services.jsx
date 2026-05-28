import { motion } from 'framer-motion';
import { ArrowUpRight, Globe, Scan, MessageCircle } from 'lucide-react';
import { fadeUp, stagger, viewport } from '../utils/animations';
import TiltCard from './TiltCard';

export default function Services({ openModal }) {
  return (
    <section id="services" className="relative w-full bg-white" style={{ padding: 'clamp(80px, 10vw, 160px) clamp(24px, 6vw, 120px)' }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Section header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <motion.span variants={fadeUp} className="section-label">OUR EXPERTISE</motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-[36px] md:text-[48px] font-dm font-extrabold text-[#1A1A1A] leading-[1.1] tracking-tight"
            >
              Everything you need to dominate your market.
            </motion.h2>
          </div>
          <motion.a
            variants={fadeUp}
            href="#work"
            className="inline-flex items-center gap-2 font-dm font-bold text-[14px] text-[#1A1A1A] hover:text-[#C8F000] transition-colors"
          >
            View All Services <ArrowUpRight size={18} />
          </motion.a>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {/* Large featured card (spans 7 cols) */}
          <motion.div variants={fadeUp} className="md:col-span-7 flex">
            <TiltCard
              className="bg-[#C8F000] p-8 md:p-12 flex flex-col justify-between group w-full"
              style={{ borderRadius: '24px' }}
            >
              <div className="flex justify-between items-start mb-16">
                <span className="bg-[#0D0D0D] text-white font-dm font-bold text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-full">
                  FEATURED SERVICE
                </span>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <ArrowUpRight size={20} className="text-[#1A1A1A] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
              <div>
                <h3 className="font-dm font-extrabold text-[#1A1A1A] text-[32px] md:text-[40px] leading-tight mb-4 tracking-tight">
                  Instagram Management
                </h3>
                <p className="font-dm font-medium text-[#1A1A1A] text-[16px] leading-[1.6] max-w-md opacity-80 mb-6">
                  Complete end-to-end management of your Instagram presence. We handle content creation, strategy, and daily growth.
                </p>
                <button onClick={openModal} className="font-dm font-bold text-[#1A1A1A] text-[15px] underline hover:no-underline">
                  Explore this →
                </button>
              </div>
            </TiltCard>
          </motion.div>

          {/* Top right card (spans 5 cols) */}
          <motion.div variants={fadeUp} className="md:col-span-5 flex">
            <TiltCard
              className="bg-white p-8 md:p-10 flex flex-col justify-between group w-full"
              style={{ borderRadius: '24px', border: '1px solid #E8E8E8' }}
            >
              <div className="flex justify-between items-start mb-12">
                <div className="w-12 h-12 rounded-2xl bg-[#F5F5F5] flex items-center justify-center text-[#1A1A1A]">
                  <Globe size={24} />
                </div>
                <ArrowUpRight size={24} className="text-[#666666] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#C8F000]" />
              </div>
              <div>
                <h3 className="font-dm font-bold text-[#1A1A1A] text-[24px] mb-3">Website Development</h3>
                <p className="font-dm text-[#666666] text-[15px] leading-[1.6]">
                  High-converting landing pages and business websites built for speed and sales.
                </p>
              </div>
            </TiltCard>
          </motion.div>

          {/* Bottom left card (spans 5 cols) */}
          <motion.div variants={fadeUp} className="md:col-span-5 flex">
            <TiltCard
              className="bg-[#0D0D0D] p-8 md:p-10 flex flex-col justify-between group w-full"
              style={{ borderRadius: '24px' }}
              onClick={() => window.open('/menu.html', '_blank')}
            >
              <div className="flex justify-between items-start mb-12">
                <div className="w-12 h-12 rounded-2xl bg-[#1A1A1A] flex items-center justify-center text-[#C8F000]">
                  <Scan size={24} />
                </div>
                <ArrowUpRight size={24} className="text-[#666666] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#C8F000]" />
              </div>
              <div>
                <h3 className="font-dm font-bold text-white text-[24px] mb-3">Restaurant AR Menu</h3>
                <p className="font-dm text-[#888888] text-[15px] leading-[1.6]">
                  Interactive 3D menus that increase order value and modernize the dining experience.
                </p>
              </div>
            </TiltCard>
          </motion.div>

          {/* Bottom right card (spans 7 cols) */}
          <motion.div variants={fadeUp} className="md:col-span-7 flex">
            <TiltCard
              className="bg-[#5B6AF0] p-8 md:p-10 flex flex-col justify-between group w-full"
              style={{ borderRadius: '24px' }}
            >
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                  <MessageCircle size={24} />
                </div>
                <ArrowUpRight size={24} className="text-white/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
              </div>
              <div className="max-w-md">
                <h3 className="font-dm font-bold text-white text-[24px] mb-3">WhatsApp Automation</h3>
                <p className="font-dm text-white/80 text-[16px] leading-[1.6] mb-6">
                  Never miss a lead again. AI-powered bots that handle inquiries, bookings, and customer support 24/7.
                </p>
                <span className="font-dm font-bold text-white text-[20px] italic">"Game changer for our business."</span>
              </div>
            </TiltCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
