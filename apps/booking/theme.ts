import { MantineThemeOverride } from '@collinsonx/design-system/core';

type ThemeOptions = {
  fontFamily?: string;
};

const theme = (
  { fontFamily }: ThemeOptions = { fontFamily: 'Be Vietnam Pro' }
): MantineThemeOverride => ({
  components: {
    DatePickerInput: {
      styles: ({ colors }) => ({
        label: {
          fontSize: '1rem',
          marginTop: '10px',
          marginBottom: '10px',
        },
      }),
    },
    DateTimePicker: {
      styles: ({ colors }) => ({
        label: {
          fontSize: '1rem',
          marginTop: '10px',
          marginBottom: '10px',
        },
      }),
    },
    TextInput: {
      styles: ({ colors }) => ({
        label: {
          fontSize: '1rem',
          marginTop: '10px',
          marginBottom: '10px',
        },
      }),
    },
    Container: {
      defaultProps: {
        sizes: {
          xs: 540,
          sm: 720,
          md: 960,
          lg: 1140,
          xl: 1320,
        },
      },
    },
  },
});

export default theme();
