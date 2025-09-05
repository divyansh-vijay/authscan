import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  name: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ElementType;
  color: string;
  gradient?: string;
}

export default function StatsCard({ name, value, change, changeType, icon: Icon, color, gradient }: StatsCardProps) {
  const defaultGradients = {
    blue: 'from-blue-500 to-cyan-500',
    teal: 'from-emerald-500 to-teal-500',
    amber: 'from-amber-500 to-orange-500',
    emerald: 'from-green-500 to-emerald-500',
    purple: 'from-purple-500 to-pink-500',
    indigo: 'from-indigo-500 to-purple-500'
  };

  const iconGradient = gradient || defaultGradients[color as keyof typeof defaultGradients] || defaultGradients.blue;

  return (
    <div className="glass-card group hover:scale-105 transition-all duration-500 relative overflow-hidden p-8 rounded-3xl">
      {/* Background gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl"
           style={{ background: `linear-gradient(135deg, ${iconGradient.split(' ').join(' ')})` }}></div>
      
      <div className="relative">
        {/* Header with icon and name */}
        <div className="flex items-center justify-between mb-6">
          <div className={`w-16 h-16 bg-gradient-to-r ${iconGradient} rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div className="text-right">
            <div className={`inline-flex items-center space-x-2 px-4 py-3 rounded-2xl text-sm font-bold ${
              changeType === 'increase' 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-red-100 text-red-700 border border-red-200'
            }`}>
              {changeType === 'increase' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{change}</span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-700 leading-tight">{name}</h3>
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-black text-gray-900">{value}</span>
          </div>
          <p className="text-sm text-gray-500 font-medium">from last period</p>
        </div>

        {/* Decorative bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
      </div>
    </div>
  );
}