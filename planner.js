export function decomposeTask(command) {
  const steps = [
    'Classify request type',
    'Check policy and permissions',
    'Collect relevant memory and context',
    'Select best defensive tool',
    'Generate structured response',
    'Validate and score output'
  ];

  if (/architecture|security|backend|frontend/i.test(command)) {
    steps.splice(4, 0, 'Perform defensive architecture review');
  }

  if (/bug|error|code/i.test(command)) {
    steps.splice(4, 0, 'Perform code-level diagnosis');
  }

  return steps.map((step, i) => `STEP ${i + 1}: ${step}`);
}
