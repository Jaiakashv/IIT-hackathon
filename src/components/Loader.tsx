
import React, { useState, useEffect } from 'react';

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsVisible(false), 800);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 40);

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
      <div className="relative text-center">
        {/* Main content */}
        <div className="mb-12">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-extralight text-white tracking-[0.2em] mb-6 font-mono">
              AURA
            </h1>
            <p className="text-sm text-gray-400 font-light tracking-[0.4em] uppercase">
              ELEVATE YOUR AURA
            </p>
          </div>

          {/* Progress indicator */}
          <div className="w-64 mx-auto">
            <div className="relative h-[1px] bg-gray-800 overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-white transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-3 text-xs text-gray-600 font-mono tracking-wider">
              <span>00</span>
              <span>{progress.toString().padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle background grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Minimal corner elements */}
      <div className="absolute top-8 left-8 w-8 h-8 border-l border-t border-gray-800"></div>
      <div className="absolute top-8 right-8 w-8 h-8 border-r border-t border-gray-800"></div>
      <div className="absolute bottom-8 left-8 w-8 h-8 border-l border-b border-gray-800"></div>
      <div className="absolute bottom-8 right-8 w-8 h-8 border-r border-b border-gray-800"></div>
    </div>
  );
};

export default Loader;
