import {
  MailinatorClient,
  GetInboxRequest,
  GetMessageRequest,
} from 'mailinator-client';
import { mailinatorAddress } from '../config';

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
export async function getPinFromEmail(email) {
  const username = email.split('@')[0];

  const mailinatorClient = new MailinatorClient(
    process.env.MAILINATOR_API_TOKEN
  );

  try {
    let latestMessage;
    let count = 0;

    while (latestMessage === undefined && count < 3) {
      count > 0 && (await new Promise((resolve) => setTimeout(resolve, 5000)));

      const inbox = await mailinatorClient.request(
        new GetInboxRequest(mailinatorAddress)
      );

      latestMessage = await inbox.result.msgs.find(
        (message) => message.to === username
      );

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

    const matchResult = regex.exec(latestMessageContents.result.parts[0].body);
    const pin = matchResult[1];
    return pin;
  } catch (err) {
    throw err;
  }
}

export async function getLinkFromEmail(email) {
  const username = email.split('@')[0];

  const mailinatorClient = new MailinatorClient(
    process.env.MAILINATOR_API_TOKEN
  );

  try {
    let latestMessage;
    let count = 0;

    while (latestMessage === undefined && count < 3) {
      count > 0 && (await new Promise((resolve) => setTimeout(resolve, 5000)));

      const inbox = await mailinatorClient.request(
        new GetInboxRequest(mailinatorAddress)
      );

      latestMessage = await inbox.result.msgs.find(
        (message) => message.to === username
      );

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

    // const regex = /(\d+)<\/div>/;

    // const matchResult = regex.exec(latestMessageContents.result.parts[0].body);
    // const pin = matchResult[1];
    // return pin;

    return latestMessageContents.result.parts[0].body;
  } catch (err) {
    throw err;
  }
}
