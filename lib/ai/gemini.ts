import { GoogleGenerativeAI } from "@google/generative-ai";
import { ResumeAnalysis } from "@/types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function analyzeResume(
  resumeText: string,
  jobDescription: string = ""
): Promise<ResumeAnalysis> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing");
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-flash-latest",
    generationConfig: {
      temperature: 0.2,
      responseMimeType: "application/json",
    },
  });

  const prompt = `You are an expert resume analyzer.

Analyze the resume and return ONLY valid JSON.

Resume:
${resumeText}

Job Description:
${jobDescription}

Return EXACT JSON:
{
  "score": number,
  "ats_score": number,
  "summary": "string",
  "strengths": ["string"],
  "improvements": ["string"],
  "missing_keywords": ["string"],
  "experience_level": "junior" | "mid" | "senior",
  "top_skills": ["string"]
}`;

  try {
    // ✅ Correct API format
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const text = result.response.text();

    // ✅ Clean + extract JSON safely
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed: any;

    try {
      parsed = JSON.parse(cleaned);
    } catch {
      // 🔥 Fallback: extract JSON block
      const match = cleaned.match(/\{[\s\S]*\}/);
      if (!match) {
        throw new Error("No valid JSON found in response");
      }
      parsed = JSON.parse(match[0]);
    }

    // ✅ Validation
    if (typeof parsed.score !== "number") {
      throw new Error("Invalid response structure");
    }

    return parsed as ResumeAnalysis;
  } catch (error: any) {
    console.error("Gemini Error:", error?.message || error);

    throw new Error(
      error?.message || "Failed to analyze resume with Gemini"
    );
  }
}