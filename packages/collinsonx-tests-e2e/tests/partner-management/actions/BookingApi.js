import axios from 'axios';
import dotenv from 'dotenv'
dotenv.config({ path: `.env.tests` })

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

    const consumerId = response.data.data.findOrCreateConsumer.id;

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
          "id": process.env.EXPERIENCE_ID
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

    const response = await axios.post(this.apiUrl, request, { headers });

    const bookingId = response.data.data.createBooking.id;

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

    const response = await axios.post(this.apiUrl, request, { headers });

    return response.data.data;
  };

  async getPendingRequestCount() {
    const query = `
      query GetBookings($experienceId: ID!) {
        getBookings(experienceID: $experienceId) {
          status
        }
      }
    `;

    const variables = {
      "experienceId": process.env.EXPERIENCE_ID
    };

    const request = {
      query: query,
      variables: variables
    };

    const headers = {
      'x-user-id': process.env.X_USER_ID,
      'x-user-type': 'SUPER_USER'
    };

    const response = await axios.post(this.apiUrl, request, { headers });


    const bookings = response.data.data.getBookings;

    const pendingBookings = bookings.filter(booking => booking.status === "PENDING")

    const pendingCount = pendingBookings.length;

    return pendingCount;
  };
};

module.exports = BookingApi;