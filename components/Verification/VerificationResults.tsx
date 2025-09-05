import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Clock, Shield, Download } from 'lucide-react';
import { VerificationResult } from './VerificationPortal';

interface VerificationResultsProps {
  result: VerificationResult;
}

export default function VerificationResults({ result }: VerificationResultsProps) {
  const statusConfig = {
    verified: {
      icon: CheckCircle,
      color: 'emerald',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-800',
      iconColor: 'text-emerald-600',
      title: 'Certificate Verified',
      description: 'This certificate has been successfully authenticated'
    },
    invalid: {
      icon: XCircle,
      color: 'red',
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      iconColor: 'text-red-600',
      title: 'Invalid Certificate',
      description: 'This certificate could not be authenticated'
    },
    suspicious: {
      icon: AlertTriangle,
      color: 'amber',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-800',
      iconColor: 'text-amber-600',
      title: 'Requires Review',
      description: 'This certificate has been flagged for manual review'
    },
    pending: {
      icon: Clock,
      color: 'blue',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      iconColor: 'text-blue-600',
      title: 'Verification Pending',
      description: 'Waiting for institutional confirmation'
    }
  };

  const config = statusConfig[result.status];
  const StatusIcon = config.icon;

  const downloadReport = () => {
    const reportData = {
      verificationId: result.id,
      status: result.status,
      confidence: result.confidence,
      timestamp: result.timestamp,
      details: result.details,
      flags: result.flags
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `verification-report-${result.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Verification Results</h2>
        <button
          onClick={downloadReport}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span className="text-sm">Download Report</span>
        </button>
      </div>

      {/* Status Header */}
      <div className={`${config.bg} ${config.border} border rounded-lg p-6 mb-6`}>
        <div className="flex items-center space-x-3">
          <StatusIcon className={`w-8 h-8 ${config.iconColor}`} />
          <div>
            <h3 className={`text-lg font-semibold ${config.text}`}>
              {config.title}
            </h3>
            <p className={`text-sm ${config.text} opacity-90`}>
              {config.description}
            </p>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className={`text-sm ${config.text}`}>
            Confidence Score: <span className="font-bold">{result.confidence}%</span>
          </div>
          <div className="text-xs text-gray-500">
            Verified: {result.timestamp.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Certificate Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Student Information</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium">{result.details.studentName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Roll Number:</span>
              <span className="font-medium">{result.details.rollNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Grade:</span>
              <span className="font-medium">{result.details.grade}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Certificate Information</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Institution:</span>
              <span className="font-medium">{result.details.institution}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Course:</span>
              <span className="font-medium">{result.details.course}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Year:</span>
              <span className="font-medium">{result.details.graduationYear}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Certificate #:</span>
              <span className="font-medium">{result.details.certificateNumber}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security Checks */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
          <Shield className="w-5 h-5 text-blue-700" />
          <span>Security Verification</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SecurityCheck
            label="Digital Signature"
            status={result.status === 'verified' ? 'valid' : 'invalid'}
          />
          <SecurityCheck
            label="Institution Registry"
            status={result.status !== 'invalid' ? 'valid' : 'invalid'}
          />
          <SecurityCheck
            label="Document Integrity"
            status={result.status === 'verified' ? 'valid' : result.status === 'suspicious' ? 'warning' : 'invalid'}
          />
        </div>
      </div>

      {/* Flags */}
      {result.flags.length > 0 && (
        <div className="border-t border-gray-200 pt-6 mt-6">
          <h4 className="font-semibold text-gray-900 mb-3">Issues Detected</h4>
          <div className="space-y-2">
            {result.flags.map((flag, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm text-red-800">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span>{flag}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface SecurityCheckProps {
  label: string;
  status: 'valid' | 'invalid' | 'warning';
}

function SecurityCheck({ label, status }: SecurityCheckProps) {
  const config = {
    valid: { icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    invalid: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
    warning: { icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50' }
  };

  const { icon: Icon, color, bg } = config[status];

  return (
    <div className={`${bg} rounded-lg p-3 flex items-center space-x-2`}>
      <Icon className={`w-4 h-4 ${color}`} />
      <div>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className={`text-xs ${color} capitalize`}>{status}</p>
      </div>
    </div>
  );
}