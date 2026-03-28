import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, ZoomIn, ChevronLeft, ChevronRight, X, ChevronUp, ChevronDown } from 'lucide-react';
import FloatingNavbar from './FloatingNavbar';
// @ts-ignore
import HTMLFlipBook from 'react-pageflip';

const Page = React.forwardRef((props: any, ref: any) => {
  return (
    <div 
      className="page overflow-hidden bg-[#e6e4df] shadow-[inset_2px_0_15px_rgba(0,0,0,0.1),inset_-2px_0_5px_rgba(0,0,0,0.05)] border-l border-white/30 relative" 
      ref={ref} 
      data-density={props.density || "soft"}
    >
      {props.children}
    </div>
  );
});
Page.displayName = "Page";

interface DesignImage {
  url: string;
  description: string;
}

interface DesignProject {
  id: number;
  thumbnail: string;
  images: DesignImage[];
  title: string;
  category: string;
  tools?: string[];
  figmaUrl?: string;
}

const placeholderDesigns: DesignProject[] = [
  {
    id: 1,
    thumbnail: "https://github.com/user-attachments/assets/bb77040c-c6b3-4e3c-a795-f9149d42fa54",
    images: [
      {
        url: "https://github.com/user-attachments/assets/bb77040c-c6b3-4e3c-a795-f9149d42fa54",
        description: "Preview ilustrasi full ketika panggung dan ornamen tiang sudah terpasang di lokasi Perumahan Alam Juanda Cluster Bahama."
      },
      {
        url: "https://github.com/user-attachments/assets/758841e1-b055-4431-ae32-b28dd82b3abc",
        description: "Desain panggung utama utuh dengan background warna merah putih khas 17-an dan elemen kemerdekaan."
      },
      {
        url: "https://github.com/user-attachments/assets/99df9567-6591-4032-856d-96abbe26da77",
        description: "Detail desain grafis untuk banner / backdrop bagian atas (header) panggung yang membentang horizontal."
      },
      {
        url: "https://github.com/user-attachments/assets/7f354c41-416e-4e43-a9ff-a4133d469804",
        description: "Detail desain ornamen pilar vertikal berbantuk gerbang kemerdekaan yang akan dipasang di kedua sisi panggung."
      }
    ],
    title: "Stage Design 17 Agustus 2025",
    category: "Stage & Event Design",
    tools: ["Adobe Photoshop", "Adobe Illustrator"]
  },
  {
    id: 2,
    thumbnail: "https://github.com/user-attachments/assets/a90987a3-b93b-4012-91cc-d7e747439b05",
    images: [
      {
        url: "https://github.com/user-attachments/assets/a90987a3-b93b-4012-91cc-d7e747439b05",
        description: "Desain poster ucapan Happy Chinese New Year 2026 dengan ilustrasi barongsai emas dan ornamen naga tradisional yang meriah."
      }
    ],
    title: "Chinese New Year 2026",
    category: "Greeting Poster",
    tools: ["Adobe Illustrator", "Adobe Photoshop"]
  },
  {
    id: 3,
    thumbnail: "https://github.com/user-attachments/assets/3de0543b-bc5b-4117-8b6f-f5c2feab539c",
    images: [
      {
        url: "https://github.com/user-attachments/assets/3de0543b-bc5b-4117-8b6f-f5c2feab539c",
        description: "Ilustrasi vektor karakter burung hantu (OWLTHH) bergaya retro dengan latar belakang sun rays vintage dan pemilihan warna earth tone khas."
      }
    ],
    title: "OWLTHH Retro Vector",
    category: "Vector Illustration",
    tools: ["Adobe Illustrator"]
  },
  {
    id: 4,
    thumbnail: "https://github.com/user-attachments/assets/9f366e30-aab0-4092-8ef6-feae623bfd42",
    images: [
      {
        url: "https://github.com/user-attachments/assets/9f366e30-aab0-4092-8ef6-feae623bfd42",
        description: "Ilustrasi digital 2D momen keluarga di kebun binatang, menampilkan adegan lucu anak yang menangis berinteraksi dengan jerapah dan monyet."
      }
    ],
    title: "Zoo Family Drawing",
    category: "Digital Drawing",
    tools: ["Adobe Photoshop", "Adobe Firefly"]
  },
  {
    id: 5,
    thumbnail: "https://github.com/user-attachments/assets/8ed9f4de-5825-4d14-93ce-bf4b75a8ecd8",
    images: [
      {
        url: "https://github.com/user-attachments/assets/8ed9f4de-5825-4d14-93ce-bf4b75a8ecd8",
        description: "Desain layout menu restoran U-Steak bernuansa gelap yang elegan. Menampilkan list harga dan foto menggiurkan untuk crispy chicken, ribs, burger, dan pizza."
      }
    ],
    title: "U-Steak Food Menu",
    category: "Restaurant Menu",
    tools: ["Adobe Photoshop", "Adobe Illustrator"]
  },
  {
    id: 6,
    thumbnail: "https://github.com/user-attachments/assets/7ac9a4b6-6963-4e37-a69f-c7a0b9d343e8",
    images: [
      {
        url: "https://github.com/user-attachments/assets/7ac9a4b6-6963-4e37-a69f-c7a0b9d343e8",
        description: "Poster kampanye sosial 'Be a Buddy, Not a Bully'. Menyampaikan pesan kuat Stop Bullying dengan highlight penindasan verbal, fisik, serta cyber bullying."
      }
    ],
    title: "Stop Bullying Campaign",
    category: "Social Campaign",
    tools: ["Figma"]
  },
  {
    id: 7,
    thumbnail: "https://github.com/user-attachments/assets/ded8c80e-c00c-4710-881a-04c20af305a0",
    images: [
      {
        url: "https://github.com/user-attachments/assets/ded8c80e-c00c-4710-881a-04c20af305a0",
        description: "Merupakan poster pengumuman jadwal rangkaian lomba perayaan HUT ke-80 RI 'The Glorious of Nusantara' oleh Karang Taruna RT 31 lengkap dengan list acara."
      }
    ],
    title: "Papan Pengumuman Lomba",
    category: "Event Announcement",
    tools: ["Adobe Photoshop", "Adobe Illustrator"]
  },
  {
    id: 8,
    thumbnail: "https://github.com/user-attachments/assets/d86b6421-9171-43e0-901c-4bc10647f3ad",
    images: [
      {
        url: "https://github.com/user-attachments/assets/d86b6421-9171-43e0-901c-4bc10647f3ad",
        description: "Artwork tajam yang merupakan ilustrasi vektor detail wajah kucing (cat portrait). Karya seni 'Art by Aryansyah' ini mengandalkan arsiran warna solid tajam berlapis."
      }
    ],
    title: "Vector Art: Majestic Cat",
    category: "Vector Asset",
    tools: ["Adobe Illustrator"]
  },
  {
    id: 9,
    thumbnail: "https://github.com/user-attachments/assets/61981376-6b9f-4433-9b7b-7202ae0ff692",
    images: [
      {
        url: "https://github.com/user-attachments/assets/61981376-6b9f-4433-9b7b-7202ae0ff692",
        description: "Karya desain grafis bergaya e-sports yang menyala. Poster turnamen kompetisi Mobile Legends Bahama E-Sports dengan total prize pool menjanjikan."
      }
    ],
    title: "MLBB Tournament Poster",
    category: "E-Sports Promo",
    tools: ["Adobe Photoshop", "Figma"]
  },
  {
    id: 10,
    thumbnail: "https://github.com/user-attachments/assets/f1b92c6b-8304-455a-9121-cbcb5ba9f2be",
    images: [
      {
        url: "https://github.com/user-attachments/assets/f1b92c6b-8304-455a-9121-cbcb5ba9f2be",
        description: "Banner dramatis sinematik bertuliskan 'Karang Taruna Bahama' dengan backrgound kerumunan siluet solidaritas serta kilauan bendera merah putih."
      }
    ],
    title: "Karang Taruna Banner",
    category: "Banner Design",
    tools: ["Adobe Photoshop"]
  },
  {
    id: 11,
    thumbnail: "https://github.com/user-attachments/assets/45d0334f-c947-4bf2-9fb3-cbbfdac95dbc",
    images: [
      {
        url: "https://github.com/user-attachments/assets/45d0334f-c947-4bf2-9fb3-cbbfdac95dbc",
        description: "Desain poster promo bernuansa anak 3D hurufceria (playful) dengan warna terang memikat untuk acara Launching Pendidikan Anak Usia Dini PAUD (PG-TK) Arunika Raya."
      }
    ],
    title: "Launching PAUD TK",
    category: "Education Promotion",
    tools: ["Adobe Photoshop", "Adobe Illustrator"]
  },
  {
    id: 12,
    thumbnail: "https://github.com/user-attachments/assets/3bfd524d-8b8f-4c06-873f-47ebe0525688",
    images: [
      {
        url: "https://github.com/user-attachments/assets/3bfd524d-8b8f-4c06-873f-47ebe0525688",
        description: "Cover Depan Album Yearbook bernada retro dengan ilustrasi sekolah vintage, paduan warna hangat yang nostalgia dan elegan."
      },
      {
        url: "https://github.com/user-attachments/assets/ff504162-bbe1-435c-b6c4-98f54c719cea",
        description: "Halaman pembuka album. Terhampar kanvas putih dominan dengan komposisi foto polaroid bertekstur pada sisi kanan."
      },
      {
        url: "https://github.com/user-attachments/assets/eee922f3-e847-43c1-97f6-a7d5fbdc33a5",
        description: "Spread profil foto siswa (format memanjang vertikal). Tipografi serif ditata rapi menyatu dengan warna bumi."
      },
      {
        url: "https://github.com/user-attachments/assets/c80a8efa-cf85-4d12-a7bc-c875743aaefb",
        description: "Halaman memori interaktif berisi grid mosaik berbagai angle foto grup yang candid dan organik."
      },
      {
        url: "https://github.com/user-attachments/assets/23d67372-2a40-43e6-943f-c492d38db5c6",
        description: "Menampilkan estetika buku jurnal dengan coretan-coretan ilustrasi daun estetik mengiringi pas foto out-door."
      },
      {
        url: "https://github.com/user-attachments/assets/64920eca-68a4-4c80-850c-78179508454d",
        description: "Pemaparan profil individu. Setiap frame foto dibalut gradasi halus dan detail biodata alumni yang minimalis."
      },
      {
        url: "https://github.com/user-attachments/assets/3350ac1e-6cc1-4701-8d87-b1d2efe97206",
        description: "Highlight dokumentasi kegiatan seru di lingkungan sekolah. Penggunaan font brush menambah kesan kebebasan."
      },
      {
        url: "https://github.com/user-attachments/assets/8bb0a175-b5b1-4926-992b-f87bfcd61f6f",
        description: "Halaman galeri tambahan. Sentuhan layout selang-seling mengurangi kebosanan dan memberikan ruang nafas di halaman."
      },
      {
        url: "https://github.com/user-attachments/assets/cb065c54-a431-4eae-ae2a-49aac81238db",
        description: "Halaman panel staf pengajar. Penghormatan terakhir guru disusun dalam style polaroid rapi bernada kehangatan."
      },
      {
        url: "cover-belakang",
        description: "Cover belakang buku album. Menutup cerita dengan lembaran akhir penuh efek noise bertekstur, blur, dan pendaran light-leaks."
      }
    ],
    title: "Vintage Album Yearbook",
    category: "Yearbook Design",
    tools: ["Adobe Illustrator", "Adobe Photoshop"]
  },
  {
    id: 13,
    thumbnail: "https://github.com/user-attachments/assets/798aa398-8513-4073-bccd-3b1d9a592719",
    images: [
      {
        url: "https://github.com/user-attachments/assets/798aa398-8513-4073-bccd-3b1d9a592719",
        description: "Cover Depan Edu-wisata Lontar Sewu. Desain bernuansa hijau alami mengusung tema agrowisata."
      },
      {
        url: "https://github.com/user-attachments/assets/0d58fe71-00bd-40eb-b431-c8279ce486bb",
        description: "Halaman pengantar Edu-wisata Lontar Sewu. Pengenalan ekowisata alam pedesaan dengan layout modern."
      },
      {
        url: "https://github.com/user-attachments/assets/87fd35eb-c89b-41f7-9be8-8356ded4c06a",
        description: "Denah rute dan katalog wisata. Pemetaan destinasi visual yang memudahkan navigasi pengunjung."
      },
      {
        url: "https://github.com/user-attachments/assets/ce6fa56f-257d-4d8b-91d4-9c5555848c78",
        description: "Cover belakang dan detail kontak. Informasi reservasi wisata dan sosial media terintegrasi."
      }
    ],
    title: "Eco-Tourism Booklet",
    category: "Booklet Design",
    tools: ["Adobe Illustrator", "Adobe Photoshop"]
  },
  {
    id: 14,
    thumbnail: "https://github.com/user-attachments/assets/504ccc0b-75bb-478f-8178-9084b205d864",
    images: [
      {
        url: "https://github.com/user-attachments/assets/504ccc0b-75bb-478f-8178-9084b205d864",
        description: "Desain poster visual komunikatif berupa layout informatif bernada grafis modern."
      }
    ],
    title: "Creative Banner Poster",
    category: "Poster Design",
    tools: ["Adobe Photoshop", "Adobe Illustrator"]
  },
  {
    id: 15,
    thumbnail: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80",
    images: [],
    title: "Resik Suroboyo App Prototype",
    category: "UI/UX Prototype",
    tools: ["Figma", "UI/UX Research"],
    figmaUrl: "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FKwpMcasCJnROXYqbknY77r%2FTUGAS-KULIAH-SEMESTER-3--Copy-%3Fnode-id%3D2059-1660%26starting-point-node-id%3D2059%253A1660%26t%3D8exfSChYh4N19i3n-1"
  }
];

// Helper to instantly compress & resize images for fast loading grid!
const optimizeImage = (url: string) => {
  if (url.includes('unsplash.com')) {
    return `${url}&w=400&q=60`;
  }
  return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=400&q=60&output=webp`;
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 25 },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 50 : -50,
    opacity: 0,
    transition: { type: "spring", stiffness: 300, damping: 25 },
  })
};

const DesignPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [designs, setDesigns] = useState<DesignProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<DesignProject | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPanelMinimized, setIsPanelMinimized] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const bookRef = useRef<any>(null); // Ref for HTMLFlipBook

  const isFlipBook = selectedProject?.category === "Yearbook Design" || selectedProject?.category === "Booklet Design";
  const isBooklet = selectedProject?.category === "Booklet Design";

  const getFlipBookPages = () => {
    if (!isFlipBook || !selectedProject) return [];
    const imgs = selectedProject.images;
    
    if (selectedProject.category === "Yearbook Design") {
      return [
        { type: 'image', data: imgs[0] }, // Cover
        { type: 'blank', data: null }, // Inside Front Cover
        { type: 'image', data: imgs[1] },
        { type: 'image', data: imgs[2] },
        { type: 'image', data: imgs[3] },
        { type: 'image', data: imgs[4] },
        { type: 'image', data: imgs[5] },
        { type: 'image', data: imgs[6] },
        { type: 'image', data: imgs[7] },
        { type: 'image', data: imgs[8] },
        { type: 'blank', data: null }, // Inside Back Cover
        { type: 'backcover', data: null } // Back Cover
      ];
    } else {
      // Booklet Design (4 Images)
      return [
        { type: 'image', data: imgs[0] }, // Front Cover
        { type: 'image', data: imgs[1] }, // Page 1
        { type: 'image', data: imgs[2] }, // Page 2
        { type: 'image', data: imgs[3] }  // Back Cover
      ];
    }
  };

  const pages = getFlipBookPages();
  const totalSlides = isFlipBook ? pages.length : selectedProject?.images.length || 0;

  useEffect(() => {
    // Simulate loading delay for smooth transition
    const timer = setTimeout(() => {
      setDesigns(placeholderDesigns);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-transparent to-teal-900/20" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 rounded-full border-2 border-emerald-500/30 border-t-emerald-400"
          />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl md:text-2xl font-bold text-white tracking-widest uppercase"
          >
            Loading Design
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-white/50 text-sm mt-2 font-mono tracking-wider"
          >
            PREPARING CANVAS...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-x-hidden selection:bg-emerald-500/30">
      <FloatingNavbar />
      
      {/* Subtle Animated Background grid */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.05)_0%,transparent_50%)] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 md:px-8 pt-32 pb-24">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-24"
        >
          <h1 className="text-5xl md:text-7xl font-[family-name:var(--font-display)] italic font-light mb-6 tracking-tight">
            Creative <span className="font-sans font-bold not-italic">Canvas</span>
          </h1>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Kumpulan hasil karya desain grafis, tipografi, dan visual branding yang pernah saya buat. 
            Menerjemahkan ide abstrak menjadi visual yang konkrit dan estetik.
          </p>
        </motion.div>

        {/* Masonry Gallery Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {designs.map((design, index) => (
            <motion.div
              key={design.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="break-inside-avoid relative group cursor-pointer"
              onClick={() => {
                setSelectedProject(design);
                setCurrentSlideIndex(0);
                setIsPanelMinimized(design.category === "Yearbook Design" || design.category === "Booklet Design");
              }}
            >
              <div className="w-full relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 group-hover:border-emerald-500/30 transition-colors duration-500">
                <img
                  src={optimizeImage(design.thumbnail)}
                  alt={design.title}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                
                {/* Always-visible Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent flex flex-col justify-end p-5 md:p-6 pointer-events-none transition-opacity duration-500">
                  <div className="flex flex-col gap-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                    <span className="text-emerald-400 text-[10px] sm:text-xs font-mono tracking-wider uppercase drop-shadow-md">
                      {design.category}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-white leading-tight drop-shadow-lg">
                      {design.title}
                    </h3>
                  </div>
                </div>

                {/* View Badge (Top Right) */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform -translate-y-2 group-hover:translate-y-0">
                  <div className="px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold tracking-widest uppercase flex items-center shadow-2xl group-hover:bg-black/60 transition-colors">
                    Click to View
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Slider Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center"
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 md:top-8 md:right-8 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X size={24} />
            </button>

            {/* Previous Button */}
            {totalSlides > 1 && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  if (isFlipping) return;
                  setDirection(-1);
                  if (isFlipBook && bookRef.current) {
                    bookRef.current.pageFlip().flipPrev('bottom');
                  } else {
                    setCurrentSlideIndex(prev => prev === 0 ? totalSlides - 1 : prev - 1);
                  }
                }}
                className="absolute left-4 md:left-10 z-[300] w-12 h-12 bg-black/50 hover:bg-black/80 border border-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-colors"
              >
                <ChevronLeft size={28} className="mr-1" />
              </button>
            )}

            {/* Sliding Image Container */}
            <div className="relative w-full h-full p-4 md:p-16 flex items-center justify-center overflow-hidden" onClick={() => setSelectedProject(null)} style={{ perspective: 1500 }}>
              <div className="w-full h-full relative flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                {isFlipBook ? (
                  <motion.div 
                    animate={{
                      x: currentSlideIndex === 0 ? '-25%' : currentSlideIndex >= pages.length - 2 ? '25%' : '0%',
                      scale: currentSlideIndex === 0 || currentSlideIndex >= pages.length - 2 ? 1.25 : 1.1
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className="w-full max-w-[1400px] flex justify-center items-center drop-shadow-2xl"
                  >
                    <HTMLFlipBook 
                      width={isBooklet ? 450 : 650} 
                      height={isBooklet ? 640 : 450} 
                      size="stretch"
                      minWidth={isBooklet ? 250 : 300}
                      maxWidth={isBooklet ? 500 : 700}
                      minHeight={isBooklet ? 350 : 250}
                      maxHeight={isBooklet ? 750 : 550}
                      maxShadowOpacity={0.4}
                      drawShadow={true}
                      showCover={true}
                      mobileScrollSupport={true}
                      flippingTime={1200}
                      usePortrait={false} // Force desktop landscape simulation
                      className="demo-book mx-auto"
                      ref={bookRef}
                      onFlip={(e: any) => setCurrentSlideIndex(e.data)}
                      onChangeState={(e: any) => setIsFlipping(e.data !== 'read')}
                    >
                      {pages.map((page, i) => (
                        <Page key={i} density="hard">
                          {page.type === 'blank' ? (
                            <div className="w-full h-full bg-[#f2f0eb]" />
                          ) : page.type === 'backcover' ? (
                            <div className="w-full h-full bg-gradient-to-br from-[#2a221d] to-[#120e0b] relative">
                              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-60 mix-blend-overlay"></div>
                              <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-orange-600/20 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"></div>
                              <div className="absolute inset-0 flex items-center justify-center text-white/30 font-serif italic text-2xl tracking-widest mix-blend-screen">
                                Alumni 2024.
                              </div>
                            </div>
                          ) : (
                            <img src={page.data.url} className={`w-full h-full object-cover ${i === 0 ? 'border-l border-white/20' : i % 2 === 0 ? 'border-l border-white/20' : 'border-r border-black/10'}`} />
                          )}
                        </Page>
                      ))}
                    </HTMLFlipBook>
                  </motion.div>
                ) : selectedProject.figmaUrl ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-[400px] h-[80vh] bg-black rounded-3xl overflow-hidden border-2 border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative z-[200] flex"
                  >
                    <iframe 
                      style={{ border: "none" }}
                      width="100%" 
                      height="100%" 
                      src={selectedProject.figmaUrl} 
                      allowFullScreen
                      className="bg-[#1e1e1e]"
                    ></iframe>
                  </motion.div>
                ) : (
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.img 
                      key={currentSlideIndex}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter" animate="center" exit="exit"
                      src={selectedProject.images[currentSlideIndex].url} 
                      alt={`${selectedProject.title} detail ${currentSlideIndex + 1}`} 
                      className="max-w-full max-h-full object-contain md:max-h-[75vh] rounded-lg shadow-2xl absolute"
                    />
                  </AnimatePresence>
                )}
              </div>

              {/* Project Details Overlay / Floating Panel */}
              <div 
                className="absolute bottom-4 left-4 right-4 md:bottom-12 md:left-24 md:right-auto z-[60] w-full max-w-sm md:max-w-lg bg-black/70 backdrop-blur-3xl border border-white/10 p-5 md:p-6 rounded-3xl shadow-2xl pointer-events-auto transition-all duration-500" 
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl md:text-3xl font-bold text-white leading-tight">{selectedProject.title}</h2>
                    <p className="text-emerald-400 font-mono tracking-widest text-[10px] md:text-xs uppercase mt-1 md:mt-2">{selectedProject.category}</p>
                  </div>
                  <button 
                    onClick={() => setIsPanelMinimized(!isPanelMinimized)}
                    className="p-2 ml-4 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors border border-white/10 shrink-0"
                    title={isPanelMinimized ? "Expand info" : "Minimize info"}
                  >
                    {isPanelMinimized ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
                
                <AnimatePresence initial={false}>
                  {!isPanelMinimized && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 md:pt-6">
                        {isFlipBook ? (
                          <motion.div 
                            key={`desc-${currentSlideIndex}`}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-white/70 text-[11px] md:text-sm leading-relaxed mb-4 md:mb-6"
                          >
                            {currentSlideIndex > 0 ? (
                              <p className="mb-2"><span className="text-white/40 uppercase text-[9px] mr-2">Page {currentSlideIndex}</span> {pages[currentSlideIndex]?.data?.description || ''}</p>
                            ) : (
                              <p className="mb-2"><span className="text-white/40 uppercase text-[9px] mr-2">Cover</span> {pages[0]?.data?.description || ''}</p>
                            )}
                          </motion.div>
                        ) : selectedProject.figmaUrl ? (
                          <motion.div 
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-white/70 text-sm leading-relaxed mb-4 md:mb-6"
                          >
                            Prototipe desain interaktif aplikasi pengelola sampah terintegrasi untuk Kota Surabaya. Silakan gunakan kursor pada layar perangkat (dummy handphone) di atas untuk berinteraksi langsung memutar dan mengklik (clickable) antarmuka dan navigasi UI/UX aplikasi Resik Suroboyo ini.
                          </motion.div>
                        ) : selectedProject.images[currentSlideIndex]?.description && (
                          <motion.p 
                            key={currentSlideIndex}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-white/70 text-sm leading-relaxed mb-4 md:mb-6"
                          >
                            {selectedProject.images[currentSlideIndex].description}
                          </motion.p>
                        )}
                        
                        {selectedProject.tools && (
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.tools.map((tool, i) => (
                              <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-[10px] md:text-xs font-semibold tracking-wide text-white/90 border border-white/20">
                                {tool}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Pagination Dots */}
              {totalSlides > 1 && !isFlipBook && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10" onClick={(e) => e.stopPropagation()}>
                  {Array.from({ length: totalSlides }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isFlipping) return;
                        setDirection(idx > currentSlideIndex ? 1 : -1);
                        setCurrentSlideIndex(idx);
                      }}
                      className={`transition-all duration-300 rounded-full ${idx === currentSlideIndex ? 'w-6 h-2 bg-emerald-500' : 'w-2 h-2 bg-white/30 hover:bg-white/50'}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Next Button */}
            {totalSlides > 1 && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  if (isFlipping) return;
                  setDirection(1);
                  if (isFlipBook && bookRef.current) {
                    bookRef.current.pageFlip().flipNext('bottom');
                  } else {
                    setCurrentSlideIndex(prev => prev === totalSlides - 1 ? 0 : prev + 1);
                  }
                }}
                className="absolute right-4 md:right-10 z-[300] w-12 h-12 bg-black/50 hover:bg-black/80 border border-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-colors"
              >
                <ChevronRight size={28} className="ml-1" />
              </button>
            )}

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default DesignPage;
