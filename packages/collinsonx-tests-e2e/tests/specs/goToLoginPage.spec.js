const { test, expect } = require('@playwright/test');
import Login from '../actions/Login';
import SignUp from '../actions/SignUp';
import HasTheUserLoggedIn from '../questions/HasTheUserLoggedIn';

test('login as a new partner', async ({ page }) => {
  //Given
  let login = new Login(page);
  let signUp = new SignUp(page);

  //When
  await login.goTo();
  await login.login();
  await signUp.fillInDetails();

  //Then
  let hasTheUserLoggedIn = new HasTheUserLoggedIn(expect);
  await hasTheUserLoggedIn.verifyTitle();
});
