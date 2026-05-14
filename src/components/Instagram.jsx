import { motion } from 'framer-motion';
import { Camera as InstagramIcon } from 'lucide-react';

const instaImages = [
  { src: "/1.jpg", alt: "ZEN_X Post 1" },
  { src: "/2.jpg", alt: "ZEN_X Post 2" },
  { src: "/3.jpg", alt: "ZEN_X Post 3" },
  { src: "/4.jpg", alt: "ZEN_X Post 4" },
  { src: "/5.jpg", alt: "ZEN_X Post 5" },
];

export default function Instagram() {
  return (
    <section className="py-24 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-[48px] md:text-[64px] text-white font-bebas tracking-wide mb-2">
          We Post. You Grow.
        </h2>
        <p className="text-gray-light font-dm text-[15px] mb-16 max-w-xl mx-auto">
          Follow @zen_x_2026 for daily tips, client results, behind-the-scenes
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
          {instaImages.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative w-full aspect-square rounded-[16px] overflow-hidden cursor-pointer group"
              onClick={() => window.open('https://www.instagram.com/zen_x_2026', '_blank')}
            >
              <img 
                src={post.src} 
                alt={post.alt} 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-400 ease-in-out group-hover:scale-[1.04]" 
              />
              <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out flex flex-col items-center justify-center pointer-events-none">
                <InstagramIcon size={32} className="text-white mb-2" />
                <span className="text-[14px] font-dm text-white font-medium">
                  View Post
                </span>
              </div>
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
          className="inline-flex items-center px-8 py-3 border border-white text-white rounded-full font-dm font-medium text-[14px] hover:bg-white hover:text-black transition-all"
        >
          Follow @zen_x_2026 →
        </motion.a>
      </div>
    </section>
  );
}
