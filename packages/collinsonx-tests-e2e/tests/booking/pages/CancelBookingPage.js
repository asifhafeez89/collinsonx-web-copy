class CancelBookingPage {
  constructor(page) {
    this.page = page;
  }

  async clickCancelBooking() {
    const selector = 'button[type="submit"]';
    await this.page.waitForSelector(selector, {
      visible: true,
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

module.exports = CancelBookingPage;
