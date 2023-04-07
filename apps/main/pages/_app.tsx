import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { ComponentType, ReactElement, useEffect, useState } from 'react';
import { MantineProvider } from '@collinsonx/design-system/core';
import Head from 'next/head';
import Client from '@collinsonx/utils/provider';
import { frontendConfig } from '../config/frontendConfig';
import SuperTokensReact, {
  SuperTokensConfig,
  SuperTokensWrapper,
  useSessionContext,
} from '@collinsonx/utils/supertokens';
import { getTheme } from '@lib/index';
import { UserProvider } from '@collinsonx/utils/lib/userContext';
import ApolloClient from '@components/ApolloClient';

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

const theme = getTheme();

export default function MyApp({ Component, pageProps }: Props) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>CollinsonX</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <UserProvider>
        <SuperTokensWrapper>
          <ApolloClient>
            <MantineProvider
              theme={{
                ...theme,
                globalStyles: ({ colors }) => ({
                  ...theme.globalStyles,
                  body: {
                    backgroundColor: colors.splashColor[0],
                    color: '#FFF',
                    margin: 0,
                  },
                  'html, body, #__next': {
                    height: '100%',
                  },
                }),
              }}
              withGlobalStyles
              withNormalizeCSS
            >
              {getLayout(<Component {...pageProps} />)}
            </MantineProvider>
          </ApolloClient>
        </SuperTokensWrapper>
      </UserProvider>
    </>
  );
}
