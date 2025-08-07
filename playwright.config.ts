import { defineConfig, devices } from '@playwright/test';

export const BASE_FRONTEND_URL = process.env.BASE_FRONTEND_URL;

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 2,
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    viewport: { width: 1280, height: 832 },
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },
  timeout: 60_000,
  expect: {
    timeout: 60_000,
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testMatch: '**/*.setup.ts',
    },

    {
      name: 'API',
      testDir: "./tests/api/",
      fullyParallel: true
    },

    {
      name: 'Chrome - auth',
      testDir: "./tests/e2e/auth/",

      use: {
        permissions: ['camera', 'microphone'],
        headless: true,
        // trace: 'on',
        screenshot: 'only-on-failure',
        bypassCSP: true,
        video: 'retain-on-failure',
        ...{ ...devices['Desktop Chrome'], viewport: { width: 1280, height: 832 } },
        storageState: 'e2e/.auth/user.json',
        launchOptions: {
          args: [
            '--use-fake-ui-for-media-stream',
            '--use-fake-device-for-media-stream'
          ],
        }

      },
    },
    {
      name: 'Chrome - non auth',
      testDir: "./tests/e2e/no-auth/",
      use: {
        headless: true,
        // trace: 'on',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        ...{ ...devices['Desktop Chrome'], viewport: { width: 1280, height: 832 } },
      },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ]
});
