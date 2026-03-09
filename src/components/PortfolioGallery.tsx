import { useState, useEffect, useRef } from 'react';
import { motion, useTransform, AnimatePresence, useInView, useMotionValue, useSpring } from 'motion/react';
import { Video, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';

const categories = ['All', 'Graduation', 'Konser'];

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
const graduationUrls = [
  "https://github.com/user-attachments/assets/f62f9ca9-23c5-4b81-8f7e-c9c646875ec8",
  "https://github.com/user-attachments/assets/276def06-0dfe-4c9e-8e9c-be91ac62d2ed",
  "https://github.com/user-attachments/assets/6fbb2a3f-1469-49b9-85b5-26e944ddc62c",
  "https://github.com/user-attachments/assets/eb894008-2618-4f82-b359-862c5053518b",
  "https://github.com/user-attachments/assets/2cff160d-a6eb-4321-880c-1506e16b5da2",
  "https://github.com/user-attachments/assets/bee0fd4a-9c60-45fd-8a8d-0142754f9968",
  "https://github.com/user-attachments/assets/64299811-3be7-4bdf-894a-2d9b39ed2b5f",
  "https://github.com/user-attachments/assets/36a78d15-f9c5-4d2d-b02d-86136b779fd8",
  "https://github.com/user-attachments/assets/8383d5aa-10cb-4e64-b196-abe4b255b11c",
  "https://github.com/user-attachments/assets/c8799254-0313-4981-9b5b-bc630aa4b3e3",
  "https://github.com/user-attachments/assets/08be47e4-8f74-4e82-ad05-fa981ff1bbe0",
  "https://github.com/user-attachments/assets/2bf533cd-0924-46b4-8bea-5b4659f6771a",
  "https://github.com/user-attachments/assets/5803aac9-472e-4746-a599-ab036fd6cdee",
  "https://github.com/user-attachments/assets/f88a7367-c70a-40df-9835-3b74c0c8b18d",
  "https://github.com/user-attachments/assets/5d7f77f4-21e4-479f-a425-f1cf4b2b8c44",
  "https://github.com/user-attachments/assets/3728a2fe-5dac-441e-8b4b-1ce52ff87511",
  "https://github.com/user-attachments/assets/32afba91-a565-4ffb-8c8e-2fea6aef23ae",
  "https://github.com/user-attachments/assets/373f67eb-44f5-4ea3-b6ac-d97b81d6c47f",
  "https://github.com/user-attachments/assets/722a7fd3-7e26-4a71-8db7-17761761c0d7",
  "https://github.com/user-attachments/assets/8a94b7a5-bba5-4a18-963b-87e6de87869c",
  "https://github.com/user-attachments/assets/3f1ec3cf-28d5-474a-96a2-5fe613b0b0d7",
  "https://github.com/user-attachments/assets/0983c8d0-04ef-4436-93e3-d265fa79858f",
  "https://github.com/user-attachments/assets/35a7efbf-a6d6-4131-a7fb-62a929953d18",
  "https://github.com/user-attachments/assets/ef7acfdb-8634-4cff-854b-78be2e16ad75",
  "https://github.com/user-attachments/assets/7df01810-4045-4ea7-b475-b0829183a341",
  "https://github.com/user-attachments/assets/7b9afa5b-2a86-497e-b9f5-b5db91dc4afa",
  "https://github.com/user-attachments/assets/74fd30ab-b6da-4fe3-ae62-3c3a5c1ab05c",
  "https://github.com/user-attachments/assets/1e6ec483-6237-4883-b49b-59387d0fcbe2",
  "https://github.com/user-attachments/assets/32fac26b-e4f0-4655-9573-258c8dd4285f",
  "https://github.com/user-attachments/assets/7d5e60a2-a31e-43fb-8ca9-873ab26f02a5",
  "https://github.com/user-attachments/assets/546b54df-2357-45fe-a906-600b1fc28616",
  "https://github.com/user-attachments/assets/ae5a66f5-a6a7-436a-8c59-6e6c31286203",
  "https://github.com/user-attachments/assets/732dfca5-9144-4131-b4bc-9fe9978a6ba5",
  "https://github.com/user-attachments/assets/128ee3fb-0b27-48f9-a963-cc8f6db73284",
  "https://github.com/user-attachments/assets/f6dac92c-e500-466c-9da7-fc6669721d41",
  "https://github.com/user-attachments/assets/bf267004-ff2c-4a75-8186-9107bf800cde",
  "https://github.com/user-attachments/assets/8e90ec0b-df91-4f27-b1b3-d853a33c8334",
  "https://github.com/user-attachments/assets/793fe427-7a0f-46e6-af94-b43f0e869d00",
  "https://github.com/user-attachments/assets/01cba537-bb07-4398-a760-cc1f1b2602fa",
  "https://github.com/user-attachments/assets/7872acea-778e-40b6-9075-4e6b09f6fbe7",
  "https://github.com/user-attachments/assets/493c1bad-4ec9-4e5d-86d2-759841554070",
  "https://github.com/user-attachments/assets/0d95cd93-cecb-4784-b84a-b257df3d62d6",
  "https://github.com/user-attachments/assets/c57487bc-7bb3-4866-93b7-245e79b2556e",
  "https://github.com/user-attachments/assets/f089677f-3a76-4b4c-a6f3-6cbbb6bfaff9",
  "https://github.com/user-attachments/assets/8d5e8d51-2159-4d2c-9041-bae1b7b3b242",
  "https://github.com/user-attachments/assets/391ee6da-31db-4841-9712-a50587267e1c",
  "https://github.com/user-attachments/assets/d8a0f639-737f-46a3-8627-652253ab0ff0",
  "https://github.com/user-attachments/assets/be803727-90be-4b36-b5f6-5c182a929b38",
  "https://github.com/user-attachments/assets/df7e5c8d-28a6-4dfc-92db-d2eb1ccff348",
  "https://github.com/user-attachments/assets/a702b385-0963-4231-9397-fb54834b6d06",
  "https://github.com/user-attachments/assets/01ced7f7-efd3-4b93-a7da-a08129fa00c8",
  "https://github.com/user-attachments/assets/d662a544-418d-4ca5-9ad9-c7425f8e0197",
  "https://github.com/user-attachments/assets/1c6ddd06-b93d-4d25-a73b-3c1a3fdc8cdf",
  "https://github.com/user-attachments/assets/3ba373f9-0efb-4be8-b486-7cc46ceda219",
  "https://github.com/user-attachments/assets/6430e35a-f92d-4389-9c9e-3ca22f9a1098",
  "https://github.com/user-attachments/assets/b174ebee-c3b9-4114-a050-876823db613a",
  "https://github.com/user-attachments/assets/2f9cc0dc-f70e-4b6c-b54e-ab6d7f77dc1e",
  "https://github.com/user-attachments/assets/f13b3013-3f63-401b-beb8-bf546ddca34a",
  "https://github.com/user-attachments/assets/a85ef45d-e122-45eb-9e39-7edcd39d6644",
  "https://github.com/user-attachments/assets/4630548d-1b43-47a5-bb85-c89b77e59d15",
  "https://github.com/user-attachments/assets/4ac92f48-da0b-4b17-86b1-d1c7815b28cd",
  "https://github.com/user-attachments/assets/983b8946-3bb6-48b3-8bc4-a39c5c3cb3da",
  "https://github.com/user-attachments/assets/5ed431ab-e6cf-4c6b-9cca-1f18ed98990b",
  "https://github.com/user-attachments/assets/4eee4eb0-8450-47d5-8838-294cb6a0a478",
  "https://github.com/user-attachments/assets/21fb58b9-14ab-4dc6-821a-44509dacfe2d",
  "https://github.com/user-attachments/assets/be12e7d9-851d-4ce6-9a18-afe9c5911fad",
  "https://github.com/user-attachments/assets/0068afa0-9fc8-4eb7-926e-ad99f7baee59",
  "https://github.com/user-attachments/assets/41d7af04-2c39-495a-bc3c-34d16c149b0e",
  "https://github.com/user-attachments/assets/3a059c13-c3c1-405f-9807-0cc4b0787f48",
  "https://github.com/user-attachments/assets/7c5c6f50-ada8-4884-adc1-a474a05816a7",
  "https://github.com/user-attachments/assets/350492f4-1c30-4178-82b3-53b77915219d",
  "https://github.com/user-attachments/assets/ce59eece-a629-47c1-b8ee-aee07f33c66b",
  "https://github.com/user-attachments/assets/d67d1486-bf53-4df4-a386-6e2d900132fc",
  "https://github.com/user-attachments/assets/87518edf-d4af-4f32-ad97-8f868ea3069f",
  "https://github.com/user-attachments/assets/3006c5ae-bc51-42d8-8a8c-6f6f7959ea7f",
  "https://github.com/user-attachments/assets/a455fd41-8b80-475b-a974-b02e6efefafa",
  "https://github.com/user-attachments/assets/b0d991fa-4172-432c-8e9c-48337390bdc9",
  "https://github.com/user-attachments/assets/faeaf979-feba-42b4-b211-e0fb15fcb8c1",
  "https://github.com/user-attachments/assets/7fffa469-170e-4a10-9963-acd46dc05776",
  "https://github.com/user-attachments/assets/926cb8c8-d957-4ae7-b761-85e0fee280d2",
  "https://github.com/user-attachments/assets/81249376-eedf-492b-a6e9-58bbb228d0d3",
  "https://github.com/user-attachments/assets/4053060b-077d-4ee6-b74e-995fd7309619",
  "https://github.com/user-attachments/assets/f40f43f3-92d6-4123-b922-abb48e0723e7",
  "https://github.com/user-attachments/assets/b28de964-f0d2-4267-b7aa-0df61d705249",
  "https://github.com/user-attachments/assets/1e82852b-fbcd-43cc-a7f6-6f3f4897f597",
  "https://github.com/user-attachments/assets/9d2b6802-ad5f-4485-b7e0-6224317ff50c",
  "https://github.com/user-attachments/assets/2e1552bd-b318-4035-9b31-61ec3d2220a8",
  "https://github.com/user-attachments/assets/547c4aa1-add3-4399-a64e-f08a39d22763",
  "https://github.com/user-attachments/assets/8864cd91-a10c-4f49-83e9-a71c5b0bc27d",
  "https://github.com/user-attachments/assets/6f7918b0-fd0c-42ac-8eab-35377310db13",
  "https://github.com/user-attachments/assets/80377191-de71-49d6-9165-e89a1d3ae824",
  "https://github.com/user-attachments/assets/c39b345a-ef69-457f-90d3-16872ee1dfd8",
  "https://github.com/user-attachments/assets/c6803153-2eb0-499e-a815-3f234688af33",
  "https://github.com/user-attachments/assets/3f03d445-33a9-4ae1-9589-a8c924d07bc1",
  "https://github.com/user-attachments/assets/9a09dbfc-3ddc-40d7-a95e-32a79b416c95",
  "https://github.com/user-attachments/assets/7cff3551-7927-4aa9-9524-c8740f7dd850",
  "https://github.com/user-attachments/assets/d5ebc2cb-c4c8-48f5-9419-69d78daf3512",
  "https://github.com/user-attachments/assets/15eae376-5496-4248-8fc9-816c28867f00",
  "https://github.com/user-attachments/assets/8383127d-7494-41bc-a6ef-145b9874f1be"
];

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
  const [activeCategory, setActiveCategory] = useState('All');
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
  }, [location.hash]);

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

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

      {/* Infinite Looping Gallery */}
      <div className="h-full w-full px-4 md:px-8 flex gap-4 md:gap-6">
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
