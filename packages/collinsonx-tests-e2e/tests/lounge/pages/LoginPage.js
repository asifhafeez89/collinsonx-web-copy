class LoginPage {
  constructor(page, expect) {
    this.page = page;
  };

  getURL() {
    return this.page.goto('/');;
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
