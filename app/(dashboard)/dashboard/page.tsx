import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  LogOut, 
  History, 
  FileText, 
  Calendar, 
  ArrowRight,
  User as UserIcon,
  Sparkles
} from "lucide-react";
import ScoreCircle from "@/components/ScoreCircle";

export default async function DashboardPage() {
  const supabase = createServerSupabase();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: analyses, error } = await supabase
    .from("analyses")
    .select("id, score, created_at, job_description")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching analyses:", error);
  }

  const getScoreColor = (score: number) => {
    if (score <= 40) return "bg-red-100 text-red-700 border-red-200";
    if (score <= 70) return "bg-yellow-100 text-yellow-700 border-yellow-200";
    return "bg-green-100 text-green-700 border-green-200";
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* 1. NAVBAR */}
      <nav className="sticky top-0 z-50 w-full bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold flex items-center gap-2 group">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span>ResumeAI</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 text-sm text-slate-500 font-medium bg-slate-100 px-3 py-1.5 rounded-full">
              <UserIcon className="h-4 w-4" />
              {user.email}
            </div>
            <form action="/auth/signout" method="post">
              <Button variant="ghost" size="sm" className="text-slate-500 hover:text-red-600">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </form>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">My Dashboard</h1>
            <p className="text-slate-500">View and manage your resume analysis history</p>
          </div>
          <Link href="/dashboard/new">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 h-12 rounded-xl shadow-lg shadow-blue-100 transition-all hover:scale-105 active:scale-95">
              <Plus className="h-5 w-5 mr-2" />
              New Analysis
            </Button>
          </Link>
        </div>

        {/* 3. EMPTY STATE */}
        {!analyses || analyses.length === 0 ? (
          <Card className="border-2 border-dashed border-slate-200 bg-white/50 py-20">
            <CardContent className="flex flex-col items-center justify-center text-center">
              <div className="bg-blue-50 p-6 rounded-full mb-6">
                <History className="h-12 w-12 text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">No analyses yet</h2>
              <p className="text-slate-500 max-w-sm mb-8">
                Upload your first resume to get instant feedback and see how you match up against job descriptions.
              </p>
              <Link href="/dashboard/new">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8">
                  Analyze your first resume
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          /* 4. ANALYSES GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-700">
            {analyses.map((analysis) => (
              <Card key={analysis.id} className="group border-none shadow-md hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Badge variant="outline" className={`font-semibold ${getScoreColor(analysis.score)}`}>
                    Score: {analysis.score}
                  </Badge>
                  <div className="h-10 w-10">
                    <ScoreCircle score={analysis.score} label="" size={40} />
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 font-medium uppercase tracking-wider">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(analysis.created_at)}
                  </div>
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-tight mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Target Role
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-2 min-h-[40px] italic">
                    {analysis.job_description 
                      ? `"${analysis.job_description.substring(0, 100)}..."` 
                      : "No job description provided"}
                  </p>
                </CardContent>
                <CardFooter className="pt-4 border-t border-slate-50">
                  <Link href={`/analysis/${analysis.id}`} className="w-full">
                    <Button variant="ghost" className="w-full justify-between group-hover:bg-slate-50 group-hover:text-blue-600 transition-colors">
                      View Full Results
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
