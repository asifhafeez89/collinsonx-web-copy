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
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLazyQuery, useMutation } from '@collinsonx/utils/apollo';
import { default as ErrorComponent } from '@components/Error';
import usePayload from 'hooks/payload';
import colors from 'ui/colour-constants';
import PinLockout from '@components/auth/PinLockout';
import linkAccount from '@collinsonx/utils/mutations/linkAccount';
import Session from 'supertokens-auth-react/recipe/session';
import TopBarLinks from '@components/TopBarLinks';
import getError from 'utils/getError';
import { ANALYTICS_TAGS, BookingError } from '../../constants';
import { BookingQueryParams } from '@collinsonx/constants/enums';
import { PinLockoutError } from '@collinsonx/constants/constants';
import { getConsumerByID } from '@collinsonx/utils/queries';
import { LinkedAccount } from '@collinsonx/utils/generatedTypes/graphql';
import {
  accountIsEqual,
  consumerIsValid,
  log,
  loggerAction,
  loggerDataError,
} from '../../lib/index';
import { datadogLogs } from '@datadog/browser-logs';

const { ERR_MEMBERSHIP_ALREADY_CONNECTED, ERR_TOKEN_INVALID_OR_EXPIRED } =
  BookingError;
const { tooManyAttempts, expiredJwt } = PinLockoutError;
const { bookingId } = BookingQueryParams;

export default function CheckEmail() {
  const {
    jwt,
    lounge,
    payload,
    setLinkedAccountId,
    setLayoutError,
    setConsumerData,
    setTokenError,
    platform,
  } = usePayload();
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
  const pageName = 'Email_Code';

  const [fetchConsumer] = useLazyQuery(getConsumerByID);

  useEffect(() => {
    loggerAction(pageName, ANALYTICS_TAGS.ON_CHECK_CODE_ENTER);
  }, []);

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

  const findLinkedAccount = useCallback(
    (linkedAccounts: LinkedAccount[] = []) => {
      return linkedAccounts.find(accountIsEqual(payload));
    },
    [payload]
  );

  const handleClickResend = () => {
    try {
      createPasswordlessCode({
        email,
        userContext: {
          accountProvider: payload?.accountProvider,
        },
      });
    } catch (e) {}
    setCount(20);
  };

  const redirect = useCallback(
    (newUser?: boolean) => {
      if (newUser) {
        return router.push({
          pathname: '/auth/signup-user',
          query: {
            email,
            [bookingId]: router.query[bookingId] || '',
          },
        });
      }
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
    },
    [router]
  );

  const handleLinkAccount = (isUserNew: boolean) =>
    dolinkAccount({
      variables: {
        linkedAccountInput: {
          token: jwt,
          analytics: { email },
        },
      },
    }).then((response) => {
      const alreadyConnectedError = getError(
        response,
        ERR_MEMBERSHIP_ALREADY_CONNECTED
      );
      const tokenError = getError(response, ERR_TOKEN_INVALID_OR_EXPIRED);

      if (tokenError) {
        setTokenError('Sorry, service is not available');
        loggerDataError(tokenError, 'checkcode', 'token error', jwt);
      } else if (alreadyConnectedError) {
        log('[SIGN OUT]: membership already connected');
        return Session.signOut().then(() => {
          setLayoutError(ERR_MEMBERSHIP_ALREADY_CONNECTED);
          router.push({
            pathname: '/auth/login',
          });
        });
      }

      // only redirect if there are no errors
      if (response.data && response.data.linkAccount && !response.errors) {
        setLinkedAccountId(response.data.linkAccount.id);
        redirect(isUserNew);
      }
    });

  const handleClickConfirm = async () => {
    setCheckingCode(true);

    loggerAction(pageName, ANALYTICS_TAGS.ON_CHECK_CODE_VERIFY);

    if (!code || code.length !== 6) {
      setPinError(true);
      setCheckingCode(false);
      return;
    }

    let response = await consumePasswordlessCode({
      userInputCode: code,
    });
    log('[check-code] calling supertokens consumerPasswordlessCode...');

    if (
      response.status === 'INCORRECT_USER_INPUT_CODE_ERROR' ||
      response.status === 'EXPIRED_USER_INPUT_CODE_ERROR'
    ) {
      log('[check-code] response.status error case ', response.status);
      setPinError(true);
      setCheckingCode(false);
      setPinAttemptCount(response.failedCodeInputAttemptCount);
      return;
    }

    if (response.status === 'RESTART_FLOW_ERROR') {
      log('[check-code] response.status error case ', response.status);
      setPinLockoutError(pinAttemptCount === 4 ? tooManyAttempts : expiredJwt);
      setPinLockout(true);
      setCheckingCode(false);
      return;
    }

    if (response.status !== 'OK') {
      log('[check-code] response.status error case ', response.status);
      return window.alert('Login failed. Please try again');
    }
    if (response.createdNewUser) {
      log(
        '[check-code] consumerPasswordlessCode: response.createdNewUser === true'
      );
    } else {
      log(
        '[check-code] consumerPasswordlessCode: response.createdNewUser === false'
      );
    }

    const userId = response.user.id;
    log('[check-code] fetchConsumer ID: ', userId);
    fetchConsumer({
      variables: {
        getConsumerById: userId,
      },
    }).then(({ data }) => {
      log(
        '[check-code] fetchConsumer response: ',
        JSON.stringify(data || null)
      );
      const consumer = data.getConsumerByID || {};
      const { linkedAccounts } = consumer;
      const matchedAccount = findLinkedAccount(linkedAccounts || []);

      const isUserNew = !consumerIsValid(consumer);

      setConsumerData(data);
      if (!matchedAccount) {
        handleLinkAccount(isUserNew);
      } else {
        setLinkedAccountId(matchedAccount.id);
        redirect(isUserNew);
      }
    });
  };

  const handleClickReenter = () => {
    router.push({
      pathname: '/auth/login',
      query: {
        [bookingId]: router.query[bookingId] || '',
      },
    });
  };

  const handleChange = (code: string) => {
    setCode(code);
    loggerAction(pageName, ANALYTICS_TAGS.ON_CHECK_CODE_CHANGE);
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
                <TopBarLinks page={pageName} />
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
                  <Text weight={700}>
                    {email.length < 30
                      ? email
                      : `${email.substring(0, 30)} ...`}
                  </Text>
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
                    onChange={handleChange}
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
                      Passcode may be incorrect or expired.
                      <br />
                      Please try again.
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
