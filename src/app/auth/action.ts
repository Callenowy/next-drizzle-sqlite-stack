'use server';

import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';
import { signIn, signOut } from '@/auth';
import { ROUTE } from '@/routes';

import type { LoginSchema } from '@/models/login.schema';

export async function handleLogin(credentials: LoginSchema) {
  try {
    await signIn('credentials', {
      ...credentials,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin') {
        throw new Error(
          'Invalid credentials. Please check your username and password.'
        );
      }
      throw new Error('Unable to authenticate with the given credentials.');
    }

    throw new Error(
      'Unknown error. An unexpected error occurred, please try again.'
    );
  }

  redirect(ROUTE.SERVER_LIST);
}

export const handleLogout = async () => {
  await signOut({ redirect: true, redirectTo: '/login' });
};
