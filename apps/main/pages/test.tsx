import { useRouter } from 'next/router';
import { Title, Stack, Flex } from '@collinsonx/design-system/core';
import { Button, Card } from '@collinsonx/design-system';
import { Filter } from '@collinsonx/design-system/assets/icons';
import LayoutLogin from '../components/LayoutLogin';
import { LoungeData } from '@collinsonx/utils/types/lounge';
import { SessionAuth, useSessionContext } from 'supertokens-auth-react/recipe/session';
import PasswordlessReact from 'supertokens-auth-react/recipe/passwordless';
import supertokensNode from 'supertokens-node';
import { backendConfig } from '../config/backendConfig';
import { redirectToAuth } from 'supertokens-auth-react'
import Session from 'supertokens-node/recipe/session';

export default function Test( props: any ) {
  const router = useRouter();


  async function logoutClicked() {
    await PasswordlessReact.signOut()
    redirectToAuth()
  }
  
  return (
    <SessionAuth>
        <Stack align="stretch" sx={{ position: 'relative' }}>
        <Stack spacing={24} align="stretch">
            <Title order={1} size={20} align="center">
            Ready for your next experience?
            </Title>

            
            <Button
            handleClick={logoutClicked}
            icon={<Filter />}
            variant="outline"
            fullWidth
            color="dark"
            >
            Logout
            </Button>
        </Stack>
        <Flex mt={10} align="stretch" direction="column">
            TESTTTT<span>{props.usedId}</span>
        </Flex>
        </Stack>
    </SessionAuth>
  );
}
export async function getServerSideProps(context: { req: any; res: any; }) {
    // this runs on the backend, so we must call init on supertokens-node SDK
    let session;
    
    supertokensNode.init(backendConfig())

    try {
      session = await Session.getSession(context.req, context.res, {
        overrideGlobalClaimValidators: async function () {
          return []
        },
      })
    } catch (err) {
        //   if (err.type === Session.Error.TRY_REFRESH_TOKEN) {
        //     return { props: { fromSupertokens: 'needs-refresh' } }
        //   } else if (err.type === Session.Error.UNAUTHORISED) {
        //     // this will force the frontend to try and refresh which will fail
        //     // clearing all cookies and redirecting the user to the login screen.
        //     return { props: { fromSupertokens: 'needs-refresh' } }
        //   }
        //   throw err
        console.log(err);
    }

    console.log("userid", session?.getUserId());
  
    return {
      props: { userId: session?.getUserId() },
    }
  }

  Test.getLayout = (page: JSX.Element) => <LayoutLogin>{page}</LayoutLogin>;
