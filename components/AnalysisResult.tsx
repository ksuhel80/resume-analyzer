"use client";

import React from "react";
import { ResumeAnalysis } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ScoreCircle from "./ScoreCircle";
import { 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Lightbulb, 
  Search, 
  Copy, 
  RefreshCw,
  Trophy,
  BrainCircuit
} from "lucide-react";
import { toast } from "sonner";

interface AnalysisResultProps {
  analysis: ResumeAnalysis;
  onReset: () => void;
}

export default function AnalysisResult({ analysis, onReset }: AnalysisResultProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(analysis.summary);
    toast.success("Summary copied to clipboard!");
  };

  const getExperienceColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'senior': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'mid': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. TOP ROW - SCORE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-lg bg-white/50 backdrop-blur-sm">
          <CardContent className="pt-6 flex flex-col items-center justify-center">
            <ScoreCircle score={analysis.score} label="Overall Score" size={140} />
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-white/50 backdrop-blur-sm">
          <CardContent className="pt-6 flex flex-col items-center justify-center">
            <ScoreCircle score={analysis.ats_score} label="ATS Compatibility" size={140} />
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-white/50 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6">
          <div className="bg-slate-50 p-4 rounded-full mb-4">
            <Trophy className="h-8 w-8 text-yellow-500" />
          </div>
          <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">Experience Level</h3>
          <Badge className={`text-sm px-4 py-1 capitalize border ${getExperienceColor(analysis.experience_level)}`}>
            {analysis.experience_level}
          </Badge>
        </Card>
      </div>

      {/* 2. SUMMARY CARD */}
      <Card className="border-none shadow-lg overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500" />
        <CardHeader className="flex flex-row items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-500" />
          <CardTitle className="text-xl">Executive Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 leading-relaxed text-lg italic">
            "{analysis.summary}"
          </p>
        </CardContent>
      </Card>

      {/* 3. TWO COLUMN LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* STRENGTHS */}
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center gap-2 border-b bg-slate-50/50">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <CardTitle className="text-lg">Key Strengths</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-4">
              {analysis.strengths.map((strength, index) => (
                <li key={index} className="flex gap-3 text-slate-600">
                  <div className="mt-1 shrink-0 h-5 w-5 rounded-full bg-green-50 flex items-center justify-center">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                  </div>
                  <span className="text-sm font-medium leading-tight">{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* TOP SKILLS */}
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center gap-2 border-b bg-slate-50/50">
            <BrainCircuit className="h-5 w-5 text-purple-500" />
            <CardTitle className="text-lg">Top Skills Identified</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-2">
              {analysis.top_skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border-none transition-colors">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 4. AREAS TO IMPROVE */}
      <Card className="border-none shadow-md overflow-hidden">
        <CardHeader className="flex flex-row items-center gap-2 border-b bg-orange-50/50">
          <Lightbulb className="h-5 w-5 text-orange-500" />
          <CardTitle className="text-lg">Areas to Improve</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {analysis.improvements.map((improvement, index) => (
              <div key={index} className="flex items-start gap-4 p-4 hover:bg-slate-50 transition-colors">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-700 text-xs font-bold">
                  {index + 1}
                </span>
                <div className="flex gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-400 mt-0.5" />
                  <p className="text-sm text-slate-600 leading-relaxed">{improvement}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 5. MISSING KEYWORDS */}
      {analysis.missing_keywords && analysis.missing_keywords.length > 0 && (
        <Card className="border-none shadow-md bg-red-50/30 border border-red-100">
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <Search className="h-5 w-5 text-red-500" />
            <CardTitle className="text-lg">Missing Keywords</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-slate-500 mb-4 italic">
              Add these keywords to your resume to improve your match score for the provided job description.
            </p>
            <div className="flex flex-wrap gap-2">
              {analysis.missing_keywords.map((keyword, index) => (
                <Badge key={index} variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-200 border-none px-3">
                  {keyword}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 6. ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Button 
          variant="outline" 
          onClick={onReset}
          className="w-full sm:w-auto px-8 h-12 rounded-xl hover:bg-slate-50"
        >
          <RefreshCw className="mr-2 h-4 w-4" /> Analyze Another Resume
        </Button>
        <Button 
          onClick={copyToClipboard}
          className="w-full sm:w-auto px-8 h-12 bg-black hover:bg-black/90 text-white rounded-xl shadow-lg"
        >
          <Copy className="mr-2 h-4 w-4" /> Copy Results
        </Button>
      </div>
    </div>
  );
}
