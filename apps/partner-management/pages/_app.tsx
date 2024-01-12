import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { ReactElement, useState, useEffect, ReactNode } from 'react';
import { MantineProvider } from '@collinsonx/design-system/core';
import Head from 'next/head';
import { useApollo, ApolloProvider } from '@collinsonx/utils/apollo';
import { Analytics } from '@vercel/analytics/react';
import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';
import { frontendConfig } from 'config/frontendConfig';
import { datadogRum } from '@datadog/browser-rum';

import AuthWrapper from '@components/AuthWrapper';
import { ExperienceProvider } from 'hooks/experience';
import CookieBanner from '@components/CookieBanner';
import parnerTheme, {
  resolver,
} from '@collinsonx/design-system/themes/partnerTheme';

import getConfig from 'next/config';

import '../node_modules/@collinsonx/design-system/dist/assets/dates.styles.css';
import '../node_modules/@collinsonx/design-system/dist/assets/styles.css';
import '../globalStyles.css';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const theme = parnerTheme({ fontFamily: 'Be Vietnam Pro' });

if (typeof window !== 'undefined') {
  // we only want to call this init function on the frontend, so
  // we check typeof window !== 'undefined'
  SuperTokens.init(frontendConfig());
}

const { publicRuntimeConfig } = getConfig();
const version = publicRuntimeConfig?.version;

// Set in Vercel this variable for any environments that need monitoring. Prod and probably UAT
const datadogenv: string | undefined = process.env.NEXT_PUBLIC_DATADOG_ENV;
if ((datadogenv?.length ?? 0) > 0) {
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

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  const [envLabel, setEnvLabel] = useState<String>('');

  useEffect(() => {
    console.log('App::version ', version);
    if (window.location.href.includes('https://partner.uat.cergea.com/')) {
      setEnvLabel('uat');
    }

    if (window.location.href.includes('https://partner.test.cergea.com/')) {
      setEnvLabel('test');
    }

    if (window.location.href.includes('http://localhost:3010/')) {
      setEnvLabel('dev');
    }
  }, []);

  const apolloClient = useApollo(pageProps);

  return (
    <MantineProvider theme={theme} cssVariablesResolver={resolver}>
      <Head>
        <title>Cergea</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <SuperTokensWrapper>
          <AuthWrapper>
            <ExperienceProvider>
              {envLabel !== '' && (
                <div
                  style={{
                    position: 'fixed',
                    background: 'yellow',
                    top: '60px',
                    zIndex: 999,
                  }}
                >
                  {envLabel}
                </div>
              )}
              {getLayout(<Component {...pageProps} />)}
              <CookieBanner />
              <Analytics />
            </ExperienceProvider>
          </AuthWrapper>
        </SuperTokensWrapper>
      </ApolloProvider>
    </MantineProvider>
  );
}
