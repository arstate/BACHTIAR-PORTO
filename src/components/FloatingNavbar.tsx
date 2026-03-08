import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

const FloatingNavbar = () => {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isPortfolioPage = location.pathname === '/portfolio';

  // Always show navbar on portfolio page, otherwise show after scrolling
  useEffect(() => {
    if (isPortfolioPage) {
      setIsVisible(true);
    } else {
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
    }
  }, [isPortfolioPage]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!isPortfolioPage) {
      if (latest > window.innerHeight * 0.8) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  });

  const homeNavLinks = [
    { name: 'About', href: '#about-section' },
    { name: 'Experience', href: '#experience-section' },
    { name: 'Skills', href: '#skills-section' },
    { name: 'Portfolio', href: '#portfolio-section' },
  ];

  const portfolioNavLinks = [
    { name: 'All', href: '#all' },
    { name: 'Wedding', href: '#wedding' },
    { name: 'Prewedding', href: '#prewedding' },
    { name: 'Ads', href: '#ads' },
    { name: 'Konser', href: '#konser' },
    { name: 'Corporate', href: '#corporate' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    if (isPortfolioPage && href.startsWith('#')) {
      // Allow default behavior to update the hash for filtering
      return;
    }
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

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    window.scrollTo(0, 0);
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
      {isPortfolioPage && (
        <button 
          onClick={handleHomeClick}
          className="text-white/70 hover:text-white transition-colors flex items-center justify-center p-1"
          aria-label="Home"
        >
          <Home size={18} />
        </button>
      )}

      {isPortfolioPage && <div className="w-[1px] h-4 bg-white/20" />}

      {(isPortfolioPage ? portfolioNavLinks : homeNavLinks).map((link) => (
        <a 
          key={link.name} 
          href={link.href} 
          onClick={(e) => handleScroll(e, link.href)}
          className="text-[10px] md:text-sm font-medium text-white/70 hover:text-white transition-colors tracking-wide uppercase"
        >
          {link.name}
        </a>
      ))}
      
      {!isPortfolioPage && (
        <a 
          href="#footer-section" 
          onClick={(e) => handleScroll(e, '#footer-section')}
          className="text-[10px] md:text-sm font-medium text-black bg-white px-3 md:px-4 py-1.5 md:py-2 rounded-full hover:scale-105 transition-transform tracking-wide uppercase"
        >
          Let's Talk
        </a>
      )}
    </motion.nav>
  );
};

export default FloatingNavbar;
