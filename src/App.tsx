import { useEffect } from 'react';
import Lenis from 'lenis';

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
    <div className="relative min-h-screen selection:bg-blue-500/30 selection:text-white">
      <CustomCursor />
      <FloatingNavbar />
      <Background />
      <Hero />
      <ThreeDCamera index={0} className="relative z-20">
        <LazySection id="about-section" placeholderHeight="100vh">
          <About />
        </LazySection>
      </ThreeDCamera>
      <ThreeDCamera index={1} className="relative z-20">
        <LazySection id="experience-section" placeholderHeight="100vh">
          <Experience />
        </LazySection>
      </ThreeDCamera>
      <ThreeDCamera index={2} className="relative z-20">
        <LazySection id="skills-section" placeholderHeight="100vh">
          <Skills />
        </LazySection>
      </ThreeDCamera>
      <ThreeDCamera index={3} className="relative z-20">
        <LazySection id="portfolio-section" placeholderHeight="100vh">
          <Portfolio />
        </LazySection>
      </ThreeDCamera>
      <ThreeDCamera index={4} className="relative z-20">
        <LazySection id="clients-section" placeholderHeight="50vh">
          <Clients />
        </LazySection>
      </ThreeDCamera>
      <ThreeDCamera index={5} className="relative z-20">
        <LazySection id="footer-section" placeholderHeight="50vh">
          <Footer />
        </LazySection>
      </ThreeDCamera>
    </div>
  );
}
