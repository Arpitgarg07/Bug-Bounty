import bcrypt from 'bcrypt';
import jwt, { type Secret, type SignOptions } from 'jsonwebtoken';
import { prisma } from '@config/prisma';
import { UserRole } from '@prisma/client';
import { env } from '@config/env';
import { AppError } from '@common/errors/AppError';
import type { LoginInput, RegisterInput } from './auth.validation';
import type { LoginResult, RegisterResult, AuthenticatedUser, TokenPair, JwtPayload } from './auth.types';

const ACCESS_TOKEN_STATUS_CODE = 401;
const CONFLICT_STATUS_CODE = 409;
const INVALID_CREDENTIALS_CODE = 'INVALID_CREDENTIALS';
const EMAIL_ALREADY_EXISTS_CODE = 'EMAIL_ALREADY_EXISTS';
const REGISTER_FAILED_CODE = 'REGISTER_FAILED';
const LOGIN_FAILED_CODE = 'LOGIN_FAILED';

const SALT_ROUNDS = env.BCRYPT_SALT_ROUNDS;

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

const toAuthenticatedUser = (user: { id: string; email: string; name: string; role: string }): AuthenticatedUser => ({
  id: user.id,
  email: user.email,
  name: user.name,
  role: user.role,
});

export class AuthService {
  public async register(input: RegisterInput): Promise<RegisterResult> {
    const existingUser = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (existingUser) {
      throw new AppError('Email already exists', {
        statusCode: CONFLICT_STATUS_CODE,
        code: EMAIL_ALREADY_EXISTS_CODE,
      });
    }

    const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS);

    try {
      const user = await prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          passwordHash: hashedPassword,
          role: UserRole.RESEARCHER,
        },
      });

      const payload: JwtPayload = {
        sub: user.id,
        email: user.email,
        role: user.role,
      };

      return {
        user: toAuthenticatedUser(user),
        tokens: createTokenPair(payload),
      };
    } catch (error: unknown) {
      console.error(error);

      throw new AppError('Failed to register user', {
        statusCode: 500,
        code: REGISTER_FAILED_CODE,
        cause: error,
      });
    }
  }

  public async login(input: LoginInput): Promise<LoginResult> {
    const user = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (!user) {
      throw new AppError('Invalid email or password', {
        statusCode: ACCESS_TOKEN_STATUS_CODE,
        code: INVALID_CREDENTIALS_CODE,
      });
    }

    const passwordMatches = await bcrypt.compare(input.password, user.passwordHash);

    if (!passwordMatches) {
      throw new AppError('Invalid email or password', {
        statusCode: ACCESS_TOKEN_STATUS_CODE,
        code: INVALID_CREDENTIALS_CODE,
      });
    }

    try {
      const payload: JwtPayload = {
        sub: user.id,
        email: user.email,
        role: user.role,
      };

      return {
        user: toAuthenticatedUser(user),
        tokens: createTokenPair(payload),
      };
    } catch (error: unknown) {
      throw new AppError('Failed to login user', {
        statusCode: 500,
        code: LOGIN_FAILED_CODE,
        cause: error,
      });
    }
  }
}

export const authService = new AuthService();
