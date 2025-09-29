"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
	Search,
	Upload,
	Download,
	CheckCircle,
	XCircle,
	Shield,
	FileText,
	TrendingUp,
	Eye,
	Camera,
	Hash,
	Building,
	Clock,
	Loader2,
	AlertCircle,
} from "lucide-react"

export default function EmployerPortal() {
	const [stats, setStats] = useState(null)
	const [history, setHistory] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)

	const [verificationResult, setVerificationResult] = useState(null)
	const [isVerifying, setIsVerifying] = useState(false)
	const [verificationError, setVerificationError] = useState(null)

	const [certificateIdInput, setCertificateIdInput] = useState("")
	const fileInputRef = useRef(null)
	const bulkFileInputRef = useRef(null)

	// Fetch initial dashboard data and history
	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true)
				const [statsRes, historyRes] = await Promise.all([
					fetch("/api/employer/dashboard", {
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${localStorage.getItem(
								"token"
							)}`,
						},
					}),
					fetch("/api/employer/verify-history", {
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${localStorage.getItem(
								"token"
							)}`,
						},
					}),
				])
				console.log(statsRes, historyRes)
				if (!statsRes.ok || !historyRes.ok) {
					throw new Error("Failed to fetch initial data")
				}

				const statsData = await statsRes.json()
				const historyData = await historyRes.json()

				setStats(statsData)
				setHistory(historyData)
			} catch (err) {
				setError(err.message)
			} finally {
				setIsLoading(false)
			}
		}
		fetchData()
	}, [])

	const handleVerifyById = async () => {
		if (!certificateIdInput) return
		setIsVerifying(true)
		setVerificationResult(null)
		setVerificationError(null)

		const formData = new FormData()
		formData.append("certificateId", certificateIdInput)

		try {
			const res = await fetch("/api/employer/verify", {
				method: "POST",
				body: formData,
			})
			const data = await res.json()
			if (!res.ok) {
				throw new Error(data.error || "Verification failed")
			}
			setVerificationResult(data)
		} catch (err) {
			setVerificationError(err.message)
		} finally {
			setIsVerifying(false)
		}
	}

	const handleVerifyByFile = async (event) => {
		const file = event.target.files[0]
		if (!file) return

		setIsVerifying(true)
		setVerificationResult(null)
		setVerificationError(null)

		const formData = new FormData()
		formData.append("file", file)

		try {
			const res = await fetch("/api/employer/verify", {
				method: "POST",
				body: formData,
			})
			const data = await res.json()
			if (!res.ok) {
				throw new Error(data.error || "Verification failed")
			}
			setVerificationResult(data)
		} catch (err) {
			setVerificationError(err.message)
		} finally {
			setIsVerifying(false)
		}
	}

	const getVerificationBadge = (result) => {
		switch (result?.toLowerCase()) {
			case "verified":
				return (
					<Badge className="bg-green-100 text-green-800 border-green-200">
						<CheckCircle className="w-3 h-3 mr-1" />
						Verified
					</Badge>
				)
			case "pending":
				return (
					<Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
						<Clock className="w-3 h-3 mr-1" />
						Pending
					</Badge>
				)
			case "failed":
				return (
					<Badge className="bg-red-100 text-red-800 border-red-200">
						<XCircle className="w-3 h-3 mr-1" />
						Failed
					</Badge>
				)
			default:
				return <Badge variant="secondary">Unknown</Badge>
		}
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
			<nav className="sticky top-0 z-50 glass-card border-b">
				<div className="container mx-auto px-4 py-4">
					<div className="flex items-center justify-between">
						<a href="/" className="flex items-center space-x-2">
							<Shield className="h-8 w-8 text-primary" />
							<span className="text-2xl font-bold text-primary">
								AuthScan
							</span>
						</a>
						<div className="flex items-center space-x-4">
							<span className="text-sm text-muted-foreground">
								TechCorp HR
							</span>
							<Button variant="outline" size="sm">
								Sign Out
							</Button>
						</div>
					</div>
				</div>
			</nav>

			<div className="container mx-auto px-4 py-8">
				<div className="mb-8">
					<h1 className="text-3xl font-bold mb-2">Employer Portal</h1>
					<p className="text-muted-foreground">
						Verify candidate credentials with confidence and speed
					</p>
				</div>

				{/* Stats Cards */}
				{isLoading ? (
					<div className="grid md:grid-cols-4 gap-6 mb-8">
						{Array(4)
							.fill(0)
							.map((_, i) => (
								<Card key={i} className="glass-card">
									<CardContent className="p-6 h-28 flex items-center justify-center">
										<Loader2 className="h-8 w-8 animate-spin text-primary" />
									</CardContent>
								</Card>
							))}
					</div>
				) : error ? (
					<div className="text-red-600 bg-red-100 p-4 rounded-lg mb-8">
						{error}
					</div>
				) : (
					<div className="grid md:grid-cols-4 gap-6 mb-8">
						<Card className="glass-card">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm text-muted-foreground">
											Total Verifications
										</p>
										<p className="text-2xl font-bold">
											{stats?.totalVerifications || 0}
										</p>
									</div>
									<Search className="h-8 w-8 text-primary" />
								</div>
							</CardContent>
						</Card>
						<Card className="glass-card">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm text-muted-foreground">
											Verified
										</p>
										<p className="text-2xl font-bold text-green-600">
											{stats?.successfulVerifications ||
												0}
										</p>
										<p className="text-xs text-green-600">
											{stats?.successRate || 0}% success
											rate
										</p>
									</div>
									<CheckCircle className="h-8 w-8 text-green-600" />
								</div>
							</CardContent>
						</Card>
						<Card className="glass-card">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm text-muted-foreground">
											Failed
										</p>
										<p className="text-2xl font-bold text-red-600">
											{stats?.failedVerifications || 0}
										</p>
									</div>
									<XCircle className="h-8 w-8 text-red-600" />
								</div>
							</CardContent>
						</Card>
						<Card className="glass-card">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm text-muted-foreground">
											Avg. Time
										</p>
										<p className="text-2xl font-bold">
											~2s
										</p>
										<p className="text-xs text-blue-600">
											On-chain verification
										</p>
									</div>
									<TrendingUp className="h-8 w-8 text-blue-600" />
								</div>
							</CardContent>
						</Card>
					</div>
				)}

				<Tabs defaultValue="verify" className="space-y-6">
					<TabsList className="grid w-full grid-cols-5">
						<TabsTrigger value="verify">Quick Verify</TabsTrigger>
						<TabsTrigger value="qr-scanner">QR Scanner</TabsTrigger>
						<TabsTrigger value="bulk-verify">
							Bulk Verify
						</TabsTrigger>
						<TabsTrigger value="history">History</TabsTrigger>
						<TabsTrigger value="reports">Reports</TabsTrigger>
					</TabsList>

					<TabsContent value="verify" className="space-y-6">
						<div className="grid lg:grid-cols-2 gap-6">
							<Card className="glass-card">
								<CardHeader>
									<CardTitle>
										Verify by Certificate ID
									</CardTitle>
									<CardDescription>
										Enter the certificate ID to verify
										authenticity
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="space-y-2">
										<Label htmlFor="certificateId">
											Certificate ID
										</Label>
										<div className="flex space-x-2">
											<Input
												id="certificateId"
												placeholder="e.g., CERT-2024-001"
												className="flex-1"
												value={certificateIdInput}
												onChange={(e) =>
													setCertificateIdInput(
														e.target.value
													)
												}
											/>
											<Button
												onClick={handleVerifyById}
												disabled={
													isVerifying ||
													!certificateIdInput
												}>
												{isVerifying ? (
													<Loader2 className="w-4 h-4 mr-2 animate-spin" />
												) : (
													<Search className="w-4 h-4 mr-2" />
												)}
												Verify
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
							<Card className="glass-card">
								<CardHeader>
									<CardTitle>
										Verify by Document Upload
									</CardTitle>
									<CardDescription>
										Upload certificate PDF to verify its
										hash
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<Input
										type="file"
										ref={fileInputRef}
										onChange={handleVerifyByFile}
										className="hidden"
										id="file-upload"
									/>
									<Button
										variant="outline"
										onClick={() =>
											fileInputRef.current?.click()
										}
										disabled={isVerifying}
										className="w-full bg-transparent">
										<Upload className="w-4 h-4 mr-2" />
										Choose PDF/Image File
									</Button>
								</CardContent>
							</Card>
						</div>

						{(isVerifying ||
							verificationResult ||
							verificationError) && (
								<Card className="glass-card">
									<CardHeader>
										<CardTitle>Verification Result</CardTitle>
									</CardHeader>
									<CardContent>
										{isVerifying ? (
											<div className="flex items-center justify-center p-8">
												<Loader2 className="h-8 w-8 animate-spin text-primary" />
												<p className="ml-4">
													Verifying on-chain...
												</p>
											</div>
										) : verificationError ? (
											<div className="border rounded-lg p-6 bg-red-50 border-red-200">
												<div className="flex items-center space-x-3">
													<AlertCircle className="h-6 w-6 text-red-600" />{" "}
													<h3 className="font-semibold text-red-800">
														{verificationError}
													</h3>
												</div>
											</div>
										) : verificationResult ? (
											<div
												className={`border rounded-lg p-6 ${verificationResult.isVerified
													? "bg-green-50 border-green-200"
													: "bg-red-50 border-red-200"
													}`}>
												<div className="flex items-center justify-between mb-4">
													<div className="flex items-center space-x-3">
														<div
															className={`w-12 h-12 rounded-full flex items-center justify-center ${verificationResult.isVerified
																? "bg-green-100"
																: "bg-red-100"
																}`}>
															{verificationResult.isVerified ? (
																<CheckCircle className="h-6 w-6 text-green-600" />
															) : (
																<XCircle className="h-6 w-6 text-red-600" />
															)}
														</div>
														<div>
															<h3
																className={`font-semibold ${verificationResult.isVerified
																	? "text-green-800"
																	: "text-red-800"
																	}`}>
																Certificate{" "}
																{verificationResult.isVerified
																	? "Verified"
																	: "Failed Verification"}
															</h3>
															<p className="text-sm text-muted-foreground">
																{verificationResult.isVerified
																	? "Verification completed successfully"
																	: "This certificate could not be authenticated"}
															</p>
														</div>
													</div>
													<Badge
														className={
															verificationResult.isVerified
																? "bg-green-100 text-green-800 border-green-200"
																: "bg-red-100 text-red-800 border-red-200"
														}>
														{verificationResult.isVerified
															? "Authentic"
															: "Not Authentic"}
													</Badge>
												</div>
												<div className="grid md:grid-cols-2 gap-4 text-sm">
													<div>
														<p className="text-muted-foreground">
															Certificate ID
														</p>
														<p className="font-medium">
															{
																verificationResult
																	.certificate
																	.certificateId
															}
														</p>
													</div>
													<div>
														<p className="text-muted-foreground">
															Student Name
														</p>
														<p className="font-medium">
															{
																verificationResult
																	.certificate
																	.studentName
															}
														</p>
													</div>
													<div>
														<p className="text-muted-foreground">
															Course
														</p>
														<p className="font-medium">
															{
																verificationResult
																	.certificate
																	.courseName
															}
														</p>
													</div>
													<div>
														<p className="text-muted-foreground">
															Institution
														</p>
														<p className="font-medium">
															{
																verificationResult
																	.certificate
																	.organization
															}
														</p>
													</div>
													<div>
														<p className="text-muted-foreground">
															Issue Date
														</p>
														<p className="font-medium">
															{new Date(
																verificationResult.certificate.issueDate
															).toLocaleDateString()}
														</p>
													</div>
													<div>
														<p className="text-muted-foreground">
															Blockchain TX
														</p>
														<p className="font-medium font-mono text-xs">
															{
																verificationResult
																	.certificate
																	.transactionHash
															}
														</p>
													</div>
												</div>
											</div>
										) : null}
									</CardContent>
								</Card>
							)}
					</TabsContent>

					{/* ... Other Tabs remain the same ... */}

					<TabsContent value="history" className="space-y-6">
						<Card className="glass-card">
							<CardHeader>
								<CardTitle>Verification History</CardTitle>
								<CardDescription>
									Your recent certificate verification records
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Candidate</TableHead>
											<TableHead>
												Certificate Details
											</TableHead>
											<TableHead>
												Verification Date
											</TableHead>
											<TableHead>Result</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{history.length > 0 ? (
											history.map((verification) => (
												<TableRow key={verification.id}>
													<TableCell>
														<p className="font-medium">
															{
																verification
																	.certificate
																	.studentName
															}
														</p>
													</TableCell>
													<TableCell>
														<div>
															<p className="font-medium">
																{
																	verification
																		.certificate
																		.courseName
																}
															</p>
															<p className="text-sm text-muted-foreground">
																{
																	verification
																		.certificate
																		.certificateId
																}
															</p>
														</div>
													</TableCell>
													<TableCell>
														{new Date(
															verification.createdAt
														).toLocaleString()}
													</TableCell>
													<TableCell>
														{getVerificationBadge(
															verification.result
														)}
													</TableCell>
												</TableRow>
											))
										) : (
											<TableRow>
												<TableCell
													colSpan="4"
													className="text-center">
													No verification history
													found.
												</TableCell>
											</TableRow>
										)}
									</TableBody>
								</Table>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	)
}
