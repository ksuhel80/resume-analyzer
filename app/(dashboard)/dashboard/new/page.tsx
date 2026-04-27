"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Sparkles, FileSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import ResumeUploader from "@/components/ResumeUploader";
import { ResumeAnalysis } from "@/types";

export default function NewAnalysisPage() {
  const router = useRouter();

  const handleAnalysisComplete = (id: string, analysis: ResumeAnalysis) => {
    // Redirect to the newly created analysis page
    router.push(`/analysis/${id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 w-full bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="text-xl font-bold flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span>ResumeAI</span>
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* HEADER */}
          <div className="mb-10">
            <Link href="/dashboard">
              <Button variant="ghost" className="mb-6 -ml-4 text-slate-500 hover:text-blue-600">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-100 p-2 rounded-xl">
                <FileSearch className="h-6 w-6 text-blue-600" />
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
              Analyze Your Resume
            </h1>
          </div>
          <p className="text-lg text-slate-500 ml-11">
            Get instant AI feedback
          </p>
        </div>

          {/* UPLOADER COMPONENT */}
          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="p-1 md:p-2 bg-slate-50/50">
              <ResumeUploader onAnalysisComplete={handleAnalysisComplete} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
