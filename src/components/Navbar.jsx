import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { name: 'Services', href: '#services' },
  { name: 'Work', href: '#work' },
  { name: 'Process', href: '#how-it-works' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'FAQ', href: '#faq' },
];

export default function Navbar({ openModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Services');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-300 ${scrolled ? 'backdrop-blur-md' : ''}`}
        style={{
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 32px',
          borderBottom: scrolled ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid transparent',
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.75)' : 'transparent',
        }}
      >
        <div style={{ maxWidth: '1400px' }} className="mx-auto w-full flex items-center justify-between">
          <a href="#" className="flex flex-col flex-shrink-0">
            <span className="font-dm font-extrabold text-[24px] tracking-tight text-black leading-none">
              ZEN_X
            </span>
            <span className="font-dm text-[9px] uppercase tracking-[0.25em] text-[#666666] mt-1">
              Digital Agency
            </span>
          </a>

          <div className="hidden md:flex items-center space-x-2">
            {links.map((link) => {
              const isActive = activeLink === link.name;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveLink(link.name)}
                  className={`font-dm font-medium text-[14px] uppercase px-4 py-2 transition-all duration-300`}
                  style={{
                    color: isActive ? '#FFFFFF' : '#1A1A1A',
                    backgroundColor: isActive ? '#0D0D0D' : 'transparent',
                    borderRadius: '999px',
                  }}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          <div className="hidden md:block">
            <button
              onClick={openModal}
              className="bg-black text-white font-dm font-bold text-[14px] uppercase px-6 py-3 transition-colors duration-300 hover:bg-[#C8F000] hover:text-black"
              style={{ borderRadius: '999px' }}
            >
              Start Free Trial
            </button>
          </div>

          <button
            className="md:hidden text-[#1A1A1A]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="fixed inset-0 z-[90] bg-white flex flex-col items-center justify-center space-y-8"
          >
            <div className="flex flex-col items-center space-y-6 mt-16">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#1A1A1A] text-[24px] font-dm font-bold uppercase tracking-wide hover:text-[#C8F000] transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openModal();
                }}
                className="bg-black text-white px-8 py-4 font-dm font-bold mt-8 text-[16px] uppercase hover:bg-[#C8F000] hover:text-black transition-colors"
                style={{ borderRadius: '999px' }}
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
