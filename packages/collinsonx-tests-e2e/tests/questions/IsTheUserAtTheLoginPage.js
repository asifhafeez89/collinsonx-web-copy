import LoginPage from '../pages/LoginPage';

class IsTheUserAtTheLoginPage {
  constructor(expect) {
    this._loginPage = new LoginPage(expect);
  }

  verifyTitle() {
    return this._loginPage.getCollinsonTitle();
  }
}

module.exports = IsTheUserAtTheLoginPage;
