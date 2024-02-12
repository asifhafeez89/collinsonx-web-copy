import BasePage from './BasePage';
import baseTranslation from '../../../locales/en';

export default class EnterPinPage extends BasePage {
  async enterPin(code: string | undefined) {
    const selector = `[data-testid="pinInput"] >> div:first-child > input:first-child`;
    await this.page.waitForSelector(selector);
    const pinInput = await this.page.$(selector);
    if (pinInput && code) {
      await pinInput.click();
      return await pinInput.fill(code);
    }
  }

  async clickVerify() {
    const verifyButton = this.page.getByTestId('verify');
    return await verifyButton.click();
  }

  async clickResend() {
    return await this.page.getByTestId('resend').click();
  }

  async invalidCodeError() {
    const errorText = baseTranslation.auth.checkCode.error.wrongCode;
    return this.page.getByText(errorText);
  }

  async tooManyAttemptsError() {
    const errorText = 'Sorry, passcode not verified';
    return this.page.getByText(errorText);
  }

  async clickReEnterEmailLink() {
    const reEnterEmailLinkText =
      baseTranslation.auth.checkCode.reEnterEmailLabel;
    const reEnterEmailLinkSelector = `text=${reEnterEmailLinkText}`;
    await this.page.waitForSelector(reEnterEmailLinkSelector);
    const reEnterEmailLinkElement = await this.page.$(reEnterEmailLinkSelector);
    if (reEnterEmailLinkElement) {
      await reEnterEmailLinkElement.click();
    }
  }
}
