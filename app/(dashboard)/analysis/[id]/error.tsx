"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft, Home } from "lucide-react";

export default function AnalysisError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="bg-red-50 p-6 rounded-full mb-6">
        <AlertCircle className="h-12 w-12 text-red-500" />
      </div>
      <h1 className="text-3xl font-bold text-slate-900 mb-3">Analysis not found</h1>
      <p className="text-slate-500 max-w-md mb-8">
        We couldn't find the analysis report you're looking for, or there was an error loading it.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link href="/dashboard">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 h-12 shadow-lg shadow-blue-100">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <Button 
          variant="outline"
          onClick={() => reset()}
          className="rounded-xl px-8 h-12"
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
