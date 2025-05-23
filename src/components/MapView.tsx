
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MapViewProps {
  country: 'india' | 'usa';
  onRegionSelect: (region: string | null) => void;
  selectedRegion: string | null;
}

const MapView: React.FC<MapViewProps> = ({ country, onRegionSelect, selectedRegion }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  // Mock regions data
  const regions = country === 'india' 
    ? ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad']
    : ['New York', 'California', 'Texas', 'Florida', 'Illinois', 'Pennsylvania'];

  const loadMap = async () => {
    if (!mapboxToken || !mapContainer.current) return;

    try {
      // Dynamically import mapbox-gl
      const mapboxgl = await import('mapbox-gl');
      await import('mapbox-gl/dist/mapbox-gl.css');
      
      mapboxgl.accessToken = mapboxToken;
      
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        zoom: country === 'india' ? 4 : 3.5,
        center: country === 'india' ? [78.9629, 20.5937] : [-95.7129, 37.0902],
        pitch: 30,
      });

      map.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add mock financial health markers
      const mockData = regions.map((region, index) => ({
        name: region,
        score: Math.floor(Math.random() * 40) + 60, // 60-100 range
        lng: country === 'india' 
          ? 68 + Math.random() * 20 
          : -125 + Math.random() * 50,
        lat: country === 'india' 
          ? 8 + Math.random() * 30 
          : 25 + Math.random() * 20,
      }));

      map.on('load', () => {
        mockData.forEach((point) => {
          const color = point.score > 80 ? '#10B981' : point.score > 70 ? '#F59E0B' : '#EF4444';
          
          const marker = new mapboxgl.Marker({
            color: color,
            scale: 0.8
          })
            .setLngLat([point.lng, point.lat])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 })
                .setHTML(`
                  <div class="p-2">
                    <h3 class="font-semibold">${point.name}</h3>
                    <p class="text-sm">Financial Health Score: <span class="font-medium">${point.score}/100</span></p>
                  </div>
                `)
            )
            .addTo(map);

          marker.getElement().addEventListener('click', () => {
            onRegionSelect(point.name);
          });
        });
      });

      setShowTokenInput(false);
    } catch (error) {
      console.error('Error loading map:', error);
    }
  };

  return (
    <div className="relative w-full h-full">
      {showTokenInput ? (
        <div className="flex flex-col items-center justify-center h-full space-y-4 bg-gray-50 rounded-lg">
          <div className="text-center max-w-md mx-auto p-6">
            <h3 className="text-lg font-semibold mb-2">Mapbox Token Required</h3>
            <p className="text-sm text-gray-600 mb-4">
              To display the interactive map, please enter your Mapbox public token. 
              You can get one free at{' '}
              <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                mapbox.com
              </a>
            </p>
            <div className="space-y-3">
              <Input
                type="password"
                placeholder="Enter your Mapbox public token"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="w-full"
              />
              <Button onClick={loadMap} disabled={!mapboxToken} className="w-full">
                Load Interactive Map
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div ref={mapContainer} className="w-full h-full rounded-lg" />
      )}
      
      {!showTokenInput && (
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md">
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
      )}
      
      {selectedRegion && (
        <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-md">
          <p className="text-sm font-medium">Selected: {selectedRegion}</p>
          <Button size="sm" variant="outline" onClick={() => onRegionSelect(null)} className="mt-2">
            Clear Selection
          </Button>
        </div>
      )}
    </div>
  );
};

export default MapView;
