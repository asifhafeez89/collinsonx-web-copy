import { test } from '../../../baseFixtures';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';

test.use({ storageState: { cookies: [], origins: [] }, baseURL: `https://${process.env.ENV}.lifestyle-x.io` });

test('login as a new user', async ({ page }) => {
  //Given
  let loginPage = new LoginPage(page);
  let signUpPage = new SignUpPage(page);

  //When
  await loginPage.goToURL();
  await loginPage.login();
  await signUpPage.fillInDetails();

  //Then
  const title = loginPage.getHomePageTitle();

  await expect(title).toBeVisible();
});