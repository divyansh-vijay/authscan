import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, FileCheck, Building2, AlertTriangle, TrendingUp, Users, ArrowRight, Sparkles, CheckCircle, Clock, Activity, Zap, Globe } from 'lucide-react';
import StatsCard from '../Shared/StatsCard';
import RecentActivity from '../Shared/RecentActivity';
import WelcomeSection from './WelcomeSection';

export default function MainDashboard() {
  const { user } = useAuth();

  if (!user) {
    return <WelcomeSection />;
  }

  const stats = [
    {
      name: 'Certificates Verified',
      value: '12,847',
      change: '+12%',
      changeType: 'increase' as const,
      icon: FileCheck,
      color: 'blue',
      gradient: 'from-blue-500 to-purple-500'
    },
    {
      name: 'Institutions Connected',
      value: '156',
      change: '+3',
      changeType: 'increase' as const,
      icon: Building2,
      color: 'teal',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      name: 'Fraud Cases Detected',
      value: '23',
      change: '-8%',
      changeType: 'decrease' as const,
      icon: AlertTriangle,
      color: 'amber',
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      name: 'Verification Success Rate',
      value: '98.2%',
      change: '+0.5%',
      changeType: 'increase' as const,
      icon: TrendingUp,
      color: 'emerald',
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Main container with proper padding */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
        {/* Welcome Header with proper spacing */}
        <div className="mb-16">
          <div className="flex items-center space-x-6 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-lg opacity-75"></div>
              <div className="relative w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
                <Users className="w-10 h-10 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-5xl font-black text-gray-900 mb-3">
                Welcome back, <span className="gradient-text">{user.name}</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
                {user.role === 'admin' 
                  ? 'Monitor system activity and manage institutional partnerships'
                  : user.role === 'institution'
                  ? 'Manage your institution\'s certificate records and verification settings'
                  : 'Verify academic certificates and credentials'
                }
              </p>
            </div>
          </div>
          
          {/* Status indicator with better spacing */}
          <div className="inline-flex items-center space-x-4 bg-white/90 backdrop-blur-sm rounded-3xl px-8 py-4 border border-white/30 shadow-lg">
            <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-base font-semibold text-gray-700">System Online</span>
            <Clock className="w-5 h-5 text-gray-500" />
          </div>
        </div>

        {/* Stats Grid with proper spacing and margins */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={stat.name} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <StatsCard {...stat} />
            </div>
          ))}
        </div>

        {/* Main Content Grid with proper spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Recent Activity - Takes 2 columns with proper spacing */}
          <div className="lg:col-span-2">
            <div className="pr-0 lg:pr-5">
              <RecentActivity />
            </div>
          </div>
          
          {/* Quick Actions & System Status - Takes 1 column with proper spacing */}
          <div className="space-y-10">
            {/* Quick Actions with enhanced spacing */}
            <div className="glass-card group p-8 rounded-3xl">
              <div className="flex items-center space-x-4 mb-10">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Quick Actions</h3>
              </div>
              
              <div className="space-y-6">
                {user.role === 'admin' && (
                  <>
                    <QuickActionButton
                      icon={Users}
                      title="Manage Institutions"
                      description="Add or modify institutional partnerships"
                      href="/admin"
                      gradient="from-blue-500 to-cyan-500"
                    />
                    <QuickActionButton
                      icon={Shield}
                      title="Security Overview"
                      description="Review system security and fraud patterns"
                      href="/admin"
                      gradient="from-emerald-500 to-teal-500"
                    />
                  </>
                )}
                {(user.role === 'verifier' || user.role === 'admin') && (
                  <QuickActionButton
                    icon={FileCheck}
                    title="Verify Certificate"
                    description="Upload and verify academic documents"
                    href="/verify"
                    gradient="from-purple-500 to-pink-500"
                  />
                )}
                {(user.role === 'institution' || user.role === 'admin') && (
                  <QuickActionButton
                    icon={Building2}
                    title="Upload Records"
                    description="Bulk upload certificate records"
                    href="/institution"
                    gradient="from-orange-500 to-red-500"
                  />
                )}
              </div>
            </div>

            {/* System Status with enhanced spacing */}
            <div className="glass-card p-8 rounded-3xl">
              <div className="flex items-center space-x-4 mb-10">
                <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center shadow-lg">
                  <Activity className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">System Status</h3>
              </div>
              
              <div className="space-y-5">
                <div className="flex items-center justify-between p-5 bg-green-50 rounded-3xl border border-green-200">
                  <div className="flex items-center space-x-4">
                    <CheckCircle className="w-7 h-7 text-green-600" />
                    <span className="font-semibold text-green-800 text-lg">Database</span>
                  </div>
                  <span className="text-sm text-green-600 font-bold bg-green-100 px-4 py-2 rounded-3xl">Healthy</span>
                </div>
                
                <div className="flex items-center justify-between p-5 bg-blue-50 rounded-3xl border border-blue-200">
                  <div className="flex items-center space-x-4">
                    <CheckCircle className="w-7 h-7 text-blue-600" />
                    <span className="font-semibold text-blue-800 text-lg">API Services</span>
                  </div>
                  <span className="text-sm text-blue-600 font-bold bg-blue-100 px-4 py-2 rounded-3xl">Online</span>
                </div>
                
                <div className="flex items-center justify-between p-5 bg-purple-50 rounded-3xl border border-purple-200">
                  <div className="flex items-center space-x-4">
                    <CheckCircle className="w-7 h-7 text-purple-600" />
                    <span className="font-semibold text-purple-800 text-lg">AI Engine</span>
                  </div>
                  <span className="text-sm text-purple-600 font-bold bg-purple-100 px-4 py-2 rounded-3xl">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface QuickActionButtonProps {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  gradient: string;
}

function QuickActionButton({ icon: Icon, title, description, href, gradient }: QuickActionButtonProps) {
  return (
    <a
      href={href}
      className="group block p-6 rounded-3xl border border-gray-200 hover:border-transparent hover:shadow-xl transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl"
           style={{ background: `linear-gradient(135deg, ${gradient.split(' ').join(' ')})` }}></div>
      
      <div className="relative flex items-start space-x-5">
        <div className={`w-16 h-16 bg-gradient-to-r ${gradient} rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 flex-shrink-0`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-200 mb-3">
            {title}
          </h4>
          <p className="text-base text-gray-600 leading-relaxed">{description}</p>
        </div>
        
        <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
      </div>
    </a>
  );
}