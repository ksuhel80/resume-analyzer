import { createServerSupabase } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { analyzeResume } from '@/lib/ai/gemini';

async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  try {
    console.log('Starting PDF extraction...');
    // Use pdf-parse-fork which fixes the DOMMatrix error in Node.js environments
    const pdf = require('pdf-parse-fork');
    
    const data = await pdf(buffer);
    
    if (!data || !data.text) {
      console.error('PDF extraction returned no text');
      throw new Error('No text found in PDF');
    }
    
    console.log('PDF extraction successful, length:', data.text.length);
    return data.text;
  } catch (error: any) {
    console.error('Error in extractTextFromPdf details:', {
      message: error.message,
      stack: error.stack,
      error
    });
    throw new Error(`Failed to extract text from PDF: ${error.message}`);
  }
}

export async function POST(request: Request) {
  try {
    // 1. Get authenticated user
    const supabase = createServerSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Accept FormData
    const formData = await request.formData();
    const resumeFile = formData.get('file') as File | null;
    let resumeText = formData.get('resumeText') as string | null;
    const jobDescription = (formData.get('jobDescription') as string | null) || '';

    // 3. If file is uploaded (PDF), extract text
    if (resumeFile && resumeFile.size > 0) {
      if (resumeFile.type !== 'application/pdf') {
        return NextResponse.json(
          { error: 'Only PDF files are allowed' },
          { status: 400 }
        );
      }
      if (resumeFile.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { error: 'File size must be under 5MB' },
          { status: 400 }
        );
      }

      try {
        const bytes = await resumeFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        resumeText = await extractTextFromPdf(buffer);
      } catch (pdfError: any) {
        console.error('PDF parse error:', pdfError);
        return NextResponse.json(
          { error: pdfError.message || 'Could not read PDF. Please paste your resume text instead.' },
          { status: 400 }
        );
      }
    }

    // 4. Validate resumeText
    if (!resumeText || resumeText.trim().length < 50) {
      return NextResponse.json(
        { error: 'Resume text must be at least 50 characters long' },
        { status: 400 }
      );
    }

    // 5. Call analyzeResume
    console.log('Calling Gemini AI...');
    const result = await analyzeResume(resumeText, jobDescription);
    console.log('Analysis score:', result.score);

    // 6. Save result to Supabase
    const { data: analysis, error: dbError } = await supabase
      .from('analyses')
      .insert({
        user_id: user.id,
        resume_text: resumeText,
        job_description: jobDescription,
        score: result.score,
        result: result,
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      // Return analysis even if save fails
      return NextResponse.json({
        id: 'temp-' + Date.now(),
        analysis: result,
      });
    }

    // 7. Return JSON
    return NextResponse.json({ id: analysis.id, analysis: result });

  } catch (error: any) {
    console.error('Analysis API error FULL:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}