// const playwright = require('playwright');
// const assert = require('chai').assert;
// const Mailosaur = require('mailosaur');

// (async () => {
//   const apiKey = 'YOUR_API_KEY';
//   const mailosaur = new Mailosaur(apiKey);

//   const serverId = 'abcd1234';
//   const serverDomain = 'abcd1234.mailosaur.net';

//   const browser = await playwright.chromium.launch();
//   const context = await browser.newContext();
//   const page = await context.newPage();
    
//   await page.goto('https://example.mailosaur.com/password-reset');
//   await page.screenshot({ path: `password-request.png` });

//   // Make up an email address for this test
//   const randomString = new Date().getTime();
//   const testEmail = `${randomString}@${serverDomain}`;

//   // Request a password reset for our test email address
//   await page.fill('#email', testEmail);
//   await page.click('button[type="submit"]');

//   await page.screenshot({ path: `password-request-sent.png` });

//   // Search for the email
//   const email = await mailosaur.messages.get(serverId, {
//     sentTo: testEmail
//   });

//   assert.equal(email.subject, 'Set your new password for ACME Product');

//   await browser.close();
// })();
