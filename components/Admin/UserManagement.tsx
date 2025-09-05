import React, { useState } from 'react';
import { Users, UserPlus, Edit, Trash2, Shield, Building2, FileCheck } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'institution' | 'verifier';
  institution?: string;
  lastLogin: string;
  status: 'active' | 'inactive';
  verificationsPerformed: number;
}

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');

  const mockUsers: User[] = [
    {
      id: '1',
      name: 'System Admin',
      email: 'admin@academicauth.gov.in',
      role: 'admin',
      lastLogin: '2024-01-20 14:30',
      status: 'active',
      verificationsPerformed: 0
    },
    {
      id: '2',
      name: 'Dr. Rajesh Kumar',
      email: 'registrar@du.ac.in',
      role: 'institution',
      institution: 'Delhi University',
      lastLogin: '2024-01-20 10:15',
      status: 'active',
      verificationsPerformed: 0
    },
    {
      id: '3',
      name: 'HR Manager',
      email: 'hr@techcorp.com',
      role: 'verifier',
      lastLogin: '2024-01-19 16:45',
      status: 'active',
      verificationsPerformed: 47
    },
    {
      id: '4',
      name: 'Prof. Sarah Wilson',
      email: 'admin@iitr.ac.in',
      role: 'institution',
      institution: 'IIT Ranchi',
      lastLogin: '2024-01-18 09:30',
      status: 'inactive',
      verificationsPerformed: 0
    }
  ];

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.institution && user.institution.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="w-4 h-4 text-purple-600" />;
      case 'institution': return <Building2 className="w-4 h-4 text-blue-600" />;
      case 'verifier': return <FileCheck className="w-4 h-4 text-teal-600" />;
      default: return <Users className="w-4 h-4 text-gray-600" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'institution': return 'bg-blue-100 text-blue-800';
      case 'verifier': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
          <p className="text-gray-600 text-sm">Manage user accounts and access permissions</p>
        </div>
        <button className="bg-blue-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors flex items-center space-x-2">
          <UserPlus className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search users by name, email, or institution..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Institution
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
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
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getRoleIcon(user.role)}
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {user.institution || '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {user.role === 'verifier' ? `${user.verificationsPerformed} verifications` : 'N/A'}
                    </div>
                    <div className="text-sm text-gray-500">Last: {user.lastLogin}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.status === 'active'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Distribution */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">User Role Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-900">3</div>
            <div className="text-sm text-purple-700">Administrators</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Building2 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-900">28</div>
            <div className="text-sm text-blue-700">Institution Officers</div>
          </div>
          <div className="text-center p-4 bg-teal-50 rounded-lg">
            <FileCheck className="w-8 h-8 text-teal-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-teal-900">147</div>
            <div className="text-sm text-teal-700">Verifiers</div>
          </div>
        </div>
      </div>
    </div>
  );
}