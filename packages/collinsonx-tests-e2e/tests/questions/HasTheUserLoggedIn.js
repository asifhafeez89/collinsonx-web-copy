import LoginPage from '../pages/LoginPage';

class HasTheUserLoggedIn {
  constructor(expect) {
    this._loginPage = new LoginPage(expect);
  }

  verifyTitle() {
    return this._loginPage.getCollinsonTitle();
  }

  async seeHomePageTitle() {
    await this._loginPage.getHomePageTitle();
  }
}

module.exports = HasTheUserLoggedIn;
