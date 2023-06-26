const { test } = require('@playwright/test');
import Login from '../actions/Login';
import ExpectPartnerToBeLoggedIn from '../assertions/ExpectPartnerToBeLoggedIn';

test('login as a current partner', async ({ page }) => {
    const login = new Login(page);
    const expectPartnerToBeLoggedIn = new ExpectPartnerToBeLoggedIn(page);

    await login.asNewUser(false);

    await expectPartnerToBeLoggedIn.ask();
});