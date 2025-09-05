import React from 'react';
import { ArrowRight, Activity, CheckCircle, AlertTriangle, FileText, Clock, Shield, Upload } from 'lucide-react';

export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'success',
      title: 'Certificate verified for Raj Kumar Singh (DU/2023/CS/001)',
      source: 'HR Manager',
      time: '15m ago',
      icon: CheckCircle,
      color: 'green',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Suspicious document flagged - forged signature detected',
      source: 'System',
      time: '45m ago',
      icon: AlertTriangle,
      color: 'amber',
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      id: 3,
      type: 'info',
      title: 'New institution "St. Xavier\'s College" requested access',
      source: 'Prof. Sarah Wilson',
      time: '2h ago',
      icon: FileText,
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 4,
      type: 'success',
      title: 'Bulk upload completed - 247 certificates processed',
      source: 'Dr. Rajesh Kumar',
      time: '4h ago',
      icon: Upload,
      color: 'emerald',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      id: 5,
      type: 'info',
      title: 'Security patch applied - OCR accuracy improved',
      source: 'System Admin',
      time: '6h ago',
      icon: Shield,
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  const getActivityIcon = (activity: typeof activities[0]) => {
    const Icon = activity.icon;
    return (
      <div className={`w-12 h-12 bg-gradient-to-r ${activity.gradient} rounded-3xl flex items-center justify-center shadow-lg`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    );
  };

  return (
    <div className="glass-card p-8 rounded-3xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-lg">
            <Activity className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Recent Activity</h3>
            <p className="text-lg text-gray-600">Live updates from your system</p>
          </div>
        </div>
        
        {/* Live indicator */}
        <div className="flex items-center space-x-3 bg-blue-50 border border-blue-200 rounded-3xl px-5 py-3">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-bold text-blue-700">Live</span>
        </div>
      </div>

      {/* Activity list */}
      <div className="space-y-6 mb-10">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="group flex items-start space-x-4 p-5 rounded-3xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-all duration-300 hover:shadow-md"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Activity icon */}
            <div className="flex-shrink-0">
              {getActivityIcon(activity)}
            </div>

            {/* Activity content */}
            <div className="flex-1 min-w-0">
              <h4 className="text-base font-semibold text-gray-900 mb-2 leading-relaxed group-hover:text-gray-800 transition-colors duration-200">
                {activity.title}
              </h4>
              <div className="flex items-center space-x-3 text-sm text-gray-500">
                <span className="font-medium">{activity.source}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{activity.time}</span>
                </span>
              </div>
            </div>

            {/* Action indicator */}
            <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </div>
        ))}
      </div>

      {/* Footer button */}
      <div className="text-center">
        <button className="btn-primary text-lg px-8 py-4 focus-ring group hover:scale-105 transition-all duration-300 rounded-3xl">
          <span className="flex items-center justify-center space-x-3">
            <span>View All Activity</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </button>
      </div>
    </div>
  );
}