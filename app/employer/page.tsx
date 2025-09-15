import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
} from "lucide-react"
import Link from "next/link"

export default function EmployerPortal() {
  // Mock data for demonstration
  const recentVerifications = [
    {
      id: "VER-2024-001",
      candidateName: "Alice Johnson",
      certificateId: "CERT-2024-101",
      program: "Computer Science",
      institution: "Tech University",
      verificationDate: "2024-03-16",
      result: "verified",
      blockchainTx: "0x1a2b3c4d5e6f...",
    },
    {
      id: "VER-2024-002",
      candidateName: "Bob Smith",
      certificateId: "CERT-2024-102",
      program: "Data Science",
      institution: "Online Academy",
      verificationDate: "2024-03-15",
      result: "pending",
      blockchainTx: null,
    },
    {
      id: "VER-2024-003",
      candidateName: "Carol Davis",
      certificateId: "CERT-2023-099",
      program: "Web Development",
      institution: "Code Institute",
      verificationDate: "2024-03-14",
      result: "failed",
      blockchainTx: null,
    },
  ]

  const bulkVerifications = [
    {
      id: "BULK-001",
      fileName: "candidates_march_2024.csv",
      uploadDate: "2024-03-16",
      totalCertificates: 25,
      verified: 23,
      failed: 2,
      status: "completed",
    },
    {
      id: "BULK-002",
      fileName: "new_hires_batch.csv",
      uploadDate: "2024-03-15",
      totalCertificates: 12,
      verified: 8,
      failed: 0,
      status: "processing",
    },
  ]

  const getVerificationBadge = (result: string) => {
    switch (result) {
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

  const getBulkStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        )
      case "processing":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            <Clock className="w-3 h-3 mr-1" />
            Processing
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
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">AuthScan</span>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">TechCorp HR</span>
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
          <h1 className="text-3xl font-bold mb-2">Employer Portal</h1>
          <p className="text-muted-foreground">Verify candidate credentials with confidence and speed</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Verifications</p>
                  <p className="text-2xl font-bold">1,847</p>
                  <p className="text-xs text-green-600">+15% this month</p>
                </div>
                <Search className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Verified</p>
                  <p className="text-2xl font-bold text-green-600">1,721</p>
                  <p className="text-xs text-green-600">93.2% success rate</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Failed</p>
                  <p className="text-2xl font-bold text-red-600">126</p>
                  <p className="text-xs text-red-600">6.8% failure rate</p>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Time</p>
                  <p className="text-2xl font-bold">2.3s</p>
                  <p className="text-xs text-blue-600">Verification speed</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="verify" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="verify">Quick Verify</TabsTrigger>
            <TabsTrigger value="qr-scanner">QR Scanner</TabsTrigger>
            <TabsTrigger value="bulk-verify">Bulk Verify</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Quick Verify Tab */}
          <TabsContent value="verify" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Certificate ID Verification */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Verify by Certificate ID</CardTitle>
                  <CardDescription>Enter the certificate ID to verify authenticity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="certificateId">Certificate ID</Label>
                    <div className="flex space-x-2">
                      <Input id="certificateId" placeholder="e.g., CERT-2024-001" className="flex-1" />
                      <Button>
                        <Search className="w-4 h-4 mr-2" />
                        Verify
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>• Certificate ID is usually found on the certificate document</p>
                    <p>• Format: CERT-YYYY-XXX (e.g., CERT-2024-001)</p>
                  </div>
                </CardContent>
              </Card>

              {/* PDF Upload Verification */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Verify by Document Upload</CardTitle>
                  <CardDescription>Upload certificate PDF to verify hash</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">Drag and drop certificate PDF here</p>
                    <Button size="sm">Choose File</Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>• Supported format: PDF only</p>
                    <p>• Maximum file size: 10MB</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Verification Result */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Verification Result</CardTitle>
                <CardDescription>Latest verification details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-green-800">Certificate Verified</h3>
                        <p className="text-sm text-muted-foreground">Verification completed successfully</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">Authentic</Badge>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Certificate ID</p>
                      <p className="font-medium">CERT-2024-101</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Student Name</p>
                      <p className="font-medium">Alice Johnson</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Program</p>
                      <p className="font-medium">Bachelor of Computer Science</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Institution</p>
                      <p className="font-medium">Tech University</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Issue Date</p>
                      <p className="font-medium">January 15, 2024</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Blockchain TX</p>
                      <p className="font-medium font-mono text-xs">0x1a2b3c4d5e6f...</p>
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <Button size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                    <Button size="sm" variant="outline" className="bg-transparent">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* QR Scanner Tab */}
          <TabsContent value="qr-scanner" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>QR Code Scanner</CardTitle>
                <CardDescription>Scan QR codes from certificates for instant verification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 mb-4">Camera view will appear here</p>
                        <Button>
                          <Camera className="w-4 h-4 mr-2" />
                          Start Camera
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>• Position the QR code within the camera frame</p>
                      <p>• Ensure good lighting for best results</p>
                      <p>• Verification happens automatically</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Alternative Options</h3>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload QR Code Image
                        </Button>
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                          <Hash className="w-4 h-4 mr-2" />
                          Enter QR Code Manually
                        </Button>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">QR Code Benefits</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Instant verification in seconds</li>
                        <li>• No typing required</li>
                        <li>• Works with mobile devices</li>
                        <li>• Tamper-proof verification</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bulk Verify Tab */}
          <TabsContent value="bulk-verify" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Bulk Certificate Verification</CardTitle>
                <CardDescription>Upload CSV file to verify multiple certificates at once</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Upload CSV File</h3>
                  <p className="text-muted-foreground mb-4">
                    Upload a CSV file containing certificate IDs for batch verification
                  </p>
                  <Button>
                    <Upload className="w-4 h-4 mr-2" />
                    Choose CSV File
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">Required columns: candidate_name, certificate_id</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Button variant="outline" className="bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Download Template
                  </Button>
                  <Button variant="outline" className="bg-transparent">
                    <Eye className="w-4 h-4 mr-2" />
                    View Processing Queue
                  </Button>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Bulk Verification Limits</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Maximum 500 certificates per upload</li>
                    <li>• Processing time: ~1-2 minutes per 100 certificates</li>
                    <li>• Results available for download after completion</li>
                    <li>• Email notification when processing is complete</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Bulk Verification History */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Bulk Verification History</CardTitle>
                <CardDescription>Recent batch verification jobs</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>File Name</TableHead>
                      <TableHead>Upload Date</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Verified</TableHead>
                      <TableHead>Failed</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bulkVerifications.map((bulk) => (
                      <TableRow key={bulk.id}>
                        <TableCell className="font-medium">{bulk.fileName}</TableCell>
                        <TableCell>{bulk.uploadDate}</TableCell>
                        <TableCell>{bulk.totalCertificates}</TableCell>
                        <TableCell className="text-green-600">{bulk.verified}</TableCell>
                        <TableCell className="text-red-600">{bulk.failed}</TableCell>
                        <TableCell>{getBulkStatusBadge(bulk.status)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-1" />
                              Results
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Verification History</CardTitle>
                <CardDescription>All certificate verification records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex space-x-2">
                    <Input placeholder="Search by candidate name..." className="w-64" />
                    <Button variant="outline" className="bg-transparent">
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button variant="outline" className="bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Export All
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Candidate</TableHead>
                      <TableHead>Certificate</TableHead>
                      <TableHead>Institution</TableHead>
                      <TableHead>Verification Date</TableHead>
                      <TableHead>Result</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentVerifications.map((verification) => (
                      <TableRow key={verification.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{verification.candidateName}</p>
                            <p className="text-sm text-muted-foreground">{verification.id}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{verification.program}</p>
                            <p className="text-sm text-muted-foreground">{verification.certificateId}</p>
                          </div>
                        </TableCell>
                        <TableCell>{verification.institution}</TableCell>
                        <TableCell>{verification.verificationDate}</TableCell>
                        <TableCell>{getVerificationBadge(verification.result)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            {verification.result === "verified" && (
                              <Button size="sm" variant="outline">
                                <Download className="w-4 h-4 mr-1" />
                                Report
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Verification Analytics</CardTitle>
                  <CardDescription>Monthly verification trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Chart: Verifications over time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Institution Breakdown</CardTitle>
                  <CardDescription>Certificates by institution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Building className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Chart: Institution distribution</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Generate Custom Report</CardTitle>
                <CardDescription>Create detailed verification reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input id="startDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input id="endDate" type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reportNotes">Report Notes (Optional)</Label>
                  <Textarea id="reportNotes" placeholder="Add any notes for this report..." rows={3} />
                </div>

                <div className="flex space-x-4">
                  <Button>
                    <Download className="w-4 h-4 mr-2" />
                    Generate PDF Report
                  </Button>
                  <Button variant="outline" className="bg-transparent">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate CSV Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
