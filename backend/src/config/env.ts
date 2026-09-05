import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const booleanFromString = z.preprocess((value) => {
  if (typeof value !== 'string') {
    return value;
  }

  const normalizedValue = value.trim().toLowerCase();

  if (normalizedValue === 'true') {
    return true;
  }

  if (normalizedValue === 'false') {
    return false;
  }

  return value;
}, z.boolean());

const numberFromString = z.preprocess((value) => {
  if (typeof value !== 'string') {
    return value;
  }

  const parsedValue = Number(value);
  return Number.isNaN(parsedValue) ? value : parsedValue;
}, z.number());

const trimmedString = z.string().trim();

const optionalTrimmedString = z.preprocess((value) => {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value === 'string') {
    const trimmedValue = value.trim();
    return trimmedValue.length > 0 ? trimmedValue : undefined;
  }

  return value;
}, z.string().trim().optional());

const csvStringArray = z.preprocess((value) => {
  if (typeof value !== 'string') {
    return value;
  }

  return value
    .split(',')
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);
}, z.array(z.string().min(1)).nonempty());

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  APP_NAME: trimmedString.min(1),
  PORT: numberFromString.pipe(z.number().int().min(1).max(65535)),
  HOST: trimmedString.min(1),
  BASE_URL: z.string().url(),
  API_BASE_URL: z.string().url(),
  FRONTEND_BASE_URL: z.string().url(),

  DATABASE_URL: z.string().min(1),
  DIRECT_DATABASE_URL: z.string().min(1),

  PRISMA_CLIENT_ENGINE_TYPE: z.enum(['binary', 'library']).default('binary'),
  PRISMA_LOG_LEVEL: z.enum(['info', 'warn', 'error']).default('warn'),
  PRISMA_MIGRATION_SHADOW_DATABASE_URL: z.string().min(1),

  JWT_ACCESS_SECRET: trimmedString.min(32),
  JWT_ACCESS_EXPIRES_IN: z.string().min(1),
  JWT_ACCESS_ISSUER: trimmedString.min(1),
  JWT_ACCESS_AUDIENCE: trimmedString.min(1),

  JWT_REFRESH_SECRET: trimmedString.min(32),
  JWT_REFRESH_EXPIRES_IN: z.string().min(1),
  JWT_REFRESH_ISSUER: trimmedString.min(1),
  JWT_REFRESH_AUDIENCE: trimmedString.min(1),

  COOKIE_NAME_REFRESH_TOKEN: trimmedString.min(1),
  COOKIE_DOMAIN: trimmedString.min(1),
  COOKIE_PATH: trimmedString.min(1),
  COOKIE_SECURE: booleanFromString,
  COOKIE_HTTP_ONLY: booleanFromString,
  COOKIE_SAME_SITE: z.enum(['lax', 'strict', 'none']),
  COOKIE_MAX_AGE_MS: numberFromString.pipe(z.number().int().positive()),

  CLOUDINARY_CLOUD_NAME: trimmedString.min(1),
  CLOUDINARY_API_KEY: trimmedString.min(1),
  CLOUDINARY_API_SECRET: trimmedString.min(1),
  CLOUDINARY_FOLDER: trimmedString.min(1),
  CLOUDINARY_SECURE: booleanFromString,

  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug', 'trace']),
  LOG_FORMAT: z.enum(['json', 'pretty']),
  LOG_INCLUDE_TIMESTAMP: booleanFromString,
  LOG_INCLUDE_REQUEST_ID: booleanFromString,
  LOG_SERVICE_NAME: trimmedString.min(1),

  RATE_LIMIT_GLOBAL_WINDOW_MS: numberFromString.pipe(z.number().int().positive()),
  RATE_LIMIT_GLOBAL_MAX: numberFromString.pipe(z.number().int().positive()),
  RATE_LIMIT_AUTH_WINDOW_MS: numberFromString.pipe(z.number().int().positive()),
  RATE_LIMIT_AUTH_MAX: numberFromString.pipe(z.number().int().positive()),
  RATE_LIMIT_API_WINDOW_MS: numberFromString.pipe(z.number().int().positive()),
  RATE_LIMIT_API_MAX: numberFromString.pipe(z.number().int().positive()),
  RATE_LIMIT_UPLOAD_WINDOW_MS: numberFromString.pipe(z.number().int().positive()),
  RATE_LIMIT_UPLOAD_MAX: numberFromString.pipe(z.number().int().positive()),

  MAIL_PROVIDER: z.enum(['sendgrid', 'ses', 'smtp']),
  MAIL_FROM: z.string().email(),
  MAIL_REPLY_TO: z.string().email(),
  MAIL_HOST: trimmedString.min(1),
  MAIL_PORT: numberFromString.pipe(z.number().int().positive()),
  MAIL_SECURE: booleanFromString,
  MAIL_USER: trimmedString.min(1),
  MAIL_PASSWORD: trimmedString.min(1),
  MAIL_DEFAULT_SENDER: trimmedString.min(1),

  WEB_APP_URL: z.string().url(),
  API_URL: z.string().url(),
  PUBLIC_SITE_URL: z.string().url(),

  BCRYPT_SALT_ROUNDS: numberFromString.pipe(z.number().int().min(10).max(15)),
  PASSWORD_RESET_TOKEN_TTL_MINUTES: numberFromString.pipe(z.number().int().positive()),
  EMAIL_VERIFICATION_TOKEN_TTL_MINUTES: numberFromString.pipe(z.number().int().positive()),
  MFA_TOTP_WINDOW: numberFromString.pipe(z.number().int().min(0).max(5)),
  SESSION_IDLE_TIMEOUT_DAYS: numberFromString.pipe(z.number().int().positive()),
  SESSION_ROTATION_ENABLED: booleanFromString,
  ENABLE_MFA: booleanFromString,
  ENABLE_AUDIT_LOGGING: booleanFromString,
  ENABLE_RATE_LIMITING: booleanFromString,

  UPLOAD_MAX_FILE_SIZE_BYTES: numberFromString.pipe(z.number().int().positive()),
  UPLOAD_ALLOWED_MIME_TYPES: csvStringArray,
  UPLOAD_PRESIGN_EXPIRY_SECONDS: numberFromString.pipe(z.number().int().positive()),

  SENTRY_DSN: optionalTrimmedString,
  REQUEST_ID_HEADER: trimmedString.min(1),
  TRUST_PROXY: z.preprocess((value) => {
    if (typeof value !== 'string') {
      return value;
    }

    const normalizedValue = value.trim().toLowerCase();

    if (normalizedValue === 'true') {
      return true;
    }

    if (normalizedValue === 'false') {
      return false;
    }

    const parsedValue = Number(value);
    return Number.isNaN(parsedValue) ? value : parsedValue;
  }, z.union([z.boolean(), z.number().int().nonnegative()])) ,

  ADMIN_BOOTSTRAP_EMAIL: z.string().email(),
  ADMIN_BOOTSTRAP_PASSWORD: trimmedString.min(12),
  ADMIN_BOOTSTRAP_NAME: trimmedString.min(1),

  GOOGLE_CLIENT_ID: trimmedString.min(1),
  GOOGLE_CLIENT_SECRET: trimmedString.min(1),
  GOOGLE_CALLBACK_URL: z.string().url(),

  NOTIFICATION_EMAIL_TO: z.string().email()
});

export type Env = z.infer<typeof envSchema>;

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const formattedIssues = parsedEnv.error.issues
    .map((issue) => `${issue.path.join('.') || 'ENV'}: ${issue.message}`)
    .join('\n');

  throw new Error(`Invalid environment configuration:\n${formattedIssues}`);
}

export const env: Env = {
  ...parsedEnv.data,
  SENTRY_DSN: parsedEnv.data.SENTRY_DSN ?? undefined
};
