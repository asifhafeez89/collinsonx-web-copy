
import CheckEmailPage from '../pages/CheckEmailPage';
import { v4 as uuidv4 } from 'uuid';
import { MailinatorClient, GetInboxRequest, GetMessageRequest } from 'mailinator-client';
import Helper from '../../helpers/Helper';
class LoginPage {
  constructor(page, expect) {
    this.page = page;
    this.helper = new Helper(page);
    this.checkEmailPage = new CheckEmailPage(page);
  };

  async login() {
    let uuid = uuidv4();
    let email = uuid + '@clearrouteteam.testinator.com';

    await this.getEmailAddressTextbox().fill(email);
    await this.getLoginButton().click();
    // TODO: refactor 'wait' for ensuring the email has been sent before proceeding
    await this.helper.wait(5000);

    const otp = await this.getOTP(uuid);

    await this.helper.type(otp);
    await this.checkEmailPage.getVerifyButton().click();
    await this.helper.wait(5000);
  }

  async getOTP(user) {
    const mailinatorClient = new MailinatorClient(
      '2a32de31d6734501abb238da21c9ac3a'
    );

    let id;

    for (let i = 1; i++; i <= 5) {
      try {
        const inbox = await mailinatorClient.request(
          new GetInboxRequest('clearrouteteam.testinator.com')
        );
        const latestMessage = inbox.result.msgs.find(
          (message) => message.to === user
        );
        id = latestMessage.id;
        break;
      } catch {
        // wait x amount of time before next attempt at checking emails
        await this.helper.wait(3000);
      }
    }

    const otp = await mailinatorClient.request(
      new GetMessageRequest('clearrouteteam.testinator.com', user, id)
    );
    const regex = /(\d{6})<\/div>/g;
    const match = regex.exec(otp.result.parts[0].body);

    return match[1].toString();
  }

  goToURL() {
    return this.page.goto('/');;
  };

  getEmailAddressTextbox() {
    return this.page.getByTestId('loginEmailAddress');
  };

  getHomePageTitle() {
    return this.page.getByTestId('homePageTitle');
  };

  getLoginButton() {
    return this.page.getByTestId('login');
  };
};

module.exports = LoginPage;
