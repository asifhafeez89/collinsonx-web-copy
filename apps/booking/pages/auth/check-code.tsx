import {
  Button,
  Stack,
  Text,
  Box,
  Flex,
  PinInput,
} from '@collinsonx/design-system/core';
import { useRouter } from 'next/router';
import {
  consumePasswordlessCode,
  createPasswordlessCode,
} from '@collinsonx/utils/supertokens';
import LayoutLogin from '@components/LayoutLogin';
import { Breadcramp } from '@collinsonx/design-system';
import LoaderLifestyleX from '@collinsonx/design-system/components/loaderLifestyleX';
import { useEffect, useRef, useState } from 'react';
import getConsumerByEmailAddress from '@collinsonx/utils/queries/getConsumerByEmailAddress';
import { useQuery } from '@collinsonx/utils/apollo';
import Error from '@components/Error';
import usePayload from 'hooks/payload';
import useBreakpoint from 'hooks/useBreakpoint';

export default function CheckEmail() {
  const { token, payload, setPayload } = usePayload();
  const router = useRouter();
  const email = router.query?.email as string;
  const mobileBreakpoint = useBreakpoint();
  const [code, setCode] = useState<string>();

  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    if (code?.length === 6) {
      let response = await consumePasswordlessCode({
        userInputCode: code,
      });
      if (response.status === 'OK') {
        router.push({ pathname: '/check-availability', query: { in: token } });
      } else if (response.status === 'INCORRECT_USER_INPUT_CODE_ERROR') {
        setLoading(false);
        // the user entered an invalid OTP
        window.alert(
          'Wrong OTP! Please try again. Number of attempts left: ' +
            (response.maximumCodeInputAttempts -
              response.failedCodeInputAttemptCount)
        );
      } else if (response.status === 'EXPIRED_USER_INPUT_CODE_ERROR') {
        setLoading(false);
        // it can come here if the entered OTP was correct, but has expired because
        // it was generated too long ago.
        window.alert(
          'Old OTP entered. Please regenerate a new one and try again'
        );
      } else {
        setLoading(false);
        // this can happen if the user tried an incorrect OTP too many times.
        window.alert('Login failed. Please try again');
      }
    }
  };

  const handleClickReenter = () => {
    router.push({ pathname: '/', query: { in: token } });
  };

  return (
    <>
      {loading || loadingGetConsumer ? (
        <Flex justify="center" align="center" h="100%">
          <LoaderLifestyleX />
        </Flex>
      ) : (
        <LayoutLogin>
            <Breadcramp title="Check your email" url='#' />
            <Stack
              spacing={24}
              align="center"
              sx={{
                height: '100%',
                width: '440px',
                margin: '0 auto',
                '@media (max-width: 40em)': {
                  width: '100%',
                  padding: '16px 24px 0 24px',
                },
              }}
            >
              <Error error={error} />
              <Text
                size='18px'
                sx={{
                  textAlign: 'center',
                  '@media (max-width: 40em)': {
                    textAlign: 'left',
                  },
                }}
                >
                Enter the passcode we’ve sent by email to {email}
              </Text>
              {!mobileBreakpoint && (
                <Box>
                  <Text align="center" size={14}>
                    Wrong email?
                  </Text>
                  <Button
                    variant="subtle"
                    fw={400}
                    sx={{
                      fontSize: '14px',
                      height: '20px',
                      color: '#20C997',
                      textDecoration: 'underline',
                    }}
                    onClick={handleClickReenter}
                    compact
                  >
                    Re-enter your address
                  </Button>
                </Box>
              )}
              {!mobileBreakpoint && (
                <Box
                  my={16}
                  sx={{
                    backgroundColor: '#C8C9CA',
                    height: '1px',
                    width: '100%',
                  }}
                />
              )}
              <Box mx={-0.5}>
                <Text sx={{ padding: '0 0 0.5rem 0' }}>
                  <Text span color='#fa5252'>*</Text>One time passcode
                </Text>
                <PinInput
                  onChange={(code) => setCode(code)}
                  placeholder='-'
                  length={6}
                  oneTimeCode
                  size='xl'
                  spacing='8px'
                  sx={{
                    input: {
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }
                  }}
                  inputMode='numeric'
                />
              </Box>
              {mobileBreakpoint && (
                <Text
                  size={14}
                  fw={400}
                  sx={{ width: '100%', textAlign: 'left' }}
                >
                  Didn't receieve a code? <Text component='a' href='#' onClick={handleClickResend} color='#6D4BF6'>Send again</Text>
                </Text>
              )}
              <Flex direction="row" align="center" w="100%" gap={16} mt={8}>
                {!mobileBreakpoint && (
                  <Button
                    py={8}
                    fullWidth
                    variant="outline"
                    disabled={count > 0}
                    onClick={handleClickResend}
                    sx={{
                      borderColor: '#2C2C2C',
                      color: '#2C2C2C',
                    }}
                  >
                    Resend
                  </Button>
                )}
                <Button
                  fullWidth
                  py={8}
                  onClick={handleClickConfirm}
                  sx={{
                    borderRadius: 4,
                  }}
                  data-testid="verify"
                >
                  Verify
                </Button>
              </Flex>
                {!mobileBreakpoint && count > 0 && (
                    <Text size={14} fw={400} align='center'>
                    You can resend the unique code in {count} seconds
                  </Text>
                )}
            </Stack>
        </LayoutLogin>
      )}
    </>
  );
}
