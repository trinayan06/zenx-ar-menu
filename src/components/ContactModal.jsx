import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    businessName: '',
    name: '',
    phone: '',
    interests: []
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission or Supabase logic
    alert('Thank you! We will contact you shortly.');
    onClose();
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
            className="relative bg-[#111111] border border-[#2A2A2A] rounded-[24px] w-full max-w-[480px] p-10 z-10"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-white hover:text-gray-light transition-colors"
            >
              <X size={24} />
            </button>

            <div className="mb-8">
              <h2 className="text-[36px] text-white font-bebas leading-none mb-2">Get Started with ZEN_X</h2>
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
                  className="w-full bg-white text-black py-[14px] rounded-full font-dm font-medium text-[15px] hover:bg-gray-200 transition-colors"
                >
                  Start Free Trial
                </button>
                <p className="text-center text-gray-mid text-[11px] font-dm mt-4">
                  We respond within 2 hours · No spam ever
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
