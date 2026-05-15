
import { GoogleGenAI, Type } from "@google/genai";
import { ScienceReview, TrainingProtocol, SpaceSignal, BroadcastScript, LaunchAsset } from "../types";
import { BRAND_MANIFESTO } from "../constants";

const signalSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    deorbitedInsight: { type: Type.STRING },
    relevance: { type: Type.STRING, enum: ['PERSONAL', 'COMPANY', 'DESIRES'] },
    analysis: {
      type: Type.OBJECT,
      properties: {
        processes: { type: Type.ARRAY, items: { type: Type.STRING } },
        gaps: { type: Type.ARRAY, items: { type: Type.STRING } },
        implementationEase: { type: Type.STRING, enum: ['EASY', 'MODERATE', 'HARD'] },
        roadmap: { type: Type.STRING }
      }
    }
  },
  required: ["title", "deorbitedInsight", "relevance", "analysis"]
};

const safeParse = <T>(text: string | undefined, defaultValue: T): T => {
  if (!text) return defaultValue;
  try {
    return JSON.parse(text) as T;
  } catch (e) {
    console.error("JSON Parse Failure:", e);
    return defaultValue;
  }
};

export const deorbitSignal = async (input: string, isUrl: boolean = false): Promise<Partial<SpaceSignal> | null> => {
  if (!process.env.GEMINI_API_KEY) return null;
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  // Specific instruction to look for transcripts and perform "GFORCE - SPACE Analysis"
  const prompt = isUrl 
    ? `ACT AS: GFORCE - SPACE Intelligence Auditor.
       URL: ${input}
       
       MISSION: Perform a Deep Protocol Audit.
       1. Search for transcripts or summaries of this content (likely a Peter Attia / Kevin Rose discussion).
       2. Extract the CORE PROCESSES (What the user should actually DO).
       3. Identify the STRATEGIC GAPS (What did they leave out? Social friction? Equipment? Travel?).
       4. Translate into a "De-orbited Insight" (How a high-performance operator uses this today).
       5. Provide a 12-week ROADMAP for deployment.
       
       Tone: Space-Age, Professional, High-Density.`
    : `${BRAND_MANIFESTO}
       MISSION: DE-ORBIT SIGNAL.
       Translate raw text into human tactics.
       Your "De-orbited Insight" must be punchy, slightly cynical, and high-density (max 2 sentences).
       Use "Space-Age meets Stone Age" terminology (e.g., "Legacy Systems", "Atmospheric Burn", "Survival Protocol").
       INPUT: "${input}"`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        tools: isUrl ? [{ googleSearch: {} }] : [],
        responseMimeType: "application/json",
        responseSchema: signalSchema,
      },
    });
    
    return safeParse(response.text, null);
  } catch (error) {
    console.error("Audit Failure:", error);
    return null;
  }
};

export const generateBroadcastScript = async (signals: SpaceSignal[]): Promise<BroadcastScript | null> => {
  if (!process.env.GEMINI_API_KEY) return null;
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const prompt = `ACT AS: Gonçalo Esteves. ${BRAND_MANIFESTO}\nGenerate a 3-segment broadcast script based on these signals: ${JSON.stringify(signals)}`;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: { responseMimeType: "application/json" },
    });
    return safeParse(response.text, null);
  } catch (error) { return null; }
};

export const generateLaunchAssets = async (): Promise<LaunchAsset[]> => {
  if (!process.env.GEMINI_API_KEY) return [];
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate GFORCE - SPACE Launch Assets for Social Media channels based on Space-Age Intelligence.",
      config: { responseMimeType: "application/json" },
    });
    const result = safeParse(response.text, []);
    return Array.isArray(result) ? result : [];
  } catch (error) { return []; }
};

export const generateProtocolVideo = async (title: string, roundDescription: string): Promise<string> => {
  if (!process.env.API_KEY) throw new Error('API_KEY_REQUIRED');
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-lite-generate-preview',
      prompt: `Instructional demonstration of a human tactical athlete performing: ${roundDescription}. Context: ${title}. Style: Clear, high-fidelity, professional coaching perspective, modern athletic gear. Focus on precise movement and form. No spacesuits.`,
      config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' }
    });
    while (!operation.done) {
      await new Promise(r => setTimeout(r, 10000));
      operation = await ai.operations.getVideosOperation({ operation });
    }
    return operation.response?.generatedVideos?.[0]?.video?.uri || "";
  } catch (error) { 
    console.error("Video Gen Error:", error);
    return ""; 
  }
}

export const generateScienceReview = async (input: string): Promise<ScienceReview | null> => {
  if (!process.env.GEMINI_API_KEY) return null;
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: `Generate GFORCE - SPACE Science Review for topic: "${input}"`,
      config: { responseMimeType: "application/json" },
    });
    return safeParse(response.text, null);
  } catch (error) { return null; }
};
