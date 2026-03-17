// NOVA Core Logger
// Vercel / Serverless safe logger (console only)

function safeSerialize(value) {
  try {
    return JSON.stringify(value);
  } catch {
    return JSON.stringify({ note: 'Unserializable payload' });
  }
}

function formatLog(level, event, payload) {
  const timestamp = new Date().toISOString();

  return {
    timestamp,
    level,
    event,
    payload
  };
}

export function logEvent(event, payload = {}) {
  try {
    const upperEvent = String(event || 'UNKNOWN_EVENT').toUpperCase();

    let level = 'info';
    if (
      upperEvent.includes('ERROR') ||
      upperEvent.includes('FAIL') ||
      upperEvent.includes('CRASH')
    ) {
      level = 'error';
    } else if (
      upperEvent.includes('WARN') ||
      upperEvent.includes('BLOCK') ||
      upperEvent.includes('ALERT')
    ) {
      level = 'warn';
    }

    const logEntry = formatLog(level, upperEvent, payload);
    const serialized = safeSerialize(logEntry);

    if (level === 'error') {
      console.error(serialized);
    } else if (level === 'warn') {
      console.warn(serialized);
    } else {
      console.log(serialized);
    }
  } catch (error) {
    console.error(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        level: 'error',
        event: 'LOGGER_FAILURE',
        payload: {
          originalEvent: event,
          message: error?.message || 'Unknown logger error'
        }
      })
    );
  }
}
