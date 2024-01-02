// the response of 'GetAvailableSlots' is overrided by mock
export const slotsGQLResponse = {
  getAvailableSlots: {
    slots: [
      {
        endDate: '2024-01-22T13:00:00.000',
        maxDuration: 15,
        startDate: '2024-01-22T12:45:00.000',
      },
      {
        endDate: '2024-01-22T13:15:00.000',
        maxDuration: 15,
        startDate: '2024-01-22T13:00:00.000',
      },
    ],
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

export const paymentPagesResponse = {
  id: 'ppage_1OU5OoAO9eMKNhYJmmqF6cbS',
  account_settings: {
    account_id: 'acct_1N9RBaAO9eMKNhYJ',
  },
  completion_behavior: {
    custom_message: null,
    redirect_url: null,
    type: 'confirmation_page',
  },
  intent_status: 'succeeded',
  invoice_receipt_url: null,
  invoice_url: null,
  livemode: false,
  locale: null,
  mode: 'payment',
  return_url: 'https://booking-local.test.cergea.com:4011/confirm-payment',
  session_id:
    'cs_test_a1y5uYURz3n85qYsBPlkQ0n6jXlRSPFxjNgz64z6EBiXExwIjzLht0MBXI',
  state: 'succeeded',
  success_url: null,
  ui_mode: 'embedded',
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

    console.log('GraphQL API request was intercepted and mocked');

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
    console.log('Stripe API request was intercepted and mocked');

    return route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: new URLSearchParams(responseOverride).toString(),
    });
  });
}

export async function interceptStripe(page, operationName, responseOverride) {
  switch (operationName) {
    case 'createPaymentIntent':
      interceptStripeOperation(page, '**/v1/payment_intents', responseOverride);
      break;
    case 'confirmPaymentIntent':
      interceptStripeOperation(
        page,
        '**/v1/payment_intents/*/confirm',
        responseOverride
      );
      break;
    case 'pagesPayment':
      interceptStripeOperation(page, '**/v1/payment_pages', responseOverride);
      break;
    default:
      console.log(`Stripe operation does not supported`);
  }
}
