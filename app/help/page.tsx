import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Shield, Search, BookOpen, MessageSquare, Users, Building, FileText, HelpCircle } from "lucide-react"
import Link from "next/link"

export default function HelpPage() {
  const categories = [
    {
      icon: Users,
      title: "Getting Started",
      description: "Learn the basics of using AuthScan",
      articles: 12,
    },
    {
      icon: FileText,
      title: "Certificate Verification",
      description: "How to verify certificates",
      articles: 8,
    },
    {
      icon: Building,
      title: "Institution Setup",
      description: "Setting up your institution account",
      articles: 6,
    },
    {
      icon: Shield,
      title: "Security & Privacy",
      description: "Understanding our security measures",
      articles: 5,
    },
    {
      icon: MessageSquare,
      title: "API Documentation",
      description: "Integration guides and API reference",
      articles: 15,
    },
    {
      icon: HelpCircle,
      title: "Troubleshooting",
      description: "Common issues and solutions",
      articles: 10,
    },
  ]

  const popularArticles = [
    "How to verify a certificate using AuthScan",
    "Setting up your institution account",
    "Understanding blockchain verification",
    "API integration guide for developers",
    "Troubleshooting verification failures",
    "Managing user permissions",
  ]

  const faqs = [
    {
      question: "How does AuthScan verify certificates?",
      answer:
        "AuthScan uses blockchain technology to verify certificates. When an institution issues a certificate, a cryptographic hash is stored on the blockchain. When someone wants to verify a certificate, we compare the document's hash with the blockchain record to confirm authenticity.",
    },
    {
      question: "Is my data secure with AuthScan?",
      answer:
        "Yes, security is our top priority. We use enterprise-grade encryption, secure blockchain storage, and follow industry best practices for data protection. Personal information is never stored on the blockchain - only cryptographic hashes of certificates.",
    },
    {
      question: "How long does verification take?",
      answer:
        "Certificate verification is typically completed within 2-3 seconds. The process is automated and happens in real-time when you submit a certificate for verification.",
    },
    {
      question: "Can I verify certificates offline?",
      answer:
        "No, certificate verification requires an internet connection to access the blockchain records. However, once verified, you can download a verification report for offline use.",
    },
    {
      question: "What file formats are supported?",
      answer:
        "AuthScan supports PDF files for certificate uploads. The maximum file size is 10MB. We're working on adding support for additional formats in future updates.",
    },
    {
      question: "How much does AuthScan cost?",
      answer:
        "AuthScan offers different pricing tiers based on usage. Students can verify certificates for free, while institutions and employers have subscription plans. Contact our sales team for enterprise pricing.",
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
              <Link href="/about" className="text-foreground hover:text-primary transition-colors">
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
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Help Center</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Find answers to your questions and learn how to make the most of AuthScan
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search for help articles, guides, and FAQs..." className="pl-12 py-6 text-lg" />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Browse by Category</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="glass-card hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{category.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                      <Badge variant="secondary">{category.articles} articles</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular Articles */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Popular Articles</CardTitle>
              <CardDescription>Most viewed help articles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {popularArticles.map((article, index) => (
                  <Link
                    key={index}
                    href="#"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span className="text-sm">{article}</span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and resources</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/student">
                  <Users className="w-4 h-4 mr-3" />
                  Verify a Certificate
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/institution">
                  <Building className="w-4 h-4 mr-3" />
                  Issue Certificates
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/contact">
                  <MessageSquare className="w-4 h-4 mr-3" />
                  Contact Support
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <FileText className="w-4 h-4 mr-3" />
                Download User Guide
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Quick answers to common questions about AuthScan</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card className="glass-card mt-16">
          <CardContent className="p-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help you with any questions or issues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
              <Button variant="outline" className="bg-transparent">
                <MessageSquare className="w-4 h-4 mr-2" />
                Live Chat
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
