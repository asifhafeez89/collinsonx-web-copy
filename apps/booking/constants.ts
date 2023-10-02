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
export const PLATFORM = 'PLATFORM';

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

export enum BookingError {
  ERR_MEMBERSHIP_ALREADY_CONNECTED = 'ERR_MEMBERSHIP_ALREADY_CONNECTED',
}

export const ValidationErrorResponses = {
  INVALID_DATE: {
    code: 'ERR_INVALID_DATE',
    message: 'Invalid Date',
  },
  INVALID_FLIGHT: {
    code: 'ERR_INVALID_FLIGHT',
    message: 'Invalid Flight',
  },
} as const;
