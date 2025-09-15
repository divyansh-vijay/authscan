import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Check, X, Users, Building, Briefcase, Zap } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const plans = [
    {
      name: "Student",
      price: "Free",
      description: "Perfect for individual students",
      icon: Users,
      color: "bg-blue-100 text-blue-600",
      features: [
        "Up to 5 certificate verifications per month",
        "Basic verification reports",
        "QR code generation",
        "Email support",
        "Mobile app access",
      ],
      limitations: ["No bulk verification", "Limited API access", "Standard support only"],
      cta: "Get Started Free",
      popular: false,
    },
    {
      name: "Institution",
      price: "$99",
      period: "/month",
      description: "For educational institutions",
      icon: Building,
      color: "bg-green-100 text-green-600",
      features: [
        "Unlimited certificate issuance",
        "Batch certificate uploads",
        "Advanced analytics dashboard",
        "API integration",
        "Priority support",
        "Custom branding",
        "ERP system integration",
        "Dedicated account manager",
      ],
      limitations: [],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Employer",
      price: "$49",
      period: "/month",
      description: "For HR teams and employers",
      icon: Briefcase,
      color: "bg-purple-100 text-purple-600",
      features: [
        "Up to 500 verifications per month",
        "Bulk verification tools",
        "Advanced verification reports",
        "QR code scanning",
        "Team collaboration",
        "Export capabilities",
        "Priority support",
      ],
      limitations: ["Cannot issue certificates", "Limited to verification only"],
      cta: "Start Free Trial",
      popular: false,
    },
  ]

  const enterpriseFeatures = [
    "Custom verification workflows",
    "White-label solutions",
    "Dedicated infrastructure",
    "24/7 premium support",
    "Custom SLA agreements",
    "Advanced security features",
    "Multi-region deployment",
    "Custom integrations",
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
              <Link href="/pricing" className="text-primary font-medium">
                Pricing
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Simple, Transparent
            <span className="text-primary"> Pricing</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Choose the plan that fits your needs. All plans include our core verification technology with no hidden
            fees.
          </p>
          <Badge className="bg-green-100 text-green-800 border-green-200">
            14-day free trial • No credit card required
          </Badge>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`glass-card relative ${plan.popular ? "ring-2 ring-primary shadow-lg scale-105" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                </div>
              )}
              <CardHeader className="text-center pb-8">
                <div className={`w-16 h-16 ${plan.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <plan.icon className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation, limitationIndex) => (
                    <div key={limitationIndex} className="flex items-start space-x-3">
                      <X className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{limitation}</span>
                    </div>
                  ))}
                </div>
                <Button className={`w-full ${plan.popular ? "" : "variant-outline bg-transparent"}`} asChild>
                  <Link href="/register">{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enterprise Section */}
        <Card className="glass-card mb-16">
          <CardContent className="p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mb-6">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Enterprise Solutions</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Need a custom solution for your organization? Our enterprise plans offer unlimited scalability,
                  dedicated support, and custom integrations.
                </p>
                <div className="flex space-x-4">
                  <Button asChild>
                    <Link href="/contact">Contact Sales</Link>
                  </Button>
                  <Button variant="outline" className="bg-transparent">
                    Schedule Demo
                  </Button>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Enterprise Features</h3>
                <div className="grid grid-cols-1 gap-3">
                  {enterpriseFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="glass-card mb-16">
          <CardHeader>
            <CardTitle className="text-center">Pricing FAQ</CardTitle>
            <CardDescription className="text-center">Common questions about our pricing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll
                    prorate any billing differences.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Is there a setup fee?</h3>
                  <p className="text-sm text-muted-foreground">
                    No setup fees for any of our standard plans. Enterprise customers may have custom setup costs
                    depending on their requirements.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                  <p className="text-sm text-muted-foreground">
                    We accept all major credit cards, PayPal, and bank transfers for enterprise customers. All payments
                    are processed securely.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Do you offer discounts for nonprofits?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes, we offer special pricing for educational institutions and nonprofit organizations. Contact our
                    sales team for details.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">What happens if I exceed my plan limits?</h3>
                  <p className="text-sm text-muted-foreground">
                    We'll notify you when you're approaching your limits. You can upgrade your plan or purchase
                    additional verification credits as needed.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Is there a long-term contract required?</h3>
                  <p className="text-sm text-muted-foreground">
                    No long-term contracts required. All plans are month-to-month, and you can cancel anytime.
                    Enterprise plans may have custom terms.
                  </p>
                </div>
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
                <Link href="/register">Start Free Trial</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent" asChild>
                <Link href="/contact">Talk to Sales</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
