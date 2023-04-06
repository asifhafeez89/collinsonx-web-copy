const { test, expect } = require('@playwright/test');
import Login from '../actions/Login';
import IsTheUserAtTheLoginPage from '../questions/IsTheUserAtTheLoginPage';

test('has title', async ({ page }) => {
  //Given
  let login = new Login(page);

  //When
  await login.goTo();
  await login.typeIn();

  //Then
  let isTheUserAtTheLoginPage = new IsTheUserAtTheLoginPage(expect);
  await isTheUserAtTheLoginPage.verifyTitle();
});
