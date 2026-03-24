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

  // Removed useSpring entirely! 7 simultaneous physics engines running on scroll 
  // causes a pure JS main-thread bottleneck (1 CPU core maxed at 20%), destroying scroll performance.

  // Varied rotations based on index (even/odd)
  const isEven = index % 2 === 0;

  // Direct mapping to scrollYProgress (Hardware/Compositor friendly)
  const rotateX = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.5, 0.8, 1], 
    [20, 8, 0, -8, -20]
  );
  
  const rotateY = useTransform(
    scrollYProgress, 
    [0, 0.5, 1], 
    isEven ? [-12, 0, 12] : [12, 0, -12]
  );

  const rotateZ = useTransform(
    scrollYProgress, 
    [0, 0.5, 1], 
    isEven ? [-3, 0, 3] : [3, 0, -3]
  );

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

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
        className="w-full h-full origin-center"
      >
        <div className="w-full h-full"> 
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default ThreeDCamera;
