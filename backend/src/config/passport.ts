import passport from 'passport';
import { Strategy as GoogleStrategy, type Profile, type VerifyCallback } from 'passport-google-oauth20';
import { prisma } from '@config/prisma';
import { env } from '@config/env';
import { UserRole, UserStatus } from '@prisma/client';

passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: env.GOOGLE_CALLBACK_URL,
      scope: ['profile', 'email'],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ): Promise<void> => {
      try {
        const email = profile.emails?.[0]?.value;
        const name = profile.displayName || profile.name?.givenName || 'Google User';
        const firstName = profile.name?.givenName || '';
        const lastName = profile.name?.familyName || '';
        const avatarUrl = profile.photos?.[0]?.value;

        if (!email) {
          return done(new Error('No email found from Google profile'), undefined);
        }

        // Check if user exists
        let user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          // Create new user with Google details
          user = await prisma.user.create({
            data: {
              email,
              name,
              passwordHash: '', // No password for OAuth users
              role: UserRole.RESEARCHER,
              status: UserStatus.ACTIVE,
              googleId: profile.id,
              avatarUrl: avatarUrl,
              isEmailVerified: true, // Google emails are pre-verified
              emailVerifiedAt: new Date(),
            },
          });
        } else if (!user.googleId) {
          // Link existing user with Google
          user = await prisma.user.update({
            where: { id: user.id },
            data: {
              googleId: profile.id,
              avatarUrl: user.avatarUrl || avatarUrl,
              isEmailVerified: true,
              emailVerifiedAt: user.emailVerifiedAt || new Date(),
            },
          });
        } else {
          // Update last login and avatar if changed
          user = await prisma.user.update({
            where: { id: user.id },
            data: {
              lastLoginAt: new Date(),
              avatarUrl: avatarUrl || user.avatarUrl,
            },
          });
        }

        return done(null, user);
      } catch (error: unknown) {
        return done(error as Error, undefined);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    done(null, user);
  } catch (error: unknown) {
    done(error, null);
  }
});

export default passport;
