import { PrismaClient } from '@prisma/client';
import { env } from '@config/env';

type PrismaGlobalWithClient = typeof globalThis & {
  prisma?: PrismaClient;
};

const globalForPrisma = globalThis as PrismaGlobalWithClient;

type PrismaClientOptions = ConstructorParameters<typeof PrismaClient>[0];

const prismaClientOptions: PrismaClientOptions = {
  log: env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error', 'warn']
};

const createPrismaClient = (): PrismaClient => {
  return new PrismaClient(prismaClientOptions);
};

export const prisma: PrismaClient = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export const connectPrisma = async (): Promise<void> => {
  await prisma.$connect();
};

export const disconnectPrisma = async (): Promise<void> => {
  await prisma.$disconnect();
};

export const registerPrismaShutdownHooks = (logger?: { info: (message: string, meta?: unknown) => void; error: (message: string, meta?: unknown) => void }): void => {
  const shutdown = async (signal: NodeJS.Signals): Promise<void> => {
    try {
      if (logger) {
        logger.info(`Prisma shutdown initiated by ${signal}`);
      }

      await disconnectPrisma();
      process.exit(0);
    } catch (error: unknown) {
      if (logger) {
        logger.error(`Prisma shutdown failed for ${signal}`, error);
      }

      process.exit(1);
    }
  };

  process.once('SIGINT', () => {
    void shutdown('SIGINT');
  });

  process.once('SIGTERM', () => {
    void shutdown('SIGTERM');
  });
};

export default prisma;
