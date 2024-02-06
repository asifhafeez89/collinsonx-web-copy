import BasePage from './BasePage';

export default class CancelBookingPage extends BasePage {
  async clickCancelBooking() {
    const selector = 'button[type="submit"]';
    await this.page.waitForSelector(selector, {
      state: 'visible',
      timeout: 30000,
    });
    const cancelBookingButton = await this.page.locator(selector);
    await cancelBookingButton.click();
  }

  async clickConfirmCancelBooking() {
    const cancelBookingButton = this.page.getByRole('button', {
      name: 'CANCEL BOOKING',
    });
    await cancelBookingButton.click();
  }
}
