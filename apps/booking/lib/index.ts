import { experienceX } from '@collinsonx/design-system/themes';

import { Be_Vietnam_Pro } from 'next/font/google';
import { MantineThemeOverride } from '@collinsonx/design-system/core';
import { PRODUCTION_DOMAIN, STORAGE_NAMESPACE } from '../constants';

import { LOUNGE_HOURS_OFFSET } from 'config/lounge';
import dayjsTz from '@collinsonx/utils/lib/dayjsTz';
import { AccountProvider } from '@collinsonx/constants/enums';
import {
  Consumer,
  LinkedAccount,
} from '@collinsonx/utils/generatedTypes/graphql';
import { BridgePayload } from 'types/booking';
import { datadogLogs } from '@datadog/browser-logs';

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
      log(`Theme '${themeKey}' not found`);
      theme = experienceX({
        fontFamily: beVietnamPro.style.fontFamily,
      });
    }
    return theme;
  }
};

const { LK, PP } = AccountProvider;

/**
 * Basic field validations for object
 * @param object
 * @param requiredKeys
 * @returns
 */
export const hasRequired = (object: any, requiredKeys: string[]) =>
  Object.keys(object).filter((key) => requiredKeys.includes(key)).length ===
    requiredKeys.length &&
  String(object.externalId).length >= 1 &&
  (object.accountProvider === PP || object.accountProvider === LK);

export const getItem = (key: string): string | null =>
  sessionStorage.getItem(`${STORAGE_NAMESPACE}_${key}`);

export const setItem = (key: string, value: string) =>
  sessionStorage.setItem(`${STORAGE_NAMESPACE}_${key}`, value);

export const removeItem = (key: string) =>
  sessionStorage.removeItem(`${STORAGE_NAMESPACE}_${key}`);

export const log = (...args: any[]) => {
  const windowObj: any = window;
  if (windowObj) {
    if (windowObj.location.host !== PRODUCTION_DOMAIN) {
      // eslint-disable-next-line no-console
      console.log(...args);
    }
  }
};

export const sendMobileEvent = (windowObj: any = {}, value: any) => {
  if (windowObj.Android && windowObj.Android.onWebViewEvent) {
    windowObj.Android.onWebViewEvent(value);
  } else if (
    windowObj.webkit &&
    windowObj.webkit.messageHandlers &&
    windowObj.webkit.messageHandlers.onWebViewEvent &&
    windowObj.webkit.messageHandlers.onWebViewEvent.postMessage
  ) {
    windowObj.webkit.messageHandlers.onWebViewEvent.postMessage(value);
  } else {
    log('ERROR: Unable to detect mobile environment');
  }
};

export const accountIsEqual =
  (payload: BridgePayload | undefined) => (item: LinkedAccount) =>
    String(item.externalID) === String(payload?.externalId) &&
    (item.provider as unknown as AccountProvider) === payload?.accountProvider;

export const consumerIsValid = (consumer: Consumer) => {
  const { firstName, lastName, dateOfBirth } = consumer || {};
  return consumer && firstName && lastName && dateOfBirth;
};

export const loggerProduction = (
  error: Error,
  file: string,
  action: string,
  data: unknown
) => {
  const datadogenv: string | undefined = process.env.NEXT_PUBLIC_DATADOG_ENV;
  if ((datadogenv?.length ?? 0) > 0) {
    datadogLogs.logger.error(
      'Frontend Error Occured',
      {
        file,
        action,
        data,
      },
      error
    );
  }
};
