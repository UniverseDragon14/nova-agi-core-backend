import { GoogleGenAI } from '@google/genai';

// ==========================================
// Universal Dragon • NOVA Quantum Brain
// 7th-Dimension Neural Core • Einstein Tier
// Auto-Healing Synapses • Serverless Safe
// ==========================================

const MAX_SYNAPTIC_RETRIES = 2;

function buildNeuralFailure(code, message, meta = {}) {
  return {
    ok: false,
    system: 'UNIVERSAL_DRAGON',
    core: 'NOVA_BRAIN',
    dimension: '7D_NEURAL_LAYER',
    status: code,
    message,
    meta
  };
}

function extractQuantumData(response) {
  try {
    if (response?.text) return response.text;

    const parts = response?.candidates?.[0]?.content?.parts;
    if (Array.isArray(parts)) {
      return parts.map((part) => part?.text || '').join('').trim();
    }

    return '';
  } catch {
    return '';
  }
}

function purifyQuantumJSON(rawText) {
  let cleanText = String(rawText).trim();

  if (cleanText.startsWith('```json')) {
    cleanText = cleanText.replace(/^```json\s*/i, '').replace(/\s*```$/, '');
  } else if (cleanText.startsWith('```')) {
    cleanText = cleanText.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }

  return cleanText;
}

export async function processNeuralCore({
  systemInstruction = '',
  prompt = '',
  temperature = 0.3,
  model = 'gemini-2.5-flash',
  jsonMode = false
} = {}) {
  const ignitionTime = Date.now();

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return buildNeuralFailure(
        'NEURAL_LINK_SEVERED',
        'GEMINI_API_KEY is missing in environment variables.'
      );
    }

    if (!prompt || typeof prompt !== 'string') {
      return buildNeuralFailure(
        'INVALID_THOUGHT_VECTOR',
        'Prompt payload is empty or corrupted.'
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    const config = { systemInstruction, temperature };

    if (jsonMode) {
      config.responseMimeType = 'application/json';
    }

    let attempt = 0;
    let response = null;

    while (attempt <= MAX_SYNAPTIC_RETRIES) {
      try {
        response = await ai.models.generateContent({
          model,
          contents: prompt,
          config
        });
        break;
      } catch (apiError) {
        attempt++;
        if (attempt > MAX_SYNAPTIC_RETRIES) throw apiError;
        await new Promise((resolve) => setTimeout(resolve, attempt * 400));
      }
    }

    let text = extractQuantumData(response);

    if (!text) {
      return buildNeuralFailure(
        'VOID_ECHO',
        'Gemini neural pathway returned an empty response.'
      );
    }

    if (jsonMode) {
      text = purifyQuantumJSON(text);

      try {
        return JSON.parse(text);
      } catch {
        return {
          ok: true,
          system: 'UNIVERSAL_DRAGON',
          core: 'NOVA_BRAIN',
          dimension: '7D_NEURAL_LAYER',
          status: 'JSON_PARSE_FALLBACK',
          raw: text
        };
      }
    }

    return text;
  } catch (error) {
    return buildNeuralFailure(
      'CORE_MELTDOWN',
      error?.message || 'Catastrophic neural processing failure',
      {
        model,
        provider: 'gemini',
        latency_ms: Date.now() - ignitionTime
      }
    );
  }
}
