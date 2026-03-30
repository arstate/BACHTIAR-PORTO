import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { Play, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUserIntent } from '../context/UserIntentContext';

const INTENT_PHRASES: Record<string, string[]> = {
  wedding: ["ETERNAL romance", "CHERISHING love", "CELEBRATING unions", "CAPTURING beauty"],
  graduation: ["ACADEMIC legacy", "HONORING success", "CAPTURING milestones", "YOUR journey"],
  corporate: ["BRAND identity", "ELEVATING visuals", "PROFESSIONAL media", "IMPACTFUL stories"],
  event: ["LIVE energy", "DOCUMENTING moments", "PRESERVING vibes", "DYNAMIC visuals"],
  generalist: ["CAPTURING moments", "DIRECTING visuals", "CRAFTING stories", "FRAMING aesthetics", "EDITING realities", "MAKE YOUR moments"]
};

const INTENT_SUBHEADINGS: Record<string, string> = {
  wedding: "Capturing Your Eternal Romance",
  graduation: "Preserving Your Academic Legacy",
  corporate: "Elevating Your Brand's Visual Identity",
  event: "Documenting Your Most Dynamic Moments",
  generalist: "Visual Masterpieces & Cinematic Stories"
};

const Hero = () => {
  const { scrollY } = useScroll();
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideoPlayingRef = useRef(true);
  const [, forceUpdate] = useState({}); // Only for UI reflection if really needed, but mostly we use ref

  // Typewriter logic
  const { activeIntent } = useUserIntent();
  const currentIntent = activeIntent || 'generalist';
  const phrases = INTENT_PHRASES[currentIntent] || INTENT_PHRASES.generalist;

  // Typewriter logic
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    setCurrentPhraseIndex(0);
    setCurrentText("");
    setIsDeleting(false);
  }, [activeIntent]);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = phrases[currentPhraseIndex];
      
      if (!isDeleting) {
        // Typing
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(100 + Math.random() * 50);

        if (currentText === fullText) {
          setIsDeleting(true);
          setTypingSpeed(2000);
        }
      } else {
        // Deleting
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(50);

        if (currentText === "") {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
          setTypingSpeed(500);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPhraseIndex, phrases]);

  // Derived state for typewriter layout
  const currentFullText = phrases[currentPhraseIndex] || "";
  const words = currentFullText.split(' ');
  const firstWordLimit = words.length > 2 ? 2 : 1;
  const firstPartFull = words.slice(0, firstWordLimit).join(' ');
  
  const isTypingSecondPart = currentText.length > firstPartFull.length;
  const firstPartText = isTypingSecondPart ? firstPartFull : currentText;
  const secondPartText = isTypingSecondPart ? currentText.substring(firstPartFull.length + 1) : "";

  // Prevent scrolling when modal is open


  // Optimize: Pause video when scrolled past viewport height using Ref
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (videoRef.current) {
      const viewportHeight = window.innerHeight;
      const shouldPlay = latest <= viewportHeight * 1.2;
      
      if (shouldPlay && !isVideoPlayingRef.current) {
        isVideoPlayingRef.current = true;
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) playPromise.catch(() => {});
      } else if (!shouldPlay && isVideoPlayingRef.current) {
        isVideoPlayingRef.current = false;
        videoRef.current.pause();
      }
    }
  });

  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const opacityBg = useTransform(scrollY, [0, 800], [0.2, 0]);

  // Parallax transforms for individual elements (moving UP and fading out as we scroll down)
  // Staggered exit: Top elements move faster and fade out earlier
  // Optimized transforms with will-change hints
  const yBadge = useTransform(scrollY, [0, 500], [0, -200]);
  const opacityBadge = useTransform(scrollY, [0, 300], [1, 0]);

  const yTitle1 = useTransform(scrollY, [100, 400], [0, -150]);
  const opacityTitle1 = useTransform(scrollY, [100, 400], [1, 0]);

  const yTitle2 = useTransform(scrollY, [200, 500], [0, -100]);
  const opacityTitle2 = useTransform(scrollY, [200, 500], [1, 0]);

  const yTitle3 = useTransform(scrollY, [300, 600], [0, -50]);
  const opacityTitle3 = useTransform(scrollY, [300, 600], [1, 0]);

  const yCard = useTransform(scrollY, [500, 800], [0, 0]);
  const opacityCard = useTransform(scrollY, [500, 800], [1, 0]);

  return (
    <section className="h-screen relative flex flex-col items-center justify-center px-6 py-24 overflow-hidden z-0">
      <motion.div style={{ y: y1, opacity: opacityBg }} className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {/* Cinematic Video Background */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        >
          <source src="https://cdn.pixabay.com/video/2023/10/15/185090-874636939_large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505]" />

        <motion.div animate={{ rotate: 360 }} transition={{ duration: 100, repeat: Infinity, ease: "linear" }} className="w-[120vw] h-[120vw] md:w-[800px] md:h-[800px] border-[1px] border-white/10 rounded-full absolute border-dashed will-change-transform" />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }} className="w-[100vw] h-[100vw] md:w-[600px] md:h-[600px] border-[1px] border-white/10 rounded-full absolute will-change-transform" />

        {/* Replaced animated blur with a performant static radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0%,transparent_60%)] pointer-events-none" />
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

        <div className="flex flex-col items-center justify-center mb-12 w-full min-h-[160px] md:min-h-[280px]">
          <div className="flex flex-col items-center justify-center text-center">
            {/* First Word (Bold/Sans) */}
            <motion.h1
              style={{ willChange: 'transform, opacity' }}
              className="text-5xl sm:text-7xl md:text-[8vw] font-bold tracking-tighter uppercase text-white leading-[0.9]"
            >
              {firstPartText || <span className="opacity-0">A</span>}
              <span className={`text-white ml-1 inline-block w-[4px] h-[0.8em] bg-white align-middle ${!isTypingSecondPart ? 'animate-[pulse_1s_infinite]' : 'opacity-0'}`} style={{ verticalAlign: 'middle' }}></span>
            </motion.h1>

            {/* Second Word (Italic/Serif/Gradient) */}
            <div className="flex items-center gap-4 md:gap-8 mt-2 md:mt-4">
              <div className="hidden md:block w-12 md:w-24 h-[2px] bg-white/20" />
              <h1 className="text-4xl sm:text-6xl md:text-[9vw] font-[family-name:var(--font-display)] italic font-light text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 lowercase leading-[0.9]">
                {secondPartText || <span className="opacity-0 pointer-events-none select-none">a</span>}
                <span className={`text-white ml-1 inline-block w-[4px] h-[0.8em] bg-white align-middle ${isTypingSecondPart ? 'animate-[pulse_1s_infinite]' : 'opacity-0'}`} style={{ verticalAlign: 'middle' }}></span>
              </h1>
              <div className="hidden md:block w-12 md:w-24 h-[2px] bg-white/20" />
            </div>
          </div>

          <motion.div style={{ y: yTitle3, opacity: opacityTitle3, willChange: 'transform, opacity' }} className="mt-8 md:mt-12">
            {currentIntent === 'generalist' ? (
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-6xl md:text-[6.5vw] font-bold tracking-tighter uppercase text-outline leading-none"
              >
                Masterpieces
              </motion.h1>
            ) : (
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-2xl sm:text-4xl md:text-[4vw] font-bold tracking-tighter uppercase text-outline leading-none mt-4"
              >
                {INTENT_SUBHEADINGS[currentIntent]}
              </motion.h1>
            )}
          </motion.div>
        </div>

        <motion.div style={{ y: yCard, opacity: opacityCard, willChange: 'transform, opacity' }} className="w-full max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="glass-card p-6 md:p-8 w-full flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <p className="text-sm md:text-base text-white/60 font-light text-center md:text-left max-w-sm">
              Freelance Creative Media <br />
              Founder & Creative Director of <span className="text-white font-medium">Arstate.Cinema</span>
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto justify-center md:justify-end">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Link
                  to="/portfolio"
                  className="px-6 py-4 rounded-full bg-white text-black text-sm font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2 flex-1 sm:flex-none whitespace-nowrap"
                >
                  <Play size={16} fill="currentColor" />
                  My Project
                </Link>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="glass-button px-6 py-4 text-sm font-medium flex-1 sm:flex-none text-center flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  Let's Talk
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
