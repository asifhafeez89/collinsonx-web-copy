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
import AuthWrapper from '@components/AuthWrapper';
import { PayloadProvider } from 'hooks/payload';
import BookingProvider from 'context/bookingContext';
import { datadogRum } from '@datadog/browser-rum';
import getConfig from 'next/config';
import Maintenance from 'pages/maintenance';

import '../styles.css';
import { datadogLogs } from '@datadog/browser-logs';
import { loggerInfo } from '@lib';

if (typeof window !== 'undefined') {
  // we only want to call this init function on the frontend, so
  // we check typeof window !== 'undefined'
<<<<<<< HEAD
=======

  const isInIframe = window.parent === window ? false : true;

  SuperTokensReact.init(frontendConfig({ isInIframe }) as SuperTokensConfig);
}
>>>>>>> effcc4ad (feat: enable isInIframe for mobile environment only)

  const windowObj: any = window;
  windowObj.navigation.addEventListener('navigate', (event: any) => {
    loggerInfo('_app.tsx', 'url change', event.destination.url);
  });

  const isMobile = windowObj.webkit || windowObj.Android;

  SuperTokensReact.init(
    frontendConfig({ isInIframe: !isMobile }) as SuperTokensConfig
  );
}
const { publicRuntimeConfig } = getConfig();
const version = publicRuntimeConfig?.version;

// Set in Vercel this variable for any environments that need monitoring. Prod and probably UAT
const datadogenv: string | undefined = process.env.NEXT_PUBLIC_DATADOG_ENV;
if ((datadogenv?.length ?? 0) > 0) {
  datadogLogs.init({
    clientToken: process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN ?? '',
    site: process.env.NEXT_PUBLIC_DATADOG_SITE ?? '',
    service: process.env.NEXT_PUBLIC_DATADOG_SERVICE ?? '',
    forwardErrorsToLogs: true,
    sessionSampleRate: 100,
  });

  datadogRum.init({
    applicationId: process.env.NEXT_PUBLIC_DATADOG_APP_ID ?? '',
    clientToken: process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN ?? '',
    site: process.env.NEXT_PUBLIC_DATADOG_SITE ?? '',
    service: process.env.NEXT_PUBLIC_DATADOG_SERVICE ?? '',
    env: process.env.NEXT_PUBLIC_DATADOG_ENV ?? '',
    version: version ?? 'n/a',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 100,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: 'mask-user-input',
  });
  datadogRum.startSessionReplayRecording();
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <UserProvider>
        <SuperTokensWrapper>
          <ApolloProvider client={apolloClient}>
            <AuthWrapper>
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
              </PayloadProvider>
            </AuthWrapper>
          </ApolloProvider>
        </SuperTokensWrapper>
      </UserProvider>
    </>
  );
}
