import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

export default function Instagram() {
  const images = ['/1.jpg', '/2.jpg', '/3.jpg', '/4.jpg', '/5.jpg'];

  return (
    <section className="py-32 bg-bg2">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <span className="block text-accent font-bebas text-[13px] uppercase tracking-[0.3em] mb-4">SOCIAL</span>
        <h2 className="text-[48px] md:text-[64px] text-white font-syne font-extrabold tracking-wide mb-4">
          We Post. You Grow.
        </h2>
        <p className="text-gray font-space text-[16px] md:text-[18px] mb-20 max-w-2xl mx-auto">
          Follow @zen_x_2026 for daily tips, client results, behind-the-scenes
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mb-16">
          {images.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className="relative aspect-square rounded-[16px] overflow-hidden group cursor-pointer border border-transparent hover:border-accent transition-all duration-400 hover:scale-105 hover:shadow-[0_0_24px_rgba(108,99,255,0.3)]"
              onClick={() => window.open('https://www.instagram.com/zen_x_2026', '_blank')}
            >
              <img 
                src={src} 
                alt={`Instagram Post ${i + 1}`} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#050508]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                <Camera size={32} className="text-white mb-3" />
                <span className="text-[14px] font-space font-medium text-white">
                  View Post
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          href="https://www.instagram.com/zen_x_2026"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-[32px] py-[14px] btn-gradient text-white rounded-[10px] font-space font-medium hover:scale-105 transition-all shadow-[0_0_15px_rgba(108,99,255,0.2)]"
        >
          Follow @zen_x_2026 <span className="ml-3 text-xl leading-none">→</span>
        </motion.a>
      </div>
    </section>
  );
}
