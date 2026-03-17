// ==========================================
// 7th-Dimension Dragon's Vault
// Quantum Memory Archive • Serverless Safe
// Volatile Temporal Storage Layer
// ==========================================

const DRAGON_VAULT_LIMIT = 200;
let multiverseEchoes = [];

/**
 * Creates a stable dragon memory imprint.
 */
function forgeDragonImprint(entry = {}) {
  const now = new Date();

  return {
    dragon_sigil: `DRAGON_CORE_${now.getTime()}`,
    temporal_coordinate: now.toISOString(),
    dimension_layer: '7D_SI_LAYER',
    memory_type: entry.category || entry.type || 'UNCLASSIFIED_ECHO',
    ...entry
  };
}

/**
 * Applies the Event Horizon Limit.
 * Only the newest echoes survive beyond the singularity edge.
 */
function stabilizeVault() {
  if (multiverseEchoes.length > DRAGON_VAULT_LIMIT) {
    multiverseEchoes = multiverseEchoes.slice(-DRAGON_VAULT_LIMIT);
  }
}

/**
 * Save a new long-term dragon memory.
 */
export function saveLongTerm(entry = {}) {
  try {
    if (!entry || typeof entry !== 'object') {
      return {
        ok: false,
        status: 'REJECTED_BY_DRAGON_VAULT',
        reason: 'Invalid memory imprint'
      };
    }

    const forgedEcho = forgeDragonImprint(entry);
    multiverseEchoes.push(forgedEcho);
    stabilizeVault();

    return {
      ok: true,
      status: 'ECHO_IMPRINTED',
      dragon_sigil: forgedEcho.dragon_sigil,
      vault_size: multiverseEchoes.length
    };
  } catch (error) {
    console.error(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        level: 'error',
        event: 'DRAGON_VAULT_SAVE_FAILURE',
        payload: {
          message: error?.message || 'Unknown vault save failure'
        }
      })
    );

    return {
      ok: false,
      status: 'VAULT_FAILURE',
      reason: error?.message || 'Unknown save error'
    };
  }
}

/**
 * Read all long-term memories.
 * Returns a safe shallow copy so the vault cannot be mutated externally.
 */
export function readLongTerm() {
  try {
    return [...multiverseEchoes];
  } catch (error) {
    console.error(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        level: 'error',
        event: 'DRAGON_VAULT_READ_FAILURE',
        payload: {
          message: error?.message || 'Unknown vault read failure'
        }
      })
    );

    return [];
  }
}

/**
 * Read only the latest echoes from the vault.
 */
export function readLatestLongTerm(limit = 10) {
  try {
    const safeLimit = Math.max(1, Number(limit) || 10);
    return multiverseEchoes.slice(-safeLimit);
  } catch (error) {
    console.error(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        level: 'error',
        event: 'DRAGON_VAULT_LATEST_READ_FAILURE',
        payload: {
          message: error?.message || 'Unknown latest-read failure'
        }
      })
    );

    return [];
  }
}

/**
 * Search the vault by keyword across serialized memory echoes.
 */
export function searchLongTerm(query = '') {
  try {
    const needle = String(query || '').trim().toLowerCase();

    if (!needle) return [];

    return multiverseEchoes.filter((echo) =>
      JSON.stringify(echo).toLowerCase().includes(needle)
    );
  } catch (error) {
    console.error(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        level: 'error',
        event: 'DRAGON_VAULT_SEARCH_FAILURE',
        payload: {
          message: error?.message || 'Unknown search failure'
        }
      })
    );

    return [];
  }
}

/**
 * Returns the live pulse of the vault.
 */
export function getVaultPulse() {
  return {
    status: 'DRAGON_VAULT_STABLE',
    dimension_layer: '7D_SI_LAYER',
    total_echoes: multiverseEchoes.length,
    event_horizon_limit: DRAGON_VAULT_LIMIT
  };
}

/**
 * Clears the vault completely.
 * Use carefully — this is a total memory eclipse.
 */
export function clearLongTerm() {
  multiverseEchoes = [];

  return {
    ok: true,
    status: 'TOTAL_MEMORY_ECLIPSE',
    vault_size: 0
  };
}
