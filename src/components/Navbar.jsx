import { useState, useEffect } from 'react';
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-colors duration-300 ${
          isScrolled ? 'bg-[#080808]/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex-shrink-0">
            <img src="/logo.png" height={36} className="h-9" alt="ZEN_X" />
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {links.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="text-gray-light hover:text-white uppercase tracking-[0.1em] text-xs transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="hidden md:block"
          >
            <button
              onClick={openModal}
              className="bg-white text-black px-6 py-2.5 rounded-sm text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Start Free Trial
            </button>
          </motion.div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-[#080808] flex flex-col items-center justify-center space-y-8"
          >
            <button
              className="absolute top-6 right-6 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
            <div className="flex flex-col items-center space-y-6">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white text-2xl uppercase tracking-[0.1em] font-heading"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openModal();
                }}
                className="bg-white text-black px-8 py-3 rounded-sm font-medium mt-4 text-lg uppercase tracking-wider font-heading"
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
