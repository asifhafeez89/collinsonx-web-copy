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
        const element = await this.page.getByTestId('pendingRequestsCount');
        await element.waitFor();
        return Number(await element.innerText());
    };

    async getConfirmedBookingCount() {
        const element = await this.page.getByTestId('allBookingsCount');
        await element.waitFor();
        return Number(await element.innerText());
    };

};

module.exports = BookingOverviewPage;