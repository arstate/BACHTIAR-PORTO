import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';

interface YouTubeBackgroundProps {
  videoId: string;
  overlayOpacity?: number;
}

const YouTubeBackground: React.FC<YouTubeBackgroundProps> = ({ videoId, overlayOpacity = 0.6 }) => {
  const [isReady, setIsReady] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // We can use the YouTube IFrame API for even more control, 
    // but a simple onload + autoplay usually works well for backgrounds.
    const timer = setTimeout(() => {
        setHasStarted(true);
    }, 1000); // Small delay to allow page animations to finish first

    return () => clearTimeout(timer);
  }, []);

  const handleIframeLoad = () => {
    // The iframe load event fires when the iframe content is loaded, 
    // not necessarily when the video starts playing.
    // However, with autoplay=1, it starts shortly after.
    setTimeout(() => setIsReady(true), 500);
  };

  // High quality thumbnail as placeholder
  const placeholderUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-[1] bg-black">
      {/* Dark Overlay */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-1000"
        style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
      />
      
      {/* Placeholder Image - Shows while loading and stays as a fallback */}
      <motion.div 
        initial={{ opacity: 1 }}
        animate={{ opacity: isReady ? 0 : 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${placeholderUrl})` }}
      />

      {/* YouTube Iframe Container */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.iframe
          ref={iframeRef}
          initial={{ opacity: 0.01, scale: 1.1 }}
          animate={{ 
            opacity: isReady ? 1 : 0.01, 
            scale: isReady ? 1 : 1.1 
          }}
          transition={{ duration: 2, ease: "easeOut" }}
          title="Background Video"
          onLoad={handleIframeLoad}
          className="absolute top-1/2 left-1/2 min-w-[100vw] min-h-[100vh] w-[115vw] h-[64.68vw] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none border-none scale-105"
          src={`https://www.youtube.com/embed/${videoId}?mute=1&autoplay=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1`}
          allow="autoplay; encrypted-media; fullscreen"
        />
      </div>
    </div>
  );
};

export default React.memo(YouTubeBackground);
