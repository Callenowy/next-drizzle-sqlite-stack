#!/usr/bin/env node
import 'dotenv/config';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { input, password } from '@inquirer/prompts';
import pc from 'picocolors';

import { db } from './db';
import { users } from './schema/users';
import type { InsertUser } from './schema/users';
import { hash } from '@node-rs/argon2';
import { createId } from '@paralleldrive/cuid2';

import { passwordSchema, emailSchema } from '@/models';

import type { Arguments } from 'yargs';

type CreateUser = Pick<InsertUser, 'username' | 'email'> & {
  password: string;
};

const PROMPT = {
  USERNAME: `Provide a ${pc.blue('username')}`,
  EMAIL: `Enter a valid ${pc.blue('email address')}`,
  PASSWORD: `Please create ${pc.blue('password')}`,
} as const;

async function getUserData() {
  const argv = (await yargs(hideBin(process.argv))
    .option('username', {
      alias: 'U',
      describe: PROMPT.USERNAME,
    })
    .option('email', {
      alias: 'E',
      describe: PROMPT.EMAIL,
    })
    .help()
    .parse()) as Arguments<{ username: string; email: string }>;

  const { username, email } = argv;

  const [usernameVal, emailVal, passwordVal] = [
    username ??
      (await input({
        message: PROMPT.USERNAME,
        default: 'admin',
      })),
    email && emailSchema.safeParse(email).success
      ? email
      : await input({
          message: PROMPT.EMAIL,
          default: 'admin@domain.com',
          validate: value => {
            const result = emailSchema.safeParse(value);

            if (result.success) {
              return true;
            } else {
              return result.error.errors[0].message;
            }
          },
        }),
    await password({
      message: PROMPT.PASSWORD,
      mask: true,
      validate: value => {
        const result = passwordSchema.safeParse(value);

        if (result.success) {
          return true;
        } else {
          return result.error.errors[0].message;
        }
      },
    }),
  ];

  return {
    username: usernameVal,
    email: emailVal,
    password: passwordVal,
  };
}

async function createUser({
  username,
  email,
  password,
}: CreateUser): Promise<InsertUser> {
  console.log(`🔐 Hashing password...`);
  console.time(`🔐 Password has been hashed.`);
  const pepper = process.env.APP_PEPPER;
  const salt = createId();
  const seasonThePassword = password + pepper + salt;

  const password_hash = await hash(seasonThePassword);
  console.timeEnd(`🔐 Password has been hashed.`);

  return {
    username,
    email,
    emailVerified: new Date(),
    salt,
    password_hash,
  };
}

async function main() {
  if (!process.env.APP_PEPPER) {
    throw new Error(pc.red('Could not find the `APP_PEPPER` env variable.'));
  }

  const userData = await getUserData();
  const newUser = await createUser(userData);

  console.log('💾 Saving user in the database...');
  console.time(
    `💾 ${pc.green('Success!')} The user '${pc.blue(userData.username)}' has been saved in the database.`
  );
  await db.insert(users).values(newUser);
  console.timeEnd(
    `💾 ${pc.green('Success!')} The user '${pc.blue(userData.username)}' has been saved in the database.`
  );
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
