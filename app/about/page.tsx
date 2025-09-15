import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, CheckCircle, Globe, Lock, Zap } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      bio: "Former blockchain engineer at major tech companies with 10+ years in cryptographic systems.",
    },
    {
      name: "Michael Rodriguez",
      role: "CTO & Co-Founder",
      bio: "Expert in distributed systems and educational technology with multiple patents in verification systems.",
    },
    {
      name: "Dr. Emily Watson",
      role: "Head of Security",
      bio: "PhD in Cryptography, former security researcher with extensive experience in blockchain security.",
    },
    {
      name: "David Kim",
      role: "Head of Product",
      bio: "Product leader with deep experience in EdTech and enterprise software solutions.",
    },
  ]

  const values = [
    {
      icon: Lock,
      title: "Security First",
      description: "Every aspect of our platform is built with security as the foundation, not an afterthought.",
    },
    {
      icon: CheckCircle,
      title: "Trust & Transparency",
      description: "We believe in complete transparency in our verification processes and blockchain operations.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Continuously pushing the boundaries of what's possible in certificate verification technology.",
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Making credential verification accessible and reliable for institutions and employers worldwide.",
    },
  ]

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
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-primary font-medium">
                About
              </Link>
              <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </Link>
              <Button variant="outline" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">About AuthScan</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Revolutionizing Certificate
            <span className="text-primary"> Verification</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            We're building the future of credential verification through blockchain technology, making it impossible to
            forge certificates while keeping verification instant and accessible.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="glass-card mb-16">
          <CardContent className="p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  To eliminate certificate fraud and create a world where educational and professional credentials can
                  be verified instantly, securely, and transparently by anyone, anywhere.
                </p>
                <p className="text-muted-foreground mb-6">
                  Every year, millions of fake certificates circulate globally, undermining trust in legitimate
                  credentials and creating unfair advantages. AuthScan solves this problem by leveraging blockchain
                  technology to create an immutable, transparent verification system.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">99.9%</p>
                    <p className="text-sm text-muted-foreground">Accuracy Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">2.3s</p>
                    <p className="text-sm text-muted-foreground">Avg Verification</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">50+</p>
                    <p className="text-sm text-muted-foreground">Countries</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 text-center">
                <Shield className="h-24 w-24 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Blockchain-Secured</h3>
                <p className="text-muted-foreground">
                  Every certificate is cryptographically secured and stored on an immutable blockchain ledger.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Values Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at AuthScan
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="glass-card text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experienced professionals dedicated to transforming credential verification
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="glass-card">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-primary mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Story Section */}
        <Card className="glass-card mb-16">
          <CardContent className="p-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="mb-6">
                  AuthScan was founded in 2023 when our co-founders, Sarah and Michael, witnessed firsthand the
                  devastating impact of certificate fraud in the hiring process. While working at a major technology
                  company, they discovered that nearly 15% of job applicants had submitted fraudulent educational
                  credentials.
                </p>
                <p className="mb-6">
                  This revelation sparked a mission: to create a verification system that would make certificate fraud
                  impossible while keeping the verification process simple and accessible. After months of research and
                  development, they developed the first prototype of AuthScan's blockchain-based verification system.
                </p>
                <p className="mb-6">
                  Today, AuthScan serves thousands of institutions, employers, and students worldwide, processing over
                  100,000 verifications monthly. Our platform has prevented countless cases of credential fraud and has
                  become the gold standard for certificate authenticity verification.
                </p>
                <p>
                  We're just getting started. Our vision is to create a world where every educational and professional
                  achievement can be verified instantly, creating a more trustworthy and fair global job market.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="glass-card">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of institutions and employers who trust AuthScan for secure certificate verification
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/register">Start Verifying</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent" asChild>
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
