
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { MapViewProps, ViewMode, RegionData } from './types';
import { useRegionData } from './hooks/useRegionData';
import MapBackground from './MapBackground';
import MapLegend from './MapLegend';
import MapControls from './MapControls';
import RegionMarker from './RegionMarker';

const MapView: React.FC<MapViewProps> = ({ country, onRegionSelect, selectedRegion }) => {
  const [showingRegionDetails, setShowingRegionDetails] = useState(false);
  const [selectedMainRegion, setSelectedMainRegion] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('all');

  const { mainRegionsData, getUrbanAreasData, getRuralAreasData } = useRegionData(country);

  const handleRegionClick = (region: string, isUrban: boolean = false, isRural: boolean = false) => {
    if (isUrban || isRural) {
      onRegionSelect(region);
    } else {
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

  const handleFilterChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  // Determine which regions to display based on current view state
  let displayRegions: RegionData[] = mainRegionsData;
  
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
      <MapLegend />
      
      <div className="w-full h-full relative">
        <MapBackground country={country} />
        
        <div className="absolute inset-0 pointer-events-none">
          {displayRegions.map((region, index) => (
            <RegionMarker 
              key={index}
              region={region}
              onRegionClick={handleRegionClick}
            />
          ))}
        </div>
      </div>
      
      <MapControls
        showingRegionDetails={showingRegionDetails}
        selectedMainRegion={selectedMainRegion}
        selectedRegion={selectedRegion}
        viewMode={viewMode}
        onFilterChange={handleFilterChange}
        onBackToMainRegions={handleBackToMainRegions}
        onClearSelection={() => onRegionSelect(null)}
      />
      
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
