import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import TiltCard from './TiltCard';

const instaPlans = [
  {
    name: 'Basic',
    price: '₹3,000',
    features: [
      '12 posts/month',
      'Basic photo editing (Canva)',
      'Captions & hashtags',
      'Stories 3x/week',
      'Reply to comments'
    ],
    bestValue: false
  },
  {
    name: 'Standard',
    price: '₹5,000',
    features: [
      '20 posts/month',
      'Professional photo editing',
      '4 reels/month',
      'Daily stories',
      'Hashtag research',
      'Monthly growth report'
    ],
    bestValue: true
  },
  {
    name: 'Premium',
    price: '₹8,000',
    features: [
      'Daily posts',
      '8 reels/month',
      'Daily stories',
      'Ad management',
      'Competitor analysis',
      'Weekly reports',
      '🎁 FREE AR Menu included'
    ],
    bestValue: false
  }
];

export default function Pricing({ openModal }) {
  return (
    <section id="pricing" className="py-32 bg-bg relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full filter blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent2/10 rounded-full filter blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <span className="block text-accent font-bebas text-[13px] uppercase tracking-[0.3em] mb-4">PRICING</span>
          <h2 className="text-[48px] md:text-[64px] text-white font-syne font-extrabold tracking-wide mb-8">
            Simple Pricing
          </h2>
          
          <div className="inline-flex items-center justify-center border border-accent/30 rounded-full px-6 py-2 bg-accent/5 backdrop-blur-sm">
            <span className="text-gray-light text-[14px] font-space">
              <span className="mr-2">🎁</span> 15-Day Free Trial — No payment required · Cancel anytime
            </span>
          </div>
        </div>

        {/* Instagram Packages */}
        <h3 className="text-[28px] text-white font-syne font-bold tracking-wide mb-10 text-center md:text-left">Instagram Packages</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {instaPlans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
              className="flex"
            >
              <TiltCard 
                className={`w-full flex flex-col p-10 ${
                  plan.bestValue 
                    ? 'bg-gradient-to-br from-accent/20 to-accent2/10 border-accent/50 md:scale-105 shadow-[0_0_30px_rgba(108,99,255,0.15)] z-20' 
                    : 'z-10'
                }`}
              >
                {plan.bestValue && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 btn-gradient text-white text-[12px] font-space font-bold px-5 py-1.5 rounded-full whitespace-nowrap shadow-lg">
                    BEST VALUE
                  </div>
                )}
                
                <h4 className="font-syne font-bold text-[28px] text-white mb-2">{plan.name}</h4>
                <div className="mb-10 flex items-baseline">
                  <span className="font-bebas text-[56px] text-white leading-none">{plan.price}</span>
                  <span className="text-[15px] font-space ml-2 text-gray">/month</span>
                </div>
                
                <ul className="flex-1 space-y-5 mb-10">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check size={18} className="mr-3 mt-0.5 shrink-0 text-accent" />
                      <span className="text-[15px] font-space text-gray-light">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={openModal}
                  className={`w-full py-[14px] px-6 rounded-[10px] font-space font-medium transition-all hover:scale-[1.03] mt-auto ${
                    plan.bestValue 
                      ? 'btn-gradient text-white shadow-[0_0_20px_rgba(108,99,255,0.4)]' 
                      : 'border border-white/20 bg-transparent text-white hover:bg-white/10'
                  }`}
                >
                  Start Free Trial
                </button>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* AR Menu Pricing */}
        <h3 className="text-[28px] text-white font-syne font-bold tracking-wide mb-10 text-center md:text-left">AR Menu Pricing</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto md:mx-0">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <TiltCard className="p-8 flex flex-col md:flex-row md:items-center justify-between h-full">
              <div className="mb-6 md:mb-0">
                <h4 className="text-[22px] text-white font-syne font-bold mb-3">Maintenance Plan</h4>
                <p className="text-gray text-[15px] font-space max-w-xs leading-relaxed">Full AR Menu System, QR Code each table, Unlimited dish listings, Continuous support</p>
              </div>
              <div className="text-left md:text-right shrink-0">
                <div className="font-bebas text-[48px] text-white leading-none">₹1,200<span className="text-[14px] font-space text-gray ml-1 uppercase tracking-wider">/month</span></div>
              </div>
            </TiltCard>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          >
            <TiltCard className="p-8 flex flex-col md:flex-row md:items-center justify-between h-full">
              <div className="mb-6 md:mb-0">
                <h4 className="text-[22px] text-white font-syne font-bold mb-3">Per Dish</h4>
                <p className="text-gray text-[15px] font-space max-w-xs leading-relaxed">High-quality 3D model, Realistic AR, One-time cost, Pay per dish</p>
              </div>
              <div className="text-left md:text-right shrink-0">
                <div className="font-bebas text-[48px] text-white leading-none">₹100<span className="text-[14px] font-space text-gray ml-1 uppercase tracking-wider">/3D dish</span></div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
