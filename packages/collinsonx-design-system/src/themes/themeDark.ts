import { MantineThemeOverride } from '@mantine/core';

type ThemeOptions = {
  fontFamily: string;
};

const theme = ({ fontFamily }: ThemeOptions): MantineThemeOverride => ({
  colorScheme: 'dark',
  colors: {
    white: ['#FFF'],
  },
  primaryColor: 'white',
  primaryShade: 0,
  defaultRadius: 4,
  spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
  fontFamily,
  globalStyles: ({ colors }) => ({
    body: {
      height: '100%',
      backgroundColor: colors.dark[6],
      color: colors.white[0],
      fontWeight: 400,
    },
    html: {
      height: '100%',
    },
    '#__next': {
      height: '100%',
    },
  }),
  headings: {
    // properties for all headings
    fontFamily,
    fontWeight: 600,
  },
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
        error: {
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
          '::placeholder': {
            color: colors.gray[5],
          },
        },
        label: {
          fontFamily,
          fontWeight: 600,
        },
        invalid: {
          borderColor: colors.red[6],
          borderWidth: 2,
          color: colors.dark[6],
          '::placeholder': {
            color: colors.gray[5],
          },
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
        label: {
          fontFamily,
          fontWeight: 600,
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
});

export default theme;