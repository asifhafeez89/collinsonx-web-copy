const { test, expect } = require('@playwright/test');
import Login from '../actions/Login';
import HasTheUserLoggedIn from '../questions/HasTheUserLoggedIn';

test('has title', async ({ page }) => {
  //Given
  let login = new Login(page);

  //When
  await login.goTo();
  await login.login();
  // await login.submitLogin();

  //Then
  let hasTheUserLoggedIn = new HasTheUserLoggedIn(page, expect);
  await hasTheUserLoggedIn.verifyTitle();
  await hasTheUserLoggedIn.seeHomePageTitle();
});
