import { motion, useSpring, useMotionValue, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'view'>('default');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 35, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Detect clickable elements
      const isPointer = target.closest('button, a, .cursor-pointer, input, select, textarea, [role="button"]');
      // Detect viewable gallery/portfolio items
      const isViewable = target.closest('.portfolio-item, .gallery-item-card, [data-cursor="view"]');

      if (isViewable) {
        setCursorType('view');
        setIsHovering(true);
      } else if (isPointer) {
        setCursorType('pointer');
        setIsHovering(true);
      } else {
        setCursorType('default');
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[999999] pointer-events-none overflow-hidden">
      {/* 1. The Main Pointer Icon (Filled & Solid) */}
      <motion.div
        className="absolute top-0 left-0 mix-blend-difference"
        style={{ x: mouseX, y: mouseY, translateX: -2, translateY: -2 }}
        animate={{
          scale: isClicking ? 0.8 : 1,
          rotate: cursorType === 'pointer' ? -10 : 0
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 40 }}
      >
        <AnimatePresence mode="wait">
          {cursorType === 'pointer' ? (
            /* Simple Solid/Filled Hand Pointer */
            <motion.svg
              key="hand"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14 6V5a2 2 0 1 0-4 0v8.1L7.8 11a1.5 1.5 0 0 0-2.1.2 1.5 1.5 0 0 0 .2 2.1l5.1 4.2c1.4 1.2 3.2 1.9 5 1.9h.5a4.5 4.5 0 0 0 4.5-4.5V11a2 2 0 1 0-4 0v-1a2 2 0 1 0-4 0v-1a2 2 0 1 0-4 0z" />
            </motion.svg>
          ) : (
            /* Solid/Filled Minimalist Arrow */
            <motion.svg
              key="arrow"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4.5 2.5L20 12L4.5 21.5V12.5L12 12L4.5 11.5V2.5Z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 2. Trailing Aura / Loop (Stroke Only) */}
      <motion.div
        className="absolute top-0 left-0 rounded-full border border-white/20 mix-blend-difference flex items-center justify-center p-1"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorType === 'view' ? 100 : (isClicking || isHovering) ? 50 : 0,
          height: cursorType === 'view' ? 100 : (isClicking || isHovering) ? 50 : 0,
          opacity: (isClicking || cursorType === 'view' || cursorType === 'pointer') ? 1 : 0,
          backgroundColor: 'transparent'
        }}
        transition={{ type: 'spring', ...springConfig }}
      >
        <AnimatePresence>
          {cursorType === 'view' && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[10px] font-bold tracking-[0.3em] text-white uppercase mt-12"
            >
              VIEW
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 3. Click Pulse */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            initial={{
              x: mouseX.get(),
              y: mouseY.get(),
              scale: 0,
              opacity: 0.8,
              translateX: '-50%',
              translateY: '-50%'
            }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 left-0 w-8 h-8 rounded-full border border-white/40"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomCursor;
