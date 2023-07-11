const { test } = require('@playwright/test');
import Login from '../actions/Login';
import SignUp from '../actions/SignUp';
import ExpectUserToBeLoggedIn from '../assertions/ExpectUserToBeLoggedIn';

test.use({ storageState: { cookies: [], origins: [] }, baseURL: `https://${process.env.ENV.toLowerCase()}.lifestyle-x.io` });

test('login as a new user', async ({ page }) => {
  //Given
  let login = new Login(page);
  let signUp = new SignUp(page);
  let expectUserToBeLoggedIn = new ExpectUserToBeLoggedIn(page);

  //When
  await login.goTo();
  await login.login();
  await signUp.fillInDetails();

  //Then
  await expectUserToBeLoggedIn.ask();
});
