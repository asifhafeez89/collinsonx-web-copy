const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */

module.exports = defineConfig({
  // max time (ms) for tests inc. teardown
  timeout: 60000,
  testDir: './tests/partner-management',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { open: 'always' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:3000',
    headless: true,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    // Record tests
    video: 'retain-on-failure'
  },
  projects: [
    { name: 'setup', testMatch: /auth.setup\.js/ },
    {
      name: 'Chromium Test',
      use: { ...devices['Desktop Chrome'], storageState: 'playwright/.auth/user.json', baseURL: process.env.URL },
      dependencies: ['setup'],
    },
    {
      name: 'Safari Test',
      use: { ...devices['Desktop Safari'], storageState: 'playwright/.auth/user.json', baseURL: process.env.URL },
      dependencies: ['setup'],
    },
  ],
});
