import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import React, { useRef } from 'react';

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
      className={`perspective-[1200px] w-full h-full ${className}`} // Relaxed perspective for less distortion
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
          // Removed transformStyle: "preserve-3d" for massive performance boost.
          // The parent is rotated in 3D, but children are flattened to a single texture.
        }}
        className="w-full h-full origin-center will-change-transform"
      >
        <div className="w-full h-full"> 
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default ThreeDCamera;
