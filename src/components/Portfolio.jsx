import { motion } from 'framer-motion';
import TiltCard from './TiltCard';

const projects = [
  { title: 'VIP Cafe', category: 'Instagram Management', status: 'Starting Soon', statusColor: 'text-[#BBBBCC]' },
  { title: 'Restaurant AR Menu', category: 'AR Experience', status: 'Live Demo Available', statusColor: 'text-accent2' },
  { title: 'ZEN_X Website', category: 'Website Development', status: 'Completed', statusColor: 'text-[#25D366]' },
  { title: 'Client #4', category: 'Digital Growth Package', status: 'In Progress', statusColor: 'text-gold' },
  { title: 'Client #5', category: 'WhatsApp Automation Bot', status: 'Coming Soon', statusColor: 'text-gray' },
  { title: 'Your Business?', category: "Let's Work Together", status: 'Available Now', statusColor: 'text-accent' },
];

export default function Portfolio({ openModal }) {
  return (
    <section className="relative py-32 w-full bg-bg">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="block text-accent font-bebas text-[13px] uppercase tracking-[0.3em] mb-4">PORTFOLIO</span>
          <h2 className="text-[48px] md:text-[64px] text-white font-syne font-extrabold tracking-wide mb-4">
            See What We Build
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const isCallToAction = index === 5;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
                onClick={isCallToAction ? openModal : undefined}
                className={isCallToAction ? 'cursor-pointer' : ''}
              >
                <TiltCard className="p-8 h-full flex flex-col justify-between group overflow-hidden">
                  {/* Top Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-accent2 opacity-40 group-hover:opacity-100 transition-opacity duration-400"></div>
                  
                  <div className="mb-10">
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-[12px] font-bebas tracking-[0.1em] text-white bg-accent/20 border border-accent/30 px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-[20px] font-syne font-bold text-white group-hover:text-accent2 transition-colors duration-300">
                      {project.title}
                    </h3>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <span className={`text-[13px] font-space font-medium ${project.statusColor}`}>
                      {project.status}
                    </span>
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-4 group-hover:translate-x-0">
                      →
                    </span>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
