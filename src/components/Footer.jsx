import { Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#050505] pt-16 pb-8 border-t border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
          <div className="mb-8 md:mb-0">
            <img src="/logo.png" alt="ZEN_X Logo" className="h-[64px] md:h-[80px] w-auto mb-4" />
            <p className="text-gray-mid font-dm text-[13px]">
              Digital Solutions for Businesses
            </p>
          </div>
          
          <nav className="flex flex-wrap gap-x-8 gap-y-4">
            <a href="#services" className="text-gray-mid hover:text-gray-light font-dm text-[13px] transition-colors">Services</a>
            <a href="#how-it-works" className="text-gray-mid hover:text-gray-light font-dm text-[13px] transition-colors">How It Works</a>
            <a href="#pricing" className="text-gray-mid hover:text-gray-light font-dm text-[13px] transition-colors">Pricing</a>
            <a href="#why-us" className="text-gray-mid hover:text-gray-light font-dm text-[13px] transition-colors">Why Us</a>
            <a href="#about" className="text-gray-mid hover:text-gray-light font-dm text-[13px] transition-colors">About Us</a>
            <a href="#portfolio" className="text-gray-mid hover:text-gray-light font-dm text-[13px] transition-colors">AR Demo</a>
            <a href="https://www.instagram.com/zen_x_2026" target="_blank" rel="noopener noreferrer" className="text-gray-mid hover:text-gray-light font-dm text-[13px] transition-colors">Instagram</a>
          </nav>
        </div>

        <div className="border-t border-[#111111] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-mid font-dm text-[13px]">
            © 2026 ZEN_X. Built with ❤️ by Team ZEN_X
          </p>
          <a href="tel:+919864119506" className="flex items-center text-gray-mid hover:text-gray-light font-dm text-[13px] transition-colors">
            <Phone size={14} className="mr-2" />
            +91 9864119506
          </a>
        </div>
      </div>
    </footer>
  );
}
