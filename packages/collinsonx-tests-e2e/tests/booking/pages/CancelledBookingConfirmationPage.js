class CancelledBookingConfirmationPage {
  constructor(page) {
    this.page = page;
  }

  async cancelledBookingConfirmationMessage() {
    const successText = 'Your booking has been cancelled';
    await this.page.waitForSelector(`text=${successText}`, {
      state: 'visible',
      timeout: 60000,
    });
    return await this.page.getByText(successText);
  }
}

module.exports = CancelledBookingConfirmationPage;
