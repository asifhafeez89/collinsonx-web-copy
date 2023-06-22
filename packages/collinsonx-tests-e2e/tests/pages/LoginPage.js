class LoginPage {
  constructor(page) {
    this.page = page;
  }

  getURL() {
    return this.page.goto('http://localhost:3000');
  }

  getEmailAddressTextbox() {
    return this.page.getByTestId('loginEmailAddress');
  }

  getCollinsonTitle() {
    return this.page.toHaveTitle('CollinsonX');
  }

  getHomePageTitle() {
    return this.page.getByRole('button', {
      name: 'Ready for your next experience?',
    });
  }

  getLoginButton() {
    return this.page.getByTestId('login');
  }
}
module.exports = LoginPage;
