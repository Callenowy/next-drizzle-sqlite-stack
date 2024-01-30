import 'dotenv/config';

import { type Page, expect, test } from '@playwright/test';
import { ROUTE } from '@/routes';

export type Credentials = {
  username: string;
  password: string;
};

type CredentialsAssertion = [string[], Credentials];
type EmptyCredentialsAssertion = [string[], Partial<Credentials>];

const getCredentials = (): Credentials => {
  const username = process.env.E2E_TEST_USERNAME;
  const password = process.env.E2E_TEST_PASSWORD;

  if (!username || !password) {
    throw new Error(
      'Please set `E2E_TEST_USERNAME` and `E2E_TEST_PASSWORD` environment variables to authenticate.'
    );
  }

  return { username, password };
};

export async function loginToApplication(page: Page) {
  test.setTimeout(120000);
  const { username, password } = getCredentials();

  await page.goto(ROUTE.LOGIN);
  await page.getByLabel('Username').fill(username);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Log in' }).click();

  await page.waitForURL(ROUTE.SERVER_LIST);

  await expect(
    page.getByRole('heading', { name: 'Server list' })
  ).toBeVisible();
}

export const INCORRECT_CREDENTIALS = ((): CredentialsAssertion[] => {
  const { username, password } = getCredentials();

  return [
    [
      ['password'],
      {
        username,
        password: 'incorrect',
      },
    ],
    [
      ['username'],
      {
        username: 'incorrect',
        password,
      },
    ],
    [
      ['username', 'password'],
      {
        username: 'incorrect',
        password: 'incorrect',
      },
    ],
  ];
})();

export const EMPTY_CREDENTIALS = ((): EmptyCredentialsAssertion[] => {
  const { username, password } = getCredentials();

  return [
    [
      ['password'],
      {
        username,
      },
    ],
    [
      ['username'],
      {
        password,
      },
    ],
    [['username', 'password'], {}],
  ];
})();
