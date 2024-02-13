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
export const PATH_NAME = 'PATH_NAME';
export const BOKING_MODE_STATE = 'MODE';
export const ORIGINAL_BOOKING_DETAILS = 'ORIGINAL_BOOKING_DETAILS';

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
  ON_PAGE_CONFIRMED_BTN_RFUND_DOWNLOAD = 'CK_BTN__Amnd_Cfnd_Rfnd',
  ON_PAGE_CONFIRMED_BACK_BTN = 'Ck_BTN_Back_Bk_Cfnd',
  ON_PAGE_ENTER_CHECKAVAILABILITY = 'On_PG_Chk_Avl',
  ON_PAGE_ENTER_CHECKAVAILABILITY_EDIT = 'On_PG_Chk_Avl_Amnd',
  ON_PAGE_CHANGE_FLIGHT = 'CG_Flight_Date_Chk_Avl',
  ON_CHANGE_DATE = 'CG_Flight_Date_Chk_Avl',
  ON_CONTINUE_BUTTON_AVI_EDIT = 'CK_BTN_Chk_Avl_Amnd',
  ON_CHANGE_FLIGHT_NUMBER_ERROR_EDIT = 'ERR_Flight_Number_Chk_Avl_Amnd',
  ON_CHANGE_DATE_EDIT = 'CG_Flight_Date_Chk_Avl_Amnd',
  ON_CHANGE_DATE_ERROR = 'ERR_Flight_Date_Chk_Avl',
  ON_CHANGE_DATE_ERROR_EDIT = 'ERR_Flight_Date_Chk_Avl_Amnd',
  ON_CHANGE_FLIGHT_NUMBER = 'CG_Flight_Number_Chk_Avl',
  ON_CHANGE_FLIGHT_NUMBER_EDIT = 'CG_Flight_Number_Chk_Avl_Amnd',
  ON_CHANGE_FLIGHT_NUMBER_ERROR = 'ERR_Flight_Number_Chk_Avl',
  ON_CONTINUE_BUTTON_AVI = 'CK_BTN_Chk_Avl',
  ON_CHANGE_ERROR_ATTENDEES_AVL = 'ERR_Number_Chk_Avl',
  ON_CHANGE_ERROR_ATTENDEES_AVL_EDIT = 'ERR_Number_Chk_Avl_Amnd',
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
  ON_SLOT_MISSED = 'On_PG_Slot_Mis',
  ON_SLOT_SELECT_ANOTHER = 'CK_BTN_Sel_Slot_Mis',
  ON_SLOT_SELECT_GO_TO_LOUNGE = 'CK_BTN_GO_Slot_Mis',
  ON_SLOT_AMEND_ENTER = 'On_PG_Pick_Slot_Amnd',
  ON_SLOT_CHANGED_AMEND = 'CHG_Time_Slot_Pick_Slot_Amnd',
  ON_SLOT_AMEND_CONFIRMED = 'CK_BTN_Confirm_Pick_Slot_Amnd',
  ON_CONFIRM_AMEND_PG = 'On_PG_Sv_Chng_Amnd',
  ON_CONFIRM_AMEND_SAVE = 'CK_BTN_Sv_Chng_Amnd',
  ON_REFUND_AMENDMENT_ENTER = 'On_PG_Amnd_Cfnd_Rfnd',
  ON_REFUND_FAILED_AMEND = 'CK_BTN__Amnd_Cfnd_Rfnd_Err',
}

export const PAGENAMES = {
  INDEX: 'Chk_Avl',
  SLOTAMEND: 'Slot_Amnd',
  PICK_SLOT: 'Pick_Slot',
  BOOKING_CONFIRMED: 'BookingConfirmed',
  FAULURE_BOOKING: 'Slot_Mis',
  BOOKING_AMEND: 'Chk_Avl_Amnd',
  CONFIRM_AMEND: 'Sv_Chng_Amnd',
  CONFIRM_CREATE: 'G_T_Pmt',
  FAILURE_AMEND_REFUND: 'Refund_fail',
};

export const PRODUCTION_DOMAIN = 'booking.cergea.com';

export const VALIDATION_RULES = {
  MAX_LENGTH: 255,
};

export enum SWITCHES {
  LOCAL_SWITCH_OFF = 'OFF',
  LOCAL_SWITCH_ON = 'ON',
}

export enum BOOKING_MODE {
  EDIT = 'EDIT',
  CREATE = 'CREATE',
}

export const TIMELIMITTOAMEND = 48;
