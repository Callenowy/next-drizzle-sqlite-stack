import { eq } from 'drizzle-orm';
import { verify } from '@node-rs/argon2';
import { db } from '@/db/db';
import { users } from '@/db/schema/users';
import AuthenticationError from '@/utils/AuthenticationError';

import type { User } from '@/db/schema/users';
import type { AuthenticationStrategy } from './authentication.strategy';

const LOGIN_ATTEMPTS = 3;
const MESSAGES = {
  USER_NOT_FOUND: (username: string) => `User ${username} not found.`,
  ACCOUNT_LOCKED: `Account is locked. Please contact support.`,
  PASSWORD_INCORRECT: `Password is incorrect.`,
  APP_PEPPER_NOT_FOUND: 'Could not find the `APP_PEPPER` env variable.',
} as const;

export class PasswordAuthenticationStrategy implements AuthenticationStrategy {
  async authenticate(
    username: string,
    password: string
  ): Promise<User | undefined> {
    // @FIXME: Vaidate environment variables at the start of the application, not during runtime.
    // if (!process.env.APP_PEPPER) {
    //   throw new AuthenticationError(MESSAGES.APP_PEPPER_NOT_FOUND);
    // }

    const user = await this.fetchUser(username);

    if (!user || user.account_locked) {
      return undefined;
    }

    const verified = await this.verifyPassword(user, password);

    if (!verified) {
      await this.handleFailedLoginAttempt(user);
    }

    return await this.updateLoginState(user);
  }

  private async fetchUser(username: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));

    if (!user) {
      throw new AuthenticationError(MESSAGES.USER_NOT_FOUND(username));
    }

    if (user.account_locked) {
      throw new AuthenticationError(MESSAGES.ACCOUNT_LOCKED);
    }

    return user;
  }

  private async verifyPassword(user: User, password: string): Promise<boolean> {
    const pepper = process.env.APP_PEPPER;

    return await verify(user.password_hash, password + pepper + user.salt);
  }

  private async updateUser(user: User, data: Partial<User>): Promise<User> {
    const [updatedUser] = await db
      .update(users)
      .set(data)
      .where(eq(users.id, user.id))
      .returning();

    return updatedUser;
  }

  private async updateLoginState(user: User): Promise<User> {
    const currentUser = await this.updateUser(user, {
      last_login: new Date(),
      failed_login_attempts: 0,
    });

    return currentUser;
  }

  private async handleFailedLoginAttempt(user: User): Promise<void> {
    const failedLoginAttempts = user.failed_login_attempts ?? 0;

    const updatedUser = await this.updateUser(user, {
      failed_login_attempts: failedLoginAttempts + 1,
      ...(failedLoginAttempts + 1 >= LOGIN_ATTEMPTS && {
        account_locked: true,
      }),
    });

    if (updatedUser.account_locked) {
      throw new AuthenticationError(MESSAGES.ACCOUNT_LOCKED);
    }

    throw new AuthenticationError(MESSAGES.PASSWORD_INCORRECT);
  }
}
