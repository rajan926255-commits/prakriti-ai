'use client';
import { useState, memo } from 'react';

const LivingCity = memo(function LivingCity({ grade }: { grade: string }) {
  const [year, setYear] = useState<'2024' | '2050'>('2024');
  
  // A = clear blue sky, B = light haze, C = grey, D = heavy smog color, F = dark brown/grey
  const getSkyColor = () => {
    if (year === '2024') return '#0A1A0D'; // Keep standard dark forest for 2024
    switch(grade) {
      case 'A': return '#3b82f6'; // clear blue sky
      case 'B': return '#60a5fa'; // light haze (light blue)
      case 'C': return '#9ca3af'; // grey
      case 'D': return '#78716c'; // heavy smog (stone/brownish grey)
      case 'F': return '#451a03'; // dark brown/grey
      default: return '#0A1A0D';
    }
  };

  const getBuildingColor = () => {
    if (year === '2024') return { main: '#10B981', secondary: '#34d399', dark: '#047857', sun: '#F59E0B' };
    switch(grade) {
      case 'A': return { main: '#10B981', secondary: '#34d399', dark: '#047857', sun: '#F59E0B' };
      case 'B': return { main: '#34d399', secondary: '#6ee7b7', dark: '#059669', sun: '#fbbf24' };
      case 'C': return { main: '#9ca3af', secondary: '#d1d5db', dark: '#6b7280', sun: '#fcd34d' };
      case 'D': return { main: '#78716c', secondary: '#a8a29e', dark: '#57534e', sun: '#d97706' };
      case 'F': return { main: '#1a1c1a', secondary: '#232623', dark: '#2a2e2a', sun: '#5a5a5a' };
      default: return { main: '#10B981', secondary: '#34d399', dark: '#047857', sun: '#F59E0B' };
    }
  };

  const getAQIText = () => {
    if (year === '2024') return null;
    switch(grade) {
      case 'A': return "Projected AQI: 45 (Good) | +1.0°C";
      case 'B': return "Projected AQI: 80 (Moderate) | +1.5°C";
      case 'C': return "Projected AQI: 150 (Unhealthy) | +2.0°C";
      case 'D': return "Projected AQI: 300 (Severe) | +3.0°C";
      case 'F': return "Projected AQI: 500+ (Hazardous) | +4.0°C";
      default: return null;
    }
  };

  const colors = getBuildingColor();
  const skyColor = getSkyColor();
  const showTrees = year === '2024' || ['A', 'B'].includes(grade);
  const showSmog = year === '2050' && ['C', 'D', 'F'].includes(grade);

  return (
    <div className="w-full text-center">
      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        <button 
          onClick={() => setYear('2024')} 
          className={`px-6 py-2 rounded-full font-bold transition-colors ${year === '2024' ? 'bg-emerald-500 text-background' : 'bg-muted text-muted-foreground hover:bg-card-border'}`}
        >
          2024 (Now)
        </button>
        <button 
          onClick={() => setYear('2050')} 
          className={`px-6 py-2 rounded-full font-bold transition-colors ${year === '2050' ? 'bg-amber-500 text-background' : 'bg-muted text-muted-foreground hover:bg-card-border'}`}
        >
          2050 (If Everyone Lived Like You)
        </button>
      </div>
      
      <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden glass-card transition-all duration-1000" style={{ backgroundColor: skyColor }}>
        <svg viewBox="0 0 800 400" className="w-[800px] md:w-full h-full max-w-none">
          <circle cx="200" cy="150" r="40" fill={colors.sun} className="transition-all duration-1000" />
          
          <rect x="100" y="200" width="80" height="200" fill={colors.main} opacity="0.6" className="transition-all duration-1000" />
          <rect x="200" y="150" width="120" height="250" fill={colors.secondary} opacity="0.5" className="transition-all duration-1000" />
          <rect x="350" y="220" width="100" height="180" fill={colors.main} opacity="0.6" className="transition-all duration-1000" />
          <rect x="480" y="100" width="90" height="300" fill={colors.dark} opacity="0.6" className="transition-all duration-1000" />
          <rect x="600" y="180" width="110" height="220" fill={colors.dark} opacity="0.5" className="transition-all duration-1000" />
          
          {/* Trees - die off if severe */}
          <g className={`transition-opacity duration-1000 ${showTrees ? 'opacity-100' : 'opacity-0'}`}>
            <circle cx="140" cy="380" r="15" fill="#10B981" />
            <circle cx="260" cy="380" r="20" fill="#34d399" />
            <circle cx="400" cy="380" r="18" fill="#047857" />
            <circle cx="525" cy="380" r="25" fill="#059669" />
            <circle cx="650" cy="380" r="15" fill="#10B981" />
          </g>

          {/* Smog Layer */}
          <path d="M 0 100 Q 100 50 200 100 T 400 100 T 600 100 T 800 100 L 800 0 L 0 0 Z" fill="#4a4c4a" className={`transition-opacity duration-1000 ${showSmog ? 'opacity-80' : 'opacity-0'}`} />
        </svg>
        
        {getAQIText() && (
          <div className="absolute top-4 left-4 bg-background/80 backdrop-blur border border-card-border px-4 py-2 rounded-full shadow-lg">
            <span className={`font-bold text-sm ${['D', 'F'].includes(grade) ? 'text-red-500' : 'text-foreground'}`}>
              {getAQIText()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
});

export default LivingCity;
