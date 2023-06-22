const { test, expect } = require('@playwright/test');
import Login from '../actions/Login';
import HasTheUserLoggedIn from '../questions/HasTheUserLoggedIn';

test('login as a new partner', async ({ page }) => {
  //Given
  let login = new Login(page);

  //When
  await login.goTo();
  await login.login();

  //Then
  let hasTheUserLoggedIn = new HasTheUserLoggedIn(expect);
  await hasTheUserLoggedIn.verifyTitle();
});
