import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, ZoomIn, ChevronLeft, ChevronRight, X } from 'lucide-react';
import FloatingNavbar from './FloatingNavbar';

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
  }
];

// Helper to instantly compress & resize images for fast loading grid!
const optimizeImage = (url: string) => {
  if (url.includes('unsplash.com')) {
    return `${url}&w=400&q=60`;
  }
  return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=400&q=60&output=webp`;
};

const DesignPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [designs, setDesigns] = useState<DesignProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<DesignProject | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

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
            {selectedProject.images.length > 1 && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlideIndex(prev => prev === 0 ? selectedProject.images.length - 1 : prev - 1);
                }}
                className="absolute left-4 md:left-10 z-50 w-12 h-12 bg-black/50 hover:bg-black/80 border border-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-colors"
              >
                <ChevronLeft size={28} className="mr-1" />
              </button>
            )}

            {/* Sliding Image */}
            <div className="relative w-full h-full p-4 md:p-16 flex items-center justify-center overflow-hidden" onClick={() => setSelectedProject(null)}>
              <div className="w-full h-full relative flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <motion.img 
                  key={currentSlideIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  src={selectedProject.images[currentSlideIndex].url} 
                  alt={`${selectedProject.title} detail ${currentSlideIndex + 1}`} 
                  className="max-w-full max-h-full object-contain md:max-h-[70vh] rounded-lg shadow-2xl"
                />
              </div>

              {/* Project Details Overlay / Floating Panel */}
              <div 
                className="absolute bottom-4 left-4 right-4 md:bottom-12 md:left-24 md:right-auto z-[60] max-w-lg bg-black/70 backdrop-blur-3xl border border-white/10 p-5 md:p-6 rounded-3xl shadow-2xl pointer-events-auto" 
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl md:text-3xl font-bold text-white mb-2 leading-tight">{selectedProject.title}</h2>
                <p className="text-emerald-400 font-mono tracking-widest text-[10px] md:text-xs uppercase mb-3 md:mb-4">{selectedProject.category}</p>
                
                {selectedProject.images[currentSlideIndex].description && (
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
              
              {/* Pagination Dots */}
              {selectedProject.images.length > 1 && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10" onClick={(e) => e.stopPropagation()}>
                  {selectedProject.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlideIndex(idx)}
                      className={`transition-all duration-300 rounded-full ${idx === currentSlideIndex ? 'w-6 h-2 bg-emerald-500' : 'w-2 h-2 bg-white/30 hover:bg-white/50'}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Next Button */}
            {selectedProject.images.length > 1 && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlideIndex(prev => prev === selectedProject.images.length - 1 ? 0 : prev + 1);
                }}
                className="absolute right-4 md:right-10 z-50 w-12 h-12 bg-black/50 hover:bg-black/80 border border-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-colors"
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
