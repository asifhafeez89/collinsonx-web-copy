import { MantineThemeOverride } from '@mantine/core';

import { Open_Sans } from '@next/font/google';

const openSans = Open_Sans({
  variable: '--open-sans',
  weight: ['400', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
});

const theme: MantineThemeOverride = {
  colorScheme: 'dark',
  colors: {
    white: ['#FFF'],
  },
  primaryColor: 'white',
  primaryShade: 0,
  defaultRadius: 4,
  fontFamily: openSans.style.fontFamily,
  globalStyles: ({ colors }) => ({
    body: {
      height: '100%',
      backgroundColor: colors.dark[6],
      color: colors.white[0],
    },
    html: {
      height: '100%',
    },
    '#__next': {
      height: '100%',
    },
  }),
  components: {
    InputWrapper: {
      styles: ({ colors }) => ({
        label: {
          fontSize: '18px',
          color: colors.white[0],
        },
        required: {
          color: colors.red[6],
        },
      }),
    },
    Input: {
      styles: ({ colors }) => ({
        input: {
          backgroundColor: colors.white[0],
          height: '50px',
          borderRadius: 0,
          color: colors.dark[6],
        },
      }),
    },
    TextInput: {
      styles: ({ colors }) => ({
        input: {
          padding: '11px',
          fontSize: '18px',
          height: '50px',
          backgroundColor: colors.white[0],
          borderRadius: 0,
          color: colors.dark[6],
        },
      }),
    },
    Button: {
      styles: ({ colors }) => ({
        root: {
          height: '53px',
          fontSize: '18px',
          color: colors.dark[6],
        },
      }),
    },
  },
};

export default theme;
