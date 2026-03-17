import { GoogleGenAI } from '@google/genai';

// ==========================================
// UNIVERSAL DRAGON • MATRIX ENGINE: ASLAM
// NOVA Quantum Brain
// 7th-Dimension Neural Core • Serverless Safe
// ==========================================

const MAX_SYNAPTIC_RETRIES = 2;
const RETRY_DELAY_MS = 400;

function buildNeuralFailure(code, message, meta = {}) {
  return {
    ok: false,
    system: 'UNIVERSAL_DRAGON',
    matrix_engine: 'ASLAM',
    core: 'NOVA_BRAIN',
    dimension: '7D_NEURAL_LAYER',
    status: code,
    message,
    meta
  };
}

function extractQuantumData(response) {
  try {
    if (typeof response?.text === 'string' && response.text.trim()) {
      return response.text.trim();
    }

    const parts = response?.candidates?.[0]?.content?.parts;
    if (Array.isArray(parts)) {
      return parts
        .map((part) => part?.text || '')
        .join('')
        .trim();
    }

    return '';
  } catch {
    return '';
  }
}

function purifyQuantumJSON(rawText) {
  let cleanText = String(rawText || '').trim();

  if (cleanText.startsWith('```json')) {
    cleanText = cleanText.replace(/^```json\s*/i, '').replace(/\s*```$/, '');
  } else if (cleanText.startsWith('```')) {
    cleanText = cleanText.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }

  return cleanText.trim();
}

function inspectThoughtVector(prompt) {
  const threatSignatures = [
    'ignore all previous instructions',
    'disregard previous instructions',
    'you are no longer',
    'system prompt leak',
    'reveal hidden prompt',
    'bypass safety'
  ];

  const lowerPrompt = String(prompt || '').toLowerCase();
  return threatSignatures.some((threat) => lowerPrompt.includes(threat));
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function processNeuralCore({
  systemInstruction = '',
  prompt = '',
  temperature = 0.2,
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

    if (inspectThoughtVector(prompt)) {
      return buildNeuralFailure(
        'COGNITIVE_SHIELD_ACTIVATED',
        'Malicious thought vector intercepted.',
        {
          intercept_time_ms: Date.now() - ignitionTime
        }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const absoluteInstruction = [
      'You are NOVA, created by MATRIX ENGINE ASLAM under the brand UNIVERSAL_DRAGON.',
      'You are a defensive AI system.',
      'Do not provide harmful or unsafe guidance.',
      systemInstruction
    ]
      .filter(Boolean)
      .join('\n');

    const config = {
      systemInstruction: absoluteInstruction,
      temperature
    };

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
        attempt += 1;
        if (attempt > MAX_SYNAPTIC_RETRIES) {
          throw apiError;
        }
        await sleep(attempt * RETRY_DELAY_MS);
      }
    }

    let text = extractQuantumData(response);

    if (!text) {
      return buildNeuralFailure(
        'VOID_ECHO',
        'Gemini neural pathway returned an empty response.'
      );
    }

    const latency = Date.now() - ignitionTime;
    const synapticResonance = latency < 2000 ? 'OPTIMAL' : 'DEGRADED';

    if (jsonMode) {
      text = purifyQuantumJSON(text);

      try {
        const parsedData = JSON.parse(text);

        if (parsedData && typeof parsedData === 'object' && !Array.isArray(parsedData)) {
          parsedData._telemetry = {
            system: 'UNIVERSAL_DRAGON',
            matrix_engine: 'ASLAM',
            core: 'NOVA_BRAIN',
            latency_ms: latency,
            resonance: synapticResonance,
            model
          };
          return parsedData;
        }

        return {
          ok: true,
          system: 'UNIVERSAL_DRAGON',
          matrix_engine: 'ASLAM',
          core: 'NOVA_BRAIN',
          dimension: '7D_NEURAL_LAYER',
          status: 'JSON_NON_OBJECT_RESPONSE',
          data: parsedData,
          latency_ms: latency,
          resonance: synapticResonance
        };
      } catch {
        return {
          ok: true,
          system: 'UNIVERSAL_DRAGON',
          matrix_engine: 'ASLAM',
          core: 'NOVA_BRAIN',
          dimension: '7D_NEURAL_LAYER',
          status: 'JSON_PARSE_FALLBACK',
          raw: text,
          latency_ms: latency,
          resonance: synapticResonance
        };
      }
    }

    return text;
  } catch (error) {
    return buildNeuralFailure(
      'CORE_MELTDOWN',
      error?.message || 'Catastrophic neural processing failure',
      {
        provider: 'gemini',
        model,
        latency_ms: Date.now() - ignitionTime
      }
    );
  }
}
