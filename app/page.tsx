"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Trophy, Users, Zap, CheckCircle, ArrowRight, Play, Star, Menu, X } from "lucide-react"
import Link from "next/link"
import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/nextjs"
import { useState } from "react"

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const {userId} = useAuth()
  const {user}=useUser()
  console.log("User: ",user)
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-slate-800 relative">
        <Link className="flex items-center justify-center" href="/">
          <Code className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-400" />
          <span className="ml-2 text-lg sm:text-xl font-bold">CodeMaster</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-emerald-400 transition-colors" href="#problems">
            Problems
          </Link>
          <Link className="text-sm font-medium hover:text-emerald-400 transition-colors" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-emerald-400 transition-colors" href="#pricing">
            Pricing
          </Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="ml-6 hidden md:flex gap-2">
          <SignedOut>
            <Link href="/sign-up">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                Get Started
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button size="sm" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                Sign In
              </Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/problem">
              <Button size="sm">
                Explore
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <button className="ml-auto md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-slate-900 border-b border-slate-800 md:hidden z-50">
            <nav className="flex flex-col p-4 space-y-4">
              <Link
                className="text-sm font-medium hover:text-emerald-400 transition-colors"
                href="#problems"
                onClick={() => setMobileMenuOpen(false)}
              >
                Problems
              </Link>
              <Link
                className="text-sm font-medium hover:text-emerald-400 transition-colors"
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                className="text-sm font-medium hover:text-emerald-400 transition-colors"
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-slate-700">
                <SignedOut>
                  <Link href="/sign-up">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Get Started</Button>
                  </Link>
                  <Link href="/sign-in">
                    <Button
                      variant="outline"
                      className="w-full border-white text-white hover:bg-white/10 bg-transparent"
                    >
                      Sign In
                    </Button>
                  </Link>
                </SignedOut>
                <SignedIn>
                  <Link href="/dashboard">
                    <Button className="w-full">
                      Go to Dashboard
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </SignedIn>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-8 sm:py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
                <div className="space-y-2">
                  <Badge className="bg-emerald-600/20 text-emerald-400 border-emerald-600/30 text-xs sm:text-sm">
                    🚀 Master Your Coding Skills
                  </Badge>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter">
                    Ace Your Next
                    <span className="text-emerald-400"> Coding Interview</span>
                  </h1>
                  <p className="max-w-[600px] text-slate-400 text-sm sm:text-base md:text-lg lg:text-xl mx-auto lg:mx-0">
                    Practice coding problems, improve your algorithms, and prepare for technical interviews with our
                    comprehensive platform.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-center lg:justify-start">
                  <Button size="lg" asChild className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700">
                    <Link href="/sign-up">
                      Start Coding Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-slate-700 text-white hover:bg-slate-800 bg-transparent"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Watch Demo
                  </Button>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-4 text-xs sm:text-sm text-slate-400">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-400" />
                    <span>1000+ Problems</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-400" />
                    <span>Real Interview Questions</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-400" />
                    <span>Multiple Languages</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center mt-8 lg:mt-0">
                <div className="relative w-full max-w-md">
                  <div className="absolute inset-0 bg-emerald-400/20 blur-3xl rounded-full"></div>
                  <Card className="relative bg-slate-900/50 border-slate-700 backdrop-blur">
                    <CardHeader className="p-4 sm:p-6">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="border-emerald-600 text-emerald-400 text-xs">
                          Easy
                        </Badge>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <CardTitle className="text-white text-lg sm:text-xl">Two Sum</CardTitle>
                      <CardDescription className="text-slate-400 text-sm">
                        Given an array of integers, return indices of two numbers that add up to target.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0">
                      <div className="bg-slate-950 rounded-md p-3 sm:p-4 font-mono text-xs sm:text-sm overflow-x-auto">
                        <div className="text-emerald-400 whitespace-nowrap">
                          {"function"} <span className="text-blue-400">twoSum</span>
                          {"(nums, target) {"}
                        </div>
                        <div className="text-slate-400 ml-4 whitespace-nowrap">{"// Your solution here"}</div>
                        <div className="text-emerald-400 whitespace-nowrap">{"}"}</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-8 sm:py-12 md:py-24 bg-slate-900">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-emerald-400">1000+</div>
                <div className="text-slate-400 text-xs sm:text-sm">Coding Problems</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-emerald-400">50K+</div>
                <div className="text-slate-400 text-xs sm:text-sm">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-emerald-400">15+</div>
                <div className="text-slate-400 text-xs sm:text-sm">Programming Languages</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-emerald-400">95%</div>
                <div className="text-slate-400 text-xs sm:text-sm">Success Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-8 sm:py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="bg-emerald-600/20 text-emerald-400 border-emerald-600/30 text-xs sm:text-sm">
                  Features
                </Badge>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
                  Everything You Need to Excel
                </h2>
                <p className="max-w-[900px] text-slate-400 text-sm sm:text-base md:text-lg lg:text-xl">
                  Our platform provides all the tools and resources you need to master coding interviews and improve
                  your programming skills.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-4 sm:gap-6 py-8 sm:py-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-slate-900/50 border-slate-700">
                <CardHeader className="p-4 sm:p-6">
                  <Code className="h-8 w-8 sm:h-10 sm:w-10 text-emerald-400" />
                  <CardTitle className="text-white text-lg sm:text-xl">Multiple Languages</CardTitle>
                  <CardDescription className="text-slate-400 text-sm">
                    Practice in Python, Java, C++, JavaScript, and 10+ other programming languages.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-slate-900/50 border-slate-700">
                <CardHeader className="p-4 sm:p-6">
                  <Trophy className="h-8 w-8 sm:h-10 sm:w-10 text-emerald-400" />
                  <CardTitle className="text-white text-lg sm:text-xl">Real Interview Questions</CardTitle>
                  <CardDescription className="text-slate-400 text-sm">
                    Solve problems from top tech companies like Google, Amazon, Facebook, and Microsoft.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-slate-900/50 border-slate-700 sm:col-span-2 lg:col-span-1">
                <CardHeader className="p-4 sm:p-6">
                  <Zap className="h-8 w-8 sm:h-10 sm:w-10 text-emerald-400" />
                  <CardTitle className="text-white text-lg sm:text-xl">Instant Feedback</CardTitle>
                  <CardDescription className="text-slate-400 text-sm">
                    Get immediate feedback on your solutions with detailed explanations and optimizations.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-slate-900/50 border-slate-700">
                <CardHeader className="p-4 sm:p-6">
                  <Users className="h-8 w-8 sm:h-10 sm:w-10 text-emerald-400" />
                  <CardTitle className="text-white text-lg sm:text-xl">Community Discussions</CardTitle>
                  <CardDescription className="text-slate-400 text-sm">
                    Learn from others and share your solutions with a community of developers.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-slate-900/50 border-slate-700">
                <CardHeader className="p-4 sm:p-6">
                  <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-emerald-400" />
                  <CardTitle className="text-white text-lg sm:text-xl">Progress Tracking</CardTitle>
                  <CardDescription className="text-slate-400 text-sm">
                    Monitor your progress with detailed analytics and personalized recommendations.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-slate-900/50 border-slate-700">
                <CardHeader className="p-4 sm:p-6">
                  <Star className="h-8 w-8 sm:h-10 sm:w-10 text-emerald-400" />
                  <CardTitle className="text-white text-lg sm:text-xl">Premium Content</CardTitle>
                  <CardDescription className="text-slate-400 text-sm">
                    Access exclusive problems, video solutions, and interview preparation guides.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Problem Categories */}
        <section id="problems" className="w-full py-8 sm:py-12 md:py-24 lg:py-32 bg-slate-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white">
                  Practice by Category
                </h2>
                <p className="max-w-[900px] text-slate-400 text-sm sm:text-base md:text-lg lg:text-xl">
                  Master different types of problems with our organized curriculum.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-4 sm:gap-6 py-8 sm:py-12 grid-cols-1 md:grid-cols-2">
              <div className="grid gap-4">
                <Card className="bg-slate-800/50 border-slate-700 hover:border-emerald-600/50 transition-colors cursor-pointer">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
                    <CardTitle className="text-sm sm:text-base font-medium text-white">Arrays & Strings</CardTitle>
                    <Badge className="bg-green-600/20 text-green-400 text-xs">Easy</Badge>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="text-xl sm:text-2xl font-bold text-white">150 Problems</div>
                    <p className="text-xs text-slate-400">Master fundamental data structures</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700 hover:border-emerald-600/50 transition-colors cursor-pointer">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
                    <CardTitle className="text-sm sm:text-base font-medium text-white">Dynamic Programming</CardTitle>
                    <Badge className="bg-red-600/20 text-red-400 text-xs">Hard</Badge>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="text-xl sm:text-2xl font-bold text-white">80 Problems</div>
                    <p className="text-xs text-slate-400">Advanced optimization techniques</p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4">
                <Card className="bg-slate-800/50 border-slate-700 hover:border-emerald-600/50 transition-colors cursor-pointer">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
                    <CardTitle className="text-sm sm:text-base font-medium text-white">Trees & Graphs</CardTitle>
                    <Badge className="bg-yellow-600/20 text-yellow-400 text-xs">Medium</Badge>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="text-xl sm:text-2xl font-bold text-white">120 Problems</div>
                    <p className="text-xs text-slate-400">Complex data structure problems</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700 hover:border-emerald-600/50 transition-colors cursor-pointer">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
                    <CardTitle className="text-sm sm:text-base font-medium text-white">System Design</CardTitle>
                    <Badge className="bg-purple-600/20 text-purple-400 text-xs">Expert</Badge>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="text-xl sm:text-2xl font-bold text-white">45 Problems</div>
                    <p className="text-xs text-slate-400">Large-scale system architecture</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-8 sm:py-12 md:py-24 lg:py-32 bg-gradient-to-r from-emerald-600 to-emerald-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white">
                  Ready to Start Your Journey?
                </h2>
                <p className="max-w-[600px] text-emerald-100 text-sm sm:text-base md:text-lg lg:text-xl">
                  Join thousands of developers who have improved their coding skills and landed their dream jobs.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
                <Button size="lg" asChild className="w-full sm:w-auto bg-white text-emerald-600 hover:bg-slate-100">
                  <Link href="/sign-up">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white text-white hover:bg-white/10 bg-transparent"
                >
                  View Pricing
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-slate-800">
        <p className="text-xs text-slate-400 text-center sm:text-left">© 2024 CodeMaster. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-slate-400 hover:text-white" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-slate-400 hover:text-white" href="#">
            Privacy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-slate-400 hover:text-white" href="#">
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  )
}
