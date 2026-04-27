"use client";

import { useRouter } from "next/navigation";
import AnalysisResult from "@/components/AnalysisResult";
import { ResumeAnalysis } from "@/types";

interface AnalysisResultWrapperProps {
  analysis: ResumeAnalysis;
}

export default function AnalysisResultWrapper({ analysis }: AnalysisResultWrapperProps) {
  const router = useRouter();

  const handleReset = () => {
    router.push("/dashboard");
  };

  return (
    <AnalysisResult analysis={analysis} onReset={handleReset} />
  );
}
