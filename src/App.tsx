import { useEffect } from 'react';
import Lenis from 'lenis';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Background from './components/Background';
import FloatingNavbar from './components/FloatingNavbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Clients from './components/Clients';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import LazySection from './components/LazySection';
import PortfolioGallery from './components/PortfolioGallery';
import PortfolioHub from './components/PortfolioHub';
import PortfolioPage from './components/PortfolioPage';
import MotionPage from './components/MotionPage';
import BTSPage from './components/BTSPage';
import DesignPage from './components/DesignPage';
import PageTransitionOverlay from './components/PageTransitionOverlay';
import CustomScrollbar from './components/CustomScrollbar';

function Home() {
  return (
    <>
      <Hero />

      <LazySection id="about-section" placeholderHeight="100vh" className="relative z-20 overflow-hidden">
        <About />
      </LazySection>

      <LazySection id="experience-section" placeholderHeight="100vh" className="relative z-20 overflow-hidden">
        <Experience />
      </LazySection>

      <LazySection id="skills-section" placeholderHeight="100vh" className="relative z-20 overflow-hidden">
        <Skills />
      </LazySection>

      <LazySection id="portfolio-section" placeholderHeight="100vh" className="relative z-20 overflow-hidden">
        <Portfolio />
      </LazySection>

      <LazySection id="clients-section" placeholderHeight="50vh" className="relative z-20 overflow-hidden">
        <Clients />
      </LazySection>

      <LazySection id="contact-form-section" placeholderHeight="50vh" className="relative z-20 overflow-hidden">
        <ContactForm />
      </LazySection>

      <LazySection id="footer-section" placeholderHeight="50vh" className="relative z-20 overflow-hidden">
        <Footer />
      </LazySection>
    </>
  );
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    let reqId: number;

    function raf(time: number) {
      lenis.raf(time);
      reqId = requestAnimationFrame(raf);
    }

    reqId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(reqId);
    };
  }, []);

  return (
    <Router>
      <div className="relative min-h-screen w-full overflow-x-hidden selection:bg-blue-500/30 selection:text-white">
        <CustomScrollbar />
        <FloatingNavbar />
        <PageTransitionOverlay />
        <Background />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<PortfolioHub />} />
          <Route path="/gallery" element={<PortfolioGallery />} />
          <Route path="/videography" element={<PortfolioPage />} />
          <Route path="/motion" element={<MotionPage />} />
          <Route path="/bts" element={<BTSPage />} />
          <Route path="/bts/:videoId" element={<BTSPage />} />
          <Route path="/design" element={<DesignPage />} />
        </Routes>
      </div>
    </Router>
  );
}
