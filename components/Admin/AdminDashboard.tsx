import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import SystemOverview from './SystemOverview';
import InstitutionManagement from './InstitutionManagement';
import FraudAnalytics from './FraudAnalytics';
import UserManagement from './UserManagement';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'institutions' | 'fraud' | 'users'>('overview');

  if (!user || user.role !== 'admin') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center bg-white rounded-lg shadow-sm border border-gray-200 p-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Admin Access Required</h2>
          <p className="text-gray-600">
            You need administrator privileges to access this dashboard.
          </p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'System Overview' },
    { id: 'institutions', label: 'Institutions' },
    { id: 'fraud', label: 'Fraud Analytics' },
    { id: 'users', label: 'User Management' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">System Administration</h1>
        <p className="text-gray-600 mt-1">
          Monitor platform activity, manage institutions, and oversee security operations
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-700 text-blue-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="animate-in fade-in duration-200">
        {activeTab === 'overview' && <SystemOverview />}
        {activeTab === 'institutions' && <InstitutionManagement />}
        {activeTab === 'fraud' && <FraudAnalytics />}
        {activeTab === 'users' && <UserManagement />}
      </div>
    </div>
  );
}