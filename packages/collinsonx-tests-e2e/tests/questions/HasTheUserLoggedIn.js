import LoginPage from '../pages/LoginPage';

const { expect } = require('@playwright/test');

class ExpectUserToBeLoggedIn {
  constructor(page) {
    this._loginPage = new LoginPage(page);
  };

  async ask() {
    const title = this._loginPage.getHomePageTitle();
    
    await expect(title).toBeVisible();
  };
};

module.exports = ExpectUserToBeLoggedIn;
