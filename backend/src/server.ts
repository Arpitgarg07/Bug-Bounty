import { createServer, type Server } from 'node:http';
import { app } from './app';
import { connectPrisma, disconnectPrisma } from '@config/prisma';
import { env } from '@config/env';
import { logger } from '@config/logger';

const port = env.PORT;
const host = env.HOST;

let server: Server | undefined;
let shuttingDown = false;

const closeServer = async (): Promise<void> => {
  if (!server) {
    return;
  }

  await new Promise<void>((resolve, reject) => {
    server?.close((error?: Error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
};

const shutdown = async (signal: NodeJS.Signals): Promise<void> => {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  logger.info(`Received ${signal}, starting graceful shutdown`);

  try {
    await closeServer();
    await disconnectPrisma();
    logger.info('Shutdown complete');
    process.exit(0);
  } catch (error: unknown) {
    logger.error(`Graceful shutdown failed after ${signal}`, error);
    process.exit(1);
  }
};

const start = async (): Promise<void> => {
  try {
    await connectPrisma();
  } catch (error: unknown) {
    logger.error('Failed to connect to database during startup', error);
    process.exit(1);
    return;
  }

  server = createServer(app);

  server.on('error', (error: NodeJS.ErrnoException) => {
    logger.error('HTTP server error', error);
    process.exit(1);
  });

  process.once('SIGINT', () => {
    void shutdown('SIGINT');
  });

  process.once('SIGTERM', () => {
    void shutdown('SIGTERM');
  });

  server.listen(port, host, () => {
    logger.info(`Server listening on http://${host}:${port}`);
  });
};

void start();
