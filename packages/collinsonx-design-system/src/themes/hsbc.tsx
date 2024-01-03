import { MantineThemeOverride } from '@mantine/core';
import baseTheme from './baseTheme';

type ThemeOptions = {
  fontFamily?: string;
};

const theme = (
  { fontFamily }: ThemeOptions = {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  }
): MantineThemeOverride =>
  baseTheme({
    fontFamily,
    themeOverrides: {
      headerNavBg: '#000',
      headerNavColor: '#FFF',
      brandColor: '#827127',
      splashColor: '#44444F',
    },
  });

export default theme;
