import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config({ path: `.env.tests` });
require('dotenv').config();
import Stripe from 'stripe';
import { apiURL, stripePayment } from '../utils/config';

class BookingApi {
  constructor(page, request) {
    this.apiUrl = apiURL
    this.page = page
    this.request = request
  };

  async addDeclinedBooking(lounge) {
    const { bookingId, bookingRef, consumerId } = await this.addPendingRequest(lounge);

    await this.declineBooking(bookingId);

    return { bookingId, bookingRef, consumerId };
  };

  async addConfirmedBooking(lounge) {
    const { bookingId, bookingRef, consumerId } = await this.addPendingRequest(lounge);

    await this.confirmBooking(bookingId);

    return { bookingId, bookingRef, consumerId };
  };

  async addPendingRequest(lounge) {
    const consumerId = await this.findOrCreateConsumer();
    const booking = await this.createBooking(lounge, consumerId);
    const bookingId = booking.id;
    const bookingRef = booking.reference;
    const response = await this.stripeBookingPayment(lounge, consumerId, bookingId);

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
        "emailAddress": process.env["SIGNUP_EMAIL_" + process.env.ENV],
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

  async createBooking(lounge) {
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
          "id": process.env[lounge + "_EXPERIENCE_ID"]
        },
        "bookedFrom": dateTwoDaysFromNow,
        "bookedTo": dateTwoDaysTwoHoursFromNow,
        "type": "RESERVATION",
        "metadata": {},
        "guestCount": 1
      }
    };

    const data = {
      query: mutation,
      variables: variables
    };

    const response = await (this.page.request).post(this.apiUrl, { data })
    const responseJson = await response.json()

    const createBookingObj = responseJson.data.createBooking;

    if (createBookingObj === null) {
      throw new Error("The response createBooking object is null. The method of authorisation, or the credentials themselves, may be incorrect.");
    };

    const bookingId = responseJson.data.createBooking.id;

    const reference = responseJson.data.createBooking.reference;

    return { id: bookingId, reference };

  };

  async stripeBookingPayment(lounge, consumerId, bookingId) {
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
      query: `metadata["internalProductId"]:"${process.env[lounge + "_EXPERIENCE_ID"]}"`
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
      success_url: stripePayment.successURL,
      cancel_url: stripePayment.cancelledURL,
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
      await this.page.waitForURL(stripePayment.successURL);
    } catch (error) {
      if (error.message.includes('ERR_CONNECTION_REFUSED')) {
        console.log('ignoring ERR_CONNECTION_REFUSED');
      } else {
        throw error;
      }
    };

  };

  async getBookingCount(lounge, ...statuses) {
    const statusBookings = await this.getBookings(lounge, ...statuses);

    const statusBookingsCount = statusBookings.length;

    return statusBookingsCount;
  };

  async declineBooking(bookingId) {
    const mutation = `
      mutation DeclineBooking($declineBookingId: ID!) {
        declineBooking(id: $declineBookingId) {
          consumer {
            id
          }
          status
        }
      }
    `;

    const variables = {
      "declineBookingId": bookingId
    };

    const data = {
      query: mutation,
      variables: variables
    };

    // const headers = {
    //   'x-user-id': process.env.X_USER_ID,
    //   'x-user-type': 'SUPER_USER'
    // };

    const response = await (this.page.request).post(this.apiUrl, { data })
    const responseJson = await response.json()

    if (responseJson.data.errors) {
      throw new Error(responseJson.data.errors[0].message)
    };
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

    const data = {
      query: mutation,
      variables: variables
    };

    // const headers = {
    //   'x-user-id': process.env.X_USER_ID,
    //   'x-user-type': 'SUPER_USER'
    // };

    const response = await (this.page.request).post(this.apiUrl, { data })
    const responseJson = await response.json()

    if (responseJson.data.errors) {
      throw new Error(responseJson.data.errors[0].message)
    };
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

    const data = {
      query: mutation,
      variables: variables
    };

    // const headers = {
    //   'x-user-id': process.env.X_USER_ID,
    //   'x-user-type': 'SUPER_USER'
    // };

    const response = await (this.page.request).post(this.apiUrl, { data })
    const responseJson = await response.json()

    if (responseJson.data.errors) {
      throw new Error(responseJson.data.errors[0].message)
    };
  }

  async getBookings(lounge, ...statuses) {
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
      "experienceId": process.env[lounge + "_EXPERIENCE_ID"]
    };

    const data = {
      query: query,
      variables: variables
    };

    // const headers = {
    //   'x-user-id': process.env.X_USER_ID,
    //   'x-user-type': 'SUPER_USER'
    // };

    const response = await (this.page.request).post(this.apiUrl, { data })
    const responseJson = await response.json()

    // No error handling - unauthorised requests will always return 200 with an empty array

    const bookings = responseJson.data.getBookings;

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

    const data = {
      query: query,
      variables: variables
    };

    // const headers = {
    //   'x-user-id': process.env.X_USER_ID,
    //   'x-user-type': 'SUPER_USER'
    // };

    const response = await (this.page.request).post(this.apiUrl, { data })
    const responseJson = await response.json()

    if (responseJson.data.errors) {
      throw new Error(responseJson.data.errors[0].message)
    };

    const booking = responseJson.data.getBookingByID;

    return booking;
  };
};

module.exports = BookingApi;