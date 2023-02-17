import {
    Stack,
    Flex,
  } from '@collinsonx/design-system/core';  
  import LayoutLogin from '../components/LayoutLogin';
  import { doesSessionExist, useSessionContext, getUserId } from "supertokens-auth-react/recipe/session";
  import {signOut} from "supertokens-auth-react/recipe/session";
  import ThirdPartyPasswordless from "supertokens-auth-react/recipe/thirdpartypasswordless";
  import { useRouter } from 'next/router';
import { useEffect, useId } from 'react';

  interface TestProps {
    loggedIn: boolean;
    userId: string;
  }

  export default function Home({loggedIn}: TestProps) {
    const sessionContext = useSessionContext();
    const router = useRouter();

    useEffect(() => {
     init();
    }, [])
    
    async function init() {
      const userId = await getUserId();
      const sessionState = await doesSessionExist();
      console.log('u', userId);
      console.log('s', sessionState);
    }

    async function logoutClicked() {
      await ThirdPartyPasswordless.signOut();
    }
    
    console.log();

    
    return (
      <>
      fff<div onClick={() => logoutClicked()}>Signout</div>
          {/* { && <div>
            <div onClick={() => logoutClicked()}>Signout</div>
          </div>} */}
      </>
    );
  }


  // export async function getServerSideProps(context: { req: any; res: any; }) {
  //   // this runs on the backend, so we must call init on supertokens-node SDK
  //   const isLoggedIn = await doesSessionExist();
  //   const userId = await getUserId();

  //   return {
  //     props: {
  //       userId: userId, 
  //       loggedIn: isLoggedIn
  //     },
  //   }
  // }
  
  
  Home.getLayout = (page: JSX.Element) => <LayoutLogin>{page}</LayoutLogin>;
  