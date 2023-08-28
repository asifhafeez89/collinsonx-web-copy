class WalkUpQRCodePage {
    constructor(page) {
        this.page = page;
    };

    goToURL() {
        return this.page.goto('/qr-code', { waitUntil: "networkidle" });
    };
};

module.exports = WalkUpQRCodePage;