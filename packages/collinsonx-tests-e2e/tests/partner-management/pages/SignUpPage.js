class SignUpPage {
  constructor(page) {
    this.page = page;
  };

  async fillInDetails(email, password) {
    await this.enterEmailAddress(email);
    await this.enterPassword(password);
    await this.confirmPassword(password);
    await this.submit();
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

  acceptCookieBanner() {
    return this.page.getByRole('button', { name: 'Accept and close' }).click();
  };

  errorMessageExistingUser() {
    // waiting on error message to be updated before making this specific to 'existing user'
    return this.page.getByText('An error occurred');
  };

};

module.exports = SignUpPage;