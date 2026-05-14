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
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="block text-gray-light text-[11px] uppercase tracking-[0.25em] mb-4">PRICING</span>
          <h2 className="text-5xl md:text-[64px] text-white font-heading tracking-wide mb-6">
            Simple Pricing
          </h2>
          
          <div className="inline-flex items-center justify-center border border-[#2A2A2A] rounded px-6 py-2 bg-[#111]">
            <span className="text-gray-light text-sm">
              <span className="mr-2">🎁</span> 15-Day Free Trial — No payment required · Cancel anytime
            </span>
          </div>
        </div>

        {/* Instagram Packages */}
        <h3 className="text-2xl text-white font-heading tracking-wider mb-8 text-center md:text-left">Instagram Packages</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {instaPlans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded flex flex-col p-8 ${
                plan.bestValue 
                  ? 'bg-white text-black scale-100 md:scale-105 z-10 border-none' 
                  : 'bg-[#111] text-white border border-[#2A2A2A]'
              }`}
            >
              {plan.bestValue && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold px-4 py-1 rounded-full whitespace-nowrap">
                  BEST VALUE
                </div>
              )}
              
              <h4 className="font-heading text-3xl mb-2">{plan.name}</h4>
              <div className="mb-8">
                <span className="font-heading text-5xl">{plan.price}</span>
                <span className={`text-base ml-1 ${plan.bestValue ? 'text-gray-mid' : 'text-gray-light'}`}>/month</span>
              </div>
              
              <ul className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check size={16} className={`mr-3 mt-1 shrink-0 ${plan.bestValue ? 'text-black' : 'text-white'}`} />
                    <span className={`text-sm ${plan.bestValue ? 'text-gray-800' : 'text-gray-400'}`}>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={openModal}
                className={`w-full py-3 px-6 rounded-sm font-medium transition-colors ${
                  plan.bestValue 
                    ? 'bg-black text-white hover:bg-gray-800' 
                    : 'bg-white text-black hover:bg-gray-200'
                }`}
              >
                Start Free Trial
              </button>
            </motion.div>
          ))}
        </div>

        {/* AR Menu Pricing */}
        <h3 className="text-2xl text-white font-heading tracking-wider mb-8 text-center md:text-left">AR Menu Pricing</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto md:mx-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#111] border border-[#2A2A2A] rounded p-8 flex flex-col md:flex-row md:items-center justify-between"
          >
            <div className="mb-6 md:mb-0">
              <h4 className="text-xl text-white font-medium mb-2">Maintenance Plan</h4>
              <p className="text-gray-light text-sm max-w-xs">Full AR Menu System, QR Code each table, Unlimited dish listings, Continuous support</p>
            </div>
            <div className="text-left md:text-right">
              <div className="font-heading text-4xl text-white">₹1,200<span className="text-sm font-body text-gray-light ml-1">/month</span></div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#111] border border-[#2A2A2A] rounded p-8 flex flex-col md:flex-row md:items-center justify-between"
          >
            <div className="mb-6 md:mb-0">
              <h4 className="text-xl text-white font-medium mb-2">Per Dish</h4>
              <p className="text-gray-light text-sm max-w-xs">High-quality 3D model, Realistic AR, One-time cost, Pay per dish</p>
            </div>
            <div className="text-left md:text-right">
              <div className="font-heading text-4xl text-white">₹100<span className="text-sm font-body text-gray-light ml-1">/3D dish</span></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
