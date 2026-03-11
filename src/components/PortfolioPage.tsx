import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useLocation } from 'react-router-dom';

import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { getDatabase } from '../utils/database';

const ytAnimStyles = `
  @keyframes ytThumbFade {
    0%, 24.99% { opacity: 0.6; z-index: 0; }
    25%, 100% { opacity: 0; z-index: -1; }
  }
`;

const VideoCard: React.FC<{ item: string; cat: string; i: number; onSelectVideo: (url: string) => void }> = ({ item, cat, i, onSelectVideo }) => {
  const [activeThumb, setActiveThumb] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const parts = item.split('|').map(p => p.trim());
  const hasPipe = parts.length > 1;
  const title = hasPipe ? parts[0] : (item.startsWith('http') ? `${cat} Project` : item);
  let url = hasPipe ? parts[1] : item;
  let explicitThumbnail = parts.length >= 3 ? parts[2] : null;

  // YouTube auto-detect logic
  const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  const ytId = ytMatch ? ytMatch[1] : null;

  const hue1 = (i * 37) % 360;
  const hue2 = (i * 61) % 360;

  const ytThumbnails = ytId && !explicitThumbnail ? [
    `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${ytId}/hq1.jpg`,
    `https://img.youtube.com/vi/${ytId}/hq2.jpg`,
    `https://img.youtube.com/vi/${ytId}/hq3.jpg`,
  ] : [];

  if (ytId) {
    url = `https://www.youtube.com/embed/${ytId}?autoplay=1`;
  }

  // Generate the inline playable URL for hover state
  // mute=1 is REQUIRED for browsers to allow autoplay without prior direct interaction on the element.
  const inlineHoverUrl = ytId 
    ? `https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${ytId}&end=60&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&fs=0`
    : null;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => url.startsWith('http') && onSelectVideo(url)}
      className="w-[85vw] md:w-[500px] aspect-video bg-[#0a0a0a] rounded-[2rem] border border-white/10 flex items-center justify-center flex-shrink-0 hover:border-white/30 transition-colors duration-500 cursor-pointer overflow-hidden relative snap-center md:snap-start group"
    >
      <style>{ytAnimStyles}</style>
      <div 
        className="absolute inset-0 opacity-40 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
        style={{ background: `linear-gradient(135deg, hsl(${hue1}, 20%, 30%), hsl(${hue2}, 30%, 15%))` }} 
      />
      
      {isHovered && inlineHoverUrl ? (
          <div className="absolute inset-0 w-[150%] h-[150%] left-[-25%] top-[-25%] pointer-events-none z-0 scale-[1.1]">
            <iframe 
              src={inlineHoverUrl} 
              className="w-full h-full pointer-events-none" 
              allow="autoplay; encrypted-media; picture-in-picture" 
            />
          </div>
      ) : ytThumbnails.length > 0 ? (
        ytThumbnails.map((thumb, idx) => (
          <img 
            key={idx}
            src={thumb} 
            onError={(e) => {
              if (thumb.includes('maxresdefault.jpg')) {
                e.currentTarget.src = thumb.replace('maxresdefault.jpg', 'hqdefault.jpg');
              }
            }}
            alt={title} 
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
               opacity: 0, 
               animation: 'ytThumbFade 10s infinite',
               animationDelay: `${idx * 2.5}s`
            }} 
          />
        ))
      ) : explicitThumbnail ? (
        <img src={explicitThumbnail} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-60 transition-opacity duration-300" />
      ) : (
        url.startsWith('http') && !hasPipe && (
          <img src={url} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-60 transition-opacity duration-300" />
        )
      )}
      
      <div className={`z-20 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 transition-all duration-300 ${isHovered ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 3L19 12L5 21V3Z" />
        </svg>
      </div>
      
      <div className={`absolute bottom-6 left-6 z-20 w-3/4 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
        <span className="text-white font-bold tracking-widest uppercase text-sm truncate block drop-shadow-lg">
          {title}
        </span>
      </div>
      <div className={`absolute inset-0 bg-black/40 transition-colors duration-500 pointer-events-none z-10 ${isHovered ? 'opacity-0' : 'opacity-100'}`} />
    </div>
  );
};

const ManualRow: React.FC<{ cat: string; onSelectVideo: (url: string) => void }> = ({ cat, onSelectVideo }) => {
  const db = getDatabase();
  const videographyDb = db['videography'] || {};
  let dbItems = videographyDb[cat.toLowerCase()] || [];

  // Basic fallback if text file is empty
  if (dbItems.length === 0) {
    dbItems = ['Placeholder Video 1', 'Placeholder Video 2', 'Placeholder Video 3'];
  }

  const originalItems = dbItems;
  // Use 9 duplicates for massive scroll bounds so user never hits the edge while swiping
  const items = [...originalItems, ...originalItems, ...originalItems, ...originalItems, ...originalItems, ...originalItems, ...originalItems, ...originalItems, ...originalItems];
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const isJumping = React.useRef(false);
  const debounceTimer = React.useRef<NodeJS.Timeout | null>(null);

  // Start from the precise middle section
  useEffect(() => {
    const setInitialPos = () => {
      if (scrollRef.current) {
        const container = scrollRef.current;
        const sectionWidth = container.scrollWidth / 9;
        container.scrollTo({ left: sectionWidth * 4, behavior: 'instant' as any });
      }
    };
    
    setInitialPos();
    const timer = setTimeout(setInitialPos, 100);
    const timer2 = setTimeout(setInitialPos, 1000);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [items.length]);

  const handleScroll = () => {
    if (!scrollRef.current || isJumping.current) return;
    
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    // Only fire jump logic 150ms after the user completely STOPS scrolling
    // This perfectly preserves native browser scroll inertia
    debounceTimer.current = setTimeout(() => {
        const container = scrollRef.current;
        if (!container) return;

        const sectionWidth = container.scrollWidth / 9;
        const scrollLeft = container.scrollLeft;

        // If we drifted outside the central 3 buffer zones
        if (scrollLeft < sectionWidth * 3 || scrollLeft > sectionWidth * 6) {
            isJumping.current = true;
            // Snaps precisely to the exact offset inside the center-most slice (index 4)
            const relativeOffset = scrollLeft % sectionWidth;
            container.scrollTo({ left: sectionWidth * 4 + relativeOffset, behavior: 'auto' as any });
            
            requestAnimationFrame(() => { isJumping.current = false; });
        }
    }, 150);
  };

  const scrollAction = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 500; // rough width of one item
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id={cat.toLowerCase()} className="pt-24 pb-8 w-full relative">
      <div className="max-w-7xl mx-auto px-6 mb-8 flex justify-between items-center">
        <h2 className="text-4xl md:text-5xl font-bold font-display italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          {cat}
        </h2>

        <div className="flex gap-2">
          <button
            onClick={() => scrollAction('left')}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scrollAction('right')}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="w-full relative group">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto overflow-y-hidden pb-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {items.map((item, i) => (
            <VideoCard key={i} item={item} cat={cat} i={i} onSelectVideo={onSelectVideo} />
          ))}
        </div>

        {/* Transparent gradient masks for smoother edge fading */}
        <div className="absolute top-0 bottom-0 left-0 w-8 md:w-16 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-8 md:w-16 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

const PortfolioPage = () => {
  const categories = ["Ads", "Angkatan", "Corporate", "Konser", "Prewedding", "Wedding"];
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    // Disable body scroll native behavior if you want, but this is a slider page so vertical scroll is needed
    // document.body.style.overflow = 'auto'; // ensure scrolling is enabled
    document.body.style.overscrollBehavior = 'auto';
  }, []);

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      const category = hash.charAt(0).toUpperCase() + hash.slice(1);
      if (categories.includes(category)) {
        setActiveCategory(category);
      } else {
        setActiveCategory('All');
      }
    } else {
      setActiveCategory('All');
    }
  }, [location.hash]);

  const displayedCategories = activeCategory === 'All'
    ? categories
    : categories.filter(c => c === activeCategory);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <h1 className="text-6xl font-[family-name:var(--font-display)] italic font-light mb-4">
          Videography
        </h1>
        <p className="text-white/50 max-w-xl font-light">
          Explore our cinematic videography works across various categories. Navigate the slider directly or filter from the top menu.
        </p>
      </div>

      <div className="w-full flex flex-col gap-8">
        {displayedCategories.map((cat) => (
          <ManualRow key={cat} cat={cat} onSelectVideo={setSelectedVideo} />
        ))}
      </div>

      {createPortal(
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: !!selectedVideo ? 1 : 0, pointerEvents: !!selectedVideo ? 'auto' : 'none' }}
           className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8"
        >
           {selectedVideo && (
             <div className="relative w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden border border-white/10 shadow-2xl flex flex-col items-center justify-center">
               <button
                 onClick={() => setSelectedVideo(null)}
                 className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-white/10 rounded-full text-white transition-colors"
               >
                 <X size={24} />
               </button>
               {/* 
                 For Google Drive videos, it uses an iframe with the /preview URL. 
                 Otherwise, fall back to a generic iframe or video tag. 
               */}
               <iframe
                 src={selectedVideo}
                 className="w-full h-full border-0 absolute inset-0"
                 allow="autoplay; fullscreen; picture-in-picture"
                 allowFullScreen
                 sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation"
               ></iframe>
             </div>
           )}
        </motion.div>,
        document.body
      )}
    </div>
  );
};

export default PortfolioPage;
