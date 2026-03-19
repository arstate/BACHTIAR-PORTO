import React, { useEffect, useState } from 'react';

interface YouTubeBackgroundProps {
  videoId: string;
  overlayOpacity?: number;
}

const YouTubeBackground: React.FC<YouTubeBackgroundProps> = ({ videoId, overlayOpacity = 0.6 }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // We can use this to handle any specific loading logic if needed
    setIsLoaded(true);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-[1]">
      {/* Dark Overlay */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
      />
      
      {/* YouTube Iframe Container */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {videoId && (
            <iframe
            title="Background Video"
            className="absolute top-1/2 left-1/2 min-w-[100vw] min-h-[100vh] w-[115vw] h-[64.68vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            ></iframe>
        )}
      </div>
    </div>
  );
};

export default YouTubeBackground;
