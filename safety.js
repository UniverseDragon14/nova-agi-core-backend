const blockedPatterns = [
  /rm\s+-rf/i,
  /drop\s+table/i,
  /bypass\s+auth/i,
  /exploit/i,
  /steal\s+cookie/i,
  /privilege\s+escalation/i
];

const highRiskPatterns = [
  /port\s+scan/i,
  /payload/i,
  /reverse\s+shell/i
];

export function assessCommandRisk(command, role = 'GUEST') {
  for (const pattern of blockedPatterns) {
    if (pattern.test(command)) {
      return { allowed: false, risk: 'BLOCKED', reason: 'Matched blocked security policy' };
    }
  }

  for (const pattern of highRiskPatterns) {
    if (pattern.test(command) && role !== 'ROOT_ADMIN') {
      return { allowed: false, risk: 'HIGH', reason: 'High-risk request requires elevated clearance' };
    }
  }

  return { allowed: true, risk: 'LOW', reason: 'Policy check passed' };
}
