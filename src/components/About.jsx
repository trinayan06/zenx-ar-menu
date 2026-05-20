import { motion } from 'framer-motion';
import { fadeUp, stagger, viewport } from '../utils/animations';
import TiltCard from './TiltCard';

const team = [
  {
    name: 'Trinayan Mahanta',
    role: 'CO-FOUNDER & CEO',
    emoji: '👑',
    desc: 'Leads vision, strategy and business development',
    gradient: 'linear-gradient(180deg, #132f3c 0%, #111a24 100%)'
  },
  {
    name: 'Snehangshu Das',
    role: 'CO-FOUNDER & TECH LEAD',
    emoji: '💻',
    desc: 'Builds all digital products and technical solutions',
    gradient: 'linear-gradient(180deg, #1a233a 0%, #111a24 100%)'
  },
  {
    name: 'Mannat Sahu',
    role: 'CO-FOUNDER & DESIGN LEAD',
    emoji: '🎨',
    desc: 'Creates visual identity and brand experience',
    gradient: 'linear-gradient(180deg, #2a1f3c 0%, #111a24 100%)'
  },
  {
    name: 'Aditya Pragyan',
    role: 'CO-FOUNDER & MARKETING LEAD',
    emoji: '📈',
    desc: 'Drives growth strategy and client relationships',
    gradient: 'linear-gradient(180deg, #15322c 0%, #111a24 100%)'
  }
];

export default function About() {
  return (
    <section id="about" className="relative w-full bg-[#0D0D0D] overflow-hidden" style={{ padding: 'clamp(100px, 12vw, 200px) clamp(24px, 6vw, 120px)' }}>
      <div className="max-w-[1200px] mx-auto relative z-10">
        
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center mb-20"
        >
          <motion.span variants={fadeUp} className="text-[#666666] font-dm font-bold text-[12px] uppercase tracking-widest mb-4 display: block">
            ABOUT US
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-dm font-extrabold text-white tracking-tight leading-[1.1] mb-6 uppercase"
            style={{ fontSize: 'clamp(36px, 5vw, 48px)' }}
          >
            BUILT BY PASSIONATE INNOVATORS
          </motion.h2>
          <motion.p variants={fadeUp} className="font-dm text-[#888888] text-[16px] max-w-2xl mx-auto leading-[1.6]">
            We are a team of young, driven creators and engineers obsessed with helping local businesses scale through smart design and technology.
          </motion.p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {team.map((member) => (
            <motion.div
              key={member.name}
              variants={fadeUp}
              className="flex"
            >
              <TiltCard className="w-full flex bg-[#161618] border border-[#222] rounded-[24px] overflow-hidden flex-col h-[400px]">
                {/* Top visual block with gradient */}
                <div 
                  className="w-full h-[50%] flex items-center justify-center relative overflow-hidden"
                  style={{ background: member.gradient }}
                >
                  {/* Subtle glass glow effect */}
                  <div className="absolute inset-0 bg-white/[0.02] pointer-events-none" />
                  
                  <span className="text-[64px] filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)] transform select-none hover:scale-110 transition-transform duration-300">
                    {member.emoji}
                  </span>
                </div>

                {/* Bottom text block */}
                <div className="p-6 flex-1 flex flex-col justify-center items-center text-center">
                  <h4 className="font-dm font-extrabold text-white text-[18px] mb-1 tracking-tight">
                    {member.name}
                  </h4>
                  <span className="font-dm text-[#888888] font-bold text-[10px] uppercase tracking-widest mb-4">
                    {member.role}
                  </span>
                  
                  {/* Divider line inside card */}
                  <div className="w-8 h-[1px] bg-[#333] mb-4" />

                  <p className="font-dm text-[#888888] text-[13px] leading-[1.6] max-w-[200px]">
                    {member.desc}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Link Button */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex justify-center"
        >
          <a
            href="https://instagram.com/zen_x_2026"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 font-dm font-bold text-[13px] text-white hover:text-black hover:bg-white transition-all duration-300"
            style={{ border: '1.5px solid #333333', borderRadius: '999px' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-instagram"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
            Follow @zen_x_2026
          </a>
        </motion.div>

      </div>
    </section>
  );
}
