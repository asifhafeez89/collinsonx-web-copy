import { Page } from '@playwright/test';

export default class BookingOverviewPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  title() {
    return this.page.getByTestId('bookingOverviewTitle');
  }

  loungeTitle() {
    return this.page.getByTestId('loungeTitle');
  }

  pendingRequestsTitle() {
    return this.page.getByTestId('pendingRequestsTitle');
  }

  confirmedBookingsTitle() {
    return this.page.getByTestId('confirmedBookingsTitle');
  }

  walkupQRcodeTitle() {
    return this.page.getByTestId('walkupQRcodeTitle');
  }

  cancelledBookingsTitle() {
    return this.page.getByTestId('cancelledBookingsTitle');
  }

  viewAllPendingRequests() {
    return this.page.getByTestId('viewAllPendingRequests').click();
  }

  viewAllDeclined() {
    return this.page.getByTestId('viewAllDeclined').click();
  }

  viewAllConfirmed() {
    return this.page.getByTestId('viewAllConfirmed').click();
  }

  async pendingRequestCount() {
    return await this.getBookingCount('pendingRequestsCount');
  }

  async confirmedBookingCount() {
    return await this.getBookingCount('allBookingsCount');
  }

  async getBookingCount(testId: string) {
    // retry mechanism - returns displayed booking count, previously sometimes returned zero despite this not being the case
    let count = 0;
    let attempt = 0;

    do {
      const element = await this.page.getByTestId(testId);
      await element.waitFor();
      count = Number(await element.innerText());
      attempt++;
      attempt !== 1 && (await this.page.waitForTimeout(2000));
    } while (count === 0 && attempt <= 5);

    return count;
  }
}
