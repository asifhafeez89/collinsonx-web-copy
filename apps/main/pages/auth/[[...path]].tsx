import React, { useEffect } from 'react';
import SuperTokens, {
  consumePasswordlessCode,
} from '@collinsonx/utils/supertokens';
import LayoutLogin from '@components/LayoutLogin';
import { useRouter } from 'next/router';
import { Title, Text, Button, Flex } from '@collinsonx/design-system/core';

export default function Auth() {
  const router = useRouter();

  async function handleMagicLinkClicked() {
    try {
      const response = await consumePasswordlessCode();

      if (response.status === 'OK') {
        const { email } = response.user;

        if (response.createdNewUser) {
          // user sign up success
          router.push({ pathname: '/signup-user', query: { email } });
        } else {
          // user sign in success
          router.push('/lounge');
        }
      } else {
        // this can happen if the magic link has expired or is invalid
        window.alert('Login failed. Please try again');
        router.push('/');
      }
    } catch (err: any) {
      if (err.isSuperTokensGeneralError === true) {
        // this may be a custom error message sent from the API by you.
        window.alert(err.message);
      } else {
        window.alert('Oops! Something went wrong.');
      }
    }
  }

  // if the user visits a page that is not handled by us (like /auth/random),
  // then we redirect them back to the auth page.
  useEffect(() => {
    if (SuperTokens.canHandleRoute() === false) {
      //redirectToAuth();
      router.push('/');
    }
  }, []);

  return (
    <LayoutLogin>
      <Flex direction="column" alignItems="center" gap={24}>
        <Title w="100%">Sign Up or Log In</Title>
        <Text w="100%">Click the button below to log in on this device</Text>
        <Button onClick={handleMagicLinkClicked} w="100%">
          Continue
        </Button>
      </Flex>
    </LayoutLogin>
  );
}
