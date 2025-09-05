import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import CertificateUpload from './CertificateUpload';
import InstitutionStats from './InstitutionStats';
import CertificateRegistry from './CertificateRegistry';

export default function InstitutionPortal() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'upload' | 'registry' | 'stats'>('upload');

  if (!user || (user.role !== 'institution' && user.role !== 'admin')) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center bg-white rounded-lg shadow-sm border border-gray-200 p-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Restricted</h2>
          <p className="text-gray-600">
            You need institution or admin privileges to access this portal.
          </p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'upload', label: 'Upload Records', icon: 'upload' },
    { id: 'registry', label: 'Certificate Registry', icon: 'registry' },
    { id: 'stats', label: 'Statistics', icon: 'stats' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Institution Portal</h1>
        <p className="text-gray-600 mt-1">
          Manage your institution's certificate records and verification settings
        </p>
        {user.institution && (
          <p className="text-sm text-blue-700 mt-2 font-medium">{user.institution}</p>
        )}
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
        {activeTab === 'upload' && <CertificateUpload />}
        {activeTab === 'registry' && <CertificateRegistry />}
        {activeTab === 'stats' && <InstitutionStats />}
      </div>
    </div>
  );
}