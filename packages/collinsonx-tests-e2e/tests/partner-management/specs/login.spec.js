const { test } = require('@playwright/test');
import Login from '../actions/Login';
import SignUp from '../actions/SignUp';
import ExpectPartnerToBeLoggedIn from '../assertions/ExpectPartnerToBeLoggedIn';
import { v4 as uuidv4 } from 'uuid';
import Helper from '../../helpers/Helper';

test('login as a current partner', async ({ page }) => {
    const login = new Login(page);
    const expectPartnerToBeLoggedIn = new ExpectPartnerToBeLoggedIn(page);

    // password will be changed and added to secret variables at a later date
    const partner = "automationuserpartner";
    const email = `${partner}@clearrouteteam.testinator.com`;
    const password = "CollinsonXPartner123";

    await login.login(email, password);

    await expectPartnerToBeLoggedIn.ask();
});

test('login as a new partner', async ({ page }) => {
    const expectPartnerToBeLoggedIn = new ExpectPartnerToBeLoggedIn(page);
    let helper = new Helper(page);
    const signup = new SignUp(page);
    const login = new Login(page);

    const partner = uuidv4();
    const email = `${partner}@clearrouteteam.testinator.com`;
    const password = uuidv4();

    signup.receiveRegistrationEmail(email);
    await helper.wait(5000);
    const signupURL = await signup.getRegistrationURL(partner);
    await page.goto(signupURL);
    
    await signup.fillInDetails();
    
    login.login(email, password);

    await expectPartnerToBeLoggedIn.ask();
});