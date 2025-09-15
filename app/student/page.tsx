import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Upload, CheckCircle, XCircle, Clock, QrCode, Download, FileText, Shield, Plus, Eye } from "lucide-react"
import Link from "next/link"

export default function StudentPortal() {
  // Mock data for demonstration
  const certificates = [
    {
      id: "CERT-2024-001",
      name: "Bachelor of Computer Science",
      institution: "Tech University",
      issueDate: "2024-01-15",
      status: "verified",
      verificationDate: "2024-01-16",
      blockchainTx: "0x1a2b3c4d5e6f...",
    },
    {
      id: "CERT-2024-002",
      name: "Data Science Certificate",
      institution: "Online Academy",
      issueDate: "2024-02-20",
      status: "pending",
      verificationDate: null,
      blockchainTx: null,
    },
    {
      id: "CERT-2023-003",
      name: "Web Development Bootcamp",
      institution: "Code Institute",
      issueDate: "2023-12-10",
      status: "failed",
      verificationDate: "2023-12-11",
      blockchainTx: null,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
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
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">AuthScan</span>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Welcome, John Doe</span>
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
          <h1 className="text-3xl font-bold mb-2">Student Portal</h1>
          <p className="text-muted-foreground">Manage and verify your certificates with blockchain security</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Certificates</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Verified</p>
                  <p className="text-2xl font-bold text-green-600">1</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">1</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Failed</p>
                  <p className="text-2xl font-bold text-red-600">1</p>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="upload">Upload Certificate</TabsTrigger>
            <TabsTrigger value="verify">Verify Status</TabsTrigger>
            <TabsTrigger value="qr-codes">QR Codes</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Certificate History</CardTitle>
                <CardDescription>View and manage all your certificates</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Certificate</TableHead>
                      <TableHead>Institution</TableHead>
                      <TableHead>Issue Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {certificates.map((cert) => (
                      <TableRow key={cert.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{cert.name}</p>
                            <p className="text-sm text-muted-foreground">{cert.id}</p>
                          </div>
                        </TableCell>
                        <TableCell>{cert.institution}</TableCell>
                        <TableCell>{cert.issueDate}</TableCell>
                        <TableCell>{getStatusBadge(cert.status)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            {cert.status === "verified" && (
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

          {/* Upload Certificate Tab */}
          <TabsContent value="upload" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Upload New Certificate</CardTitle>
                <CardDescription>Upload your certificate for blockchain verification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Upload Certificate</h3>
                  <p className="text-muted-foreground mb-4">
                    Drag and drop your certificate file here, or click to browse
                  </p>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Choose File
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">Supported formats: PDF, JPG, PNG (Max 10MB)</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Certificate Name</label>
                    <input
                      type="text"
                      className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
                      placeholder="e.g., Bachelor of Science"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Institution</label>
                    <input
                      type="text"
                      className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
                      placeholder="e.g., University Name"
                    />
                  </div>
                </div>

                <Button className="w-full">Upload & Verify Certificate</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Verify Status Tab */}
          <TabsContent value="verify" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Verification Status</CardTitle>
                <CardDescription>Track the verification progress of your certificates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {certificates.map((cert) => (
                  <div key={cert.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{cert.name}</h3>
                        <p className="text-sm text-muted-foreground">{cert.id}</p>
                      </div>
                      {getStatusBadge(cert.status)}
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Verification Progress</span>
                        <span>{cert.status === "verified" ? "100%" : cert.status === "pending" ? "50%" : "0%"}</span>
                      </div>
                      <Progress
                        value={cert.status === "verified" ? 100 : cert.status === "pending" ? 50 : 0}
                        className="h-2"
                      />
                    </div>

                    {cert.status === "verified" && cert.blockchainTx && (
                      <div className="mt-3 p-3 bg-green-50 rounded-md">
                        <p className="text-sm text-green-800">
                          <strong>Blockchain Transaction:</strong> {cert.blockchainTx}
                        </p>
                        <p className="text-sm text-green-800">
                          <strong>Verified on:</strong> {cert.verificationDate}
                        </p>
                      </div>
                    )}

                    {cert.status === "failed" && (
                      <div className="mt-3 p-3 bg-red-50 rounded-md">
                        <p className="text-sm text-red-800">
                          Certificate could not be verified. Please check with your institution.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* QR Codes Tab */}
          <TabsContent value="qr-codes" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>QR Code Generator</CardTitle>
                <CardDescription>Generate QR codes for easy certificate sharing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {certificates
                    .filter((cert) => cert.status === "verified")
                    .map((cert) => (
                      <div key={cert.id} className="border rounded-lg p-4">
                        <div className="text-center">
                          <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <QrCode className="h-16 w-16 text-gray-400" />
                          </div>
                          <h3 className="font-semibold mb-1">{cert.name}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{cert.id}</p>
                          <div className="space-y-2">
                            <Button size="sm" className="w-full">
                              <Download className="w-4 h-4 mr-2" />
                              Download QR
                            </Button>
                            <Button size="sm" variant="outline" className="w-full bg-transparent">
                              Share Link
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {certificates.filter((cert) => cert.status === "verified").length === 0 && (
                  <div className="text-center py-8">
                    <QrCode className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No verified certificates available for QR code generation</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
