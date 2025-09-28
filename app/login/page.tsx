// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Separator } from "@/components/ui/separator"
// import { Shield, Mail, Lock } from "lucide-react"
// import Link from "next/link"

// export default function LoginPage() {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")
//   const router = useRouter()

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)
//     setError("")

//     try {
//       const res = await fetch("/api/auth", {
//         method: "POST", // login
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({action: "login", email, password }),
//       })

//       const data = await res.json()
//       console.log(data)

//       if (!res.ok) {
//         setError(data.error || "Login failed")
//         setLoading(false)
//         return
//       }

//       // store token + user info
//       localStorage.setItem("token", data.token)
//       localStorage.setItem("user", JSON.stringify(data.user))

//       // Redirect user based on role
//       if (data.role === "USER") {
//         router.push("/student")
//       } else if (data.role === "INSTITUTION") {
//         router.push("/institution")
//       } else if (data.role === "EMPLOYER") {
//         router.push("/employer")
//       } else {
//         router.push("/") // fallback
//       }
//     } catch (err) {
//       console.error(err)
//       setError("Something went wrong. Please try again.")
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
//           <CardTitle className="text-2xl">Welcome Back</CardTitle>
//           <CardDescription>Sign in to your account to continue</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <form className="space-y-4" onSubmit={handleLogin}>
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="Enter your email"
//                   className="pl-10"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   id="password"
//                   type="password"
//                   placeholder="Enter your password"
//                   className="pl-10"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>
//             </div>
//             {error && <p className="text-red-500 text-sm">{error}</p>}
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-2">
//                 <input type="checkbox" id="remember" className="rounded" />
//                 <Label htmlFor="remember" className="text-sm">
//                   Remember me
//                 </Label>
//               </div>
//               <Link href="/forgot-password" className="text-sm text-primary hover:underline">
//                 Forgot password?
//               </Link>
//             </div>
//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? "Signing In..." : "Sign In"}
//             </Button>
//           </form>

//           <Separator />

//           <div className="text-center space-y-4">
//             <p className="text-sm text-muted-foreground">
//               Don't have an account?{" "}
//               <Link href="/register" className="text-primary hover:underline">
//                 Sign up
//               </Link>
//             </p>
//             <div className="grid grid-cols-3 gap-2 text-xs">
//               <Link href="/student" className="text-primary hover:underline">
//                 Student
//               </Link>
//               <Link href="/institution" className="text-primary hover:underline">
//                 Institution
//               </Link>
//               {/* <Link href="/employer" className="text-primary hover:underline">
//                 Employer
//               </Link> */}
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }/

"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Shield, Mail, Lock } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [role, setRole] = useState(null)

  const router = useRouter()
  const pathname = usePathname()

  // Auto-detect role from current pathname
  // useEffect(() => {
  //   if (pathname.includes("student")) setRole("USER")
  //   else if (pathname.includes("institution")) setRole("INSTITUTION")
  //   else if (pathname.includes("employer")) setRole("EMPLOYER")
  // }, [pathname])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  setLoading(true);
  setError("");

  try {
    // 1️⃣ Login request (no token yet)
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json",
                  "authorization": `Bearer ${localStorage.getItem("token")}`
       },
      body: JSON.stringify({ action: "login", email, password }),
    });

    const data = await res.json();
    console.log("User data received:", data);

    if (!res.ok) {
      setError(data.error || "Login failed");
      setLoading(false);
      return;
    }

    // 2️⃣ Store token & user
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // 3️⃣ Optionally, set token in cookie if you want middleware to read it
    document.cookie = `token=${data.token}; path=/;`;

    // 4️⃣ Redirect based on role
    if (data.role === "USER") {
      router.push("/employer");
    } else if (data.role === "INSTITUTE") {
      router.push("/institution");
    } else {
      router.push("/");
    }

    setLoading(false);
  } catch (err) {
    console.error(err);
    setError("Something went wrong. Please try again.");
    setLoading(false);
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
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>
            {role ? `Sign in as ${role}` : "Sign in to your account to continue"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="remember" className="rounded" />
                <Label htmlFor="remember" className="text-sm">
                  Remember me
                </Label>
              </div>
              <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <Separator />

          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
            {/* <div className="grid grid-cols-3 gap-2 text-xs">
              <Link href="/student" className="text-primary hover:underline">
                Student
              </Link>
              <Link href="/institution" className="text-primary hover:underline"> 
                Institution
              </Link>
              <Link href="/employer" className="text-primary hover:underline">
                Employer
              </Link>
            </div> */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

