import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { NextPage } from 'next';
import { ComponentType, ReactElement } from 'react';

import Head from 'next/head';

import { theme } from '@collinson/design-system';
import { default as DefaultLayout } from '@collinson/design-system/components/Layout';


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
  const Layout = Component.layout ?? DefaultLayout;
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
        theme={theme({ fontFamily: openSans.style.fontFamily })}
        withGlobalStyles
        withNormalizeCSS
      >
        {getLayout(<Component {...pageProps} />)}
      </MantineProvider>
    </>
  );
}
