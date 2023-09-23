import { BridgePayload } from 'types/booking';

const constants = {
  TIMEFORMAT: 'HH:mm',
};

const cookiesNames = {
  consumerid: 'EXPERIENCE_X_CONSUMER_ID',
};

export const STORAGE_NAMESPACE = 'PREBOOKING';
export const MAX_GUESTS = 5;

export const LOUNGE_CODE = 'LOUNGE_CODE';
export const JWT = 'JWT';
export const REFERRER = 'REFERRER';

export const MOBILE_ACTION_BACK = 1;

export const apiAccountProviderMap: Record<
  BridgePayload['accountProvider'],
  string
> = {
  LOUNGE_KEY: 'lK',
  PRIORITY_PASS: 'pP',
};

export { constants, cookiesNames };

export const POLLING_TIME = 3000;
