import {
    Stack,
    Flex,
  } from '@collinsonx/design-system/core';  
  import Layout from '../components/Layout';
  import { SessionAuth, useSessionContext } from "supertokens-auth-react/recipe/session";
  import { signOut } from "supertokens-auth-react/recipe/emailpassword";
  import { useRouter } from 'next/router';

  interface TestProps {
    loggedIn: boolean;
    userId: string;
  }

  export default function Home({loggedIn, userId}: TestProps) {
    const sessionContext = useSessionContext();
    const router = useRouter();

    async function logoutClicked() {
      await signOut();
      router.push('/');
    }
    
    return (
      <>
          <SessionAuth>
            Test
          </SessionAuth>
      </>
    );
  }

    
  Home.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
  