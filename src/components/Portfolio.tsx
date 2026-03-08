import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ExternalLink, Instagram, Video, ArrowRight, X } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const Portfolio = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.5, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-45, 45]);

  const [selectedProject, setSelectedProject] = useState<any>(null);

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

  const links = [
    { name: "Arstate Cinema Web", url: "https://www.arstatecinema.com", icon: <ExternalLink size={20} /> },
    { name: "Personal Web", url: "https://www.aryansyah.site", icon: <ExternalLink size={20} /> },
    { name: "@aryansyah.ow", url: "https://instagram.com/aryansyah.ow", icon: <Instagram size={20} /> },
    { name: "@arstate.cinema", url: "https://instagram.com/arstate.cinema", icon: <Instagram size={20} /> },
    { name: "@arya_arstate.cinema", url: "https://tiktok.com/@arya_arstate.cinema", icon: <Video size={20} /> },
  ];

  const projects = [
    { 
      title: "Wedding Cinematic", 
      category: "Videography", 
      img: "https://picsum.photos/seed/wedding/800/800.webp", 
      span: "md:col-span-2 md:row-span-2",
      brief: "A cinematic wedding documentation capturing the emotional journey of the couple's special day. Focus on storytelling, candid moments, and high-quality color grading.",
      tools: ["Sony FX3", "Premiere Pro", "DaVinci Resolve"]
    },
    { 
      title: "Corporate Event", 
      category: "Documentation", 
      img: "https://picsum.photos/seed/corporate/800/400.webp", 
      span: "md:col-span-2 md:row-span-1",
      brief: "Full-day coverage of an annual corporate summit. Delivered a highlight reel and full session recordings with professional audio syncing.",
      tools: ["Sony A7IV", "DJI Ronin", "Final Cut Pro"]
    },
    { 
      title: "Commercial Ad", 
      category: "Directing", 
      img: "https://picsum.photos/seed/commercial/400/400.webp", 
      span: "md:col-span-1 md:row-span-1",
      brief: "Directed a 30-second commercial spot for a local lifestyle brand. Managed the crew, talent, and post-production pipeline.",
      tools: ["RED Komodo", "After Effects", "Cinema 4D"]
    },
    { 
      title: "Portrait Session", 
      category: "Photography", 
      img: "https://picsum.photos/seed/portrait/400/400.webp", 
      span: "md:col-span-1 md:row-span-1",
      brief: "Creative portrait session for an upcoming artist's album cover. Explored dramatic lighting and unique compositions.",
      tools: ["Canon R5", "Profoto Lighting", "Lightroom"]
    },
  ];

  return (
    <section id="portfolio" ref={ref} className="py-32 px-6 relative overflow-hidden z-10 w-full md:w-[140%] md:-ml-[20%]">
      {/* Scroll-linked morphing gradient */}
      <motion.div 
        style={{ scale, rotate }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] md:w-[60vw] md:h-[60vw] bg-gradient-to-tr from-purple-900/10 to-blue-900/10 blur-[100px] rounded-full pointer-events-none z-0"
      />
      
      {/* Sweeping gradient background */}
      <motion.div 
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
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
              onClick={() => setSelectedProject(project)}
              className={`portfolio-item group relative rounded-[2rem] overflow-hidden cursor-pointer ${project.span}`}
            >
              <img 
                src={project.img} 
                alt={project.title} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
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
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Media Section */}
              <div className="w-full md:w-3/5 h-64 md:h-auto relative bg-black">
                <img 
                  src={selectedProject.img} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
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
              <div className="w-full md:w-2/5 p-8 md:p-10 flex flex-col overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-blue-400 text-sm font-medium mb-2 tracking-widest uppercase">{selectedProject.category}</p>
                    <h3 className="text-3xl md:text-4xl font-bold text-white">{selectedProject.title}</h3>
                  </div>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors border border-white/10"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="mb-8">
                  <h4 className="text-sm uppercase tracking-widest text-white/50 mb-3">Client Brief</h4>
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
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
