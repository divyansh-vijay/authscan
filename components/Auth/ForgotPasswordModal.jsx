import React, { useState } from 'react';
import { X, Mail, ArrowLeft, CheckCircle, Sparkles } from 'lucide-react';
import { useNotification } from '../../contexts/NotificationContext';

export default function ForgotPasswordModal({ isOpen, onClose, onBackToLogin }) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { addNotification } = useNotification();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock success - in real app, this would send reset email
      setIsEmailSent(true);
      addNotification({
        type: 'success',
        title: 'Reset Email Sent',
        message: 'Please check your email for password reset instructions'
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to send reset email. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setEmail('');
    setIsEmailSent(false);
    onClose();
    if (onBackToLogin) onBackToLogin();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md" onClick={onClose}></div>
        
        {/* Modal */}
        <div className="relative w-full max-w-lg transform transition-all duration-300">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-600 to-red-600 px-8 py-6 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {isEmailSent ? 'Check Your Email' : 'Reset Password'}
                    </h2>
                    <p className="text-orange-100 text-sm">
                      {isEmailSent ? 'We sent you a reset link' : 'Enter your email address'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white hover:text-orange-100 transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-8 py-8">
              {!isEmailSent ? (
                <>
                  <div className="text-center mb-6">
                    <p className="text-gray-600">
                      Enter your email address and we'll send you a link to reset your password.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gray-50 focus:bg-white transition-all duration-200 text-gray-900 placeholder-gray-400"
                          placeholder="Enter your email address"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-semibold text-lg focus:ring-4 focus:ring-orange-500/20 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center space-x-3">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Sending Reset Link...</span>
                        </div>
                      ) : (
                        <span>Send Reset Link</span>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Email Sent!</h3>
                    <p className="text-gray-600 mb-4">
                      We've sent a password reset link to <strong>{email}</strong>
                    </p>
                    <p className="text-sm text-gray-500">
                      Please check your email and click the link to reset your password. 
                      The link will expire in 1 hour.
                    </p>
                  </div>

                  <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Sparkles className="w-4 h-4 text-orange-600" />
                      <p className="text-sm font-semibold text-orange-800">Didn't receive the email?</p>
                    </div>
                    <ul className="text-xs text-orange-700 space-y-1">
                      <li>• Check your spam/junk folder</li>
                      <li>• Make sure you entered the correct email address</li>
                      <li>• Wait a few minutes and try again</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <button
                  onClick={handleBackToLogin}
                  className="flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors mx-auto"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Login</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
