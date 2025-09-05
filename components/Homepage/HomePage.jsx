'use client'

import React, { useState } from "react"
import {
	ArrowRight,
	ShieldCheck,
	Zap,
	Server,
	Sparkles,
	CheckCircle,
	Users,
	Globe,
	Shield,
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import LoginModal from "@/components/Auth/LoginModal"
import { useRouter } from "next/navigation"

export default function HomePage() {
	const [showLoginModal, setShowLoginModal] = useState(false)
	const [loginRedirectPath, setLoginRedirectPath] = useState("/")
	const { user } = useAuth()
	const router = useRouter()
	const navigate = (path) => {
		router.push(path)
	}

	const handleVerifyClick = () => {
		if (user) {
			navigate("/verify")
		} else {
			setLoginRedirectPath("/verify")
			setShowLoginModal(true)
		}
	}

	const handleInstitutionClick = () => {
		if (user) {
			navigate("/institution")
		} else {
			setLoginRedirectPath("/institution")
			setShowLoginModal(true)
		}
	}

	const handleLoginSuccess = () => {
		setShowLoginModal(false)
		navigate(loginRedirectPath)
	}

	return (
		<>
			<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
				{/* Hero Section */}
				<section className="relative pt-32 pb-20 overflow-hidden">
					{/* Background decorations */}
					<div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
					<div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
					<div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>

					<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20 shadow-lg">
							<Sparkles className="w-5 h-5 text-purple-600" />
							<span className="text-sm font-semibold text-gray-700">
								Trusted by 1000+ Institutions
							</span>
						</div>

						<h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight mb-6">
							Authenticity Made
							<span className="block gradient-text">Simple</span>
						</h1>

						<p className="mt-8 max-w-3xl mx-auto text-xl md:text-2xl text-gray-600 leading-relaxed">
							A secure, unified platform for instant verification
							of academic certificates with AI-powered validation
							and blockchain security.
						</p>

						<div className="mt-12 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
							<button
								onClick={handleVerifyClick}
								className="btn-primary text-lg px-8 py-4 focus-ring group">
								<span className="flex items-center">
									Verify a Certificate
									<ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
								</span>
							</button>

							<button
								onClick={handleInstitutionClick}
								className="btn-primary text-lg px-8 py-4 focus-ring group">
								<span className="flex items-center">
									Institution Login
									<ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
								</span>
							</button>
						</div>

						{/* Stats */}
						<div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
							<div className="text-center">
								<div className="text-4xl font-black gradient-text mb-2">
									99.9%
								</div>
								<div className="text-gray-600 font-medium">
									Accuracy Rate
								</div>
							</div>
							<div className="text-center">
								<div className="text-4xl font-black gradient-text mb-2">
									2.3s
								</div>
								<div className="text-gray-600 font-medium">
									Average Verification Time
								</div>
							</div>
							<div className="text-center">
								<div className="text-4xl font-black gradient-text mb-2">
									50K+
								</div>
								<div className="text-gray-600 font-medium">
									Certificates Verified
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Features Section */}
				<section className="py-24 relative">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-20">
							<h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
								A New Standard in
								<span className="block gradient-text">
									Certificate Verification
								</span>
							</h2>
							<p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
								Fast, reliable, and secure validation for
								employers, institutions, and government agencies
								worldwide.
							</p>
						</div>

						<div className="grid md:grid-cols-3 gap-8">
							<div className="modern-card group hover:scale-105 transition-all duration-500">
								<div className="relative mb-6">
									<div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-xl group-hover:shadow-blue-500/40 transition-all duration-300">
										<ShieldCheck className="h-10 w-10 text-white" />
									</div>
									<div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
										<CheckCircle className="w-4 h-4 text-white" />
									</div>
								</div>
								<h3 className="text-2xl font-bold text-gray-900 mb-4">
									Secure & Trusted
								</h3>
								<p className="text-gray-600 leading-relaxed">
									Leverages cryptographic validation and a
									secure database to prevent fraud and
									tampering with military-grade encryption.
								</p>
							</div>

							<div className="modern-card group hover:scale-105 transition-all duration-500">
								<div className="relative mb-6">
									<div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:shadow-xl group-hover:shadow-purple-500/40 transition-all duration-300">
										<Zap className="h-10 w-10 text-white" />
									</div>
									<div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
										<Sparkles className="w-4 h-4 text-white" />
									</div>
								</div>
								<h3 className="text-2xl font-bold text-gray-900 mb-4">
									AI-Powered Speed
								</h3>
								<p className="text-gray-600 leading-relaxed">
									Advanced OCR technology extracts and
									validates certificate details in seconds,
									not days, with 99.9% accuracy.
								</p>
							</div>

							<div className="modern-card group hover:scale-105 transition-all duration-500">
								<div className="relative mb-6">
									<div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25 group-hover:shadow-xl group-hover:shadow-green-500/40 transition-all duration-300">
										<Server className="h-10 w-10 text-white" />
									</div>
									<div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
										<Globe className="w-4 h-4 text-white" />
									</div>
								</div>
								<h3 className="text-2xl font-bold text-gray-900 mb-4">
									Global & Scalable
								</h3>
								<p className="text-gray-600 leading-relaxed">
									A single source of truth for all academic
									records, designed for worldwide adoption and
									enterprise scalability.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="py-20 relative">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<div className="modern-card bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
							<div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90"></div>
							<div className="relative z-10">
								<h3 className="text-3xl md:text-4xl font-black mb-6">
									Ready to Transform Your Verification
									Process?
								</h3>
								<p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
									Join thousands of institutions already using
									AuthScan for secure, instant certificate
									verification.
								</p>
								<div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
									<button
										onClick={handleVerifyClick}
										className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg">
										Get Started Free
									</button>
									<button
										onClick={handleInstitutionClick}
										className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300">
										Learn More
									</button>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Footer */}
				<footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white relative">
					<div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
					<div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
						<div className="grid md:grid-cols-4 gap-8 mb-12">
							<div>
								<div className="flex items-center space-x-3 mb-6">
									<Shield className="h-8 w-8 text-blue-400" />
									<span className="text-2xl font-black">
										AuthScan
									</span>
								</div>
								<p className="text-gray-400 leading-relaxed">
									The most trusted platform for academic
									certificate verification, ensuring
									authenticity and preventing fraud.
								</p>
							</div>

							<div>
								<h4 className="text-lg font-semibold mb-4">
									Product
								</h4>
								<ul className="space-y-2 text-gray-400">
									<li>
										<a
											href="#"
											className="hover:text-white transition-colors">
											Features
										</a>
									</li>
									<li>
										<a
											href="#"
											className="hover:text-white transition-colors">
											Pricing
										</a>
									</li>
									<li>
										<a
											href="#"
											className="hover:text-white transition-colors">
											API
										</a>
									</li>
									<li>
										<a
											href="#"
											className="hover:text-white transition-colors">
											Documentation
										</a>
									</li>
								</ul>
							</div>

							<div>
								<h4 className="text-lg font-semibold mb-4">
									Company
								</h4>
								<ul className="space-y-2 text-gray-400">
									<li>
										<a
											href="#"
											className="hover:text-white transition-colors">
											About
										</a>
									</li>
									<li>
										<a
											href="#"
											className="hover:text-white transition-colors">
											Blog
										</a>
									</li>
									<li>
										<a
											href="#"
											className="hover:text-white transition-colors">
											Careers
										</a>
									</li>
									<li>
										<a
											href="#"
											className="hover:text-white transition-colors">
											Contact
										</a>
									</li>
								</ul>
							</div>

							<div>
								<h4 className="text-lg font-semibold mb-4">
									Support
								</h4>
								<ul className="space-y-2 text-gray-400">
									<li>
										<a
											href="#"
											className="hover:text-white transition-colors">
											Help Center
										</a>
									</li>
									<li>
										<a
											href="#"
											className="hover:text-white transition-colors">
											Privacy Policy
										</a>
									</li>
									<li>
										<a
											href="#"
											className="hover:text-white transition-colors">
											Terms of Service
										</a>
									</li>
									<li>
										<a
											href="#"
											className="hover:text-white transition-colors">
											Security
										</a>
									</li>
								</ul>
							</div>
						</div>

						<div className="border-t border-gray-700 pt-8">
							<div className="md:flex md:items-center md:justify-between">
								<div className="flex justify-center space-x-6 md:order-2 mb-4 md:mb-0">
									<a
										href="#"
										className="text-gray-400 hover:text-white transition-colors">
										About
									</a>
									<a
										href="#"
										className="text-gray-400 hover:text-white transition-colors">
										Contact
									</a>
									<a
										href="#"
										className="text-gray-400 hover:text-white transition-colors">
										Privacy Policy
									</a>
								</div>
								<div className="text-center md:text-left">
									<p className="text-base text-gray-400">
										&copy; 2025 AuthScan. All rights
										reserved.
									</p>
								</div>
							</div>
						</div>
					</div>
				</footer>
			</div>

			<LoginModal
				isOpen={showLoginModal}
				onClose={() => setShowLoginModal(false)}
				onLoginSuccess={handleLoginSuccess}
			/>
		</>
	)
}
