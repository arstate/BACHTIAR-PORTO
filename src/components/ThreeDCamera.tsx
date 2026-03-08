import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';

interface ThreeDCameraProps {
  children: React.ReactNode;
  className?: string;
  index?: number; // Add index to vary the effect slightly per section
}

const ThreeDCamera = ({ children, className = "", index = 0 }: ThreeDCameraProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Optimized spring configuration for balanced smoothness and responsiveness
  const smoothProgress = useSpring(scrollYProgress, { damping: 40, stiffness: 60, mass: 1 });

  // Varied rotations based on index (even/odd)
  const isEven = index % 2 === 0;

  // Increased rotation intensity for a more noticeable 3D effect
  // Rotates in, stabilizes in center, rotates out
  const rotateX = useTransform(
    smoothProgress, 
    [0, 0.2, 0.5, 0.8, 1], 
    [20, 8, 0, -8, -20]
  );
  
  const rotateY = useTransform(
    smoothProgress, 
    [0, 0.5, 1], 
    isEven ? [-12, 0, 12] : [12, 0, -12]
  );

  // Re-introduced subtle Z-rotation for organic feel
  const rotateZ = useTransform(
    smoothProgress, 
    [0, 0.5, 1], 
    isEven ? [-3, 0, 3] : [3, 0, -3]
  );

  // Stronger scale effect for depth
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  
  // Smoother opacity transition
  const opacity = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <div 
      ref={ref} 
      className={`perspective-[800px] w-full h-full ${className}`} // Ensure full size
      style={{ 
        perspectiveOrigin: '50% 50%',
        position: 'relative' // Explicitly set position to fix "non-static" warning
      }}
    >
      <motion.div
        style={{ 
          rotateX,
          rotateY,
          rotateZ,
          scale,
          opacity,
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
        }}
        className="w-full h-full origin-center will-change-transform"
      >
        {/* Removed ambient floating animation to prevent frame drops/stuttering */}
        <div className="transform-style-3d">
          {children}
        </div>
      </motion.div>
      <style>{`
        .transform-style-3d {
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};

export default ThreeDCamera;
