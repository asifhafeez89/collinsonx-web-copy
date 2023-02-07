import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { ComponentType, ReactElement } from 'react';
import { MantineProvider } from '@collinsonx/design-system/core';

import Head from 'next/head';

import { themeLight } from '@collinsonx/design-system/themes';
import { Header } from '@collinsonx/design-system';

import { Be_Vietnam_Pro } from '@next/font/google';
import { Cart, Chat, Home } from '@collinsonx/design-system/assets/icons';

import Client from '@collinsonx/utils/provider';

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
          theme={themeLight({ fontFamily: beVietnamPro.style.fontFamily })}
          withGlobalStyles
          withNormalizeCSS
        >
          <Header
            items={[
              {
                label: 'Home',
                link: '/lounge',
                icon: <Home color="#112132" />,
              },
              {
                label: 'My trips',
                link: '/lounge/bookings',
                icon: <Cart color="#112132" />,
              },
              {
                label: 'AI Travel companion',
                link: '/companion',
                icon: <Chat color="#112132" />,
              },
            ]}
          />
          {getLayout(<Component {...pageProps} />)}
        </MantineProvider>
      </Client>
    </>
  );
}
