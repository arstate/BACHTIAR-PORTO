import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

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

export default CustomCursor;
