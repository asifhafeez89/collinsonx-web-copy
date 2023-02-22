import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import SuperTokens, { redirectToAuth } from '@collinsonx/utils/supertokens';

const SuperTokensComponentNoSSR = dynamic<
  React.ComponentProps<typeof SuperTokens.getRoutingComponent>
>(new Promise((res) => res(SuperTokens.getRoutingComponent)), { ssr: false });

export default function Auth() {
  // if the user visits a page that is not handled by us (like /auth/random),
  // then we redirect them back to the auth page.
  useEffect(() => {
    if (SuperTokens.canHandleRoute() === false) {
      redirectToAuth();
    }
  }, []);

  return <SuperTokensComponentNoSSR />;
}
