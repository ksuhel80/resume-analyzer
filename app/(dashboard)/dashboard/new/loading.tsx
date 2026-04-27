import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, ArrowLeft, FileSearch } from "lucide-react";

export default function NewAnalysisLoading() {
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

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* HEADER SKELETON */}
          <div className="mb-10">
            <div className="mb-6 -ml-4 flex items-center px-4 py-2 text-slate-400">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <Skeleton className="h-4 w-32" />
            </div>
            
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-100 p-2 rounded-xl">
                <FileSearch className="h-6 w-6 text-blue-200" />
              </div>
              <Skeleton className="h-10 w-64" />
            </div>
            <Skeleton className="h-5 w-80 ml-11" />
          </div>

          {/* UPLOADER SKELETON */}
          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
            <div className="p-8 space-y-6">
              <div className="flex gap-4">
                <Skeleton className="h-10 flex-1 rounded-lg" />
                <Skeleton className="h-10 flex-1 rounded-lg" />
              </div>
              <Skeleton className="h-64 w-full rounded-xl" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
