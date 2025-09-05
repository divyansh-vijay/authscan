import React from 'react';
import { AlertTriangle, TrendingDown, MapPin, Calendar } from 'lucide-react';

export default function FraudAnalytics() {
  const fraudStats = [
    {
      label: 'Fraud Attempts Blocked',
      value: '23',
      change: '-15%',
      color: 'emerald'
    },
    {
      label: 'Suspicious Documents',
      value: '156',
      change: '+8%',
      color: 'amber'
    },
    {
      label: 'Blacklisted Entities',
      value: '12',
      change: '+2',
      color: 'red'
    },
    {
      label: 'Detection Accuracy',
      value: '98.7%',
      change: '+0.5%',
      color: 'blue'
    }
  ];

  const recentFraudCases = [
    {
      id: '1',
      type: 'Forged Signature',
      institution: 'Delhi University',
      studentName: 'Anonymous User 1',
      detectedAt: '2024-01-20 15:30',
      severity: 'high',
      status: 'investigated'
    },
    {
      id: '2',
      type: 'Invalid Certificate Number',
      institution: 'IIT Ranchi',
      studentName: 'Anonymous User 2',
      detectedAt: '2024-01-20 11:45',
      severity: 'medium',
      status: 'pending'
    },
    {
      id: '3',
      type: 'Tampered Grades',
      institution: 'St. Xavier\'s College',
      studentName: 'Anonymous User 3',
      detectedAt: '2024-01-19 16:20',
      severity: 'high',
      status: 'blocked'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Fraud Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {fraudStats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <AlertTriangle className={`w-8 h-8 text-${stat.color}-600`} />
            </div>
            <div className={`text-sm mt-2 ${
              stat.change.startsWith('-') ? 'text-emerald-600' : 'text-red-600'
            }`}>
              {stat.change} from last month
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fraud Detection Trends */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Fraud Detection Trends</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Fraud trend chart would be rendered here</p>
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Geographic Distribution</h3>
          <div className="space-y-4">
            {[
              { state: 'Jharkhand', cases: 12, percentage: 52 },
              { state: 'Delhi', cases: 6, percentage: 26 },
              { state: 'Bihar', cases: 3, percentage: 13 },
              { state: 'West Bengal', cases: 2, percentage: 9 }
            ].map((item) => (
              <div key={item.state} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-900">{item.state}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8 text-right">{item.cases}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Fraud Cases */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Fraud Cases</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 text-sm font-medium text-gray-500">Case Type</th>
                <th className="text-left py-3 text-sm font-medium text-gray-500">Institution</th>
                <th className="text-left py-3 text-sm font-medium text-gray-500">Detected</th>
                <th className="text-left py-3 text-sm font-medium text-gray-500">Severity</th>
                <th className="text-left py-3 text-sm font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentFraudCases.map((case_) => (
                <tr key={case_.id} className="hover:bg-gray-50">
                  <td className="py-3 text-sm text-gray-900">{case_.type}</td>
                  <td className="py-3 text-sm text-gray-900">{case_.institution}</td>
                  <td className="py-3 text-sm text-gray-500">{case_.detectedAt}</td>
                  <td className="py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      case_.severity === 'high' ? 'bg-red-100 text-red-800' :
                      case_.severity === 'medium' ? 'bg-amber-100 text-amber-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {case_.severity}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      case_.status === 'blocked' ? 'bg-red-100 text-red-800' :
                      case_.status === 'investigated' ? 'bg-emerald-100 text-emerald-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {case_.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}