import { ColorSchemeProvider, MantineThemeOverride } from '@mantine/core';

type ThemeOptions = {
  fontFamily?: string;
  buttonBackground?: string;
  buttonFontColour?: string;
};

const baseTheme = ({
  fontFamily,
  buttonBackground,
  buttonFontColour,
}: ThemeOptions): MantineThemeOverride => {
  return {
    colors: {
      headerNavBg: ['#D3DAE1'],
      headerNavColor: ['#000'],
      mainColor: ['#FFF'],
      brandColor: ['#D3DAE1'],
      splashColor: ['#858B91'],
      brandBlue: ['#006FCF'],
    },
    primaryColor: 'mainColor',
    primaryShade: 0,
    defaultRadius: 4,
    //spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
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
      // properties for all headings
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
        styles: ({ colors }) => ({
          root: {
            backgroundColor: buttonBackground,
            color: colors.headerNavColor,
          },
          label: {
            color: buttonFontColour,
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
            borderColor: colors.gray[4],
            color: colors.dark[6],
            '::placeholder': {
              color: colors.gray[6],
            },
            ':focus': {
              color: colors.dark[6],
              borderColor: colors.dark[6],
            },
          },
          label: {
            fontWeight: 400,
            fontSize: '1rem',
            fontFamily,
            color: colors.dark[6],
          },
        }),
      },
      NavLink: {
        styles: ({ colors }) => ({
          label: {
            color: colors.brandColor
          }
        })
      },
      Checkbox: {
        styles: ({ colors }) => ({
          input: {
            borderColor: colors.brandColor,
            borderWidth: 2,
            '&:checked': {
              backgroundColor: colors.brandColor,
              borderColor: colors.brandColor
            }
          },
        })
      },
    },
  };
};

export default baseTheme;
