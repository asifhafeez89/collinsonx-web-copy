import { Page } from '@playwright/test';

export default class PendingRequestsPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  title() {
    return this.page.getByRole('heading', {
      name: 'Pending lounge booking management',
    });
  }

  async declinePendingRequest(bookingRef: string) {
    return await this.page
      .getByRole('row', { name: bookingRef })
      .getByTestId('declineBooking')
      .click();
  }

  async confirmPendingRequest(bookingRef: string) {
    return await this.page
      .getByRole('row', { name: bookingRef })
      .getByTestId('confirmBooking')
      .click();
  }

  async waitForPendingRequestToBeRemoved(bookingRef: string) {
    return await this.page
      .getByRole('row', { name: bookingRef })
      .waitFor({ state: 'detached' });
  }

  goToURL() {
    return this.page.goto('/bookings/pending', { waitUntil: 'networkidle' });
  }
}
