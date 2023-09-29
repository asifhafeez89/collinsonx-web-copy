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
import Error from '@components/Error';
import usePayload from 'hooks/payload';
import colors from 'ui/colour-constants';
import PinLockout from '@components/auth/PinLockout';
import linkAccount from '@collinsonx/utils/mutations/linkAccount';
import Session from 'supertokens-auth-react/recipe/session';
import BackToLounge from '@components/BackToLounge';
import getError from 'utils/getError';
import { BookingError } from '../../constants';
import { BookingQueryParams } from '@collinsonx/constants/enums';

const { ERR_MEMBERSHIP_ALREADY_CONNECTED } = BookingError;

const { bookingId } = BookingQueryParams;

export default function CheckEmail() {
  const { jwt, lounge, payload, setLinkedAccountId, setLayoutError } =
    usePayload();
  const router = useRouter();
  const email = router.query?.email as string;
  const [code, setCode] = useState<string>();

  const [pinError, setPinError] = useState(false);
  const [pinLockout, setPinLockout] = useState(false);
  const [count, setCount] = useState(20);
  const [loading, setLoading] = useState(false);

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
      } else if (response.data && response.data.linkAccount) {
        setLinkedAccountId(response.data.linkAccount.id);
        if (router.query.id) {
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
      }
    });

  const handleClickConfirm = async () => {
    setLoading(true);

    if (code?.length === 6) {
      console.log(
        `[check-code] calling supertokens consumerPasswordlessCode...`
      );
      let response = await consumePasswordlessCode({
        userInputCode: code,
      });

      if (response.status === 'OK') {
        console.log(
          `[check-code] consumerPasswordlessCode: response.status === 'OK'`
        );
        if (response.createdNewUser) {
          console.log(
            `[check-code] consumerPasswordlessCode: response.createdNewUser === true'`
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
            `[check-code] consumerPasswordlessCode: response.createdNewUser === false'`
          );
          await handleLinkAccount();
        }
      } else if (
        response.status === 'INCORRECT_USER_INPUT_CODE_ERROR' ||
        response.status === 'EXPIRED_USER_INPUT_CODE_ERROR'
      ) {
        console.log(
          `[check-code] response.status error case `,
          response.status
        );
        setPinError(true);
        setLoading(false);
      } else if (response.status === 'RESTART_FLOW_ERROR') {
        console.log(
          `[check-code] response.status error case `,
          response.status
        );
        setPinLockout(true);
        setLoading(false);
      } else {
        console.log(
          `[check-code] response.status error case `,
          response.status
        );
        // this can happen if the user tried an incorrect OTP too many times.
        window.alert('Login failed. Please try again');
      }
    } else {
      console.log(`[check-code] code.length < 6 `);
      setPinError(true);
      setLoading(false);
    }
  };

  const handleClickReenter = () => {
    router.push({
      pathname: '/auth/login',
    });
  };

  return (
    <>
      {loadingLinkAccount || loading ? (
        <Flex justify="center" align="center" h="100%">
          <LoaderLifestyleX />
        </Flex>
      ) : (
        <LayoutLogin>
          {pinLockout ? (
            <PinLockout payload={payload} />
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
                <Error error={errorLinkAccount} />
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
                  {pinError && (
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
