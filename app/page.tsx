"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  BarChart3, 
  Target, 
  Briefcase, 
  Upload, 
  Cpu, 
  FileCheck, 
  Sparkles,
  Zap,
  ShieldCheck,
  Search
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useState, useEffect } from "react";

export default function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };

    checkSession();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkSession();
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAnalyzeClick = () => {
    if (isLoggedIn) {
      window.location.href = "/dashboard/new";
    } else {
      window.location.href = "/signup";
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-slate-900 selection:bg-blue-100">
      {/* 1. NAVBAR */}
      <nav className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold flex items-center gap-2 group">
            <div className="bg-blue-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform duration-300">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="tracking-tight">ResumeAI</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="font-medium">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* 2. HERO SECTION */}
        <section className="relative pt-24 pb-32 px-4 overflow-hidden">
          {/* Subtle Background Gradient */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50/50 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-50/50 rounded-full blur-[120px]" />
          </div>

          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium bg-blue-50 text-blue-700 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Zap className="mr-2 h-4 w-4 fill-blue-700" /> AI-Powered Resume Insights
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-slate-900 animate-in fade-in slide-in-from-bottom-6 duration-700">
              Get Your Resume <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Scored by AI</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000">
              Upload your resume and get instant feedback, ATS optimization tips, and job match analysis to land your dream role.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
              <Button 
                size="lg" 
                className="w-full h-14 px-10 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-full shadow-xl shadow-blue-200 transition-all hover:scale-105"
                onClick={handleAnalyzeClick}
                disabled={isLoggedIn === null}
              >
                {isLoggedIn === null ? (
                  <div className="flex items-center justify-center">
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Analyze My Resume
                  </div>
                ) : (
                  <>Analyze My Resume <ArrowRight className="ml-2 h-5 w-5" /></>
                )}
              </Button>
              <Link href="#demo" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full h-14 px-10 text-lg rounded-full hover:bg-slate-50 transition-all">
                  See Example
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-6 text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                <span className="text-xs uppercase tracking-wider font-semibold">Secure & Private</span>
              </div>
              <div className="h-1 w-1 bg-slate-300 rounded-full" />
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span className="text-xs uppercase tracking-wider font-semibold">Instant Results</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. FEATURES SECTION */}
        <section id="features" className="py-32 bg-slate-50/50 border-y border-slate-100 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to succeed</h2>
              <p className="text-slate-500">Powerful AI tools to help you stand out in the job market</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="group bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="h-14 w-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">Instant Score</h3>
                <p className="text-slate-500 leading-relaxed text-lg">
                  AI scores your resume in seconds, identifying strengths and weaknesses across all categories.
                </p>
              </div>
              {/* Card 2 */}
              <div className="group bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="h-14 w-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Target className="h-7 w-7 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">ATS Optimization</h3>
                <p className="text-slate-500 leading-relaxed text-lg">
                  Beat applicant tracking systems with tailored recommendations for formatting and content.
                </p>
              </div>
              {/* Card 3 */}
              <div className="group bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="h-14 w-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Briefcase className="h-7 w-7 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">Job Matching</h3>
                <p className="text-slate-500 leading-relaxed text-lg">
                  Match against job descriptions to see exactly where you stand and what skills are missing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. HOW IT WORKS SECTION */}
        <section id="how-it-works" className="py-32 bg-white px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
              <p className="text-slate-500">Get hired in three simple steps</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
              {/* Connection Line (Desktop) */}
              <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-slate-100 -z-10" />
              
              {/* Step 1 */}
              <div className="text-center flex flex-col items-center">
                <div className="h-24 w-24 rounded-full bg-white border-4 border-slate-50 shadow-lg flex items-center justify-center mb-8 relative">
                  <Upload className="h-10 w-10 text-blue-600" />
                  <span className="absolute -top-2 -right-2 h-8 w-8 bg-blue-600 text-white text-sm font-bold rounded-full flex items-center justify-center shadow-md">1</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Upload your resume</h3>
                <p className="text-slate-500 leading-relaxed">
                  Drag and drop your PDF or paste your resume text into our secure uploader.
                </p>
              </div>
              {/* Step 2 */}
              <div className="text-center flex flex-col items-center">
                <div className="h-24 w-24 rounded-full bg-white border-4 border-slate-50 shadow-lg flex items-center justify-center mb-8 relative">
                  <Cpu className="h-10 w-10 text-indigo-600" />
                  <span className="absolute -top-2 -right-2 h-8 w-8 bg-indigo-600 text-white text-sm font-bold rounded-full flex items-center justify-center shadow-md">2</span>
                </div>
                <h3 className="text-xl font-bold mb-4">AI analyzes it instantly</h3>
                <p className="text-slate-500 leading-relaxed">
                  Our advanced AI scans your resume for keywords, impact, and formatting.
                </p>
              </div>
              {/* Step 3 */}
              <div className="text-center flex flex-col items-center">
                <div className="h-24 w-24 rounded-full bg-white border-4 border-slate-50 shadow-lg flex items-center justify-center mb-8 relative">
                  <FileCheck className="h-10 w-10 text-purple-600" />
                  <span className="absolute -top-2 -right-2 h-8 w-8 bg-purple-600 text-white text-sm font-bold rounded-full flex items-center justify-center shadow-md">3</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Get actionable feedback</h3>
                <p className="text-slate-500 leading-relaxed">
                  Receive a detailed score and step-by-step tips to optimize your resume.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. CTA SECTION */}
        <section id="demo" className="py-32 px-4 bg-slate-50">
          <div className="container mx-auto max-w-5xl bg-gradient-to-br from-slate-900 to-slate-800 rounded-[3rem] p-12 md:p-24 text-center text-white shadow-2xl overflow-hidden relative">
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -ml-32 -mb-32" />
            
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Ready to boost your career?</h2>
            <p className="text-slate-300 text-xl mb-12 max-w-xl mx-auto leading-relaxed">
              Join job seekers who have successfully optimized their resumes and landed more interviews.
            </p>
            <Link href="/signup">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-blue-50 h-16 px-12 text-xl font-bold rounded-full shadow-xl transition-all hover:scale-105 active:scale-95">
                Get Started Free
              </Button>
            </Link>
            <p className="mt-8 text-slate-500 text-sm font-medium uppercase tracking-widest">No credit card required</p>
          </div>
        </section>
      </main>

      {/* 6. FOOTER */}
      <footer className="py-20 border-t border-slate-100 bg-white px-4">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8">
          <Link href="/" className="text-xl font-bold flex items-center gap-2">
            <div className="bg-blue-600 p-1 rounded-lg">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span>ResumeAI</span>
          </Link>
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} ResumeAI. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link href="#" className="text-slate-400 hover:text-slate-900 transition-colors text-sm font-medium">Privacy</Link>
            <Link href="#" className="text-slate-400 hover:text-slate-900 transition-colors text-sm font-medium">Terms</Link>
            <Link href="#" className="text-slate-400 hover:text-slate-900 transition-colors text-sm font-medium">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
