import {
  Button,
  Title,
  Stack,
  Text,
  Box,
  Flex,
  Notification,
} from '@collinsonx/design-system/core';
import { useRouter } from 'next/router';
import {
  consumePasswordlessCode,
  createPasswordlessCode,
} from '@collinsonx/utils/supertokens';
import LayoutLogin from '@components/LayoutLogin';
import { AuthInput } from '@collinsonx/design-system';
import { LoginCode } from '@collinsonx/design-system/assets/graphics';
import LoaderLifestyleX from '@collinsonx/design-system/components/loaderLifestyleX';
import { useEffect, useRef, useState } from 'react';
import getConsumerByEmailAddress from '@collinsonx/utils/queries/getConsumerByEmailAddress';
import { useQuery } from '@collinsonx/utils/apollo';
import Error from '@components/Error';

export default function CheckEmail() {
  const router = useRouter();
  const email = router.query?.email as string;
  const redirectUrl = router.query?.redirectUrl as string;

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
        if (redirectUrl) {
          router.push(redirectUrl);
        } else {
          router.push('/booking');
        }

        // TODO add userId in apollo context
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
    router.push('/');
  };

  return (
    <>
      {loading || loadingGetConsumer ? (
        <Flex justify="center" align="center" h="100%">
          <LoaderLifestyleX />
        </Flex>
      ) : (
        <LayoutLogin>
          <Stack px={8} align="center" sx={{ position: 'relative', zIndex: 2 }}>
            <Stack spacing={24} align="center">
              <Title order={1} size={20}>
                Check your email
              </Title>
              <Error error={error} />
              <Text align="center">
                We have sent a confirmation code to {email}.
              </Text>
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
              <Box
                my={16}
                sx={{
                  backgroundColor: '#445C75',
                  height: '1px',
                  width: '100%',
                }}
              />
              <Box mx={-0.5}>
                <AuthInput handleCodeChange={(code) => setCode(code)} />
              </Box>
              <Flex direction="row" align="center" w="100%" gap={16} mt={8}>
                <Button
                  py={8}
                  fullWidth
                  variant="outline"
                  disabled={count > 0}
                  onClick={handleClickResend}
                  sx={{ borderColor: 'white', color: 'white' }}
                >
                  Resend
                </Button>
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
              {count > 0 && (
                <Text size={14} fw={400}>
                  You can resend the unique code in {count} seconds
                </Text>
              )}
            </Stack>
            <Flex mt={58} align="center" direction="column">
              <Box
                sx={{
                  width: '100%',
                  maxWidth: '342px',
                  maxHeight: '304px',
                }}
              >
                <LoginCode />
              </Box>
            </Flex>
          </Stack>
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              overflow: 'hidden',
              width: '100%',
              height: '50%',
            }}
          >
            <div
              style={{
                background:
                  'linear-gradient(180deg, #182E45 0%, #112132 28.78%)',
                height: '55vh',
                width: 'auto',
                maxWidth: '500px',
                position: 'absolute',
                marginLeft: 'auto',
                marginRight: 'auto',
                left: 0,
                right: 0,
                bottom: '-270px',
                borderRadius: '50%',
              }}
            />
          </div>
        </LayoutLogin>
      )}
    </>
  );
}
