
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface MapViewProps {
  country: 'india' | 'usa';
  onRegionSelect: (region: string | null) => void;
  selectedRegion: string | null;
}

const MapView: React.FC<MapViewProps> = ({ country, onRegionSelect, selectedRegion }) => {
  // Mock regions data
  const regions = country === 'india' 
    ? ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad']
    : ['New York', 'California', 'Texas', 'Florida', 'Illinois', 'Pennsylvania'];

  // Mock financial health data with fixed positions for stability
  const mockData = country === 'india' 
    ? [
        { name: 'Mumbai', score: 78, x: 150, y: 320 },
        { name: 'Delhi', score: 82, x: 200, y: 150 },
        { name: 'Bangalore', score: 75, x: 190, y: 350 },
        { name: 'Chennai', score: 68, x: 230, y: 380 },
        { name: 'Kolkata', score: 72, x: 350, y: 200 },
        { name: 'Hyderabad', score: 80, x: 190, y: 280 }
      ]
    : [
        { name: 'New York', score: 85, x: 380, y: 150 },
        { name: 'California', score: 88, x: 100, y: 200 },
        { name: 'Texas', score: 76, x: 220, y: 280 },
        { name: 'Florida', score: 82, x: 340, y: 330 },
        { name: 'Illinois', score: 79, x: 260, y: 180 },
        { name: 'Pennsylvania', score: 81, x: 350, y: 170 }
      ];

  const handleRegionClick = (region: string) => {
    onRegionSelect(region);
  };

  const getScoreColor = (score: number) => {
    if (score > 80) return 'bg-green-500';
    if (score > 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md z-10">
        <h4 className="font-medium text-sm mb-2">Legend</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span>Excellent (80-100)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            <span>Good (70-79)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span>Needs Attention (60-69)</span>
          </div>
        </div>
      </div>
      
      <div className="w-full h-full relative">
        {/* Map background with accurate country shape */}
        <div className="absolute inset-0 bg-blue-50 rounded-lg overflow-hidden flex items-center justify-center">
          {country === 'india' ? (
            <svg viewBox="0 0 300 300" className="w-[450px] h-[450px] opacity-20" preserveAspectRatio="xMidYMid meet">
              {/* Simplified India map outline */}
              <path d="M142,40 C150,35 160,30 170,32 C180,35 190,30 200,35 C210,40 220,45 225,55 C230,65 240,70 245,80 C250,90 255,100 260,110 C265,120 270,130 265,140 C260,150 265,160 260,170 C255,180 250,190 240,195 C230,200 225,210 215,215 C205,220 195,225 185,230 C175,235 165,240 155,235 C145,230 135,235 125,230 C115,225 105,220 100,210 C95,200 85,195 80,185 C75,175 65,170 60,160 C55,150 50,140 55,130 C60,120 55,110 60,100 C65,90 70,80 80,75 C90,70 95,60 105,55 C115,50 125,45 135,45 C135,45 135,45 142,40" 
                fill="#718096" />
            </svg>
          ) : (
            <svg viewBox="0 0 300 150" className="w-[450px] h-[250px] opacity-20" preserveAspectRatio="xMidYMid meet">
              {/* Simplified USA map outline */}
              <path d="M50,30 L80,30 L100,20 L130,20 L150,30 L180,30 L200,40 L220,40 L240,30 L260,40 L260,70 L240,80 L220,90 L200,100 L180,100 L160,110 L140,110 L120,100 L100,100 L80,90 L60,80 L50,60 Z" 
                fill="#718096" />
              {/* Florida peninsula */}
              <path d="M220,90 L230,100 L240,110 L235,120 L225,125 L215,120 L210,110 L215,100 Z" 
                fill="#718096" />
            </svg>
          )}
        </div>
        
        {/* Region markers with fixed positions */}
        <div className="absolute inset-0 pointer-events-none">
          {mockData.map((point, index) => (
            <div 
              key={index}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110 pointer-events-auto"
              style={{ 
                left: point.x, 
                top: point.y
              }}
              onClick={() => handleRegionClick(point.name)}
            >
              <div 
                className={`${getScoreColor(point.score)} w-6 h-6 rounded-full shadow-md flex items-center justify-center border-2 border-white`}
                title={`${point.name}: ${point.score}/100`}
              />
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md text-xs whitespace-nowrap">
                {point.name} ({point.score})
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedRegion && (
        <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-md">
          <p className="text-sm font-medium">Selected: {selectedRegion}</p>
          <Button size="sm" variant="outline" onClick={() => onRegionSelect(null)} className="mt-2">
            Clear Selection
          </Button>
        </div>
      )}
      
      <Card className="absolute bottom-4 right-4 p-3 shadow-md">
        <div className="text-sm font-medium">
          {country === 'india' ? 'India Financial Health Map' : 'United States Financial Health Map'}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {mockData.length} regions visualized
        </div>
      </Card>
    </div>
  );
};

export default MapView;
