import React from 'react';
import { TrendingUp, Users, Shield, AlertTriangle } from 'lucide-react';
import StatsCard from '../Shared/StatsCard';

export default function InstitutionStats() {
  const stats = [
    {
      name: 'Total Certificates',
      value: '8,942',
      change: '+234',
      changeType: 'increase' as const,
      icon: Users,
      color: 'blue'
    },
    {
      name: 'Verified This Month',
      value: '1,247',
      change: '+18%',
      changeType: 'increase' as const,
      icon: Shield,
      color: 'emerald'
    },
    {
      name: 'Fraud Attempts Blocked',
      value: '12',
      change: '-3',
      changeType: 'decrease' as const,
      icon: AlertTriangle,
      color: 'amber'
    },
    {
      name: 'Verification Success Rate',
      value: '99.1%',
      change: '+0.3%',
      changeType: 'increase' as const,
      icon: TrendingUp,
      color: 'teal'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatsCard key={stat.name} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Verification Trends</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart visualization would be rendered here</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Distribution</h3>
          <div className="space-y-3">
            {[
              { course: 'Computer Science', count: 2847, percentage: 32 },
              { course: 'Electrical Engineering', count: 2134, percentage: 24 },
              { course: 'Mechanical Engineering', count: 1923, percentage: 22 },
              { course: 'Civil Engineering', count: 1456, percentage: 16 },
              { course: 'Others', count: 582, percentage: 6 }
            ].map((item) => (
              <div key={item.course} className="flex items-center justify-between">
                <span className="text-sm text-gray-900">{item.course}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}