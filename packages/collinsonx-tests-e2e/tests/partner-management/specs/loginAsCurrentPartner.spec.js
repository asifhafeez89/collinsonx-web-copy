const { test } = require('@playwright/test');
import Login from '../actions/Login';

test('login as a new user', async ({ page }) => {
    let login = new Login();
    
    await login.asNewUser(false);
});