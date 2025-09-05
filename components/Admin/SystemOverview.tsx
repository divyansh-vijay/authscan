import React from 'react';
import { Activity, Server, Database, Shield, TrendingUp, AlertTriangle } from 'lucide-react';
import StatsCard from '../Shared/StatsCard';

export default function SystemOverview() {
  const systemStats = [
    {
      name: 'Total Verifications',
      value: '45,623',
      change: '+12%',
      changeType: 'increase' as const,
      icon: Activity,
      color: 'blue'
    },
    {
      name: 'Active Institutions',
      value: '156',
      change: '+8',
      changeType: 'increase' as const,
      icon: Server,
      color: 'teal'
    },
    {
      name: 'Database Records',
      value: '892K',
      change: '+5%',
      changeType: 'increase' as const,
      icon: Database,
      color: 'purple'
    },
    {
      name: 'Security Incidents',
      value: '23',
      change: '-15%',
      changeType: 'decrease' as const,
      icon: Shield,
      color: 'emerald'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat) => (
          <StatsCard key={stat.name} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Health */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
          <div className="space-y-4">
            <HealthMetric
              label="API Response Time"
              value="245ms"
              status="good"
              target="< 500ms"
            />
            <HealthMetric
              label="Database Query Time"
              value="89ms"
              status="excellent"
              target="< 200ms"
            />
            <HealthMetric
              label="OCR Processing Time"
              value="1.8s"
              status="good"
              target="< 3s"
            />
            <HealthMetric
              label="System Uptime"
              value="99.97%"
              status="excellent"
              target="> 99.9%"
            />
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent System Alerts</h3>
          <div className="space-y-3">
            {[
              {
                type: 'warning',
                message: 'High verification volume from IP 192.168.1.100',
                time: '2 hours ago'
              },
              {
                type: 'info',
                message: 'New institution "IIT Ranchi" registered',
                time: '6 hours ago'
              },
              {
                type: 'error',
                message: 'Failed authentication attempt detected',
                time: '1 day ago'
              }
            ].map((alert, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                  alert.type === 'error' ? 'text-red-500' :
                  alert.type === 'warning' ? 'text-amber-500' : 'text-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Verification Activity (Last 30 Days)</h3>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">Successful</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-600">Failed</span>
            </div>
          </div>
        </div>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Activity chart visualization would be rendered here</p>
        </div>
      </div>
    </div>
  );
}

interface HealthMetricProps {
  label: string;
  value: string;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  target: string;
}

function HealthMetric({ label, value, status, target }: HealthMetricProps) {
  const statusColors = {
    excellent: 'text-emerald-600',
    good: 'text-blue-600',
    warning: 'text-amber-600',
    critical: 'text-red-600'
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-xs text-gray-500">Target: {target}</p>
      </div>
      <div className={`text-right ${statusColors[status]}`}>
        <p className="text-lg font-semibold">{value}</p>
        <p className="text-xs capitalize">{status}</p>
      </div>
    </div>
  );
}