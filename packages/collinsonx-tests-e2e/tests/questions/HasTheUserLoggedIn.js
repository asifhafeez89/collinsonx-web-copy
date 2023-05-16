import LoginPage from '../pages/LoginPage';

class HasTheUserLoggedIn {
  constructor(page, expect) {
    this._loginPage = new LoginPage(page, expect);
  }

  async verifyTitle() {
    await this._loginPage.getCollinsonTitle();
  }

  async seeHomePageTitle() {
    await this._loginPage.getHomePageTitle(this.page);
  }
}

module.exports = HasTheUserLoggedIn;
