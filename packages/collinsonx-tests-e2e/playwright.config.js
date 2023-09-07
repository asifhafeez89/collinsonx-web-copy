const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */

module.exports = defineConfig({
  // max time (ms) for tests inc. teardown
  timeout: 60000,
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  workers: 4,
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
  expect: {
    timeout: 10000
  },
  projects: [
    { name: 'setup', testMatch: /auth.setup\.js/ },
    {
      name: 'partner-chromium-test',
      testDir: './tests/partner-management',
      // ENV variable is given by the package.json script
      use: { ...devices['Desktop Chrome'], storageState: 'playwright/.auth/user.json', baseURL: `https://partner-local.${process.env.ENV}.cergea.com:4010`, ignoreHTTPSErrors: true },
      dependencies: ['setup'],
      // Skip running the acessibility tests
      testIgnore: 'accessibility.spec.js'
    },
    {
      name: 'accessibility-tests',
      testDir: './tests/partner-management',
      // ENV variable is given by the package.json script
      use: { ...devices['Desktop Chrome'], storageState: 'playwright/.auth/user.json', baseURL: `https://partner-local.${process.env.ENV}.cergea.com:4010`, ignoreHTTPSErrors: true },
      dependencies: ['setup'],
      // Only run the accessibility tests
      testMatch: 'accessibility.spec.js'
    },
    // {
    //   name: 'Safari Test',
    //   use: { ...devices['Desktop Safari'], storageState: 'playwright/.auth/user.json', baseURL: process.env.URL },
    //   dependencies: ['setup'],
    // },
  ],
});
