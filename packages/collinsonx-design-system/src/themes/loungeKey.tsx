import { ColorSchemeProvider, MantineThemeOverride } from '@mantine/core';
import baseTheme from './baseTheme';

type ThemeOptions = {
  fontFamily?: string;
};

const theme = (
  { fontFamily }: ThemeOptions = { fontFamily: 'BentonSans Book' }
): MantineThemeOverride =>
  baseTheme({ buttonBackground: '#00af41', buttonFontColour: 'white' });

export default theme;
