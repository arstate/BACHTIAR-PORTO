import { useEffect } from 'react';
import Lenis from 'lenis';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import CustomCursor from './components/CustomCursor';
import Background from './components/Background';
import FloatingNavbar from './components/FloatingNavbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Clients from './components/Clients';
import Footer from './components/Footer';
import LazySection from './components/LazySection';
import ThreeDCamera from './components/ThreeDCamera';
import PortfolioGallery from './components/PortfolioGallery';

function Home() {
  return (
    <>
      <Hero />
      
      <LazySection id="about-section" placeholderHeight="100vh" className="relative z-20 overflow-hidden">
        <ThreeDCamera index={0}>
          <About />
        </ThreeDCamera>
      </LazySection>

      <LazySection id="experience-section" placeholderHeight="100vh" className="relative z-20 overflow-hidden">
        <ThreeDCamera index={1}>
          <Experience />
        </ThreeDCamera>
      </LazySection>

      <LazySection id="skills-section" placeholderHeight="100vh" className="relative z-20 overflow-hidden">
        <ThreeDCamera index={2}>
          <Skills />
        </ThreeDCamera>
      </LazySection>

      <LazySection id="portfolio-section" placeholderHeight="100vh" className="relative z-20 overflow-hidden">
        <ThreeDCamera index={3}>
          <Portfolio />
        </ThreeDCamera>
      </LazySection>

      <LazySection id="clients-section" placeholderHeight="50vh" className="relative z-20 overflow-hidden">
        <ThreeDCamera index={4}>
          <Clients />
        </ThreeDCamera>
      </LazySection>

      <LazySection id="footer-section" placeholderHeight="50vh" className="relative z-20 overflow-hidden">
        <ThreeDCamera index={5}>
          <Footer />
        </ThreeDCamera>
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

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <div className="relative min-h-screen w-full overflow-x-hidden selection:bg-blue-500/30 selection:text-white">
        <CustomCursor />
        <FloatingNavbar />
        <Background />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<PortfolioGallery />} />
        </Routes>
      </div>
    </Router>
  );
}
