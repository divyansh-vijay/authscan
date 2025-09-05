import React from 'react';
import { Clock, FileCheck, AlertTriangle, XCircle } from 'lucide-react';
import { VerificationResult } from './VerificationPortal';

interface VerificationHistoryProps {
  history: VerificationResult[];
}

export default function VerificationHistory({ history }: VerificationHistoryProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <FileCheck className="w-4 h-4 text-emerald-600" />;
      case 'suspicious': return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'invalid': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-blue-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-emerald-600';
      case 'suspicious': return 'text-amber-600';
      case 'invalid': return 'text-red-600';
      default: return 'text-blue-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Verifications</h3>
      
      {history.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <FileCheck className="w-8 h-8 mx-auto text-gray-400 mb-2" />
          <p>No verifications yet</p>
          <p className="text-sm">Upload a certificate to get started</p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.slice(0, 10).map((item) => (
            <div
              key={item.id}
              className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(item.status)}
                  <span className={`text-sm font-medium capitalize ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {item.confidence}% confidence
                </span>
              </div>
              
              <p className="text-sm font-medium text-gray-900 truncate">
                {item.details.studentName}
              </p>
              <p className="text-xs text-gray-600">
                {item.details.institution} • {item.details.course}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {item.timestamp.toLocaleDateString()} {item.timestamp.toLocaleTimeString()}
              </p>
              
              {item.flags.length > 0 && (
                <div className="mt-2 text-xs text-amber-600">
                  {item.flags.length} issue{item.flags.length > 1 ? 's' : ''} detected
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}