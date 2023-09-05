import { experienceX } from '@collinsonx/design-system/themes';

import { Be_Vietnam_Pro } from 'next/font/google';
import { MantineThemeOverride } from '@collinsonx/design-system/core';

import { LOUNGE_HOURS_OFFSET } from 'config/lounge';
import dayjsTz from '@collinsonx/utils/lib/dayjsTz';

export const getLoungeArrivalTime = (date: Date): string =>
  dayjsTz(date).subtract(LOUNGE_HOURS_OFFSET, 'hours').format('HH:mm');

const beVietnamPro = Be_Vietnam_Pro({
  style: ['normal'],
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

const themes = {
  experienceX,
};

const themeKey = process.env.NEXT_PUBLIC_SESSION_THEME;
let theme: MantineThemeOverride;

export const getThemeKey = () => themeKey || 'experienceX';

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

/**
 * Basic field validations for object
 * @param object
 * @param requiredKeys
 * @returns
 */
export const hasRequired = (object: any, requiredKeys: string[]) =>
  Object.keys(object).filter((key) => requiredKeys.includes(key)).length ===
  requiredKeys.length;
