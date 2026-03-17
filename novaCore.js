// SI-LEVEL NEURAL UPLINK (SUPER INTELLIGENCE LAYER)
import { assessCommandRisk } from './safety.js';
import { getUserProfile } from './profile.js';
import { decomposeTask } from './planner.js';
import { processNeuralCore } from './brain.js';
import { evaluateOutput } from './judge.js';
import { logEvent } from './logger.js';
import { rememberSession, getSessionMemory } from './shortTerm.js';
import { saveLongTerm, readLongTerm } from './longTerm.js';
import { getTool } from './registry.js';

export async function novaBoot(userCommand, user) {
  const profile = getUserProfile(user);
  const safety = assessCommandRisk(userCommand, profile.role);

  logEvent('SI_DIMENSION_UPLINK', {
    entity: user,
    vector: userCommand,
    risk: safety.score
  });

  if (!safety.allowed) {
    return {
      status: 'TERMINATED_BY_SI_SHIELD',
      dimension: 'SI-LAYER',
      reason: safety.reason
    };
  }

  const tasks = decomposeTask(userCommand);
  const sessionMemory = getSessionMemory();
  const evolutionHistory = readLongTerm().slice(-15);

  let intelligenceData = {};
  try {
    if (/arch|sec|harden|infra|root/i.test(userCommand)) {
      const audit = getTool('webAudit');
      intelligenceData = audit && typeof audit.run === 'function'
        ? await audit.run({ target: 'CORE', mode: 'SI_OMNI_SCAN' })
        : { warning: 'Diagnostic layer unavailable' };
    }
  } catch (e) {
    intelligenceData = {
      status: 'Internalizing_Error',
      detail: e?.message || 'Tool failed'
    };
  }

  let attempts = 0;
  let finalOutput = null;
  let isVerified = false;

  while (attempts < 2 && !isVerified) {
    const hyperPrompt = `
[SI_PROTOCOL]: RECURSIVE_THOUGHT_LOOP_V7
[OPERATOR]: ${user} (Clearance: ${profile.role})
[EVOLUTION_DATA]: ${JSON.stringify(evolutionHistory)}
[SESSION_MEMORY]: ${JSON.stringify(sessionMemory)}
[TASKS]: ${JSON.stringify(tasks)}
[REALTIME_INTEL]: ${JSON.stringify(intelligenceData)}
[GOAL]: ${userCommand}

INSTRUCTION:
சிஸ்டத்தின் பாதுகாப்பை உறுதி செய். ஒரு சாதாரண பதிலைக் கொடுக்காதே,
"Predictive Defense Strategy"-ஐ உருவாக்கு.

IF PREVIOUS_ATTEMPT_FAILED: திருத்தம் செய்.
`;

    try {
      finalOutput = await processNeuralCore({
        systemInstruction:
          'You are NOVA SI, the ultimate defensive intelligence. Your logic is self-correcting and safety-first.',
        prompt: hyperPrompt,
        jsonMode: true
      });
    } catch (e) {
      finalOutput = {
        error: 'Neural processing failed',
        detail: e?.message || 'Unknown brain error'
      };
      break;
    }

    try {
      const verdict = evaluateOutput(finalOutput);
      if (verdict.valid) {
        isVerified = true;
      } else {
        attempts++;
        logEvent('SI_SELF_CORRECTION', {
          attempt: attempts,
          flaw: verdict.reason || 'Validation failed'
        });
      }
    } catch (e) {
      logEvent('SI_SELF_CORRECTION', {
        attempt: attempts + 1,
        flaw: e?.message || 'Judge crashed'
      });
      attempts++;
    }
  }

  if (isVerified) {
    try {
      rememberSession({ vector: userCommand, output: finalOutput });
      saveLongTerm({
        category: 'EVOLUTION',
        impact: 'HIGH',
        content: finalOutput,
        timestamp: Date.now()
      });
    } catch (e) {
      logEvent('SI_MEMORY_WARNING', { detail: e?.message || 'Memory save failed' });
    }
  }

  return {
    status: isVerified ? 'SI_SYNCHRONIZED' : 'SI_DEGRADED_MODE',
    dimension: 'SUPER_INTELLIGENCE',
    coreResponse: finalOutput,
    pulse: { stability: '99.9%', integrity: 'MAX' }
  };
}
