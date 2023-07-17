class BookingOverviewPage {
    constructor(page) {
        this.page = page;
    };

    getPageTitle() {
        return this.page.getByTestId('bookingOverviewTitle');
    };

    getLoungeTitle() {
        return this.page.getByTestId('loungeTitle');
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

    getCancelledBookingsTitle() {
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

    async getPendingRequestCount() {
        return Number(await this.page.getByTestId('pendingRequestsCount').innerText());
    };

    async getConfirmedBookingCount() {
        return Number(await this.page.getByTestId('allBookingsCount').innerText());
    };

};

module.exports = BookingOverviewPage;