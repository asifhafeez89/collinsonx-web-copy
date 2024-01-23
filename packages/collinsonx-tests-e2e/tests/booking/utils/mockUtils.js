// the response of 'GetAvailableSlots' is overrided by mock
export const slotsGQLResponse = {
  getAvailableSlots: {
    slots: [
      {
        endDate: '2024-02-22T13:00:00.000',
        maxDuration: 15,
        startDate: '2024-02-22T12:45:00.000',
      },
      {
        endDate: '2024-02-22T13:15:00.000',
        maxDuration: 15,
        startDate: '2024-02-22T13:00:00.000',
      },
    ],
  },
};

// the response of 'GetBookingByID' is overrided by mock
export const bookingGQLResponse = {
  getBookingByID: {
    id: '65a8df3dab4fd4a2a913122d',
    actingAccount: 'cfd7496b-33ec-4347-9c78-a61610a1dc7a',
    bookedFrom: '2024-02-22 12:45:00.000',
    bookedTo: '2024-02-22 15:05:00.000',
    lastArrival: '2024-02-22 13:00:00.000',
    metadata: {
      flightNumber: 'BA1417',
      flightTime: '15:05',
    },
    reference: 'TO4Y5X',
    price: 1200,
    price_currency: 'gbp',
    guestAdultCount: 2,
    guestChildrenCount: 0,
    guestInfantCount: 0,
    status: 'CONFIRMED',
    consumer: {
      emailAddress:
        'alreadyregisteredconsumerwithlinkaccount11@team875296.testinator.com',
      fullName: 'Alice Smith',
      id: '6be6af9a-c2fa-41cf-962b-fde7493c352e',
      __typename: 'Consumer',
    },
    experience: {
      id: '123',
      loungeName: 'Aspire Lounge',
      loungeCode: 'BHD1',
      location: {
        __typename: 'LegacyLocation',
        airportName: 'Belfast George Best City',
        airportCode: 'BHD',
        city: 'Belfast',
        country: 'United Kingdom',
        terminal: '',
        timezone: 'Europe/London',
      },
      pricing: {
        __typename: 'LegacyPricing',
        pricingType: 'Flat',
        currency: 'GBP',
        reservationCost: 0,
        lifestyleXReservationCharge: 0,
        walkInCostCurrentPPRate: 0,
        lifestyleXWalkInCharge: 0,
        vat: 20,
        reservationOnlyFeeCost: 4.8,
        reservationOnlyFee: 6,
      },
      openingHours:
        'Monday: 05:15 - 20:30\r\nTuesday: 05:15 - 20:30\r\nWednesday: 05:15 - 20:30\r\nThursday: 05:15 - 20:300\r\nFriday: 05:15 - 20:30\r\nSaturday: 05:15 - 20:30\r\nSunday: 05:15 - 21:15 \r\nNote: Closed Dec 25.\r\nDue to peak seasonal activity, it is expected this lounge will see an increase in the number of guests. Therefore, access may be periodically restricted due to space constraints.\r\n\r\n',
      images: [
        {
          altText: 'Aspire Lounge,Belfast City_UK',
          url: 'https://cdn03.collinson.cn/lounge-media/image/BHD1-12781.jpg',
          height: 375,
          width: 500,
          id: '3fc2332b-453c-4b75-8f8a-1be121539479',
          __typename: 'Image',
          contentType: null,
        },
        {
          altText: 'Aspire Lounge,Belfast City_UK',
          url: 'https://cdn03.collinson.cn/lounge-media/image/BHD1-12779.jpg',
          height: 375,
          width: 500,
          id: '249d936b-1d9a-49b2-b1ca-ac2b37a3c905',
          __typename: 'Image',
          contentType: null,
        },
        {
          altText: 'Aspire Lounge,Belfast City_UK',
          url: 'https://cdn03.collinson.cn/lounge-media/image/BHD1-12780.jpg',
          height: 375,
          width: 500,
          id: '845458e3-be05-4272-ae16-76ec2dce237d',
          __typename: 'Image',
          contentType: null,
        },
        {
          altText: 'Aspire Lounge,Belfast City_UK',
          url: 'https://cdn03.collinson.cn/lounge-media/image/BHD1-12782.jpg',
          height: 375,
          width: 500,
          id: '2bef0e49-aba7-4ce2-99ee-516ee5250ee5',
          __typename: 'Image',
          contentType: null,
        },
      ],
      __typename: 'Experience',
    },
    __typename: 'Booking',
  },
};

// the response of Stripe payment is overrided by mock
export const paymentIntentResponse = {
  id: 'pi_3OU5PIAO9eMKNhYJ1A5mRPdy',
  object: 'payment_intent',
  amount: 1200,
  amount_details: {
    tip: {},
  },
  automatic_payment_methods: null,
  canceled_at: null,
  cancellation_reason: null,
  capture_method: 'automatic',
  confirmation_method: 'automatic',
  created: 1704192072,
  currency: 'gbp',
  description: null,
  last_payment_error: null,
  livemode: false,
  next_action: null,
  payment_method: 'pm_1OU5PIAO9eMKNhYJh5Hy92fH',
  payment_method_configuration_details: null,
  payment_method_types: ['card'],
  processing: null,
  receipt_email:
    'alreadyregisteredconsumerwithlinkaccount11@team875296.testinator.com',
  setup_future_usage: null,
  shipping: null,
  source: null,
  status: 'succeeded',
};

export const paymentConfirmResponse = {
  id: 'pi_3OTO442eZvKYlo2C1F41froz',
  object: 'payment_intent',
  amount: 1200,
  amount_capturable: 0,
  amount_details: {
    tip: {},
  },
  amount_received: 1200,
  application: null,
  application_fee_amount: null,
  automatic_payment_methods: {
    allow_redirects: 'always',
    enabled: true,
  },
  canceled_at: null,
  cancellation_reason: null,
  capture_method: 'automatic',
  confirmation_method: 'automatic',
  created: 1704025464,
  currency: 'gbp',
  customer: null,
  description: null,
  invoice: '999',
  last_payment_error: null,
  latest_charge: 'ch_3OTO442eZvKYlo2C1gqiumhp',
  livemode: false,
  metadata: {},
  next_action: null,
  on_behalf_of: null,
  payment_method: 'pm_1OTOYq2eZvKYlo2CBcQGNLCT',
  payment_method_configuration_details: {
    id: 'pmc_1JwXwt2eZvKYlo2CHV7mUH3p',
    parent: null,
  },
  payment_method_options: {
    card: {
      installments: null,
      mandate_options: null,
      network: null,
      request_three_d_secure: 'automatic',
    },
    link: {
      persistent_token: null,
    },
  },
  payment_method_types: ['card', 'link'],
  processing: null,
  receipt_email: null,
  review: null,
  setup_future_usage: null,
  shipping: null,
  source: null,
  statement_descriptor: null,
  statement_descriptor_suffix: null,
  status: 'succeeded',
  transfer_data: null,
  transfer_group: null,
};

export async function interceptGQLOperation(
  page,
  operationName,
  responseOverride
) {
  await page.route('**/graphql', (route) => {
    const body = route.request().postDataJSON();

    if (body.operationName !== operationName) {
      return route.fallback();
    }
    return route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: responseOverride }),
    });
  });
}

export async function interceptStripeOperation(
  page,
  routeToIntercept,
  responseOverride
) {
  await page.route(routeToIntercept, (route) => {
    return route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: new URLSearchParams(responseOverride).toString(),
    });
  });
}

export async function interceptStripe(page, operationName, responseOverride) {
  switch (operationName) {
    case 'confirmPaymentIntent':
      interceptStripeOperation(
        page,
        'https://api.stripe.com/v1/payment_intents/*/confirm*',
        responseOverride
      );
      break;

    case 'createPaymentIntent':
      interceptStripeOperation(
        page,
        'https://api.stripe.com/v1/payment_intents*',
        responseOverride
      );
      break;

    default:
      console.log(`Stripe operation ${operationName} does not supported`);
  }
}
