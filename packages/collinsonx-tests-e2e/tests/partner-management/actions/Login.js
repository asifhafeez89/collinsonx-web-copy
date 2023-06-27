import LoginPage from '../pages/LoginPage';

class Login {
  constructor(page) {
    this._loginPage = new LoginPage(page);
  };

  async login(email, password) {    
    await this._loginPage.goToURL();

    await this._loginPage.enterEmailAddress(email);

    await this._loginPage.enterPassword(password);

    await this._loginPage.saveMyPassword();

    await this._loginPage.login();
  };
};

module.exports = Login;