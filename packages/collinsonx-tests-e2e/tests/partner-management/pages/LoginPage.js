class LoginPage {
  constructor(page) {
    this.page = page;
  };

  async login(email, password) {
    await this.goToURL();
    await this.enterEmailAddress(email);
    await this.enterPassword(password)
    await this.saveMyPassword();
    await this.clickLogin();
  };

  enterEmailAddress(email) {
    return this.page.getByTestId('email').fill(email);
  };

  enterPassword(password) {
    return this.page.getByTestId('password').fill(password);
  };

  saveMyPassword() {
    return this.page.getByTestId('saveMyPassword').click();
  };

  clickLogin() {
    return this.page.getByTestId('login').click();
  };

  goToURL() {
    return this.page.goto('http://localhost:3010');
  };

};
  
module.exports = LoginPage;