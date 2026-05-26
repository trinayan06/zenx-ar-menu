import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import Portfolio from './components/Portfolio';
import CaseStudySection from './components/CaseStudySection';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import About from './components/About';
import WhyUs from './components/WhyUs';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';
import SuperAdminDashboard from './components/SuperAdminDashboard';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdminPath, setIsAdminPath] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the current URL path is /admin or /superadmin or /superadmin.html
    const path = window.location.pathname.toLowerCase();
    setIsAdminPath(path === '/admin' || path === '/superadmin' || path === '/superadmin.html');

    // Preloader timeout
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // If on /admin path, ONLY render the Super Admin Dashboard
  if (isAdminPath) {
    return <SuperAdminDashboard />;
  }

  // Otherwise, render the main ZenX Landing Page
  return (
    <div className="bg-white text-[#1A1A1A] min-h-screen font-dm">
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" />}
      </AnimatePresence>
      
      <Navbar openModal={openModal} />
      
      <main>
        <Hero openModal={openModal} />
        <Ticker />
        <Services openModal={openModal} />
        <Portfolio openModal={openModal} />
        <CaseStudySection />
        <Testimonials />
        <HowItWorks />
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
