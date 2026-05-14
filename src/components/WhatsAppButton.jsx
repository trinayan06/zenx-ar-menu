import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const handleClick = () => {
    window.open('https://wa.me/919864119506?text=Hi ZEN_X! I want to know more about your services', '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      {/* Tooltip */}
      <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4 bg-[#111111] text-white text-[12px] font-dm px-3 py-1.5 rounded-[4px] border border-[#2A2A2A] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
        Chat on WhatsApp
      </div>
      
      <button
        onClick={handleClick}
        className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-2xl animate-pulse-scale hover:scale-110 transition-transform"
      >
        <MessageCircle size={28} color="#25D366" />
      </button>
    </div>
  );
}
