import { assessCommandRisk } from './core/safety.js';
import { getUserProfile } from './core/profile.js';
import { decomposeTask } from './core/planner.js';
import { processNeuralCore } from './core/brain.js';
import { evaluateOutput } from './core/judge.js';
import { logEvent } from './core/logger.js';
import { rememberSession, getSessionMemory } from './memory/shortTerm.js';
import { saveLongTerm, readLongTerm } from './memory/longTerm.js';
import { getTool } from './tools/registry.js';

export async function novaBoot(userCommand, user) {
  const profile = getUserProfile(user);
  const safety = assessCommandRisk(userCommand, profile.role);
  logEvent('command_received', { user, userCommand, safety });

  if (!safety.allowed) {
    return { ok: false, blocked: true, reason: safety.reason };
  }

  const plan = decomposeTask(userCommand);
  const sessionMemory = getSessionMemory();
  const longTerm = readLongTerm().slice(-5);

  let toolResult = null;
  if (/architecture|security|harden|backend|frontend/i.test(userCommand)) {
    const tool = getTool('webAudit');
    toolResult = await tool.run({ target: 'localhost' });
  }

  const prompt = `
User: ${user}
Role: ${profile.role}
Risk: ${JSON.stringify(safety)}
Recent Session Memory: ${JSON.stringify(sessionMemory)}
Relevant Long-Term Memory: ${JSON.stringify(longTerm)}
Plan: ${plan.join(' -> ')}
Tool Result: ${JSON.stringify(toolResult)}
Command: ${userCommand}

Return:
1. Risk Summary
2. Findings
3. Recommendations
4. Priority Fixes
`;

  const output = await processNeuralCore({
    systemInstruction: 'You are NOVA CORE X, a defensive AI systems architect. Never provide offensive guidance.',
    prompt
  });

  const verdict = evaluateOutput(output);
  logEvent('judge_result', verdict);

  if (verdict.valid) {
    rememberSession({ type: 'assistant_output', output });
    saveLongTerm({ type: 'security_review', command: userCommand, output });
  }

  return {
    ok: verdict.valid,
    profile,
    safety,
    plan,
    toolResult,
    output,
    verdict
  };
}
