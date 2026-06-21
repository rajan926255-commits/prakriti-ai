'use client';

import { useState, useRef, useEffect } from 'react';

export default function CitySlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDrag = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (!containerRef.current) return;
    
    let clientX = 0;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = (e as React.MouseEvent).clientX;
    }

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  useEffect(() => {
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    return () => {
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const startDrag = () => {
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', handleDrag);
    }, { once: true });
  };

  const startTouchDrag = () => {
    document.addEventListener('touchmove', handleDrag, { passive: false });
    document.addEventListener('touchend', () => {
      document.removeEventListener('touchmove', handleDrag);
    }, { once: true });
  };

  return (
    <div 
      className="relative w-full max-w-4xl mx-auto h-64 md:h-96 rounded-2xl overflow-hidden glass-card cursor-ew-resize touch-none select-none"
      ref={containerRef}
      onMouseDown={startDrag}
      onTouchStart={startTouchDrag}
    >
      {/* Before Image (Polluted) */}
      <div className="absolute inset-0 bg-[#3a3f3a]">
        <svg viewBox="0 0 800 400" className="w-full h-full preserve-3d">
          <rect x="0" y="0" width="800" height="400" fill="#2d302d" />
          <circle cx="200" cy="150" r="40" fill="#5a5a5a" opacity="0.6" />
          <rect x="100" y="200" width="80" height="200" fill="#1a1c1a" />
          <rect x="200" y="150" width="120" height="250" fill="#232623" />
          <rect x="350" y="220" width="100" height="180" fill="#1e211e" />
          <rect x="480" y="100" width="90" height="300" fill="#2a2e2a" />
          <rect x="600" y="180" width="110" height="220" fill="#222522" />
          {/* Smog clouds */}
          <path d="M 0 100 Q 100 50 200 100 T 400 100 T 600 100 T 800 100 L 800 0 L 0 0 Z" fill="#4a4c4a" opacity="0.8"/>
        </svg>
        <div className="absolute bottom-4 right-4 text-white/50 font-bold text-xl">2050 (High Carbon)</div>
      </div>

      {/* After Image (Clean) */}
      <div 
        className="absolute inset-0 bg-blue-900/40 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <svg viewBox="0 0 800 400" className="w-[800px] md:w-full h-full max-w-none">
          <rect x="0" y="0" width="800" height="400" fill="#0A1A0D" />
          {/* Sun */}
          <circle cx="200" cy="150" r="40" fill="#F59E0B" />
          {/* Green Buildings */}
          <rect x="100" y="200" width="80" height="200" fill="#10B981" opacity="0.4" />
          <rect x="200" y="150" width="120" height="250" fill="#34d399" opacity="0.3" />
          <rect x="350" y="220" width="100" height="180" fill="#10B981" opacity="0.5" />
          <rect x="480" y="100" width="90" height="300" fill="#047857" opacity="0.4" />
          <rect x="600" y="180" width="110" height="220" fill="#059669" opacity="0.4" />
          {/* Trees */}
          <circle cx="140" cy="380" r="15" fill="#10B981" />
          <circle cx="260" cy="380" r="20" fill="#34d399" />
          <circle cx="400" cy="380" r="18" fill="#047857" />
          <circle cx="525" cy="380" r="25" fill="#059669" />
          <circle cx="650" cy="380" r="15" fill="#10B981" />
        </svg>
        <div className="absolute bottom-4 left-4 text-emerald-400 font-bold text-xl w-max">2024 (Clean Path)</div>
      </div>

      {/* Slider Line */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
          <div className="w-1 h-4 border-l-2 border-r-2 border-dark-forest-200 w-3"></div>
        </div>
      </div>
    </div>
  );
}
