import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, FileText, Sparkles } from "lucide-react";
import AnalysisResultWrapper from "./AnalysisResultWrapper";

export default async function AnalysisPage({ params }: { params: { id: string } }) {
  const supabase = createServerSupabase();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch analysis by ID and verify ownership
  const { data: analysis, error } = await supabase
    .from("analyses")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", user.id)
    .single();

  if (error || !analysis) {
    console.error("Analysis not found or unauthorized:", error);
    redirect("/dashboard");
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
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

      <main className="container mx-auto px-4 py-8">
        {/* HEADER SECTION */}
        <div className="max-w-5xl mx-auto mb-10">
          <Link href="/dashboard">
            <Button variant="ghost" className="mb-6 -ml-4 text-slate-500 hover:text-blue-600">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-8">
            <div>
              <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm mb-2 uppercase tracking-widest">
                <FileText className="h-4 w-4" />
                Analysis Report
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
                Resume Analysis
              </h1>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-sm font-medium bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
              <Calendar className="h-4 w-4" />
              Analyzed on {formatDate(analysis.created_at)}
            </div>
          </div>
        </div>

        {/* RESULTS SECTION */}
        <AnalysisResultWrapper analysis={analysis.result} />
      </main>
    </div>
  );
}
