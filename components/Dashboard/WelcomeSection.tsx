import React, { useState } from 'react';
import { Shield, FileCheck, Building2, Lock, Users, CheckCircle, ArrowRight, Sparkles, Zap, Globe } from 'lucide-react';
import LoginModal from '../Auth/LoginModal';

export default function WelcomeSection() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-75 animate-pulse"></div>
                <div className="relative w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
                  <Shield className="h-12 w-12 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
              Academic Certificate
              <span className="block gradient-text">Authenticity Validator</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Secure, reliable, and instant verification of academic credentials to combat 
              fake degrees and maintain educational integrity across institutions worldwide.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
              <button
                onClick={() => setShowLoginModal(true)}
                className="btn-primary text-lg px-8 py-4 focus-ring group"
              >
                <span className="flex items-center">
                  <Lock className="w-5 h-5 mr-3" />
                  Access Platform
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
              
              <button className="btn-secondary text-lg px-8 py-4 focus-ring group">
                <span className="flex items-center">
                  Learn More
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>

            {/* Trust indicators */}
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20 shadow-lg">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-semibold text-gray-700">Trusted by 1000+ Institutions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Comprehensive Certificate
              <span className="block gradient-text">Validation</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Advanced technology stack ensuring 99%+ accuracy in detecting fraudulent academic documents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={FileCheck}
              title="Smart OCR Processing"
              description="Advanced optical character recognition extracts and validates key certificate details including student names, grades, and institutional seals."
              gradient="from-blue-500 to-cyan-500"
            />
            <FeatureCard
              icon={Building2}
              title="Institution Integration"
              description="Direct database connections with universities and colleges across Jharkhand for real-time credential verification."
              gradient="from-emerald-500 to-teal-500"
            />
            <FeatureCard
              icon={Shield}
              title="Blockchain Security"
              description="Cryptographic validation and digital watermarking ensure tamper-proof certificate authenticity."
              gradient="from-purple-500 to-pink-500"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
              Trusted by Institutions
            </h3>
            <p className="text-xl text-gray-300">Real-time statistics from our platform</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="glass-card bg-white/10 text-white border-white/20">
              <div className="text-5xl font-black gradient-text mb-4">98.7%</div>
              <div className="text-gray-300 text-lg font-medium">Detection Accuracy</div>
              <div className="mt-2 text-sm text-gray-400">AI-powered validation</div>
            </div>
            <div className="glass-card bg-white/10 text-white border-white/20">
              <div className="text-5xl font-black gradient-text mb-4">156</div>
              <div className="text-gray-300 text-lg font-medium">Partner Institutions</div>
              <div className="mt-2 text-sm text-gray-400">Universities & Colleges</div>
            </div>
            <div className="glass-card bg-white/10 text-white border-white/20">
              <div className="text-5xl font-black gradient-text mb-4">12,847</div>
              <div className="text-gray-300 text-lg font-medium">Certificates Verified</div>
              <div className="mt-2 text-sm text-gray-400">And counting...</div>
            </div>
          </div>
        </div>
      </div>

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </>
  );
}

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
}

function FeatureCard({ icon: Icon, title, description, gradient }: FeatureCardProps) {
  return (
    <div className="modern-card group hover:scale-105 transition-all duration-500 relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
      
      <div className="relative z-10">
        <div className="relative mb-6">
          <div className={`w-20 h-20 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
            <Icon className="w-10 h-10 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-white" />
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
      
      {/* Decorative corner element */}
      <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${gradient} opacity-10 rounded-bl-full`}></div>
    </div>
  );
}