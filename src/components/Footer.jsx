import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const links = {
    sitemap: [
      { name: 'Services', href: '#services' },
      { name: 'Work', href: '#work' },
      { name: 'Process', href: '#how-it-works' },
      { name: 'Pricing', href: '#pricing' },
    ],
    connect: [
      { name: 'Email', href: 'mailto:contact@zenx.com' },
      { name: 'Instagram', href: 'https://www.instagram.com/zen_x_2026' },
      { name: 'WhatsApp', href: 'https://wa.me/919864119506' },
    ]
  };

  return (
    <footer className="w-full bg-white pt-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between mb-24 gap-16">
          {/* Left Column */}
          <div className="lg:w-1/2">
            <div className="mb-12">
              <span className="font-dm font-extrabold text-[32px] tracking-tight text-black leading-none block">
                ZEN_X
              </span>
              <span className="font-dm text-[11px] uppercase tracking-[0.25em] text-[#666666] font-bold">
                Digital Agency
              </span>
            </div>
            
            <h2 className="font-dm font-extrabold text-black text-[48px] md:text-[64px] leading-[1.1] tracking-tight mb-8">
              Let's build <br />
              <span className="italic text-[#5B6AF0]">something great.</span>
            </h2>
            
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 font-dm font-bold text-[18px] text-black hover:text-[#5B6AF0] transition-colors border-b-2 border-black hover:border-[#5B6AF0] pb-1"
            >
              Start a Project <ArrowUpRight size={20} />
            </a>
          </div>

          {/* Right Column */}
          <div className="lg:w-1/2 flex flex-wrap gap-12 lg:gap-24">
            <div>
              <h4 className="font-dm font-bold text-[#1A1A1A] text-[14px] uppercase tracking-wider mb-6">Sitemap</h4>
              <ul className="space-y-4">
                {links.sitemap.map(link => (
                  <li key={link.name}>
                    <a href={link.href} className="font-dm font-medium text-[#666666] text-[15px] hover:text-[#C8F000] transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-dm font-bold text-[#1A1A1A] text-[14px] uppercase tracking-wider mb-6">Connect</h4>
              <ul className="space-y-4">
                {links.connect.map(link => (
                  <li key={link.name}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="font-dm font-medium text-[#666666] text-[15px] hover:text-[#5B6AF0] transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-dm font-bold text-[#1A1A1A] text-[14px] uppercase tracking-wider mb-6">Location</h4>
              <p className="font-dm font-medium text-[#666666] text-[15px]">
                Guwahati,<br />Assam, India
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-[#E8E8E8] mb-12"></div>

        {/* Bottom Marquee Text */}
        <div className="relative mb-12 overflow-hidden w-full h-[80px] md:h-[140px] flex items-center">
          <div className="absolute whitespace-nowrap flex animate-marquee" style={{ animationDuration: '80s' }}>
            <span 
              className="font-dm font-extrabold uppercase mx-4"
              style={{
                fontSize: 'clamp(48px, 8vw, 120px)',
                WebkitTextStroke: '2px #EBEBEB',
                color: 'transparent'
              }}
            >
              INSTAGRAM MANAGEMENT ✦ WEBSITE DEVELOPMENT ✦ AR MENUS ✦ WHATSAPP AUTOMATION ✦&nbsp;
            </span>
            <span 
              className="font-dm font-extrabold uppercase mx-4"
              style={{
                fontSize: 'clamp(48px, 8vw, 120px)',
                WebkitTextStroke: '2px #EBEBEB',
                color: 'transparent'
              }}
            >
              INSTAGRAM MANAGEMENT ✦ WEBSITE DEVELOPMENT ✦ AR MENUS ✦ WHATSAPP AUTOMATION ✦&nbsp;
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center py-6 border-t border-[#E8E8E8]">
          <p className="font-dm font-bold text-[#888888] text-[11px] uppercase tracking-widest mb-4 md:mb-0">
            © 2026 ZEN_X AGENCY · ALL RIGHTS RESERVED
          </p>
          <a href="/admin" className="font-dm font-bold text-[#1A1A1A] text-[11px] uppercase tracking-widest hover:text-[#C8F000] transition-colors">
            ADMIN LOGIN
          </a>
        </div>
      </div>
    </footer>
  );
}
