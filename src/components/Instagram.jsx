import { motion } from 'framer-motion';
import { Camera as InstagramIcon } from 'lucide-react';

export default function Instagram() {
  const cards = Array(6).fill(null);

  return (
    <section className="py-24 bg-[#0D0D0D]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <span className="block text-gray-light text-[11px] uppercase tracking-[0.25em] mb-4">SOCIAL</span>
        <h2 className="text-5xl md:text-[64px] text-white font-heading tracking-wide mb-4">
          We Post. You Grow.
        </h2>
        <p className="text-gray-light text-lg mb-16">
          Follow @zen_x_2026 for daily tips, client results, behind-the-scenes
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {cards.map((_, i) => (
            <motion.a
              key={i}
              href="https://www.instagram.com/zen_x_2026"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="aspect-square bg-[#1A1A1A] border border-[#2A2A2A] rounded flex flex-col items-center justify-center hover:border-white transition-colors group"
            >
              <InstagramIcon size={32} className="text-gray-mid group-hover:text-white transition-colors mb-3" />
              <span className="text-sm font-medium text-gray-mid group-hover:text-white transition-colors">
                View Post
              </span>
            </motion.a>
          ))}
        </div>

        <a
          href="https://www.instagram.com/zen_x_2026"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-8 py-3 border border-white text-white rounded-sm font-medium hover:bg-white hover:text-black transition-colors"
        >
          Follow @zen_x_2026 <span className="ml-2">→</span>
        </a>
      </div>
    </section>
  );
}
