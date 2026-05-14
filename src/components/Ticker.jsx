export default function Ticker() {
  const text = 'INSTAGRAM GROWTH • DIGITAL SOLUTIONS • SEO & REBUILD • AI-WHATSAPP BOTS • AI-CALLING AGENTS • E-COMMERCE WEBSITES • RESTAURANT AR MENU • ';
  const fullStrip = text + text + text + text;

  return (
    <div className="w-full bg-[#0A0A0A] overflow-hidden py-3">
      <div className="whitespace-nowrap flex animate-marquee">
        <span className="text-white text-[13px] font-dm uppercase tracking-[0.15em] mx-2">
          {fullStrip}
        </span>
        <span className="text-white text-[13px] font-dm uppercase tracking-[0.15em] mx-2">
          {fullStrip}
        </span>
      </div>
    </div>
  );
}
