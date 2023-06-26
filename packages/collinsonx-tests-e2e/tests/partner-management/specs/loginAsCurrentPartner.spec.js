const { test } = require('@playwright/test');
import Login from '../actions/Login';

test('login as a current partner', async ({ page }) => {
    let login = new Login(page);

    await login.asNewUser(false);
});