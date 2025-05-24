
import React from 'react';
import { RegionData } from './types';

interface RegionMarkerProps {
  region: RegionData;
  onRegionClick: (region: string, isUrban?: boolean, isRural?: boolean) => void;
}

const getScoreColor = (score: number) => {
  if (score > 80) return 'bg-green-500';
  if (score > 70) return 'bg-yellow-500';
  if (score > 60) return 'bg-orange-500';
  return 'bg-red-500';
};

const RegionMarker: React.FC<RegionMarkerProps> = ({ region, onRegionClick }) => {
  return (
    <div 
      className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110 pointer-events-auto"
      style={{ 
        left: region.x, 
        top: region.y
      }}
      onClick={() => onRegionClick(region.name, region.isUrban, region.isRural)}
    >
      <div 
        className={`${getScoreColor(region.score)} w-6 h-6 rounded-full shadow-md flex items-center justify-center border-2 ${
          region.isRural ? 'border-orange-300' : region.isUrban ? 'border-blue-300' : 'border-white'
        }`}
        title={`${region.name}: ${region.score}/100 ${
          region.isRural ? '(Rural Area)' : region.isUrban ? '(Urban Area)' : ''
        }`}
      />
      <div className={`absolute top-6 left-1/2 transform -translate-x-1/2 ${
        region.isRural ? 'bg-orange-50' : region.isUrban ? 'bg-blue-50' : 'bg-white'
      } px-2 py-1 rounded shadow-md text-xs whitespace-nowrap max-w-[120px]`}>
        <div className="truncate">
          {region.name} ({region.score})
        </div>
        {region.isRural && (
          <span className="text-[10px] text-orange-600 font-medium">Rural Area</span>
        )}
        {region.isUrban && (
          <span className="text-[10px] text-blue-600 font-medium">Urban Area</span>
        )}
      </div>
    </div>
  );
};

export default RegionMarker;
