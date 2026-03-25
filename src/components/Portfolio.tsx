import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ExternalLink, Instagram, Video, ArrowRight, X } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

const Portfolio = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.5, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-45, 45]);
  const navigate = useNavigate();

  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [slideshowIndex, setSlideshowIndex] = useState(0);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  // Slideshow Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideshowIndex(prev => prev + 1);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

    const links = [
    { name: "Arstate Cinema Web", url: "https://www.arstatecinema.com", icon: <ExternalLink size={20} /> },
    { name: "@aryansyah.ow", url: "https://instagram.com/aryansyah.ow", icon: <Instagram size={20} /> },
    { name: "@arstate.cinema", url: "https://instagram.com/arstate.cinema", icon: <Instagram size={20} /> },
  ];

  const projects = [
    { 
      title: "Wedding Photography", 
      category: "Photography", 
      img: "https://github.com/user-attachments/assets/be2f3bce-ca30-4275-a94d-0969f890cbd1", 
      images: [
        "https://github.com/user-attachments/assets/be2f3bce-ca30-4275-a94d-0969f890cbd1",
        "https://github.com/user-attachments/assets/abf32273-1d69-41ab-8e12-854b6e08a3c3",
        "https://github.com/user-attachments/assets/e5099c48-fbcd-4dff-8232-e23c27c7fa50",
        "https://github.com/user-attachments/assets/c8d15aa0-758d-4947-b75b-28763c93dcb4",
        "https://github.com/user-attachments/assets/e236fe1c-dfa9-4c0c-a851-db770c0699df"
      ],
      span: "md:col-span-2 md:row-span-2",
      brief: "A professional wedding photography capturing the emotional journey of the couple's special day. Focus on storytelling, candid moments, and elegant aesthetics.",
      tools: ["Sony A7II", "Sony A7SII", "Lightroom", "Photoshop"]
    },
    {
      title: "Videography",
      category: "Documentation",
      img: "https://github.com/user-attachments/assets/43b6911a-a5a9-4ebe-b05b-0f11912f46cb",
      images: [
        "https://github.com/user-attachments/assets/43b6911a-a5a9-4ebe-b05b-0f11912f46cb",
        "https://github.com/user-attachments/assets/61987ca9-96c2-4e28-bb8a-1b7d510f7e00",
        "https://github.com/user-attachments/assets/06877854-c86e-4089-b311-ce08c22b49e5",
        "https://github.com/user-attachments/assets/b5992f9f-abf4-49b2-ba37-73cb8c1196e4",
        "https://github.com/user-attachments/assets/5ba43c16-ca93-41d2-89aa-5936f7e353e6"
      ],
      span: "md:col-span-2 md:row-span-1",
      brief: "Professional videography documentation capturing the energy and atmosphere of live events. High-quality visuals synced with the rhythm of the moment.",
      tools: ["Sony A7II", "Sony A7SII", "DJI Ronin", "Premiere Pro"]
    },
    { 
      title: "Event Photography", 
      category: "Photography", 
      img: "https://github.com/user-attachments/assets/88247a29-7145-4a89-b945-e2db00f27d97", 
      images: [
        "https://github.com/user-attachments/assets/88247a29-7145-4a89-b945-e2db00f27d97",
        "https://github.com/user-attachments/assets/86c40cf3-3f66-4e2e-bcc5-2cce6247ce2d",
        "https://github.com/user-attachments/assets/1828eceb-8ff4-405a-baef-d6557be297e8",
        "https://github.com/user-attachments/assets/1f48c8f8-0a43-46c0-b27d-0728019f896a",
        "https://github.com/user-attachments/assets/358e11a1-51be-4a43-9e64-709a6b6488db"
      ],
      span: "md:col-span-1 md:row-span-1",
      date: "2025",
      city: "Surabaya",
      duration: "1 day shoot, 2 days editing",
      brief: "Official photography documentation for Pocari Sweat IONation 6 event held in Surabaya. The project covered the full event — from participant activities and brand installations to crowd atmosphere and key moments on stage. Visuals were produced for social media publication and brand archive purposes.",
      tools: ["Sony A7II", "Sony A7SII", "Flash Godox", "Lightroom"]
    },
    { 
      title: "See More", 
      category: "Explore", 
      img: "https://picsum.photos/seed/explore/400/400.webp", 
      span: "md:col-span-1 md:row-span-1",
      brief: "Explore our full portfolio of work across various categories.",
      tools: [],
      isSeeMore: true
    },
  ];

  const handleProjectClick = (project: any) => {
    if (project.isSeeMore) {
      navigate('/portfolio');
      window.scrollTo(0, 0);
    } else {
      setSelectedProject(project);
    }
  };

  const getOptimizedUrl = (url: string, width: number) => {
    if (url.includes('picsum.photos')) {
      return url; // picsum urls in Portfolio are already sized appropriately
    }
    return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=${width}&output=webp&q=80`;
  };

  return (
    <section id="portfolio" ref={ref} className="py-32 px-6 relative overflow-hidden z-10 w-full md:w-[140%] md:-ml-[20%]">
      {/* Scroll-linked morphing gradient - Optimized for iOS Safari! */}
      {/* Replaced blur-[100px] with native radial gradient to avoid WebKit compositor crash on mobile */}
      <motion.div 
        style={{ 
          scale, 
          rotate,
          background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(168,85,247,0.1) 30%, transparent 60%)"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] md:w-[80vw] md:h-[80vw] rounded-full pointer-events-none z-0"
      />
      
      {/* Sweeping gradient background - Optimized to avoid Main-Thread Repaint */}
      <motion.div 
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%)] bg-[length:200%_200%] pointer-events-none z-0"
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-white" />
              <span className="uppercase tracking-widest text-sm text-white/70 font-medium">Selected Works</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-[family-name:var(--font-display)] italic font-light">
              Portfolio
            </h2>
          </div>
          <p className="text-white/50 max-w-sm font-light">
            A curated collection of my best visual stories, capturing the essence of every moment.
          </p>
        </motion.div>

        {/* Asymmetrical Bento Grid for Portfolio */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-4 auto-rows-[300px] gap-6 mb-16"
        >
          {projects.map((project, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, scale: 0.9, y: 20 }, visible: { opacity: 1, scale: 1, y: 0 } }}
              transition={{ type: "spring", stiffness: 50 }}
              onClick={() => handleProjectClick(project)}
              className={`portfolio-item group relative rounded-[2rem] overflow-hidden cursor-pointer ${project.span}`}
            >
              {!project.isSeeMore ? (
                <>
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={project.images ? project.images[slideshowIndex % project.images.length] : project.img}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1 }}
                      transition={{ duration: 0.8 }}
                      src={getOptimizedUrl(project.images ? project.images[slideshowIndex % project.images.length] : project.img, 500)} 
                      alt={project.title} 
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-400 text-sm font-medium mb-2 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{project.category}</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-white">{project.title}</h3>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                        <ArrowRight size={20} className="text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 rounded-[2rem] transition-colors duration-500 pointer-events-none" />
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-white/15 backdrop-blur-3xl border border-white/20 group-hover:bg-white/25 group-hover:border-white/40 transition-all duration-500">
                  <div className="mb-6 w-16 h-16 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                    <ArrowRight size={32} className="text-black" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-white/60 font-medium uppercase tracking-widest text-sm">{project.category}</p>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-6 right-6">
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                  </div>
                  <div className="absolute bottom-6 left-6">
                    <div className="w-12 h-[1px] bg-white/10" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>


        {/* Links Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card p-8 md:p-12"
        >
          <h3 className="text-sm uppercase tracking-widest text-white/50 mb-8 text-center">Connect & Discover More</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {links.map((link, i) => (
              <a 
                key={i} 
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all group"
              >
                <div className="text-white/50 group-hover:text-white transition-colors">
                  {link.icon}
                </div>
                <span className="font-medium text-white/80 group-hover:text-white transition-colors">{link.name}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Project Modal */}
      {createPortal(
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="w-auto max-w-[95vw] md:max-w-[90vw] bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Media Section */}
                <div className="relative flex-1 bg-[#050505] flex items-center justify-center min-h-[40vh] md:min-h-0">
                  <img 
                    src={selectedProject.images ? selectedProject.images[slideshowIndex % selectedProject.images.length] : selectedProject.img} 
                    alt={selectedProject.title} 
                    className="max-w-full max-h-[50vh] md:max-h-[90vh] w-auto h-auto object-contain block"
                    referrerPolicy="no-referrer"
                  />
                  {/* Placeholder for video play button if it were a video */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/20">
                      <Video size={24} className="text-white/80" />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="w-full md:w-[420px] p-8 md:p-10 flex flex-col overflow-y-auto shrink-0 border-t md:border-t-0 md:border-l border-white/10">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <p className="text-blue-400 text-sm font-medium mb-2 tracking-widest uppercase">{selectedProject.category}</p>
                      <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">{selectedProject.title}</h3>
                    </div>
                    <button 
                      onClick={() => setSelectedProject(null)}
                      className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors border border-white/10 shrink-0 ml-4"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Meta details grid */}
                  {(selectedProject.date || selectedProject.city || selectedProject.duration) && (
                    <div className="grid grid-cols-2 gap-4 mb-8 pb-8 border-b border-white/10">
                      {selectedProject.date && (
                        <div>
                          <p className="text-white/30 text-xs uppercase tracking-widest mb-1">Date</p>
                          <p className="text-white font-medium">{selectedProject.date}</p>
                        </div>
                      )}
                      {selectedProject.city && (
                        <div>
                          <p className="text-white/30 text-xs uppercase tracking-widest mb-1">City</p>
                          <p className="text-white font-medium">{selectedProject.city}</p>
                        </div>
                      )}
                      {selectedProject.duration && (
                        <div className="col-span-2">
                          <p className="text-white/30 text-xs uppercase tracking-widest mb-1">Project Duration</p>
                          <p className="text-white font-medium">{selectedProject.duration}</p>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mb-8">
                    <h4 className="text-sm uppercase tracking-widest text-white/50 mb-3">Description</h4>
                    <p className="text-white/80 font-light leading-relaxed">
                      {selectedProject.brief}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <h4 className="text-sm uppercase tracking-widest text-white/50 mb-3">Tools Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tools.map((tool: string, i: number) => (
                        <span key={i} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};

export default Portfolio;
