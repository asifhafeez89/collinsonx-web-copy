import { BridgePayload } from 'types/booking';

const constants = {
  TIME_FORMAT: 'HH:mm',
  TIME_FORMAT_DISPLAY: 'h:mma',
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
export const MOBILE_ACTION_DATA_URI = 'DATA_URI';

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
  BAD_USER_INPUT = 'BAD_USER_INPUT',
  ERR_MEMBERSHIP_ALREADY_CONNECTED = 'ERR_MEMBERSHIP_ALREADY_CONNECTED',
  ERR_BOOKING_NOT_FOUND = 'ERR_BOOKING_NOT_FOUND',
  ERR_BOOKING_ALREADY_CANCELLED = 'ERR_BOOKING_ALREADY_CANCELLED',
  ERR_BOOKING_NOT_OWNED = 'ERR_BOOKING_NOT_OWNED',
  ERR_CANCELLATION_FAILED = 'ERR_CANCELLATION_FAILED',
  ERR_CANCELLATION_FAILED_WITH_SUCCESS = 'ERR_CANCELLATION_FAILED_WITH_SUCCESS',
  ERR_CANCELATION_NOT_ALLOWED = 'ERR_CANCELATION_NOT_ALLOWED',
  ERR_SOMETHING_WENT_WRONG = 'ERR_SOMETHING_WENT_WRONG',
  ERR_TOKEN_INVALID_OR_EXPIRED = 'ERR_TOKEN_INVALID_OR_EXPIRED',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}

export const ValidationErrorResponses = {
  INVALID_DATE: {
    code: 'ERR_INVALID_DATE',
    message: 'Must provide date of flight.',
  },
  INVALID_DATEFlIGHT: {
    code: 'ERR_INVALID_DATEFlIGHT',
    message: 'Flight details not recognised. Please check and try again.',
  },
  INVALID_FLIGHT: {
    code: 'ERR_INVALID_FLIGHT',
    message: 'Flight details not recognised. Please check and try again.',
  },
} as const;

export const PRODUCTION_DOMAIN = 'booking.cergea.com';
