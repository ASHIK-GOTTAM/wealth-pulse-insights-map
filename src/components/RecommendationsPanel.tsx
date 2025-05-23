
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface RecommendationsPanelProps {
  country: 'india' | 'usa';
  selectedRegion: string | null;
}

const RecommendationsPanel: React.FC<RecommendationsPanelProps> = ({ country, selectedRegion }) => {
  // Check if the selected region is a rural area
  const isRuralArea = selectedRegion && (
    selectedRegion.includes('Rural') || 
    selectedRegion.includes('Villages') || 
    selectedRegion.includes('Farmlands') ||
    selectedRegion.includes('Communities') ||
    selectedRegion.includes('Region')
  );
  
  // Check if the selected region is an urban area
  const isUrbanArea = selectedRegion && (
    selectedRegion.includes('City') ||
    selectedRegion.includes('Manhattan') ||
    selectedRegion.includes('Brooklyn') ||
    selectedRegion.includes('Los Angeles') ||
    selectedRegion.includes('Chicago') ||
    selectedRegion.includes('Houston') ||
    selectedRegion.includes('South Mumbai') ||
    selectedRegion.includes('Andheri') ||
    selectedRegion.includes('Bandra') ||
    selectedRegion.includes('T Nagar') ||
    selectedRegion.includes('Electronic') ||
    selectedRegion.includes('Whitefield') ||
    selectedRegion.includes('Hills') ||
    selectedRegion.includes('Place') ||
    selectedRegion.includes('Town') ||
    selectedRegion.includes('Street') ||
    selectedRegion.includes('Road') ||
    selectedRegion.includes('Nagar') ||
    !isRuralArea
  );
  
  const getRecommendations = () => {
    // Rural-specific recommendations when a rural area is selected
    if (isRuralArea) {
      return [
        {
          title: 'Mobile Banking Units',
          priority: 'High',
          description: 'Deploy mobile banking vans to reach remote villages',
          impact: 'Banking Access +25%'
        },
        {
          title: 'Digital Literacy Camps',
          priority: 'High',
          description: 'Weekend digital payment training for rural residents',
          impact: 'Digital Adoption +30%'
        },
        {
          title: 'Microfinance Programs',
          priority: 'Medium',
          description: 'Rural-focused small business loans with simplified processes',
          impact: 'Financial Inclusion +22%'
        }
      ];
    }
    
    // City-specific recommendations when an urban area is selected
    if (isUrbanArea) {
      return [
        {
          title: 'Increase ATM Density',
          priority: 'High',
          description: 'Deploy 15 new ATMs in underserved neighborhoods',
          impact: 'Banking Access +12%'
        },
        {
          title: 'Digital Literacy Program',
          priority: 'Medium',
          description: 'Launch mobile payment workshops at community centers',
          impact: 'Digital Adoption +20%'
        },
        {
          title: 'FinTech Innovation Hub',
          priority: 'Medium',
          description: 'Create financial technology innovation centers',
          impact: 'Financial Services +18%'
        }
      ];
    }

    // Default country-wide recommendations
    return country === 'india' 
      ? [
          {
            title: 'Rural UPI Infrastructure',
            priority: 'High',
            description: 'Expand UPI QR acceptance in 15,000 villages',
            impact: 'Rural Digital Payments +35%'
          },
          {
            title: 'Financial Education',
            priority: 'High',
            description: 'School-based financial literacy in rural areas',
            impact: 'Rural Literacy Score +18%'
          },
          {
            title: 'Women Banking',
            priority: 'Medium',
            description: 'Self-help group banking initiatives for rural women',
            impact: 'Rural Female Inclusion +25%'
          }
        ]
      : [
          {
            title: 'Rural Banking Access',
            priority: 'High',
            description: 'Support mobile banking units for rural communities',
            impact: 'Rural Access +28%'
          },
          {
            title: 'Rural Fintech Solutions',
            priority: 'Medium',
            description: 'Enable offline-capable fintech for areas with poor connectivity',
            impact: 'Rural Digital Services +32%'
          },
          {
            title: 'Agricultural Credit System',
            priority: 'Medium',
            description: 'Simplified farm loan processes with digital documentation',
            impact: 'Rural Credit Access +20%'
          }
        ];
  };

  const recommendations = getRecommendations();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="p-6 shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Recommendations
        {selectedRegion && (
          <span className="block text-sm font-normal text-gray-600 mt-1">
            for {selectedRegion}
            {isRuralArea && (
              <Badge className="ml-2 bg-orange-100 text-orange-800">Rural Area</Badge>
            )}
            {isUrbanArea && !isRuralArea && (
              <Badge className="ml-2 bg-blue-100 text-blue-800">Urban Area</Badge>
            )}
          </span>
        )}
      </h3>
      
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-gray-900">{rec.title}</h4>
              <Badge className={getPriorityColor(rec.priority)}>
                {rec.priority}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                {rec.impact}
              </span>
              <Button size="sm" variant="outline" className="text-xs">
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <Button className="w-full mt-4" variant="default">
        Generate Full Report
      </Button>
    </Card>
  );
};

export default RecommendationsPanel;
