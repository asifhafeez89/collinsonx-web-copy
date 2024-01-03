import * as React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';
import { Stack, Title } from '@collinsonx/design-system/core';
import useLocale from 'hooks/useLocale';

import classes from './stripe.module.css';

const stripeApiToken = process.env
  .NEXT_PUBLIC_STRIPE_PUBLISHABLE_TOKEN as string;

const stripePromise = loadStripe(stripeApiToken);

const StripeCheckout = ({ clientSecret }: any) => {
  const translations = useLocale();
  return (
    <Stack align="center" className={classes.container}>
      <Title data-testid="paymentInformation" order={3}>
        {translations.booking.payment.title}
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
