
import React from 'react';
import { Button } from '@/components/ui/button';
import { ViewMode } from './types';

interface MapControlsProps {
  showingRegionDetails: boolean;
  selectedMainRegion: string | null;
  selectedRegion: string | null;
  viewMode: ViewMode;
  onFilterChange: (mode: ViewMode) => void;
  onBackToMainRegions: () => void;
  onClearSelection: () => void;
}

const MapControls: React.FC<MapControlsProps> = ({
  showingRegionDetails,
  selectedMainRegion,
  selectedRegion,
  viewMode,
  onFilterChange,
  onBackToMainRegions,
  onClearSelection
}) => {
  return (
    <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-md">
      {showingRegionDetails ? (
        <div>
          <p className="text-sm font-medium">Viewing: {selectedMainRegion} Region</p>
          <div className="flex space-x-2 mt-2 mb-2">
            <Button 
              size="sm" 
              variant={viewMode === 'all' ? 'default' : 'outline'} 
              onClick={() => onFilterChange('all')}
              className="text-xs"
            >
              All Areas
            </Button>
            <Button 
              size="sm" 
              variant={viewMode === 'urban' ? 'default' : 'outline'} 
              onClick={() => onFilterChange('urban')}
              className="text-xs"
            >
              Urban Only
            </Button>
            <Button 
              size="sm" 
              variant={viewMode === 'rural' ? 'default' : 'outline'} 
              onClick={() => onFilterChange('rural')}
              className="text-xs"
            >
              Rural Only
            </Button>
          </div>
          <Button size="sm" variant="outline" onClick={onBackToMainRegions}>
            Back to Main Regions
          </Button>
        </div>
      ) : selectedRegion ? (
        <div>
          <p className="text-sm font-medium">Selected: {selectedRegion}</p>
          <Button size="sm" variant="outline" onClick={onClearSelection} className="mt-2">
            Clear Selection
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default MapControls;
