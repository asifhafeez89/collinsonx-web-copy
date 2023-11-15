import { Page } from '@playwright/test';

export default class SignUpPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillInDetails(email: string, password: string) {
    await this.enterEmailAddress(email);
    await this.enterPassword(password);
    await this.confirmPassword(password);
    await this.submit();
  }

  enterEmailAddress(email: string) {
    return this.page.getByTestId('signUpEmail').fill(email);
  }

  enterPassword(password: string) {
    return this.page.getByTestId('signUpPassword').fill(password);
  }

  confirmPassword(password: string) {
    return this.page.getByTestId('signUpConfirmPassword').fill(password);
  }

  submit() {
    return this.page.getByTestId('signUpSubmit').click();
  }

  acceptCookieBanner() {
    return this.page.getByRole('button', { name: 'Accept and close' }).click();
  }

  errorMessageExistingUser() {
    // waiting on error message to be updated before making this specific to 'existing user'
    return this.page.getByText('An error occurred');
  }
}
