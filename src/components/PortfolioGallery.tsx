import { useState, useEffect, useRef } from 'react';
import { motion, useTransform, AnimatePresence, useInView, useMotionValue, useSpring } from 'motion/react';
import { Video, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';

const categories = ['All', 'Animals', 'Event', 'Graduation', 'Konser', 'Landscape', 'Prewedding', 'Wedding', 'Yearbook'];
import { getDatabase } from '../utils/database';

const db = getDatabase();
const photographyDb = db['photography'] || {};
const konserUrls = photographyDb['konser'] || [];
const graduationUrls = photographyDb['graduation'] || [];
const weddingUrls = photographyDb['wedding'] || [];
const eventUrls = photographyDb['event'] || [];
const preweddingUrls = photographyDb['prewedding'] || [];
const animalsUrls = photographyDb['animals'] || [];
const yearbookUrls = photographyDb['yearbook'] || [];
const landscapeUrls = photographyDb['landscape'] || [];

const galleryItems = [
  ...konserUrls.map((url, i) => ({
    id: `konser-${i}`,
    title: 'Konser',
    category: 'Konser',
    img: url,
  })),
  ...graduationUrls.map((url, i) => ({
    id: `graduation-${i}`,
    title: 'Graduation',
    category: 'Graduation',
    img: url,
  })),
  ...weddingUrls.map((url, i) => ({
    id: `wedding-${i}`,
    title: 'Wedding',
    category: 'Wedding',
    img: url,
  })),
  ...eventUrls.map((url, i) => ({
    id: `event-${i}`,
    title: 'Event',
    category: 'Event',
    img: url,
  })),
  ...preweddingUrls.map((url, i) => ({
    id: `prewedding-${i}`,
    title: 'Prewedding',
    category: 'Prewedding',
    img: url,
  })),
  ...animalsUrls.map((url, i) => ({
    id: `animals-${i}`,
    title: 'Animals',
    category: 'Animals',
    img: url,
  })),
  ...yearbookUrls.map((url, i) => ({
    id: `yearbook-${i}`,
    title: 'Yearbook',
    category: 'Yearbook',
    img: url,
  })),
  ...landscapeUrls.map((url, i) => ({
    id: `landscape-${i}`,
    title: 'Landscape',
    category: 'Landscape',
    img: url,
  }))
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
    const updateHeight = () => {
      if (columnRef.current) {
        // We repeat items 4 times. 
        // By adding padding-bottom equal to the gap, 
        // scrollHeight / 4 gives us the exact height of one set including its trailing gap.
        setColumnHeight(columnRef.current.scrollHeight / 4);
      }
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    if (columnRef.current) {
      resizeObserver.observe(columnRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [items]);

  const y = useTransform(scrollY, (latest: number) => {
    if (columnHeight <= 0) return 0;
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
        className="flex flex-col gap-4 md:gap-6 pb-4 md:pb-6"
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
  const [activeCategory, setActiveCategory] = useState('');
  const [displayCategory, setDisplayCategory] = useState('Konser');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  const rawScroll = useMotionValue(0);
  const scrollY = useSpring(rawScroll, { damping: 50, stiffness: 400, mass: 0.5 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Disable body scroll on this page
    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'none';

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      rawScroll.set(rawScroll.get() + e.deltaY);
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      rawScroll.set(rawScroll.get() + deltaY * 2);
      touchStartY = touchY;
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      document.body.style.overflow = 'auto';
      document.body.style.overscrollBehavior = 'auto';
    };
  }, [rawScroll]);

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    let category = 'Konser';
    if (hash) {
      const parsedCat = hash.charAt(0).toUpperCase() + hash.slice(1);
      if (categories.includes(parsedCat)) {
        category = parsedCat;
      } else if (hash.toLowerCase() === 'all') {
        category = 'All';
      }
    }

    if (!activeCategory) {
      // First load styling
      setActiveCategory(category);
      setDisplayCategory(category);
      setTimeout(() => setIsLoading(false), 300);
    } else if (category !== activeCategory) {
      // Different category clicked
      setIsLoading(true);
      setActiveCategory(category);

      // Wait for blur to cover everything
      setTimeout(() => {
        setDisplayCategory(category);
        // Wait a slight margin to guarantee DOM renders new images before unblurring
        setTimeout(() => {
          setIsLoading(false);
        }, 150);
      }, 500);
    }
  }, [location.hash, activeCategory]);

  const filteredItems = displayCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === displayCategory);

  const numCols = isMobile ? 2 : 6;
  const cols = Array.from({ length: numCols }, () => [] as typeof galleryItems);

  filteredItems.forEach((item, i) => {
    cols[i % numCols].push(item);
  });

  // Different speeds for parallax effect
  const speeds = isMobile ? [1, 1.4] : [1, 1.4, 0.7, 1.2, 0.9, 1.5];

  return (
    <div className="bg-[#050505] h-screen w-full relative overflow-hidden">
      {/* Top and Bottom Gradient Overlays */}
      <div className="fixed top-0 left-0 w-full h-64 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-transparent z-30 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-30 pointer-events-none" />

      {/* Header */}
      <div className="fixed top-0 left-0 w-full z-50 pt-24 pb-8 px-6 pointer-events-none">
        <div className="w-full pointer-events-auto">
          <h1 className="text-5xl md:text-7xl font-[family-name:var(--font-display)] italic font-light mb-6">
            Gallery
          </h1>
        </div>
      </div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 z-20 bg-black/50"
          />
        )}
      </AnimatePresence>

      {/* Infinite Looping Gallery */}
      <div className="h-full w-full px-4 md:px-8 flex gap-4 md:gap-6 relative z-10">
        {cols.map((colItems, colIndex) => (
          <LoopingColumn
            key={`${displayCategory}-${colIndex}`}
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
                className="relative rounded-xl md:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-w-[95vw] max-h-[95vh] group"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedProject.img}
                  alt={selectedProject.title}
                  className="max-w-full max-h-[95vh] object-contain block"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/50 backdrop-blur-md hover:bg-white/20 text-white transition-colors border border-white/10 z-10 md:opacity-0 group-hover:opacity-100"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">{selectedProject.title}</h3>
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
