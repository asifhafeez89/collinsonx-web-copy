class LoginPage {
  constructor(page) {
    this.page = page;
  }

  getURL() {
    return this.page.goto('http://127.0.0.1:3000');
  }

  getUsernameTextbox() {
    return this.page.getByPlaceholder('Your email address');
  }

  getCollinsonTitle() {
    return this.page.toHaveTitle('CollinsonX');
  }

  getHomePageTitle() {
    return this.page.getByRole('button', { name: 'Ready for your next experience?' });
  }

  getLoginButton() {
    return this.page.getByRole('button', { name: 'Login' });
  }

  getVerifyButton() {
    return this.page.getByRole('button', { name: 'Verify' });
  }
}
module.exports = LoginPage;
