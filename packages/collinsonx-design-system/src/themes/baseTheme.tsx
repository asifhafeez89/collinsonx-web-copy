import { MantineThemeOverride } from '@mantine/core';
import { rem } from '@mantine/core';

type ThemeOptions = {
  fontFamily?: string;
  themeOverrides?: Record<string, string | undefined>;
};

const baseTheme = ({
  fontFamily,
  themeOverrides,
}: ThemeOptions): MantineThemeOverride => {
  return {
    colors: {
      headerNavBg: [themeOverrides?.headerNavBg || '#D3DAE1'],
      headerNavColor: [themeOverrides?.headerNavColor || '#000'],
      mainColor: [themeOverrides?.mainColor || '#FFF'],
      brandColor: [themeOverrides?.brandColor || '#D3DAE1'],
      splashColor: [themeOverrides?.splashColor || '#858B91'],
      brandBlue: [themeOverrides?.brandBlue || '#006FCF'],
    },
    primaryColor: 'mainColor',
    primaryShade: 0,
    defaultRadius: 4,
    fontFamily,
    globalStyles: ({ colors }) => ({
      body: {
        height: '100%',
        color: colors.black,
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
      fontFamily,
      fontWeight: 600,
    },
    components: {
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
      Button: {
        styles: (theme) => ({
          root: {
            borderRadius: 4,
            fontSize: 18,
            height: 44,
            backgroundColor: theme.colors.brandColor,
            color: theme.colors.headerNavColor,
            ':hover': {
              backgroundColor: theme.fn.darken(
                theme.colors.brandColor[0],
                0.05
              ),
            },
          },
          label: {
            color: '#fff',
          },
        }),
      },
      TextInput: {
        styles: ({ colors }) => ({
          input: {
            padding: '11px 16px',
            fontSize: rem(18),
            height: '50px',
            backgroundColor: colors.white,
            borderRadius: 4,
            borderColor: colors.gray[4],
            color: colors.dark[6],
            '::placeholder': {
              color: colors.gray[6],
              textTransform: 'capitalize',
            },
            ':focus': {
              color: colors.dark[6],
              borderColor: colors.dark[6],
            },
          },
          label: {
            fontWeight: 400,
            fontSize: rem(18),
            fontFamily,
            color: colors.dark[6],
          },
        }),
      },
      NavLink: {
        styles: () => ({
          label: {
            color: '#827127',
          },
        }),
      },
      Checkbox: {
        styles: ({ colors }) => ({
          input: {
            borderColor: colors.brandColor,
            borderWidth: 2,
            '&:checked': {
              backgroundColor: colors.brandColor,
              borderColor: colors.brandColor,
            },
          },
        }),
      },
      DatePickerInput: {
        styles: ({ colors }) => ({
          label: {
            fontWeight: 400,
            padding: '0 0 .5rem 0',
          },
          input: {
            borderRadius: rem(4),
          },
        }),
      },
    },
  };
};

export default baseTheme;
