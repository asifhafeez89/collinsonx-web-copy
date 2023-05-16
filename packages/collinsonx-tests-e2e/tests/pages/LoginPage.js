class LoginPage {
  constructor(page, expect) {
    this.page = page;
    this.expect = expect;
  }

  getURL() {
    return this.page.goto('http://localhost:3000');
  }

  getUsernameTextbox() {
    return this.page.getByPlaceholder('Your email address');
  }

  getCollinsonTitle() {
    return this.expect.toHaveTitle('CollinsonX');
  }

  getHomePageTitle() {
    return this.page.getByRole('heading', { name: 'Ready for your next experience?' });
  }

  getLoginButton() {
    return this.page.getByRole('button', { name: 'Login' });
  }

  getVerifyButton() {
    return this.page.getByRole('button', { name: 'Verify' });
  }

  firstName() {
    return this.page.getByPlaceholder('First name');
  }

  lastName() {
    return this.page.getByPlaceholder('Last name');
  }
  
  exitProfileButton() {
    return this.page.getByRole('banner').locator('svg');
  }
}
module.exports = LoginPage;
