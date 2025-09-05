'use client'

import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Shield, AlertTriangle, Loader2 } from 'lucide-react';

export default function ProtectedRoute({ 
  children, 
  allowedRoles = [], 
  redirectTo = '/',
  fallback = null 
}) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(redirectTo);
        return;
      }

      if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
        router.push('/unauthorized');
        return;
      }
    }
  }, [isAuthenticated, user, allowedRoles, redirectTo, router, isLoading]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Authenticating...</h3>
          <p className="text-gray-600">Please wait while we verify your credentials</p>
        </div>
      </div>
    );
  }

  // Show unauthorized access
  if (isAuthenticated && allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-red-50 to-pink-100">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <AlertTriangle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            You don't have permission to access this page. This area is restricted to{' '}
            <span className="font-semibold text-red-600">
              {allowedRoles.join(', ')}
            </span> users only.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => router.push('/')}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => router.back()}
              className="w-full border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-6">
            Please sign in to access this page. You need to be logged in to continue.
          </p>
          <button
            onClick={() => router.push('/')}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  // Render children if all checks pass
  return children || fallback;
}

// Higher-order component for easier usage
export function withAuth(WrappedComponent, options = {}) {
  return function AuthenticatedComponent(props) {
    return (
      <ProtectedRoute {...options}>
        <WrappedComponent {...props} />
      </ProtectedRoute>
    );
  };
}

// Role-specific HOCs
export const withAdminAuth = (WrappedComponent) => 
  withAuth(WrappedComponent, { allowedRoles: ['admin'] });

export const withInstitutionAuth = (WrappedComponent) => 
  withAuth(WrappedComponent, { allowedRoles: ['admin', 'institution'] });

export const withVerifierAuth = (WrappedComponent) => 
  withAuth(WrappedComponent, { allowedRoles: ['admin', 'verifier'] });

export const withAnyAuth = (WrappedComponent) => 
  withAuth(WrappedComponent, { allowedRoles: ['admin', 'institution', 'verifier'] });
