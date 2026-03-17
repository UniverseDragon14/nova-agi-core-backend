// NOVA Quantum Logger
// Serverless-safe logging layer for Vercel

function safeSerialize(value) {
  try {
    return JSON.stringify(value);
  } catch {
    return JSON.stringify({ note: 'Payload could not be serialized' });
  }
}

export function logEvent(event, payload = {}) {
  try {
    const timestamp = new Date().toISOString();
    const normalizedEvent = String(event || 'UNKNOWN_EVENT').toUpperCase();

    const entry = {
      dimension: 'NOVA_CORE',
      timestamp,
      event: normalizedEvent,
      payload
    };

    const serialized = safeSerialize(entry);

    if (
      normalizedEvent.includes('ERROR') ||
      normalizedEvent.includes('FAIL') ||
      normalizedEvent.includes('CRASH')
    ) {
      console.error(serialized);
      return;
    }

    if (
      normalizedEvent.includes('WARN') ||
      normalizedEvent.includes('BLOCK') ||
      normalizedEvent.includes('ALERT')
    ) {
      console.warn(serialized);
      return;
    }

    console.log(serialized);
  } catch (error) {
    console.error(
      JSON.stringify({
        dimension: 'NOVA_CORE',
        timestamp: new Date().toISOString(),
        event: 'LOGGER_FAILURE',
        payload: {
          message: error?.message || 'Unknown logging failure'
        }
      })
    );
  }
}
