import {
  experienceX,
  amexBlack,
  amexPlatinum,
  dinersClub,
} from '@collinsonx/design-system/themes';

import { Be_Vietnam_Pro } from '@next/font/google';

import { MantineThemeOverride } from '@collinsonx/utils/core';

const beVietnamPro = Be_Vietnam_Pro({
  style: ['normal'],
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

const themes = {
  experienceX,
  amexBlack,
  amexPlatinum,
  dinersClub,
};

const themeKey = process.env.NEXT_PUBLIC_SESSION_THEME;
let theme: MantineThemeOverride;

export const getThemeKey = () => themeKey;

export const getTheme = () => {
  if (theme) {
    return theme;
  } else {
    try {
      theme = themes[themeKey as keyof typeof themes]({
        fontFamily: beVietnamPro.style.fontFamily,
      });
    } catch (e) {
      console.error(`Theme '${themeKey}' not found`);
      theme = experienceX({
        fontFamily: beVietnamPro.style.fontFamily,
      });
    }
    return theme;
  }
};
