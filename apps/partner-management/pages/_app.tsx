import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { ComponentType, ReactElement } from 'react';
import { MantineProvider } from '@collinsonx/design-system/core';
import Head from 'next/head';
import { useApollo, ApolloProvider } from '@collinsonx/utils/apollo';
import { Analytics } from '@vercel/analytics/react';

import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';
import { frontendConfig } from 'config/frontendConfig';

import AuthWrapper from '@components/AuthWrapper';
import theme from '../theme';

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

export default function MyApp({ Component, pageProps }: Props) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  const apolloClient = useApollo(pageProps, false);
  return (
    <>
      <Head>
        <title>CollinsonX</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ApolloProvider client={apolloClient}>
        <SuperTokensWrapper>
          <AuthWrapper>
            <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
              {getLayout(<Component {...pageProps} />)}
              <Analytics />
            </MantineProvider>
          </AuthWrapper>
        </SuperTokensWrapper>
      </ApolloProvider>
    </>
  );
}
