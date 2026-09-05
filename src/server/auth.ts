import 'server-only';

import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { betterAuth } from 'better-auth';
import { APIError } from 'better-auth/api';
import { nextCookies } from 'better-auth/next-js';
import { headers } from 'next/headers';

import { AppConfig } from '@/constants/appConfig';
import { env } from '@/env';
import { signupProfileSchema } from '@/validations/signup';

import { db } from './db';
import * as schema from './db/schema';

export const auth = betterAuth({
  appName: AppConfig.title,
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
  user: {
    additionalFields: {
      firstName: {
        type: 'string',
        required: true,
        input: true,
      },
      lastName: {
        type: 'string',
        required: true,
        input: true,
      },
      mobileNumber: {
        type: 'string',
        required: true,
        input: true,
        returned: false,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async user => {
          const profile = signupProfileSchema.safeParse(user);

          if (!profile.success) {
            throw new APIError('BAD_REQUEST', {
              message: profile.error.issues[0]?.message ?? 'Invalid signup profile.',
            });
          }

          return {
            data: {
              ...user,
              ...profile.data,
              name: `${profile.data.firstName} ${profile.data.lastName}`,
            },
          };
        },
      },
    },
  },
  advanced: {
    database: {
      generateId: 'uuid',
    },
  },
  // Keep this last so Better Auth can forward Set-Cookie headers from server actions.
  plugins: [nextCookies()],
});

export type AuthSession = typeof auth.$Infer.Session;

export const getAuthSession = async (requestHeaders?: Headers): Promise<AuthSession | null> => {
  return auth.api.getSession({ headers: requestHeaders ?? (await headers()) });
};
