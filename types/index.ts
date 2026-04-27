export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface ResumeAnalysis {
  score: number;
  ats_score: number;
  summary: string;
  strengths: string[];
  improvements: string[];
  missing_keywords: string[];
  experience_level: 'junior' | 'mid' | 'senior';
  top_skills: string[];
}

export interface AnalysisRequest {
  resumeText: string;
  jobDescription?: string;
}

export interface UploadedFile {
  name: string;
  size: number;
  type: string;
}
