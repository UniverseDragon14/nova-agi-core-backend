import express from 'express';
import dotenv from 'dotenv';
import { novaBoot } from './novaCore.js';

// ==========================================
// Universal Dragon • NOVA API Gateway
// 7th-Dimension Express Server Layer
// Serverless Ready • Quantum Secured
// ==========================================

// NOTE: Vercel Web Analytics is installed (@vercel/analytics)
// This is a backend API service. Vercel Web Analytics tracks client-side
// page views and requires browser-based rendering to function.
// 
// If you add frontend pages (HTML responses), integrate analytics like this:
// import { inject } from '@vercel/analytics';
// inject({ mode: process.env.NODE_ENV === 'production' ? 'production' : 'development' });
//
// For API-only backends, consider using Vercel's Speed Insights or 
// Observability tools for backend monitoring instead.

const SYSTEM_IDENTITY = {
  BRAND: 'UNIVERSAL_DRAGON',
  MATRIX_ENGINE: 'ASLAM',
  AI_ENTITY: 'NOVA_CORE',
  STATUS: 'AWAITING_CREATORS_COMMAND'
};

dotenv.config();
const app = express();

app.use(express.json({ limit: '1mb' }));

app.use((req, res, next) => {
  res.setHeader('X-Powered-By', 'UNIVERSAL_DRAGON_7D_CORE');
  res.setHeader('X-Nova-Dimension', 'API_GATEWAY');
  next();
});

app.get('/', (_req, res) => {
  return res.status(200).json({
    ok: true,
    brand: SYSTEM_IDENTITY.BRAND,
    matrix_engine: SYSTEM_IDENTITY.MATRIX_ENGINE,
    core: 'NOVA_GATEWAY',
    ai_entity: SYSTEM_IDENTITY.AI_ENTITY,
    dimension: '7D_EXPRESS_LAYER',
    status: 'NOVA CORE ONLINE',
    pulse: 'STABLE',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (_req, res) => {
  return res.status(200).json({
    ok: true,
    status: 'HEALTHY',
    system: SYSTEM_IDENTITY.BRAND,
    core: 'NOVA_GATEWAY',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/nova', async (req, res) => {
  try {
    const body = req.body || {};
    const user = typeof body.user === 'string' && body.user.trim()
      ? body.user.trim()
      : 'GHOST_OPERATOR';

    const command = typeof body.command === 'string'
      ? body.command.trim()
      : '';

    if (!command) {
      return res.status(400).json({
        ok: false,
        system: SYSTEM_IDENTITY.BRAND,
        matrix_engine: SYSTEM_IDENTITY.MATRIX_ENGINE,
        core: 'NOVA_GATEWAY',
        dimension: '7D_EXPRESS_LAYER',
        error: 'EMPTY_COMMAND_VECTOR',
        message: 'A valid command vector is required to establish neural link.'
      });
    }

    const result = await novaBoot(command, user);

    return res.status(200).json({
      ok: true,
      system: SYSTEM_IDENTITY.BRAND,
      matrix_engine: SYSTEM_IDENTITY.MATRIX_ENGINE,
      gateway: 'NOVA_GATEWAY',
      result
    });
  } catch (err) {
    console.error('[API_GATEWAY_MELTDOWN]', err);

    return res.status(500).json({
      ok: false,
      system: SYSTEM_IDENTITY.BRAND,
      matrix_engine: SYSTEM_IDENTITY.MATRIX_ENGINE,
      core: 'NOVA_GATEWAY',
      dimension: '7D_EXPRESS_LAYER',
      error: 'CATASTROPHIC_SERVER_FAILURE',
      message: err?.message || 'Unknown quantum anomaly detected in the gateway'
    });
  }
});

const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log('[UNIVERSAL_DRAGON] NOVA CORE ONLINE');
    console.log(`[MATRIX_ENGINE] ${SYSTEM_IDENTITY.MATRIX_ENGINE}`);
    console.log(`[PORT] ${port}`);
  });
}

export default app;
