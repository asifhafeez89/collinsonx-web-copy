import { ButtonStylesParams, MantineThemeOverride } from '@mantine/core';

type ThemeOptions = {
  fontFamily?: string;
};

const theme = (
  { fontFamily }: ThemeOptions = { fontFamily: 'Be Vietnam Pro' }
): MantineThemeOverride => ({
  colors: {
    headerNavBg: ['#FFF'],
    headerNavColor: ['#FFF'],
    brandColor: ['#827127'],
    splashColor: ['#FFF'],
  },
  colorScheme: 'light',
  primaryColor: 'brandColor',
  primaryShade: 0,
  defaultRadius: 4,
  //spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
  fontFamily,
  globalStyles: ({ colors }) => ({
    body: {
      height: '100%',
      color: colors.dark[4],
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
    DatePickerInput: {
      styles: ({ colors }) => ({
        icon: {
          paddingLeft: 14,
        },
        rightSection: {
          button: {
            color: colors.dark[6],
          },
        },
        input: {
          borderRadius: 4,
          paddingLeft: 56,
          '&[data-with-icon=true]': { paddingLeft: 56 },
        },
        day: {
          '&[data-weekend=true]': {
            color: colors.red[7],
          },
        },
      }),
    },
    DatePicker: {
      styles: ({ colors }) => ({
        calendarHeader: {
          color: colors.dark[6],
        },
        calendarHeaderControl: {
          color: colors.dark[6],
        },
      }),
    },
    InputWrapper: {
      styles: ({ colors }) => ({
        label: {
          fontSize: '18px',
          color: colors.dark[6],
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
          backgroundColor: 'white',
          height: '50px',
          borderRadius: 0,
          borderColor: colors.gray[4],
          color: colors.dark[6],
          '::placeholder': {
            color: colors.gray[5],
          },
        },
        label: {
          fontFamily,
          fontWeight: 400,
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
          padding: '11px 16px',
          fontSize: '18px',
          height: '50px',
          backgroundColor: colors.white,
          borderRadius: 4,
          color: colors.dark[6],
          '::placeholder': {
            color: colors.gray[6],
          },
          ':focus': {
            color: colors.dark[6],
          },
          '&[data-invalid]': {
            borderColor: colors.red[6],
            color: colors.dark[6],
            '::placeholder': {
              color: colors.gray[5],
            },
          },
        },
        label: {
          fontFamily,
          color: colors.dark[6],
          fontWeight: 400,
        },
        error: {
          color: colors.red[6],
        },
      }),
    },
    PasswordInput: {
      styles: ({ colors }) => ({
        input: {
          height: 50,
          borderRadius: 4,
          '&[data-invalid]': {
            borderColor: colors.red[6],
            color: colors.dark[6],
            '::placeholder': {
              color: colors.gray[5],
            },
          },
        },
        innerInput: {
          height: '100%',
          fontSize: 18,
          '&[data-invalid]': {
            color: colors.dark[6],
            '::placeholder': {
              color: colors.gray[5],
            },
          },
        },
        label: {
          color: colors.dark[6],
          fontWeight: 400,
        },
        rightSection: {
          '& button': {
            color: '#A8A8AA',
          },
          '&[data-invalid]': {
            color: colors.dark[6],
            '::placeholder': {
              color: colors.gray[5],
            },
          },
        },
      }),
    },
    Button: {
      styles: (theme, params: ButtonStylesParams) => ({
        root: {
          //borderColor: params.variant === 'default' ? '#25262B' : undefined,
          color: params.color === 'red' ? '#cf4545' : undefined,
        },
      }),
    },
  },
});

export default theme;
