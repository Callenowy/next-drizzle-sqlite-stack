import NextAuth, { type NextAuthConfig } from 'next-auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';

import { ROUTE } from '@/routes';
import { db } from '@/db/db';
import { PasswordAuthenticationStrategy } from '@/auth/passwordAuthentication.strategy';

export const config = {
  adapter: DrizzleAdapter(db),
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        const { username, password } = credentials as Record<string, string>;

        const strategy = new PasswordAuthenticationStrategy();
        const user = await strategy.authenticate(username, password);

        if (!user) {
          return null;
        }

        return {
          ...user,
          name: user.username,
        };
      },
    }),
  ],

  pages: {
    signIn: ROUTE.LOGIN,
  },

  callbacks: {
    authorized({ auth }) {
      return !!auth;
    },
    redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },

  session: { strategy: 'jwt' },
  trustHost: true,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
