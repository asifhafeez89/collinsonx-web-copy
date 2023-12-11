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
export const LANGUAGE = 'LANGUAGE';
export const JWT = 'JWT';
export const REFERRER = 'REFERRER';
export const PLATFORM = 'PLATFORM';
export const VERSION = 'VERSION';
export const ALLOW_LOCAL = 'ALLOW_LOCAL';

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

export enum ValidationError {
  ERR_FIELD_MAX_LENGTH = 'ERR_FIELD_MAX_LENGTH',
  ERR_FIELD_NOT_ALLOWED_CHARS = 'ERR_FIELD_NOT_ALLOWED_CHARS',
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

export enum ANALYTICS_TAGS {
  ON_PAGE_ENTER_EMAIL = 'On_PG_Enter_Email',
  ON_CONTINUE_CLICK = 'CK_BTN_Continue',
  ON_CHANGE_EMAIL_ADDRESS = 'CHG_Email_Address',
  ON_HIT_BACK_BUTTON = 'CK_BTN_Back_',
  ON_PAGE_ENTER_CONFIRMED = 'On_PG_Bk_Cfnd',
  ON_PAGE_CONFIRMED_BTN_DOWNLOAD = 'CK_BTN__Bk_Cfnd',
  ON_PAGE_CONFIRMED_BACK_BTN = 'Ck_BTN_Back_Bk_Cfnd',
  ON_PAGE_ENTER_CHECKAVAILABILITY = 'On_PG_Chk_Avl',
  ON_PAGE_CHANGE_FLIGHT = 'CG_Flight_Date_Chk_Avl',
  ON_CHANGE_DATE = 'CG_Flight_Date_Chk_Avl',
  ON_CHANGE_DATE_ERROR = 'ERR_Flight_Date_Chk_Avl',
  ON_CHANGE_FLIGHT_NUMBER = 'CG_Flight_Number_Chk_Avl',
  ON_CHANGE_FLIGHT_NUMBER_ERROR = 'ERR_Flight_Number_Chk_Avl',
  ON_CONTINUE_BUTTON_AVI = 'CK_BTN_Chk_Avl',
  ON_CHANGE_ERROR_ATTENDEES_AVL = 'ERR_Number_Chk_Avl',
  ON_SLOT_PG_ENTER = 'On_PG_Pick_Slot',
  ON_SLOT_CHANGE = 'CHG_Time_Slot_Pick_Slot ',
  ON_SLOT_CONTINUE = 'CK_BTN_Confirm_Pick_Slot',
  ON_PAYMENT_ENTER = 'On_PG_G_T_Pmt',
  ON_PAYMENT_CONTINUE = 'CK_BTN_Confirm_G_T_Pmt',
  ON_PAYMENT_PROCESSED = 'On_PG_Processing_Pmt',
  ON_CHECK_CODE_ENTER = 'On_PG_Email_Code',
  ON_CHECK_CODE_CHANGE = 'CG_Email_Code',
  ON_CHECK_CODE_VERIFY = 'Ck_BTN_Verify_Email_Code',
  ON_SIGNUP_PAGE_ENTER = 'On_PG_Upd_Dtl',
  ON_SIGNUP_PAGE_FIRSTNAME_UPDATE = 'CG_First_Name_Upd_Dtl',
  ON_SIGNUP_PAGE_LASTNAME_UPDATE = 'CG_Last_Name_Upd_Dtl',
  ON_SIGNUP_PAGE_CONCENT = 'Tick_Consent_Upd_Dtl',
  ON_SIGNUP_PAGE_CONFIRM = 'CK_BTN_Confirm_Upd_Dtl',
}

export const PRODUCTION_DOMAIN = 'booking.cergea.com';

export const VALIDATION_RULES = {
  MAX_LENGTH: 255,
};

export const PDF_VERSION_ACCEPTED = '6.30.0';

export enum SWITCHES {
  LOCAL_SWITCH_OFF = 'OFF',
  LOCAL_SWITCH_ON = 'ON',
}
