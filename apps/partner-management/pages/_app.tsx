import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { ComponentType, ReactElement, useState, useEffect } from 'react';
import { MantineProvider } from '@collinsonx/design-system/core';
import Head from 'next/head';
import { useApollo, ApolloProvider } from '@collinsonx/utils/apollo';
import { Analytics } from '@vercel/analytics/react';
import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';
import { frontendConfig } from 'config/frontendConfig';
import { datadogRum } from '@datadog/browser-rum';
import { version } from '../package.json';

import AuthWrapper from '@components/AuthWrapper';
import theme from '../theme';
import { ExperienceProvider } from 'hooks/experience';
import CookieBanner from '@components/CookieBanner';

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => JSX.Element;
  layout?: ComponentType;
};

type Props = AppProps & {
  Component: Page;
};

if (typeof window !== 'undefined') {
  // we only want to call this init function on the frontend, so
  // we check typeof window !== 'undefined'
  SuperTokens.init(frontendConfig());
}

// Set in Vercel this variable for any environments that need monitoring. Prod and probably UAT
const datadogenv: string | undefined = process.env.NEXT_PUBLIC_DATADOG_ENV;
if ((datadogenv?.length ?? 0) > 0) {
  datadogRum.init({
    applicationId: process.env.NEXT_PUBLIC_DATADOG_APP_ID,
    clientToken: process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN,
    site: process.env.NEXT_PUBLIC_DATADOG_SITE,
    service: process.env.NEXT_PUBLIC_DATADOG_SERVICE,
    env: process.env.NEXT_PUBLIC_DATADOG_ENV,
    version,
    sessionSampleRate: 100,
    sessionReplaySampleRate: 100,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: 'mask-user-input',
  });
  datadogRum.startSessionReplayRecording();
}

export default function MyApp({ Component, pageProps }: Props) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  const [envLabel, setEnvLabel] = useState<String>('');

  useEffect(() => {
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
    <>
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
              <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
                {envLabel !== '' && (
                  <div
                    style={{
                      position: 'fixed',
                      background: 'yellow',
                      zIndex: 999,
                    }}
                  >
                    {envLabel}
                  </div>
                )}
                {getLayout(<Component {...pageProps} />)}
                <CookieBanner />
                <Analytics />
              </MantineProvider>
            </ExperienceProvider>
          </AuthWrapper>
        </SuperTokensWrapper>
      </ApolloProvider>
    </>
  );
}
