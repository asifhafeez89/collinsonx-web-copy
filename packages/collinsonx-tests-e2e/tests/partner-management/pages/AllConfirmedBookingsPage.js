class AllConfirmedBookingsPage {
    constructor(page) {
        this.page = page;
    };

    title() {
        return this.page.getByRole('heading', { name: 'Confirmed lounge booking management' });
    };

    checkCustomerIn(bookingRef) {
        const button = this.page.getByRole('row', { name: bookingRef }).getByTestId('checkCustomerIn')
        button.click();
        this.page.getByRole('checkbox').click();
        return this.page.getByRole('button', { name: 'Check in' }).click();
    };

    waitForCheckedInElement(bookingRef) {
        const button = this.page.getByRole('row', { name: bookingRef }).getByTestId('checkCustomerIn')
        return button.waitFor({ state: "detached" });
    };
};

module.exports = AllConfirmedBookingsPage;