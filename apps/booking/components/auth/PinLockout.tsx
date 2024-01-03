import { AccountProvider, Client } from '@collinsonx/constants/enums';
import { PinLockoutError } from '@collinsonx/constants/constants';
import {
  Container,
  Stack,
  Text,
  Button,
  Anchor,
  Center,
} from '@collinsonx/design-system/core';
import { useViewportSize } from '@collinsonx/design-system/hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BridgePayload } from 'types/booking';

import classes from './PinLockout.module.css';

const { LK, PP } = AccountProvider;
const { Mastercard_HSBC } = Client;
const { tooManyAttempts, expiredJwt } = PinLockoutError;

const PinLockout = ({
  payload,
  errorMessage,
}: {
  payload: BridgePayload | undefined;
  errorMessage: string;
}) => {
  const router = useRouter();
  const { height } = useViewportSize();
  const [loading, setLoading] = useState(true);
  const [errTitle, setTitle] = useState('');
  const [errDesc, setDesc] = useState('');
  const [errButton, setButton] = useState('');

  const handleClickReenter = () => {
    if (errorMessage === expiredJwt) {
      router.push({ pathname: window.parent.location.href });
    }

    router.push({
      pathname: '/auth/login',
    });
  };

  const handleSupportClick = () => {
    let url: string = '';

    if (
      payload?.membershipType === Mastercard_HSBC ||
      payload?.accountProvider === PP
    ) {
      url = 'https://memberhelp.prioritypass.com/en/support/home';
    } else if (payload?.accountProvider === LK) {
      url = 'https://www.loungekey.com/en/contact-us';
    }

    router.replace(url);
  };

  useEffect(() => {
    if (errorMessage === tooManyAttempts) {
      setTitle('Sorry, passcode not verified');
      setDesc(
        'Too many incorrect attempts were made to enter the verification passcode.'
      );
      setButton('RE-ENTER EMAIL');
    } else if (errorMessage === expiredJwt) {
      setTitle('Verification code has expired');
      setDesc(
        'Unfortunately the verification code has expired, so you have to restart your booking again'
      );
      setButton('RESTART BOOKING');
    }
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [errTitle, errDesc, errButton]);

  return (
    !loading && (
      <Center h={`${height / 2 + 116}px`}>
        <Container className={classes.container}>
          <Stack align="center" data-testid="attempts-header">
            <Text fw={700} size="xl">
              {errTitle}
            </Text>
            <Text
              className={classes.center}
              size="lg"
              data-testid="attempts-body"
            >
              {errDesc}
            </Text>
            <Button fw={600} onClick={handleClickReenter}>
              {errButton}
            </Button>
            <Anchor
              fw={600}
              size="lg"
              className={classes.contactLink}
              onClick={handleSupportClick}
              data-testid="link-call-support"
            >
              Contact support
            </Anchor>
          </Stack>
        </Container>
      </Center>
    )
  );
};

export default PinLockout;
