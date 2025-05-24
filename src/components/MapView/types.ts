
export interface RegionData {
  name: string;
  score: number;
  x: number;
  y: number;
  isUrban?: boolean;
  isRural?: boolean;
}

export interface MapViewProps {
  country: 'india' | 'usa';
  onRegionSelect: (region: string | null) => void;
  selectedRegion: string | null;
}

export type ViewMode = 'all' | 'urban' | 'rural';
