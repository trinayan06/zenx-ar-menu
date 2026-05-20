import { motion } from 'framer-motion';
import { fadeUp, stagger, viewport } from '../utils/animations';

export default function CTA({ openModal }) {
  return (
    <section className="relative w-full overflow-hidden" style={{ background: '#0D0D0D', borderRadius: '24px 24px 0 0', padding: 'clamp(100px, 12vw, 200px) clamp(24px, 6vw, 120px)' }}>
      {/* Lime radial glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(200,240,0,0.07) 0%, transparent 65%)',
        }}
      />

      <div className="max-w-[1000px] mx-auto text-center relative z-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.h2
            variants={fadeUp}
            className="font-dm font-extrabold text-white tracking-tight leading-[1.1] mb-12"
            style={{ fontSize: 'clamp(48px, 6vw, 88px)' }}
          >
            READY TO GROW?
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            {/* Primary button */}
            <button
              onClick={openModal}
              className="font-dm font-bold text-[15px] transition-transform hover:scale-105 px-10 py-4"
              style={{
                background: '#C8F000',
                color: '#1A1A1A',
                borderRadius: '999px',
              }}
            >
              Start Free Trial
            </button>

            {/* Secondary button */}
            <a
              href="#services"
              className="font-dm font-bold text-[15px] transition-transform hover:scale-105 px-10 py-4 text-center"
              style={{
                background: 'transparent',
                color: '#FFFFFF',
                borderRadius: '999px',
                border: '1.5px solid #FFFFFF',
              }}
            >
              View Services
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="text-[#888888] font-dm font-medium text-[14px] flex flex-wrap justify-center items-center gap-x-6 gap-y-2"
          >
            <span>✓ No credit card</span>
            <span>✓ Cancel anytime</span>
            <span>✓ Response within 24hrs</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
