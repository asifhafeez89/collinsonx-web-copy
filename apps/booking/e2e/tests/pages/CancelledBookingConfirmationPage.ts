import BasePage from './BasePage';

export default class CancelledBookingConfirmationPage extends BasePage {
  async cancelledBookingConfirmationMessage() {
    const successText = 'Your booking has been cancelled';
    await this.page.waitForSelector(`text=${successText}`, {
      state: 'visible',
      timeout: 60000,
    });
    return this.page.getByText(successText);
  }
}
