import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'motion/react';
import { ExternalLink, Instagram, Video, Mail, Phone, MapPin, ArrowRight, Play } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import Lenis from 'lenis';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.portfolio-item')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[100] pointer-events-none flex items-center justify-center rounded-full overflow-hidden"
      animate={{
        x: mousePosition.x - (isHovering ? 40 : 8),
        y: mousePosition.y - (isHovering ? 40 : 8),
        width: isHovering ? 80 : 16,
        height: isHovering ? 80 : 16,
        backgroundColor: isHovering ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.5)",
        backdropFilter: isHovering ? "blur(4px)" : "blur(0px)",
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.2 }}
    >
      <motion.span 
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovering ? 1 : 0 }}
        className="text-black text-xs font-bold tracking-widest"
      >
        PLAY
      </motion.span>
    </motion.div>
  );
};

const NoiseOverlay = () => (
  <div 
    className="fixed inset-0 z-[999] pointer-events-none opacity-[0.05]"
    style={{ 
      backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
      backgroundSize: '256px 256px'
    }}
  />
);

const Background = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  
  const bg = useTransform(smoothProgress, 
    [0, 0.25, 0.5, 0.75, 1], 
    ["#050505", "#0a0514", "#051014", "#140505", "#050505"]
  );
  
  const y1 = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const y2 = useTransform(smoothProgress, [0, 1], ["0%", "-100%"]);
  const scale1 = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.5, 1]);
  const scale2 = useTransform(smoothProgress, [0, 0.5, 1], [1, 0.8, 1.2]);

  return (
    <motion.div style={{ backgroundColor: bg }} className="fixed inset-0 z-[-1] overflow-hidden">
      <motion.div style={{ y: y1, scale: scale1 }} className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(30,58,138,0.15)_0%,transparent_60%)] mix-blend-screen" />
      <motion.div style={{ y: y2, scale: scale2 }} className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle,rgba(88,28,135,0.15)_0%,transparent_60%)] mix-blend-screen" />
      <motion.div style={{ scale: scale1 }} className="absolute top-[30%] left-[40%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(120,53,15,0.1)_0%,transparent_60%)] animate-float mix-blend-screen" />
      
      {/* Dynamic Grid Pattern */}
      <motion.div 
        style={{ opacity: useTransform(smoothProgress, [0, 0.5, 1], [0.1, 0.3, 0.1]) }}
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"
      />
    </motion.div>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const yText = useTransform(scrollY, [0, 1000], [0, 150]);
  const opacityBg = useTransform(scrollY, [0, 500], [0.2, 0]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-6 py-24 overflow-hidden">
      <motion.div style={{ y: y1, opacity: opacityBg }} className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {/* Cinematic Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen"
          src="https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-26772-large.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505]" />
        
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 100, repeat: Infinity, ease: "linear" }} className="w-[120vw] h-[120vw] md:w-[800px] md:h-[800px] border-[1px] border-white/10 rounded-full absolute border-dashed" />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }} className="w-[100vw] h-[100vw] md:w-[600px] md:h-[600px] border-[1px] border-white/10 rounded-full absolute" />
        <motion.div 
          animate={{ x: ["-100%", "200%"] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} 
          className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 blur-2xl"
        />
      </motion.div>

      <motion.div 
        style={{ y: yText }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 text-center w-full max-w-7xl mx-auto flex flex-col items-center"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.03] border border-white/10 text-sm font-medium mb-12 tracking-widest uppercase text-white/70 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          Bachtiar Aryansyah Putra
        </motion.div>
        
        <div className="flex flex-col items-center justify-center leading-[0.85] mb-12 w-full">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl md:text-[9vw] font-bold tracking-tighter uppercase text-white"
          >
            Capturing
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 md:gap-8"
          >
            <div className="hidden md:block w-12 md:w-24 h-[2px] bg-white/30" />
            <h1 className="text-6xl sm:text-8xl md:text-[11vw] font-[family-name:var(--font-display)] italic font-light text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 lowercase pr-4">
              moments
            </h1>
            <div className="hidden md:block w-12 md:w-24 h-[2px] bg-white/30" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-[7vw] font-bold tracking-tighter uppercase text-outline"
          >
            Masterpieces
          </motion.h1>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="glass-card p-6 md:p-8 max-w-2xl w-full flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <p className="text-sm md:text-base text-white/60 font-light text-left max-w-xs">
            Freelance Creative Media <br/>
            Founder & Creative Director of <span className="text-white font-medium">Arstate.Cinema</span>
          </p>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <a 
              href="#portfolio" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform"
            >
              <Play size={20} className="ml-1" fill="currentColor" />
            </a>
            <a 
              href="#contact" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="glass-button px-6 py-4 text-sm font-medium flex-1 sm:flex-none text-center"
            >
              Let's Talk
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const About = () => {
  const ref = useRef(null);
  const imgContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const { scrollYProgress: imgScroll } = useScroll({ target: imgContainerRef, offset: ["start end", "end start"] });
  
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const x = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  
  const imgY1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const imgY2 = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const innerImgY = useTransform(imgScroll, [0, 1], ["-15%", "15%"]);

  return (
    <section id="about" ref={ref} className="py-32 px-6 relative overflow-hidden">
      {/* Morphing Background Shape */}
      <motion.div 
        style={{ rotate, scale, x }}
        className="absolute top-1/2 left-1/4 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-blue-900/10 blur-[80px] -translate-y-1/2 z-0 pointer-events-none rounded-[40%_60%_70%_30%/40%_50%_60%_50%]"
      />

      {/* Background Marquee */}
      <div className="absolute top-1/2 left-0 w-[200%] -translate-y-1/2 overflow-hidden opacity-[0.03] pointer-events-none z-0 flex">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }} 
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="whitespace-nowrap text-[15vw] font-bold uppercase"
        >
          CREATIVE DIRECTOR • VIDEOGRAPHER • PHOTOGRAPHER • CREATIVE DIRECTOR • VIDEOGRAPHER • PHOTOGRAPHER • 
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <motion.div 
            style={{ y: imgY1 }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            {/* Main Arch Image */}
            <div ref={imgContainerRef} className="relative z-10 rounded-t-full rounded-b-[3rem] overflow-hidden aspect-[3/4] border border-white/10">
              <motion.img 
                style={{ y: innerImgY, scale: 1.2 }}
                src="https://picsum.photos/seed/photographer/800/1000.webp" 
                alt="Bachtiar Aryansyah Putra" 
                loading="lazy"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
            </div>
            
            {/* Floating Accent Image */}
            <motion.div 
              style={{ y: imgY2 }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="absolute -bottom-12 -right-6 md:-right-12 w-48 aspect-square rounded-full overflow-hidden border-8 border-[#050505] z-20 hidden sm:block"
            >
              <img 
                src="https://picsum.photos/seed/camera/400/400.webp" 
                alt="Camera" 
                loading="lazy"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
          
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
            className="lg:col-span-7 space-y-8"
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-blue-500" />
              <span className="uppercase tracking-widest text-sm text-blue-400 font-medium">The Artist</span>
            </motion.div>
            <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-5xl md:text-7xl font-[family-name:var(--font-display)] italic font-light leading-tight">
              Crafting visual <br/>
              <span className="font-[family-name:var(--font-sans)] font-bold not-italic uppercase tracking-tighter text-white">Narratives.</span>
            </motion.h2>
            
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="glass-card p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500" />
              <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light">
                Saya adalah profesional di bidang videografi dan fotografi dengan pengalaman lebih dari 4 tahun. Mahir dalam produksi dan editing konten visual. Saat ini aktif sebagai mahasiswa D4 Desain Grafis di Universitas Negeri Surabaya (UNESA) dan Founder <span className="text-white font-medium">Arstate.Cinema</span>, vendor dokumentasi berbagai event.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start center", "end center"] 
  });

  const experiences = [
    {
      company: "PT Cita Entertainment",
      period: "2023 - Present",
      role: "Divisi Multimedia",
      description: "Videographer, Photographer, Camera Operator for major events and highlight editing."
    },
    {
      company: "Arstate.Cinema",
      period: "2021 - Present",
      role: "Founder & Creative Director",
      description: "Managing photo/video documentation services for weddings, corporate, commercials, and leading the creative post-production process."
    }
  ];

  return (
    <section id="experience" ref={containerRef} className="py-32 px-6 relative">
      {/* Scroll-linked glowing orb */}
      <motion.div 
        style={{ top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
        className="absolute left-0 md:left-1/2 w-full h-[500px] bg-purple-900/10 blur-[120px] -translate-y-1/2 pointer-events-none z-0"
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-[1px] bg-purple-500" />
                  <span className="uppercase tracking-widest text-sm text-purple-400 font-medium">Journey</span>
                </div>
                <h2 className="text-6xl md:text-8xl font-[family-name:var(--font-display)] italic font-light mb-6">
                  Experience
                </h2>
                <p className="text-white/50 font-light max-w-sm">
                  A timeline of my professional journey in the creative industry, building brands and capturing memories.
                </p>
              </motion.div>
            </div>
          </div>

          <div className="lg:col-span-7 relative">
            {/* Background Track Line */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/5 hidden md:block rounded-full" />
            
            {/* Animated Progress Line */}
            <motion.div 
              style={{ scaleY: scrollYProgress }} 
              className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-amber-500 hidden md:block origin-top rounded-full z-10" 
            />

            <div className="space-y-8 md:pl-12">
              {experiences.map((exp, index) => (
                <motion.div
                key={index}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.3, type: "spring", stiffness: 50 }}
                className="glass-card p-8 md:p-10 group hover:bg-white/[0.05] transition-colors relative"
              >
                {/* Timeline Dot */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.3 + 0.4, type: "spring" }}
                  className="absolute -left-[57px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#050505] border-2 border-white/20 hidden md:block z-20 group-hover:border-purple-500 group-hover:bg-purple-500 transition-all duration-300 shadow-[0_0_0_4px_rgba(5,5,5,1)]" 
                />
                
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4 border-b border-white/10 pb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">{exp.company}</h3>
                    <p className="text-purple-400 font-[family-name:var(--font-display)] italic text-xl">{exp.role}</p>
                  </div>
                  <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/60 whitespace-nowrap h-fit">
                    {exp.period}
                  </span>
                </div>
                <p className="text-white/70 font-light leading-relaxed text-lg">
                  {exp.description}
                </p>
              </motion.div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-50%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.3, 0]);

  const roles = [
    "Professional Photographer", "Videographer", "Photo & Video Editor", "Camera Operator"
  ];
  
  const software = [
    "Premiere Pro", "After Effects", "DaVinci Resolve", "Photoshop", "Lightroom", "Illustrator", "Figma", "Capcut"
  ];

  return (
    <section id="skills" ref={ref} className="py-32 px-6 relative overflow-hidden">
      {/* Moving Light Ray */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 w-full h-[200%] bg-gradient-to-b from-transparent via-blue-500/10 to-transparent skew-y-12 pointer-events-none z-0"
      />
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-blue-500" />
            <span className="uppercase tracking-widest text-sm text-blue-400 font-medium">Arsenal</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase">
            Skills & <span className="font-[family-name:var(--font-display)] italic font-light text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 lowercase">Expertise</span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
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
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]"
        >
          {/* Roles Card - Spans 2 columns */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="md:col-span-2 glass-card p-8 md:p-12 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full" />
            <h3 className="text-sm uppercase tracking-widest text-white/50 mb-8">Primary Roles</h3>
            <div className="flex flex-wrap gap-3 mt-auto">
              {roles.map((role, i) => (
                <span key={i} className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/90 text-lg hover:bg-white/10 transition-colors">
                  {role}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Decorative Card */}
          <motion.div
            variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
            className="md:col-span-1 glass-card p-8 relative overflow-hidden flex items-center justify-center min-h-[250px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
            <h2 className="text-8xl font-[family-name:var(--font-display)] italic text-white/20 absolute">4+</h2>
            <p className="relative z-10 text-xl font-medium text-center">Years of<br/>Experience</p>
          </motion.div>

          {/* Software Card - Spans full width */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="md:col-span-3 glass-card p-8 md:p-12"
          >
            <h3 className="text-sm uppercase tracking-widest text-white/50 mb-8">Software Proficiency</h3>
            <div className="flex flex-wrap gap-4">
              {software.map((sw, i) => (
                <span key={i} className="px-6 py-3 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 text-white hover:border-blue-500/50 transition-colors shadow-lg">
                  {sw}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

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

const Footer = () => {
  const footerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 2]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <footer id="contact" ref={footerRef} className="pt-32 pb-12 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/10 pointer-events-none" />
      
      {/* Expanding Glow Animation */}
      <motion.div 
        style={{ scale, opacity }} 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] md:w-[50vw] md:h-[50vw] bg-gradient-to-t from-blue-900/20 to-purple-900/20 rounded-full blur-[80px] pointer-events-none" 
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-[15vw] md:text-[12vw] font-bold tracking-tighter uppercase leading-none mb-8 text-white">
            Let's <span className="font-[family-name:var(--font-display)] italic font-light text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 lowercase">Work</span>
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-white/70 mt-12">
            <a href="mailto:aryansyah1509@gmail.com" className="flex items-center gap-4 hover:text-white transition-colors group">
              <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                <Mail size={24} />
              </div>
              <span className="text-xl font-light">aryansyah1509@gmail.com</span>
            </a>
            
            <a href="tel:089617323344" className="flex items-center gap-4 hover:text-white transition-colors group">
              <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                <Phone size={24} />
              </div>
              <span className="text-xl font-light">0896 1732 3344</span>
            </a>
            
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <MapPin size={24} />
              </div>
              <span className="text-xl font-light">Sidoarjo, Indonesia</span>
            </div>
          </div>
        </motion.div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-white/40 text-sm font-light">
          <p>© {new Date().getFullYear()} Bachtiar Aryansyah Putra.</p>
          <p>Designed with passion & precision.</p>
        </div>
      </div>
    </footer>
  );
};

const FloatingNavbar = () => {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show navbar after scrolling past 80vh (roughly past the main hero text)
    if (latest > window.innerHeight * 0.8) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Portfolio', href: '#portfolio' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0, x: "-50%" }}
      animate={{ 
        y: isVisible ? 0 : -100, 
        opacity: isVisible ? 1 : 0,
        x: "-50%"
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-1/2 z-50 glass-card px-4 md:px-6 py-3 rounded-full flex items-center gap-4 md:gap-8 border border-white/10 shadow-2xl backdrop-blur-xl bg-black/20"
    >
      {navLinks.map((link) => (
        <a 
          key={link.name} 
          href={link.href} 
          onClick={(e) => handleScroll(e, link.href)}
          className="hidden md:block text-xs md:text-sm font-medium text-white/70 hover:text-white transition-colors tracking-wide uppercase"
        >
          {link.name}
        </a>
      ))}
      <a 
        href="#contact" 
        onClick={(e) => handleScroll(e, '#contact')}
        className="text-xs md:text-sm font-medium text-black bg-white px-4 py-2 rounded-full hover:scale-105 transition-transform tracking-wide uppercase"
      >
        Let's Talk
      </a>
    </motion.nav>
  );
};

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-blue-500/30 selection:text-white">
      <NoiseOverlay />
      <CustomCursor />
      <FloatingNavbar />
      <Background />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Portfolio />
      <Footer />
    </div>
  );
}
