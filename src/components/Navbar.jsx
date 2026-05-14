import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { name: 'Services', href: '#services' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Why Us', href: '#why-us' },
  { name: 'FAQ', href: '#faq' },
];

export default function Navbar({ openModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-[100] w-full"
        style={{ background: 'rgba(8,8,8,0.92)', backdropFilter: 'blur(12px)' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex-shrink-0 relative z-[200]">
            <img src="/logo.png" className="h-[64px] md:h-[80px] w-auto" alt="ZEN_X" />
          </a>

          <motion.div
            variants={containerVars}
            initial="hidden"
            animate="show"
            className="hidden md:flex items-center space-x-8"
          >
            {links.map((link) => (
              <motion.a
                variants={itemVars}
                key={link.name}
                href={link.href}
                className="text-[12px] text-gray-light font-dm uppercase tracking-[0.1em] hover:text-white transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>

          <div className="hidden md:block">
            <button
              onClick={openModal}
              className="bg-white text-black font-dm font-medium text-[14px] px-6 py-2.5 rounded-[2px] transition-all hover:bg-gray-200"
            >
              Start Free Trial
            </button>
          </div>

          <button
            className="md:hidden text-white relative z-[200]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[150] bg-black flex flex-col items-center justify-center space-y-8"
          >
            <div className="flex flex-col items-center space-y-8 mt-16">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white text-[24px] font-bebas tracking-wide hover:text-gray-light transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openModal();
                }}
                className="bg-white text-black px-8 py-4 rounded-[2px] font-dm font-medium mt-8 text-[16px]"
              >
                Start Free Trial
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
