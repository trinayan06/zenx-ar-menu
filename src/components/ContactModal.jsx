import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const servicesList = [
  'Instagram',
  'AR Menu',
  'Website',
  'Growth',
  'AI Bots',
  'Full Bundle'
];

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    businessName: '',
    name: '',
    phone: '',
    service: ''
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = () => {
    if (!formData.businessName || !formData.name || !formData.phone) {
      alert("Please fill in all required fields.");
      return;
    }

    const message = `Hi ZEN_X!\n\nI want to start my free trial!\n\nBusiness: ${formData.businessName}\nName: ${formData.name}\nPhone: ${formData.phone}\nInterested in: ${formData.service || 'Not specified'}\n\nPlease contact me!`;
    const waUrl = `https://wa.me/919864119506?text=${encodeURIComponent(message)}`;
    
    window.open(waUrl, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#050508]/92 z-[9999] backdrop-blur-sm"
          />
          
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full max-w-[500px] bg-[#0C0C12] border border-accent/30 rounded-[24px] p-8 sm:p-12 relative pointer-events-auto shadow-[0_0_50px_rgba(108,99,255,0.15)]"
            >
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white hover:text-accent transition-colors"
              >
                <X size={24} />
              </button>

              <h2 className="text-[36px] text-white font-syne font-bold mb-2 leading-tight">
                Get Started
              </h2>
              
              <p className="text-gray text-[14px] font-space mb-8">
                Enter your details and we'll get your digital growth started within 24 hours.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-8 text-[13px] font-space text-gray-light">
                <span><span className="text-accent mr-1">✓</span> 15-day free trial</span>
                <span><span className="text-accent mr-1">✓</span> No credit card</span>
                <span><span className="text-accent mr-1">✓</span> Cancel anytime</span>
              </div>

              <div className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Business Name"
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    className="w-full bg-transparent border-b border-white/15 text-white py-3 font-space text-[15px] outline-none focus:border-accent transition-colors"
                  />
                </div>
                
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-transparent border-b border-white/15 text-white py-3 font-space text-[15px] outline-none focus:border-accent transition-colors"
                  />
                </div>
                
                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-transparent border-b border-white/15 text-white py-3 font-space text-[15px] outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div className="pt-4">
                  <label className="text-gray text-[12px] font-space uppercase tracking-wider mb-4 block">Interested In</label>
                  <div className="flex flex-wrap gap-3">
                    {servicesList.map((service) => (
                      <button
                        key={service}
                        onClick={() => setFormData({...formData, service})}
                        className={`text-[13px] font-space py-2.5 px-4 rounded-full border transition-all ${
                          formData.service === service 
                            ? 'bg-accent/20 border-accent text-white shadow-[0_0_15px_rgba(108,99,255,0.3)]' 
                            : 'bg-transparent border-white/10 text-gray hover:border-white/30 hover:text-white'
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full btn-gradient text-white py-[16px] rounded-[10px] font-space font-medium mt-6 transition-all hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(108,99,255,0.4)]"
                >
                  🚀 Start Free Trial — 15 Days Free
                </button>

                <p className="text-center text-[#555] text-[12px] font-space mt-4">
                  We respond within 2 hours · No spam ever
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
