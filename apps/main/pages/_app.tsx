import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { ComponentType, ReactElement } from 'react';
import { MantineProvider } from '@collinsonx/design-system/core';
import Head from 'next/head';
import { themeDark } from '@collinsonx/design-system/themes';
import { Be_Vietnam_Pro } from '@next/font/google';
import Client from '@collinsonx/utils/provider';
import SuperTokens from 'supertokens-web-js';
import Session from 'supertokens-web-js/recipe/session';
import Passwordless from 'supertokens-web-js/recipe/passwordless'

const beVietnamPro = Be_Vietnam_Pro({
  style: ['normal'],
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => JSX.Element;
  layout?: ComponentType;
};

type Props = AppProps & {
  Component: Page;
};

if (typeof window !== "undefined") {
  SuperTokens.init({
    appInfo: {
      apiDomain: window.location.origin,
      apiBasePath: "/api/remote/auth",
      appName: '...',
    },
    recipeList: [Session.init(), Passwordless.init()],
  });
}

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
      <Client>
        <MantineProvider
          theme={themeDark({ fontFamily: beVietnamPro.style.fontFamily })}
          withGlobalStyles
          withNormalizeCSS
        >
          {getLayout(<Component {...pageProps} />)}
        </MantineProvider>
      </Client>
    </>
  );
}
