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

const VideoCard: React.FC<{ group: any; cat: string; i: number; onSelectVideo: (data: any) => void }> = ({ group, cat, i, onSelectVideo }) => {
  const [activeThumb, setActiveThumb] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const item = group?.mainItem || (typeof group === 'string' ? group : '');
  const parts = item.split('|').map((p: string) => p.trim());
  const hasPipe = parts.length > 1;
  const title = group?.baseTitle || (hasPipe ? parts[0] : (item.startsWith('http') ? `${cat} Project` : item));
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
      onClick={() => url.startsWith('http') && onSelectVideo(group)}
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

const ManualRow: React.FC<{ cat: string; onSelectVideo: (data: any) => void }> = ({ cat, onSelectVideo }) => {
  const db = getDatabase();
  const videographyDb = db['videography'] || {};
  
  // Map category names to database keys
  const dbKey = cat.toLowerCase().replace('/event', '');
  let dbItems = videographyDb[dbKey] || [];

  const groupedItemsMap = new Map<string, any>();
  dbItems.forEach((item: string) => {
    if (!item) return;
    const parts = item.split('|').map(p => p.trim());
    const rawTitle = parts.length > 0 ? parts[0] : item;
    let url = parts.length > 1 ? parts[1] : item;
    
    // Auto-convert any YouTube URL to an embed URL for the variants modal
    const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    if (ytMatch) url = `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`;
    
    // Extract labels like (Teaser), (Full), (Akad), (Resepsi D1), (Highlight)
    const match = rawTitle.match(/^(.*?)\s*\((Teaser|Full|Akad|Resepsi.*?|Highlight)\)$/i);
    let baseTitle = rawTitle;
    let label = "Video";
    if (match) {
      baseTitle = match[1].trim();
      label = match[2];
    }
    
    if (!groupedItemsMap.has(baseTitle)) {
      groupedItemsMap.set(baseTitle, { baseTitle, mainItem: item, variants: [] });
    }
    const group = groupedItemsMap.get(baseTitle)!;
    group.variants.push({ label, url, rawTitle });
    
    // If it's a teaser, prefer using it as the main thumbnail video
    if (label.toLowerCase() === 'teaser') {
      group.mainItem = item;
    }
  });

  const originalItems = Array.from(groupedItemsMap.values());
  if (originalItems.length === 0) {
    originalItems.push({ baseTitle: 'Placeholder', mainItem: 'Placeholder', variants: [] });
  }

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
          {items.map((group, i) => (
            <VideoCard key={i} group={group} cat={cat} i={i} onSelectVideo={onSelectVideo} />
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
  const categories = ["Ads", "Angkatan", "Corporate/Event", "Prewedding", "Wedding", "Wisuda"];
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);
  const [activeUrl, setActiveUrl] = useState<string>('');

  useEffect(() => {
    if (selectedVideo) {
       setActiveUrl(selectedVideo.variants?.[0]?.url || selectedVideo.mainItem?.split('|')[1] || selectedVideo.url);
    }
  }, [selectedVideo]);

  useEffect(() => {
    // Disable body scroll native behavior if you want, but this is a slider page so vertical scroll is needed
    // document.body.style.overflow = 'auto'; // ensure scrolling is enabled
    document.body.style.overscrollBehavior = 'auto';
  }, []);

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      // Handle special category names with slashes
      let category = hash;
      if (hash.includes('/')) {
        category = hash.split('/').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('/');
      } else {
        category = hash.charAt(0).toUpperCase() + hash.slice(1);
      }

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
             <div className={`relative w-full max-w-[90vw] lg:max-w-7xl flex flex-col lg:flex-row gap-6 ${selectedVideo.variants && selectedVideo.variants.length > 1 ? 'h-[85vh] lg:h-[80vh]' : 'aspect-video max-w-6xl'}`}>
               <button
                 onClick={() => setSelectedVideo(null)}
                 className="absolute -top-12 right-0 z-50 p-2 bg-black/50 hover:bg-white/10 rounded-full text-white transition-colors"
               >
                 <X size={24} />
               </button>
               
               {/* Left/Main Side: Video Player */}
               <div className={`bg-black rounded-xl overflow-hidden shadow-2xl relative border border-white/10 ${selectedVideo.variants && selectedVideo.variants.length > 1 ? 'w-full lg:w-3/4 h-[50vh] lg:h-full' : 'w-full h-full absolute inset-0'}`}>
                 <iframe
                   src={activeUrl}
                   className="w-full h-full border-0 absolute inset-0"
                   allow="autoplay; fullscreen; picture-in-picture"
                   allowFullScreen
                   sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation"
                 ></iframe>
               </div>
               
               {/* Right Side: Playlist/Variants */}
               {selectedVideo.variants && selectedVideo.variants.length > 1 && (
                 <div className="w-full lg:w-1/4 h-full flex flex-col gap-4 bg-[#0a0a0a] rounded-xl border border-white/10 p-4 overflow-y-auto">
                    <h3 className="text-xl font-bold font-display italic text-white/90 border-b border-white/10 pb-4 mb-2">
                      {selectedVideo.baseTitle}
                    </h3>
                    <div className="flex flex-col gap-3">
                      {selectedVideo.variants.map((v: any, i: number) => {
                          const isActive = activeUrl === v.url;
                          // Extract a generic thumbnail for the sidebar, fallback to default thumbnail if needed
                          let thumbUrl = selectedVideo.mainItem?.split('|')[2] || "https://picsum.photos/400/225";
                          const ytMatch = v.url.match(/embed\/([^"?]+)/);
                          if (ytMatch) {
                            thumbUrl = `https://img.youtube.com/vi/${ytMatch[1]}/mqdefault.jpg`;
                          }

                          return (
                            <button 
                               key={i} 
                               onClick={() => setActiveUrl(v.url)}
                               className={`flex items-start gap-4 p-2 rounded-lg transition-all text-left ${isActive ? 'bg-white/10 border border-white/20' : 'hover:bg-white/5 border border-transparent'}`}
                            >
                              <div className="w-24 md:w-32 aspect-video bg-black/50 rounded-md overflow-hidden flex-shrink-0 relative">
                                <img src={thumbUrl} alt={v.label} className="w-full h-full object-cover" />
                                {isActive && (
                                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col flex-1 py-1 overflow-hidden">
                                <span className={`text-sm md:text-base font-bold truncate ${isActive ? 'text-white' : 'text-white/70'}`}>
                                  {v.label}
                                </span>
                                <span className="text-xs text-white/40 mt-1 line-clamp-2">
                                  {v.rawTitle}
                                </span>
                              </div>
                            </button>
                          );
                      })}
                    </div>
                 </div>
               )}
             </div>
           )}
        </motion.div>,
        document.body
      )}
    </div>
  );
};

export default PortfolioPage;
