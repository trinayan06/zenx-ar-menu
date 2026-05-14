import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

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
    <section className="py-24 bg-[#080808]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="block text-gray-light text-[11px] uppercase tracking-[0.25em] mb-4">WHO WE ARE</span>
          <h2 className="text-5xl md:text-[64px] text-white font-heading tracking-wide mb-6">
            Built by Passionate Innovators
          </h2>
          <p className="text-gray-light text-lg max-w-2xl mx-auto">
            ZEN_X is a team of young innovators from India — helping businesses grow digitally at prices they can afford.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ borderColor: '#FFF' }}
              className="group bg-[#111111] border border-[#2A2A2A] rounded p-8 text-center transition-colors duration-300 flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#1A1A1A] border border-transparent group-hover:border-white transition-colors flex items-center justify-center text-3xl mb-6">
                {member.emoji}
              </div>
              <h3 className="text-white text-base font-medium mb-1">{member.name}</h3>
              <div className="text-gray-light text-[13px] uppercase tracking-wider mb-4">
                {member.role}
              </div>
              <p className="text-gray-mid text-sm leading-relaxed">
                {member.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <a
            href="https://www.instagram.com/zen_x_2026"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-white/20 text-white rounded-sm font-medium hover:border-white transition-colors"
          >
            <Camera size={20} className="mr-2" /> Follow Our Journey
          </a>
        </div>
      </div>
    </section>
  );
}
