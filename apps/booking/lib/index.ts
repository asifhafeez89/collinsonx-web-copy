import { experienceX } from '@collinsonx/design-system/themes';

import { Be_Vietnam_Pro } from 'next/font/google';
import { MantineThemeOverride } from '@collinsonx/design-system/core';
import { STORAGE_NAMESPACE } from '../constants';

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
    requiredKeys.length &&
  object.membershipNumber &&
  (object.accountProvider === 'PP' || object.accountProvider === 'LK');

export const getItem = (key: string): string | null =>
  sessionStorage.getItem(`${STORAGE_NAMESPACE}_${key}`);

export const setItem = (key: string, value: string) =>
  sessionStorage.setItem(`${STORAGE_NAMESPACE}_${key}`, value);

export const removeItem = (key: string) =>
  sessionStorage.removeItem(`${STORAGE_NAMESPACE}_${key}`);
