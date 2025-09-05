import React, { useState, useRef } from 'react';
import { Upload, File, X, Loader } from 'lucide-react';
import { useNotification } from '../../contexts/NotificationContext';
import { VerificationResult } from './VerificationPortal';

interface DocumentUploadProps {
  onVerificationComplete: (result: VerificationResult) => void;
}

export default function DocumentUpload({ onVerificationComplete }: DocumentUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addNotification } = useNotification();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileSelection = (file: File) => {
    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      addNotification({
        type: 'error',
        title: 'Invalid File Type',
        message: 'Please upload a PDF or image file (JPG, PNG)'
      });
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      addNotification({
        type: 'error',
        title: 'File Too Large',
        message: 'Please upload a file smaller than 10MB'
      });
      return;
    }

    setUploadedFile(file);
    addNotification({
      type: 'info',
      title: 'File Uploaded',
      message: `${file.name} is ready for verification`
    });
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const processDocument = async () => {
    if (!uploadedFile) return;

    setIsProcessing(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock verification result
    const mockResult: VerificationResult = {
      id: Math.random().toString(36).substr(2, 9),
      status: Math.random() > 0.7 ? 'verified' : Math.random() > 0.5 ? 'suspicious' : 'invalid',
      confidence: Math.floor(Math.random() * 30) + 70, // 70-100%
      details: {
        studentName: 'Raj Kumar Singh',
        rollNumber: 'DU/2021/CS/1234',
        institution: 'Delhi University',
        course: 'Bachelor of Computer Science',
        graduationYear: '2024',
        certificateNumber: 'DU-CS-2024-1234',
        grade: 'First Class with Distinction'
      },
      flags: [],
      timestamp: new Date(),
      filename: uploadedFile.name
    };

    // Add flags based on status
    if (mockResult.status === 'suspicious') {
      mockResult.flags = ['Signature verification failed', 'Certificate number format inconsistent'];
    } else if (mockResult.status === 'invalid') {
      mockResult.flags = ['Institution not found in registry', 'Invalid graduation year'];
    }

    setIsProcessing(false);
    onVerificationComplete(mockResult);
    
    addNotification({
      type: mockResult.status === 'verified' ? 'success' : 
            mockResult.status === 'suspicious' ? 'warning' : 'error',
      title: 'Verification Complete',
      message: `Certificate ${mockResult.status === 'verified' ? 'authenticated successfully' : 
                mockResult.status === 'suspicious' ? 'flagged for review' : 'detected as invalid'}`
    });
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Upload Certificate for Verification</h2>
      
      {!uploadedFile ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className={`mx-auto h-12 w-12 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
          <p className="mt-4 text-lg font-medium text-gray-900">
            {isDragging ? 'Drop your certificate here' : 'Upload Certificate'}
          </p>
          <p className="mt-2 text-gray-600">
            Drag and drop your file here, or{' '}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-blue-700 hover:text-blue-800 font-medium"
            >
              browse files
            </button>
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Supports PDF, JPG, PNG files up to 10MB
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileInputChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <File className="w-8 h-8 text-blue-700" />
              <div>
                <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                <p className="text-sm text-gray-600">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="text-gray-400 hover:text-red-500 transition-colors"
              disabled={isProcessing}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={processDocument}
            disabled={isProcessing}
            className="w-full bg-blue-700 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
          >
            {isProcessing ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Processing Certificate...</span>
              </>
            ) : (
              <span>Verify Certificate</span>
            )}
          </button>

          {isProcessing && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Processing Steps:</h4>
              <ul className="space-y-1 text-sm text-blue-800">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>OCR text extraction</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Institutional database lookup</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Cryptographic validation</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}