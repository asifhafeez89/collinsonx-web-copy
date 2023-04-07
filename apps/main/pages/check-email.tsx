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
import { consumePasswordlessCode } from '@collinsonx/utils/supertokens';
import LayoutLogin from '@components/LayoutLogin';
import { AuthInput } from '@collinsonx/design-system';
import { LoginCode } from '@collinsonx/design-system/assets/graphics';
import LoaderLifestyleX from '@collinsonx/design-system/components/loaderLifestyleX';
import { useState } from 'react';
import getConsumerByEmailAddress from '@collinsonx/utils/queries/getConsumerByEmailAddress';
import { useQuery } from '@collinsonx/utils/apollo';

export default function CheckEmail() {
  const router = useRouter();
  const { email } = router.query;
  const [code, setCode] = useState<string>();

  const [loading, setLoading] = useState(false);

  const {
    loading: loadingGetConsumer,
    error,
    data,
  } = useQuery(getConsumerByEmailAddress, {
    variables: {
      emailAddress: email,
    },
  });

  const handleClickConfirm = async () => {
    setLoading(true);
    if (code?.length === 6) {
      let response = await consumePasswordlessCode({
        userInputCode: code,
      });
      if (response.status === 'OK') {
        // existing user - move to success page
        if (data?.getConsumerByEmailAddress !== null) {
          router.push('/lounge');
        } else {
          // new user - move to registration
          router.push({ pathname: '/signup-user', query: { email } });
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
          <Stack align="center" sx={{ position: 'relative', zIndex: 2 }}>
            <Stack spacing={24} align="center">
              <Title order={1} size={20}>
                Check your email
              </Title>
              {!!error && (
                <Notification color="red.7" title="An error occurred" w="100%">
                  {error.graphQLErrors.map((error, index) => (
                    <Text key={index}>{error.message}</Text>
                  ))}
                </Notification>
              )}
              <Text align="center">
                We have sent a confirmation code to {email}.
              </Text>
              <Text size={14}>
                Wrong email?{' '}
                <Button
                  variant="subtle"
                  sx={{ fontSize: '14px', height: '20px', color: 'white' }}
                  onClick={handleClickReenter}
                  compact
                >
                  Re-enter your address
                </Button>
              </Text>
              <AuthInput handleCodeChange={(code) => setCode(code)} />
              <Button
                onClick={handleClickConfirm}
                fullWidth
                sx={{
                  padding: 8,
                  height: 44,
                  borderRadius: 4,
                }}
              >
                Confirm
              </Button>
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
                backgroundColor: '#47D4B1',
                width: '55vh',
                height: '55vh',
                position: 'absolute',
                right: '-90px',
                bottom: '-60px',
                borderRadius: '50%',
              }}
            />
          </div>
        </LayoutLogin>
      )}
    </>
  );
}
