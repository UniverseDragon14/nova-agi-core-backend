const tools = {
  webAudit: {
    name: 'webAudit',
    description: 'Defensive web architecture review',
    run: async (input) => ({
      summary: 'Reviewed architecture for common weaknesses',
      findings: [
        'Check auth/session handling',
        'Validate input sanitization',
        'Review secrets management',
        'Enable rate limits and logging'
      ],
      target: input.target || 'local-app'
    })
  },
  codeReview: {
    name: 'codeReview',
    description: 'Static defensive code review',
    run: async () => ({
      summary: 'Reviewed provided code for defensive improvements',
      findings: [
        'Use structured validation',
        'Avoid unsafe trust boundaries',
        'Add role-based access control',
        'Return JSON for reliability'
      ]
    })
  }
};

export function getTool(name) {
  return tools[name];
}
