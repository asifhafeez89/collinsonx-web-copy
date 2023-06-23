class LoginPage {
  constructor(page) {
    this.page = page;
  };

  enterEmailAddress(email) {
    this.page.getByTestId('email').fill(email);
  };

  enterPassword(password) {
    this.page.getByTestId('password').fill(password);
  };

  saveMyPassword() {
    this.page.getByTestId('saveMyPassword').click();
  };

  login() {
    this.page.getByTestId('login').click();
  };

};
  
module.exports = LoginPage;