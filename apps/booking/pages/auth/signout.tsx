import { Flex } from '@collinsonx/design-system/core';
import LayoutLogin from '@components/LayoutLogin';
import usePayload from 'hooks/payload';
import { useEffect } from 'react';

import Session from 'supertokens-auth-react/recipe/session';

async function logout(token?: string) {
  await Session.signOut();
  window.location.href = '/auth/login/?in=' + token;
}

export default function Signout() {
  const { token } = usePayload();
  useEffect(() => {
    logout(token);
  }, [token]);

  return (
    <Flex
      justify="center"
      align="center"
      h="100%"
      w="100%"
      style={{ position: 'absolute', top: 0, bottom: 0 }}
    ></Flex>
  );
}

Signout.getLayout = (page: JSX.Element) => <LayoutLogin>{page}</LayoutLogin>;
