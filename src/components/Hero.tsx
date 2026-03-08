import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { Play, ArrowRight } from 'lucide-react';
import { useRef, useState } from 'react';

const Hero = () => {
  const { scrollY } = useScroll();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  // Optimize: Pause video when scrolled past viewport height
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (videoRef.current) {
      const viewportHeight = window.innerHeight;
      // If scrolled past 1.2x viewport height (fully covered by next section), pause video
      if (latest > viewportHeight * 1.2) {
        if (isVideoPlaying) {
          videoRef.current.pause();
          setIsVideoPlaying(false);
        }
      } else {
        if (!isVideoPlaying) {
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Auto-play was prevented
            });
          }
          setIsVideoPlaying(true);
        }
      }
    }
  });

  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const opacityBg = useTransform(scrollY, [0, 800], [0.2, 0]);
  
  // Parallax transforms for individual elements (moving UP and fading out as we scroll down)
  // Staggered exit: Top elements move faster and fade out earlier
  const yBadge = useTransform(scrollY, [0, 500], [0, -1200]);
  const opacityBadge = useTransform(scrollY, [0, 300], [1, 0]);

  const yTitle1 = useTransform(scrollY, [0, 600], [0, -1000]);
  const opacityTitle1 = useTransform(scrollY, [100, 400], [1, 0]);

  const yTitle2 = useTransform(scrollY, [0, 700], [0, -800]);
  const opacityTitle2 = useTransform(scrollY, [200, 500], [1, 0]);

  const yTitle3 = useTransform(scrollY, [0, 800], [0, -600]);
  const opacityTitle3 = useTransform(scrollY, [300, 600], [1, 0]);

  // Card moves up smoothly
  const yCard = useTransform(scrollY, [0, 900], [0, -400]);
  const opacityCard = useTransform(scrollY, [500, 800], [1, 0]);

  return (
    <section className="h-screen sticky top-0 flex flex-col items-center justify-center px-6 py-24 overflow-hidden z-0">
      <motion.div style={{ y: y1, opacity: opacityBg }} className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {/* Cinematic Video Background */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen"
        >
          <source src="https://cdn.pixabay.com/video/2023/10/15/185090-874636939_large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505]" />
        
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 100, repeat: Infinity, ease: "linear" }} className="w-[120vw] h-[120vw] md:w-[800px] md:h-[800px] border-[1px] border-white/10 rounded-full absolute border-dashed" />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }} className="w-[100vw] h-[100vw] md:w-[600px] md:h-[600px] border-[1px] border-white/10 rounded-full absolute" />
        <motion.div 
          animate={{ x: ["-100%", "200%"] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} 
          className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 blur-2xl"
        />
      </motion.div>

      <div 
        className="z-10 text-center w-full max-w-7xl mx-auto flex flex-col items-center"
      >
        <motion.div 
          style={{ y: yBadge, opacity: opacityBadge }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.03] border border-white/10 text-sm font-medium mb-12 tracking-widest uppercase text-white/70 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          Bachtiar Aryansyah Putra
        </motion.div>
        
        <div className="flex flex-col items-center justify-center leading-[0.85] mb-12 w-full">
          <motion.div style={{ y: yTitle1, opacity: opacityTitle1 }}>
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-7xl md:text-[9vw] font-bold tracking-tighter uppercase text-white"
            >
              Capturing
            </motion.h1>
          </motion.div>
          
          <motion.div 
            style={{ y: yTitle2, opacity: opacityTitle2 }}
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

          <motion.div style={{ y: yTitle3, opacity: opacityTitle3 }}>
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-[7vw] font-bold tracking-tighter uppercase text-outline"
            >
              Masterpieces
            </motion.h1>
          </motion.div>
        </div>
        
        <motion.div style={{ y: yCard, opacity: opacityCard }} className="w-full max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="glass-card p-6 md:p-8 w-full flex flex-col sm:flex-row items-center justify-between gap-6"
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
                className="glass-button px-6 py-4 text-sm font-medium flex-1 sm:flex-none text-center flex items-center justify-center gap-2"
              >
                Let's Talk
                <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
