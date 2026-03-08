import { useRef, useState, useEffect } from 'react';
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
      style={{ minHeight: height }}
    >
      {/* 
        We keep rendering if:
        1. It is currently in view (active or neighbor)
        2. OR it hasn't loaded yet (first render) - though we could skip this if we want strict lazy loading
           but keeping it ensures initial layout is correct before hydration/measurement.
        
        Actually, for "rendering when active only", we should unmount when !isInView.
        But we need to keep the height.
      */}
      {(isInView || !hasLoaded) ? children : null}
    </div>
  );
};

export default LazySection;
