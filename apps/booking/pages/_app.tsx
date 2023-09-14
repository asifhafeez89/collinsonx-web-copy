import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { ComponentType, ReactElement } from 'react';
import Head from 'next/head';
import { frontendConfig } from '../config/frontendConfig';
import SuperTokensReact, {
  SuperTokensConfig,
  SuperTokensWrapper,
} from '@collinsonx/utils/supertokens';
import { UserProvider } from '@collinsonx/utils/lib/userContext';
import { useApollo, ApolloProvider } from '@collinsonx/utils/apolloBooking';
import SessionManager from '@components/SessionManager';
import { Analytics } from '@vercel/analytics/react';
import AuthWrapper from '@components/AuthWrapper';
import { PayloadProvider } from 'hooks/payload';
import BookingProvider from 'context/bookingContext';
import Maintenance from 'pages/maintenance';
if (typeof window !== 'undefined') {
  // we only want to call this init function on the frontend, so
  // we check typeof window !== 'undefined'
  SuperTokensReact.init(frontendConfig() as SuperTokensConfig);
}

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => JSX.Element;
  layout?: ComponentType;
};

type Props = AppProps & {
  Component: Page;
};

export default function MyApp({ Component, pageProps }: Props) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  const isMaintenanceMode =
    (process.env.NEXT_PUBLIC_MAINTENANCE_MODE as string) === 'ON';
  const apolloClient = useApollo(pageProps);
  return (
    <>
      <Head>
        <title>Booking</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <UserProvider>
        <SuperTokensWrapper>
          <ApolloProvider client={apolloClient}>
            <AuthWrapper>
              <SessionManager>
                <PayloadProvider>
                  <BookingProvider>
                    {getLayout(
                      isMaintenanceMode ? (
                        <Maintenance />
                      ) : (
                        <Component {...pageProps} />
                      )
                    )}
                  </BookingProvider>
                  <Analytics />
                </PayloadProvider>
              </SessionManager>
            </AuthWrapper>
          </ApolloProvider>
        </SuperTokensWrapper>
      </UserProvider>
    </>
  );
}
