import { defineConfig, devices } from '@playwright/test';

const PORT = process.env.PORT || '3000';

export default defineConfig({
  testDir: './tests/playwright',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: !!process.env.CI ? 'github' : 'html',
  use: {
    baseURL: `http://localhost:${PORT}/`,
    trace: 'on-first-retry',
  },

  projects: [
    { name: 'setup', testMatch: /\/tests\/playwright\/.*\.setup\.ts/ },

    {
      name: 'Authenticated user',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'tests/playwright/.auth/user.json',
      },
      testIgnore: /\/tests\/playwright\/.*\.login\.spec\.ts/,
      dependencies: ['setup'],
    },

    {
      name: 'Unauthenticated user',
      use: {
        ...devices['Desktop Chrome'],
      },
      testMatch: /\/tests\/playwright\/.*\.login\.spec\.ts/,
    },
  ],

  timeout: 15 * 1000,
  expect: {
    timeout: 5 * 1000,
  },

  webServer: {
    // @FIXME: Optimize webserver command
    //command: 'npm run test:e2e:webserver',
    command: 'npm run dev',
    port: Number(PORT),
    reuseExistingServer: !process.env.CI,
    stdout: 'pipe',
    stderr: 'pipe',
    env: {
      PORT,
    },
  },
});
