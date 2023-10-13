import * as React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';
import { Stack, Title } from '@mantine/core';

const stripeApiToken = process.env
  .NEXT_PUBLIC_STRIPE_PUBLISHABLE_TOKEN as string;

const stripePromise = loadStripe(stripeApiToken, {
  betas: ['embedded_checkout_beta_1'],
});

const StripeCheckout = ({ clientSecret }: any) => {
  return (
    <Stack
      align="center"
      sx={{ width: '100%', backgroundColor: 'transparent' }}
    >
      <Title data-testid="paymentInformation" order={3}>
        Payment information
      </Title>
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{
          clientSecret,
        }}
      >
        <EmbeddedCheckout className="stripe-checkout" />
      </EmbeddedCheckoutProvider>
    </Stack>
  );
};

export default StripeCheckout;
