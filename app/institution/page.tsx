"use client"

import { useState, useEffect, FC, FormEvent } from "react"
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import {
	Upload,
	File,
	TrendingUp,
	Users,
	FileText,
	Shield,
	Download,
	Eye,
	Plus,
	BarChart3,
	Settings,
	CheckCircle,
	Clock,
	AlertCircle,
	Loader2,
} from "lucide-react"
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts"

// --- Type Definitions ---
interface DashboardStats {
	totalIssued: number
	totalVerifications: number
	activeStudents: number
	successRate: number
}

interface Certificate {
	id: string
	certificateId: string
	studentName: string
	courseName: string
	issueDate: string
	status: string
	blockchainTx: string | null
}

interface VerificationLog {
	id: string
	verifierType: string
	verifierName: string
	createdAt: string
	result: string
	certificate: { certificateId: string }
}

interface AnalyticsData {
	issuanceByMonth: { name: string; count: number }[]
	verificationsByMonth: { name: string; count: number }[]
	programStats: {
		courseName: string
		issued: number
		verifications: number
		successRate: number
	}[]
}

interface SingleIssueFormState {
	title: string
	studentName: string
	studentEmail: string
	courseName: string
	issueDate: string
	institution: string
	motherName: string
	fatherName: string
	rollNumber: string
	marksorgrade: string
}

// --- Helper Components ---
const StatCard: FC<{
	title: string
	value: string | number
	Icon: React.ElementType
	detail?: string
}> = ({ title, value, Icon, detail }) => (
	<Card className="glass-card">
		<CardContent className="p-6">
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm text-muted-foreground">{title}</p>
					<p className="text-2xl font-bold">{value}</p>
					{detail && (
						<p className="text-xs text-green-600">{detail}</p>
					)}
				</div>
				<Icon className="h-8 w-8 text-primary" />
			</div>
		</CardContent>
	</Card>
)

const COURSES = [
	// School Education
	{ category: "Primary School", name: "Class 1" },
	{ category: "Primary School", name: "Class 2" },
	{ category: "Primary School", name: "Class 3" },
	{ category: "Primary School", name: "Class 4" },
	{ category: "Primary School", name: "Class 5" },
	{ category: "Middle School", name: "Class 6" },
	{ category: "Middle School", name: "Class 7" },
	{ category: "Middle School", name: "Class 8" },
	{ category: "Secondary School", name: "Class 9" },
	{ category: "Secondary School", name: "Class 10 (SSC/ICSE/CBSE)" },
	{
		category: "Higher Secondary School",
		name: "Class 11-12 (Science Stream)",
	},
	{
		category: "Higher Secondary School",
		name: "Class 11-12 (Commerce Stream)",
	},
	{
		category: "Higher Secondary School",
		name: "Class 11-12 (Arts/Humanities Stream)",
	},

	// Diploma Courses (Post 10th or 12th)
	{ category: "Diploma", name: "Diploma in Engineering (Polytechnic)" },
	{ category: "Diploma", name: "Diploma in Pharmacy (D.Pharm)" },
	{ category: "Diploma", name: "Diploma in Hotel Management" },
	{ category: "Diploma", name: "Diploma in Elementary Education (D.El.Ed.)" },
	{
		category: "Diploma",
		name: "Industrial Training Institute (ITI) Courses",
	},
	{ category: "Diploma", name: "Diploma in Fine Arts" },
	{ category: "Diploma", name: "Diploma in Computer Applications (DCA)" },

	// Undergraduate Courses
	{
		category: "Engineering & Technology",
		name: "Bachelor of Technology (B.Tech)",
	},
	{
		category: "Engineering & Technology",
		name: "Bachelor of Engineering (B.E.)",
	},
	{ category: "Architecture", name: "Bachelor of Architecture (B.Arch)" },
	{
		category: "Medical (Allopathic)",
		name: "Bachelor of Medicine, Bachelor of Surgery (MBBS)",
	},
	{ category: "Medical (Dental)", name: "Bachelor of Dental Surgery (BDS)" },
	{
		category: "Medical (Ayurveda)",
		name: "Bachelor of Ayurvedic Medicine and Surgery (BAMS)",
	},
	{
		category: "Medical (Homeopathy)",
		name: "Bachelor of Homeopathic Medicine and Surgery (BHMS)",
	},
	{ category: "Pharmacy", name: "Bachelor of Pharmacy (B.Pharm)" },
	{
		category: "Nursing",
		name: "Bachelor of Science in Nursing (B.Sc. Nursing)",
	},
	{ category: "Physiotherapy", name: "Bachelor of Physiotherapy (BPT)" },
	{
		category: "Veterinary",
		name: "Bachelor of Veterinary Science & Animal Husbandry (B.V.Sc & AH)",
	},
	{ category: "Science", name: "Bachelor of Science (B.Sc.)" },
	{
		category: "Computer Applications",
		name: "Bachelor of Computer Applications (BCA)",
	},
	{ category: "Commerce", name: "Bachelor of Commerce (B.Com)" },
	{
		category: "Business Administration",
		name: "Bachelor of Business Administration (BBA)",
	},
	{ category: "Arts & Humanities", name: "Bachelor of Arts (B.A.)" },
	{ category: "Law", name: "Bachelor of Laws (LL.B.)" },
	{ category: "Law", name: "Integrated LL.B. (e.g., B.A. LL.B., BBA LL.B.)" },
	{ category: "Education", name: "Bachelor of Education (B.Ed.)" },
	{ category: "Design", name: "Bachelor of Design (B.Des)" },
	{ category: "Fine Arts", name: "Bachelor of Fine Arts (BFA)" },
	{
		category: "Hotel Management",
		name: "Bachelor of Hotel Management (BHM)",
	},
	{ category: "Social Work", name: "Bachelor of Social Work (BSW)" },
	{
		category: "Journalism",
		name: "Bachelor of Journalism and Mass Communication (BJMC)",
	},

	// Professional Certifications (Often pursued with UG)
	{
		category: "Professional Certification",
		name: "Chartered Accountancy (CA)",
	},
	{ category: "Professional Certification", name: "Company Secretary (CS)" },
	{
		category: "Professional Certification",
		name: "Cost and Management Accountant (CMA)",
	},

	// Postgraduate Courses
	{
		category: "Engineering & Technology",
		name: "Master of Technology (M.Tech)",
	},
	{
		category: "Engineering & Technology",
		name: "Master of Engineering (M.E.)",
	},
	{ category: "Architecture", name: "Master of Architecture (M.Arch)" },
	{ category: "Medical (Doctorate)", name: "Doctor of Medicine (MD)" },
	{ category: "Medical (Surgery)", name: "Master of Surgery (MS)" },
	{ category: "Medical (Dental)", name: "Master of Dental Surgery (MDS)" },
	{ category: "Pharmacy", name: "Master of Pharmacy (M.Pharm)" },
	{
		category: "Nursing",
		name: "Master of Science in Nursing (M.Sc. Nursing)",
	},
	{ category: "Physiotherapy", name: "Master of Physiotherapy (MPT)" },
	{ category: "Science", name: "Master of Science (M.Sc.)" },
	{
		category: "Computer Applications",
		name: "Master of Computer Applications (MCA)",
	},
	{ category: "Commerce", name: "Master of Commerce (M.Com)" },
	{
		category: "Business Administration",
		name: "Master of Business Administration (MBA)",
	},
	{
		category: "Management",
		name: "Post Graduate Diploma in Management (PGDM)",
	},
	{ category: "Arts & Humanities", name: "Master of Arts (M.A.)" },
	{ category: "Law", name: "Master of Laws (LL.M.)" },
	{ category: "Education", name: "Master of Education (M.Ed.)" },
	{ category: "Design", name: "Master of Design (M.Des)" },
	{ category: "Fine Arts", name: "Master of Fine Arts (MFA)" },
	{ category: "Social Work", name: "Master of Social Work (MSW)" },

	// Doctoral & Post-Doctoral Studies
	{ category: "Doctoral", name: "Doctor of Philosophy (Ph.D.)" },
	{ category: "Doctoral (Medical)", name: "Doctorate of Medicine (DM)" },
	{ category: "Doctoral (Surgical)", name: "Magister Chirurgiae (M.Ch.)" },
	{ category: "Post-Doctoral", name: "Post-Doctoral Fellowship/Research" },
]

const StatusBadge: FC<{ status: string }> = ({ status }) => {
	const statusMap = {
		ISSUED: { Icon: CheckCircle, color: "green", label: "Issued" },
		PENDING: { Icon: Clock, color: "yellow", label: "Pending" },
		REVOKED: { Icon: AlertCircle, color: "red", label: "Revoked" },
		VERIFIED: { Icon: CheckCircle, color: "green", label: "Verified" },
		FAILED: { Icon: AlertCircle, color: "red", label: "Failed" },
	}
	const { Icon, color, label } = statusMap[
		status.toUpperCase() as keyof typeof statusMap
	] || { Icon: Clock, color: "gray", label: "Unknown" }
	return (
		<Badge
			className={`bg-${color}-100 text-${color}-800 border-${color}-200`}>
			<Icon className="w-3 h-3 mr-1" />
			{label}
		</Badge>
	)
}

// --- Main Component ---
export default function InstitutionPortal() {
	const [stats, setStats] = useState<DashboardStats | null>(null)
	const [recentCertificates, setRecentCertificates] = useState<Certificate[]>(
		[]
	)
	const [verificationLogs, setVerificationLogs] = useState<VerificationLog[]>(
		[]
	)
	const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
		null
	)
	const [isLoading, setIsLoading] = useState(true)
	const [formState, setFormState] = useState<SingleIssueFormState>({
		studentName: "",
		courseName: "",
		studentEmail: "",
		issueDate: "",
		title: "",
		motherName: "",
		fatherName: "",
		rollNumber: "",
		institution: "",
		marksorgrade: "",
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [batchFiles, setBatchFiles] = useState<FileList | null>(null)
	const [batchUploadStatus, setBatchUploadStatus] = useState<string | null>(
		null
	)

	const [uploadedCertErrors, setUploadedCertErrors] = useState<
		{ name: string; error: string }[]
	>([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true)
				const [statsRes, certsRes, logsRes, analyticsRes] =
					await Promise.all([
						fetch("/api/dashboard?action=stats", {
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${localStorage.getItem(
									"token"
								)}`,
							},
						}),
						fetch("/api/dashboard?action=recent-certificates", {
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${localStorage.getItem(
									"token"
								)}`,
							},
						}),
						fetch("/api/dashboard?action=verification-logs", {
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${localStorage.getItem(
									"token"
								)}`,
							},
						}),
						fetch("/api/analytics", {
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${localStorage.getItem(
									"token"
								)}`,
							},
						}),
					])
				setStats(await statsRes.json())
				setRecentCertificates(await certsRes.json())
				setVerificationLogs(await logsRes.json())
				setAnalyticsData(await analyticsRes.json())
			} catch (error) {
				console.error("Failed to fetch dashboard data:", error)
			} finally {
				setIsLoading(false)
			}
		}
		fetchData()
	}, [])

	const handleFormChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormState({ ...formState, [e.target.id]: e.target.value })
	}

	const handleSelectChange = (value: string) => {
		setFormState({ ...formState, courseName: value })
	}

	const handleSingleIssueSubmit = async (e: FormEvent) => {
		console.log("getting into certs phase")
		e.preventDefault()
		setIsSubmitting(true)
		try {
			const response = await fetch(`/api/certificates`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify(formState),
			})
			if (!response.ok) throw new Error("Failed to issue certificate")
			alert("Certificate issued successfully!")
			setFormState({
				studentName: "",
				courseName: "",
				studentEmail: "",
				issueDate: "",
				title: "",
				motherName: "",
				fatherName: "",
				rollNumber: "",
				institution: "",
				marksorgrade: "",
			})
			// Refresh recent certificates
			const certsRes = await fetch(
				"/api/dashboard?action=recent-certificates",
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				}
			)
			setRecentCertificates(await certsRes.json())
		} catch (error) {
			console.error(error)
			alert("Error issuing certificate.")
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleBatchUpload = async (e: FormEvent) => {
		e.preventDefault()
		if (!batchFiles || batchFiles.length === 0) {
			alert("Please select files to upload.")
			return
		}
		setIsSubmitting(true)
		setBatchUploadStatus("Uploading...")

		const formData = new FormData()
		Array.from(batchFiles).forEach((file) => {
			formData.append(file.name, file)
		})

		try {
			const response = await fetch("/api/certificates", {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				body: formData,
			})
			const result = await response.json()
			if (!response.ok)
				throw new Error(result.error || "Batch upload failed")
			setBatchUploadStatus(
				`Upload Complete: ${result.successCount} succeeded, ${result.failedCount} failed.`
			)
			console.log(result.failedFiles)
			setUploadedCertErrors(result.failedFiles)
		} catch (error: any) {
			console.error(error)
			setBatchUploadStatus(`Error: ${error.message}`)
		} finally {
			setIsSubmitting(false)
			setBatchFiles(null)
			// Optionally clear the file input
			const fileInput = document.getElementById(
				"batch-file-input"
			) as HTMLInputElement
			if (fileInput) fileInput.value = ""
		}
	}

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Loader2 className="h-16 w-16 animate-spin" />
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
			{/* Navigation */}
			<nav className="sticky top-0 z-50 glass-card border-b">
				<div className="container mx-auto px-4 py-4">
					<div className="flex items-center justify-between">
						<a href="/" className="flex items-center space-x-2">
							<img
								src="/emblem.png"
								height={28}
								width={28}
								alt=""
							/>
							<span className="text-2xl font-bold text-primary">
								AuthScan
							</span>
						</a>
						<div className="flex items-center space-x-4">
							<span className="text-sm text-muted-foreground">
								Tech University
							</span>
							<Button variant="outline" size="sm">
								<Settings className="w-4 h-4 mr-2" />
								Settings
							</Button>
							<Button variant="outline" size="sm">
								Sign Out
							</Button>
						</div>
					</div>
				</div>
			</nav>

			<div className="container mx-auto px-4 py-8">
				<div className="mb-8">
					<h1 className="text-3xl font-bold mb-2">
						Institution Portal
					</h1>
					<p className="text-muted-foreground">
						Manage certificate issuance and track verification
						analytics
					</p>
				</div>

				{/* Stats Cards */}
				<div className="grid md:grid-cols-4 gap-6 mb-8">
					<StatCard
						title="Total Issued"
						value={stats?.totalIssued ?? 0}
						Icon={FileText}
					/>
					<StatCard
						title="Verifications"
						value={stats?.totalVerifications ?? 0}
						Icon={CheckCircle}
					/>
					<StatCard
						title="Active Students"
						value={stats?.activeStudents ?? 0}
						Icon={Users}
					/>
					<StatCard
						title="Success Rate"
						value={`${stats?.successRate ?? 0}%`}
						Icon={TrendingUp}
						detail="Verification rate"
					/>
				</div>

				<Tabs defaultValue="dashboard" className="space-y-6">
					<TabsList className="grid w-full grid-cols-4">
						<TabsTrigger value="dashboard">Dashboard</TabsTrigger>
						<TabsTrigger value="batch-upload">
							Batch Upload
						</TabsTrigger>
						<TabsTrigger value="single-issue">
							Issue Certificate
						</TabsTrigger>
						<TabsTrigger value="analytics">Analytics</TabsTrigger>
						{/* <TabsTrigger value="api-docs">
							API Integration
						</TabsTrigger> */}
					</TabsList>

					{/* Dashboard */}
					<TabsContent value="dashboard" className="space-y-6">
						<div className="grid lg:grid-cols-2 gap-6">
							<Card className="glass-card">
								<CardHeader>
									<CardTitle>Recent Certificates</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										{recentCertificates.length > 0 ? (
											recentCertificates.map((cert) => (
												<div
													key={cert.id}
													className="flex items-center justify-between p-3 border rounded-lg">
													<div>
														<p className="font-medium">
															{cert.studentName}
														</p>
														<p className="text-sm text-muted-foreground">
															{cert.courseName}
														</p>
													</div>
													<div className="text-right">
														<StatusBadge
															status={cert.status}
														/>
														<p className="text-xs text-muted-foreground mt-1">
															{new Date(
																cert.issueDate
															).toLocaleDateString()}
														</p>
													</div>
												</div>
											))
										) : (
											<p className="text-muted-foreground text-center">
												No recent certificates
											</p>
										)}
									</div>
								</CardContent>
							</Card>
							<Card className="glass-card">
								<CardHeader>
									<CardTitle>Verification Activity</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<div
											className={`space-y-4 ${
												verificationLogs.length === 0
													? "flex items-center justify-center"
													: ""
											}`}>
											{verificationLogs.length === 0 && (
												<p className="text-muted-foreground">
													No verification activity
												</p>
											)}
										</div>
										{verificationLogs.length > 0 &&
											verificationLogs.map((log) => (
												<div
													key={log.id}
													className="flex items-center justify-between p-3 border rounded-lg">
													<div>
														<p className="font-medium">
															{log.verifierName}
														</p>
														<p className="text-sm text-muted-foreground">
															{log.verifierType}
														</p>
													</div>
													<div className="text-right">
														<StatusBadge
															status={log.result}
														/>
														<p className="text-xs text-muted-foreground mt-1">
															{new Date(
																log.createdAt
															).toLocaleString()}
														</p>
													</div>
												</div>
											))}
									</div>
								</CardContent>
							</Card>
						</div>
					</TabsContent>

					{/* Batch Upload */}
					<TabsContent value="batch-upload">
						<Card className="glass-card">
							<CardHeader>
								<CardTitle>Batch Certificate Upload</CardTitle>
								<CardDescription>
									Upload multiple certificate files (PDF or
									Images) for batch processing.
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center">
									<File className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
									<h3 className="text-lg font-semibold mb-2">
										Upload Certificate Files
									</h3>
									<p className="text-muted-foreground mb-4">
										Select multiple PDF or image files to
										issue in bulk.
									</p>
									<Input
										id="batch-file-input"
										type="file"
										multiple
										accept="application/pdf,image/*"
										onChange={(e) =>
											setBatchFiles(e.target.files)
										}
										className="mx-auto max-w-xs"
									/>
								</div>
								<Button
									type="submit"
									className="w-full"
									onClick={handleBatchUpload}
									disabled={isSubmitting || !batchFiles}>
									{isSubmitting ? (
										<Loader2 className="w-4 h-4 mr-2 animate-spin" />
									) : (
										<Upload className="w-4 h-4 mr-2" />
									)}
									{isSubmitting
										? "Processing..."
										: `Upload ${
												batchFiles?.length || 0
										  } File(s)`}
								</Button>
								{batchUploadStatus && (
									<p className="text-center text-sm text-muted-foreground mt-4">
										{batchUploadStatus}
									</p>
								)}
								<div className="flex flex-col gap-2">
									{uploadedCertErrors &&
										uploadedCertErrors.map(
											(error, index) => (
												<div
													key={index}
													className="flex flex-row justify-between w-full items-center border rounded-md px-2">
													<p
														key={index}
														className="text-center text-sm text-destructive">
														{index + 1}.{" "}
														{error.name}
													</p>
													<p
														key={index}
														className="text-center text-sm text-destructive">
														{error.error.substring(
															0,
															50
														)}
													</p>
												</div>
											)
										)}
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Single Issue */}
					<TabsContent value="single-issue">
						<Card className="glass-card">
							<CardHeader>
								<CardTitle>Issue Single Certificate</CardTitle>
								<CardDescription>
									Create and issue a certificate for an
									individual student.
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<form
									onSubmit={handleSingleIssueSubmit}
									className="space-y-6">
									<div className="grid md:grid-cols-2 gap-4">
										<div className="flex flex-col gap-2">
											<Label htmlFor="title">Title</Label>
											<Input
												id="title"
												value={formState.title}
												onChange={handleFormChange}
												required
											/>
										</div>
										<div className="flex flex-col gap-2">
											<Label htmlFor="studentName">
												Student Name
											</Label>
											<Input
												id="studentName"
												value={formState.studentName}
												onChange={handleFormChange}
												required
											/>
										</div>
									</div>

									<div className="grid md:grid-cols-2 gap-4">
										<div className="flex flex-col gap-2">
											<Label htmlFor="courseName">
												Program/Course
											</Label>
											<Select
												onValueChange={
													handleSelectChange
												}
												value={formState.courseName}
												required>
												<SelectTrigger>
													<SelectValue placeholder="Select courseName" />
												</SelectTrigger>
												<SelectContent>
													{COURSES.map(({ name }) => (
														<SelectItem
															key={name}
															value={name}>
															{name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</div>

										<div className="flex flex-col gap-2">
											<Label htmlFor="issueDate">
												Issue Date
											</Label>
											<Input
												id="issueDate"
												type="date"
												value={formState.issueDate}
												onChange={handleFormChange}
												required
											/>
										</div>
										<div className="flex flex-col gap-2">
											<Label htmlFor="insstitutionName">
												Institution Name
											</Label>
											<Input
												id="institution"
												value={formState.institution}
												onChange={handleFormChange}
												required
											/>
										</div>
									</div>
									<div className="grid md:grid-cols-2 gap-4">
										<div className="flex flex-col gap-2">
											<Label htmlFor="studentEmail">
												Student Email (Optional)
											</Label>
											<Input
												id="studentEmail"
												value={formState.studentEmail}
												onChange={handleFormChange}
											/>
										</div>
									</div>

									<Button
										type="submit"
										className="w-full"
										disabled={isSubmitting}>
										{isSubmitting ? (
											<Loader2 className="w-4 h-4 mr-2 animate-spin" />
										) : (
											<Plus className="w-4 h-4 mr-2" />
										)}
										Issue Certificate
									</Button>
								</form>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Analytics */}
					<TabsContent value="analytics" className="space-y-6">
						<div className="grid lg:grid-cols-2 gap-6">
							<Card className="glass-card">
								<CardHeader>
									<CardTitle>Issuance Analytics</CardTitle>
								</CardHeader>
								<CardContent className="h-80">
									{analyticsData?.issuanceByMonth &&
									analyticsData?.issuanceByMonth.length >
										0 ? (
										<ResponsiveContainer
											width="100%"
											height="100%">
											<BarChart
												data={
													analyticsData?.issuanceByMonth
												}>
												<XAxis
													dataKey="month"
													fontSize={12}
													tickLine={false}
													axisLine={false}
												/>
												<YAxis
													dataKey={"count"}
													fontSize={12}
													tickLine={true}
													axisLine={true}
													interval={1}
												/>
												<Tooltip />
												<Legend />
												<Bar
													dataKey="count"
													fill="#8884d8"
													name="Issued"
													radius={[4, 4, 0, 0]}
												/>
											</BarChart>
										</ResponsiveContainer>
									) : (
										<p className="text-muted-foreground text-center">
											No issuance activity
										</p>
									)}
								</CardContent>
							</Card>
							<Card className="glass-card">
								<CardHeader>
									<CardTitle>
										Verification Analytics
									</CardTitle>
								</CardHeader>
								<CardContent className="h-80">
									{analyticsData?.verificationsByMonth &&
									analyticsData?.verificationsByMonth.length >
										0 ? (
										<ResponsiveContainer
											width="100%"
											height="100%">
											<BarChart
												data={
													analyticsData?.verificationsByMonth
												}>
												<XAxis
													dataKey="name"
													fontSize={12}
													tickLine={false}
													axisLine={false}
												/>
												<YAxis
													fontSize={12}
													tickLine={false}
													axisLine={false}
												/>
												<Tooltip />
												<Legend />
												<Bar
													dataKey="count"
													fill="#82ca9d"
													name="Verifications"
													radius={[4, 4, 0, 0]}
												/>
											</BarChart>
										</ResponsiveContainer>
									) : (
										<p className="text-muted-foreground text-center">
											No verification activity
										</p>
									)}
								</CardContent>
							</Card>
						</div>
						<Card className="glass-card">
							<CardHeader>
								<CardTitle>Program Performance</CardTitle>
							</CardHeader>
							<CardContent>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Program</TableHead>
											<TableHead>Issued</TableHead>
											<TableHead>Verifications</TableHead>
											<TableHead>Success Rate</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{analyticsData?.programStats &&
											analyticsData?.programStats
												?.length > 0 &&
											analyticsData?.programStats.map(
												(stat) => (
													<TableRow
														key={stat.courseName}>
														<TableCell className="font-medium">
															{stat.courseName}
														</TableCell>
														<TableCell>
															{stat.issued}
														</TableCell>
														<TableCell>
															{stat.verifications}
														</TableCell>
														<TableCell>
															<Badge variant="outline">
																{stat.successRate.toFixed(
																	1
																)}
																%
															</Badge>
														</TableCell>
													</TableRow>
												)
											)}
									</TableBody>
								</Table>
							</CardContent>
						</Card>
					</TabsContent>

					{/* API Docs Tab (remains static) */}
					{/* <TabsContent value="api-docs"> */}
					{/* Static content from original file */}
					{/* </TabsContent> */}
				</Tabs>
			</div>
		</div>
	)
}
