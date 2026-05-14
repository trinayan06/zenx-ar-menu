import { motion } from 'framer-motion';

const projects = [
  { title: 'VIP Cafe', category: 'Instagram Management', status: 'Starting Soon', statusColor: 'text-gray-light' },
  { title: 'Restaurant AR Menu', category: 'AR Experience', status: 'Live Demo Available', statusColor: 'text-gray-light' },
  { title: 'ZEN_X Website', category: 'Website Development', status: 'Completed', statusColor: 'text-gray-light' },
  { title: 'Client #4', category: 'Digital Growth Package', status: 'In Progress', statusColor: 'text-gray-light' },
  { title: 'Client #5', category: 'WhatsApp Automation Bot', status: 'Coming Soon', statusColor: 'text-gray-light' },
  { title: 'Your Business?', category: "Let's Work Together", status: 'Available Now', statusColor: 'text-white' },
];

export default function Portfolio({ openModal }) {
  return (
    <section className="relative py-24 w-full">
      {/* Background Image */}
      <div 
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-fixed-desktop z-0"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=90')" }}
      ></div>

      {/* Dark overlay */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.75), rgba(0,0,0,0.90))' }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="block text-gray-light font-dm text-[11px] uppercase tracking-[0.2em] mb-2">See What We Build</span>
          <h2 className="text-[48px] md:text-[64px] text-white font-bebas tracking-wide mb-4">
            Our Work
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const isCallToAction = index === 5;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                onClick={isCallToAction ? openModal : undefined}
                className={`p-8 h-full flex flex-col justify-between group overflow-hidden transition-all duration-300 hover:-translate-y-1 ${isCallToAction ? 'cursor-pointer' : ''}`}
                style={{
                  background: 'rgba(0,0,0,0.6)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(12px)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
              >
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-white opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="mb-8">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-dm uppercase tracking-wider text-black bg-gray-light px-2.5 py-1 rounded-full font-bold">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-[18px] font-dm font-medium text-white transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-[13px] text-gray-light mt-1 font-dm">
                    {project.category}
                  </p>
                </div>
                
                <div className="flex justify-between items-end">
                  <span className={`text-[12px] font-dm uppercase tracking-wider ${project.statusColor}`}>
                    {project.status}
                  </span>
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0">
                    →
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
