import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

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
    <section id="pricing" className="py-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <div className="inline-block border border-[#2A2A2A] rounded-[4px] px-6 py-2 bg-transparent mb-12">
            <span className="text-gray-light text-[13px] font-dm">
              🎁 15-Day Free Trial — No payment required · Cancel anytime
            </span>
          </div>
        </div>

        {/* Instagram Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 items-end">
          {instaPlans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className={`flex flex-col p-8 rounded-[4px] ${
                plan.bestValue 
                  ? 'bg-white border-none text-black relative z-10 md:scale-[1.04] shadow-2xl' 
                  : 'bg-[#111111] border border-[#2A2A2A] text-white'
              }`}
            >
              {plan.bestValue && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-dm uppercase tracking-widest font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                  BEST VALUE
                </div>
              )}
              
              <h4 className="font-bebas text-[28px] mb-4">{plan.name}</h4>
              <div className="mb-8 flex items-baseline">
                <span className="font-bebas text-[48px] leading-none">{plan.price}</span>
                <span className={`text-[16px] font-dm ml-2 ${plan.bestValue ? 'text-gray-mid' : 'text-gray-light'}`}>/month</span>
              </div>
              
              <ul className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check size={14} className={`mr-3 mt-1 shrink-0 ${plan.bestValue ? 'text-black' : 'text-white'}`} />
                    <span className={`text-[14px] font-dm ${plan.bestValue ? 'text-gray-dark' : 'text-gray-light'}`}>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={openModal}
                className={`w-full py-3 px-6 rounded-[2px] font-dm font-medium text-[14px] transition-colors mt-auto ${
                  plan.bestValue 
                    ? 'bg-black text-white hover:bg-gray-dark' 
                    : 'bg-white text-black hover:bg-gray-200'
                }`}
              >
                Start Free Trial
              </button>
            </motion.div>
          ))}
        </div>

        {/* AR Menu Pricing */}
        <h3 className="text-[28px] text-white font-bebas tracking-wide mb-8 text-center md:text-left">AR Menu Pricing</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 flex flex-col md:flex-row md:items-center justify-between bg-[#111111] border border-[#2A2A2A] rounded-[4px]"
          >
            <div className="mb-6 md:mb-0">
              <h4 className="text-[20px] text-white font-bebas mb-2">Maintenance Plan</h4>
              <p className="text-gray-light text-[14px] font-dm max-w-sm">Full AR Menu System, QR Code each table, Unlimited dish listings, Continuous support</p>
            </div>
            <div className="text-left md:text-right shrink-0">
              <div className="font-bebas text-[40px] text-white leading-none">₹1,200<span className="text-[14px] font-dm text-gray-light ml-1 lowercase">/month</span></div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-8 flex flex-col md:flex-row md:items-center justify-between bg-[#111111] border border-[#2A2A2A] rounded-[4px]"
          >
            <div className="mb-6 md:mb-0">
              <h4 className="text-[20px] text-white font-bebas mb-2">Per Dish</h4>
              <p className="text-gray-light text-[14px] font-dm max-w-sm">High-quality 3D model, Realistic AR, One-time cost, Pay per dish</p>
            </div>
            <div className="text-left md:text-right shrink-0">
              <div className="font-bebas text-[40px] text-white leading-none">₹100<span className="text-[14px] font-dm text-gray-light ml-1 lowercase">/3D dish</span></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
