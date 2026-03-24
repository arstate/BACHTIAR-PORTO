import React from 'react';

interface ThreeDCameraProps {
  children: React.ReactNode;
  className?: string;
  index?: number; 
}

const ThreeDCamera = ({ children, className = "", index = 0 }: ThreeDCameraProps) => {
  // 3D Camera Feature has been completely disabled according to user preference.
  // We return a simple flat wrapper without any Framer Motion scroll listeners.
  // This guarantees 0% extra CPU/GPU overhead.
  
  return (
    <div className={`w-full h-full relative ${className}`}>
        {children}
    </div>
  );
};

export default ThreeDCamera;
