import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import { MousePointerClick } from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const x = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  
  const mainImageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const floatingImageY = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);
  const innerImgY = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);

  return (
    <section id="about" ref={ref} className="py-32 px-6 relative overflow-hidden z-10 w-full md:w-[140%] md:-ml-[20%]">
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
            style={{ y: mainImageY }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            {/* Main Arch Image - Flip Card */}
            <div 
              className="relative z-10 w-full aspect-[3/4] perspective-1000 group cursor-pointer"
              onClick={() => setIsFlipped(!isFlipped)}
              onMouseLeave={() => setIsFlipped(false)}
              style={{ perspective: "1000px" }}
            >
              <motion.div
                className="w-full h-full relative preserve-3d transition-all duration-700"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front Face */}
                <div 
                  className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden border border-white/10 bg-[#050505]"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <motion.img 
                    style={{ y: innerImgY, scale: 1.2 }}
                    src="https://lh3.googleusercontent.com/pw/AP1GczOY6eh8jD-AhYTN36AAloPj19xxOD1ZU-GJcdT814YnnlKqTIXtX7GLjBfoMrpOTG-eFw9enBnBbRQbgBqTzLnoZbtoYyG0_mRFfnfBJLefqLl-n6I=w2400" 
                    alt="Bachtiar Aryansyah Putra" 
                    loading="lazy"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                    <span className="px-6 py-3 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/20 text-sm font-medium tracking-widest uppercase flex items-center gap-2 shadow-xl">
                      Click to flip <MousePointerClick size={16} />
                    </span>
                  </div>
                </div>

                {/* Back Face */}
                <div 
                  className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden border border-white/10 bg-[#1a1a1a]"
                  style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
                >
                  <img 
                    src="https://github.com/user-attachments/assets/8fbd5b8f-c435-4707-b85d-4e54ce6af50a" 
                    alt="Behind the scenes" 
                    className="w-full h-full object-cover scale-150 object-top"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-black/20">
                    <h3 className="text-3xl font-display italic text-white mb-2">Behind the Scenes</h3>
                    <p className="text-sm text-white/80 font-light tracking-wide">
                      Every frame tells a story. From pre-production to the final cut, we craft narratives that resonate.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Floating Accent Image */}
            <motion.div 
              style={{ y: floatingImageY }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="absolute -bottom-12 -right-6 md:-right-12 w-48 aspect-square rounded-full overflow-hidden border-8 border-[#050505] z-20 hidden sm:block"
            >
              <img 
                src="https://picsum.photos/seed/dslr/400/400.webp" 
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

export default About;
