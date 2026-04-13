/**
 * server.js
 * Entry point — connects the database and starts the HTTP server.
 */

import app from './app.js';
import { connectDatabase } from './config/db.js';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';

async function start() {
  await connectDatabase();
  app.listen(env.port, () => {
    logger.info(`Offloady API running on port ${env.port} [${env.nodeEnv}]`);
  });
}

start().catch((err) => {
  logger.error('Server failed to start:', err.message);
  process.exit(1);
});