/**
 * Redirects the given page to a specific URL that includes a JWT and lounge parameter.
 *
 * @param {import('playwright').Page} page - The Playwright Page object representing the browser page.
 * @param {string} jwt - The JSON Web Token to include in the URL.
 * @param {string} lounge - The lounge parameter to include in the URL.
 * @returns {Promise<void>} - Returns a promise that resolves when the navigation is complete.
 *
 * @example
 * const page = await browser.newPage();
 * await redirectToBaas(page, 'your-jwt-here', 'your-lounge-here');
 */
export async function redirectToBaas(page, jwt, lounge) {
  await page.goto(`/?in=${jwt}&lc=${lounge}`, { waitUntil: 'networkidle' });
}