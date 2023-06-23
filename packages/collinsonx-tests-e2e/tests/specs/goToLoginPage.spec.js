const { test } = require('@playwright/test');
import Login from '../actions/Login';
import SignUp from '../actions/SignUp';
import ExpectUserToBeLoggedIn from '../questions/HasTheUserLoggedIn';

test('login as a new partner', async ({ page }) => {
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
