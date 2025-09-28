// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Separator } from "@/components/ui/separator"
// import { Shield, Mail, Lock, User, Building } from "lucide-react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"

// export default function RegisterPage() {
//   const router = useRouter()
//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     role: "",
//     organization: "",
//     password: "",
//     confirmPassword: "",
//   })
//   const [loading, setLoading] = useState(false)

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.id]: e.target.value })
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (form.password !== form.confirmPassword) {
//       alert("Passwords do not match!")
//       return
//     }
//     setLoading(true)
//     try {
//       const res = await fetch("/api/auth", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           firstName: form.firstName,
//           lastName: form.lastName,
//           email: form.email,
//           password: form.password,
//           organization: form.organization,
//           role: form.role, // user or institute
//         }),
//       })

//       if (res.ok) {
//         router.push("/login")
//       } else {
//         const data = await res.json()
//         alert(data.error || "Something went wrong")
//       }
//     } catch (error) {
//       console.error(error)
//       alert("Error registering")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
//       <Card className="glass-card w-full max-w-md">
//         <CardHeader className="text-center">
//           <div className="flex items-center justify-center space-x-2 mb-4">
//             <Shield className="h-8 w-8 text-primary" />
//             <span className="text-2xl font-bold text-primary">AuthScan</span>
//           </div>
//           <CardTitle className="text-2xl">Create Account</CardTitle>
//           <CardDescription>Join AuthScan to verify your certificates</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="firstName">First Name</Label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input id="firstName" value={form.firstName} onChange={handleChange} placeholder="John" className="pl-10" />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="lastName">Last Name</Label>
//                 <Input id="lastName" value={form.lastName} onChange={handleChange} placeholder="Doe" />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                 <Input id="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" className="pl-10" />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label>Account Type</Label>
//               <Select onValueChange={(val) => setForm({ ...form, role: val })}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select account type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="USER">User</SelectItem>
//                   <SelectItem value="INSTITUTE">Institute</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="organization">Organization (Optional)</Label>
//               <div className="relative">
//                 <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                 <Input id="organization" value={form.organization} onChange={handleChange} placeholder="University or Company" className="pl-10" />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                 <Input id="password" type="password" value={form.password} onChange={handleChange} placeholder="Create a strong password" className="pl-10" />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="confirmPassword">Confirm Password</Label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                 <Input id="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm your password" className="pl-10" />
//               </div>
//             </div>

//             <div className="flex items-center space-x-2">
//               <input type="checkbox" id="terms" className="rounded" required />
//               <Label htmlFor="terms" className="text-sm">
//                 I agree to the{" "}
//                 <Link href="/terms" className="text-primary hover:underline">
//                   Terms of Service
//                 </Link>{" "}
//                 and{" "}
//                 <Link href="/privacy" className="text-primary hover:underline">
//                   Privacy Policy
//                 </Link>
//               </Label>
//             </div>

//             <Button className="w-full" type="submit" disabled={loading}>
//               {loading ? "Creating..." : "Create Account"}
//             </Button>
//           </form>

//           <Separator />

//           <div className="text-center">
//             <p className="text-sm text-muted-foreground">
//               Already have an account?{" "}
//               <Link href="/login" className="text-primary hover:underline">
//                 Sign in
//               </Link>
//             </p>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }


"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Shield, Mail, Lock, User, Building, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    organization: "",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState<"Weak" | "Medium" | "Strong" | "">("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setForm({ ...form, [id]: value })

    if (id === "password") {
      evaluatePasswordStrength(value)
    }
  }

  const evaluatePasswordStrength = (password: string) => {
    let strength: "Weak" | "Medium" | "Strong" | "" = "Weak"
    const regexMedium = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/
    const regexStrong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/

    if (regexStrong.test(password)) {
      strength = "Strong"
    } else if (regexMedium.test(password)) {
      strength = "Medium"
    } else if (password.length > 0) {
      strength = "Weak"
    } else {
      strength = ""
    }

    setPasswordStrength(strength)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!")
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "signup",
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
          organization: form.organization,
          role: form.role,
        }),
      })

      if (res.ok) {
        router.push("/login")
      } else {
        const data = await res.json()
        alert(data.error || "Something went wrong")
      }
    } catch (error) {
      console.error(error)
      alert("Error registering")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <Card className="glass-card w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">AuthScan</span>
          </div>
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>Join AuthScan to verify your certificates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First & Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="firstName" value={form.firstName} onChange={handleChange} placeholder="John" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" value={form.lastName} onChange={handleChange} placeholder="Doe" />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" className="pl-10" />
              </div>
            </div>

            {/* Account Type */}
            <div className="space-y-2">
              <Label>Account Type</Label>
              <Select onValueChange={(val) => setForm({ ...form, role: val })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USER">User</SelectItem>
                  <SelectItem value="INSTITUTE">Institute</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Organization */}
            <div className="space-y-2">
              <Label htmlFor="organization">Organization (Optional)</Label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="organization" value={form.organization} onChange={handleChange} placeholder="University or Company" className="pl-10" />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  className="pl-10"
                />
              </div>
              {passwordStrength && (
                <p
                  className={`text-sm ${
                    passwordStrength === "Weak"
                      ? "text-red-500"
                      : passwordStrength === "Medium"
                      ? "text-yellow-500"
                      : "text-green-600"
                  }`}
                >
                  Password Strength: {passwordStrength}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="pl-10"
                />
                {form.confirmPassword.length > 0 && form.confirmPassword === form.password && (
                  <CheckCircle className="absolute right-3 top-3 h-5 w-5 text-green-500" />
                )}
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="terms" className="rounded" required />
              <Label htmlFor="terms" className="text-sm">
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            {/* Submit */}
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </Button>
          </form>

          <Separator />

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
