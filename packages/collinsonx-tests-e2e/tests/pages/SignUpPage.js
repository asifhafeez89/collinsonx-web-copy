class SignUpPage {
  constructor(page) {
    this.page = page;
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