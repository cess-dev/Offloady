/**
 * app.js
 * Express application setup — middleware, routes, error handling.
 */

import './config/env.js'; // validate env vars first
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import aiRoutes from './routes/aiRoutes.js';
import productRoutes from './routes/productRoutes.js';
import { logger } from './utils/logger.js';

const app = express();

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json({ limit: '16kb' }));

// ── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/ai',       aiRoutes);
app.use('/api/products', productRoutes);

app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'offloady-api' }));

// ── 404 handler ─────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

// ── Global error handler ────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  logger.error('Unhandled error:', err.message);
  res.status(500).json({ error: 'Internal server error.' });
});

export default app;