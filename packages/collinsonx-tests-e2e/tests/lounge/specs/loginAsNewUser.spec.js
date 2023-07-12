const { test } = require('@playwright/test');
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';

test.use({ storageState: { cookies: [], origins: [] }, baseURL: `https://${process.env.ENV.toLowerCase()}.lifestyle-x.io` });

test.only('login as a new user', async ({ page }) => {
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
