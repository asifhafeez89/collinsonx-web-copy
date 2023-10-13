import { MantineThemeOverride } from '@collinsonx/design-system/core';

type ThemeOptions = {
  fontFamily?: string;
};

const theme = (
  { fontFamily }: ThemeOptions = { fontFamily: 'Be Vietnam Pro' }
): MantineThemeOverride => ({
  components: {
    Anchor: {
      styles: ({ colors }) => ({
        ':focus': {
          backgroundColor: 'transparent',
          textDecoration: 'none',
        },
        ':hover': {
          backgroundColor: 'transparent',
          textDecoration: 'none',
        },
      }),
    },
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
          fontSize: '1.9rem',
          marginTop: '10px',
          marginBottom: '10px',
        },
        input: {
          fontSize: '1.9rem',
        },
      }),
    },
    Select: {
      styles: ({ colors }) => ({
        input: {
          fontSize: '1.2rem',
          ':focus': {
            color: '#827127',
          },
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
        input: {
          color: colors.dark[6],
          '&[data-invalid]': {
            borderColor: colors.red[6],
            color: colors.dark[6],
            '::placeholder': {
              color: colors.gray[5],
            },
          },
          ':focus': {
            color: '#827127',
          },
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
