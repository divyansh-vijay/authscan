import React, { useState } from 'react';
import { Building2, Plus, Edit, Trash2, Shield, Users, CheckCircle, XCircle } from 'lucide-react';
import { useNotification } from '../../contexts/NotificationContext';

interface Institution {
  id: string;
  name: string;
  code: string;
  type: 'university' | 'college' | 'institute';
  location: string;
  status: 'active' | 'inactive' | 'pending';
  certificateCount: number;
  verificationCount: number;
  joinDate: string;
  lastSync: string;
}

export default function InstitutionManagement() {
  const [showAddModal, setShowAddModal] = useState(false);
  const { addNotification } = useNotification();

  const mockInstitutions: Institution[] = [
    {
      id: '1',
      name: 'Delhi University',
      code: 'DU',
      type: 'university',
      location: 'Delhi',
      status: 'active',
      certificateCount: 8942,
      verificationCount: 12847,
      joinDate: '2023-01-15',
      lastSync: '2024-01-20 14:30'
    },
    {
      id: '2',
      name: 'Indian Institute of Technology, Ranchi',
      code: 'IITR',
      type: 'institute',
      location: 'Ranchi, Jharkhand',
      status: 'active',
      certificateCount: 2456,
      verificationCount: 3892,
      joinDate: '2023-03-20',
      lastSync: '2024-01-20 09:15'
    },
    {
      id: '3',
      name: 'St. Xavier\'s College',
      code: 'SXC',
      type: 'college',
      location: 'Ranchi, Jharkhand',
      status: 'pending',
      certificateCount: 0,
      verificationCount: 0,
      joinDate: '2024-01-18',
      lastSync: 'Never'
    }
  ];

  const handleApprove = (institutionId: string) => {
    addNotification({
      type: 'success',
      title: 'Institution Approved',
      message: 'Institution has been approved and activated'
    });
  };

  const handleReject = (institutionId: string) => {
    addNotification({
      type: 'info',
      title: 'Institution Rejected',
      message: 'Institution application has been rejected'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Institution Management</h3>
          <p className="text-gray-600 text-sm">Manage partner institutions and their access permissions</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Institution</span>
        </button>
      </div>

      {/* Institutions List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Institution
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Certificates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Verifications
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockInstitutions.map((institution) => (
                <tr key={institution.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <Building2 className="w-8 h-8 text-blue-700" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{institution.name}</div>
                        <div className="text-sm text-gray-500">{institution.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900 capitalize">{institution.type}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{institution.certificateCount.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{institution.verificationCount.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      institution.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                      institution.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {institution.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {institution.status === 'pending' ? (
                        <>
                          <button
                            onClick={() => handleApprove(institution.id)}
                            className="text-emerald-600 hover:text-emerald-900"
                            title="Approve"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleReject(institution.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Reject"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="text-blue-600 hover:text-blue-900" title="Edit">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-8 h-8 text-blue-700" />
            <div>
              <h4 className="font-semibold text-gray-900">Security Status</h4>
              <p className="text-sm text-gray-600">All systems operational</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Encryption:</span>
              <span className="text-emerald-600 font-medium">Active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Firewall:</span>
              <span className="text-emerald-600 font-medium">Protected</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Backup:</span>
              <span className="text-emerald-600 font-medium">Current</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="w-8 h-8 text-teal-600" />
            <div>
              <h4 className="font-semibold text-gray-900">Performance</h4>
              <p className="text-sm text-gray-600">System metrics</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">CPU Usage:</span>
              <span className="text-blue-600 font-medium">23%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Memory:</span>
              <span className="text-blue-600 font-medium">67%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Storage:</span>
              <span className="text-blue-600 font-medium">45%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="w-8 h-8 text-purple-600" />
            <div>
              <h4 className="font-semibold text-gray-900">User Activity</h4>
              <p className="text-sm text-gray-600">Current session stats</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Active Users:</span>
              <span className="text-blue-600 font-medium">1,247</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Peak Today:</span>
              <span className="text-blue-600 font-medium">2,891</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sessions:</span>
              <span className="text-blue-600 font-medium">3,456</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}