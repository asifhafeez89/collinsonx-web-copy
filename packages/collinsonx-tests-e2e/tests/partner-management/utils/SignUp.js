import { MailinatorClient, GetInboxRequest, GetMessageRequest } from 'mailinator-client';
import axios from 'axios';
import dotenv from 'dotenv'
dotenv.config({ path: `.env.tests` })

class SignUp {
  async receiveRegistrationEmail(email) {

    // TODO: apiURL to be dynamic with the environment being tested
    const apiUrl = `https://gateway-api.${process.env.ENV}.cergea.com/graphql`

    const mutation = `
        mutation mutation($invitationInput: InvitationInput) {
          createInvitation(invitationInput: $invitationInput) {
            id
            experience {
              id
            }
            expiresAt
          }
        }
      `;

    const variables = {
      invitationInput: {
        inviteeEmail: email,
        userType: "PARTNER",
        experience: {
          id: process.env.EXPERIENCE_ID
        }
      }
    };

    const request = {
      query: mutation,
      variables: variables
    };

    const headers = {
      'x-user-id': process.env.X_USER_ID,
      'x-user-type': 'SUPER_USER'
    }

    await axios.post(apiUrl, request, { headers });
  };

  async getRegistrationURL(email) {
    const username = email.split("@")[0];

    const mailinatorClient = new MailinatorClient(
      process.env.MAILINATOR_API_TOKEN
    );

    const inbox = await mailinatorClient.request(
      new GetInboxRequest(process.env.MAILINATOR_EMAIL_ADDRESS)
    );

    let id;

    const latestMessage = await inbox.result.msgs.find(message => message.to === username);
    id = latestMessage.id;

    const latestMessageContents = await mailinatorClient.request(
      new GetMessageRequest(process.env.MAILINATOR_EMAIL_ADDRESS, username, id)
    );

    const regex = /https.*?(?=\])/;

    const url = regex.exec(latestMessageContents.result.parts[0].body);

    const formattedURL = url[0].toString().replace(/(&#x2F;)/g, "/").replaceAll("&#x3D;", "=");

    return formattedURL;
  };
};

module.exports = SignUp;