import { randomUUID } from 'node:crypto';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from '@config/passport';
import { env } from '@config/env';
import { getRequestLogger } from '@config/logger';
import { errorMiddleware } from '@middleware/error.middleware';
import { authRoutes } from './modules/auth/auth.routes';
import { meRoutes } from './modules/auth/me.routes';
import { companyRoutes } from './modules/company/company.routes';
import { programRoutes } from './modules/program/program.routes';
import { programActivationRoutes } from './modules/program/program.activation.routes';
import { reportRoutes } from './modules/report/report.routes';
import { notificationRoutes } from './modules/notification/notification.routes';

export const app = express();

app.disable('x-powered-by');
app.set('trust proxy', env.TRUST_PROXY);

app.use(
  cors({
    origin: env.FRONTEND_BASE_URL,
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(passport.initialize());

app.use((req, res, next) => {
  const incomingRequestId = req.header(env.REQUEST_ID_HEADER);
  const requestId = incomingRequestId && incomingRequestId.trim().length > 0 ? incomingRequestId : randomUUID();
  const requestLogger = getRequestLogger(requestId);
  const startedAt = Date.now();

  res.setHeader(env.REQUEST_ID_HEADER, requestId);
  res.locals.requestId = requestId;

  requestLogger.info(`${req.method} ${req.originalUrl}`);

  res.on('finish', () => {
    const durationMs = Date.now() - startedAt;
    const message = `${req.method} ${req.originalUrl} ${res.statusCode} ${durationMs}ms`;

    if (res.statusCode >= 500) {
      requestLogger.error(message);
      return;
    }

    if (res.statusCode >= 400) {
      requestLogger.warn(message);
      return;
    }

    requestLogger.info(message);
  });

  next();
});

app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    status: 'ok' as const,
  });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/auth', meRoutes);
app.use('/api/v1/company', companyRoutes);
app.use('/api/v1/program', programRoutes);
app.use('/api/v1/program', programActivationRoutes);
app.use('/api/v1/report', reportRoutes);
app.use('/api/v1/notification', notificationRoutes);

app.use(errorMiddleware);

export default app;