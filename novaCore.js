// 7th-Dimension Neural Uplink
import { assessCommandRisk } from './safety.js';
import { getUserProfile } from './profile.js';
import { decomposeTask } from './planner.js';
import { processNeuralCore } from './brain.js';
import { evaluateOutput } from './judge.js';
import { logEvent } from './logger.js';
import { rememberSession, getSessionMemory } from './shortTerm.js';
import { saveLongTerm, readLongTerm } from './longTerm.js';
import { getTool } from './registry.js';

/**
 * 7th-Dimension NOVA CORE: 
 * அண்டார்டிக் அளவிலான பெரிய தரவுகளை நொடிப் பொழுதில் அனலைஸ் செய்யும் 
 * ஒரு "Multiverse Awareness" கொண்ட AI ஆர்க்கிடெக்சர்.
 */
export async function novaBoot(userCommand, user) {
  // 1. DIMENSION SHIFT: User Identity Extraction from 7D Layer
  const profile = getUserProfile(user);
  
  // 2. TEMPORAL SHIELD: Quantum Risk Assessment
  const safety = assessCommandRisk(userCommand, profile.role);
  
  // 3. EVENT HORIZON: Initial Log (System Awareness)
  logEvent('dimension_entry', { 
    entity: user, 
    vector: userCommand, 
    clearance: profile.role,
    timestamp: new Date().toISOString() 
  });

  if (!safety.allowed) {
    return { 
      status: 'BLOCKED_BY_POLICY_ENGINE', 
      dimension: '7D-SHIELD', 
      reason: safety.reason,
      riskLevel: safety.score 
    };
  }

  // 4. NEURAL DECOMPOSITION: Breaking the Multiverse into Sub-tasks
  const multiversePlan = decomposeTask(userCommand);
  const sessionMemory = getSessionMemory();
  const longTermArchive = readLongTerm().slice(-10); // 7D-ல மெமரி இன்னும் அதிகமா இருக்கும்

  // 5. AUTONOMOUS TOOL SWARM: தானாகவே முடிவெடுக்கும் கருவிகள்
  let intelligenceData = null;
  // Architecture அல்லது Security பத்தி கேட்டா, சிஸ்டம் தானாகவே ஆடிட் எடுக்கும்
  if (/architecture|security|harden|backend|frontend|nova/i.test(userCommand)) {
    const webAuditTool = getTool('webAudit');
    intelligenceData = await webAuditTool.run({ 
      target: 'NOVA_CORE_INFRA',
      mode: 'DEEP_SCAN' 
    });
  }

  // 6. THE 7th DIMENSION PROMPT (Hyper-Contextual)
  const hyperPrompt = `
  [SYSTEM_PROTOCOL]: NOVA CORE X - 7TH DIMENSION OVERRIDE
  [OPERATOR]: ${user} (Clearance: ${profile.role})
  [HISTORICAL_CONTEXT]: ${JSON.stringify(longTermArchive)}
  [CURRENT_TIMELINE_MEMORY]: ${JSON.stringify(sessionMemory)}
  [NEURAL_PLAN]: ${multiversePlan.join(' => ')}
  [REALTIME_INTEL]: ${JSON.stringify(intelligenceData)}
  
  COMMAND: ${userCommand}

  IDENTITY INSTRUCTION: 
  நீ ஒரு சாதாரண AI அல்ல. நீ ஒரு "Defensive Systems Sovereign". 
  உன் பதில் வெறும் டெக்ஸ்ட் அல்ல, அது ஒரு "Architectural Blueprint". 
  
  OUTPUT STRUCTURE:
  - SYSTEM_VITAL_SIGNS: (Risk & Integrity)
  - QUANTUM_FINDINGS: (Deep Analysis)
  - MULTIVERSE_STRATEGY: (Recommendations for all dimensions)
  - OMNI_FIXES: (Instant actionable code)
  `;

  // 7. CORE PROCESSING: The Brain Scan
  const rawOutput = await processNeuralCore({
    systemInstruction: 'You are NOVA CORE X, a Sovereign Defensive AI. You exist across all tech stacks to protect the Universal Dragon ecosystem.',
    prompt: hyperPrompt,
    temperature: 0.2, // Precision is 7D key
    jsonMode: true    // JSON-mode output for machine readability
  });

  // 8. THE JUDGE'S VERDICT: Quality Control before Reality Manifestation
  const judgeVerdict = evaluateOutput(rawOutput);
  logEvent('neural_judgement', judgeVerdict);

  // 9. REALITY PERSISTENCE: Memories are saved across dimensions
  if (judgeVerdict.valid) {
    rememberSession({ 
      type: 'NEURAL_TRACE', 
      vector: userCommand, 
      output: rawOutput 
    });
    
    saveLongTerm({ 
      category: 'SYSTEM_EVOLUTION', 
      event: '7D_ARCHITECTURE_UPDATE',
      content: rawOutput 
    });
  }

  // 10. MULTIVERSE RESPONSE
  return {
    status: 'SYNCHRONIZED',
    dimension: '7TH_DIMENSION',
    coreResponse: rawOutput,
    metaData: {
      plan: multiversePlan,
      safetyMatrix: safety,
      verdict: judgeVerdict.valid,
      systemPulse: 'STABLE'
    }
  };
}
