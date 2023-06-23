class BookingOverviewPage {
    constructor(page) {
      this.page = page;
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