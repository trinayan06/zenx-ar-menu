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
    <footer className="bg-[#050505] border-t border-[#1A1A1A] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <div>
            <img src="/logo.png" height={32} className="h-8 mb-4" alt="ZEN_X" />
            <p className="text-gray-mid text-[13px] max-w-[260px]">
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
                className="text-gray-mid hover:text-gray-light text-sm transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
        
        <div className="border-t border-[#111111] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-mid text-sm">
            © 2026 ZEN_X. Built with ❤️ by Team ZEN_X
          </p>
          
          <a
            href="tel:+919864119506"
            className="flex items-center text-gray-mid hover:text-gray-light text-sm transition-colors"
          >
            <Phone size={14} className="mr-2" /> +91 9864119506
          </a>
        </div>
      </div>
    </footer>
  );
}
