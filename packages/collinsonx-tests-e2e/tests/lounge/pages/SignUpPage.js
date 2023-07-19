class SignUpPage {
  constructor(page) {
    this.page = page;
  };

  async fillInDetails() {
    const user = ['Test', 'User']
    await this.getFirstNameTextbox().fill(user[0]);
    await this.getLastNameTextbox().fill(user[1]);

    // TODO: add datepicker if possible

    await this.getMarketingCheckbox().click();

    await this.getLoginButton().click();
  };

  getFirstNameTextbox() {
    return this.page.getByTestId('firstName');
  };

  getLastNameTextbox() {
    return this.page.getByTestId('lastName');
  };

  getDateOfBirthDatePicker() {
    return this.page.getByTestId('dateOfBirthDatePicker');
  };

  getMarketingCheckbox() {
    return this.page.getByTestId('marketingCheckbox');
  };

  getLoginButton() {
    return this.page.getByTestId('loginAfterSignUp');
  };

};
module.exports = SignUpPage;