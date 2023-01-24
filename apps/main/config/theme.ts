import { MantineThemeOverride } from '@mantine/core';

const theme: MantineThemeOverride = {
  colorScheme: 'dark',
  colors: {
    white: ['#FFF'],
  },
  primaryColor: 'white',
  primaryShade: 0,
  defaultRadius: 4,
  globalStyles: ({ colors }) => ({
    body: {
      backgroundColor: colors.dark[6],
      color: colors.white[0],
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
