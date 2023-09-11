export async function redirectToBaas(page, jwt, lounge) {
  await page.goto(`/?in=${jwt}&lc=${lounge}`, { waitUntil: 'networkidle' });
}