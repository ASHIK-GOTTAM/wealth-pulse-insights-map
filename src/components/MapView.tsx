
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface MapViewProps {
  country: 'india' | 'usa';
  onRegionSelect: (region: string | null) => void;
  selectedRegion: string | null;
}

const MapView: React.FC<MapViewProps> = ({ country, onRegionSelect, selectedRegion }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  
  // Mock regions data
  const regions = country === 'india' 
    ? ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad']
    : ['New York', 'California', 'Texas', 'Florida', 'Illinois', 'Pennsylvania'];

  // Mock financial health data
  const mockData = regions.map((region, index) => ({
    name: region,
    score: Math.floor(Math.random() * 40) + 60, // 60-100 range
    x: country === 'india' 
      ? 100 + Math.random() * 300 
      : 100 + Math.random() * 300,
    y: country === 'india' 
      ? 100 + Math.random() * 200 
      : 100 + Math.random() * 200,
  }));

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
        {/* Static map background image */}
        <div className="absolute inset-0 bg-blue-50 rounded-lg overflow-hidden">
          <div className="w-full h-full relative">
            {country === 'india' ? (
              <svg viewBox="0 0 500 500" className="w-full h-full opacity-20">
                <path d="M250,100 Q350,150 300,250 Q250,350 350,400 L150,400 Q250,350 200,250 Q150,150 250,100" fill="#718096" />
              </svg>
            ) : (
              <svg viewBox="0 0 500 500" className="w-full h-full opacity-20">
                <path d="M100,150 L400,150 L350,250 L400,350 L100,350 L150,250 Z" fill="#718096" />
              </svg>
            )}
          </div>
        </div>
        
        {/* Region markers */}
        <div className="absolute inset-0">
          {mockData.map((point, index) => (
            <div 
              key={index}
              className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110`}
              style={{ 
                left: `${point.x}px`, 
                top: `${point.y}px` 
              }}
              onClick={() => handleRegionClick(point.name)}
            >
              <div 
                className={`${getScoreColor(point.score)} w-5 h-5 rounded-full shadow-md flex items-center justify-center border-2 border-white`}
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
          {regions.length} regions visualized
        </div>
      </Card>
    </div>
  );
};

export default MapView;
