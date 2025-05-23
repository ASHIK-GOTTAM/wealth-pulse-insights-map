
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface RecommendationsPanelProps {
  country: 'india' | 'usa';
  selectedRegion: string | null;
}

const RecommendationsPanel: React.FC<RecommendationsPanelProps> = ({ country, selectedRegion }) => {
  const getRecommendations = () => {
    if (selectedRegion) {
      return [
        {
          title: 'Increase ATM Density',
          priority: 'High',
          description: 'Deploy 15 new ATMs in underserved areas',
          impact: 'Banking Access +12%'
        },
        {
          title: 'Digital Literacy Program',
          priority: 'Medium',
          description: 'Launch mobile payment workshops',
          impact: 'Digital Adoption +20%'
        },
        {
          title: 'Microfinance Initiative',
          priority: 'Low',
          description: 'Partner with local NGOs for micro-loans',
          impact: 'Financial Inclusion +8%'
        }
      ];
    }

    return country === 'india' 
      ? [
          {
            title: 'UPI Expansion',
            priority: 'High',
            description: 'Accelerate UPI adoption in rural areas',
            impact: 'Digital Payments +25%'
          },
          {
            title: 'Financial Education',
            priority: 'High',
            description: 'School-based financial literacy programs',
            impact: 'Literacy Score +15%'
          },
          {
            title: 'Women Banking',
            priority: 'Medium',
            description: 'Women-focused banking products',
            impact: 'Inclusion +18%'
          }
        ]
      : [
          {
            title: 'Community Banks',
            priority: 'High',
            description: 'Support community development financial institutions',
            impact: 'Rural Access +22%'
          },
          {
            title: 'Fintech Partnerships',
            priority: 'Medium',
            description: 'Enable fintech solutions for underbanked',
            impact: 'Digital Services +30%'
          },
          {
            title: 'Student Loan Reform',
            priority: 'Medium',
            description: 'Improve student loan accessibility',
            impact: 'Youth Finance +20%'
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
