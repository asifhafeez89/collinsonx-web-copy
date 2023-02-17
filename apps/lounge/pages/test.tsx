import LayoutLogin from '../components/Layout';
import { doesSessionExist, useSessionContext, getUserId } from "supertokens-auth-react/recipe/session";
import ThirdPartyPasswordless from "supertokens-auth-react/recipe/thirdpartypasswordless";
import { useRouter } from 'next/router';
import { useEffect, useId } from 'react';

interface TestProps {
  loggedIn: boolean;
  userId: string;
}

export default function Home({loggedIn}: TestProps) {
  useEffect(() => {
   init();
  }, [])
  
  async function init() {
    const userId = await getUserId();
    const sessionState = await doesSessionExist();

  }

  async function logoutClicked() {
    await ThirdPartyPasswordless.signOut();
  }
  

  return (
    <>
    fff<div onClick={() => logoutClicked()}>Signout</div>
        {/* { && <div>
          <div onClick={() => logoutClicked()}>Signout</div>
        </div>} */}
    </>
  );
}

Home.getLayout = (page: JSX.Element) => <LayoutLogin>{page}</LayoutLogin>;
