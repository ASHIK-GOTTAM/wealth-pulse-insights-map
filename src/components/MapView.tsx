
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface MapViewProps {
  country: 'india' | 'usa';
  onRegionSelect: (region: string | null) => void;
  selectedRegion: string | null;
}

const MapView: React.FC<MapViewProps> = ({ country, onRegionSelect, selectedRegion }) => {
  // Track if we're showing details of a selected region
  const [showingRegionDetails, setShowingRegionDetails] = useState(false);
  const [selectedMainRegion, setSelectedMainRegion] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'all' | 'urban' | 'rural'>('all');

  // Main urban regions data
  const mainRegions = country === 'india' 
    ? ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad']
    : ['New York', 'California', 'Texas', 'Florida', 'Illinois', 'Pennsylvania'];

  // Urban areas data mapped to their main regions
  const urbanAreas = {
    india: {
      'Mumbai': ['South Mumbai', 'Andheri', 'Bandra'],
      'Delhi': ['New Delhi', 'Connaught Place', 'Nehru Place'],
      'Bangalore': ['Electronic City', 'Whitefield', 'MG Road'],
      'Chennai': ['T Nagar', 'Anna Nagar', 'Mylapore'],
      'Kolkata': ['Park Street', 'Salt Lake', 'New Town'],
      'Hyderabad': ['Hitech City', 'Banjara Hills', 'Jubilee Hills']
    },
    usa: {
      'New York': ['Manhattan', 'Brooklyn', 'Queens'],
      'California': ['Los Angeles', 'San Francisco', 'San Diego'],
      'Texas': ['Houston', 'Dallas', 'Austin'],
      'Florida': ['Miami', 'Orlando', 'Tampa'],
      'Illinois': ['Chicago', 'Aurora', 'Naperville'],
      'Pennsylvania': ['Philadelphia', 'Pittsburgh', 'Allentown']
    }
  };

  // Rural areas data mapped to their main regions
  const ruralAreas = {
    india: {
      'Mumbai': ['Palghar', 'Thane Rural', 'Raigad Villages'],
      'Delhi': ['Najafgarh Rural', 'Alipur', 'Narela'],
      'Bangalore': ['Doddaballapura', 'Nelamangala', 'Anekal'],
      'Chennai': ['Tiruvallur Villages', 'Kanchipuram Rural', 'Chengalpattu Rural'],
      'Kolkata': ['South 24 Parganas Rural', 'Howrah Rural', 'Hooghly Villages'],
      'Hyderabad': ['Rangareddy Rural', 'Medchal Villages', 'Sangareddy Rural']
    },
    usa: {
      'New York': ['Adirondack Region', 'Finger Lakes Rural', 'Catskill Villages'],
      'California': ['Central Valley Towns', 'Northern California Rural', 'Eastern Sierra Communities'],
      'Texas': ['West Texas Rural', 'East Texas Villages', 'Rio Grande Valley Towns'],
      'Florida': ['Panhandle Rural', 'Central Florida Farmlands', 'Everglades Communities'],
      'Illinois': ['Southern Illinois Rural', 'Western Illinois Farmlands', 'Central Illinois Villages'],
      'Pennsylvania': ['Appalachian Communities', 'Rural Poconos', 'Central PA Farmlands']
    }
  };

  // Main urban regions financial data
  const mainRegionsData = country === 'india' 
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

  // Get urban areas data for a selected main region
  const getUrbanAreasData = (region: string) => {
    if (!region) return [];

    const countryKey = country as keyof typeof urbanAreas;
    const areas = urbanAreas[countryKey][region as keyof typeof urbanAreas[typeof countryKey]] || [];
    
    // Find coordinates of the main region to position urban areas around it
    const mainRegion = mainRegionsData.find(r => r.name === region);
    if (!mainRegion) return [];

    // Position urban areas around their main region with higher financial health scores
    return areas.map((area, index) => {
      // Calculate positions in a radius around the main region
      const angle = (index * 2 * Math.PI) / areas.length + Math.PI/6;
      const radius = 30; // Distance from main region
      const x = mainRegion.x + radius * Math.cos(angle);
      const y = mainRegion.y + radius * Math.sin(angle);
      
      // Urban areas have higher scores than rural areas
      const score = Math.min(95, mainRegion.score + 5 + Math.floor(Math.random() * 5));
      
      return { name: area, score, x, y, isUrban: true };
    });
  };

  // Get rural areas data for a selected main region
  const getRuralAreasData = (region: string) => {
    if (!region) return [];

    const countryKey = country as keyof typeof ruralAreas;
    const areas = ruralAreas[countryKey][region as keyof typeof ruralAreas[typeof countryKey]] || [];
    
    // Find coordinates of the main region to position rural areas around it
    const mainRegion = mainRegionsData.find(r => r.name === region);
    if (!mainRegion) return [];

    // Position rural areas around their main region with lower financial health scores
    return areas.map((area, index) => {
      // Calculate positions in a radius around the main region
      const angle = (index * 2 * Math.PI) / areas.length - Math.PI/6;
      const radius = 40; // Distance from main region
      const x = mainRegion.x + radius * Math.cos(angle);
      const y = mainRegion.y + radius * Math.sin(angle);
      
      // Rural areas have lower scores than urban centers to highlight disparity
      const score = Math.max(40, mainRegion.score - 15 - Math.floor(Math.random() * 10));
      
      return { name: area, score, x, y, isRural: true };
    });
  };

  const handleRegionClick = (region: string, isUrban: boolean = false, isRural: boolean = false) => {
    if (isUrban || isRural) {
      // If clicking a specific area, select it directly
      onRegionSelect(region);
    } else {
      // If clicking a main region, show its urban and rural areas
      setSelectedMainRegion(region);
      setShowingRegionDetails(true);
      onRegionSelect(region);
    }
  };

  const handleBackToMainRegions = () => {
    setShowingRegionDetails(false);
    setSelectedMainRegion(null);
    setViewMode('all');
    onRegionSelect(null);
  };

  const handleFilterChange = (mode: 'all' | 'urban' | 'rural') => {
    setViewMode(mode);
  };

  const getScoreColor = (score: number) => {
    if (score > 80) return 'bg-green-500';
    if (score > 70) return 'bg-yellow-500';
    if (score > 60) return 'bg-orange-500';
    return 'bg-red-500';
  };

  // Determine which regions to display based on current view state
  let displayRegions = mainRegionsData;
  
  if (showingRegionDetails && selectedMainRegion) {
    const urbanAreaData = getUrbanAreasData(selectedMainRegion);
    const ruralAreaData = getRuralAreasData(selectedMainRegion);
    
    if (viewMode === 'all') {
      displayRegions = [...urbanAreaData, ...ruralAreaData];
    } else if (viewMode === 'urban') {
      displayRegions = urbanAreaData;
    } else if (viewMode === 'rural') {
      displayRegions = ruralAreaData;
    }
  }

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
            <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
            <span>Fair (60-69)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span>Needs Attention (Below 60)</span>
          </div>
        </div>
      </div>
      
      <div className="w-full h-full relative">
        {/* Map background with country shape */}
        <div className="absolute inset-0 bg-blue-50 rounded-lg overflow-hidden flex items-center justify-center">
          {country === 'india' ? (
            <svg viewBox="0 0 300 300" className="w-[450px] h-[450px] opacity-20" preserveAspectRatio="xMidYMid meet">
              {/* India map outline */}
              <path d="M142,40 C150,35 160,30 170,32 C180,35 190,30 200,35 C210,40 220,45 225,55 C230,65 240,70 245,80 C250,90 255,100 260,110 C265,120 270,130 265,140 C260,150 265,160 260,170 C255,180 250,190 240,195 C230,200 225,210 215,215 C205,220 195,225 185,230 C175,235 165,240 155,235 C145,230 135,235 125,230 C115,225 105,220 100,210 C95,200 85,195 80,185 C75,175 65,170 60,160 C55,150 50,140 55,130 C60,120 55,110 60,100 C65,90 70,80 80,75 C90,70 95,60 105,55 C115,50 125,45 135,45 C135,45 135,45 142,40" 
                fill="#718096" />
            </svg>
          ) : (
            <svg viewBox="0 0 300 150" className="w-[450px] h-[250px] opacity-20" preserveAspectRatio="xMidYMid meet">
              {/* USA map outline */}
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
          {displayRegions.map((point, index) => (
            <div 
              key={index}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110 pointer-events-auto"
              style={{ 
                left: point.x, 
                top: point.y
              }}
              onClick={() => handleRegionClick(point.name, point.isUrban, point.isRural)}
            >
              <div 
                className={`${getScoreColor(point.score)} w-6 h-6 rounded-full shadow-md flex items-center justify-center border-2 ${
                  point.isRural ? 'border-orange-300' : point.isUrban ? 'border-blue-300' : 'border-white'
                }`}
                title={`${point.name}: ${point.score}/100 ${
                  point.isRural ? '(Rural Area)' : point.isUrban ? '(Urban Area)' : ''
                }`}
              />
              <div className={`absolute top-6 left-1/2 transform -translate-x-1/2 ${
                point.isRural ? 'bg-orange-50' : point.isUrban ? 'bg-blue-50' : 'bg-white'
              } px-2 py-1 rounded shadow-md text-xs whitespace-nowrap max-w-[120px]`}>
                <div className="truncate">
                  {point.name} ({point.score})
                </div>
                {point.isRural && (
                  <span className="text-[10px] text-orange-600 font-medium">Rural Area</span>
                )}
                {point.isUrban && (
                  <span className="text-[10px] text-blue-600 font-medium">Urban Area</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation controls */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-md">
        {showingRegionDetails ? (
          <div>
            <p className="text-sm font-medium">Viewing: {selectedMainRegion} Region</p>
            <div className="flex space-x-2 mt-2 mb-2">
              <Button 
                size="sm" 
                variant={viewMode === 'all' ? 'default' : 'outline'} 
                onClick={() => handleFilterChange('all')}
                className="text-xs"
              >
                All Areas
              </Button>
              <Button 
                size="sm" 
                variant={viewMode === 'urban' ? 'default' : 'outline'} 
                onClick={() => handleFilterChange('urban')}
                className="text-xs"
              >
                Urban Only
              </Button>
              <Button 
                size="sm" 
                variant={viewMode === 'rural' ? 'default' : 'outline'} 
                onClick={() => handleFilterChange('rural')}
                className="text-xs"
              >
                Rural Only
              </Button>
            </div>
            <Button size="sm" variant="outline" onClick={handleBackToMainRegions}>
              Back to Main Regions
            </Button>
          </div>
        ) : selectedRegion ? (
          <div>
            <p className="text-sm font-medium">Selected: {selectedRegion}</p>
            <Button size="sm" variant="outline" onClick={() => onRegionSelect(null)} className="mt-2">
              Clear Selection
            </Button>
          </div>
        ) : null}
      </div>
      
      <Card className="absolute bottom-4 right-4 p-3 shadow-md">
        <div className="text-sm font-medium">
          {country === 'india' ? 'India Financial Health Map' : 'United States Financial Health Map'}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {showingRegionDetails 
            ? `Viewing ${viewMode === 'all' ? 'all areas' : viewMode === 'urban' ? 'urban areas' : 'rural areas'} around ${selectedMainRegion}` 
            : 'Click on a region to see details'}
        </div>
      </Card>
    </div>
  );
};

export default MapView;
