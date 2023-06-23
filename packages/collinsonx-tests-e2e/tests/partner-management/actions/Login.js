import LoginPage from '../pages/LoginPage';

class Login {
  constructor(page) {
    this._loginPage = new LoginPage(page);
  };

  async login() {
    this.loginPage.goto('http://localhost:3010');
  };

};

module.exports = Login;