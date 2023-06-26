class BookingOverviewPage {
    constructor(page) {
      this.page = page;
    };

    getPageTitle() {
        return this.page.getByTestId('bookingOverviewTitle');
    };

    getPendingRequestsTitle() {
        return this.page.getByTestId('pendingRequestsTitle');
    };

    getConfirmedBookingsTitle() {
        return this.page.getByTestId('confirmedBookingsTitle');
    };

    getWalkupQRcodeTitle() {
        return this.page.getByTestId('walkupQRcodeTitle');
    };

    getCancelledBookingsTitleTitle() {
        return this.page.getByTestId('cancelledBookingsTitle');
    };

    viewAllPendingRequests() {
        return this.page.getByTestId('viewAllPendingRequests').click();
    };

    viewAllDeclined() {
        return this.page.getByTestId('viewAllDeclined').click();
    };

    viewAllConfirmed() {
        return this.page.getByTestId('viewAllConfirmed').click();
    };
  
  };
    
  module.exports = BookingOverviewPage;