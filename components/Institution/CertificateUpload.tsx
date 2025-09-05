import React, { useState } from 'react';
import { Upload, FileSpreadsheet, Download, CheckCircle, AlertCircle } from 'lucide-react';
import { useNotification } from '../../contexts/NotificationContext';

export default function CertificateUpload() {
  const [uploadMethod, setUploadMethod] = useState<'single' | 'bulk'>('single');
  const [isProcessing, setIsProcessing] = useState(false);
  const { addNotification } = useNotification();

  const handleSingleUpload = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    
    addNotification({
      type: 'success',
      title: 'Certificate Added',
      message: 'Certificate record has been successfully added to the registry'
    });
  };

  const handleBulkUpload = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsProcessing(false);
    
    addNotification({
      type: 'success',
      title: 'Bulk Upload Complete',
      message: '247 certificate records have been successfully uploaded'
    });
  };

  const downloadTemplate = () => {
    // Create and download CSV template
    const template = `Student Name,Roll Number,Course,Graduation Year,Certificate Number,Grade,Date Issued
John Doe,DU/2023/CS/001,Bachelor of Computer Science,2023,DU-CS-2023-001,First Class,2023-06-15
Jane Smith,DU/2023/EE/002,Bachelor of Electrical Engineering,2023,DU-EE-2023-002,Second Class,2023-06-15`;

    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'certificate-upload-template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Upload Method Selection */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Method</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setUploadMethod('single')}
            className={`p-4 border-2 rounded-lg text-left transition-all ${
              uploadMethod === 'single'
                ? 'border-blue-300 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Upload className="w-8 h-8 text-blue-700 mb-2" />
            <h4 className="font-medium text-gray-900">Single Certificate</h4>
            <p className="text-sm text-gray-600">Upload individual certificate details manually</p>
          </button>

          <button
            onClick={() => setUploadMethod('bulk')}
            className={`p-4 border-2 rounded-lg text-left transition-all ${
              uploadMethod === 'bulk'
                ? 'border-blue-300 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <FileSpreadsheet className="w-8 h-8 text-blue-700 mb-2" />
            <h4 className="font-medium text-gray-900">Bulk Upload</h4>
            <p className="text-sm text-gray-600">Upload multiple certificates via CSV file</p>
          </button>
        </div>
      </div>

      {uploadMethod === 'single' ? (
        <SingleCertificateForm onSubmit={handleSingleUpload} isProcessing={isProcessing} />
      ) : (
        <BulkUploadForm onSubmit={handleBulkUpload} isProcessing={isProcessing} onDownloadTemplate={downloadTemplate} />
      )}
    </div>
  );
}

interface FormProps {
  onSubmit: () => void;
  isProcessing: boolean;
}

function SingleCertificateForm({ onSubmit, isProcessing }: FormProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Certificate Details</h3>
      
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter student name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter roll number"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter course name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
          <input
            type="number"
            min="1980"
            max="2030"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter graduation year"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Number</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter certificate number"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select grade</option>
            <option value="First Class with Distinction">First Class with Distinction</option>
            <option value="First Class">First Class</option>
            <option value="Second Class">Second Class</option>
            <option value="Third Class">Third Class</option>
            <option value="Pass">Pass</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-blue-700 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Adding Certificate...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>Add Certificate</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

interface BulkFormProps extends FormProps {
  onDownloadTemplate: () => void;
}

function BulkUploadForm({ onSubmit, isProcessing, onDownloadTemplate }: BulkFormProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Bulk Certificate Upload</h3>
      
      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Before uploading:</p>
              <ul className="space-y-1 text-blue-700">
                <li>• Download and use the CSV template</li>
                <li>• Ensure all required fields are populated</li>
                <li>• Maximum 1000 records per upload</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={onDownloadTemplate}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download Template</span>
          </button>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
          <FileSpreadsheet className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-900 mb-2">Upload CSV File</p>
          <p className="text-gray-600 mb-4">Drag and drop your CSV file here, or click to browse</p>
          <input
            type="file"
            accept=".csv"
            className="hidden"
            id="csv-upload"
          />
          <label
            htmlFor="csv-upload"
            className="bg-blue-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors cursor-pointer inline-block"
          >
            Choose File
          </label>
        </div>

        <button
          onClick={onSubmit}
          disabled={isProcessing}
          className="w-full bg-blue-700 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Processing Upload...</span>
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              <span>Upload Certificates</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}