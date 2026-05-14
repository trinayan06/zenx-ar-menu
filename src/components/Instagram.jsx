import { motion } from 'framer-motion';
import { Camera as InstagramIcon } from 'lucide-react';

export default function Instagram() {
  const posts = [1, 2, 3, 4, 5, 6];

  return (
    <section className="py-24 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-[48px] md:text-[64px] text-white font-bebas tracking-wide mb-2">
          We Post. You Grow.
        </h2>
        <p className="text-gray-light font-dm text-[15px] mb-16 max-w-xl mx-auto">
          Follow @zen_x_2026 for daily tips, client results, behind-the-scenes
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {posts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="aspect-square bg-[#1A1A1A] rounded-[8px] border border-[#2A2A2A] flex flex-col items-center justify-center cursor-pointer group hover:border-white transition-all duration-300"
              onClick={() => window.open('https://www.instagram.com/zen_x_2026', '_blank')}
            >
              <InstagramIcon size={28} className="text-gray-mid group-hover:text-white mb-2 transition-colors" />
              <span className="text-[12px] font-dm text-gray-mid group-hover:text-white transition-colors">
                View Post
              </span>
            </motion.div>
          ))}
        </div>

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
          Follow @zen_x_2026 →
        </motion.a>
      </div>
    </section>
  );
}
