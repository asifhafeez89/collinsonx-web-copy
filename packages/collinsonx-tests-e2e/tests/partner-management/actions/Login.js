import LoginPage from '../pages/LoginPage';

class Login {
  constructor(page) {
    this._loginPage = new LoginPage(page);
  };

  async asNewUser(boolean) {
    await this.loginPage.goToURL();

    const email = this.setUser(boolean);

    await this.loginPage.enterEmailAddress(email);

    // password will be changed and added to secret variables at a later date
    await this.loginPage.enterPassword('CollinsonXPartner123');
  };

  // logic for new user is not currently used - will be added after current user tests
  setUser(isNewPartner) {
    let partner;

    if (isNewPartner == true) {
      user = uuidv4();
    } else {
      partner = 'automationuserpartner';
    }

    return `${partner}@clearroute.testinator.com`;
  };

};

module.exports = Login;