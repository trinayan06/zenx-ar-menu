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

  const stripText = words.join(' ✦ ') + ' ✦ ';
  const fullStrip = stripText + stripText + stripText + stripText;

  return (
    <div className="w-full bg-[#0C0C12] overflow-hidden py-3 border-y border-white/[0.06]">
      <div className="whitespace-nowrap flex animate-marquee">
        <span className="text-[#6C63FF] text-[16px] font-bebas uppercase tracking-[0.2em] mx-4">
          {fullStrip}
        </span>
        <span className="text-[#6C63FF] text-[16px] font-bebas uppercase tracking-[0.2em] mx-4">
          {fullStrip}
        </span>
      </div>
    </div>
  );
}
