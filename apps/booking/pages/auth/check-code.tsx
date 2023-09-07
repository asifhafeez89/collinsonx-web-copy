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
import Breadcramp from '@components/Breadcramp';
import LoaderLifestyleX from '@collinsonx/design-system/components/loaderLifestyleX';
import { useEffect, useRef, useState } from 'react';
import getConsumerByEmailAddress from '@collinsonx/utils/queries/getConsumerByEmailAddress';
import { useQuery } from '@collinsonx/utils/apollo';
import Error from '@components/Error';
import usePayload from 'hooks/payload';
import colors from 'ui/colour-constants';
import PinLockout from '@components/auth/PinLockout';

export default function CheckEmail() {
  const { jwt, loungeCode, lounge } = usePayload();
  const router = useRouter();
  const email = router.query?.email as string;
  const [code, setCode] = useState<string>();

  const [pinError, setPinError] = useState(false);
  const [pinLockout, setPinLockout] = useState(false);
  const [count, setCount] = useState(20);

  let interval = useRef<NodeJS.Timeout>();

  const {
    loading: loadingGetConsumer,
    error,
    data,
  } = useQuery(getConsumerByEmailAddress, {
    variables: {
      emailAddress: email,
    },
  });

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

  const handleClickConfirm = async () => {
    if (code?.length === 6) {
      let response = await consumePasswordlessCode({
        userInputCode: code,
      });

      if (response.status === 'OK') {
        if (response.createdNewUser) {
          router.push({
            pathname: '/auth/signup-user',
            query: { email },
          });
        } else {
          router.push({
            pathname: '/',
          });
        }
      } else if (
        response.status === 'INCORRECT_USER_INPUT_CODE_ERROR' ||
        response.status === 'EXPIRED_USER_INPUT_CODE_ERROR'
      ) {
        setPinError(true);
      } else if (response.status === 'RESTART_FLOW_ERROR') {
        setPinLockout(true);
      } else {
        // this can happen if the user tried an incorrect OTP too many times.
        window.alert('Login failed. Please try again');
      }
    } else {
      setPinError(true);
    }
  };

  const handleClickReenter = () => {
    router.push({
      pathname: '/auth/login',
    });
  };

  return (
    <>
      {loadingGetConsumer ? (
        <Flex justify="center" align="center" h="100%">
          <LoaderLifestyleX />
        </Flex>
      ) : (
        <LayoutLogin>
          {pinLockout ? (
            <PinLockout />
          ) : (
            <>
              <Skeleton visible={!lounge}>
                <Breadcramp
                  lefttitle={lounge?.loungeName || 'Back to lounge'}
                  lefturl="#"
                />
              </Skeleton>
              <Stack
                spacing={24}
                align="center"
                sx={{
                  height: '100%',
                  width: '440px',
                  margin: '0 auto',
                  '@media (max-width: 40em)': {
                    width: '100%',
                    padding: '1rem 1.5rem 0 1.5rem',
                  },
                }}
              >
                <Title size="26">Check your email</Title>
                <Error error={error} />
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
                  />
                  {pinError && (
                    <Text
                      sx={{ color: colors.errorRed }}
                      align="center"
                      size={16}
                    >
                      Perhaps a code is invalid or has expired.
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
