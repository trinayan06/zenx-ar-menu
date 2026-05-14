import { motion } from 'framer-motion';

const projects = [
  { title: 'VIP Cafe', category: 'Instagram Management', status: 'Starting Soon' },
  { title: 'Restaurant AR Menu', category: 'AR Experience', status: 'Live Demo Available' },
  { title: 'ZEN_X Website', category: 'Website Development', status: 'Completed' },
  { title: 'Client #4', category: 'Digital Growth Package', status: 'In Progress' },
  { title: 'Client #5', category: 'WhatsApp Automation Bot', status: 'Coming Soon' },
  { title: 'Your Business?', category: 'Let\'s Work Together', status: 'Available' },
];

export default function Portfolio({ openModal }) {
  return (
    <section className="relative py-24 w-full">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-overlay md:bg-fixed"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=90")' }}
      ></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="block text-gray-light text-[11px] uppercase tracking-[0.25em] mb-4">PORTFOLIO</span>
          <h2 className="text-5xl md:text-[64px] text-white font-heading tracking-wide mb-4">
            See What We Build
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
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.3)' }}
                onClick={isCallToAction ? openModal : undefined}
                className={`group relative bg-black/60 backdrop-blur-md border border-white/10 p-8 rounded-sm transition-colors duration-300 flex flex-col justify-between ${
                  isCallToAction ? 'cursor-pointer' : ''
                }`}
              >
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-white opacity-20 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="mb-8">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] uppercase tracking-[0.1em] text-gray-light border border-white/10 px-2 py-1 rounded-sm">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-medium text-white group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                </div>
                
                <div className="flex justify-between items-end">
                  <span className="text-[12px] text-gray-light">
                    {project.status}
                  </span>
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">
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
