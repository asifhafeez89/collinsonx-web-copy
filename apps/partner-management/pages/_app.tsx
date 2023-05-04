import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { ComponentType, ReactElement } from 'react';
import { MantineProvider } from '@collinsonx/design-system/core';
import Head from 'next/head';
import { experienceX } from '@collinsonx/design-system/themes';
import { Be_Vietnam_Pro } from 'next/font/google';
import { useApollo, ApolloProvider } from '@collinsonx/utils/apollo';
// import SuperTokensReact, {
//   SuperTokensConfig,
//   SuperTokensWrapper,
// } from '@collinsonx/utils/supertokens';
// import { SysAuth, Logout } from '@collinsonx/utils/components';
const beVietnamPro = Be_Vietnam_Pro({
  style: ['normal'],
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => JSX.Element;
  layout?: ComponentType;
};

type Props = AppProps & {
  Component: Page;
};

const theme = experienceX({ fontFamily: beVietnamPro.style.fontFamily });

theme.components = {
  ...theme.components,
  Anchor: {
    styles: ({ colors }) => ({
      root: {
        color: colors.brandColor[0],
        textDecoration: 'underline',
        fontWeight: 600,
        fontSize: 18,
      },
    }),
  },
};

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
        {/* <SuperTokensWrapper> */}
        {/* <SysAuth> */}
        <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
          {getLayout(<Component {...pageProps} />)}
        </MantineProvider>
        {/* </SysAuth> */}
        {/* </SuperTokensWrapper> */}
      </ApolloProvider>
    </>
  );
}
