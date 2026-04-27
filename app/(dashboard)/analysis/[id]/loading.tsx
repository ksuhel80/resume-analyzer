import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sparkles, ArrowLeft, FileText, Calendar } from "lucide-react";

export default function AnalysisLoading() {
  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 w-full bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-xl font-bold flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span>ResumeAI</span>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {/* HEADER SECTION SKELETON */}
        <div className="max-w-5xl mx-auto mb-10">
          <div className="mb-6 -ml-4 flex items-center px-4 py-2 text-slate-400">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <Skeleton className="h-4 w-32" />
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-8">
            <div>
              <div className="flex items-center gap-2 text-blue-200 font-semibold text-sm mb-2 uppercase tracking-widest">
                <FileText className="h-4 w-4" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-10 w-64" />
            </div>
            <div className="flex items-center gap-2 text-slate-200 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
              <Calendar className="h-4 w-4" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
        </div>

        {/* RESULTS SECTION SKELETON */}
        <div className="w-full max-w-5xl mx-auto space-y-8 pb-12">
          {/* 1. TOP ROW - SCORE CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-none shadow-lg bg-white/50 backdrop-blur-sm h-48 flex items-center justify-center">
                <CardContent className="pt-6 flex flex-col items-center justify-center w-full">
                  <Skeleton className="h-28 w-28 rounded-full" />
                  <Skeleton className="h-4 w-24 mt-4" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 2. SUMMARY CARD */}
          <Card className="border-none shadow-lg overflow-hidden">
            <div className="h-2 bg-slate-200" />
            <CardHeader className="flex flex-row items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>

          {/* 3. TWO COLUMN LAYOUT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-none shadow-md h-64">
              <CardHeader className="border-b bg-slate-50/50">
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="border-none shadow-md h-64">
              <CardHeader className="border-b bg-slate-50/50">
                <Skeleton className="h-6 w-40" />
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Skeleton key={i} className="h-7 w-20 rounded-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
