import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { env } from '@config/env';
import { logger } from '@config/logger';
import { AppError } from '@common/errors/AppError';

type ApiErrorResponse = {
  success: false;
  error: {
    code: string;
    message: string;
  };
};

const INTERNAL_SERVER_ERROR_CODE = 'INTERNAL_SERVER_ERROR';
const VALIDATION_ERROR_CODE = 'VALIDATION_ERROR';

type PrismaKnownRequestErrorLike = {
  code: string;
  message: string;
  meta?: Record<string, unknown> | null;
  clientVersion?: string;
};

type PrismaValidationErrorLike = {
  name?: string;
  message: string;
  stack?: string;
};

const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};

const isPrismaKnownRequestError = (error: unknown): error is PrismaKnownRequestErrorLike => {
  return (
    isObject(error) &&
    typeof error.code === 'string' &&
    typeof error.message === 'string' &&
    'clientVersion' in error
  );
};

const isPrismaValidationError = (error: unknown): error is PrismaValidationErrorLike => {
  return isObject(error) && typeof error.message === 'string' && error.name === 'PrismaClientValidationError';
};

const toErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Unexpected error';
};

const createResponse = (code: string, message: string): ApiErrorResponse => {
  return {
    success: false,
    error: {
      code,
      message,
    },
  };
};

const buildUnknownErrorMessage = (error: unknown): string => {
  if (env.NODE_ENV === 'production') {
    return 'Internal server error';
  }

  if (error instanceof Error && error.stack) {
    return error.stack;
  }

  return toErrorMessage(error);
};

export const errorMiddleware: ErrorRequestHandler = (error, _req, res, _next) => {
  let statusCode = 500;
  let errorCode = INTERNAL_SERVER_ERROR_CODE;
  let message = buildUnknownErrorMessage(error);

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    errorCode = error.code;
    message = error.message;
  } else if (error instanceof ZodError) {
    statusCode = 400;
    errorCode = VALIDATION_ERROR_CODE;
    message = error.issues.map((issue) => issue.message).join(', ');
  } else if (isPrismaKnownRequestError(error)) {
    statusCode = 400;
    errorCode = error.code;
    message = error.message;
  } else if (isPrismaValidationError(error)) {
    statusCode = 400;
    errorCode = VALIDATION_ERROR_CODE;
    message = env.NODE_ENV === 'production' ? 'Invalid database query' : error.stack ?? error.message;
  } else {
    logger.error('Unhandled application error', { error });
  }

  const response = createResponse(errorCode, message);

  res.status(statusCode).json(response);
};

export type { ApiErrorResponse };