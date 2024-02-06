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
import PinLockout from '@components/auth/PinLockout';
import linkAccount from '@collinsonx/utils/mutations/linkAccount';
import Session from 'supertokens-auth-react/recipe/session';
import TopBarLinks from '@components/TopBarLinks';
import getError from 'utils/getError';
import { ANALYTICS_TAGS, BookingError, PATH_NAME } from '../../constants';
import { BookingQueryParams } from '@collinsonx/constants/enums';
import { PinLockoutError } from '@collinsonx/constants/constants';
import { getConsumerByID } from '@collinsonx/utils/queries';
import { LinkedAccount } from '@collinsonx/utils/generatedTypes/graphql';
import {
  accountIsEqual,
  consumerIsValid,
  log,
  logAction,
  logDataError,
} from '../../lib/index';
import useLocale from 'hooks/useLocale';
import { getItem } from '@lib';

import classes from '../../styles/CheckCode.module.css';
import updateConsumer from '@collinsonx/utils/mutations/updateConsumer';

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
    locale,
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
  const [updateConsumerCall] = useMutation(updateConsumer);

  const translations = useLocale();

  useEffect(() => {
    logAction(pageName, ANALYTICS_TAGS.ON_CHECK_CODE_ENTER);
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

      const { pathname } = JSON.parse(getItem(PATH_NAME) as string);

      if (pathname === '/amend-booking' || pathname === '/cancel-booking') {
        router.push({
          pathname,
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
        logDataError(tokenError, 'checkcode', 'token error', jwt);
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

    logAction(pageName, ANALYTICS_TAGS.ON_CHECK_CODE_VERIFY);

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

      if (locale !== consumer.locale) {
        updateConsumerCall({
          variables: {
            consumerInput: {
              emailAddress: consumer.emailAddress,
              locale,
            },
          },
        });
      }

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
    logAction(pageName, ANALYTICS_TAGS.ON_CHECK_CODE_CHANGE);
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
              <Stack gap={24} align="center" className={classes.container}>
                <Title size="26">{translations.auth.checkCode.title}</Title>
                <ErrorComponent error={errorLinkAccount} />
                <Text size="18px" className={classes.center}>
                  {translations.auth.checkCode.description}
                  <Text w={700} component="span">
                    {email.length < 30
                      ? email
                      : `${email.substring(0, 30)} ...`}
                  </Text>
                </Text>
                <Box className={classes.center}>
                  <Text className={classes.center} size="md">
                    {translations.auth.checkCode.wrongEmailTitle}
                  </Text>
                  <Anchor
                    fw={700}
                    className={classes.reenter}
                    onClick={handleClickReenter}
                  >
                    {translations.auth.checkCode.reEnterEmailLabel}
                  </Anchor>
                </Box>
                <Box className={classes.divider} />
                <Box>
                  <Text fw={700} size="xs">
                    {translations.auth.checkCode.passcodeSubtitle}
                  </Text>
                  <PinInput
                    onChange={handleChange}
                    placeholder="-"
                    length={6}
                    size="xl"
                    gap="8px"
                    className={classes.pinInput}
                    inputMode="numeric"
                    data-testid="pinInput"
                  />
                  {pinError && !checkingCode && (
                    <Text className={classes.wrongCode} size="md">
                      {translations.auth.checkCode.error.wrongCode}
                    </Text>
                  )}
                  <Flex
                    direction="row"
                    align="center"
                    w="100%"
                    gap={16}
                    mt={8}
                    style={{ padding: '1.5rem 0 0 0' }}
                  >
                    <Button
                      py={8}
                      fullWidth
                      variant="outline"
                      disabled={count > 0}
                      onClick={handleClickResend}
                      data-testid="resend"
                      classNames={{
                        root: classes.buttonRoot,
                        label: classes.buttonLabel,
                      }}
                    >
                      {translations.auth.checkCode.btn.resend}
                    </Button>
                    <Button
                      fullWidth
                      py={8}
                      onClick={handleClickConfirm}
                      data-testid="verify"
                      disabled={checkingCode}
                    >
                      {translations.auth.checkCode.btn.verify}
                    </Button>
                  </Flex>
                </Box>
                {count > 0 && (
                  <Text size="sm" fw={400} pb={10}>
                    {translations.auth.checkCode.uniqueCodeText(count)}
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
