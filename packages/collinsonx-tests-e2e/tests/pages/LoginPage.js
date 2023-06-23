class LoginPage {
  constructor(page) {
    this.page = page;
  };

  getURL() {
    return this.page.goto('http://localhost:3000');
  };

  getEmailAddressTextbox() {
    return this.page.getByTestId('loginEmailAddress');
  };

  getHomePageTitle() {
    return this.page.getByTestId('homePageTitle');
  };

  getLoginButton() {
    return this.page.getByTestId('login');
  };
};

module.exports = LoginPage;
