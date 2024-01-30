import { test, expect } from '@playwright/test';
import {
  loginToApplication,
  INCORRECT_CREDENTIALS,
  EMPTY_CREDENTIALS,
} from './auth.utils';
import { ROUTE } from '@/routes';

const ERROR_MESSAGE = 'Unable to authenticate with the given credentials.';

test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ page }) => {
  await page.goto(ROUTE.LOGIN);
});

test.describe('Login page', () => {
  test('Correct page title', async ({ page }) => {
    await page.goto(ROUTE.LOGIN);

    await expect(page).toHaveTitle('Login - The Stack');
  });

  test('Login into app with given credentials', async ({ page }) => {
    await loginToApplication(page);

    await expect(page).toHaveURL('/server-list');
  });

  for (const [fieldType, { username, password }] of INCORRECT_CREDENTIALS) {
    test(`Attempt to login with incorrect ${fieldType.join(' and ')}`, async ({
      page,
    }) => {
      await page.getByLabel('Username').fill(username);
      await page.getByLabel('Password').fill(password);

      await page.getByRole('button', { name: 'Log in' }).click();

      await expect(page.getByTestId('login-error')).toBeVisible();
      await expect(page.getByTestId('login-error')).toContainText(
        ERROR_MESSAGE
      );
    });
  }

  for (const [emptyFields, credentials] of EMPTY_CREDENTIALS) {
    test(`Attempt to login with empty ${emptyFields.join(' and ')}`, async ({
      page,
    }) => {
      if (credentials.password) {
        await page.getByLabel('Password').fill(credentials.password);
      }

      if (credentials.username) {
        await page.getByLabel('Username').fill(credentials.username);
      }

      await page.getByRole('button', { name: 'Log in' }).click();

      await expect(page.getByRole('status')).toHaveCount(emptyFields.length);
      await expect(page.getByRole('status')).toHaveText(
        emptyFields.map(field => new RegExp(`${field} is required`, 'i'))
      );
    });
  }
});
