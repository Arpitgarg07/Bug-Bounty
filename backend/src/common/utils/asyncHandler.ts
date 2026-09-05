import type { NextFunction, Request, RequestHandler, Response } from 'express';

export type AsyncRequestHandler<P = unknown, ResBody = unknown, ReqBody = unknown, ReqQuery = unknown, Locals extends Record<string, unknown> = Record<string, unknown>> = (
  req: Request<P, ResBody, ReqBody, ReqQuery, Locals>,
  res: Response<ResBody, Locals>,
  next: NextFunction
) => Promise<unknown>;

export const asyncHandler = <P = unknown, ResBody = unknown, ReqBody = unknown, ReqQuery = unknown, Locals extends Record<string, unknown> = Record<string, unknown>>(
  handler: AsyncRequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>
): RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> => {
  return (req, res, next) => {
    void Promise.resolve(handler(req, res, next)).catch(next);
  };
};
