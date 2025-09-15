"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	Shield,
	Zap,
	CheckCircle,
	Users,
	Building2,
	GraduationCap,
	Lock,
	Menu,
	X,
	Star,
	ArrowRight,
	Upload,
	Search,
	FileCheck,
	Cpu,
	Play,
	Pause,
	RotateCcw,
	Activity,
	Loader2,
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [currentStep, setCurrentStep] = useState(0)
	const [isPlaying, setIsPlaying] = useState(true)
	const [progress, setProgress] = useState(0)
	const [hoveredStep, setHoveredStep] = useState<number | null>(null)
	const [simulatedData, setSimulatedData] = useState({
		uploadProgress: 0,
		hashGenerated: false,
		blockchainSearching: false,
		aiAnalyzing: false,
		resultReady: false,
		verificationScore: 0,
	})

	// Enhanced workflow steps with more detailed data
	const workflowSteps = [
		{
			icon: Upload,
			title: "Upload Certificate",
			description: "User uploads certificate for verification",
			details: "PDF processed, metadata extracted, hash generated",
			duration: 2000,
			color: "blue",
		},
		{
			icon: Search,
			title: "Blockchain Check",
			description: "System searches blockchain for certificate hash",
			details: "Querying distributed ledger across 15,000+ nodes",
			duration: 1500,
			color: "purple",
		},
		{
			icon: Cpu,
			title: "AI Analysis",
			description: "If not found, AI analyzes document authenticity",
			details: "Deep learning model analyzes 247 authenticity markers",
			duration: 2500,
			color: "green",
		},
		{
			icon: FileCheck,
			title: "Instant Result",
			description: "Verification result delivered in seconds",
			details: "Comprehensive report with confidence score generated",
			duration: 1000,
			color: "emerald",
		},
	]

	useEffect(() => {
		if (!isPlaying) return

		const interval = setInterval(() => {
			setCurrentStep((prev) => {
				const nextStep = (prev + 1) % workflowSteps.length

				// Reset simulation data when starting over
				if (nextStep === 0) {
					setSimulatedData({
						uploadProgress: 0,
						hashGenerated: false,
						blockchainSearching: false,
						aiAnalyzing: false,
						resultReady: false,
						verificationScore: 0,
					})
				}

				return nextStep
			})
			setProgress(0)
		}, 4000)

		return () => clearInterval(interval)
	}, [isPlaying, workflowSteps.length])

	useEffect(() => {
		if (!isPlaying) return

		const progressInterval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) return 100
				return prev + 2.5
			})
		}, 100)

		return () => clearInterval(progressInterval)
	}, [currentStep, isPlaying])

	useEffect(() => {
		const timeout = setTimeout(() => {
			switch (currentStep) {
				case 0: // Upload
					setSimulatedData((prev) => ({
						...prev,
						uploadProgress: Math.min(progress, 100),
						hashGenerated: progress > 80,
						blockchainSearching: false,
						aiAnalyzing: false,
						resultReady: false,
						verificationScore: 0,
					}))
					break
				case 1: // Blockchain
					setSimulatedData((prev) => ({
						...prev,
						uploadProgress: 100,
						hashGenerated: true,
						blockchainSearching: progress > 10,
						aiAnalyzing: false,
						resultReady: false,
						verificationScore: 0,
					}))
					break
				case 2: // AI Analysis
					setSimulatedData((prev) => ({
						...prev,
						uploadProgress: 100,
						hashGenerated: true,
						blockchainSearching: false,
						aiAnalyzing: progress > 5,
						resultReady: false,
						verificationScore:
							progress > 30
								? Math.floor(85 + progress * 0.15)
								: 0,
					}))
					break
				case 3: // Result
					setSimulatedData((prev) => ({
						...prev,
						uploadProgress: 100,
						hashGenerated: true,
						blockchainSearching: false,
						aiAnalyzing: false,
						resultReady: progress > 20,
						verificationScore: 97,
					}))
					break
			}
		}, 100)

		return () => clearTimeout(timeout)
	}, [currentStep, progress])

	const handleStepClick = (index: number) => {
		setCurrentStep(index)
		setProgress(0)
		setIsPlaying(false)
	}

	const togglePlayback = () => {
		setIsPlaying(!isPlaying)
	}

	const resetAnimation = () => {
		setCurrentStep(0)
		setProgress(0)
		setSimulatedData({
			uploadProgress: 0,
			hashGenerated: false,
			blockchainSearching: false,
			aiAnalyzing: false,
			resultReady: false,
			verificationScore: 0,
		})
	}

	return (
		<div className="min-h-screen bg-slate-50 text-slate-900">
			{/* Navigation */}
			<nav className="relative z-50 px-6 py-4 bg-white shadow-sm">
				<div className="max-w-7xl mx-auto flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<div className="p-2 bg-slate-900 rounded-lg">
							<Shield className="h-6 w-6 text-white" />
						</div>
						<span className="text-2xl font-bold text-slate-900">
							AuthScan
						</span>
					</div>

					{/* Desktop Menu */}
					<div className="hidden md:flex items-center space-x-8">
						<a
							href="#features"
							className="text-slate-600 hover:text-slate-900 transition-colors">
							Features
						</a>
						<a
							href="#how-it-works"
							className="text-slate-600 hover:text-slate-900 transition-colors">
							How It Works
						</a>
						<a
							href="#pricing"
							className="text-slate-600 hover:text-slate-900 transition-colors">
							Pricing
						</a>
						<a
							href="#contact"
							className="text-slate-600 hover:text-slate-900 transition-colors">
							Contact
						</a>
						<Link href="/login">
							<button className="bg-slate-900 cursor-pointer hover:bg-slate-800 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200">
								Get Started
							</button>
						</Link>
					</div>

					{/* Mobile Menu Button */}
					<button
						className="md:hidden p-2"
						onClick={() => setIsMenuOpen(!isMenuOpen)}>
						{isMenuOpen ? (
							<X className="h-6 w-6" />
						) : (
							<Menu className="h-6 w-6" />
						)}
					</button>
				</div>

				{/* Mobile Menu */}
				{isMenuOpen && (
					<div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-200 px-6 py-4 shadow-lg">
						<div className="flex flex-col space-y-4">
							<a
								href="#features"
								className="text-slate-600 hover:text-slate-900 transition-colors">
								Features
							</a>
							<a
								href="#how-it-works"
								className="text-slate-600 hover:text-slate-900 transition-colors">
								How It Works
							</a>
							<a
								href="#pricing"
								className="text-slate-600 hover:text-slate-900 transition-colors">
								Pricing
							</a>
							<a
								href="#contact"
								className="text-slate-600 hover:text-slate-900 transition-colors">
								Contact
							</a>
							<button className="bg-slate-900 text-white px-6 py-2 rounded-lg font-semibold text-left">
								Get Started
							</button>
						</div>
					</div>
				)}
			</nav>

			{/* Hero Section */}
			<section className="px-6 py-20 lg:py-32 bg-gradient-to-br from-slate-50 to-slate-100">
				<div className="max-w-7xl mx-auto text-center">
					<div className="inline-flex items-center px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full mb-8">
						<Zap className="h-4 w-4 text-emerald-600 mr-2" />
						<span className="text-emerald-700 text-sm font-medium">
							Eliminate Certificate Fraud in Seconds
						</span>
					</div>

					<h1 className="text-4xl lg:text-7xl font-bold mb-6 leading-tight text-slate-900">
						The Future of
						<span className="text-blue-600"> Certificate </span>
						Verification
					</h1>

					<p className="text-xl lg:text-2xl text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed">
						AuthScan combines unbreakable blockchain technology with
						advanced AI to create the world's first truly secure
						certificate verification platform. Verify any credential
						instantly with 100% confidence.
					</p>

					<div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
						<button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center">
							Start Verifying Now
							<ArrowRight className="ml-2 h-5 w-5" />
						</button>
						<button className="border border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200">
							Watch Demo
						</button>
					</div>

					{/* Trust Indicators */}
					<div className="flex flex-wrap justify-center items-center gap-8 text-slate-500">
						<div className="flex items-center space-x-2">
							<Star className="h-5 w-5 text-amber-500" />
							<span className="text-sm">
								Trusted by 500+ institutions
							</span>
						</div>
						<div className="flex items-center space-x-2">
							<Shield className="h-5 w-5 text-emerald-500" />
							<span className="text-sm">
								99.9% fraud detection rate
							</span>
						</div>
						<div className="flex items-center space-x-2">
							<Zap className="h-5 w-5 text-blue-500" />
							<span className="text-sm">
								Instant verification
							</span>
						</div>
					</div>
				</div>
			</section>

			<section className="px-6 py-20 bg-white">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-3xl lg:text-5xl font-bold mb-6 text-slate-900">
							Interactive Verification Demo
						</h2>
						<p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
							Watch our verification process in action with
							real-time data simulation
						</p>

						<div className="flex justify-center items-center gap-3 mb-12">
							<button
								onClick={togglePlayback}
								className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl font-medium">
								{isPlaying ? (
									<Pause className="h-5 w-5" />
								) : (
									<Play className="h-5 w-5" />
								)}
								{isPlaying ? "Pause Demo" : "Play Demo"}
							</button>
							<button
								onClick={resetAnimation}
								className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all duration-200 font-medium border border-slate-200">
								<RotateCcw className="h-5 w-5" />
								Reset
							</button>
						</div>
					</div>

					<div className="relative">
						<div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
							{workflowSteps.map((step, index) => {
								const Icon = step.icon
								const isActive = currentStep === index
								const isCompleted = currentStep > index
								const isHovered = hoveredStep === index

								return (
									<div key={index} className="relative">
										<div
											className={`
                      p-6 rounded-3xl border-2 transition-all duration-500 text-center cursor-pointer relative overflow-hidden
                      ${
							isActive
								? "border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-xl scale-105 transform"
								: isCompleted
								? "border-emerald-500 bg-gradient-to-br from-emerald-50 to-emerald-100 shadow-lg"
								: "border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg hover:scale-102 transform"
						}
                    `}
											onClick={() =>
												handleStepClick(index)
											}
											onMouseEnter={() =>
												setHoveredStep(index)
											}
											onMouseLeave={() =>
												setHoveredStep(null)
											}>
											{isActive && (
												<div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent" />
											)}

											<div className="relative z-10">
												<div
													className={`
                          w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-500 relative
                          ${
								isActive
									? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg"
									: isCompleted
									? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg"
									: "bg-gradient-to-br from-slate-100 to-slate-200 text-slate-500"
							}
                        `}>
													{isActive && (
														<>
															<div className="absolute inset-0 rounded-2xl bg-blue-400/20 animate-pulse" />
															<div className="absolute inset-0 rounded-2xl border-2 border-blue-300/50 animate-ping" />
															<div className="absolute inset-0 rounded-2xl shadow-lg shadow-blue-500/25" />
														</>
													)}
													<Icon className="h-10 w-10 relative z-10" />
												</div>

												<h3 className="text-xl font-bold mb-3 text-slate-900">
													{step.title}
												</h3>
												<p className="text-sm text-slate-600 mb-3 leading-relaxed">
													{step.description}
												</p>

												{(isHovered || isActive) && (
													<div className="mt-4 p-3 bg-white/50 rounded-xl border border-white/20">
														<p className="text-xs text-slate-500 italic leading-relaxed">
															{step.details}
														</p>
													</div>
												)}

												{isActive && (
													<div className="mt-6">
														<div className="w-full bg-white/50 rounded-full h-3 shadow-inner">
															<div
																className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300 shadow-sm relative overflow-hidden"
																style={{
																	width: `${progress}%`,
																}}>
																<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
															</div>
														</div>
														<div className="text-sm font-semibold text-blue-600 mt-2">
															{progress.toFixed(
																0
															)}
															%
														</div>
													</div>
												)}
											</div>
										</div>

										{index < workflowSteps.length - 1 && (
											<div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-1 bg-slate-200 rounded-full z-0">
												<div
													className={`
                          h-full rounded-full transition-all duration-1000 relative overflow-hidden
                          ${
								isCompleted
									? "bg-gradient-to-r from-emerald-500 to-emerald-600 w-full"
									: isActive
									? "bg-gradient-to-r from-blue-500 to-blue-600"
									: "bg-slate-200 w-0"
							}
                        `}
													style={{
														width: isActive
															? `${progress}%`
															: isCompleted
															? "100%"
															: "0%",
													}}>
													{isActive && (
														<div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-lg" />
													)}
												</div>
											</div>
										)}
									</div>
								)
							})}
						</div>

						<div className="flex justify-center mb-8">
							<div className="flex items-center space-x-3 bg-white rounded-full px-6 py-3 shadow-lg border border-slate-100">
								{workflowSteps.map((step, index) => (
									<div
										key={index}
										className="flex items-center">
										<button
											onClick={() =>
												handleStepClick(index)
											}
											className={`
                      w-3 h-3 rounded-full transition-all duration-300 border-2 relative
                      ${
							currentStep === index
								? "bg-blue-500 border-blue-500 scale-150 shadow-lg"
								: currentStep > index
								? "bg-emerald-500 border-emerald-500 scale-125"
								: "bg-slate-200 border-slate-300 hover:border-slate-400 hover:scale-110"
						}
                    `}>
											{currentStep === index && (
												<div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-75" />
											)}
										</button>
										{index < workflowSteps.length - 1 && (
											<div className="w-8 h-0.5 bg-slate-200 mx-2 rounded-full">
												<div
													className={`
                          h-full rounded-full transition-all duration-500
                          ${
								currentStep > index
									? "bg-emerald-500 w-full"
									: "w-0"
							}
                        `}
												/>
											</div>
										)}
									</div>
								))}
							</div>
						</div>

						<div className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-3xl border border-slate-200 shadow-lg">
							<div className="flex items-center gap-4 mb-6">
								<div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl text-white shadow-lg">
									{React.createElement(
										workflowSteps[currentStep].icon,
										{
											className: "h-8 w-8",
										}
									)}
								</div>
								<div className="flex-1">
									<h3 className="text-2xl font-bold text-slate-900 mb-1">
										{workflowSteps[currentStep].title}
									</h3>
									<p className="text-slate-600">
										{workflowSteps[currentStep].description}
									</p>
								</div>
								{isPlaying && (
									<div className="flex max-md:hidden items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-200">
										<Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
										<span className="text-blue-700 font-medium text-sm">
											Processing...
										</span>
									</div>
								)}
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<h4 className="font-semibold text-slate-900 mb-2">
										Process Details
									</h4>
									<p className="text-slate-600 text-sm leading-relaxed">
										{workflowSteps[currentStep].details}
									</p>
								</div>

								<div className="bg-white p-4 rounded-2xl border border-slate-100">
									<h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
										<Activity className="h-4 w-4 text-green-500" />
										Live Data
									</h4>
									<div className="space-y-3 text-sm">
										<div className="flex justify-between items-center">
											<span className="text-slate-600">
												Upload Progress
											</span>
											<span
												className={`font-mono font-bold ${
													simulatedData.uploadProgress ===
													100
														? "text-green-600"
														: simulatedData.uploadProgress >
														  0
														? "text-blue-600"
														: "text-slate-400"
												}`}>
												{currentStep === 0
													? `${simulatedData.uploadProgress.toFixed(
															0
													  )}%`
													: simulatedData.uploadProgress ===
													  100
													? "Complete"
													: "0%"}
											</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-slate-600">
												Hash Status
											</span>
											<span
												className={`font-mono font-bold ${
													simulatedData.hashGenerated
														? "text-green-600"
														: "text-slate-400"
												}`}>
												{simulatedData.hashGenerated
													? "Generated"
													: currentStep === 0 &&
													  progress > 50
													? "Generating..."
													: "Pending"}
											</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-slate-600">
												Blockchain Query
											</span>
											<span
												className={`font-mono font-bold ${
													simulatedData.blockchainSearching
														? "text-yellow-600"
														: currentStep > 1
														? "text-green-600"
														: "text-slate-400"
												}`}>
												{simulatedData.blockchainSearching
													? "Searching..."
													: currentStep > 1
													? "Complete"
													: "Idle"}
											</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-slate-600">
												AI Confidence
											</span>
											<span
												className={`font-mono font-bold ${
													simulatedData.verificationScore >
													0
														? "text-green-600"
														: simulatedData.aiAnalyzing
														? "text-blue-600"
														: "text-slate-400"
												}`}>
												{simulatedData.verificationScore >
												0
													? `${simulatedData.verificationScore}%`
													: simulatedData.aiAnalyzing
													? "Analyzing..."
													: currentStep < 2
													? "Waiting"
													: "Ready"}
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Animated Demo Section */}
			<section className="py-16 px-4">
				<div className="container mx-auto">
					<div className="max-w-4xl mx-auto">
						<Card className="glass-card">
							<CardHeader className="text-center">
								<CardTitle className="text-2xl">
									See AuthScan in Action
								</CardTitle>
								<CardDescription>
									Upload → Verify → Trust - It's that simple
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid md:grid-cols-3 gap-8">
									<div className="text-center">
										<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
											<Upload className="h-8 w-8 text-primary" />
										</div>
										<h3 className="font-semibold mb-2">
											1. Upload Certificate
										</h3>
										<p className="text-sm text-muted-foreground">
											Upload your digital certificate or
											enter certificate ID
										</p>
									</div>
									<div className="text-center">
										<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
											<Search className="h-8 w-8 text-primary" />
										</div>
										<h3 className="font-semibold mb-2">
											2. Blockchain Verification
										</h3>
										<p className="text-sm text-muted-foreground">
											Our system checks the certificate
											hash against blockchain records
										</p>
									</div>
									<div className="text-center">
										<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
											<CheckCircle className="h-8 w-8 text-green-600" />
										</div>
										<h3 className="font-semibold mb-2">
											3. Instant Results
										</h3>
										<p className="text-sm text-muted-foreground">
											Get verification status and download
											official report
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Trusted By Section */}
			<section className="py-16 px-4 bg-muted/30">
				<div className="container mx-auto text-center">
					<h2 className="text-3xl font-bold mb-8">
						Trusted by Leading Organizations
					</h2>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
						<div className="h-12 bg-gray-200 rounded flex items-center justify-center">
							<span className="font-semibold text-gray-600">
								University A
							</span>
						</div>
						<div className="h-12 bg-gray-200 rounded flex items-center justify-center">
							<span className="font-semibold text-gray-600">
								Tech Corp
							</span>
						</div>
						<div className="h-12 bg-gray-200 rounded flex items-center justify-center">
							<span className="font-semibold text-gray-600">
								Institute B
							</span>
						</div>
						<div className="h-12 bg-gray-200 rounded flex items-center justify-center">
							<span className="font-semibold text-gray-600">
								Global Inc
							</span>
						</div>
					</div>
				</div>
			</section>

			{/* How It Works Section */}
			<section id="how-it-works" className="py-20 px-4">
				<div className="container mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold mb-4">
							How AuthScan Works
						</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							Our blockchain-based system ensures certificate
							authenticity through cryptographic verification
						</p>
					</div>
					<div className="grid md:grid-cols-3 gap-8">
						<Card className="glass-card">
							<CardHeader>
								<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
									<Building2 className="h-6 w-6 text-primary" />
								</div>
								<CardTitle>Institution Issues</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground">
									Educational institutions generate
									cryptographic hashes of certificates and
									store them on the blockchain
								</p>
							</CardContent>
						</Card>
						<Card className="glass-card">
							<CardHeader>
								<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
									<Lock className="h-6 w-6 text-primary" />
								</div>
								<CardTitle>Blockchain Storage</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground">
									Certificate hashes are immutably stored on
									the blockchain, creating an unalterable
									record of authenticity
								</p>
							</CardContent>
						</Card>
						<Card className="glass-card">
							<CardHeader>
								<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
									<CheckCircle className="h-6 w-6 text-primary" />
								</div>
								<CardTitle>Instant Verification</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground">
									Anyone can verify certificate authenticity
									by comparing the document hash with
									blockchain records
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* User Portals Section */}
			<section id="features" className="py-20 px-4 bg-muted/30">
				<div className="container mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold mb-4">
							Built for Everyone
						</h2>
						<p className="text-xl text-muted-foreground">
							Tailored experiences for students, institutions, and
							employers
						</p>
					</div>
					<div className="grid md:grid-cols-3 gap-8">
						<Card className="glass-card hover:shadow-lg transition-shadow">
							<CardHeader>
								<div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
									<Users className="h-6 w-6 text-blue-600" />
								</div>
								<CardTitle>Student Portal</CardTitle>
								<CardDescription>
									Manage and verify your certificates
								</CardDescription>
							</CardHeader>
							<CardContent>
								<ul className="space-y-2 text-sm text-muted-foreground mb-6">
									<li>• Upload and verify certificates</li>
									<li>• Generate QR codes for sharing</li>
									<li>• Track verification history</li>
									<li>• Download verification reports</li>
								</ul>
								<Button className="w-full" asChild>
									<Link href="/student">Access Portal</Link>
								</Button>
							</CardContent>
						</Card>
						<Card className="glass-card hover:shadow-lg transition-shadow">
							<CardHeader>
								<div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
									<Building2 className="h-6 w-6 text-green-600" />
								</div>
								<CardTitle>Institution Portal</CardTitle>
								<CardDescription>
									Issue and manage certificates
								</CardDescription>
							</CardHeader>
							<CardContent>
								<ul className="space-y-2 text-sm text-muted-foreground mb-6">
									<li>• Batch certificate uploads</li>
									<li>• ERP system integration</li>
									<li>• Issuance analytics</li>
									<li>• Verification logs</li>
								</ul>
								<Button className="w-full" asChild>
									<Link href="/institution">
										Access Portal
									</Link>
								</Button>
							</CardContent>
						</Card>
						<Card className="glass-card hover:shadow-lg transition-shadow">
							<CardHeader>
								<div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
									<GraduationCap className="h-6 w-6 text-purple-600" />
								</div>
								<CardTitle>Employer Portal</CardTitle>
								<CardDescription>
									Verify candidate credentials
								</CardDescription>
							</CardHeader>
							<CardContent>
								<ul className="space-y-2 text-sm text-muted-foreground mb-6">
									<li>• Quick certificate verification</li>
									<li>• QR code scanning</li>
									<li>• Bulk verification tools</li>
									<li>• Verification reports</li>
								</ul>
								<Button className="w-full" asChild>
									<Link href="/employer">Access Portal</Link>
								</Button>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Problem Section */}
			<section className="px-6 py-16 bg-slate-100">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-3xl lg:text-5xl font-bold mb-6 text-slate-900">
							Certificate Fraud is a
							<span className="text-red-600">
								{" "}
								$1 Billion Problem
							</span>
						</h2>
						<p className="text-xl text-slate-600 max-w-3xl mx-auto">
							Every year, thousands of fake certificates slip
							through traditional verification processes, costing
							organizations millions and eroding trust in
							legitimate credentials.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						<div className="bg-white p-8 rounded-2xl border border-red-200 shadow-sm">
							<div className="text-red-600 text-4xl font-bold mb-4">
								67%
							</div>
							<h3 className="text-xl font-semibold mb-2 text-slate-900">
								of employers
							</h3>
							<p className="text-slate-600">
								have encountered fake credentials during the
								hiring process
							</p>
						</div>

						<div className="bg-white p-8 rounded-2xl border border-amber-200 shadow-sm">
							<div className="text-amber-600 text-4xl font-bold mb-4">
								45 days
							</div>
							<h3 className="text-xl font-semibold mb-2 text-slate-900">
								average time
							</h3>
							<p className="text-slate-600">
								to manually verify a single certificate through
								traditional methods
							</p>
						</div>

						<div className="bg-white p-8 rounded-2xl border border-orange-200 shadow-sm">
							<div className="text-orange-600 text-4xl font-bold mb-4">
								$12K
							</div>
							<h3 className="text-xl font-semibold mb-2 text-slate-900">
								average cost
							</h3>
							<p className="text-slate-600">
								of a single fraudulent hire to an organization
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 px-4">
				<div className="container mx-auto text-center">
					<Card className="glass-card max-w-4xl mx-auto">
						<CardContent className="py-16">
							<h2 className="text-4xl font-bold mb-4">
								Ready to Get Started?
							</h2>
							<p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
								Join thousands of users who trust AuthScan for
								secure certificate verification
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Button
									size="lg"
									className="text-lg px-8"
									asChild>
									<Link href="/register">
										Create Account{" "}
										<ArrowRight className="ml-2 h-5 w-5" />
									</Link>
								</Button>
								<Button
									size="lg"
									variant="outline"
									className="text-lg px-8 bg-transparent"
									asChild>
									<Link href="/contact">Contact Sales</Link>
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>

			{/* Footer */}
			<footer className="px-6 py-12 bg-slate-100 border-t border-slate-200">
				<div className="max-w-7xl mx-auto">
					<div className="flex flex-col lg:flex-row justify-between items-center">
						<div className="flex items-center space-x-2 mb-4 lg:mb-0">
							<div className="p-2 bg-slate-900 rounded-lg">
								<Shield className="h-6 w-6 text-white" />
							</div>
							<span className="text-2xl font-bold text-slate-900">
								AuthScan
							</span>
						</div>

						<div className="flex flex-wrap justify-center gap-8 text-sm text-slate-600">
							<a
								href="#"
								className="hover:text-slate-900 transition-colors">
								Privacy Policy
							</a>
							<a
								href="#"
								className="hover:text-slate-900 transition-colors">
								Terms of Service
							</a>
							<a
								href="#"
								className="hover:text-slate-900 transition-colors">
								Support
							</a>
							<a
								href="#"
								className="hover:text-slate-900 transition-colors">
								API Documentation
							</a>
						</div>
					</div>

					<div className="border-t border-slate-200 mt-8 pt-8 text-center text-slate-500 text-sm">
						© 2025 AuthScan. All rights reserved. Protecting
						academic integrity worldwide.
					</div>
				</div>
			</footer>
		</div>
	)
}
