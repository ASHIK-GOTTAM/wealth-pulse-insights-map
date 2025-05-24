
import { RegionData } from '../types';
import { urbanAreas, ruralAreas, getMainRegionsData } from '../data';

export const useRegionData = (country: 'india' | 'usa') => {
  const mainRegionsData = getMainRegionsData(country);

  const getUrbanAreasData = (region: string): RegionData[] => {
    if (!region) return [];

    const countryKey = country as keyof typeof urbanAreas;
    const countryData = urbanAreas[countryKey];
    if (!countryData) return [];
    
    const regionKey = region as keyof typeof countryData;
    const areas = countryData[regionKey];
    if (!areas || !Array.isArray(areas)) return [];
    
    const mainRegion = mainRegionsData.find(r => r.name === region);
    if (!mainRegion) return [];

    return areas.map((area, index) => {
      const angle = (index * 2 * Math.PI) / areas.length + Math.PI/6;
      const radius = 30;
      const x = mainRegion.x + radius * Math.cos(angle);
      const y = mainRegion.y + radius * Math.sin(angle);
      
      const score = Math.min(95, mainRegion.score + 5 + Math.floor(Math.random() * 5));
      
      return { name: area, score, x, y, isUrban: true };
    });
  };

  const getRuralAreasData = (region: string): RegionData[] => {
    if (!region) return [];

    const countryKey = country as keyof typeof ruralAreas;
    const countryData = ruralAreas[countryKey];
    if (!countryData) return [];
    
    const regionKey = region as keyof typeof countryData;
    const areas = countryData[regionKey];
    if (!areas || !Array.isArray(areas)) return [];
    
    const mainRegion = mainRegionsData.find(r => r.name === region);
    if (!mainRegion) return [];

    return areas.map((area, index) => {
      const angle = (index * 2 * Math.PI) / areas.length - Math.PI/6;
      const radius = 40;
      const x = mainRegion.x + radius * Math.cos(angle);
      const y = mainRegion.y + radius * Math.sin(angle);
      
      const score = Math.max(40, mainRegion.score - 15 - Math.floor(Math.random() * 10));
      
      return { name: area, score, x, y, isRural: true };
    });
  };

  return {
    mainRegionsData,
    getUrbanAreasData,
    getRuralAreasData
  };
};
