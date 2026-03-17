// ==========================================
// Universal Dragon • NOVA Echo Cache
// 7th-Dimension Short-Term Temporal Memory
// Serverless Safe • SI-Enhanced
// ==========================================

const DRAGON_ECHO_LIMIT = 20;
const QUANTUM_DECAY_MS = 30 * 60 * 1000; // 30 minutes

let sessionMemory = [];

function normalizePriority(priority = 'NORMAL') {
  const value = String(priority).toUpperCase();

  if (['LOW', 'NORMAL', 'HIGH', 'CRITICAL'].includes(value)) {
    return value;
  }

  return 'NORMAL';
}

function forgeSessionEcho(entry = {}) {
  const now = new Date();

  return {
    echo_id: `NOVA_ECHO_${now.getTime()}_${Math.random().toString(36).slice(2, 8)}`,
    timestamp: now.toISOString(),
    system: 'UNIVERSAL_DRAGON',
    core: 'NOVA',
    dimension_layer: '7D_SHORT_TERM',
    echo_type: entry.type || 'SESSION_TRACE',
    priority: normalizePriority(entry.priority),
    ...entry
  };
}

function stabilizeSessionField() {
  if (sessionMemory.length > DRAGON_ECHO_LIMIT) {
    sessionMemory = sessionMemory.slice(-DRAGON_ECHO_LIMIT);
  }
}

function isEchoAlive(echo) {
  try {
    const currentTime = Date.now();
    const echoTime = new Date(echo.timestamp).getTime();

    if (Number.isNaN(echoTime)) return false;

    const echoAge = currentTime - echoTime;
    const priority = normalizePriority(echo.priority);
    const isPersistent = priority === 'HIGH' || priority === 'CRITICAL';

    return isPersistent || echoAge < QUANTUM_DECAY_MS;
  } catch {
    return false;
  }
}

function runQuantumDecay() {
  sessionMemory = sessionMemory.filter(isEchoAlive);
}

export function rememberSession(entry = {}) {
  try {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
      return {
        ok: false,
        status: 'REJECTED_BY_ECHO_CACHE',
        reason: 'Invalid echo payload'
      };
    }

    const forgedEcho = forgeSessionEcho(entry);
    sessionMemory.push(forgedEcho);

    runQuantumDecay();
    stabilizeSessionField();

    return {
      ok: true,
      status: 'ECHO_CAPTURED',
      echo_id: forgedEcho.echo_id,
      priority_level: forgedEcho.priority,
      active_echoes: sessionMemory.length
    };
  } catch (error) {
    console.error(
      JSON.stringify({
        level: 'error',
        event: 'SHORT_TERM_CAPTURE_FAILURE',
        timestamp: new Date().toISOString(),
        payload: {
          message: error?.message || 'Unknown capture failure'
        }
      })
    );

    return {
      ok: false,
      status: 'ECHO_CAPTURE_FAILED',
      reason: error?.message || 'Unknown short-term memory failure'
    };
  }
}

export function getSessionMemory() {
  try {
    runQuantumDecay();
    return [...sessionMemory];
  } catch (error) {
    console.error(
      JSON.stringify({
        level: 'error',
        event: 'SHORT_TERM_READ_FAILURE',
        timestamp: new Date().toISOString(),
        payload: {
          message: error?.message || 'Unknown read failure'
        }
      })
    );

    return [];
  }
}

export function clearSessionMemory() {
  sessionMemory = [];

  return {
    ok: true,
    status: 'SESSION_FIELD_CLEARED',
    active_echoes: 0
  };
}

export function getSessionPulse() {
  runQuantumDecay();

  const critical = sessionMemory.filter(
    (echo) => normalizePriority(echo.priority) === 'CRITICAL'
  ).length;

  const high = sessionMemory.filter(
    (echo) => normalizePriority(echo.priority) === 'HIGH'
  ).length;

  return {
    status: 'ECHO_CACHE_STABLE',
    system: 'UNIVERSAL_DRAGON',
    core: 'NOVA',
    dimension_layer: '7D_SHORT_TERM',
    active_echoes: sessionMemory.length,
    critical_echoes: critical,
    high_priority_echoes: high,
    decay_timer: '30_MINUTES_TTL',
    echo_limit: DRAGON_ECHO_LIMIT
  };
}
