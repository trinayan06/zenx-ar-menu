export default function Ticker() {
  const words = [
    'INSTAGRAM GROWTH',
    'DIGITAL SOLUTIONS',
    'SEO & REBUILD',
    'AI-WHATSAPP BOTS',
    'AI-CALLING AGENTS',
    'E-COMMERCE WEBSITES',
    'RESTAURANT AR MENU'
  ];

  const stripText = [...words, ...words, ...words].join(' • ');

  return (
    <div className="w-full bg-[#0A0A0A] overflow-hidden py-3 border-y border-white/5">
      <div className="whitespace-nowrap flex animate-marquee">
        <span className="text-white text-[13px] uppercase tracking-[0.15em] mx-4">
          {stripText} • {stripText}
        </span>
      </div>
    </div>
  );
}
