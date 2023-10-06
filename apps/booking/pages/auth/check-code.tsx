import {
  Button,
  Stack,
  Text,
  Box,
  Flex,
  PinInput,
  Title,
  Skeleton,
  Anchor,
} from '@collinsonx/design-system/core';
import { useRouter } from 'next/router';
import {
  consumePasswordlessCode,
  createPasswordlessCode,
} from '@collinsonx/utils/supertokens';
import LayoutLogin from '@components/LayoutLogin';
import LoaderLifestyleX from '@collinsonx/design-system/components/loaderLifestyleX';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@collinsonx/utils/apollo';
import { default as ErrorComponent } from '@components/Error';
import usePayload from 'hooks/payload';
import colors from 'ui/colour-constants';
import PinLockout from '@components/auth/PinLockout';
import linkAccount from '@collinsonx/utils/mutations/linkAccount';
import Session from 'supertokens-auth-react/recipe/session';
import BackToLounge from '@components/BackToLounge';
import getError from 'utils/getError';
import { BookingError } from '../../constants';
import { BookingQueryParams } from '@collinsonx/constants/enums';
import { PinLockoutError } from '@collinsonx/constants/constants';

const { ERR_MEMBERSHIP_ALREADY_CONNECTED } = BookingError;
const { tooManyAttempts, expiredJwt } = PinLockoutError;
const { bookingId } = BookingQueryParams;

export default function CheckEmail() {
  const { jwt, lounge, payload, setLinkedAccountId, setLayoutError } =
    usePayload();
  const router = useRouter();
  const email = router.query?.email as string;
  const [code, setCode] = useState<string>();

  const [pinError, setPinError] = useState(false);
  const [pinLockout, setPinLockout] = useState(false);
  const [pinAttemptCount, setPinAttemptCount] = useState(0);
  const [count, setCount] = useState(20);
  const [checkingCode, setCheckingCode] = useState(false);
  const [pinLockoutError, setPinLockoutError] = useState('');

  const [
    dolinkAccount,
    { loading: loadingLinkAccount, error: errorLinkAccount },
  ] = useMutation(linkAccount);

  let interval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    interval.current = setInterval(() => {
      setCount((count) => {
        if (count === 0) {
          return count;
        }
        return (count -= 1);
      });
    }, 1000);
    return () => clearInterval(interval.current);
  }, []);

  const handleClickResend = () => {
    try {
      createPasswordlessCode({ email });
    } catch (e) {}
    setCount(20);
  };

  const handleLinkAccount = () =>
    dolinkAccount({
      variables: {
        linkedAccountInput: {
          token: jwt,
          analytics: { email },
        },
      },
    }).then((response) => {
      if (!response.data) throw new Error('no user data');

      const alreadyConnectedError = getError(
        response,
        ERR_MEMBERSHIP_ALREADY_CONNECTED
      );

      if (alreadyConnectedError) {
        console.log('[SIGN OUT]: membership already connected');
        Session.signOut().then(() => {
          setLayoutError(ERR_MEMBERSHIP_ALREADY_CONNECTED);
          router.push({
            pathname: '/auth/login',
          });
        });
      }

      setLinkedAccountId(response.data.linkAccount.id);

      if (router.query.bookingId) {
        router.push({
          pathname: '/cancel-booking',
          query: {
            [bookingId]: router.query[bookingId] as string,
          },
        });
      } else {
        router.push({
          pathname: '/',
        });
      }
    });

  const handleClickConfirm = async () => {
    setCheckingCode(true);

    if (!code || code.length !== 6) {
      setPinError(true);
      setCheckingCode(false);
      return;
    }

    let response = await consumePasswordlessCode({
      userInputCode: code,
    });
    console.log('[check-code] calling supertokens consumerPasswordlessCode...');

    if (
      response.status === 'INCORRECT_USER_INPUT_CODE_ERROR' ||
      response.status === 'EXPIRED_USER_INPUT_CODE_ERROR'
    ) {
      console.log('[check-code] response.status error case ', response.status);
      setPinError(true);
      setCheckingCode(false);
      setPinAttemptCount(response.failedCodeInputAttemptCount);
      return;
    }

    if (response.status === 'RESTART_FLOW_ERROR') {
      console.log('[check-code] response.status error case ', response.status);
      setPinLockoutError(pinAttemptCount === 4 ? tooManyAttempts : expiredJwt);
      setPinLockout(true);
      setCheckingCode(false);
      return;
    }

    if (response.status !== 'OK') {
      console.log('[check-code] response.status error case ', response.status);
      return window.alert('Login failed. Please try again');
    }

    if (response.createdNewUser) {
      console.log(
        '[check-code] consumerPasswordlessCode: response.createdNewUser === true'
      );
      router.push({
        pathname: '/auth/signup-user',
        query: {
          email,
          [bookingId]: router.query[bookingId] || '',
        },
      });
    } else {
      console.log(
        '[check-code] consumerPasswordlessCode: response.createdNewUser === false'
      );
      await handleLinkAccount();
    }
  };

  const handleClickReenter = () => {
    router.push({
      pathname: '/auth/login',
    });
  };

  return (
    <>
      {loadingLinkAccount ? (
        <Flex justify="center" align="center" h="100%">
          <LoaderLifestyleX />
        </Flex>
      ) : (
        <LayoutLogin>
          {pinLockout ? (
            <PinLockout payload={payload} errorMessage={pinLockoutError} />
          ) : (
            <>
              <Skeleton visible={!lounge}>
                <BackToLounge />
              </Skeleton>
              <Stack
                spacing={24}
                align="center"
                sx={{
                  height: '100%',
                  width: '440px',
                  margin: '0 auto',
                  '@media (max-width: 768px)': {
                    width: '100%',
                    padding: '1rem 1.5rem 0 1.5rem',
                  },
                }}
              >
                <Title size="26">Check your email</Title>
                <ErrorComponent error={errorLinkAccount} />
                <Text size="18px" align="center">
                  We have sent a unique code to
                  <Text weight={700}>{email}</Text>
                </Text>
                <Box sx={{ textAlign: 'center' }}>
                  <Text align="center" size={16}>
                    Wrong email?
                  </Text>
                  <Anchor
                    fw={700}
                    sx={{
                      color: colors.blue,
                      backgroundColor: 'transparent',
                      textDecoration: 'underline',
                    }}
                    onClick={handleClickReenter}
                  >
                    Re-enter your email address
                  </Anchor>
                </Box>
                <Box
                  sx={{
                    backgroundColor: colors.dividerGrey,
                    height: '1px',
                    width: '100%',
                  }}
                />
                <Box>
                  <Text fw={700} size={12}>
                    One time passcode
                  </Text>
                  <PinInput
                    onChange={(code) => setCode(code)}
                    placeholder="-"
                    length={6}
                    size="xl"
                    spacing="8px"
                    sx={{
                      padding: '0.5rem 0 0.5rem 0',
                      input: {
                        borderRadius: 8,
                        fontSize: 18,
                        fontWeight: 'bold',
                      },
                    }}
                    inputMode="numeric"
                    data-testid="pinInput"
                  />
                  {pinError && !checkingCode && (
                    <Text
                      sx={{ color: colors.errorRed }}
                      align="center"
                      size={16}
                    >
                      Perhaps the code is invalid or has expired.
                      <br />
                      Please try again
                    </Text>
                  )}
                  <Flex
                    direction="row"
                    align="center"
                    w="100%"
                    gap={16}
                    mt={8}
                    sx={{ padding: '1.5rem 0 0 0' }}
                  >
                    <Button
                      py={8}
                      fullWidth
                      variant="outline"
                      disabled={count > 0}
                      onClick={handleClickResend}
                      styles={{
                        root: {
                          border: 'solid',
                          backgroundColor: 'transparent',
                          borderColor: colors.buttonBlack,
                          borderWidth: 2,
                          color: colors.buttonBlack,
                          ':hover': {
                            backgroundColor: 'lightgray',
                          },
                        },
                        label: {
                          color: colors.buttonBlack,
                        },
                      }}
                    >
                      RESEND
                    </Button>
                    <Button
                      fullWidth
                      py={8}
                      onClick={handleClickConfirm}
                      data-testid="verify"
                      disabled={checkingCode}
                    >
                      VERIFY
                    </Button>
                  </Flex>
                </Box>
                {count > 0 && (
                  <Text size={14} fw={400} pb={10}>
                    You can resend the unique code in {count} seconds
                  </Text>
                )}
              </Stack>
            </>
          )}
        </LayoutLogin>
      )}
    </>
  );
}
