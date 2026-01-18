
import React, { useEffect, useState } from 'react';

interface SplashProps {
  onComplete: () => void;
}

const Splash: React.FC<SplashProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isZooming, setIsZooming] = useState(false);

  useEffect(() => {
    // Start animation
    setTimeout(() => setIsVisible(true), 100);
    setTimeout(() => setIsZooming(true), 1500);
    setTimeout(() => onComplete(), 3000);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center overflow-hidden z-[100]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-600/20 blur-[100px] rounded-full"></div>
      
      <div className={`transition-all duration-1000 ease-out flex flex-col items-center
        ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-90'}
        ${isZooming ? 'scale-110 opacity-0' : ''}`}>
        
        <div className="w-24 h-24 mb-6 bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/20">
          <i className="fa-solid fa-wand-magic-sparkles text-4xl text-white"></i>
        </div>
        
        <h1 className="text-5xl font-outfit font-bold tracking-tighter text-white mb-2">
          Aura<span className="text-purple-500">Walls</span>
        </h1>
        <p className="text-gray-400 font-medium tracking-widest text-sm uppercase">Pure Aesthetics</p>
      </div>

      <div className="absolute bottom-12">
        <div className="flex space-x-2">
          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default Splash;
