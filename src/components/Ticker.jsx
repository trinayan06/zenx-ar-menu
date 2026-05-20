export default function Ticker() {
  const items = ['INSTAGRAM MANAGEMENT', 'WEBSITE DEVELOPMENT', 'AR MENUS', 'WHATSAPP AUTOMATION', 'DIGITAL GROWTH'];
  const separator = ' ✦ ';
  const text = items.join(separator) + separator;
  const fullStrip = text + text + text + text;

  return (
    <div className="relative w-full overflow-hidden h-[240px] md:h-[300px] flex items-center justify-center bg-white select-none pointer-events-none">
      
      {/* Stripe 1 (Lime green, tilted -3deg, scrolls left, lower z-index) */}
      <div 
        className="absolute w-[115%] left-[-7.5%] overflow-hidden py-4 md:py-5 flex items-center shadow-md"
        style={{ 
          background: '#C8F000',
          transform: 'rotate(-3.5deg)',
          zIndex: 4,
        }}
      >
        <div className="whitespace-nowrap flex animate-marquee" style={{ animationDuration: '40s' }}>
          <span 
            className="text-[#0D0D0D] font-dm font-extrabold uppercase tracking-tight mx-2"
            style={{ fontSize: 'clamp(22px, 2.8vw, 36px)' }}
          >
            {fullStrip}
          </span>
          <span 
            className="text-[#0D0D0D] font-dm font-extrabold uppercase tracking-tight mx-2"
            style={{ fontSize: 'clamp(22px, 2.8vw, 36px)' }}
          >
            {fullStrip}
          </span>
        </div>
      </div>

      {/* Stripe 2 (Black, tilted 3.5deg, scrolls right, higher z-index with drop-shadow) */}
      <div 
        className="absolute w-[115%] left-[-7.5%] overflow-hidden py-4 md:py-5 flex items-center shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
        style={{ 
          background: '#0D0D0D',
          transform: 'rotate(3.5deg)',
          zIndex: 5,
          borderTop: '1.5px solid rgba(255,255,255,0.05)',
          borderBottom: '1.5px solid rgba(255,255,255,0.05)'
        }}
      >
        <div className="whitespace-nowrap flex animate-marquee-reverse" style={{ animationDuration: '40s' }}>
          <span 
            className="text-[#C8F000] font-dm font-extrabold uppercase tracking-tight mx-2"
            style={{ fontSize: 'clamp(22px, 2.8vw, 36px)' }}
          >
            {fullStrip}
          </span>
          <span 
            className="text-[#C8F000] font-dm font-extrabold uppercase tracking-tight mx-2"
            style={{ fontSize: 'clamp(22px, 2.8vw, 36px)' }}
          >
            {fullStrip}
          </span>
        </div>
      </div>

    </div>
  );
}
