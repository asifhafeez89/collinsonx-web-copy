import BookingOverviewPage from '../pages/BookingOverviewPage';

const { expect } = require('@playwright/test');

class ExpectPartnerToBeLoggedIn {
  constructor(page) {
    this._bookingOverviewPage = new BookingOverviewPage(page);
  };

  async ask() {
    const title = this._bookingOverviewPage.getPageTitle();
    const pendingRequestsTitle = this._bookingOverviewPage.getPendingRequestsTitle();
    const cancelledBookingsTitle = this._bookingOverviewPage.getCancelledBookingsTitleTitle();
    const confirmedBookingsTitle = this._bookingOverviewPage.getConfirmedBookingsTitle();
    const walkupQRcodeTitle = this._bookingOverviewPage.getWalkupQRcodeTitle();
    const loungeTitle = this._bookingOverviewPage.getLoungeTitle();
    
    await expect(title).toBeVisible();
    await expect(loungeTitle).toBeVisible();
    await expect(pendingRequestsTitle).toBeVisible();
    await expect(cancelledBookingsTitle).toBeVisible();
    await expect(confirmedBookingsTitle).toBeVisible();
    await expect(walkupQRcodeTitle).toBeVisible();
  };
};

module.exports = ExpectPartnerToBeLoggedIn;
