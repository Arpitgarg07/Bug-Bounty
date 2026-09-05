import { format, transports, createLogger, Logger } from 'winston';
import type { TransformableInfo } from 'logform';
import { env } from './env';

const { combine, timestamp, printf, colorize, json, errors, splat } = format;

const isProd = env.NODE_ENV === 'production';
const includeTimestamp = env.LOG_INCLUDE_TIMESTAMP;
const includeRequestId = env.LOG_INCLUDE_REQUEST_ID;
const logFormatConfig = env.LOG_FORMAT; // 'json' | 'pretty'

const baseFormats = [
  errors({ stack: true }), // include stack traces for errors
  splat(), // support printf-style messages
];

if (includeTimestamp) {
  baseFormats.unshift(timestamp());
}

const jsonFormat = combine(...baseFormats, json());

const prettyFormat = combine(
  colorize({ all: true }),
  ...baseFormats,
  printf((info: TransformableInfo) => {
    const { timestamp: ts, level, message, stack, ...meta } = info as any;
    const requestIdPart = includeRequestId && meta?.requestId ? ` requestId=${meta.requestId}` : '';
    const timePart = includeTimestamp && ts ? `${ts}` : '';
    const metaKeys = Object.keys(meta).filter((k) => k !== 'requestId');

    const metaPart = metaKeys.length > 0 ? ` ${JSON.stringify(Object.fromEntries(metaKeys.map((k) => [k, (meta as any)[k]])))}` : '';

    if (stack) {
      return `${timePart} ${level}:${requestIdPart} ${message} ${metaPart}\n${stack}`.trim();
    }

    return `${timePart} ${level}:${requestIdPart} ${message}${metaPart}`.trim();
  })
);

const transportList = [
  new transports.Console({ level: env.LOG_LEVEL })
];

const logger: Logger = createLogger({
  level: env.LOG_LEVEL,
  format: logFormatConfig === 'json' || isProd ? jsonFormat : prettyFormat,
  defaultMeta: { service: env.LOG_SERVICE_NAME },
  transports: transportList
});

/**
 * Returns a child logger scoped with the provided request id and extra metadata.
 * Use this inside request middleware to attach request-specific metadata.
 */
export const getRequestLogger = (requestId?: string, extra?: Record<string, unknown>): Logger => {
  if (requestId) {
    return logger.child({ requestId, ...extra });
  }
  return logger.child({ ...extra });
};

/**
 * Writable stream compatible with morgan or other request loggers.
 */
export const stream = {
  write: (message: string) => {
    const trimmed = message.trim();
    if (trimmed.length > 0) logger.info(trimmed);
  }
};

export { logger };
export type AppLogger = Logger;
