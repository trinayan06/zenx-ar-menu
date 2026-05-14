import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const instaPlans = [
  {
    name: 'Basic',
    price: '₹3,000',
    image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1200&q=100',
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
    image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1200&q=100',
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
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&q=100',
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
          <div className="inline-block border border-[#2A2A2A] rounded-[16px] px-6 py-2 bg-transparent mb-12">
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
              className={`flex flex-col rounded-[16px] overflow-hidden group transition-all duration-300 ${
                plan.bestValue 
                  ? 'bg-white border-none text-black relative z-10 md:scale-[1.04] shadow-2xl' 
                  : 'bg-[#111111] border border-[#2A2A2A] text-white hover:border-gray-mid'
              }`}
            >
              {plan.bestValue && (
                <div className="absolute top-4 right-4 z-20 bg-black text-white text-[10px] font-dm uppercase tracking-widest font-bold px-4 py-1.5 rounded-full whitespace-nowrap shadow-md">
                  BEST VALUE
                </div>
              )}
              
              {/* Image Header */}
              <div className="relative h-[160px] w-full overflow-hidden shrink-0">
                <img 
                  src={plan.image} 
                  alt={plan.name} 
                  loading="lazy" 
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-[0.6s] ease-in-out group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.65)] pointer-events-none"></div>
                {plan.bestValue && (
                  <div className="absolute inset-0 bg-[rgba(196,0,0,0.4)] pointer-events-none"></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-[rgba(0,0,0,0.7)] pointer-events-none"></div>
                
                <div className="absolute bottom-4 left-6 right-6 z-10 flex justify-between items-end">
                  <h4 className="font-bebas text-[28px] text-white leading-none">{plan.name}</h4>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-1">
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
                  className={`w-full py-3 px-6 rounded-full font-dm font-medium text-[14px] transition-colors mt-auto ${
                    plan.bestValue 
                      ? 'bg-black text-white hover:bg-gray-dark' 
                      : 'bg-white text-black hover:bg-gray-200'
                  }`}
                >
                  Start Free Trial
                </button>
              </div>
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
            className="flex flex-col group overflow-hidden bg-[#111111] border border-[#2A2A2A] rounded-[16px] hover:border-gray-mid transition-colors"
          >
            <div className="relative h-[160px] w-full overflow-hidden shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=100" 
                alt="AR Maintenance" 
                loading="lazy" 
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-[0.6s] ease-in-out group-hover:scale-110 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-[rgba(0,0,0,0.65)] pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-[rgba(0,0,0,0.7)] pointer-events-none"></div>
            </div>
            <div className="p-8 flex flex-col md:flex-row md:items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h4 className="text-[20px] text-white font-bebas mb-2">Maintenance Plan</h4>
                <p className="text-gray-light text-[14px] font-dm max-w-sm">Full AR Menu System, QR Code each table, Unlimited dish listings, Continuous support</p>
              </div>
              <div className="text-left md:text-right shrink-0">
                <div className="font-bebas text-[40px] text-white leading-none">₹1,200<span className="text-[14px] font-dm text-gray-light ml-1 lowercase">/month</span></div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col group overflow-hidden bg-[#111111] border border-[#2A2A2A] rounded-[16px] hover:border-gray-mid transition-colors"
          >
            <div className="relative h-[160px] w-full overflow-hidden shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=100" 
                alt="Per Dish" 
                loading="lazy" 
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-[0.6s] ease-in-out group-hover:scale-110 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-[rgba(0,0,0,0.65)] pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-[rgba(0,0,0,0.7)] pointer-events-none"></div>
            </div>
            <div className="p-8 flex flex-col md:flex-row md:items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h4 className="text-[20px] text-white font-bebas mb-2">Per Dish</h4>
                <p className="text-gray-light text-[14px] font-dm max-w-sm">High-quality 3D model, Realistic AR, One-time cost, Pay per dish</p>
              </div>
              <div className="text-left md:text-right shrink-0">
                <div className="font-bebas text-[40px] text-white leading-none">₹100<span className="text-[14px] font-dm text-gray-light ml-1 lowercase">/3D dish</span></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
