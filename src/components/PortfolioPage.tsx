import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useLocation } from 'react-router-dom';

import { ChevronLeft, ChevronRight } from 'lucide-react';

const ManualRow: React.FC<{ cat: string }> = ({ cat }) => {
  const originalItems = [1, 2, 3, 4, 5, 6, 7, 8]; // Demo items
  // Triplicate the array: [prepend] + [original] + [append]
  // This allows us to infinitely scroll visually
  const items = [...originalItems, ...originalItems, ...originalItems];
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Start from the middle section of the duplicated array
  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      // Scroll to exactly 1/3 of the total scroll width to be in the "real" middle section
      container.scrollLeft = container.scrollWidth / 3;
    }
  }, []);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;

    // Check boundaries for infinite loop
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const sectionWidth = container.scrollWidth / 3;

    if (container.scrollLeft <= 0) {
      // Reached left end, jump back to the right equivalent position
      container.scrollLeft = container.scrollLeft + sectionWidth;
    } else if (container.scrollLeft >= maxScrollLeft - 10) {
      // Reached right end, jump back to the left equivalent position
      container.scrollLeft = container.scrollLeft - sectionWidth;
    }
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
          className="flex gap-6 overflow-x-auto overflow-y-hidden px-6 pb-6 md:px-12 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {items.map((item, i) => (
            <div
              key={`${i}`}
              className="w-[85vw] md:w-[500px] aspect-video bg-[#0a0a0a] rounded-[2rem] border border-white/10 flex items-center justify-center flex-shrink-0 hover:bg-white/5 hover:border-white/30 transition-colors duration-500 cursor-pointer overflow-hidden relative snap-center md:snap-start"
            >
              {/* Fake Video Thumbnail / Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#111] to-[#222]" />
              <div className="z-10 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 3L19 12L5 21V3Z" />
                </svg>
              </div>
              <div className="absolute bottom-6 left-6 z-10">
                <span className="text-white font-bold tracking-widest uppercase text-sm">{cat} Masterpiece {item}</span>
              </div>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
            </div>
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
  const categories = ["Wedding", "Prewedding", "Ads", "Konser", "Corporate"];
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState("All");

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
          <ManualRow key={cat} cat={cat} />
        ))}
      </div>
    </div>
  );
};

export default PortfolioPage;
