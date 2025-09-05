'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-red-50 to-pink-100">
      <div className="max-w-lg mx-auto text-center p-8">
        <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
          <AlertTriangle className="w-12 h-12 text-white" />
        </div>
        
        <h1 className="text-4xl font-black text-gray-900 mb-4">403</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Forbidden</h2>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          You don't have the necessary permissions to access this resource. 
          Please contact your administrator if you believe this is an error.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => router.push('/')}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>Go to Dashboard</span>
          </button>
          
          <button
            onClick={() => router.back()}
            className="w-full border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </button>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Need help?</strong> Contact support if you believe you should have access to this page.
          </p>
        </div>
      </div>
    </div>
  );
}
