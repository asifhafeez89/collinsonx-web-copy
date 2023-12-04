/* eslint-disable turbo/no-undeclared-env-vars */
const { defineConfig, devices } = require('@playwright/test');
import dotenv from 'dotenv';
dotenv.config({ path: `.env.tests` });

/**
 * @see https://playwright.dev/docs/test-configuration
 */

module.exports = defineConfig({
  // max time (ms) for tests inc. teardown
  timeout: 200000,
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 8 : 4,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { open: 'never' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    /* ENV variable is given by the package.json script. */
    baseURL: `https://partner-local.${process.env.ENV}.cergea.com:4010`,
    ...devices['Desktop Chrome'],
    ignoreHTTPSErrors: true,
    headless: true,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    // Record tests
    video: 'retain-on-failure',
  },
  expect: {
    timeout: 10000,
  },
  projects: [
    {
      name: 'partner-chromium-test',
      testDir: './',
      // Skip running the acessibility tests
      testIgnore: 'accessibility.spec.ts',
    },
    {
      name: 'partner-portal',
      testDir: './specs/portal',
      // Skip running the acessibility tests
      testIgnore: 'accessibility.spec.ts',
    },
    {
      name: 'partner-portal-accessibility-tests',
      testDir: './specs/portal',
      testMatch: 'accessibility.spec.ts',
      retries: 0,
    },
  ],
});
