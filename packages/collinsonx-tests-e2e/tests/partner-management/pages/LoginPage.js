class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async login(email, password) {
    await this.goToURL();
    await this.acceptCookieBanner();
    await this.enterEmailAddress(email);
    await this.enterPassword(password);
    await this.saveMyPassword();
    await this.clickLogin();
    await this.waitToBeLoggedIn();
  }

  enterEmailAddress(email) {
    return this.page.getByLabel('email').fill(email);
  }

  enterPassword(password) {
    return this.page.getByLabel('Password', { exact: true }).fill(password);
  }

  saveMyPassword() {
    return this.page.getByTestId('saveMyPassword').click();
  }

  clickLogin() {
    return this.page.getByRole('button', { name: 'Login' }).click();
  }

  goToURL() {
    return this.page.goto('/');
  }

  acceptCookieBanner() {
    return this.page.getByRole('button', { name: 'Accept and close' }).click();
  }

  title() {
    return this.page.getByRole('heading', { name: 'Login' });
  }

  waitToBeLoggedIn() {
    return this.page.waitForLoadState('networkidle');
  }
}

module.exports = LoginPage;
