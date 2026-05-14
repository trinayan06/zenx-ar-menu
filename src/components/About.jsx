import { motion } from 'framer-motion';
import { Camera as Instagram } from 'lucide-react';

const team = [
  { emoji: '👑', name: 'Trinayan Mahanta', role: 'Co-Founder & CEO', desc: 'Leads vision, strategy and business development' },
  { emoji: '💻', name: 'Snehangshu Das', role: 'Co-Founder & Tech Lead', desc: 'Builds all digital products and technical solutions' },
  { emoji: '🎨', name: 'Mannat Sahu', role: 'Co-Founder & Design Lead', desc: 'Creates visual identity and brand experience' },
  { emoji: '📈', name: 'Aditya Pragyan', role: 'Co-Founder & Marketing Lead', desc: 'Drives growth strategy and client relationships' },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="block text-gray-light font-dm text-[11px] uppercase tracking-[0.2em] mb-2">About Us</span>
          <h2 className="text-[48px] md:text-[64px] text-white font-bebas tracking-wide mb-4">
            Built by Passionate Innovators
          </h2>
          <p className="text-gray-light font-dm text-[15px] max-w-2xl mx-auto">
            We are a team of young, driven creators and engineers obsessed with helping local businesses scale through smart design and technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className="bg-[#111111] border border-[#2A2A2A] rounded-[4px] p-8 flex flex-col items-center text-center group transition-colors duration-300 hover:border-white"
            >
              <div className="w-16 h-16 bg-[#1A1A1A] rounded-full flex items-center justify-center text-[28px] mb-6 border border-transparent group-hover:border-white transition-colors duration-300">
                {member.emoji}
              </div>
              <h3 className="text-white font-dm font-medium text-[16px] mb-1">{member.name}</h3>
              <span className="text-gray-mid font-dm text-[11px] uppercase tracking-[0.1em] mb-4">{member.role}</span>
              <p className="text-gray-light font-dm text-[14px] leading-relaxed">
                {member.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            href="https://www.instagram.com/zen_x_2026"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3 border border-white text-white rounded-[2px] font-dm font-medium text-[14px] hover:bg-white hover:text-black transition-all"
          >
            <Instagram size={18} className="mr-2" />
            Follow @zen_x_2026
          </motion.a>
        </div>
      </div>
    </section>
  );
}
