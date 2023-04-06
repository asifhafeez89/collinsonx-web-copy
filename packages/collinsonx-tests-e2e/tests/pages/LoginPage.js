class LoginPage {
  constructor(page) {
    this.page = page;
  }

  getURL() {
    return this.page.goto('/');
  }

  getUsernameTextbox() {
    return this.page.getByPlaceholder('Your email address');
  }

  getCollinsonTitle() {
    return this.page.toHaveTitle('CollinsonX');
  }
}
module.exports = LoginPage;
