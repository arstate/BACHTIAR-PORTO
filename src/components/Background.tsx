import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { memo } from 'react';

const NoiseOverlay = memo(() => (
  <div 
    className="fixed inset-0 z-[999] pointer-events-none opacity-[0.08]"
    style={{ 
      backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
      backgroundSize: '256px 256px'
    }}
  />
));

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
    <>
      <NoiseOverlay />
      <motion.div style={{ backgroundColor: bg }} className="fixed inset-0 z-[-1] overflow-hidden">
        <motion.div style={{ y: y1, scale: scale1 }} className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(30,58,138,0.08)_0%,transparent_70%)] mix-blend-screen" />
        <motion.div style={{ y: y2, scale: scale2 }} className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle,rgba(88,28,135,0.08)_0%,transparent_70%)] mix-blend-screen" />
        <motion.div style={{ scale: scale1 }} className="absolute top-[30%] left-[40%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(120,53,15,0.05)_0%,transparent_70%)] animate-float mix-blend-screen" />
        
        {/* Dynamic Grid Pattern */}
        <motion.div 
          style={{ opacity: useTransform(smoothProgress, [0, 0.5, 1], [0.05, 0.15, 0.05]) }}
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"
        />
      </motion.div>
    </>
  );
};

export default Background;
