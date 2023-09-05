import { MantineThemeOverride } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';

type ThemeOptions = {
  fontFamily?: string;
  mainColour?: string;
  buttonFontColour?: string;
};

const baseTheme = ({
  fontFamily,
  mainColour,
  buttonFontColour,
}: ThemeOptions): MantineThemeOverride => {
  const theme = useMantineTheme();
  return {
    colors: {
      headerNavBg: ['#D3DAE1'],
      headerNavColor: ['#000'],
      mainColor: [mainColour],
      brandColor: ['#D3DAE1'],
      buttonFontColour: [buttonFontColour],
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
            backgroundColor: colors.mainColor,
            color: colors.headerNavColor,
            '&:hover': {
              backgroundColor: theme.fn.darken(colors.mainColor[0], 0.05),
            },
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
            fontFamily,
            color: colors.dark[6],
          },
        }),
      },
      NavLink: {
        styles: ({ colors }) => ({
          label: {
            color: colors.brandColor,
          },
        }),
      },
    },
  };
};

export default baseTheme;
