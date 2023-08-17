import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { useMediaPredicate } from 'react-media-hook';
import { ComponentType, ReactElement, useState, useEffect } from 'react';
import {
  ActionIcon,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  MediaQuery,
  Grid,
} from '@collinsonx/design-system/core';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';
import theme from '../theme';
import Link from 'next/link';
import { IconMoonStars, IconSun } from '@tabler/icons-react';
import { useLocalStorage } from '@mantine/hooks';

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => JSX.Element;
  layout?: ComponentType;
};

type Props = AppProps & {
  Component: Page;
};

export default function MyApp({ Component, pageProps }: Props) {
  const [envLabel, setEnvLabel] = useState<String>('');
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: useMediaPredicate('(prefers-color-scheme: dark)')
      ? 'dark'
      : 'light',
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  const dark = colorScheme === 'dark';

  useEffect(() => {
    if (window.location.href.includes('https://booking.uat.lifestyle-x.io/')) {
      setEnvLabel('uat');
    }

    if (window.location.href.includes('https://booking.test.lifestyle-x.io/')) {
      setEnvLabel('test');
    }

    if (window.location.href.includes('http://localhost:3011/')) {
      setEnvLabel('dev');
    }
  }, []);

  return (
    <>
      <Head>
        <title>Booking</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme, ...theme }}
          withGlobalStyles
          withNormalizeCSS
        >
          {envLabel !== '' && (
            <div
              style={{
                position: 'absolute',
                background: 'yellow',
                color: 'black',
              }}
            >
              {envLabel}
            </div>
          )}
          <div
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            <MediaQuery
              query="print"
              styles={{
                display: 'none',
              }}
            >
              <header
                style={{
                  borderBottom: '1px solid #A8A8AA',
                  // width: '100%',
                  padding: '1rem',
                  textAlign: 'center',
                  // margin: 0,
                }}
              >
                <Grid grow>
                  <Grid.Col span={11}>
                    <Link href="/">Insert Logo here</Link>
                  </Grid.Col>
                  <Grid.Col span={1}>
                    <ActionIcon
                      variant="outline"
                      color={dark ? 'yellow' : 'blue'}
                      onClick={() => toggleColorScheme()}
                      title="Toggle color scheme"
                    >
                      {dark ? (
                        <IconSun size="1.1rem" />
                      ) : (
                        <IconMoonStars size="1.1rem" />
                      )}
                    </ActionIcon>
                  </Grid.Col>
                </Grid>
              </header>
            </MediaQuery>
            <main style={{ padding: '32px 40px', margin: 0 }}>
              <Component {...pageProps} />
            </main>
          </div>
          <Analytics />
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
