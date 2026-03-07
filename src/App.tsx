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
import Footer from './components/Footer';

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
      <About />
      <Experience />
      <Skills />
      <Portfolio />
      <Footer />
    </div>
  );
}
