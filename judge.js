export function evaluateOutput(output) {
  if (!output || !output.trim()) {
    return { valid: false, score: 0, reason: 'Empty response' };
  }

  let score = 50;
  if (output.length > 100) score += 10;
  if (/risk|security|recommend|architecture|priority/i.test(output)) score += 20;
  if (/1\.|2\.|3\./.test(output)) score += 10;
  if (/missing|error|unknown/i.test(output)) score -= 20;

  return {
    valid: score >= 60,
    score,
    reason: score >= 60 ? 'Approved' : 'Insufficient quality'
  };
}
