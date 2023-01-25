import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { NextPage } from 'next';
import { ComponentType, ReactElement } from 'react';

import theme from '../config/theme';
import Head from 'next/head';

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => JSX.Element;
  layout?: ComponentType;
};

type Props = AppProps & {
  Component: Page;
};

export default function MyApp({ Component, pageProps }: Props) {
  // Use the layout defined at the page level, if available

  return (
    <>
      <Head>
        <title>CollinsonX</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
