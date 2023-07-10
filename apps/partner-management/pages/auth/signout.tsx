import LoaderLifestyleX from '@collinsonx/design-system/components/loaderLifestyleX';
import { Flex } from '@collinsonx/design-system/core';
import LayoutLogin from '@components/LayoutLogin';
import { useEffect } from 'react';

import Session from 'supertokens-auth-react/recipe/session';

import { PARTNER_ID, SELECTED_LOUNGE, USER_TYPE, USER_META } from 'config';
import { removeItem } from '@collinsonx/utils/lib';

const clearSessionStorage = () => {
  if (typeof window !== undefined) {
    removeItem(PARTNER_ID);
    removeItem(SELECTED_LOUNGE);
    removeItem(USER_TYPE);
    removeItem(USER_META);
  }
};

async function logout() {
  await Session.signOut();
  clearSessionStorage();
  window.location.href = '/';
}

export default function Signout() {
  useEffect(() => {
    logout();
  }, []);

  return (
    <Flex
      justify="center"
      align="center"
      h="100%"
      w="100%"
      style={{ position: 'absolute', top: 0, bottom: 0 }}
    >
      <LoaderLifestyleX />
    </Flex>
  );
}

Signout.getLayout = (page: JSX.Element) => <LayoutLogin>{page}</LayoutLogin>;
