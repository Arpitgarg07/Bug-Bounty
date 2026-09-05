import type { Request, Response, NextFunction } from 'express';
import jwt, { type Secret, type SignOptions } from 'jsonwebtoken';
import passport from '@config/passport';
import { env } from '@config/env';
import { ApiResponse } from '@common/http/ApiResponse';
import type { JwtPayload, TokenPair } from './auth.types';

const createTokenPair = (payload: JwtPayload): TokenPair => {
  const accessTokenSecret: Secret = env.JWT_ACCESS_SECRET;
  const accessTokenOptions: SignOptions = {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN as SignOptions['expiresIn'],
    issuer: env.JWT_ACCESS_ISSUER,
    audience: env.JWT_ACCESS_AUDIENCE,
  };
  const accessToken = jwt.sign(payload, accessTokenSecret, accessTokenOptions);

  const refreshTokenSecret: Secret = env.JWT_REFRESH_SECRET;
  const refreshTokenOptions: SignOptions = {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN as SignOptions['expiresIn'],
    issuer: env.JWT_REFRESH_ISSUER,
    audience: env.JWT_REFRESH_AUDIENCE,
  };
  const refreshToken = jwt.sign(payload, refreshTokenSecret, refreshTokenOptions);

  return {
    accessToken,
    refreshToken,
  };
};

export const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false,
});

export const googleAuthCallback = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate('google', { session: false }, (err: Error | null, user: any) => {
    if (err || !user) {
      return res.redirect(`${env.FRONTEND_BASE_URL}/login.html?error=google_auth_failed`);
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const tokens = createTokenPair(payload);

    // Redirect to frontend with tokens
    const redirectUrl = `${env.FRONTEND_BASE_URL}/auth-callback.html?access_token=${tokens.accessToken}&refresh_token=${tokens.refreshToken}`;
    return res.redirect(redirectUrl);
  })(req, res, next);
};
