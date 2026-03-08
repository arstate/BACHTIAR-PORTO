import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import React, { useState } from 'react';

const FloatingNavbar = () => {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show navbar after scrolling past 80vh (roughly past the main hero text)
    if (latest > window.innerHeight * 0.8) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  const navLinks = [
    { name: 'About', href: '#about-section' },
    { name: 'Experience', href: '#experience-section' },
    { name: 'Skills', href: '#skills-section' },
    { name: 'Portfolio', href: '#portfolio-section' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    
    if (elem) {
      const offsetTop = elem.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: offsetTop - 100, // Offset for the fixed header
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0, x: "-50%" }}
      animate={{ 
        y: isVisible ? 0 : -100, 
        opacity: isVisible ? 1 : 0,
        x: "-50%"
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-1/2 z-50 glass-card px-4 md:px-6 py-3 rounded-full flex items-center gap-4 md:gap-8 border border-white/10 shadow-2xl backdrop-blur-xl bg-black/20"
    >
      {navLinks.map((link) => (
        <a 
          key={link.name} 
          href={link.href} 
          onClick={(e) => handleScroll(e, link.href)}
          className="text-[10px] md:text-sm font-medium text-white/70 hover:text-white transition-colors tracking-wide uppercase"
        >
          {link.name}
        </a>
      ))}
      <a 
        href="#footer-section" 
        onClick={(e) => handleScroll(e, '#footer-section')}
        className="text-[10px] md:text-sm font-medium text-black bg-white px-3 md:px-4 py-1.5 md:py-2 rounded-full hover:scale-105 transition-transform tracking-wide uppercase"
      >
        Let's Talk
      </a>
    </motion.nav>
  );
};

export default FloatingNavbar;
