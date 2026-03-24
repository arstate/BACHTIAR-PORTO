import React, { useRef, useState, useEffect } from 'react';
import { useInView } from 'motion/react';

interface LazySectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  placeholderHeight?: string | number;
}

const LazySection = ({ children, className = "", id = "", placeholderHeight = "50vh" }: LazySectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | string>(placeholderHeight);
  const [hasLoaded, setHasLoaded] = useState(false);
  
  // Margin 50% means we render when the element is within 50% of the viewport height
  // This ensures "section setelahnya dan sebelumnya" (next and previous) are rendered
  const isInView = useInView(ref, { margin: "50% 0px 50% 0px", once: false });

  useEffect(() => {
    if (isInView && !hasLoaded) {
      setHasLoaded(true);
    }
  }, [isInView, hasLoaded]);

  useEffect(() => {
    if (ref.current && isInView) {
      // Capture the height when visible so we can maintain it when hidden
      const rect = ref.current.getBoundingClientRect();
      if (rect.height > 0) {
        setHeight(rect.height);
      }
    }
  }, [isInView, children]);

  return (
    <div 
      ref={ref} 
      className={className} 
      id={id}
      style={{ 
        minHeight: height,
        contentVisibility: "auto",
        containIntrinsicSize: `auto ${typeof height === 'number' ? height + 'px' : height}`
      }}
    >
      {/* Kept mounted to prevent layout thrashing on scroll! */}
      {(hasLoaded || isInView) ? children : null}
    </div>
  );
};

export default LazySection;
