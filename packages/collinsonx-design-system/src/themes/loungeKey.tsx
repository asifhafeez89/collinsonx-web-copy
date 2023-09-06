import { ColorSchemeProvider, MantineThemeOverride } from '@mantine/core';
import baseTheme from './baseTheme';

type ThemeOptions = {
  fontFamily?: string;
};

const theme = (
  { fontFamily }: ThemeOptions = { fontFamily: 'BentonSans Book' }
): MantineThemeOverride =>
  baseTheme({
    themeOverrides: {
      headerNavBg: '#000',
      headerNavColor: '#FFF',
      brandColor: '#00af41',
      splashColor: '#44444F',
    },
  });

export default theme;
