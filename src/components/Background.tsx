import { motion, useScroll, useSpring, useTransform } from 'motion/react';

const Background = () => {
  const { scrollYProgress } = useScroll();
  // Reduce stiffness for smoother, less intensive updates
  const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 50 });
  
  // Simplify background color transitions
  const bg = useTransform(smoothProgress, 
    [0, 0.5, 1], 
    ["#050505", "#0a0514", "#050505"]
  );
  
  // Simplify transforms
  const y1 = useTransform(smoothProgress, [0, 1], ["0%", "50%"]);
  const y2 = useTransform(smoothProgress, [0, 1], ["0%", "-50%"]);
  const scale = useTransform(smoothProgress, [0, 1], [1, 1.2]);

  return (
    <motion.div 
      style={{ backgroundColor: bg, willChange: 'background-color' }} 
      className="fixed inset-0 z-[-1] overflow-hidden"
    >
      {/* Reduced to 2 main animated elements instead of 3 */}
      <motion.div 
        style={{ y: y1, scale, willChange: 'transform' }} 
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(30,58,138,0.05)_0%,transparent_70%)]" 
      />
      <motion.div 
        style={{ y: y2, scale, willChange: 'transform' }} 
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(88,28,135,0.05)_0%,transparent_70%)]" 
      />
      
      {/* Simplified Grid Pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_50%,transparent_100%)]"
      />
    </motion.div>
  );
};

export default Background;
