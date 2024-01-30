import { test as setup } from '@playwright/test';
import { loginToApplication } from './auth.utils';

const authFile = 'tests/playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await loginToApplication(page);

  await page.context().storageState({ path: authFile });
});
