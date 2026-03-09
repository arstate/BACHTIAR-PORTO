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
  const isHubPage = location.pathname === '/portfolio';
  const isDropdownPage = isGalleryPage || isVideographyPage;

  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    if (isDropdownPage) {
      const hash = location.hash.replace('#', '');
      if (hash) {
        const category = hash.charAt(0).toUpperCase() + hash.slice(1);
        setActiveCategory(category);
      } else {
        if (isGalleryPage) {
          setActiveCategory('Konser');
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
    { name: 'Graduation', href: '#graduation' },
    { name: 'Konser', href: '#konser' },
  ];

  const videographyNavLinks = [
    { name: 'All', href: '#all' },
    { name: 'Wedding', href: '#wedding' },
    { name: 'Prewedding', href: '#prewedding' },
    { name: 'Ads', href: '#ads' },
    { name: 'Konser', href: '#konser' },
    { name: 'Corporate', href: '#corporate' },
  ];

  const activeNavLinks = isVideographyPage ? videographyNavLinks : galleryNavLinks;

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
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
          >
            <span className="text-[10px] md:text-sm font-medium text-white uppercase tracking-wide">
              {activeCategory}
            </span>
            <ChevronDown size={14} className={`text-white/50 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

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
