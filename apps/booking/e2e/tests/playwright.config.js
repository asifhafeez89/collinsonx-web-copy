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
  workers: process.env.CI ? 6 : 4,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { open: 'never' }], ['github']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.DEPLOYED
      ? `https://booking.${process.env.ENV || 'test'}.cergea.com`
      : `https://booking-local.${process.env.ENV || 'test'}.cergea.com:4011`,
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
      name: 'booking',
      testDir: './',
      // ENV variable is given by the package.json script
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'booking-safari',
      testDir: './',
      use: {
        ...devices['Desktop Safari'],
      },
    },
    {
      name: 'booking-mobile-safari',
      testDir: './',
      use: {
        ...devices['iPhone 12'],
      },
    },
  ],
});
