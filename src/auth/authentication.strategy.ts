import type { User } from '@/db/schema/users';

export interface AuthenticationStrategy {
  authenticate(username: string, password: string): Promise<User | undefined>;
}
