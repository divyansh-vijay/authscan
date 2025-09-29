"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Upload,
  FileSpreadsheet,
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
} from "lucide-react"
import Link from "next/link"

async function getJSON(url: string, options?: RequestInit) {
  const res = await fetch(url, options)
  const text = await res.text()
  try {
    return { status: res.status, json: JSON.parse(text) }
  } catch {
    return { status: res.status, json: { error: text } }
  }
}

export default function InstitutionPortal() {

  const [studentName, setStudentName] = useState("")
  const [program, setProgram] = useState("")
  const [issueDate, setIssueDate] = useState("")
  const [grade, setGrade] = useState("")
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<any>(null)

  const baseUrl = "http://localhost:5000"

  const handleIssue = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResponse(null)

    const data = {
      studentName,
      courseName: program,
      issueDate,
      grade: grade || "N/A",
    }

    const { status, json } = await getJSON(`${baseUrl}/api/issue-certificate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    setLoading(false)
    setResponse(json)
    if (status === 200 && json.success) {
      alert("Issued!")
    } else {
      alert(`Issue failed: ${json.error || status}`)
    }
  }
   
  // Mock data for demonstration
  const recentCertificates = [
    {
      id: "CERT-2024-101",
      studentName: "Alice Johnson",
      program: "Computer Science",
      issueDate: "2024-03-15",
      status: "issued",
      blockchainTx: "0x1a2b3c4d5e6f...",
    },
    {
      id: "CERT-2024-102",
      studentName: "Bob Smith",
      program: "Data Science",
      issueDate: "2024-03-14",
      status: "pending",
      blockchainTx: null,
    },
    {
      id: "CERT-2024-103",
      studentName: "Carol Davis",
      program: "Web Development",
      issueDate: "2024-03-13",
      status: "issued",
      blockchainTx: "0x2b3c4d5e6f7a...",
    },
  ]

  const verificationLogs = [
    {
      id: "VER-001",
      certificateId: "CERT-2024-101",
      verifierType: "Employer",
      verifierName: "Tech Corp HR",
      timestamp: "2024-03-16 10:30 AM",
      result: "verified",
    },
    {
      id: "VER-002",
      certificateId: "CERT-2024-103",
      verifierType: "Student",
      verifierName: "Carol Davis",
      timestamp: "2024-03-15 02:15 PM",
      result: "verified",
    },
    {
      id: "VER-003",
      certificateId: "CERT-2023-099",
      verifierType: "Employer",
      verifierName: "StartupXYZ",
      timestamp: "2024-03-14 09:45 AM",
      result: "failed",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "issued":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Issued
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
            <AlertCircle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getVerificationBadge = (result: string) => {
    switch (result) {
      case "verified":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        )
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <AlertCircle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">AuthScan</span>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Tech University</span>
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Institution Portal</h1>
          <p className="text-muted-foreground">Manage certificate issuance and track verification analytics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Issued</p>
                  <p className="text-2xl font-bold">1,247</p>
                  <p className="text-xs text-green-600">+12% this month</p>
                </div>
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Verifications</p>
                  <p className="text-2xl font-bold">3,891</p>
                  <p className="text-xs text-green-600">+8% this month</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Students</p>
                  <p className="text-2xl font-bold">892</p>
                  <p className="text-xs text-blue-600">Current semester</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold">98.5%</p>
                  <p className="text-xs text-green-600">Verification rate</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="batch-upload">Batch Upload</TabsTrigger>
            <TabsTrigger value="single-issue">Issue Certificate</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="api-docs">API Integration</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Certificates */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Recent Certificates</CardTitle>
                  <CardDescription>Latest certificate issuances</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentCertificates.map((cert) => (
                      <div key={cert.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{cert.studentName}</p>
                          <p className="text-sm text-muted-foreground">{cert.program}</p>
                          <p className="text-xs text-muted-foreground">{cert.id}</p>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(cert.status)}
                          <p className="text-xs text-muted-foreground mt-1">{cert.issueDate}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    View All Certificates
                  </Button>
                </CardContent>
              </Card>

              {/* Verification Logs */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Verification Activity</CardTitle>
                  <CardDescription>Recent verification requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {verificationLogs.map((log) => (
                      <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{log.verifierName}</p>
                          <p className="text-sm text-muted-foreground">{log.verifierType}</p>
                          <p className="text-xs text-muted-foreground">{log.certificateId}</p>
                        </div>
                        <div className="text-right">
                          {getVerificationBadge(log.result)}
                          <p className="text-xs text-muted-foreground mt-1">{log.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    View All Logs
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Batch Upload Tab */}
          <TabsContent value="batch-upload" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Batch Certificate Upload</CardTitle>
                <CardDescription>Upload multiple certificates using CSV format</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center">
                  <FileSpreadsheet className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Upload CSV File</h3>
                  <p className="text-muted-foreground mb-4">
                    Upload a CSV file containing certificate data for batch processing
                  </p>
                  <Button>
                    <Upload className="w-4 h-4 mr-2" />
                    Choose CSV File
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Required columns: student_name, student_email, program, issue_date, certificate_hash
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Button variant="outline" className="bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Download Template
                  </Button>
                  <Button variant="outline" className="bg-transparent">
                    <Eye className="w-4 h-4 mr-2" />
                    View Upload History
                  </Button>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">CSV Format Requirements:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Maximum 1000 certificates per upload</li>
                    <li>• All student emails must be valid</li>
                    <li>• Certificate hashes must be unique</li>
                    <li>• Date format: YYYY-MM-DD</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Single Issue Tab */}
          <TabsContent value="single-issue" className="space-y-6">
            {/* <Card className="glass-card">
              <CardHeader>
                <CardTitle>Issue Single Certificate</CardTitle>
                <CardDescription>Create and issue a certificate for an individual student</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentName">Student Name</Label>
                    <Input id="studentName" placeholder="Enter student's full name" />
                  </div>
                 
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="program">Program/Course</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select program" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="computer-science">Computer Science</SelectItem>
                        <SelectItem value="data-science">Data Science</SelectItem>
                        <SelectItem value="web-development">Web Development</SelectItem>
                        <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="issueDate">Issue Date</Label>
                    <Input id="issueDate" type="date" />
                  </div>
                </div>

          

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="grade">Grade/GPA (Optional)</Label>
                    <Input id="grade" placeholder="e.g., A, 3.8, Pass" />
                  </div>
               
                </div>

                <div className="flex space-x-4">
                  <Button className="flex-1">
                    <Plus className="w-4 h-4 mr-2" />
                    Issue Certificate
                  </Button>
                  <Button variant="outline" className="bg-transparent">
                    Save as Draft
                  </Button>
                </div>
              </CardContent>
            </Card> */}
            <form onSubmit={handleIssue}>
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Issue Single Certificate</CardTitle>
          <CardDescription>
            Create and issue a certificate for an individual student
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="studentName">Student Name</Label>
              <Input
                id="studentName"
                placeholder="Enter student's full name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="program">Program/Course</Label>
              <Select value={program} onValueChange={setProgram}>
                <SelectTrigger>
                  <SelectValue placeholder="Select program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="Web Development">Web Development</SelectItem>
                  <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="issueDate">Issue Date</Label>
              <Input
                id="issueDate"
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="grade">Grade/GPA (Optional)</Label>
              <Input
                id="grade"
                placeholder="e.g., A, 3.8, Pass"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <Button type="submit" className="flex-1" disabled={loading}>
              <Plus className="w-4 h-4 mr-2" />
              {loading ? "Issuing..." : "Issue Certificate"}
            </Button>
            <Button type="button" variant="outline" className="bg-transparent">
              Save as Draft
            </Button>
          </div>

          {response && (
            <pre className="bg-muted p-3 rounded-md text-sm overflow-auto">
              {JSON.stringify(response, null, 2)}
            </pre>
          )}
        </CardContent>
      </Card>
    </form>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Issuance Analytics</CardTitle>
                  <CardDescription>Certificate issuance trends over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Chart: Certificates issued per month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Verification Analytics</CardTitle>
                  <CardDescription>Certificate verification statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Chart: Verification requests over time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Program Performance</CardTitle>
                <CardDescription>Certificate issuance by program</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Program</TableHead>
                      <TableHead>Certificates Issued</TableHead>
                      <TableHead>Verifications</TableHead>
                      <TableHead>Success Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Computer Science</TableCell>
                      <TableCell>456</TableCell>
                      <TableCell>1,234</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">99.2%</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Data Science</TableCell>
                      <TableCell>321</TableCell>
                      <TableCell>987</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">98.8%</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Web Development</TableCell>
                      <TableCell>289</TableCell>
                      <TableCell>756</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">97.9%</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Cybersecurity</TableCell>
                      <TableCell>181</TableCell>
                      <TableCell>445</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">98.4%</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Integration Tab */}
          <TabsContent value="api-docs" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>ERP System Integration</CardTitle>
                <CardDescription>Connect your existing systems with AuthScan API</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">API Endpoint</h4>
                  <code className="text-sm bg-white p-2 rounded border block">
                    POST https://api.authscan.com/v1/certificates/batch
                  </code>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Authentication</h4>
                    <p className="text-sm text-muted-foreground mb-2">Include your API key in the request headers:</p>
                    <code className="text-sm bg-gray-100 p-2 rounded border block">
                      Authorization: Bearer YOUR_API_KEY
                    </code>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Request Format</h4>
                    <pre className="text-sm bg-gray-100 p-4 rounded border overflow-x-auto">
                      {`{
  "certificates": [
    {
      "student_name": "John Doe",
      "student_email": "john@example.com",
      "program": "Computer Science",
      "issue_date": "2024-03-15",
      "certificate_hash": "sha256_hash_here"
    }
  ]
}`}
                    </pre>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button>
                    <Download className="w-4 h-4 mr-2" />
                    Download SDK
                  </Button>
                  <Button variant="outline" className="bg-transparent">
                    <Eye className="w-4 h-4 mr-2" />
                    View Full Documentation
                  </Button>
                  <Button variant="outline" className="bg-transparent">
                    Generate API Key
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Integration Examples</CardTitle>
                <CardDescription>Code samples for popular ERP systems</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-20 flex flex-col bg-transparent">
                      <span className="font-semibold">Salesforce</span>
                      <span className="text-xs text-muted-foreground">Integration Guide</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col bg-transparent">
                      <span className="font-semibold">SAP</span>
                      <span className="text-xs text-muted-foreground">Integration Guide</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col bg-transparent">
                      <span className="font-semibold">Oracle</span>
                      <span className="text-xs text-muted-foreground">Integration Guide</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
