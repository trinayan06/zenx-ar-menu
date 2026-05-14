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
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#050508]/80 backdrop-blur-[24px] border-b border-white/10 py-3' 
            : 'bg-[#050508]/40 backdrop-blur-md border-b border-white/[0.06] py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex-shrink-0 relative z-[200]">
            <img src="/logo.png" height={38} className="h-[38px] w-auto" alt="ZEN_X" />
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[14px] text-[#888899] font-space tracking-[0.05em] hover:text-white hover:underline decoration-accent underline-offset-4 transition-all"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <button
              onClick={openModal}
              className="btn-gradient text-white font-space font-medium text-[15px] px-[22px] py-[10px] rounded-[8px] transition-all hover:scale-105 hover:shadow-[0_0_24px_rgba(108,99,255,0.5)]"
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
            className="fixed inset-0 z-[150] bg-[#050508] flex flex-col items-center justify-center space-y-8"
          >
            <div className="flex flex-col items-center space-y-8 mt-16">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white text-[28px] font-syne font-bold hover:text-accent transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openModal();
                }}
                className="btn-gradient text-white px-8 py-4 rounded-xl font-space font-medium mt-8 text-lg"
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
