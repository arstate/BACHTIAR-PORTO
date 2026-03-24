import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, ChevronDown } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

const FloatingNavbar = () => {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isGalleryPage = location.pathname === '/gallery';
  const isVideographyPage = location.pathname === '/videography';
  const isMotionPage = location.pathname === '/motion';
  const isBTSPage = location.pathname === '/bts';
  const isDesignPage = location.pathname === '/design';
  const isHubPage = location.pathname === '/portfolio';
  const isDropdownPage = isGalleryPage || isVideographyPage || isMotionPage || isBTSPage || isDesignPage;

  const [activeCategory, setActiveCategory] = useState('All');
  const [isTutorialActive, setIsTutorialActive] = useState(false);

  useEffect(() => {
    const handleTutorial = (e: any) => setIsTutorialActive(e.detail);
    window.addEventListener('galleryTutorial', handleTutorial);
    
    // Only set to true if they haven't seen it this session (SPA)
    if (isGalleryPage && !(window as any).__hasSeenGalleryTutorial) {
       setIsTutorialActive(true);
    } else {
       setIsTutorialActive(false);
    }
    
    return () => window.removeEventListener('galleryTutorial', handleTutorial);
  }, [isGalleryPage]);

  useEffect(() => {
    if (isDropdownPage) {
      const hash = location.hash.replace('#', '');
      if (hash) {
        const category = hash.charAt(0).toUpperCase() + hash.slice(1);
        setActiveCategory(category);
      } else {
        if (isGalleryPage) {
          setActiveCategory('All');
        } else {
          setActiveCategory('All');
        }
      }
    }
  }, [location.hash, isDropdownPage, isGalleryPage]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Always show navbar on portfolio/dropdown page, otherwise show after scrolling
  useEffect(() => {
    if (isDropdownPage) {
      setIsVisible(true);
    } else {
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
    }
  }, [isDropdownPage]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!isDropdownPage && !isHubPage) {
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

  const galleryNavLinks = [
    { name: 'All', href: '#all' },
    { name: 'Animals', href: '#animals' },
    { name: 'Event', href: '#event' },
    { name: 'Graduation', href: '#graduation' },
    { name: 'Konser', href: '#konser' },
    { name: 'Landscape', href: '#landscape' },
    { name: 'Prewedding', href: '#prewedding' },
    { name: 'Wedding', href: '#wedding' },
    { name: 'Yearbook', href: '#yearbook' },
  ];

  const videographyNavLinks = [
    { name: 'All', href: '#all' },
    { name: 'Ads', href: '#ads' },
    { name: 'Angkatan', href: '#angkatan' },
    { name: 'Corporate/Event', href: '#corporate/event' },
    { name: 'Prewedding', href: '#prewedding' },
    { name: 'Wedding', href: '#wedding' },
  ];

  const motionNavLinks = [
    { name: 'All', href: '#all' },
    { name: 'Animation', href: '#animation' },
    { name: 'VFX', href: '#vfx' },
    { name: 'Title Design', href: '#title-design' },
  ];

  const btsNavLinks = [
    { name: 'All', href: '#all' },
    { name: 'Photoshoot', href: '#photoshoot' },
    { name: 'Videography', href: '#videography' },
    { name: 'Events', href: '#events' },
  ];

  const designNavLinks = [
    { name: 'All', href: '#all' },
    { name: 'Posters', href: '#posters' },
    { name: 'Logos', href: '#logos' },
    { name: 'Social Media', href: '#social-media' },
  ];

  const activeNavLinks = isVideographyPage ? videographyNavLinks : 
                         isMotionPage ? motionNavLinks :
                         isBTSPage ? btsNavLinks :
                         isDesignPage ? designNavLinks :
                         galleryNavLinks;

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    if (isDropdownPage && href.startsWith('#')) {
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

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/portfolio');
    window.scrollTo(0, 0);
  };

  if (isHubPage) return null;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0, x: "-50%" }}
      animate={{
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
        x: "-50%"
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-12 left-1/2 z-[100] glass-card px-4 md:px-6 py-3 rounded-full flex items-center gap-4 md:gap-8 border border-white/10 shadow-2xl backdrop-blur-xl bg-black/20"
    >
      {isDropdownPage && (
        <button
          onClick={handleBackClick}
          className="text-white/70 hover:text-white transition-colors flex items-center justify-center p-1 group"
          aria-label="Back"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        </button>
      )}

      {isDropdownPage && <div className="w-[1px] h-4 bg-white/20" />}

      {isDropdownPage ? (
        <div className="flex items-center gap-3 relative" ref={dropdownRef}>
          <span className="text-[10px] md:text-xs font-bold text-white/40 uppercase tracking-widest select-none">
            Category
          </span>
          <div className="relative group">
            <button
              onClick={() => {
                 setIsDropdownOpen(!isDropdownOpen);
                 if (isTutorialActive) {
                    setIsTutorialActive(false);
                    window.dispatchEvent(new Event('dismissGalleryTutorial'));
                 }
              }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 transition-all duration-500 z-10 relative overflow-hidden group"
            >
              {/* Shimmer/White Light Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 pointer-events-none"
                initial={{ x: '-150%' }}
                animate={{ x: '150%' }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut"
                }}
              />
              <span className="text-[10px] md:text-sm font-medium text-white uppercase tracking-wide relative z-10">
                {activeCategory}
              </span>
              <ChevronDown size={14} className={`text-white/50 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''} relative z-10`} />
            </button>
            {isTutorialActive && (
              <div className="absolute inset-[-6px] rounded-full border-2 border-white/80 animate-[pulse_1.5s_ease-in-out_infinite] pointer-events-none z-0"></div>
            )}
          </div>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full left-0 mt-4 w-48 bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-2"
              >
                {activeNavLinks.map((link) => (
                  <RouterLink
                    key={link.name}
                    to={`${location.pathname}${link.href}`}
                    onClick={() => {
                      setIsDropdownOpen(false);
                      window.scrollTo(0, 0);
                    }}
                    className={`block px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${activeCategory === link.name
                      ? 'bg-white text-black'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    {link.name}
                  </RouterLink>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        homeNavLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={(e) => handleScroll(e, link.href)}
            className="text-[10px] md:text-sm font-medium text-white/70 hover:text-white transition-colors tracking-wide uppercase"
          >
            {link.name}
          </a>
        ))
      )}

      {!isDropdownPage && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/portfolio')}
            className="text-[10px] md:text-sm font-medium text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-3 md:px-4 py-1.5 md:py-2 rounded-full transition-all tracking-wide uppercase border border-white/10 hover:border-white/30 relative overflow-hidden group"
          >
            {/* Shimmer/White Light Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 pointer-events-none"
              initial={{ x: '-150%' }}
              animate={{ x: '150%' }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut"
              }}
            />
            <span className="relative z-10">My Project</span>
          </button>
          
          <a
            href="#contact-form-section"
            onClick={(e) => handleScroll(e, '#contact-form-section')}
            className="text-[10px] md:text-sm font-medium text-black bg-white px-3 md:px-4 py-1.5 md:py-2 rounded-full hover:scale-105 transition-transform tracking-wide uppercase"
          >
            Let's Talk
          </a>
        </div>
      )}
    </motion.nav>
  );
};

export default FloatingNavbar;
