export type AuthenticatedUser = {
  id: string;
  email: string;
  name: string;
  role: string;
};

export type JwtPayload = {
  sub: string;
  email: string;
  role: string;
};

export type TokenPair = {
  accessToken: string;
  refreshToken: string;
};

export type LoginResult = {
  user: AuthenticatedUser;
  tokens: TokenPair;
};

export type RegisterResult = {
  user: AuthenticatedUser;
  tokens: TokenPair;
};
