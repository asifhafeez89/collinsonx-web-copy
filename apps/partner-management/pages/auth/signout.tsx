import LayoutLogin from '@components/LayoutLogin';
import { useEffect } from 'react';

import Session from 'supertokens-auth-react/recipe/session';

export default function Signout() {
  async function logout() {
    await Session.signOut();
    window.location.href = '/';
  }

  useEffect(() => {
    logout();
  }, []);

  return <></>;
}

Signout.getLayout = (page: JSX.Element) => <LayoutLogin>{page}</LayoutLogin>;
