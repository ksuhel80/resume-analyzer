'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'
import { Loader2, Upload, FileText, ChevronDown, ChevronUp } from 'lucide-react'
import { ResumeAnalysis } from '@/types'

interface ResumeUploaderProps {
  onAnalysisComplete: (id: string, analysis: ResumeAnalysis) => void
}

export default function ResumeUploader({ onAnalysisComplete }: ResumeUploaderProps) {
  const [activeTab, setActiveTab] = useState<'paste' | 'upload'>('paste')
  const [resumeText, setResumeText] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showJobDescription, setShowJobDescription] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setFileError('')
    if (rejectedFiles.length > 0) {
      setFileError('Only PDF files are accepted')
      return
    }
    const file = acceptedFiles[0]
    if (file.size > 5 * 1024 * 1024) {
      setFileError('File must be under 5MB')
      return
    }
    setUploadedFile(file)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
  })

  const handleSubmit = async () => {
    if (activeTab === 'paste' && resumeText.trim().length < 50) {
      toast.error('Please enter at least 50 characters')
      return
    }
    if (activeTab === 'upload' && !uploadedFile) {
      toast.error('Please upload a PDF file')
      return
    }

    setIsLoading(true)
    const loadingToast = toast.loading('Analyzing your resume...')

    try {
      const formData = new FormData()
      if (activeTab === 'paste') {
        formData.append('resumeText', resumeText.trim())
      } else if (uploadedFile) {
        formData.append('file', uploadedFile)
      }
      if (jobDescription.trim()) {
        formData.append('jobDescription', jobDescription.trim())
      }

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()

      if (!response.ok) throw new Error(data.error || 'Analysis failed')

      toast.dismiss(loadingToast)
      toast.success('Resume analyzed!')
      onAnalysisComplete(data.id, data.analysis)

    } catch (error) {
      toast.dismiss(loadingToast)
      toast.error(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ width: '100%', maxWidth: '640px', margin: '0 auto' }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        overflow: 'hidden'
      }}>

        {/* Header */}
        <div style={{ padding: '24px 24px 16px', borderBottom: '1px solid #f3f4f6' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111827', margin: 0 }}>
            Analyze Your Resume
          </h2>
          <p style={{ fontSize: '14px', color: '#6b7280', margin: '4px 0 0' }}>
            Paste your resume text or upload a PDF
          </p>
        </div>

        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Tab Buttons */}
          <div style={{
            display: 'flex',
            background: '#f3f4f6',
            borderRadius: '10px',
            padding: '4px',
            gap: '4px'
          }}>
            {(['paste', 'upload'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 500,
                  transition: 'all 0.15s',
                  background: activeTab === tab ? 'white' : 'transparent',
                  color: activeTab === tab ? '#111827' : '#6b7280',
                  boxShadow: activeTab === tab ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                {tab === 'paste'
                  ? <><FileText size={14} /> Paste Text</>
                  : <><Upload size={14} /> Upload PDF</>
                }
              </button>
            ))}
          </div>

          {/* Paste Text Tab */}
          {activeTab === 'paste' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                disabled={isLoading}
                placeholder={`Paste your resume text here...

Example:
John Doe — Software Engineer
john@email.com | LinkedIn | GitHub

EXPERIENCE
Senior Developer at TechCorp (2020–2024)
- Built React apps serving 100k+ users
- Led team of 5 engineers`}
                style={{
                  width: '100%',
                  minHeight: '240px',
                  padding: '14px',
                  fontSize: '14px',
                  border: '1px solid #d1d5db',
                  borderRadius: '10px',
                  resize: 'vertical',
                  outline: 'none',
                  fontFamily: 'inherit',
                  lineHeight: '1.6',
                  color: '#111827',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => e.target.style.borderColor = '#000'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
              {/* Character counter */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: resumeText.length < 50 ? '#ef4444' : '#22c55e' }}>
                  {resumeText.length < 50
                    ? `${50 - resumeText.length} more characters needed`
                    : '✓ Good length'
                  }
                </span>
                <span style={{ color: '#9ca3af' }}>{resumeText.length} chars</span>
              </div>
            </div>
          )}

          {/* Upload PDF Tab */}
          {activeTab === 'upload' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div
                {...getRootProps()}
                style={{
                  border: `2px dashed ${isDragActive ? '#000' : uploadedFile ? '#22c55e' : '#d1d5db'}`,
                  borderRadius: '12px',
                  padding: '40px 20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: isDragActive ? '#f9fafb' : uploadedFile ? '#f0fdf4' : 'white',
                  transition: 'all 0.15s',
                }}
              >
                <input {...getInputProps()} />

                {uploadedFile ? (
                  <div>
                    <div style={{
                      width: '48px', height: '48px',
                      background: '#dcfce7', borderRadius: '50%',
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center', margin: '0 auto 12px'
                    }}>
                      <FileText size={22} color="#16a34a" />
                    </div>
                    <p style={{ fontWeight: 500, color: '#111827', margin: '0 0 4px' }}>
                      {uploadedFile.name}
                    </p>
                    <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 10px' }}>
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <button
                      onClick={(e) => { e.stopPropagation(); setUploadedFile(null) }}
                      style={{
                        fontSize: '12px', color: '#ef4444',
                        background: 'none', border: 'none',
                        cursor: 'pointer', textDecoration: 'underline'
                      }}
                    >
                      Remove file
                    </button>
                  </div>
                ) : (
                  <div>
                    <div style={{
                      width: '48px', height: '48px',
                      background: '#f3f4f6', borderRadius: '50%',
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center', margin: '0 auto 12px'
                    }}>
                      <Upload size={22} color="#6b7280" />
                    </div>
                    <p style={{ fontWeight: 500, color: '#111827', margin: '0 0 4px' }}>
                      {isDragActive ? 'Drop your PDF here' : 'Drag & drop your PDF here'}
                    </p>
                    <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 8px' }}>
                      or click to browse
                    </p>
                    <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>
                      PDF only • Max 5MB
                    </p>
                  </div>
                )}
              </div>

              {fileError && (
                <p style={{ fontSize: '13px', color: '#ef4444', margin: 0 }}>
                  ⚠ {fileError}
                </p>
              )}
            </div>
          )}

          {/* Job Description Collapsible */}
          <div style={{
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            overflow: 'hidden'
          }}>
            <button
              onClick={() => setShowJobDescription(!showJobDescription)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                background: 'white',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500,
                color: '#374151',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                🎯 Add Job Description
                <span style={{ fontSize: '12px', fontWeight: 400, color: '#9ca3af' }}>
                  (optional — for keyword matching)
                </span>
              </span>
              {showJobDescription
                ? <ChevronUp size={16} color="#9ca3af" />
                : <ChevronDown size={16} color="#9ca3af" />
              }
            </button>

            {showJobDescription && (
              <div style={{ padding: '0 16px 16px', borderTop: '1px solid #f3f4f6' }}>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  disabled={isLoading}
                  placeholder="Paste the job description here to see keyword gaps and match score..."
                  style={{
                    width: '100%',
                    minHeight: '140px',
                    marginTop: '12px',
                    padding: '12px',
                    fontSize: '14px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    resize: 'vertical',
                    outline: 'none',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#000'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
                <p style={{ fontSize: '12px', color: '#9ca3af', margin: '6px 0 0' }}>
                  Adds keyword gap analysis to your results
                </p>
              </div>
            )}
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '14px',
              background: isLoading ? '#6b7280' : '#000',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'background 0.15s',
            }}
          >
            {isLoading ? (
              <><Loader2 size={16} className="animate-spin" /> Analyzing...</>
            ) : (
              '✨ Analyze My Resume'
            )}
          </button>

          <p style={{ textAlign: 'center', fontSize: '12px', color: '#9ca3af', margin: 0 }}>
            Powered by Google Gemini AI • Free to use
          </p>

        </div>
      </div>
    </div>
  )
}