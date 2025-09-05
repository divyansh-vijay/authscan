"use client"

import React, { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import DocumentUpload from "./DocumentUpload"
import VerificationResults from "./VerificationResults"
import VerificationHistory from "./VerificationHistory"

export interface VerificationResult {
	id: string
	status: "verified" | "invalid" | "pending" | "suspicious"
	confidence: number
	details: {
		studentName: string
		rollNumber: string
		institution: string
		course: string
		graduationYear: string
		certificateNumber: string
		grade: string
	}
	flags: string[]
	timestamp: Date
	filename: string
}

export default function VerificationPortal() {
	const { user } = useAuth()
	const [currentResult, setCurrentResult] =
		useState<VerificationResult | null>(null)
	const [verificationHistory, setVerificationHistory] = useState<
		VerificationResult[]
	>([])

	if (!user || (user.role !== "verifier" && user.role !== "admin")) {
		return (
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="text-center bg-white rounded-lg shadow-sm border border-gray-200 p-12">
					<h2 className="text-xl font-semibold text-gray-900 mb-2">
						Access Restricted
					</h2>
					<p className="text-gray-600">
						You need verifier or admin privileges to access the
						certificate verification portal.
					</p>
				</div>
			</div>
		)
	}

	const handleVerificationComplete = (result: VerificationResult) => {
		setCurrentResult(result)
		setVerificationHistory((prev) => [result, ...prev])
	}

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="mb-8">
				<h1 className="text-2xl font-bold text-gray-900">
					Certificate Verification Portal
				</h1>
				<p className="text-gray-600 mt-1">
					Upload academic certificates to verify their authenticity
					and detect potential fraud
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div className="lg:col-span-2 space-y-8">
					<DocumentUpload
						onVerificationComplete={handleVerificationComplete}
					/>
					{currentResult && (
						<VerificationResults result={currentResult} />
					)}
				</div>

				<div className="lg:col-span-1">
					<VerificationHistory history={verificationHistory} />
				</div>
			</div>
		</div>
	)
}
