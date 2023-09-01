import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { ComponentType, ReactElement } from 'react';
import { MantineProvider } from '@collinsonx/design-system/core';
import Head from 'next/head';
import { frontendConfig } from '../config/frontendConfig';
import SuperTokensReact, {
  SuperTokensConfig,
  SuperTokensWrapper,
} from '@collinsonx/utils/supertokens';
import { UserProvider } from '@collinsonx/utils/lib/userContext';
import { useApollo, ApolloProvider } from '@collinsonx/utils/apolloBooking';
import SessionManager from '@components/SessionManager';
import { Analytics } from '@vercel/analytics/react';
import AuthWrapper from '@components/AuthWrapper';
import {
  experienceX,
  hsbc,
  loungeKey,
  priorityPass,
} from '@collinsonx/design-system/themes';
import { Be_Vietnam_Pro } from 'next/font/google';
import router, { useRouter } from 'next/router';

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

const beVietnamPro = Be_Vietnam_Pro({
  style: ['normal'],
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export default function MyApp({ Component, pageProps }: Props) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  const apolloClient = useApollo(pageProps);

  const router = useRouter();

  interface Partner {
    partner?: string;
  }

  const { partner }: Partner = router?.query;

  const themes = {
    default: 'experienceX',
    hsbc: 'hsbc',
    priorityPass: 'priorityPass',
    loungeKey: 'loungeKey',
  };

  const themeSettingsShared = {
    fontFamily: beVietnamPro.style.fontFamily,
  };

  function callThemeFunction(name: string) {
    switch (name) {
      case 'cergea':
        return experienceX(themeSettingsShared);
      case 'hsbc':
        return hsbc(themeSettingsShared);
      case 'priorityPass':
        return priorityPass(themeSettingsShared);
      case 'loungeKey':
        return loungeKey(themeSettingsShared);
      default:
        return experienceX(themeSettingsShared);
    }
  }

  return (
    <>
      <Head>
        <title>Booking</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <UserProvider>
        <SuperTokensWrapper>
          <ApolloProvider client={apolloClient}>
            <AuthWrapper>
              <SessionManager>
                <MantineProvider
                  theme={callThemeFunction(partner ?? 'experienceX')}
                  withGlobalStyles
                  withNormalizeCSS
                >
                  {getLayout(<Component {...pageProps} />)}
                  <Analytics />
                </MantineProvider>
              </SessionManager>
            </AuthWrapper>
          </ApolloProvider>
        </SuperTokensWrapper>
      </UserProvider>
    </>
  );
}
