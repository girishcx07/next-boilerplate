import type { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { authService } from '@/server/api/routers/auth/service/auth.service';

import { Logger } from './api/common/logger';

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks,
 * etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig: AuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'paalamugan' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('No credentials provided');
        }

        const result = await authService.signIn({
          input: {
            credentials: {
              username: credentials.username,
              password: credentials.password,
            },
          },
          headers: new Headers(),
        });

        if (!result) {
          throw new Error('Invalid credentials');
        }

        return {
          id: result.id,
          username: result.username,
        };
      },
    }),
  ],
  events: {
    async signIn({ user }) {
      Logger.info('User signed in', user);
    },
    // async signOut() {
    //   Logger.info('User signed out');
    // },
    // async createUser({ user }) {
    //   Logger.info('User created', user);
    // },
    // async updateUser({ user }) {
    //   Logger.info('User updated', user);
    // },
    // async linkAccount({ user, account }) {
    //   Logger.info('Account linked', { user, account });
    // },
    // async session({ session }) {
    //   Logger.info('Session', session);
    // },
  },
  callbacks: {
    async jwt({ token, user }) {
      const newToken = { ...token };
      if (user) {
        newToken.id = user.id;
        newToken.username = user.username;
      }

      return newToken;
    },
    async session({ token, session }) {
      const newSession = { ...session };
      if (token) {
        newSession.user = {
          ...session.user,
          id: token.id,
          username: token.username,
        };
      }
      return newSession;
    },
  },
} satisfies AuthOptions;
