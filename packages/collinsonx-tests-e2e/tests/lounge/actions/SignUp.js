import SignUpPage from '../pages/SignUpPage';

class SignUp {
  constructor(page) {
    this._signUpPage = new SignUpPage(page);
  };

  async fillInDetails() {
    const user = ['Test', 'User']
    await this._signUpPage.getFirstNameTextbox().fill(user[0]);
    await this._signUpPage.getLastNameTextbox().fill(user[1]);

    // TODO: add datepicker if possible

    await this._signUpPage.getMarketingCheckbox().click();

    await this._signUpPage.getLoginButton().click();
  };
};

module.exports = SignUp;