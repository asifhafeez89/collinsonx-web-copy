import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { ComponentType, ReactElement } from 'react';
import { MantineProvider } from '@collinson/design-system/core';

import Head from 'next/head';

import { themeLight } from '@collinson/design-system/themes';
import { Header } from '@collinson/design-system';

import { Open_Sans } from '@next/font/google';

const openSans = Open_Sans({
  style: ['normal'],
  subsets: ['latin'],
});

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
  return (
    <>
      <Head>
        <title>CollinsonX</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MantineProvider
        theme={themeLight({ fontFamily: openSans.style.fontFamily })}
        withGlobalStyles
        withNormalizeCSS
      >
        <Header />
        {getLayout(<Component {...pageProps} />)}
      </MantineProvider>
    </>
  );
}
