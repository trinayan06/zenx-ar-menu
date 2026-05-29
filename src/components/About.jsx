import { motion } from 'framer-motion';
import { fadeUp, stagger, viewport } from '../utils/animations';
import TiltCard from './TiltCard';

const team = [
  {
    name: 'Trinayan Mahanta',
    role: 'CO-FOUNDER & CEO',
    image: '/assets/t2.png',
    instagram: '@tri_nayan_06',
    instagramUrl: 'https://www.instagram.com/tri_nayan_06',
    desc: 'Leads vision, strategy and business development'
  },
  {
    name: 'Snehangshu Das',
    role: 'CO-FOUNDER & TECH LEAD',
    image: '/assets/t3.png',
    instagram: '@snehangshu.18',
    instagramUrl: 'https://www.instagram.com/snehangshu.18',
    desc: 'Builds all digital products and technical solutions'
  },
  {
    name: 'Mannat Sahu',
    role: 'CO-FOUNDER & DESIGN LEAD',
    image: '/assets/t4.png',
    instagram: '@mannat_sahu55',
    instagramUrl: 'https://www.instagram.com/mannat_sahu55',
    desc: 'Creates visual identity and brand experience'
  },
  {
    name: 'Aditya Pragyan',
    role: 'CO-FOUNDER & MARKETING LEAD',
    image: '/assets/t5.png',
    instagram: '@_.aditya._18',
    instagramUrl: 'https://www.instagram.com/_.aditya._18',
    desc: 'Drives growth strategy and client relationships'
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
              <a
                href={member.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full group block no-underline transition-transform duration-300 ease-out hover:-translate-y-[6px]"
              >
                <TiltCard className="w-full flex bg-[#161618] border border-[#222] rounded-[24px] overflow-hidden flex-col h-[400px] transition-all duration-300 ease-out group-hover:border-[#C8F135]/60 group-hover:shadow-[0_0_25px_rgba(200,241,53,0.15)]">
                  {/* Top visual block with photo */}
                  <div className="w-full h-[50%] relative overflow-hidden bg-[#1a1a1a]">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Subtle glass glow/shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161618] via-[#161618]/20 to-transparent opacity-60" />
                    <div className="absolute inset-0 bg-white/[0.02] pointer-events-none" />
                  </div>

                  {/* Bottom text block */}
                  <div className="p-6 flex-1 flex flex-col justify-center items-center text-center">
                    <h4 className="font-dm font-extrabold text-white text-[18px] mb-1 tracking-tight">
                      {member.name}
                    </h4>
                    <span className="font-dm text-[#888888] font-bold text-[10px] uppercase tracking-widest mb-2">
                      {member.role}
                    </span>
                    
                    {/* Instagram handle */}
                    <div className="flex items-center gap-1.5 text-[#C8F135] text-[13.5px] font-medium mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-instagram shrink-0"
                      >
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                      <span>{member.instagram}</span>
                    </div>

                    {/* Divider line inside card */}
                    <div className="w-8 h-[1px] bg-[#333] mb-4" />

                    <p className="font-dm text-[#888888] text-[13px] leading-[1.6] max-w-[200px]">
                      {member.desc}
                    </p>
                  </div>
                </TiltCard>
              </a>
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
