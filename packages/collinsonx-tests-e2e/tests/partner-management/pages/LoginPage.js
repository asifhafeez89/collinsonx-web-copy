class LoginPage {
  constructor(page) {
    this.page = page;
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

  login() {
    return this.page.getByTestId('login').click();
  };

  goToURL() {
    return this.page.goto('http://localhost:3010');
  };

};
  
module.exports = LoginPage;