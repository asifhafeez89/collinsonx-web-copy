import { MantineThemeOverride } from '@mantine/core';
import baseTheme from './baseTheme';

type ThemeOptions = {
  fontFamily?: string;
};

const theme = (
  { fontFamily }: ThemeOptions = { fontFamily: 'BentonSans Book' }
): MantineThemeOverride =>
<<<<<<< HEAD
  baseTheme({ mainColour: '#00af41', buttonFontColour: 'white' });
=======
  baseTheme({
    themeOverrides: {
      headerNavBg: '#000',
      headerNavColor: '#FFF',
      brandColor: '#00af41',
      splashColor: '#44444F',
    },
  });
>>>>>>> dev

export default theme;
