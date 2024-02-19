import BasePage from './BasePage';

export default class AmendBookingPage extends BasePage {
  async amendBookingNoFeeMessage() {
    const successText = 'No additional fee required';
    await this.page.waitForSelector(`text=${successText}`, {
      state: 'visible',
      timeout: 60000,
    });
    return this.page.getByText(successText);
  }

  async increaseAdultGuests(clicks: number) {
    const increaseAdultsButtonSelector = 'button:has-text("+")';
    const increaseAdultsButton = await this.page.$(
      increaseAdultsButtonSelector
    );
    for (let i = 0; i < clicks; i += 1) {
      await increaseAdultsButton?.click();
    }
  }

  async decreaseAdultGuests(clicks: number) {
    const decreaseAdultsButtonSelector = 'button:has-text("–")';
    const decreaseAdultsButton = await this.page.$(
      decreaseAdultsButtonSelector
    );
    for (let i = 0; i < clicks; i += 1) {
      await decreaseAdultsButton?.click();
    }
  }

  async amendBookingTotalPriceMessage() {
    const priceText = '£ 18.00';
    await this.page.waitForSelector(`text=${priceText}`, {
      state: 'visible',
      timeout: 10000,
    });
    return this.page.getByText(priceText);
  }

  async amendBookingToReceiveFeeMessage() {
    const priceText = 'Amount to receive';
    await this.page.waitForSelector(`text=${priceText}`, {
      state: 'visible',
      timeout: 10000,
    });
    return this.page.getByText(priceText);
  }

  async amend48HoursError() {
    const errorText =
      'Bookings cannot be amended within 48 hours of booking arrival time';
    return this.page.getByText(errorText);
  }

  async openDatePicker() {
    const datePicker = this.page.getByTestId('flightDate');
    await datePicker.click();
  }

  async clickNextMonth(nextMonthDate: Date) {
    const today = new Date();
    const numberOfClicks =
      12 * (nextMonthDate.getFullYear() - today.getFullYear()) +
      (nextMonthDate.getMonth() - today.getMonth());

    for (let i = 1; i <= numberOfClicks; i += 1) {
      var nextMonth = await this.page.waitForSelector(
        '[data-direction="next"]'
      );
      await nextMonth.click();
      await this.page.waitForTimeout(500);
    }
  }

  async selectDate(dateString: string) {
    const dateSelector = `[aria-label="${dateString}"]`;
    const date = await this.page.waitForSelector(dateSelector);
    await date.click();
    await this.page.waitForTimeout(500);
  }

  async clickCheckAvailability() {
    const selector = 'button[type="submit"]';
    await this.page.waitForSelector(selector, {
      state: 'visible',
      timeout: 30000,
    });
    const checkButton = await this.page.locator(selector);
    await checkButton.click();
  }
}
