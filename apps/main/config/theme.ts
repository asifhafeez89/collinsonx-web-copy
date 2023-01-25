import { MantineThemeOverride } from '@mantine/core';

const theme: MantineThemeOverride = {
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

export default theme;
