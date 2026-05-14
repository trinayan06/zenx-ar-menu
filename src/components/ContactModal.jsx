import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Sparkles, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://qjykkdmujwlkpcdyzeqa.supabase.co',
  'sb_publishable_rUybvqyug25z0OIXaCs25Q_cTmKdC8h'
);

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    businessName: '',
    name: '',
    phone: '',
    interests: []
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from('clients').insert([{
        name: formData.businessName,
        owner_name: formData.name,
        phone: formData.phone,
        plan: formData.interests.join(', ') || 'Website',
        status: 'pending',
        business_type: 'other'
      }]);

      if (error) throw error;

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ businessName: '', name: '', phone: '', interests: [] });
        onClose();
      }, 6000);
    } catch (err) {
      console.error('Error saving lead:', err);
      alert('Something went wrong connecting to the server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-[rgba(0,0,0,0.96)]"
            onClick={onClose}
          ></motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative bg-[#111111] border border-[#2A2A2A] rounded-[24px] w-full max-w-[480px] p-10 z-10 overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-white hover:text-gray-light transition-colors z-20"
            >
              <X size={24} />
            </button>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center justify-center text-center py-8"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: [1.2, 1], rotate: [0, 360] }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="w-24 h-24 bg-white/5 rounded-full border border-white/20 flex items-center justify-center mb-8 relative"
                  >
                    <motion.div 
                      animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }} 
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-full bg-white/10"
                    />
                    <CheckCircle2 className="w-10 h-10 text-white" />
                    <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
                  </motion.div>
                  
                  <h2 className="text-[36px] text-white font-bebas leading-none mb-3 tracking-wide">
                    REQUEST RECEIVED!
                  </h2>
                  <p className="text-gray-400 text-[15px] font-dm mb-10 max-w-[85%] mx-auto leading-relaxed">
                    Welcome to the future. Our team has received your details and will contact you within 2 hours to set up your free trial.
                  </p>
                  
                  <button 
                    onClick={() => { setIsSubmitted(false); onClose(); }}
                    className="bg-white text-black px-8 py-3.5 rounded-full font-bold text-[14px] font-dm hover:bg-gray-200 transition-all w-full tracking-wide"
                  >
                    Return to Website
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="mb-8">
                    <h2 className="text-[36px] text-white font-bebas leading-none mb-2 tracking-wide">Get Started with ZEN_X</h2>
                    <p className="text-gray-light text-[14px] font-dm">
                      Fill out this quick form and we'll reach out to set up your free trial.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-2 mb-8 text-[11px] font-dm text-gray-mid uppercase tracking-wide">
                    <span>✓ 15-day free trial</span>
                    <span>✓ No credit card</span>
                    <span>✓ Cancel anytime</span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="Business Name"
                        required
                        className="w-full bg-transparent border-b border-[#2A2A2A] text-white py-3 outline-none font-dm text-[15px] focus:border-white transition-colors"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                        className="w-full bg-transparent border-b border-[#2A2A2A] text-white py-3 outline-none font-dm text-[15px] focus:border-white transition-colors"
                      />
                    </div>

                    <div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        required
                        className="w-full bg-transparent border-b border-[#2A2A2A] text-white py-3 outline-none font-dm text-[15px] focus:border-white transition-colors"
                      />
                    </div>

                    <div className="pt-2">
                      <label className="block text-white font-dm text-[14px] mb-3">I'm interested in:</label>
                      <div className="flex flex-wrap gap-2">
                        {['Instagram', 'AR Menu', 'Website', 'Growth', 'AI Bots', 'Full Bundle'].map(interest => (
                          <button
                            key={interest}
                            type="button"
                            onClick={() => handleInterestToggle(interest)}
                            className={`px-4 py-2 rounded-full border text-[13px] font-dm transition-colors ${
                              formData.interests.includes(interest)
                                ? 'border-white bg-white text-black'
                                : 'border-[#2A2A2A] text-gray-light hover:border-gray-mid'
                            }`}
                          >
                            {interest}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-white text-black py-[14px] rounded-full font-dm font-bold text-[15px] hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                      >
                        {isSubmitting ? (
                          <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
                        ) : (
                          'Start Free Trial'
                        )}
                      </button>
                      <p className="text-center text-gray-mid text-[11px] font-dm mt-4">
                        We respond within 2 hours · No spam ever
                      </p>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
