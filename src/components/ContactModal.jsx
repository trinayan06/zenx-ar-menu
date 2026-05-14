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
    // Basic validation
    if (!formData.businessName || !formData.name || !formData.phone) {
      alert("Please fill in all required fields.");
      return;
    }

    // Logic to send to WhatsApp / Supabase based on previous instructions
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
            className="fixed inset-0 bg-black/95 z-[1000]"
          />
          
          <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-[480px] bg-[#111] border border-[#2A2A2A] rounded p-8 sm:p-12 relative pointer-events-auto shadow-2xl"
            >
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white hover:text-gray-light transition-colors"
              >
                <X size={24} />
              </button>

              <h2 className="text-4xl text-white font-heading tracking-wide mb-2">
                Get Started with ZEN_X
              </h2>
              
              <p className="text-gray-light text-sm mb-6">
                Enter your details and we'll get your digital growth started within 24 hours.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-8 text-xs text-gray-light">
                <span><span className="text-white mr-1">✓</span> 15-day free trial</span>
                <span><span className="text-white mr-1">✓</span> No credit card</span>
                <span><span className="text-white mr-1">✓</span> Cancel anytime</span>
              </div>

              <div className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Business Name"
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    className="w-full bg-transparent border-b border-[#2A2A2A] text-white py-3 outline-none focus:border-white transition-colors"
                  />
                </div>
                
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-transparent border-b border-[#2A2A2A] text-white py-3 outline-none focus:border-white transition-colors"
                  />
                </div>
                
                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-transparent border-b border-[#2A2A2A] text-white py-3 outline-none focus:border-white transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <label className="text-gray-light text-xs uppercase tracking-wider mb-3 block">Interested In</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {servicesList.map((service) => (
                      <button
                        key={service}
                        onClick={() => setFormData({...formData, service})}
                        className={`text-xs py-2 px-3 rounded border transition-colors text-left ${
                          formData.service === service 
                            ? 'bg-white/10 border-white text-white' 
                            : 'bg-transparent border-[#2A2A2A] text-gray-light hover:border-gray-mid'
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-white text-black py-4 rounded-sm font-medium mt-4 hover:bg-gray-200 transition-colors"
                >
                  🚀 Start Free Trial — 15 Days Free
                </button>

                <p className="text-center text-gray-dark text-[11px] mt-4">
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
