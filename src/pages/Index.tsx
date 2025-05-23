
import React, { useState } from 'react';
import MapView from '../components/MapView';
import RegionalInsights from '../components/RegionalInsights';
import FinancialMetrics from '../components/FinancialMetrics';
import RecommendationsPanel from '../components/RecommendationsPanel';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [selectedCountry, setSelectedCountry] = useState<'india' | 'usa'>('india');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Wealth Pulse
                </span>
              </h1>
              <p className="text-gray-600 mt-1">Financial Health Mapping Platform</p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant={selectedCountry === 'india' ? 'default' : 'outline'}
                onClick={() => setSelectedCountry('india')}
                className="transition-all duration-200"
              >
                India
              </Button>
              <Button
                variant={selectedCountry === 'usa' ? 'default' : 'outline'}
                onClick={() => setSelectedCountry('usa')}
                className="transition-all duration-200"
              >
                United States
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card className="p-6 h-[600px] shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Financial Health Map - {selectedCountry === 'india' ? 'India' : 'United States'}
              </h2>
              <MapView
                country={selectedCountry}
                onRegionSelect={setSelectedRegion}
                selectedRegion={selectedRegion}
              />
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <FinancialMetrics country={selectedCountry} selectedRegion={selectedRegion} />
            <RecommendationsPanel country={selectedCountry} selectedRegion={selectedRegion} />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8">
          <Tabs defaultValue="insights" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="insights">Regional Insights</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="future">Future Scope</TabsTrigger>
            </TabsList>
            <TabsContent value="insights" className="mt-6">
              <RegionalInsights country={selectedCountry} selectedRegion={selectedRegion} />
            </TabsContent>
            <TabsContent value="trends" className="mt-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Financial Health Trends</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900">Digital Payment Growth</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      {selectedCountry === 'india' 
                        ? '+45% YoY increase in UPI transactions' 
                        : '+23% growth in contactless payments'}
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900">Banking Infrastructure</h4>
                    <p className="text-sm text-green-700 mt-1">
                      {selectedCountry === 'india' 
                        ? '12% increase in rural bank branches' 
                        : '8% improvement in underbanked areas'}
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="future" className="mt-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Future Development Roadmap</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium">Q1 2024: Healthcare Integration</h4>
                    <p className="text-sm text-gray-600">Integrate health savings and medical expense tracking</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-medium">Q2 2024: Education Analytics</h4>
                    <p className="text-sm text-gray-600">Financial literacy program effectiveness tracking</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-medium">Q3 2024: Predictive Analytics</h4>
                    <p className="text-sm text-gray-600">AI-powered financial health predictions</p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Index;
