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
import colors from 'ui/colour-constants';

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
      setTitle('Sorry, too many wrong attempts');
      setDesc(
        '5 incorrect attempts were made to enter the verification code.\nPlease try again in an hour'
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
        <Container
          sx={{
            padding: '16px',
            maxWidth: '440px',
            overflow: 'hidden',
            backgroundColor: colors.white,
            margin: '0 auto',
            '@media (max-width: 768px)': {
              width: '90%',
            },
          }}
        >
          <Stack align="center" data-testid="attempts-header">
            <Text fw={700} size={20}>
              {errTitle}
            </Text>
            <Text align="center" size={18} data-testid="attempts-body">
              {errDesc}
            </Text>
            <Button fw={600} onClick={handleClickReenter}>
              {errButton}
            </Button>
            <Anchor
              fw={600}
              size={18}
              sx={{
                color: colors.blue,
                backgroundColor: 'transparent',
                textDecoration: 'underline',
              }}
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
