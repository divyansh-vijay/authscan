import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  Users,
  Building,
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  Settings,
  Activity,
  Database,
  Server,
  Zap,
} from "lucide-react"
import Link from "next/link"

export default function AdminPanel() {
  // Mock data for demonstration
  const systemStats = {
    totalUsers: 15847,
    totalInstitutions: 342,
    totalCertificates: 89234,
    totalVerifications: 234567,
    systemUptime: 99.9,
    avgResponseTime: 1.2,
  }

  const recentUsers = [
    {
      id: "USR-001",
      name: "Alice Johnson",
      email: "alice@example.com",
      type: "Student",
      joinDate: "2024-03-15",
      status: "active",
      lastLogin: "2024-03-16 10:30 AM",
    },
    {
      id: "USR-002",
      name: "Tech University",
      email: "admin@techuni.edu",
      type: "Institution",
      joinDate: "2024-03-10",
      status: "active",
      lastLogin: "2024-03-16 09:15 AM",
    },
    {
      id: "USR-003",
      name: "TechCorp HR",
      email: "hr@techcorp.com",
      type: "Employer",
      joinDate: "2024-03-12",
      status: "pending",
      lastLogin: "Never",
    },
  ]

  const verificationLogs = [
    {
      id: "LOG-001",
      timestamp: "2024-03-16 10:45 AM",
      action: "Certificate Verified",
      user: "TechCorp HR",
      certificateId: "CERT-2024-101",
      result: "success",
      responseTime: "1.2s",
    },
    {
      id: "LOG-002",
      timestamp: "2024-03-16 10:30 AM",
      action: "Certificate Issued",
      user: "Tech University",
      certificateId: "CERT-2024-105",
      result: "success",
      responseTime: "0.8s",
    },
    {
      id: "LOG-003",
      timestamp: "2024-03-16 10:15 AM",
      action: "Verification Failed",
      user: "StartupXYZ",
      certificateId: "CERT-2023-099",
      result: "failed",
      responseTime: "2.1s",
    },
  ]

  const institutions = [
    {
      id: "INST-001",
      name: "Tech University",
      email: "admin@techuni.edu",
      certificatesIssued: 1247,
      verificationRate: 98.5,
      status: "active",
      joinDate: "2023-01-15",
    },
    {
      id: "INST-002",
      name: "Online Academy",
      email: "admin@onlineacademy.com",
      certificatesIssued: 892,
      verificationRate: 97.2,
      status: "active",
      joinDate: "2023-03-20",
    },
    {
      id: "INST-003",
      name: "Code Institute",
      email: "admin@codeinstitute.org",
      certificatesIssued: 456,
      verificationRate: 99.1,
      status: "suspended",
      joinDate: "2023-06-10",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "suspended":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <XCircle className="w-3 h-3 mr-1" />
            Suspended
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getResultBadge = (result: string) => {
    switch (result) {
      case "success":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Success
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
              <Badge className="bg-red-100 text-red-800 border-red-200 ml-2">Admin</Badge>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">System Administrator</span>
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
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">System overview and management controls</p>
        </div>

        {/* System Health Cards */}
        <div className="grid md:grid-cols-6 gap-6 mb-8">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{systemStats.totalUsers.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Institutions</p>
                  <p className="text-2xl font-bold">{systemStats.totalInstitutions}</p>
                </div>
                <Building className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Certificates</p>
                  <p className="text-2xl font-bold">{systemStats.totalCertificates.toLocaleString()}</p>
                </div>
                <FileText className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Verifications</p>
                  <p className="text-2xl font-bold">{systemStats.totalVerifications.toLocaleString()}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Uptime</p>
                  <p className="text-2xl font-bold">{systemStats.systemUptime}%</p>
                </div>
                <Server className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Response</p>
                  <p className="text-2xl font-bold">{systemStats.avgResponseTime}s</p>
                </div>
                <Zap className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="institutions">Institutions</TabsTrigger>
            <TabsTrigger value="logs">System Logs</TabsTrigger>
            <TabsTrigger value="health">System Health</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest system activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {verificationLogs.slice(0, 5).map((log) => (
                      <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{log.action}</p>
                          <p className="text-sm text-muted-foreground">{log.user}</p>
                          <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                        </div>
                        <div className="text-right">
                          {getResultBadge(log.result)}
                          <p className="text-xs text-muted-foreground mt-1">{log.responseTime}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* System Alerts */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>System Alerts</CardTitle>
                  <CardDescription>Important notifications and warnings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-yellow-800">High Verification Volume</p>
                        <p className="text-sm text-yellow-700">
                          Verification requests increased by 45% in the last hour
                        </p>
                        <p className="text-xs text-yellow-600">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                      <Activity className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-800">New Institution Registered</p>
                        <p className="text-sm text-blue-700">Global University has joined the platform</p>
                        <p className="text-xs text-blue-600">1 hour ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-green-800">System Update Complete</p>
                        <p className="text-sm text-green-700">Security patches applied successfully</p>
                        <p className="text-xs text-green-600">3 hours ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Platform Analytics</CardTitle>
                <CardDescription>Key performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                      <TrendingUp className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="font-semibold">Daily Verifications</p>
                    <p className="text-sm text-muted-foreground">Trend over 30 days</p>
                  </div>
                  <div className="text-center">
                    <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                      <Users className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="font-semibold">User Growth</p>
                    <p className="text-sm text-muted-foreground">New registrations</p>
                  </div>
                  <div className="text-center">
                    <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                      <Database className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="font-semibold">Storage Usage</p>
                    <p className="text-sm text-muted-foreground">Certificate data</p>
                  </div>
                  <div className="text-center">
                    <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                      <Activity className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="font-semibold">API Usage</p>
                    <p className="text-sm text-muted-foreground">Requests per hour</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage all platform users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex space-x-2">
                    <Input placeholder="Search users..." className="w-64" />
                    <Select>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="institution">Institution</SelectItem>
                        <SelectItem value="employer">Employer</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" className="bg-transparent">
                      <Filter className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.type}</Badge>
                        </TableCell>
                        <TableCell>{user.joinDate}</TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="w-4 h-4" />
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

          {/* Institutions Tab */}
          <TabsContent value="institutions" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Institution Management</CardTitle>
                <CardDescription>Manage educational institutions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex space-x-2">
                    <Input placeholder="Search institutions..." className="w-64" />
                    <Button variant="outline" className="bg-transparent">
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Institution
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Institution</TableHead>
                      <TableHead>Certificates Issued</TableHead>
                      <TableHead>Verification Rate</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {institutions.map((institution) => (
                      <TableRow key={institution.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{institution.name}</p>
                            <p className="text-sm text-muted-foreground">{institution.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{institution.certificatesIssued.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={institution.verificationRate} className="w-16 h-2" />
                            <span className="text-sm">{institution.verificationRate}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{institution.joinDate}</TableCell>
                        <TableCell>{getStatusBadge(institution.status)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Settings className="w-4 h-4" />
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

          {/* System Logs Tab */}
          <TabsContent value="logs" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>System Logs</CardTitle>
                <CardDescription>Detailed system activity logs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex space-x-2">
                    <Input placeholder="Search logs..." className="w-64" />
                    <Select>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" className="bg-transparent">
                      <Filter className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button variant="outline" className="bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Export Logs
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Certificate ID</TableHead>
                      <TableHead>Result</TableHead>
                      <TableHead>Response Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {verificationLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell>{log.user}</TableCell>
                        <TableCell className="font-mono text-sm">{log.certificateId}</TableCell>
                        <TableCell>{getResultBadge(log.result)}</TableCell>
                        <TableCell>{log.responseTime}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Health Tab */}
          <TabsContent value="health" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Server Status</CardTitle>
                  <CardDescription>Real-time server health metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>CPU Usage</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={45} className="w-24 h-2" />
                      <span className="text-sm">45%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Memory Usage</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={67} className="w-24 h-2" />
                      <span className="text-sm">67%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Disk Usage</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={23} className="w-24 h-2" />
                      <span className="text-sm">23%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Network I/O</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={34} className="w-24 h-2" />
                      <span className="text-sm">34%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Database Status</CardTitle>
                  <CardDescription>Database performance metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Connection Pool</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={78} className="w-24 h-2" />
                      <span className="text-sm">78/100</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Query Performance</span>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-100 text-green-800">Optimal</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Storage Used</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={56} className="w-24 h-2" />
                      <span className="text-sm">56%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Backup Status</span>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-100 text-green-800">Up to date</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>System performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Activity className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Performance charts would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>System Configuration</CardTitle>
                  <CardDescription>Core system settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="maxVerifications">Max Verifications per Hour</Label>
                    <Input id="maxVerifications" type="number" defaultValue="10000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input id="sessionTimeout" type="number" defaultValue="30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxFileSize">Max File Size (MB)</Label>
                    <Input id="maxFileSize" type="number" defaultValue="10" />
                  </div>
                  <Button>Save Configuration</Button>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Security and access controls</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">IP Whitelist</p>
                      <p className="text-sm text-muted-foreground">Restrict admin access by IP</p>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Audit Logging</p>
                      <p className="text-sm text-muted-foreground">Log all admin actions</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <Button>Update Security Settings</Button>
                </CardContent>
              </Card>
            </div>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Maintenance</CardTitle>
                <CardDescription>System maintenance and backup controls</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col bg-transparent">
                    <Database className="h-6 w-6 mb-2" />
                    <span>Backup Database</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col bg-transparent">
                    <Settings className="h-6 w-6 mb-2" />
                    <span>System Update</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col bg-transparent">
                    <Activity className="h-6 w-6 mb-2" />
                    <span>Clear Cache</span>
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
