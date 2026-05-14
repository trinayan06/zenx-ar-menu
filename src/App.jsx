import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import Portfolio from './components/Portfolio';
import Instagram from './components/Instagram';
import Pricing from './components/Pricing';
import WhyUs from './components/WhyUs';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import About from './components/About';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-black text-white min-h-screen selection:bg-white selection:text-black font-dm">
      <Navbar openModal={openModal} />
      
      <main>
        <Hero openModal={openModal} />
        <Ticker />
        <Services openModal={openModal} />
        <HowItWorks />
        <Portfolio openModal={openModal} />
        <Instagram />
        <Pricing openModal={openModal} />
        <WhyUs />
        <FAQ />
        <CTA openModal={openModal} />
        <About />
      </main>

      <Footer />
      
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
      <WhatsAppButton />
      <ScrollToTop />
    </div>
  );
}

export default App;
