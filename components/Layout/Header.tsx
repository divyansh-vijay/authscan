import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import LoginModal from '../Auth/LoginModal';
import RegisterModal from '../Auth/RegisterModal';
import ForgotPasswordModal from '../Auth/ForgotPasswordModal';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/', roles: ['admin', 'verifier', 'institution'] },
    { name: 'Verify Certificate', href: '/verify', roles: ['admin', 'verifier'] },
    { name: 'Institution Portal', href: '/institution', roles: ['admin', 'institution'] },
    { name: 'Admin Dashboard', href: '/admin', roles: ['admin'] }
  ];

  const filteredNavigation = user 
    ? navigation.filter(item => item.roles.includes(user.role))
    : [];

  return (
    <>
      <header className="glass-card fixed w-full top-0 z-40 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Shield className="relative h-10 w-10 text-white" />
                </div>
                <span className="text-2xl font-black gradient-text">AuthScan</span>
              </Link>
            </div>

            {user && (
              <nav className="hidden md:flex space-x-2">
                {filteredNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 relative overflow-hidden group ${
                      pathname === item.href
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                        : 'text-gray-700 hover:text-blue-700 hover:bg-white/80'
                    }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {pathname === item.href && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
                    )}
                  </Link>
                ))}
              </nav>
            )}

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="hidden sm:flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold text-gray-800">{user.name}</span>
                      <span className="text-gray-500 ml-2 capitalize">({user.role})</span>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 shadow-lg shadow-red-500/25"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:block">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="btn-primary focus-ring"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setShowRegisterModal(true)}
                    className="border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 focus:ring-4 focus:ring-blue-500/20 focus:ring-offset-2"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {user && (
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-3 rounded-xl text-gray-700 hover:bg-white/80 transition-all duration-300 border border-white/20"
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {user && isMobileMenuOpen && (
          <div className="md:hidden glass-card border-t border-white/20">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {filteredNavigation.map((item) => (
                                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 ${
                      pathname === item.href
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'text-gray-700 hover:text-blue-700 hover:bg-white/80'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onShowRegister={() => setShowRegisterModal(true)}
        onShowForgotPassword={() => setShowForgotPasswordModal(true)}
      />
      
      <RegisterModal 
        isOpen={showRegisterModal} 
        onClose={() => setShowRegisterModal(false)}
        onRegisterSuccess={() => setShowRegisterModal(false)}
      />

      <ForgotPasswordModal 
        isOpen={showForgotPasswordModal} 
        onClose={() => setShowForgotPasswordModal(false)}
        onBackToLogin={() => setShowLoginModal(true)}
      />
    </>
  );
}