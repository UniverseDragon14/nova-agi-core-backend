let sessionMemory = [];

export function rememberSession(entry) {
  sessionMemory.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    timestamp: new Date().toISOString(),
    ...entry
  });

  if (sessionMemory.length > 20) {
    sessionMemory = sessionMemory.slice(-20);
  }
}

export function getSessionMemory() {
  return sessionMemory;
}
