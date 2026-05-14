import { Phone } from 'lucide-react';

const links = [
  { name: 'Services', href: '#services' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Why Us', href: '#why-us' },
  { name: 'About Us', href: '#about-us' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Instagram', href: 'https://www.instagram.com/zen_x_2026', external: true }
];

export default function Footer() {
  return (
    <footer className="bg-[#030305] border-t border-white/[0.06] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <div>
            <img src="/logo.png" height={36} className="h-[36px] mb-4" alt="ZEN_X" />
            <p className="text-gray text-[13px] font-space max-w-[260px]">
              Digital Solutions for Businesses
            </p>
          </div>
          
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.external ? "_blank" : "_self"}
                rel={link.external ? "noopener noreferrer" : ""}
                className="text-[#666] hover:text-white text-[14px] font-space transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
        
        <div className="border-t border-[#111] pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-[#666] text-[13px] font-space">
            Built with ❤️ by Team ZEN_X — Trinayan Mahanta, Snehangshu Das, Mannat Sahu, Aditya Pragyan
          </p>
          
          <a
            href="tel:+919864119506"
            className="flex items-center text-[#666] hover:text-white text-[14px] font-space transition-colors"
          >
            <Phone size={14} className="mr-2" /> +91 9864119506
          </a>
        </div>
      </div>
    </footer>
  );
}
