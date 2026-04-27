'use client'
import ResumeUploader from '@/components/ResumeUploader'
import { ResumeAnalysis } from '@/types'

export default function TestPage() {
  const handleComplete = (id: string, analysis: ResumeAnalysis) => {
    console.log('Analysis complete:', id, analysis)
    alert(`Score: ${analysis.score}/100`)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <ResumeUploader onAnalysisComplete={handleComplete} />
    </div>
  )
}