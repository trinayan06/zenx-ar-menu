import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const handleClick = () => {
    window.open('https://wa.me/919864119506?text=Hi ZEN_X! I want to know more about your services', '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[90]">
      <div className="relative group">
        <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#1A1A1A] text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat on WhatsApp
        </div>
        
        <button
          onClick={handleClick}
          className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-2xl animate-pulse-scale hover:scale-110 transition-transform"
        >
          <MessageCircle size={28} className="text-[#25D366]" />
        </button>
      </div>
    </div>
  );
}
