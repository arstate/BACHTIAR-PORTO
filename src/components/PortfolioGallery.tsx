import { useState, useEffect, useRef } from 'react';
import { motion, useTransform, AnimatePresence, useInView, useMotionValue, useSpring } from 'motion/react';
import { Video, X } from 'lucide-react';
import { createPortal } from 'react-dom';

const categories = ['All', 'Ads', 'Animals', 'Corporate', 'Graduation', 'Konser', 'Prewedding', 'Wedding', 'Yearbook'];

const konserUrls = [
  "https://github.com/user-attachments/assets/43b6911a-a5a9-4ebe-b05b-0f11912f46cb",
  "https://github.com/user-attachments/assets/61987ca9-96c2-4e28-bb8a-1b7d510f7e00",
  "https://github.com/user-attachments/assets/06877854-c86e-4089-b311-ce08c22b49e5",
  "https://github.com/user-attachments/assets/b5992f9f-abf4-49b2-ba37-73cb8c1196e4",
  "https://github.com/user-attachments/assets/5ba43c16-ca93-41d2-89aa-5936f7e353e6",
  "https://github.com/user-attachments/assets/1d0887d0-f35a-4a33-bce3-1201502df55a",
  "https://github.com/user-attachments/assets/9df7cf92-aa69-4cf8-b147-95ee64b33965",
  "https://github.com/user-attachments/assets/3ccc49a3-63f9-43af-9ac0-5550ec8625e8",
  "https://github.com/user-attachments/assets/6c91cc62-78c9-49a3-9fcf-d3058ddfdddd",
  "https://github.com/user-attachments/assets/555fea7e-9082-4b7b-b565-35aa81cb6231",
  "https://github.com/user-attachments/assets/c4880c71-1a80-4508-b82c-3d8c88efe637",
  "https://github.com/user-attachments/assets/f7526049-e06c-4a47-96ac-3dbf57e6ebfd",
  "https://github.com/user-attachments/assets/c404a313-8f9e-4190-a8dd-5e017c7f49e8",
  "https://github.com/user-attachments/assets/7486d470-4e60-4ec7-922e-769a36c9555e",
  "https://github.com/user-attachments/assets/5880e317-2c9c-4b4d-a872-304b80f63152",
  "https://github.com/user-attachments/assets/64075589-0df5-4825-a5fc-cb490c622af2",
  "https://github.com/user-attachments/assets/a73b1e78-a6e4-4d04-b3ea-6fd40da90dc1",
  "https://github.com/user-attachments/assets/593fb5d5-0e73-43a3-8410-f0794f3938dd",
  "https://github.com/user-attachments/assets/a14eb195-f64c-4de6-9362-754bf159239d",
  "https://github.com/user-attachments/assets/87242bf1-0421-4542-9a62-dd8f96e88cf8",
  "https://github.com/user-attachments/assets/e1f653a5-1e8c-4aa4-b047-0002dce8f4d3",
  "https://github.com/user-attachments/assets/959a928c-e65b-41a0-a10e-1f184088f5e3",
  "https://github.com/user-attachments/assets/3afaf4c8-aad3-4f04-89b6-816ad0ea08d2",
  "https://github.com/user-attachments/assets/de2c07fa-8c43-436c-aab5-5449bd1eb5ee",
  "https://github.com/user-attachments/assets/47a33a1d-8167-4744-83e9-f1d7b176a748",
  "https://github.com/user-attachments/assets/a61550f9-1e01-4f64-b6b5-d1826b3ae6c7",
  "https://github.com/user-attachments/assets/abcb3eec-2493-4515-837d-8a133f5199e2"
];

const otherCats = ['Ads', 'Animals', 'Corporate', 'Graduation', 'Konser', 'Prewedding', 'Wedding', 'Yearbook'];

const galleryItems = [
  ...konserUrls.map((url, i) => ({
    id: `konser-${i}`,
    title: 'Konser',
    category: 'Konser',
    img: url,
  })),
  ...Array.from({ length: 80 }).map((_, i) => {
    const category = otherCats[i % otherCats.length];
    return {
      id: `other-${i}`,
      title: category,
      category: category,
      img: `https://picsum.photos/seed/gallery${i}/800/1200.webp`,
    };
  })
].sort((a, b) => a.id.localeCompare(b.id));

const getOptimizedUrl = (url: string, width: number) => {
  if (url.includes('picsum.photos')) {
    return url.replace('800/1200', `${width}/${Math.round(width * 1.5)}`);
  }
  return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=${width}&output=webp&q=80`;
};

const GalleryItem = ({ item, onClick }: { key?: string, item: any, onClick: () => void }) => {
  return (
    <motion.div 
      onClick={onClick}
      className="relative rounded-2xl md:rounded-[2rem] overflow-hidden cursor-pointer group w-full aspect-[3/4] bg-white/5 flex-shrink-0"
    >
      <img 
        src={getOptimizedUrl(item.img, 600)} 
        alt={item.title} 
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
        <h3 className="text-lg md:text-xl font-bold text-white">{item.title}</h3>
      </div>
    </motion.div>
  );
};

const LoopingColumn = ({ items, speed, scrollY, onProjectClick }: { key?: string, items: any[], speed: number, scrollY: any, onProjectClick: (item: any) => void }) => {
  const columnRef = useRef<HTMLDivElement>(null);
  const [columnHeight, setColumnHeight] = useState(0);

  if (items.length === 0) return null;

  useEffect(() => {
    if (columnRef.current) {
      // Height of one set of items
      setColumnHeight(columnRef.current.scrollHeight / 4);
    }
  }, [items]);

  const y = useTransform(scrollY, (latest: number) => {
    if (columnHeight === 0) return 0;
    // Calculate wrapped position for infinite loop
    const totalScroll = latest * speed;
    const wrapped = ((totalScroll % columnHeight) + columnHeight) % columnHeight;
    return -wrapped;
  });

  // Repeat items 4 times to ensure seamless looping
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="flex-1 overflow-hidden h-full relative">
      <motion.div 
        ref={columnRef}
        style={{ y, willChange: "transform" }}
        className="flex flex-col gap-4 md:gap-6"
      >
        {repeatedItems.map((item, i) => (
          <GalleryItem 
            key={`${item.id}-${i}`} 
            item={item} 
            onClick={() => onProjectClick(item)} 
          />
        ))}
      </motion.div>
    </div>
  );
};

const PortfolioGallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const rawScroll = useMotionValue(0);
  const scrollY = useSpring(rawScroll, { damping: 50, stiffness: 400, mass: 0.5 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Disable body scroll on this page
    document.body.style.overflow = 'hidden';
    
    const handleWheel = (e: WheelEvent) => {
      rawScroll.set(rawScroll.get() + e.deltaY);
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      rawScroll.set(rawScroll.get() + deltaY * 2);
      touchStartY = touchY;
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      document.body.style.overflow = 'auto';
    };
  }, [rawScroll]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const category = hash.charAt(0).toUpperCase() + hash.slice(1);
        if (categories.includes(category)) {
          setActiveCategory(category);
        } else if (hash.toLowerCase() === 'all') {
          setActiveCategory('All');
        }
      } else {
        setActiveCategory('All');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const filteredItems = activeCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  const numCols = isMobile ? 3 : 4;
  const cols = Array.from({ length: numCols }, () => [] as typeof galleryItems);
  
  filteredItems.forEach((item, i) => {
    cols[i % numCols].push(item);
  });

  // Different speeds for parallax effect
  const speeds = isMobile ? [1, 1.3, 0.8] : [1, 1.4, 0.7, 1.2];

  return (
    <div className="bg-[#050505] h-screen w-full relative overflow-hidden">
      {/* Top and Bottom Gradient Overlays */}
      <div className="fixed top-0 left-0 w-full h-64 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-transparent z-30 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-30 pointer-events-none" />

      {/* Header */}
      <div className="fixed top-0 left-0 w-full z-50 pt-32 pb-8 px-6 pointer-events-none">
        <div className="max-w-7xl mx-auto pointer-events-auto">
          <h1 className="text-5xl md:text-7xl font-[family-name:var(--font-display)] italic font-light mb-6">
            Gallery
          </h1>
        </div>
      </div>

      {/* Infinite Looping Gallery */}
      <div className="h-full w-full px-4 md:px-8 max-w-7xl mx-auto flex gap-4 md:gap-6">
        {cols.map((colItems, colIndex) => (
          <LoopingColumn 
            key={`${activeCategory}-${colIndex}`}
            items={colItems}
            speed={speeds[colIndex]}
            scrollY={scrollY}
            onProjectClick={setSelectedProject}
          />
        ))}
      </div>

      {/* Project Modal */}
      {createPortal(
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full bg-black flex items-center justify-center">
                  <img 
                    src={selectedProject.img} 
                    alt={selectedProject.title} 
                    className="w-full max-h-[70vh] object-contain"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/20">
                      <Video size={24} className="text-white/80" />
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/50 backdrop-blur-md hover:bg-white/20 text-white transition-colors border border-white/10 z-10"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="p-8">
                  <h3 className="text-3xl font-bold text-white">{selectedProject.title}</h3>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default PortfolioGallery;
