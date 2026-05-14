import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const handleClick = () => {
    window.open('https://wa.me/919864119506?text=Hi ZEN_X! I want to know more about your services', '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[90]">
      <div className="relative group flex items-center">
        <div className="absolute right-[70px] bg-[#12121A] border border-white/10 text-white text-[13px] font-space px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
          Chat on WhatsApp
        </div>
        
        <button
          onClick={handleClick}
          className="w-[58px] h-[58px] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.4)] animate-pulse-scale cursor-pointer"
          style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
        >
          <MessageCircle size={26} className="text-white" />
        </button>
      </div>
    </div>
  );
}
