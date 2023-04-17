import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { ComponentType, ReactElement } from 'react';
import { Global, MantineProvider } from '@collinsonx/design-system/core';
import Head from 'next/head';

import { experienceX } from '@collinsonx/design-system/themes';

import { Be_Vietnam_Pro } from 'next/font/google';

import Client from '@collinsonx/utils/provider';
import { frontendConfig } from '../config/frontendConfig';
import SuperTokensReact, {
  SuperTokensWrapper,
  SuperTokensConfig,
} from '@collinsonx/utils/supertokens';
import { SysAuth } from '@collinsonx/utils/components';

if (typeof window !== 'undefined') {
  // we only want to call this init function on the frontend, so
  // we check typeof window !== 'undefined'
  SuperTokensReact.init(frontendConfig() as SuperTokensConfig);
}

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

      <Client isConsumer>
        <SuperTokensWrapper>
          <SysAuth>
            <MantineProvider
              theme={experienceX({
                fontFamily: beVietnamPro.style.fontFamily,
              })}
              withGlobalStyles
              withNormalizeCSS
            >
              <Global
                styles={(theme) => ({
                  body: {
                    backgroundColor: '#f5f5f6',
                  },
                })}
              />
              {getLayout(<Component {...pageProps} />)}
            </MantineProvider>
          </SysAuth>
        </SuperTokensWrapper>
      </Client>
    </>
  );
}
