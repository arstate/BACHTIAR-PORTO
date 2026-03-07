import { motion, useScroll, useTransform } from 'motion/react';
import { ExternalLink, Instagram, Video, ArrowRight } from 'lucide-react';
import { useRef } from 'react';

const Portfolio = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.5, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-45, 45]);

  const links = [
    { name: "Arstate Cinema Web", url: "https://www.arstatecinema.com", icon: <ExternalLink size={20} /> },
    { name: "Personal Web", url: "https://www.aryansyah.site", icon: <ExternalLink size={20} /> },
    { name: "@aryansyah.ow", url: "https://instagram.com/aryansyah.ow", icon: <Instagram size={20} /> },
    { name: "@arstate.cinema", url: "https://instagram.com/arstate.cinema", icon: <Instagram size={20} /> },
    { name: "@arya_arstate.cinema", url: "https://tiktok.com/@arya_arstate.cinema", icon: <Video size={20} /> },
  ];

  const projects = [
    { title: "Wedding Cinematic", category: "Videography", img: "https://picsum.photos/seed/wedding/800/800.webp", span: "md:col-span-2 md:row-span-2" },
    { title: "Corporate Event", category: "Documentation", img: "https://picsum.photos/seed/corporate/800/400.webp", span: "md:col-span-2 md:row-span-1" },
    { title: "Commercial Ad", category: "Directing", img: "https://picsum.photos/seed/commercial/400/400.webp", span: "md:col-span-1 md:row-span-1" },
    { title: "Portrait Session", category: "Photography", img: "https://picsum.photos/seed/portrait/400/400.webp", span: "md:col-span-1 md:row-span-1" },
  ];

  return (
    <section id="portfolio" ref={ref} className="py-32 px-6 relative overflow-hidden">
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
              className={`portfolio-item group relative rounded-[2rem] overflow-hidden cursor-none ${project.span}`}
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
    </section>
  );
};

export default Portfolio;
