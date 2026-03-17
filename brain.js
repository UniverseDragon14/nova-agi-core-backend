import { GoogleGenAI } from '@google/genai';

export async function processNeuralCore({ systemInstruction, prompt }) {
  if (!process.env.GEMINI_API_KEY) {
    return 'GEMINI_API_KEY missing. Add it in your .env file.';
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.3
      }
    });

    return response.text || '';
  } catch (error) {
    return `AI error: ${error?.message || 'unknown error'}`;
  }
}
