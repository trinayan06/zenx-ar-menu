import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import TiltCard from './TiltCard';

const team = [
  {
    emoji: '👑',
    name: 'Trinayan Mahanta',
    role: 'Co-Founder & CEO',
    desc: 'Leads vision, strategy and business development'
  },
  {
    emoji: '💻',
    name: 'Snehangshu Das',
    role: 'Co-Founder & Tech Lead',
    desc: 'Builds all digital products and technical solutions'
  },
  {
    emoji: '🎨',
    name: 'Mannat Sahu',
    role: 'Co-Founder & Design Lead',
    desc: 'Creates visual identity and brand experience'
  },
  {
    emoji: '📈',
    name: 'Aditya Pragyan',
    role: 'Co-Founder & Marketing Lead',
    desc: 'Drives growth strategy and client relationships'
  }
];

export default function About() {
  return (
    <section className="py-32 bg-bg2">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="block text-accent font-bebas text-[13px] uppercase tracking-[0.3em] mb-4">WHO WE ARE</span>
          <h2 className="text-[48px] md:text-[64px] text-white font-syne font-extrabold tracking-wide mb-6">
            Built by Passionate Innovators
          </h2>
          <p className="text-gray text-[18px] font-space max-w-2xl mx-auto">
            ZEN_X is a team of young innovators from India — helping businesses grow digitally at prices they can afford.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
            >
              <TiltCard className="p-8 text-center flex flex-col items-center h-full">
                <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-bg3 to-bg border border-white/10 flex items-center justify-center text-[32px] mb-6 shadow-inner">
                  {member.emoji}
                </div>
                <h3 className="text-white text-[18px] font-syne font-bold mb-2">{member.name}</h3>
                <div className="text-accent text-[13px] font-bebas tracking-[0.1em] mb-4">
                  {member.role}
                </div>
                <p className="text-gray text-[14px] font-space leading-relaxed">
                  {member.desc}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            href="https://www.instagram.com/zen_x_2026"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-[32px] py-[14px] border border-white/20 text-white rounded-[10px] font-space font-medium hover:border-accent hover:text-accent transition-colors duration-300"
          >
            <Camera size={20} className="mr-3" /> Follow Our Journey
          </motion.a>
        </div>
      </div>
    </section>
  );
}
