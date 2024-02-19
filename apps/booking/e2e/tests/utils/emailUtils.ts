import {
  MailinatorClient,
  GetInboxRequest,
  GetMessageRequest,
} from 'mailinator-client';
import { mailinatorAddress } from '../config';
import axios from 'axios';
import { chromium } from '@playwright/test';

/**
 * Retrieves a PIN from an email using the Mailinator API. This function polls the Mailinator inbox up
 * to 3 times, waiting 5 seconds between each poll, to check for the latest email sent to the given email address.
 * The function then extracts the PIN from the email content using a regular expression.
 *
 * @param {string} email - The email address where the PIN was sent. Only the username part is used to filter messages in Mailinator.
 * @returns {Promise<string>} - Returns a promise that resolves with the extracted PIN.
 * @throws {Error} - Throws an error if the OTP email is not found after 3 polling attempts or if any other error occurs.
 *
 * @example
 * const pin = await getPinFromEmail('username@mailinator.com');
 */
export function getIdFromEmail(email: string): string {
  return email.split('@')[0];
}

export async function getPinFromEmail(email: string) {
  const username = getIdFromEmail(email);

  const mailinatorClient = new MailinatorClient(
    process.env.MAILINATOR_API_TOKEN || ''
  );

  try {
    let latestMessage;
    let count = 0;

    while (latestMessage === undefined && count < 3) {
      count > 0 && (await new Promise((resolve) => setTimeout(resolve, 5000)));

      const inbox = await mailinatorClient.request(
        new GetInboxRequest(mailinatorAddress)
      );

      if (inbox.result) {
        latestMessage = await inbox.result.msgs.find(
          (message) => message.to === username
        );
      }

      count++;
    }

    if (latestMessage === undefined) {
      throw new Error(
        "Could not find the OTP email. Check the user's email is correct in relation to the Mailinator account being used."
      );
    }

    const id = latestMessage.id;

    const latestMessageContents = await mailinatorClient.request(
      new GetMessageRequest(mailinatorAddress, username, id)
    );

    const regex = /(\d+)<\/div>/;

    if (latestMessageContents.result) {
      const matchResult = regex.exec(
        latestMessageContents.result.parts[0].body
      );
      if (matchResult) {
        const pin = matchResult[1];
        return pin;
      }
    }
  } catch (err) {
    throw err;
  }
}

export async function getLinksFromEmail(email: string) {
  const username = email.split('@')[0];

  const mailinatorClient = new MailinatorClient(
    process.env.MAILINATOR_API_TOKEN || ''
  );

  console.log(
    'Sending request to receive the latest emails for user: ',
    username
  );
  try {
    let latestMessage;
    let count = 0;

    const subject = 'Good news - your lounge booking is confirmed';

    while (latestMessage === undefined && count < 3) {
      count > 0 && (await new Promise((resolve) => setTimeout(resolve, 5000)));

      const inbox = await mailinatorClient.request(
        new GetInboxRequest(mailinatorAddress)
      );

      if (inbox.result) {
        latestMessage = await inbox.result.msgs.find(
          (message) => message.to === username && message.subject === subject
        );
      }

      count++;
    }

    if (latestMessage === undefined) {
      throw new Error(
        `Could not find the OTP email for user ${username}. Check the user's email is correct in relation to the Mailinator account being used.`
      );
    }

    const latestMessageId = latestMessage.id;

    const request = `https://mailinator.com/api/v2/domains/${mailinatorAddress}/inboxes/${username}/messages/${latestMessageId}/links`;
    console.log('Sending GET request to receive links: ', request);

    const res = await axios.get(request, {
      headers: { Authorization: process.env.MAILINATOR_API_TOKEN },
    });

    const links = res.data.links;

    return links;
  } catch (err) {
    throw err;
  }
}

export async function getLink(email: string, pattern: string): Promise<string> {
  const links = await getLinksFromEmail(email);

  const browser = await chromium.launch();

  for (let i = 0; i < links.length; i += 1) {
    const page = await browser.newPage();
    await page.goto(links[i]);

    const url = await page.url();

    if (url.includes(pattern)) {
      return url;
    }
    page.close();
  }
  return '';
}
