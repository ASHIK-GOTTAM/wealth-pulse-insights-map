
import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface RegionalInsightsProps {
  country: 'india' | 'usa';
  selectedRegion: string | null;
}

const RegionalInsights: React.FC<RegionalInsightsProps> = ({ country, selectedRegion }) => {
  const getInsights = () => {
    if (selectedRegion) {
      return {
        title: `${selectedRegion} Financial Health Overview`,
        stats: [
          { label: 'Bank Branches per 100k people', value: Math.floor(Math.random() * 20) + 15 },
          { label: 'ATMs per 100k people', value: Math.floor(Math.random() * 30) + 40 },
          { label: 'Mobile Banking Users', value: `${Math.floor(Math.random() * 20) + 60}%` },
          { label: 'Credit Score Average', value: Math.floor(Math.random() * 100) + 650 },
        ],
        trends: [
          'Digital payment adoption increased by 35% in last year',
          'Youth savings accounts grew by 28%',
          'Microfinance participation up 15%'
        ]
      };
    }

    return country === 'india' 
      ? {
          title: 'India National Financial Health Overview',
          stats: [
            { label: 'Bank Branches per 100k people', value: 14 },
            { label: 'ATMs per 100k people', value: 23 },
            { label: 'Digital Payment Users', value: '67%' },
            { label: 'Financial Inclusion Index', value: 76 },
          ],
          trends: [
            'UPI transactions reached ₹125 trillion in 2023',
            'Rural banking coverage improved by 22%',
            'Women account ownership increased to 78%',
            'Jan Dhan accounts crossed 500 million'
          ]
        }
      : {
          title: 'United States National Financial Health Overview',
          stats: [
            { label: 'Bank Branches per 100k people', value: 28 },
            { label: 'ATMs per 100k people', value: 33 },
            { label: 'Digital Banking Users', value: '82%' },
            { label: 'Credit Score Average', value: 714 },
          ],
          trends: [
            'Contactless payments adoption reached 71%',
            'Community bank deposits grew 12%',
            'Fintech lending increased by 45%',
            'Digital-only bank accounts up 38%'
          ]
        };
  };

  const insights = getInsights();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">{insights.title}</h3>
        <div className="space-y-4">
          {insights.stats.map((stat, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{stat.label}</span>
              <span className="font-semibold text-blue-600">{stat.value}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Key Trends & Insights</h3>
        <div className="space-y-3">
          {insights.trends.map((trend, index) => (
            <div key={index} className="flex items-start">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-sm text-gray-700">{trend}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 shadow-lg md:col-span-2">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Financial Inclusion Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {country === 'india' ? '76%' : '85%'}
            </div>
            <div className="text-sm text-gray-600">Banked Population</div>
            <Progress value={country === 'india' ? 76 : 85} className="mt-2" />
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {country === 'india' ? '67%' : '82%'}
            </div>
            <div className="text-sm text-gray-600">Digital Payment Users</div>
            <Progress value={country === 'india' ? 67 : 82} className="mt-2" />
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {country === 'india' ? '42%' : '63%'}
            </div>
            <div className="text-sm text-gray-600">Financial Literacy</div>
            <Progress value={country === 'india' ? 42 : 63} className="mt-2" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RegionalInsights;
