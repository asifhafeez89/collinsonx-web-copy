import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { MantineThemeOverride, MantineProvider } from '@mantine/core';

const myTheme: MantineThemeOverride = {
  colorScheme: 'light',
  primaryColor: 'dark',
  primaryShade: 6,
  defaultRadius: 4,
  components: {
    InputWrapper: {
      styles: {
        label: {
          fontSize: '18px',
        },
      },
    },
    TextInput: {
      styles: {
        input: {
          padding: '11px',
          fontSize: '18px',
          height: '50px',
        },
      },
    },
    Button: {
      styles: {
        root: {
          height: '53px',
          fontSize: '18px',
        },
      },
    },
  },
};

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={myTheme} withGlobalStyles withNormalizeCSS>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MantineProvider>
  );
}
