class SignUpPage {
    constructor(page) {
      this.page = page;
    };
  
    enterEmailAddress(email) {
      return this.page.getByTestId('signUpEmail').fill(email);
    };
  
    enterPassword(password) {
      return this.page.getByTestId('signUpPassword').fill(password);
    };
  
    confirmPassword(password) {
      return this.page.getByTestId('signUpConfirmPassword').fill(password);
    };

    submit() {
      return this.page.getByTestId('signUpSubmit').click();
    };
  
  };
    
  module.exports = SignUpPage;