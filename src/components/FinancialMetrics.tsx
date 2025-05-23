
import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface FinancialMetricsProps {
  country: 'india' | 'usa';
  selectedRegion: string | null;
}

const FinancialMetrics: React.FC<FinancialMetricsProps> = ({ country, selectedRegion }) => {
  // Mock data - in real app this would come from API
  const getMetrics = () => {
    if (selectedRegion) {
      return {
        overallScore: Math.floor(Math.random() * 30) + 70,
        bankingAccess: Math.floor(Math.random() * 20) + 75,
        digitalPayments: Math.floor(Math.random() * 25) + 65,
        financialLiteracy: Math.floor(Math.random() * 20) + 60,
        savingsRate: Math.floor(Math.random() * 15) + 55,
      };
    }
    
    return country === 'india' 
      ? {
          overallScore: 73,
          bankingAccess: 82,
          digitalPayments: 78,
          financialLiteracy: 64,
          savingsRate: 58,
        }
      : {
          overallScore: 81,
          bankingAccess: 88,
          digitalPayments: 85,
          financialLiteracy: 72,
          savingsRate: 67,
        };
  };

  const metrics = getMetrics();

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="p-6 shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Financial Health Metrics
        {selectedRegion && (
          <span className="block text-sm font-normal text-gray-600 mt-1">
            {selectedRegion}
          </span>
        )}
      </h3>
      
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-800">Overall Score</span>
            <span className={`text-2xl font-bold ${getScoreColor(metrics.overallScore)}`}>
              {metrics.overallScore}/100
            </span>
          </div>
          <Progress value={metrics.overallScore} className="h-3" />
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">Banking Access</span>
              <span className={`text-sm font-semibold ${getScoreColor(metrics.bankingAccess)}`}>
                {metrics.bankingAccess}%
              </span>
            </div>
            <Progress value={metrics.bankingAccess} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">Digital Payments</span>
              <span className={`text-sm font-semibold ${getScoreColor(metrics.digitalPayments)}`}>
                {metrics.digitalPayments}%
              </span>
            </div>
            <Progress value={metrics.digitalPayments} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">Financial Literacy</span>
              <span className={`text-sm font-semibold ${getScoreColor(metrics.financialLiteracy)}`}>
                {metrics.financialLiteracy}%
              </span>
            </div>
            <Progress value={metrics.financialLiteracy} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">Savings Rate</span>
              <span className={`text-sm font-semibold ${getScoreColor(metrics.savingsRate)}`}>
                {metrics.savingsRate}%
              </span>
            </div>
            <Progress value={metrics.savingsRate} className="h-2" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FinancialMetrics;
