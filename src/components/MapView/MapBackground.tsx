
import React from 'react';

interface MapBackgroundProps {
  country: 'india' | 'usa';
}

const MapBackground: React.FC<MapBackgroundProps> = ({ country }) => {
  return (
    <div className="absolute inset-0 bg-blue-50 rounded-lg overflow-hidden flex items-center justify-center">
      {country === 'india' ? (
        <svg viewBox="0 0 300 400" className="w-[400px] h-[500px] opacity-20" preserveAspectRatio="xMidYMid meet">
          {/* More accurate India map outline */}
          <path d="M120,50 C130,45 140,42 150,44 C165,46 175,48 185,52 C195,56 205,60 215,65 C225,70 235,75 240,85 C245,95 250,105 255,115 C260,125 265,135 270,145 C275,155 280,165 275,175 C270,185 275,195 270,205 C265,215 260,225 250,235 C240,245 230,255 220,265 C210,275 200,285 190,295 C180,305 170,315 160,325 C150,335 140,345 130,355 C120,365 110,375 100,370 C90,365 80,355 75,345 C70,335 65,325 60,315 C55,305 50,295 45,285 C40,275 35,265 30,255 C25,245 20,235 25,225 C30,215 25,205 30,195 C35,185 40,175 45,165 C50,155 55,145 60,135 C65,125 70,115 75,105 C80,95 85,85 95,80 C105,75 115,70 120,60 Z" 
            fill="#718096" />
          <path d="M150,44 L165,40 L175,45 L180,55 L175,65 L165,70 L155,65 L150,55 Z" 
            fill="#718096" />
          <path d="M255,115 L265,110 L275,115 L280,125 L275,135 L265,140 L255,135 Z" 
            fill="#718096" />
          <circle cx="290" cy="300" r="8" fill="#718096" />
          <circle cx="295" cy="320" r="6" fill="#718096" />
          <circle cx="300" cy="340" r="4" fill="#718096" />
        </svg>
      ) : (
        <svg viewBox="0 0 300 150" className="w-[450px] h-[250px] opacity-20" preserveAspectRatio="xMidYMid meet">
          <path d="M50,30 L80,30 L100,20 L130,20 L150,30 L180,30 L200,40 L220,40 L240,30 L260,40 L260,70 L240,80 L220,90 L200,100 L180,100 L160,110 L140,110 L120,100 L100,100 L80,90 L60,80 L50,60 Z" 
            fill="#718096" />
          <path d="M220,90 L230,100 L240,110 L235,120 L225,125 L215,120 L210,110 L215,100 Z" 
            fill="#718096" />
        </svg>
      )}
    </div>
  );
};

export default MapBackground;
