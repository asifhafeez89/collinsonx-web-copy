import BasePage from './BasePage';
import baseTranslation from '../../../locales/en';

export default class PreBookPage extends BasePage {
  async loungeTitle() {
    await this.page.waitForTimeout(1000);
    const loungeNameElement = await this.page.waitForSelector(
      '[data-testid="loungeName"]'
    );
    const loungeNameText = await loungeNameElement.innerText();
    return loungeNameText;
  }

  async airportAndTerminalElement(airportAndTerminal: string) {
    return this.page.getByText(airportAndTerminal);
  }

  async priceElement(price: string) {
    return this.page.getByText(price);
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

  async inputFlightNumber(flightNumber: string) {
    await this.page.waitForLoadState('networkidle');
    const flightNumberInput = await this.page.waitForSelector(
      'input[data-testid="flightNumber"]'
    );
    await flightNumberInput.fill(flightNumber);
  }

  async increaseAdultGuests() {
    const increaseAdultsButtonSelector = 'button:has-text("+")';
    const increaseAdultsButton = await this.page.$(
      increaseAdultsButtonSelector
    );
    await increaseAdultsButton?.click();
  }

  async clickSubmit() {
    const submitButtonSelector = 'button[type="submit"]';
    const submitButton = await this.page.$(submitButtonSelector);
    await submitButton?.click();
  }

  async invalidFlightError() {
    const errorText =
      baseTranslation.booking.flightDetails.errors.invalid_flight;
    return this.page.getByText(errorText);
  }

  async flightDateError() {
    const errorText = baseTranslation.booking.flightDetails.errors.invalid_date;
    return this.page.getByText(errorText);
  }

  async airportMismatchWarning() {
    const warningText =
      baseTranslation.booking.availableSlots.errors.airportMismatch.title;
    return this.page.getByText(warningText);
  }
}
