import axios from 'axios';

class BookingApi {
  constructor() {
    this.apiUrl = "https://gateway-api.test.cergea.com/graphql"
  }

  async addPendingRequest() {
    const consumerId = await this.findOrCreateConsumer();
    const bookingId = await this.createBooking(consumerId);
    const response = await this.payForBooking(consumerId, bookingId);

    return response;
  };

  async findOrCreateConsumer() {
    const mutation = `
      mutation FindOrCreateConsumer($consumerInput: ConsumerInput) {
        findOrCreateConsumer(consumerInput: $consumerInput) {
          id
          createdAt
          crmId
          emailAddress
          firstName
          fullName
          lastName
          updatedAt
        }
      }
    `;

    const variables = {
      "consumerInput": {
        "emailAddress": "automationconsumer@clearrouteteam.testinator.com",
        "firstName": "Automation",
        "lastName": "Consumer",
        "marketingConsent": false,
        "phone": null
      }
    };

    const request = {
      query: mutation,
      variables: variables
    };

    const response = await axios.post(this.apiUrl, request);

    const consumerId = response.data.findOrCreateConsumer.id;

    return consumerId;
  };

  async createBooking(consumerId) {
    const mutation = `
      mutation CreateBooking($bookingInput: BookingInput) {
        createBooking(bookingInput: $bookingInput) {
          id
          consumer {
            id
          }
          orderID
          stripePaymentID
          bookedFrom
          bookedTo
          status
          createdAt
          updatedAt
          type
          guestCount
          metadata
        }
     }`


    const variables = {
      "bookingInput": {
        "experience": {
          "id": "29e22c54-6700-50ae-b6bc-96a18bae6d3d"
        },
        "bookedFrom": "2023-06-08T04:53:00.000Z",
        "bookedTo": "2023-06-08T06:53:00.000Z",
        "orderID": null,
        "stripePaymentID": null,
        "type": "RESERVATION",
        "metadata": {},
        "guestCount": 1
      }
    }

    const request = {
      query: mutation,
      variables: variables
    };

    const headers = {
      'x-user-id': consumerId,
      'x-user-type': 'CONSUMER'
    };

    const response = await axios.post(apiUrl, request, { headers });

    const bookingId = response.data.createBooking.id;

    return bookingId;
  };

  async payForBooking(consumerId, bookingId) {
    const mutation = `
      mutation Mutation($payForBookingId: ID!, $paymentInput: PaymentInput) {
        payForBooking(id: $payForBookingId, paymentInput: $paymentInput) {
          id
          orderID
          stripePaymentID
          bookedFrom
          bookedTo
          status
          createdAt
          updatedAt
          type
          guestCount
          metadata
        }
      } 
    `;

    const variables = {
      "payForBookingId": bookingId,
      "paymentInput": {
        "stripePaymentID": "123",
        "orderID": "123"
      }
    };

    const request = {
      query: mutation,
      variables: variables
    };

    const headers = {
      'x-user-id': consumerId,
      'x-user-type': 'CONSUMER'
    }

    const response = await axios.post(apiUrl, request, { headers });

    return response.data;
  };
};