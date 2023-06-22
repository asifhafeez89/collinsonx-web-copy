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

  };
  module.exports = SignUpPage;