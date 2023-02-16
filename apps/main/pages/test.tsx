import {
    Stack,
    Flex,
  } from '@collinsonx/design-system/core';  
  import LayoutLogin from '../components/LayoutLogin';
  import { SessionAuth, useSessionContext } from "supertokens-auth-react/recipe/session";
  import ThirdPartyPasswordless from "supertokens-auth-react/recipe/thirdpartypasswordless";
  import { useRouter } from 'next/router';

  interface TestProps {
    loggedIn: boolean;
    userId: string;
  }

  export default function Home({loggedIn, userId}: TestProps) {
    const sessionContext = useSessionContext();
    const router = useRouter();

    
    async function logoutClicked() {
      await ThirdPartyPasswordless.signOut();
      router.push('/');
    }
    
    console.log(sessionContext);

    
    return (
      <>
          <SessionAuth>
            <div onClick={() => logoutClicked()}>Signout</div>
          </SessionAuth>
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
  