import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config({ path: `.env.tests` });
require('dotenv').config();
import Stripe from 'stripe';

class BookingApi {
  constructor(page) {
    this.apiUrl = `https://gateway-api.${process.env.ENV}.cergea.com/graphql`
    this.page = page;
  };

  async addConfirmedBooking(user) {
    const { bookingId, bookingRef, consumerId } = await this.addPendingRequest(user);

    await this.confirmBooking(bookingId);

    return { bookingId, bookingRef, consumerId };
  };

  async addPendingRequest(user) {
    const consumerId = await this.findOrCreateConsumer();
    const booking = await this.createBooking(user, consumerId);
    const bookingId = booking.id;
    const bookingRef = booking.reference;
    const response = await this.stripeBookingPayment(user, consumerId, bookingId);

    return { bookingId, bookingRef, consumerId };
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
        "emailAddress": process.env["AUTOMATION_CONSUMER_USERNAME_" + process.env.ENV],
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

  async createBooking(user, consumerId) {
    const mutation = `
      mutation CreateBooking($bookingInput: BookingInput) {
        createBooking(bookingInput: $bookingInput) {
          id
          reference
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
     }
    `;

    const currentDate = new Date();

    currentDate.setDate(currentDate.getDate() + 2);

    // Format the date as 'YYYY-MM-DDTHH:mm:ss.sssZ'
    const dateTwoDaysFromNow = currentDate.toISOString();

    currentDate.setHours(currentDate.getHours() + 2);

    const dateTwoDaysTwoHoursFromNow = currentDate.toISOString();

    const variables = {
      "bookingInput": {
        "experience": {
          "id": process.env[user + "_EXPERIENCE_ID"]
        },
        "bookedFrom": dateTwoDaysFromNow,
        "bookedTo": dateTwoDaysTwoHoursFromNow,
        "orderID": null,
        "stripePaymentID": null,
        "type": "RESERVATION",
        "metadata": {},
        "guestCount": 1
      }
    };

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

    const reference = response.data.data.createBooking.reference;

    return { id: bookingId, reference };
  };

  async stripeBookingPayment(user, consumerId, bookingId) {
    const stripe = new Stripe(process.env.STRIPE_API_KEY);

    const customer = await stripe.customers.create({
      email: 'automationuser@clearrouteteam.testinator.com',
      address: {
        city: "London",
        country: "United Kingdom",
        line1: "99 Leeds St.",
        postal_code: "KT1 2AA",
        state: "Surrey"
      }
    });

    const stripePrices = await stripe.prices.search({
      query: `metadata["internalProductId"]:"${process.env[user + "_EXPERIENCE_ID"]}"`
    });

    const priceId = stripePrices.data[0]?.id || '';

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      customer: customer.id,
      customer_update: {
        address: 'auto'
      },
      payment_intent_data: {
        capture_method: "automatic",
        metadata: {
          bookingID: bookingId,
          consumerID: consumerId
        }
      },
      metadata: {
        bookingID: bookingId,
        consumerID: consumerId
      },
      invoice_creation: {
        enabled: true
      },
      mode: 'payment',
      success_url: "http://localhost:3000/BookingConfirmed?paymentSuccess=true",
      cancel_url: "http://localhost:3000/BookLounge?cancelPayment=true",
      automatic_tax: { enabled: true }
    });

    const checkoutURL = session.url;

    await this.page.goto(checkoutURL);

    await this.page.locator('#billingCountry').selectOption('United Kingdom');
    // entering the postal code fires off network requests to determine the tax amount
    // do not move this code below other form elements - this along with 'networkidle' ensures the tax amount is resolved before clicking 'pay"
    await Promise.all([
      await this.page.getByLabel('Postal code').fill('KT1 2AA'),
      // TODO - fix flakiness. Difficult as the tax subtotal does not have a 'selector'
      await this.page.waitForTimeout(5000)
    ]);
    await this.page.getByLabel('Card number').fill('4242424242424242');
    await this.page.getByLabel('Expiration').fill('1234');
    await this.page.getByPlaceholder('CVC').fill('222');
    await this.page.locator('#billingName').fill('EXAMPLE CUSTOMER')
    await this.page.getByTestId('hosted-payment-submit-button').click();


    try {
      await this.page.waitForURL("http://localhost:3000/BookingConfirmed?paymentSuccess=true");
    } catch (error) {
      if (error.message.includes('ERR_CONNECTION_REFUSED')) {
        console.log('ignoring ERR_CONNECTION_REFUSED');
      } else {
        throw error;
      }
    };

  };

  async getBookingCount(user, ...statuses) {
    const statusBookings = await this.getBookings(user, ...statuses);

    const statusBookingsCount = statusBookings.length;

    return statusBookingsCount;
  };

  async confirmBooking(bookingId) {
    const mutation = `
      mutation Mutation($confirmBookingId: ID!) {
        confirmBooking(id: $confirmBookingId) {
          consumer {
            id
          }
        }
      }
    `;

    const variables = {
      "confirmBookingId": bookingId
    };

    const request = {
      query: mutation,
      variables: variables
    };

    const headers = {
      'x-user-id': process.env.X_USER_ID,
      'x-user-type': 'SUPER_USER'
    };

    const response = await axios.post(this.apiUrl, request, { headers });
  };

  async deleteBooking(bookingId) {
    const mutation = `
      mutation Mutation($deleteBookingId: ID!) {
        deleteBooking(id: $deleteBookingId) {
          id
        }
      }
    `;

    const variables = {
      "deleteBookingId": bookingId
    };

    const request = {
      query: mutation,
      variables: variables
    };

    const headers = {
      'x-user-id': process.env.X_USER_ID,
      'x-user-type': 'SUPER_USER'
    };

    await axios.post(this.apiUrl, request, { headers });
  }

  async getBookings(user, ...statuses) {
    const query = `
      query GetBookings($experienceId: ID!) {
        getBookings(experienceID: $experienceId) {
          id
          status
          reference
        }
      }
    `;

    const variables = {
      "experienceId": process.env[user + "_EXPERIENCE_ID"]
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

    const statusBookings = bookings.filter((booking) => {
      return statuses.includes(booking.status);
    });

    return statusBookings;
  };

  async getBookingById(bookingId) {
    const query = `
      query Query($getBookingByIdId: ID!) {
        getBookingByID(id: $getBookingByIdId) {
          status
          reference
        }
      }
    `;

    const variables = {
      "getBookingByIdId": bookingId
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
    const booking = response.data.data.getBookingByID;

    return booking;
  };
};

module.exports = BookingApi;