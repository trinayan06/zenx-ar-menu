import { motion } from 'framer-motion';
import { Camera as InstagramIcon } from 'lucide-react';
import { fadeUp, stagger, scaleIn, viewportConfig } from '../utils/animations';

const instaImages = [
  { src: "/1.jpg", alt: "ZEN_X Post 1" },
  { src: "/2.jpg", alt: "ZEN_X Post 2" },
  { src: "/3.jpg", alt: "ZEN_X Post 3" },
  { src: "/4.jpg", alt: "ZEN_X Post 4" },
  { src: "/5.jpg", alt: "ZEN_X Post 5" },
  { src: "/1.jpg", alt: "ZEN_X Post 6" },
];

export default function Instagram() {
  return (
    <section className="relative w-full overflow-hidden" style={{ background: '#0A0A0A', padding: 'clamp(80px, 10vw, 160px) clamp(24px, 6vw, 120px)' }}>
      {/* Decorative diagonal red line */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-20%',
          right: '10%',
          width: '2px',
          height: '140%',
          background: 'linear-gradient(to bottom, transparent, #E63946, transparent)',
          opacity: 0.15,
          transform: 'rotate(15deg)',
        }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
          {/* Left — Text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="lg:w-[35%] flex flex-col justify-center"
          >
            <motion.span variants={fadeUp} className="section-label">[ INSTAGRAM ]</motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-bebas text-white tracking-[-0.02em] leading-[0.9] mb-6"
              style={{ fontSize: 'clamp(48px, 7vw, 100px)' }}
            >
              FOLLOW US<br />
              <span style={{ color: '#E63946' }}>@ZEN_X</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-[#9A9A9A] font-dm font-light text-[16px] leading-[1.7] mb-10"
            >
              Follow @zen_x_2026 for daily tips, client results, behind-the-scenes
            </motion.p>
            <motion.a
              variants={fadeUp}
              href="https://www.instagram.com/zen_x_2026"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3.5 font-dm font-medium text-[14px] uppercase tracking-[0.08em] transition-all"
              style={{
                border: '1.5px solid #FFFFFF',
                color: '#FFFFFF',
                borderRadius: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#E63946';
                e.currentTarget.style.color = '#E63946';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#FFFFFF';
                e.currentTarget.style.color = '#FFFFFF';
              }}
            >
              <InstagramIcon size={18} />
              Follow @zen_x_2026
            </motion.a>
          </motion.div>

          {/* Right — Instagram grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="lg:w-[65%] grid grid-cols-2 md:grid-cols-3 gap-3"
          >
            {instaImages.map((post, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                className="relative aspect-square overflow-hidden cursor-pointer group"
                style={{ borderRadius: 0 }}
                onClick={() => window.open('https://www.instagram.com/zen_x_2026', '_blank')}
              >
                <img 
                  src={post.src} 
                  alt={post.alt} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]" 
                />
                {/* Red overlay on hover */}
                <div 
                  className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: 'rgba(230, 57, 70, 0.7)' }}
                >
                  <InstagramIcon size={28} className="text-white mb-2" />
                  <span className="text-[13px] font-dm text-white font-medium uppercase tracking-wider">
                    View Post
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
