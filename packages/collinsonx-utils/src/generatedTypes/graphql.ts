/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Date: { input: any; output: any };
  JSONObject: { input: any; output: any };
  ObjectID: { input: any; output: any };
};

export type AcceptInvitationInput = {
  email: Scalars['String']['input'];
  inviteToken: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Arrival = {
  __typename?: 'Arrival';
  airport?: Maybe<Scalars['String']['output']>;
  dateTime?: Maybe<FlightDateTime>;
  terminal?: Maybe<Scalars['String']['output']>;
};

export type Availability = {
  __typename?: 'Availability';
  messageID?: Maybe<Scalars['String']['output']>;
  slots: Array<Slots>;
  temporaryReservationID?: Maybe<Scalars['String']['output']>;
};

export type AvailabilityInput = {
  flightInformation: FlightInformation;
  guests: Guests;
  product: LegacyProductInput;
};

/** A record for the sale of a service, this could be either a reservation, walkup or other state. */
export type Booking = {
  __typename?: 'Booking';
  actingAccount?: Maybe<Scalars['String']['output']>;
  bookedFrom: Scalars['String']['output'];
  bookedTo: Scalars['String']['output'];
  consumer?: Maybe<Consumer>;
  createdAt: Scalars['Date']['output'];
  experience?: Maybe<Experience>;
  guestAdultCount: Scalars['Int']['output'];
  guestChildrenCount: Scalars['Int']['output'];
  guestInfantCount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  invoice?: Maybe<Scalars['String']['output']>;
  lastArrival: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSONObject']['output']>;
  orderID?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  price_currency?: Maybe<Scalars['String']['output']>;
  reference: Scalars['String']['output'];
  status: BookingStatus;
  stripePaymentID?: Maybe<Scalars['String']['output']>;
  type: BookingType;
  updatedAt: Scalars['Date']['output'];
};

/** A record for the sale of a service, this could be either a reservation, walkup or other state. */
export type BookingBookedFromArgs = {
  timezoneType?: InputMaybe<TimezoneType>;
};

/** A record for the sale of a service, this could be either a reservation, walkup or other state. */
export type BookingBookedToArgs = {
  timezoneType?: InputMaybe<TimezoneType>;
};

/** A record for the sale of a service, this could be either a reservation, walkup or other state. */
export type BookingGuestAdultCountArgs = {
  value?: InputMaybe<Scalars['Int']['input']>;
};

/** A record for the sale of a service, this could be either a reservation, walkup or other state. */
export type BookingGuestChildrenCountArgs = {
  value?: InputMaybe<Scalars['Int']['input']>;
};

/** A record for the sale of a service, this could be either a reservation, walkup or other state. */
export type BookingGuestInfantCountArgs = {
  value?: InputMaybe<Scalars['Int']['input']>;
};

/** A record for the sale of a service, this could be either a reservation, walkup or other state. */
export type BookingLastArrivalArgs = {
  timezoneType?: InputMaybe<TimezoneType>;
};

export type BookingInput = {
  actingAccount?: InputMaybe<Scalars['String']['input']>;
  bookedFrom: Scalars['Date']['input'];
  bookedTo: Scalars['Date']['input'];
  experience: ExperienceKey;
  guestAdultCount?: Scalars['Int']['input'];
  guestChildrenCount?: Scalars['Int']['input'];
  guestInfantCount?: Scalars['Int']['input'];
  invoice?: InputMaybe<Scalars['String']['input']>;
  lastArrival?: InputMaybe<Scalars['Date']['input']>;
  metadata?: InputMaybe<Scalars['JSONObject']['input']>;
  stripePaymentID?: InputMaybe<Scalars['String']['input']>;
  type: BookingType;
};

/** The lifecycle statuses of a booking */
export enum BookingStatus {
  Booked = 'BOOKED',
  CancelationFailed = 'CANCELATION_FAILED',
  Cancelled = 'CANCELLED',
  /** The booking has now been redeemed after being confirmed */
  CheckedIn = 'CHECKED_IN',
  CompletedVisit = 'COMPLETED_VISIT',
  Confirmed = 'CONFIRMED',
  Declined = 'DECLINED',
  Errored = 'ERRORED',
  /** A booking has been created, but not yet paid for */
  Initialized = 'INITIALIZED',
  NoShow = 'NO_SHOW',
  /** Booking has been paid for and is now pending confirmation from the operator */
  Pending = 'PENDING',
}

/** The category of booking that has been made. */
export enum BookingType {
  Reservation = 'RESERVATION',
  ReservationFeeOnly = 'RESERVATION_FEE_ONLY',
  WalkUp = 'WALK_UP',
}

/** A consumer is the end user of our applications that consume our goods and services */
export type Consumer = {
  __typename?: 'Consumer';
  bookings: Array<Booking>;
  createdAt: Scalars['Date']['output'];
  /** In salesforce we have a record of our consumer to manage their lifecycle and manage marketing */
  crmId?: Maybe<Scalars['String']['output']>;
  dateOfBirth?: Maybe<Scalars['Date']['output']>;
  /** Current a mandatory field as we use email as our primary login method */
  emailAddress: Scalars['String']['output'];
  entitlements: Array<Entitlement>;
  firstName?: Maybe<Scalars['String']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  linkedAccounts: Array<LinkedAccount>;
  phone?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
};

export type ConsumerInput = {
  dateOfBirth?: InputMaybe<Scalars['Date']['input']>;
  emailAddress: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  marketingConsent?: InputMaybe<Scalars['Boolean']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type DaySchedules = {
  __typename?: 'DaySchedules';
  FRIDAY?: Maybe<Array<Maybe<Schedule>>>;
  MONDAY?: Maybe<Array<Maybe<Schedule>>>;
  SATURDAY?: Maybe<Array<Maybe<Schedule>>>;
  SUNDAY?: Maybe<Array<Maybe<Schedule>>>;
  THURSDAY?: Maybe<Array<Maybe<Schedule>>>;
  TUESDAY?: Maybe<Array<Maybe<Schedule>>>;
  WEDNESDAY?: Maybe<Array<Maybe<Schedule>>>;
};

export type DaySchedulesInput = {
  FRIDAY?: InputMaybe<Array<InputMaybe<ScheduleInput>>>;
  MONDAY?: InputMaybe<Array<InputMaybe<ScheduleInput>>>;
  SATURDAY?: InputMaybe<Array<InputMaybe<ScheduleInput>>>;
  SUNDAY?: InputMaybe<Array<InputMaybe<ScheduleInput>>>;
  THURSDAY?: InputMaybe<Array<InputMaybe<ScheduleInput>>>;
  TUESDAY?: InputMaybe<Array<InputMaybe<ScheduleInput>>>;
  WEDNESDAY?: InputMaybe<Array<InputMaybe<ScheduleInput>>>;
};

export type Departure = {
  __typename?: 'Departure';
  airport?: Maybe<Scalars['String']['output']>;
  dateTime?: Maybe<FlightDateTime>;
  terminal?: Maybe<Scalars['String']['output']>;
};

export type Entitlement = {
  __typename?: 'Entitlement';
  consumer?: Maybe<Consumer>;
  createdAt: Scalars['Date']['output'];
  expired: Scalars['Boolean']['output'];
  expiryDate: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  issueDate: Scalars['Date']['output'];
  redeemableProducts: Array<Maybe<EntitlementProductType>>;
  redeemed: Scalars['Boolean']['output'];
  redeemedProduct?: Maybe<EntitlementProductType>;
  redemptionDate?: Maybe<Scalars['Date']['output']>;
  updatedAt: Scalars['Date']['output'];
};

export type EntitlementInput = {
  consumerID: Scalars['String']['input'];
  expiryDate: Scalars['Date']['input'];
  externalID: Scalars['String']['input'];
  issueDate?: InputMaybe<Scalars['Date']['input']>;
  redeemableProducts: Array<InputMaybe<EntitlementProductType>>;
  redeemed?: InputMaybe<Scalars['Boolean']['input']>;
  redeemedProduct?: InputMaybe<EntitlementProductType>;
  redemptionDate?: InputMaybe<Scalars['Date']['input']>;
};

export enum EntitlementProductType {
  Lounge = 'LOUNGE',
}

export type Experience = {
  __typename?: 'Experience';
  accessPeriod?: Maybe<Scalars['String']['output']>;
  additionalInformation?: Maybe<Scalars['String']['output']>;
  airsideLandside?: Maybe<Scalars['String']['output']>;
  bookings: Array<Booking>;
  cergea?: Maybe<Scalars['Boolean']['output']>;
  conditions?: Maybe<Scalars['String']['output']>;
  directions?: Maybe<Scalars['String']['output']>;
  exitDateIfUnderNotice?: Maybe<Scalars['Date']['output']>;
  experience?: Maybe<ExperienceCategory>;
  facilities?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  hasActiveLounges?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  images?: Maybe<Array<Maybe<Image>>>;
  invitations: Array<Invitation>;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  lK?: Maybe<Scalars['Boolean']['output']>;
  location?: Maybe<LegacyLocation>;
  loungeCode?: Maybe<Scalars['String']['output']>;
  loungeName?: Maybe<Scalars['String']['output']>;
  loungeOffers?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  marketingCopy?: Maybe<Scalars['String']['output']>;
  msDynamicsUID?: Maybe<Scalars['String']['output']>;
  openingHours?: Maybe<Scalars['String']['output']>;
  pP?: Maybe<Scalars['Boolean']['output']>;
  partnerIdProd?: Maybe<Scalars['String']['output']>;
  partnerIdTest?: Maybe<Scalars['String']['output']>;
  partnerIntegrationId?: Maybe<Scalars['String']['output']>;
  partners: Array<Partner>;
  passengerType?: Maybe<Scalars['String']['output']>;
  ppboOperatorName?: Maybe<Scalars['String']['output']>;
  pricing?: Maybe<LegacyPricing>;
  redemption?: Maybe<Redemption>;
  reservationOnlyFeeStripeProductID?: Maybe<Scalars['String']['output']>;
  reservationRequestEmail?: Maybe<Scalars['String']['output']>;
  reservationStripeProductID?: Maybe<Scalars['String']['output']>;
  serviceCentre?: Maybe<Scalars['String']['output']>;
  underNotice?: Maybe<Scalars['Boolean']['output']>;
  uniqueValueKey?: Maybe<Scalars['String']['output']>;
  videos?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  walkUpStripeProductID?: Maybe<Scalars['String']['output']>;
};

export enum ExperienceCategory {
  AirportExperience = 'AIRPORT_EXPERIENCE',
}

export type ExperienceKey = {
  id: Scalars['ID']['input'];
};

export enum ExperienceType {
  Lounge = 'LOUNGE',
}

export type FlightDateTime = {
  __typename?: 'FlightDateTime';
  local?: Maybe<Scalars['String']['output']>;
  utc?: Maybe<Scalars['String']['output']>;
};

export type FlightDetails = {
  __typename?: 'FlightDetails';
  arrival?: Maybe<Arrival>;
  departure?: Maybe<Departure>;
};

export type FlightDetailsInput = {
  carrierCode: Scalars['String']['input'];
  codeType: Scalars['String']['input'];
  departureDate: Scalars['Date']['input'];
  flightNumber: Scalars['String']['input'];
  version: Scalars['String']['input'];
};

export type FlightInformation = {
  airport?: InputMaybe<Scalars['String']['input']>;
  dateTime: Scalars['Date']['input'];
  terminal: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type GeoJson = {
  __typename?: 'GeoJSON';
  coordinates: Array<Array<Array<Scalars['Float']['output']>>>;
  type: Scalars['String']['output'];
};

export type GeoJsonInput = {
  coordinates: Array<Array<Array<Scalars['Float']['input']>>>;
  type: Scalars['String']['input'];
};

export type GeoQueryInput = {
  lat?: InputMaybe<Scalars['Float']['input']>;
  lng?: InputMaybe<Scalars['Float']['input']>;
};

export type Geoloc = {
  __typename?: 'Geoloc';
  lat?: Maybe<Scalars['Float']['output']>;
  lng?: Maybe<Scalars['Float']['output']>;
};

export type GetEntitlementsFilter = {
  consumerID?: InputMaybe<Scalars['String']['input']>;
  expired?: InputMaybe<Scalars['Boolean']['input']>;
  redeemableProducts?: InputMaybe<EntitlementProductType>;
  redeemed?: InputMaybe<Scalars['Boolean']['input']>;
  redeemedProduct?: InputMaybe<EntitlementProductType>;
};

export type Guests = {
  adultCount?: Scalars['Int']['input'];
  childrenCount?: Scalars['Int']['input'];
  infantCount?: Scalars['Int']['input'];
};

export enum IsoCountryCode {
  Afg = 'AFG',
  Ago = 'AGO',
  Alb = 'ALB',
  And = 'AND',
  Are = 'ARE',
  Arg = 'ARG',
  Arm = 'ARM',
  Atg = 'ATG',
  Aus = 'AUS',
  Aut = 'AUT',
  Aze = 'AZE',
  Bdi = 'BDI',
  Bel = 'BEL',
  Ben = 'BEN',
  Bfa = 'BFA',
  Bgd = 'BGD',
  Bgr = 'BGR',
  Bhr = 'BHR',
  Bhs = 'BHS',
  Bih = 'BIH',
  Blr = 'BLR',
  Blz = 'BLZ',
  Bol = 'BOL',
  Bra = 'BRA',
  Brb = 'BRB',
  Brn = 'BRN',
  Btn = 'BTN',
  Bwa = 'BWA',
  Caf = 'CAF',
  Can = 'CAN',
  Che = 'CHE',
  Chl = 'CHL',
  Chn = 'CHN',
  Civ = 'CIV',
  Cmr = 'CMR',
  Cod = 'COD',
  Cog = 'COG',
  Col = 'COL',
  Com = 'COM',
  Cpv = 'CPV',
  Cri = 'CRI',
  Cub = 'CUB',
  Cyp = 'CYP',
  Cze = 'CZE',
  Deu = 'DEU',
  Dji = 'DJI',
  Dma = 'DMA',
  Dnk = 'DNK',
  Dom = 'DOM',
  Dza = 'DZA',
  Ecu = 'ECU',
  Egy = 'EGY',
  Eri = 'ERI',
  Esp = 'ESP',
  Est = 'EST',
  Eth = 'ETH',
  Fin = 'FIN',
  Fji = 'FJI',
  Fra = 'FRA',
  Fsm = 'FSM',
  Gab = 'GAB',
  Gbr = 'GBR',
  Geo = 'GEO',
  Gha = 'GHA',
  Gin = 'GIN',
  Gmb = 'GMB',
  Gnb = 'GNB',
  Gnq = 'GNQ',
  Grc = 'GRC',
  Grd = 'GRD',
  Gtm = 'GTM',
  Guy = 'GUY',
  Hnd = 'HND',
  Hrv = 'HRV',
  Hti = 'HTI',
  Hun = 'HUN',
  Idn = 'IDN',
  Ind = 'IND',
  Irl = 'IRL',
  Irn = 'IRN',
  Irq = 'IRQ',
  Isl = 'ISL',
  Isr = 'ISR',
  Ita = 'ITA',
  Jam = 'JAM',
  Jor = 'JOR',
  Jpn = 'JPN',
  Kaz = 'KAZ',
  Ken = 'KEN',
  Kgz = 'KGZ',
  Khm = 'KHM',
  Kir = 'KIR',
  Kna = 'KNA',
  Kor = 'KOR',
  Kwt = 'KWT',
  Lao = 'LAO',
  Lbn = 'LBN',
  Lbr = 'LBR',
  Lby = 'LBY',
  Lca = 'LCA',
  Lie = 'LIE',
  Lka = 'LKA',
  Lso = 'LSO',
  Ltu = 'LTU',
  Lux = 'LUX',
  Lva = 'LVA',
  Mar = 'MAR',
  Mco = 'MCO',
  Mda = 'MDA',
  Mdg = 'MDG',
  Mdv = 'MDV',
  Mex = 'MEX',
  Mhl = 'MHL',
  Mkd = 'MKD',
  Mli = 'MLI',
  Mlt = 'MLT',
  Mmr = 'MMR',
  Mne = 'MNE',
  Mng = 'MNG',
  Moz = 'MOZ',
  Mrt = 'MRT',
  Mus = 'MUS',
  Mwi = 'MWI',
  Mys = 'MYS',
  Nam = 'NAM',
  Ner = 'NER',
  Nga = 'NGA',
  Nic = 'NIC',
  Nld = 'NLD',
  Nor = 'NOR',
  Npl = 'NPL',
  Nru = 'NRU',
  Nzl = 'NZL',
  Omn = 'OMN',
  Pak = 'PAK',
  Pan = 'PAN',
  Per = 'PER',
  Phl = 'PHL',
  Plw = 'PLW',
  Png = 'PNG',
  Pol = 'POL',
  Prk = 'PRK',
  Prt = 'PRT',
  Pry = 'PRY',
  Pse = 'PSE',
  Qat = 'QAT',
  Rou = 'ROU',
  Rus = 'RUS',
  Rwa = 'RWA',
  Sau = 'SAU',
  Sdn = 'SDN',
  Sen = 'SEN',
  Sgp = 'SGP',
  Slb = 'SLB',
  Sle = 'SLE',
  Slv = 'SLV',
  Smr = 'SMR',
  Som = 'SOM',
  Srb = 'SRB',
  Ssd = 'SSD',
  Stp = 'STP',
  Sur = 'SUR',
  Svk = 'SVK',
  Svn = 'SVN',
  Swe = 'SWE',
  Swz = 'SWZ',
  Syc = 'SYC',
  Syr = 'SYR',
  Tcd = 'TCD',
  Tgo = 'TGO',
  Tha = 'THA',
  Tjk = 'TJK',
  Tkm = 'TKM',
  Tls = 'TLS',
  Ton = 'TON',
  Tto = 'TTO',
  Tun = 'TUN',
  Tur = 'TUR',
  Tuv = 'TUV',
  Twn = 'TWN',
  Tza = 'TZA',
  Uga = 'UGA',
  Ukr = 'UKR',
  Ury = 'URY',
  Usa = 'USA',
  Uzb = 'UZB',
  Vat = 'VAT',
  Vct = 'VCT',
  Ven = 'VEN',
  Vnm = 'VNM',
  Vut = 'VUT',
  Wsm = 'WSM',
  Yem = 'YEM',
  Zaf = 'ZAF',
  Zmb = 'ZMB',
  Zwe = 'ZWE',
}

export type Image = {
  __typename?: 'Image';
  altText?: Maybe<Scalars['String']['output']>;
  contentType?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  lastModified?: Maybe<Scalars['Date']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

/** This allows us to send invitations for access, currently creating a partner account and linking it to an experience */
export type Invitation = {
  __typename?: 'Invitation';
  createdAt: Scalars['Date']['output'];
  experience?: Maybe<Experience>;
  expiresAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  inviteeEmail: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type InvitationInput = {
  experience?: InputMaybe<ExperienceKey>;
  inviteeEmail: Scalars['String']['input'];
  userType: InvitationUserType;
};

/** The types of user invitation that can be sent */
export enum InvitationUserType {
  /** An operator who can see the details for a single experience */
  Partner = 'PARTNER',
  /** An admin user that has access to all experiences and full permissions */
  SuperUser = 'SUPER_USER',
}

export type LegacyLocation = {
  __typename?: 'LegacyLocation';
  _geoloc?: Maybe<Geoloc>;
  airportCode?: Maybe<Scalars['String']['output']>;
  airportName?: Maybe<Scalars['String']['output']>;
  cgTerminal?: Maybe<Scalars['String']['output']>;
  cgTerminalCode?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  isoCountryCode?: Maybe<Scalars['String']['output']>;
  lbCountryCode?: Maybe<Scalars['String']['output']>;
  region?: Maybe<Scalars['String']['output']>;
  terminal?: Maybe<Scalars['String']['output']>;
  terminalAccessibility?: Maybe<Scalars['String']['output']>;
  terminalCode?: Maybe<Scalars['String']['output']>;
  timezone?: Maybe<Scalars['String']['output']>;
};

export type LegacyPricing = {
  __typename?: 'LegacyPricing';
  currency?: Maybe<Scalars['String']['output']>;
  lifestyleXReservationCharge?: Maybe<Scalars['Float']['output']>;
  lifestyleXWalkInCharge?: Maybe<Scalars['Float']['output']>;
  pricingType?: Maybe<Scalars['String']['output']>;
  reservationCost?: Maybe<Scalars['Float']['output']>;
  reservationOnlyFee?: Maybe<Scalars['Float']['output']>;
  reservationOnlyFeeCost?: Maybe<Scalars['Float']['output']>;
  vat?: Maybe<Scalars['Int']['output']>;
  walkInCostCurrentPPRate?: Maybe<Scalars['Float']['output']>;
};

export type LegacyProductInput = {
  productID: Scalars['String']['input'];
  productType?: InputMaybe<ProductType>;
  supplierCode: Scalars['String']['input'];
};

/** A linked account is another account (typically external) that can be associated to the internal cergea consumer */
export type LinkedAccount = {
  __typename?: 'LinkedAccount';
  analytics?: Maybe<Scalars['JSONObject']['output']>;
  consumer: Consumer;
  createdAt: Scalars['Date']['output'];
  externalID: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  membershipID?: Maybe<Scalars['String']['output']>;
  membershipType: Scalars['String']['output'];
  provider: LinkedAccountProvider;
  updatedAt: Scalars['Date']['output'];
};

export type LinkedAccountInput = {
  analytics?: InputMaybe<Scalars['JSONObject']['input']>;
  token: Scalars['String']['input'];
};

export enum LinkedAccountProvider {
  LoungeKey = 'LOUNGE_KEY',
  PriorityPass = 'PRIORITY_PASS',
}

export type Location = {
  __typename?: 'Location';
  /** The city */
  city?: Maybe<Scalars['String']['output']>;
  /** The 3 character location code eg RMF */
  code?: Maybe<Scalars['String']['output']>;
  /** The country name */
  country: Scalars['String']['output'];
  /** An open standard file format used for representing geographical features and their attributes */
  geoJSON?: Maybe<GeoJson>;
  /** The ISO country code */
  isoCountryCode?: Maybe<IsoCountryCode>;
  /** Whether the location is airside or landside */
  landside?: Maybe<Scalars['Boolean']['output']>;
  /** The name of the location */
  name?: Maybe<Scalars['String']['output']>;
  /** The terminal of the location */
  terminal?: Maybe<Scalars['String']['output']>;
};

export type LocationInput = {
  /** The city */
  city?: InputMaybe<Scalars['String']['input']>;
  /** The 3 character location code eg RMF */
  code?: InputMaybe<Scalars['String']['input']>;
  /** The country name */
  country: Scalars['String']['input'];
  /** An open standard file format used for representing geographical features and their attributes */
  geoJSON?: InputMaybe<GeoJsonInput>;
  /** The ISO country code */
  isoCountryCode?: InputMaybe<IsoCountryCode>;
  /** Whether the location is airside or landside */
  landside?: InputMaybe<Scalars['Boolean']['input']>;
  /** The name of the location */
  name?: InputMaybe<Scalars['String']['input']>;
  /** The terminal of the location */
  terminal?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptInvitation?: Maybe<Invitation>;
  addTagToOutlet?: Maybe<Outlet>;
  cancelBooking?: Maybe<Booking>;
  cancelInvitation?: Maybe<Invitation>;
  checkinBooking?: Maybe<Booking>;
  confirmBooking?: Maybe<Booking>;
  createBooking?: Maybe<Booking>;
  createEntitlement?: Maybe<Entitlement>;
  createInvitation?: Maybe<Invitation>;
  createOutlet?: Maybe<Outlet>;
  createPartnerBrand?: Maybe<PartnerBrand>;
  createProduct?: Maybe<Product>;
  declineBooking?: Maybe<Booking>;
  deleteBooking?: Maybe<Booking>;
  deleteEntitlement?: Maybe<Scalars['Boolean']['output']>;
  deleteOutlet?: Maybe<Outlet>;
  deletePartnerBrand?: Maybe<PartnerBrand>;
  deleteProduct?: Maybe<Product>;
  findAndCompleteBookings: Array<Booking>;
  /** This is used to generate a consumer, but if they are already created we will return their details */
  findOrCreateConsumer?: Maybe<Consumer>;
  /** This is used to generate a partner, but if they are already created we will return their details */
  findOrCreatePartner?: Maybe<Partner>;
  /** Link the currently logged in cergea consumer account to an existing Collinson account */
  linkAccount?: Maybe<LinkedAccount>;
  /**
   * A partner is limited to view the bookings of certain experiences, this allows you to link an
   * experience to the partner record so they can view bookings for that experience.
   */
  linkExperience?: Maybe<Partner>;
  noShowBooking?: Maybe<Booking>;
  payForBooking?: Maybe<Booking>;
  redeemEntitlement?: Maybe<Entitlement>;
  unlinkExperience?: Maybe<Partner>;
  /** Change or update the consumer record with additional information */
  updateConsumer?: Maybe<Consumer>;
  updateEntitlement?: Maybe<Entitlement>;
  updateOutlet?: Maybe<Outlet>;
  updatePartner?: Maybe<Partner>;
  updatePartnerBrand?: Maybe<PartnerBrand>;
  updateProduct?: Maybe<Product>;
};

export type MutationAcceptInvitationArgs = {
  acceptInvitationInput: AcceptInvitationInput;
};

export type MutationAddTagToOutletArgs = {
  id: Scalars['ID']['input'];
  tag: Scalars['String']['input'];
};

export type MutationCancelBookingArgs = {
  id: Scalars['ID']['input'];
};

export type MutationCancelInvitationArgs = {
  id: Scalars['ID']['input'];
};

export type MutationCheckinBookingArgs = {
  id: Scalars['ID']['input'];
};

export type MutationConfirmBookingArgs = {
  id: Scalars['ID']['input'];
};

export type MutationCreateBookingArgs = {
  bookingInput?: InputMaybe<BookingInput>;
};

export type MutationCreateEntitlementArgs = {
  entitlementInput: EntitlementInput;
};

export type MutationCreateInvitationArgs = {
  invitationInput?: InputMaybe<InvitationInput>;
};

export type MutationCreateOutletArgs = {
  outletInput?: InputMaybe<OutletInput>;
};

export type MutationCreatePartnerBrandArgs = {
  partnerBrandInput?: InputMaybe<PartnerBrandInput>;
};

export type MutationCreateProductArgs = {
  productInput?: InputMaybe<ProductInput>;
};

export type MutationDeclineBookingArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteBookingArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteEntitlementArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteOutletArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeletePartnerBrandArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteProductArgs = {
  id: Scalars['ID']['input'];
};

export type MutationFindAndCompleteBookingsArgs = {
  status: BookingStatus;
};

export type MutationFindOrCreateConsumerArgs = {
  consumerInput?: InputMaybe<ConsumerInput>;
};

export type MutationFindOrCreatePartnerArgs = {
  partnerInput?: InputMaybe<PartnerInput>;
};

export type MutationLinkAccountArgs = {
  linkedAccountInput?: InputMaybe<LinkedAccountInput>;
};

export type MutationLinkExperienceArgs = {
  experienceKey?: InputMaybe<ExperienceKey>;
  partnerKey?: InputMaybe<PartnerKey>;
};

export type MutationNoShowBookingArgs = {
  id: Scalars['ID']['input'];
};

export type MutationPayForBookingArgs = {
  id: Scalars['ID']['input'];
  paymentInput?: InputMaybe<PaymentInput>;
};

export type MutationRedeemEntitlementArgs = {
  id: Scalars['ID']['input'];
  redeemedProduct: EntitlementProductType;
};

export type MutationUnlinkExperienceArgs = {
  experienceKey?: InputMaybe<ExperienceKey>;
  partnerKey?: InputMaybe<PartnerKey>;
};

export type MutationUpdateConsumerArgs = {
  consumerInput?: InputMaybe<ConsumerInput>;
};

export type MutationUpdateEntitlementArgs = {
  entitlementInput: EntitlementInput;
  id: Scalars['ID']['input'];
};

export type MutationUpdateOutletArgs = {
  id: Scalars['ID']['input'];
  outletInput?: InputMaybe<OutletInput>;
};

export type MutationUpdatePartnerArgs = {
  partnerInput?: InputMaybe<PartnerInput>;
};

export type MutationUpdatePartnerBrandArgs = {
  id: Scalars['ID']['input'];
  partnerBrandInput?: InputMaybe<PartnerBrandInput>;
};

export type MutationUpdateProductArgs = {
  id: Scalars['ID']['input'];
  productInput?: InputMaybe<ProductInput>;
};

export type OpeningTimes = {
  __typename?: 'OpeningTimes';
  /** The opening times expection text. This will be deprecated in favour of variations */
  exceptions?: Maybe<Scalars['String']['output']>;
  /** The standard opening time schedules */
  schedules?: Maybe<DaySchedules>;
  /** The variations to the standard opening times */
  variations?: Maybe<Array<Maybe<Variation>>>;
};

export type OpeningTimesInput = {
  /** The opening times expection text. This will be deprecated in favour of variations */
  exceptions?: InputMaybe<Scalars['String']['input']>;
  /** The standard opening time schedules */
  schedules?: InputMaybe<DaySchedulesInput>;
  /** The variations to the standard opening times */
  variations?: InputMaybe<Array<InputMaybe<VariationInput>>>;
};

export type Operator = {
  __typename?: 'Operator';
  experiences?: Maybe<Array<Maybe<Experience>>>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type Outlet = {
  __typename?: 'Outlet';
  /** The category of outlet eg AIRPORT, FERRY_STATION, RAILWAY_STATION */
  category: OutletCategory;
  /** The content data from Contentful */
  content?: Maybe<OutletContent>;
  /** Whether the outlet has disabled access */
  hasDisabledAccess: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  /** The legacy code of the outlet (Lounge Code) eg LHR13 */
  legacyCode?: Maybe<Scalars['String']['output']>;
  /** The location of the outlet */
  location: Location;
  /** The name of the outlet */
  name: Scalars['String']['output'];
  /** The opening times of the outlet */
  openingTimes?: Maybe<OpeningTimes>;
  /** The partner brand of the outlet */
  partnerBrand: PartnerBrand;
  /** A list of products available at the outlet */
  products: Array<Maybe<Product>>;
  /** The email address for reservations */
  reservationEmail?: Maybe<Scalars['String']['output']>;
  /** The Salesforce ID of the outlet */
  salesforceID: Scalars['String']['output'];
  /** The status of the outlet whether it is active or not */
  status: OutletStatus;
  /** The tags associated with the outlet. These are used for filtering */
  tags: Array<Maybe<Scalars['String']['output']>>;
  /** The tier of the outlet for example Gold or Black */
  tier?: Maybe<Scalars['String']['output']>;
};

export enum OutletCategory {
  Airport = 'AIRPORT',
  FerryStation = 'FERRY_STATION',
  RailwayStation = 'RAILWAY_STATION',
}

export type OutletContent = {
  __typename?: 'OutletContent';
  sys: Sys;
};

export type OutletInput = {
  /** The category of outlet eg AIRPORT, FERRY_STATION, RAILWAY_STATION */
  category: OutletCategory;
  /** Whether the outlet has disabled access */
  hasDisabledAccess: Scalars['Boolean']['input'];
  /** The legacy code of the outlet (Lounge Code) eg LHR13 */
  legacyCode?: InputMaybe<Scalars['String']['input']>;
  /** The location of the outlet */
  location: LocationInput;
  /** The name of the outlet */
  name: Scalars['String']['input'];
  /** The opening times of the outlet */
  openingTimes?: InputMaybe<OpeningTimesInput>;
  /** The partner brand of the outlet */
  partnerBrand: PartnerBrandKey;
  /** The email address for reservations */
  reservationEmail?: InputMaybe<Scalars['String']['input']>;
  /** The Salesforce ID of the outlet */
  salesforceID: Scalars['String']['input'];
  /** The status of the outlet whether it is active or not */
  status: OutletStatus;
  /** The tags associated with the outlet. These are used for filtering */
  tags: Array<InputMaybe<Scalars['String']['input']>>;
  /** The tier of the outlet for example Gold or Black */
  tier?: InputMaybe<Scalars['String']['input']>;
};

export type OutletKey = {
  id: Scalars['ID']['input'];
};

export enum OutletProductAccessType {
  Reservation = 'RESERVATION',
  ReservationFeeOnly = 'RESERVATION_FEE_ONLY',
  WalkUp = 'WALK_UP',
}

export enum OutletStatus {
  Live = 'LIVE',
}

export type Partner = {
  __typename?: 'Partner';
  createdAt: Scalars['Date']['output'];
  emailAddress: Scalars['String']['output'];
  experiences: Array<Experience>;
  firstName?: Maybe<Scalars['String']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
};

export type PartnerBrand = {
  __typename?: 'PartnerBrand';
  id: Scalars['ID']['output'];
  /** The name of the partner brand */
  name: Scalars['String']['output'];
  outlets: Array<Maybe<Outlet>>;
  /** The salesforce ID of the partner brand */
  salesforceID: Scalars['String']['output'];
};

export type PartnerBrandInput = {
  /** The name of the partner brand */
  name: Scalars['String']['input'];
  /** The salesforce ID of the partner brand */
  salesforceID: Scalars['String']['input'];
};

export type PartnerBrandKey = {
  id: Scalars['ID']['input'];
};

export type PartnerInput = {
  emailAddress: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type PartnerKey = {
  id: Scalars['ID']['input'];
};

export type PaymentInput = {
  orderID?: InputMaybe<Scalars['String']['input']>;
  stripePaymentID?: InputMaybe<Scalars['String']['input']>;
};

export type Product = {
  __typename?: 'Product';
  /** The access type of the product */
  accessType: OutletProductAccessType;
  /** The product category */
  category: ProductCategory;
  /** A list of costs for the product by programme */
  costs: Array<Maybe<ProductCost>>;
  id: Scalars['ID']['output'];
  /** The product name generated from the accessType */
  name: Scalars['String']['output'];
  /** The outlet associated with the product */
  outlet?: Maybe<Outlet>;
  /** The Stripe ID of the product */
  ppStripeID?: Maybe<Scalars['String']['output']>;
  /** A list of sale prices for the product by programme */
  salePrices: Array<Maybe<ProductSalePrice>>;
  /** The relevant Salesforce ID of the product */
  salesforceID: Scalars['String']['output'];
  /** The stage of the product based on Saleforce stage */
  stage: ProductStage;
  /** The status of the product whether it is active or not */
  status: ProductStatus;
  /** The tags associated with the product. These are used for filtering */
  tags: Array<Maybe<Scalars['String']['output']>>;
  /** The product tier for example Gold or Black */
  tier?: Maybe<Scalars['String']['output']>;
};

export enum ProductCategory {
  Eat = 'EAT',
  Lounge = 'LOUNGE',
  Refresh = 'REFRESH',
  Rest = 'REST',
  Unwind = 'UNWIND',
}

export type ProductCost = {
  __typename?: 'ProductCost';
  /** The cost to the partner when pricing type is flat */
  cost?: Maybe<Scalars['Float']['output']>;
  /** The currency of the cost eg GBP */
  costCurrency: Scalars['String']['output'];
  /** The tax percentage to be applied to the cost for example 20% VAT in the UK */
  defaultTaxPercentage: Scalars['Int']['output'];
  /** The programme this cost is for */
  programme: Programme;
  /** The cost to the partner when pricing type is variable */
  projectedCost?: Maybe<Scalars['Float']['output']>;
  /** The cost type either flat or tiered */
  type: ProductCostType;
};

export type ProductCostInput = {
  /** The cost to the partner when pricing type is flat */
  cost?: InputMaybe<Scalars['Float']['input']>;
  /** The currency of the cost eg GBP */
  costCurrency: Scalars['String']['input'];
  /** The tax percentage to be applied to the cost for example 20% VAT in the UK */
  defaultTaxPercentage: Scalars['Int']['input'];
  /** The programme this cost is for */
  programme: Programme;
  /** The cost to the partner when pricing type is variable */
  projectedCost?: InputMaybe<Scalars['Float']['input']>;
  /** The cost type either flat or tiered */
  type: ProductCostType;
};

export enum ProductCostType {
  Flat = 'FLAT',
  Tiered = 'TIERED',
}

export type ProductInput = {
  /** The access type of the product */
  accessType: OutletProductAccessType;
  /** The product category */
  category: ProductCategory;
  /** A list of costs for the product by programme */
  costs: Array<InputMaybe<ProductCostInput>>;
  /** The product name generated from the accessType */
  name: Scalars['String']['input'];
  /** The Outlet ID of the product */
  outlet: OutletKey;
  /** The Stripe ID of the product */
  ppStripeID: Scalars['String']['input'];
  /** A list of sale prices for the product by programme */
  salePrices: Array<InputMaybe<ProductSalePriceInput>>;
  /** The relevant Salesforce ID of the product */
  salesforceID: Scalars['String']['input'];
  /** The stage of the product based on Saleforce stage */
  stage: ProductStage;
  /** The status of the product whether it is active or not */
  status: ProductStatus;
  /** The tags associated with the product. These are used for filtering */
  tags: Array<InputMaybe<Scalars['String']['input']>>;
  /** The product tier for example Gold or Black */
  tier?: InputMaybe<Scalars['String']['input']>;
};

export type ProductKey = {
  id: Scalars['ID']['input'];
};

export type ProductSalePrice = {
  __typename?: 'ProductSalePrice';
  /** The programme this sale price is for */
  programme: Programme;
  /** The sale price to the customer */
  salePrice: Scalars['Float']['output'];
  /** The currency of the sale price eg GBP */
  salePriceCurrency: Scalars['String']['output'];
  /** The Stripe ID of the price */
  stripePriceID?: Maybe<Scalars['String']['output']>;
};

export type ProductSalePriceInput = {
  /** The programme this sale price is for */
  programme: Programme;
  /** The sale price to the customer */
  salePrice: Scalars['Float']['input'];
  /** The currency of the sale price eg GBP */
  salePriceCurrency: Scalars['String']['input'];
  /** The Stripe ID of the price */
  stripePriceID?: InputMaybe<Scalars['String']['input']>;
};

export enum ProductStage {
  Closed = 'CLOSED',
  Declined = 'DECLINED',
  Draft = 'DRAFT',
  Live = 'LIVE',
  Onboarding = 'ONBOARDING',
}

export enum ProductStatus {
  Active = 'ACTIVE',
  Disabled = 'DISABLED',
}

export enum ProductType {
  Lounge = 'Lounge',
}

export enum Programme {
  Lk = 'LK',
  Lp = 'LP',
  Pp = 'PP',
}

export type Query = {
  __typename?: 'Query';
  getAvailableSlots: Availability;
  getBookingByID?: Maybe<Booking>;
  getBookings: Array<Booking>;
  getConsumer?: Maybe<Consumer>;
  getConsumerByEmailAddress?: Maybe<Consumer>;
  getConsumerByID?: Maybe<Consumer>;
  getEntitlement?: Maybe<Entitlement>;
  getEntitlements: Array<Entitlement>;
  getExperienceByID?: Maybe<Experience>;
  getFlightDetails: Array<FlightDetails>;
  getInvitationByID?: Maybe<Invitation>;
  getInvitations: Array<Invitation>;
  getOutletByID?: Maybe<Outlet>;
  getOutlets?: Maybe<Array<Maybe<Outlet>>>;
  getPartner?: Maybe<Partner>;
  getPartnerBrandByID?: Maybe<PartnerBrand>;
  getPartnerBrands?: Maybe<Array<Maybe<PartnerBrand>>>;
  getPartnerByEmailAddress?: Maybe<Partner>;
  getPartnerByID?: Maybe<Partner>;
  getProductByID?: Maybe<Product>;
  isInvitationTokenValid?: Maybe<Scalars['Boolean']['output']>;
  searchExperiences?: Maybe<Array<Maybe<Experience>>>;
};

export type QueryGetAvailableSlotsArgs = {
  data?: InputMaybe<AvailabilityInput>;
};

export type QueryGetBookingByIdArgs = {
  id: Scalars['ID']['input'];
};

export type QueryGetBookingsArgs = {
  experienceID: Scalars['ID']['input'];
  status?: InputMaybe<BookingStatus>;
};

export type QueryGetConsumerByEmailAddressArgs = {
  emailAddress: Scalars['String']['input'];
};

export type QueryGetConsumerByIdArgs = {
  id: Scalars['ID']['input'];
};

export type QueryGetEntitlementArgs = {
  id: Scalars['ID']['input'];
};

export type QueryGetEntitlementsArgs = {
  filter?: InputMaybe<GetEntitlementsFilter>;
};

export type QueryGetExperienceByIdArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetFlightDetailsArgs = {
  flightDetails?: InputMaybe<FlightDetailsInput>;
};

export type QueryGetInvitationByIdArgs = {
  id: Scalars['ID']['input'];
};

export type QueryGetInvitationsArgs = {
  experienceID?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryGetOutletByIdArgs = {
  id: Scalars['ID']['input'];
};

export type QueryGetOutletsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryGetPartnerBrandByIdArgs = {
  id: Scalars['ID']['input'];
};

export type QueryGetPartnerBrandsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryGetPartnerByEmailAddressArgs = {
  emailAddress: Scalars['String']['input'];
};

export type QueryGetPartnerByIdArgs = {
  id: Scalars['ID']['input'];
};

export type QueryGetProductByIdArgs = {
  id: Scalars['ID']['input'];
};

export type QueryIsInvitationTokenValidArgs = {
  inviteToken: Scalars['String']['input'];
};

export type QuerySearchExperiencesArgs = {
  geoLocation?: InputMaybe<GeoQueryInput>;
  query?: InputMaybe<Scalars['String']['input']>;
  searchFilter?: InputMaybe<SearchFilterInput>;
};

export type Redemption = {
  __typename?: 'Redemption';
  defaultMaxGuests?: Maybe<Scalars['Int']['output']>;
  defaultRedemptionTypeCode?: Maybe<Scalars['String']['output']>;
  isGuestAllowed?: Maybe<Scalars['Boolean']['output']>;
};

export type Schedule = {
  __typename?: 'Schedule';
  /** The end time of the schedule */
  endTime: Scalars['String']['output'];
  /** The start time of the schedule */
  startTime: Scalars['String']['output'];
};

export type ScheduleInput = {
  /** The end time of the schedule */
  endTime: Scalars['String']['input'];
  /** The start time of the schedule */
  startTime: Scalars['String']['input'];
};

export type SearchFilter = {
  __typename?: 'SearchFilter';
  attribute?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type SearchFilterInput = {
  attribute?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type Slots = {
  __typename?: 'Slots';
  endDate?: Maybe<Scalars['Date']['output']>;
  maxDuration?: Maybe<Scalars['String']['output']>;
  startDate?: Maybe<Scalars['Date']['output']>;
};

export type Sys = {
  __typename?: 'Sys';
  id: Scalars['String']['output'];
  locale?: Maybe<Scalars['String']['output']>;
};

export enum TimezoneType {
  Local = 'LOCAL',
  Utc = 'UTC',
}

export type Variation = {
  __typename?: 'Variation';
  date: Scalars['String']['output'];
  type: VariationType;
};

export type VariationInput = {
  date: Scalars['String']['input'];
  type: VariationType;
};

export enum VariationType {
  Annual = 'ANNUAL',
  DateSpecific = 'DATE_SPECIFIC',
}

export type AcceptInvitationMutationVariables = Exact<{
  acceptInvitationInput: AcceptInvitationInput;
}>;

export type AcceptInvitationMutation = {
  __typename?: 'Mutation';
  acceptInvitation?: {
    __typename?: 'Invitation';
    createdAt: any;
    expiresAt: any;
    inviteeEmail: string;
    updatedAt: any;
    id: string;
    experience?: { __typename?: 'Experience'; id: string } | null;
  } | null;
};

export type CancelBookingMutationVariables = Exact<{
  cancelBookingId: Scalars['ID']['input'];
}>;

export type CancelBookingMutation = {
  __typename?: 'Mutation';
  cancelBooking?: {
    __typename?: 'Booking';
    bookedFrom: string;
    bookedTo: string;
    createdAt: any;
    id: string;
    status: BookingStatus;
    updatedAt: any;
    consumer?: { __typename?: 'Consumer'; id: string } | null;
    experience?: { __typename?: 'Experience'; id: string } | null;
  } | null;
};

export type CheckinBookingMutationVariables = Exact<{
  checkinBookingId: Scalars['ID']['input'];
}>;

export type CheckinBookingMutation = {
  __typename?: 'Mutation';
  checkinBooking?: {
    __typename?: 'Booking';
    bookedFrom: string;
    bookedTo: string;
    createdAt: any;
    id: string;
    status: BookingStatus;
    updatedAt: any;
    consumer?: { __typename?: 'Consumer'; id: string } | null;
  } | null;
};

export type ConfirmBookingMutationVariables = Exact<{
  confirmBookingId: Scalars['ID']['input'];
}>;

export type ConfirmBookingMutation = {
  __typename?: 'Mutation';
  confirmBooking?: {
    __typename?: 'Booking';
    bookedFrom: string;
    bookedTo: string;
    createdAt: any;
    id: string;
    status: BookingStatus;
    updatedAt: any;
    consumer?: { __typename?: 'Consumer'; id: string } | null;
    experience?: { __typename?: 'Experience'; id: string } | null;
  } | null;
};

export type CreateBookingMutationVariables = Exact<{
  bookingInput?: InputMaybe<BookingInput>;
}>;

export type CreateBookingMutation = {
  __typename?: 'Mutation';
  createBooking?: {
    __typename?: 'Booking';
    bookedFrom: string;
    bookedTo: string;
    id: string;
    status: BookingStatus;
    updatedAt: any;
    consumer?: { __typename?: 'Consumer'; id: string } | null;
    experience?: { __typename?: 'Experience'; id: string } | null;
  } | null;
};

export type DeclineBookingMutationVariables = Exact<{
  declineBookingId: Scalars['ID']['input'];
}>;

export type DeclineBookingMutation = {
  __typename?: 'Mutation';
  declineBooking?: {
    __typename?: 'Booking';
    bookedFrom: string;
    bookedTo: string;
    createdAt: any;
    id: string;
    status: BookingStatus;
    updatedAt: any;
    consumer?: { __typename?: 'Consumer'; id: string } | null;
    experience?: { __typename?: 'Experience'; id: string } | null;
  } | null;
};

export type DeleteBookingMutationVariables = Exact<{
  deleteBookingId: Scalars['ID']['input'];
}>;

export type DeleteBookingMutation = {
  __typename?: 'Mutation';
  deleteBooking?: {
    __typename?: 'Booking';
    bookedTo: string;
    bookedFrom: string;
    createdAt: any;
    status: BookingStatus;
    id: string;
    updatedAt: any;
    consumer?: { __typename?: 'Consumer'; id: string } | null;
    experience?: { __typename?: 'Experience'; id: string } | null;
  } | null;
};

export type FindOrCreateConsumerMutationVariables = Exact<{
  consumerInput?: InputMaybe<ConsumerInput>;
}>;

export type FindOrCreateConsumerMutation = {
  __typename?: 'Mutation';
  findOrCreateConsumer?: { __typename?: 'Consumer'; id: string } | null;
};

export type LinkAccountMutationVariables = Exact<{
  linkedAccountInput?: InputMaybe<LinkedAccountInput>;
}>;

export type LinkAccountMutation = {
  __typename?: 'Mutation';
  linkAccount?: {
    __typename?: 'LinkedAccount';
    id: string;
    externalID: string;
    provider: LinkedAccountProvider;
    membershipID?: string | null;
    membershipType: string;
    createdAt: any;
    updatedAt: any;
    consumer: {
      __typename?: 'Consumer';
      id: string;
      fullName?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      dateOfBirth?: any | null;
      emailAddress: string;
      phone?: string | null;
      crmId?: string | null;
      createdAt: any;
      updatedAt: any;
      linkedAccounts: Array<{ __typename?: 'LinkedAccount'; id: string }>;
    };
  } | null;
};

export type UpdateConsumerMutationVariables = Exact<{
  consumerInput?: InputMaybe<ConsumerInput>;
}>;

export type UpdateConsumerMutation = {
  __typename?: 'Mutation';
  updateConsumer?: { __typename?: 'Consumer'; id: string } | null;
};

export type GetAvailableSlotsQueryVariables = Exact<{
  data: AvailabilityInput;
}>;

export type GetAvailableSlotsQuery = {
  __typename?: 'Query';
  getAvailableSlots: {
    __typename?: 'Availability';
    slots: Array<{
      __typename?: 'Slots';
      startDate?: any | null;
      endDate?: any | null;
      maxDuration?: string | null;
    }>;
  };
};

export type GetBookingByIdQueryVariables = Exact<{
  getBookingById: Scalars['ID']['input'];
}>;

export type GetBookingByIdQuery = {
  __typename?: 'Query';
  getBookingByID?: {
    __typename?: 'Booking';
    actingAccount?: string | null;
    bookedFrom: string;
    bookedTo: string;
    lastArrival: string;
    metadata?: any | null;
    reference: string;
    price?: number | null;
    price_currency?: string | null;
    guestAdultCount: number;
    guestChildrenCount: number;
    guestInfantCount: number;
    status: BookingStatus;
    id: string;
    consumer?: {
      __typename?: 'Consumer';
      emailAddress: string;
      fullName?: string | null;
      id: string;
    } | null;
    experience?: {
      __typename?: 'Experience';
      loungeName?: string | null;
      openingHours?: string | null;
      id: string;
      images?: Array<{
        __typename?: 'Image';
        altText?: string | null;
        contentType?: string | null;
        height?: number | null;
        id: string;
        url?: string | null;
        width?: number | null;
      } | null> | null;
      location?: {
        __typename?: 'LegacyLocation';
        airportName?: string | null;
        terminal?: string | null;
      } | null;
      pricing?: {
        __typename?: 'LegacyPricing';
        currency?: string | null;
        reservationOnlyFee?: number | null;
        reservationCost?: number | null;
      } | null;
    } | null;
  } | null;
};

export type GetBookingsQueryVariables = Exact<{
  status?: InputMaybe<BookingStatus>;
  experienceId: Scalars['ID']['input'];
}>;

export type GetBookingsQuery = {
  __typename?: 'Query';
  getBookings: Array<{
    __typename?: 'Booking';
    bookedFrom: string;
    bookedTo: string;
    createdAt: any;
    type: BookingType;
    metadata?: any | null;
    id: string;
    reference: string;
    guestAdultCount: number;
    guestChildrenCount: number;
    guestInfantCount: number;
    status: BookingStatus;
    updatedAt: any;
    consumer?: {
      __typename?: 'Consumer';
      emailAddress: string;
      firstName?: string | null;
      fullName?: string | null;
      id: string;
    } | null;
    experience?: {
      __typename?: 'Experience';
      id: string;
      loungeName?: string | null;
    } | null;
  }>;
};

export type GetBookingsOverviewQueryVariables = Exact<{
  status?: InputMaybe<BookingStatus>;
  experienceId: Scalars['ID']['input'];
}>;

export type GetBookingsOverviewQuery = {
  __typename?: 'Query';
  getBookings: Array<{ __typename?: 'Booking'; bookedFrom: string }>;
};

export type GetConsumerQueryVariables = Exact<{ [key: string]: never }>;

export type GetConsumerQuery = {
  __typename?: 'Query';
  getConsumer?: {
    __typename?: 'Consumer';
    id: string;
    crmId?: string | null;
    fullName?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    emailAddress: string;
    createdAt: any;
    updatedAt: any;
    bookings: Array<{
      __typename?: 'Booking';
      bookedFrom: string;
      bookedTo: string;
      createdAt: any;
      updatedAt: any;
      experience?: { __typename?: 'Experience'; id: string } | null;
    }>;
  } | null;
};

export type GetConsumerByEmailAddressQueryVariables = Exact<{
  emailAddress: Scalars['String']['input'];
}>;

export type GetConsumerByEmailAddressQuery = {
  __typename?: 'Query';
  getConsumerByEmailAddress?: { __typename?: 'Consumer'; id: string } | null;
};

export type GetConsumerByIdQueryVariables = Exact<{
  getConsumerById: Scalars['ID']['input'];
}>;

export type GetConsumerByIdQuery = {
  __typename?: 'Query';
  getConsumerByID?: {
    __typename?: 'Consumer';
    firstName?: string | null;
    lastName?: string | null;
    dateOfBirth?: any | null;
    createdAt: any;
    emailAddress: string;
    id: string;
    updatedAt: any;
    linkedAccounts: Array<{
      __typename?: 'LinkedAccount';
      membershipID?: string | null;
      membershipType: string;
      provider: LinkedAccountProvider;
      updatedAt: any;
      id: string;
      createdAt: any;
      analytics?: any | null;
      externalID: string;
    }>;
    bookings: Array<{
      __typename?: 'Booking';
      id: string;
      bookedFrom: string;
      bookedTo: string;
      status: BookingStatus;
      updatedAt: any;
      createdAt: any;
    }>;
  } | null;
};

export type GetExperienceByIdQueryVariables = Exact<{
  getExperienceById?: InputMaybe<Scalars['String']['input']>;
}>;

export type GetExperienceByIdQuery = {
  __typename?: 'Query';
  getExperienceByID?: {
    __typename?: 'Experience';
    id: string;
    loungeName?: string | null;
    loungeCode?: string | null;
    location?: {
      __typename?: 'LegacyLocation';
      airportName?: string | null;
      airportCode?: string | null;
      terminal?: string | null;
      terminalCode?: string | null;
      country?: string | null;
      city?: string | null;
      region?: string | null;
      isoCountryCode?: string | null;
      lbCountryCode?: string | null;
    } | null;
  } | null;
};

export type GetFlightDetailsQueryVariables = Exact<{
  flightDetails: FlightDetailsInput;
}>;

export type GetFlightDetailsQuery = {
  __typename?: 'Query';
  getFlightDetails: Array<{
    __typename?: 'FlightDetails';
    arrival?: {
      __typename?: 'Arrival';
      airport?: string | null;
      terminal?: string | null;
      dateTime?: {
        __typename?: 'FlightDateTime';
        local?: string | null;
        utc?: string | null;
      } | null;
    } | null;
    departure?: {
      __typename?: 'Departure';
      airport?: string | null;
      terminal?: string | null;
      dateTime?: {
        __typename?: 'FlightDateTime';
        local?: string | null;
        utc?: string | null;
      } | null;
    } | null;
  }>;
};

export type GetInvitationByIdQueryVariables = Exact<{
  getInvitationById: Scalars['ID']['input'];
}>;

export type GetInvitationByIdQuery = {
  __typename?: 'Query';
  getInvitationByID?: {
    __typename?: 'Invitation';
    createdAt: any;
    id: string;
    inviteeEmail: string;
    updatedAt: any;
    experience?: { __typename?: 'Experience'; id: string } | null;
  } | null;
};

export type GetOutletsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetOutletsQuery = {
  __typename?: 'Query';
  getOutlets?: Array<{
    __typename?: 'Outlet';
    category: OutletCategory;
    id: string;
    name: string;
    legacyCode?: string | null;
    status: OutletStatus;
    tags: Array<string | null>;
    location: {
      __typename?: 'Location';
      name?: string | null;
      terminal?: string | null;
    };
  } | null> | null;
};

export type GetPartnerBrandsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetPartnerBrandsQuery = {
  __typename?: 'Query';
  getPartnerBrands?: Array<{
    __typename?: 'PartnerBrand';
    id: string;
  } | null> | null;
};

export type GetPartnerByIdQueryVariables = Exact<{
  getPartnerById: Scalars['ID']['input'];
}>;

export type GetPartnerByIdQuery = {
  __typename?: 'Query';
  getPartnerByID?: {
    __typename?: 'Partner';
    id: string;
    lastName?: string | null;
    updatedAt: any;
    firstName?: string | null;
    fullName?: string | null;
    createdAt: any;
    emailAddress: string;
    experiences: Array<{
      __typename?: 'Experience';
      id: string;
      loungeName?: string | null;
      location?: {
        __typename?: 'LegacyLocation';
        airportName?: string | null;
        terminal?: string | null;
      } | null;
    }>;
  } | null;
};

export type SearchExperiencesQueryVariables = Exact<{
  query?: InputMaybe<Scalars['String']['input']>;
  searchFilter?: InputMaybe<SearchFilterInput>;
}>;

export type SearchExperiencesQuery = {
  __typename?: 'Query';
  searchExperiences?: Array<{
    __typename?: 'Experience';
    id: string;
    loungeName?: string | null;
    loungeCode?: string | null;
    partnerIdProd?: string | null;
    partnerIdTest?: string | null;
    partnerIntegrationId?: string | null;
    facilities?: Array<string | null> | null;
    openingHours?: string | null;
    conditions?: string | null;
    directions?: string | null;
    location?: {
      __typename?: 'LegacyLocation';
      airportName?: string | null;
      airportCode?: string | null;
      city?: string | null;
      country?: string | null;
      terminal?: string | null;
      timezone?: string | null;
    } | null;
    pricing?: {
      __typename?: 'LegacyPricing';
      pricingType?: string | null;
      currency?: string | null;
      reservationCost?: number | null;
      lifestyleXReservationCharge?: number | null;
      walkInCostCurrentPPRate?: number | null;
      lifestyleXWalkInCharge?: number | null;
      vat?: number | null;
      reservationOnlyFeeCost?: number | null;
      reservationOnlyFee?: number | null;
    } | null;
    images?: Array<{
      __typename?: 'Image';
      altText?: string | null;
      url?: string | null;
      height?: number | null;
      width?: number | null;
      id: string;
    } | null> | null;
  } | null> | null;
};

export type IsInvitationTokenValidQueryVariables = Exact<{
  inviteToken: Scalars['String']['input'];
}>;

export type IsInvitationTokenValidQuery = {
  __typename?: 'Query';
  isInvitationTokenValid?: boolean | null;
};

export const AcceptInvitationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AcceptInvitation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'acceptInvitationInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'AcceptInvitationInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'acceptInvitation' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'acceptInvitationInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'acceptInvitationInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'experience' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'expiresAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'inviteeEmail' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AcceptInvitationMutation,
  AcceptInvitationMutationVariables
>;
export const CancelBookingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'cancelBooking' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'cancelBookingId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cancelBooking' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'cancelBookingId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'bookedFrom' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bookedTo' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'consumer' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'experience' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CancelBookingMutation,
  CancelBookingMutationVariables
>;
export const CheckinBookingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CheckinBooking' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'checkinBookingId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'checkinBooking' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'checkinBookingId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'bookedFrom' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bookedTo' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'consumer' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CheckinBookingMutation,
  CheckinBookingMutationVariables
>;
export const ConfirmBookingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ConfirmBooking' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'confirmBookingId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'confirmBooking' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'confirmBookingId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'bookedFrom' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bookedTo' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'consumer' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'experience' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ConfirmBookingMutation,
  ConfirmBookingMutationVariables
>;
export const CreateBookingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateBooking' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'bookingInput' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'BookingInput' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createBooking' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'bookingInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'bookingInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'bookedFrom' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bookedTo' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'consumer' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'experience' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateBookingMutation,
  CreateBookingMutationVariables
>;
export const DeclineBookingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeclineBooking' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'declineBookingId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'declineBooking' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'declineBookingId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'bookedFrom' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bookedTo' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'consumer' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'experience' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeclineBookingMutation,
  DeclineBookingMutationVariables
>;
export const DeleteBookingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteBooking' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'deleteBookingId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteBooking' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'deleteBookingId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'bookedTo' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bookedFrom' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'consumer' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'experience' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteBookingMutation,
  DeleteBookingMutationVariables
>;
export const FindOrCreateConsumerDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'FindOrCreateConsumer' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'consumerInput' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'ConsumerInput' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'findOrCreateConsumer' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'consumerInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'consumerInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FindOrCreateConsumerMutation,
  FindOrCreateConsumerMutationVariables
>;
export const LinkAccountDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'LinkAccount' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'linkedAccountInput' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'LinkedAccountInput' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'linkAccount' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'linkedAccountInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'linkedAccountInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'externalID' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'consumer' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'fullName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'firstName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lastName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'dateOfBirth' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'emailAddress' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'crmId' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'linkedAccounts' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'updatedAt' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'provider' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'membershipID' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'membershipType' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LinkAccountMutation, LinkAccountMutationVariables>;
export const UpdateConsumerDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateConsumer' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'consumerInput' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'ConsumerInput' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateConsumer' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'consumerInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'consumerInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateConsumerMutation,
  UpdateConsumerMutationVariables
>;
export const GetAvailableSlotsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAvailableSlots' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'AvailabilityInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getAvailableSlots' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'slots' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'startDate' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'endDate' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'maxDuration' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetAvailableSlotsQuery,
  GetAvailableSlotsQueryVariables
>;
export const GetBookingByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetBookingById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'getBookingById' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getBookingByID' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'getBookingById' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'actingAccount' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'bookedFrom' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bookedTo' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lastArrival' } },
                { kind: 'Field', name: { kind: 'Name', value: 'metadata' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reference' } },
                { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'price_currency' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'guestAdultCount' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'guestChildrenCount' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'guestInfantCount' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'consumer' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'emailAddress' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'fullName' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'experience' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'loungeName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'openingHours' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'images' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'altText' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'contentType' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'height' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'url' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'width' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'location' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'airportName' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'terminal' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pricing' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'currency' },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'reservationOnlyFee',
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'reservationCost' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetBookingByIdQuery, GetBookingByIdQueryVariables>;
export const GetBookingsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetBookings' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'status' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'BookingStatus' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'experienceId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getBookings' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'status' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'status' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'experienceID' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'experienceId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'bookedFrom' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bookedTo' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'metadata' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reference' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'guestAdultCount' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'guestChildrenCount' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'guestInfantCount' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'consumer' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'emailAddress' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'firstName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'fullName' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'experience' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'loungeName' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetBookingsQuery, GetBookingsQueryVariables>;
export const GetBookingsOverviewDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetBookingsOverview' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'status' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'BookingStatus' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'experienceId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getBookings' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'status' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'status' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'experienceID' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'experienceId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'bookedFrom' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetBookingsOverviewQuery,
  GetBookingsOverviewQueryVariables
>;
export const GetConsumerDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetConsumer' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getConsumer' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'crmId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fullName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'emailAddress' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'bookings' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'bookedFrom' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'bookedTo' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'updatedAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'experience' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetConsumerQuery, GetConsumerQueryVariables>;
export const GetConsumerByEmailAddressDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetConsumerByEmailAddress' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'emailAddress' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getConsumerByEmailAddress' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'emailAddress' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'emailAddress' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetConsumerByEmailAddressQuery,
  GetConsumerByEmailAddressQueryVariables
>;
export const GetConsumerByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetConsumerByID' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'getConsumerById' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getConsumerByID' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'getConsumerById' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'linkedAccounts' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'membershipID' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'membershipType' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'provider' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'updatedAt' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'analytics' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'externalID' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'bookings' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'bookedFrom' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'bookedTo' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'status' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'updatedAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'dateOfBirth' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'emailAddress' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetConsumerByIdQuery,
  GetConsumerByIdQueryVariables
>;
export const GetExperienceByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetExperienceByID' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'getExperienceById' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getExperienceByID' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'getExperienceById' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'loungeName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'loungeCode' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'location' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'airportName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'airportCode' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'terminal' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'terminalCode' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'country' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'region' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'isoCountryCode' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lbCountryCode' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetExperienceByIdQuery,
  GetExperienceByIdQueryVariables
>;
export const GetFlightDetailsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetFlightDetails' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'flightDetails' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'FlightDetailsInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getFlightDetails' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'flightDetails' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'flightDetails' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'arrival' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'airport' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'terminal' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'dateTime' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'local' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'utc' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'departure' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'airport' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'terminal' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'dateTime' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'local' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'utc' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetFlightDetailsQuery,
  GetFlightDetailsQueryVariables
>;
export const GetInvitationByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetInvitationByID' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'getInvitationById' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getInvitationByID' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'getInvitationById' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'experience' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'inviteeEmail' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetInvitationByIdQuery,
  GetInvitationByIdQueryVariables
>;
export const GetOutletsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetOutlets' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getOutlets' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'category' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'legacyCode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'location' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'terminal' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetOutletsQuery, GetOutletsQueryVariables>;
export const GetPartnerBrandsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPartnerBrands' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getPartnerBrands' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetPartnerBrandsQuery,
  GetPartnerBrandsQueryVariables
>;
export const GetPartnerByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPartnerByID' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'getPartnerById' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getPartnerByID' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'getPartnerById' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'experiences' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'loungeName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'location' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'airportName' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'terminal' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fullName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'emailAddress' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetPartnerByIdQuery, GetPartnerByIdQueryVariables>;
export const SearchExperiencesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SearchExperiences' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'query' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'searchFilter' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'SearchFilterInput' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'searchExperiences' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'query' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'query' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'searchFilter' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'searchFilter' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'loungeName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'loungeCode' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'location' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'airportName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'airportCode' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'country' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'terminal' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'timezone' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'partnerIdProd' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'partnerIdTest' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'partnerIntegrationId' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pricing' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pricingType' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'currency' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'reservationCost' },
                      },
                      {
                        kind: 'Field',
                        name: {
                          kind: 'Name',
                          value: 'lifestyleXReservationCharge',
                        },
                      },
                      {
                        kind: 'Field',
                        name: {
                          kind: 'Name',
                          value: 'walkInCostCurrentPPRate',
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lifestyleXWalkInCharge' },
                      },
                      {
                        kind: 'Field',
                        name: {
                          kind: 'Name',
                          value: 'lifestyleXReservationCharge',
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'vat' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'reservationOnlyFeeCost' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'reservationOnlyFee' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'facilities' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'openingHours' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'conditions' } },
                { kind: 'Field', name: { kind: 'Name', value: 'directions' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'images' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'altText' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'height' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SearchExperiencesQuery,
  SearchExperiencesQueryVariables
>;
export const IsInvitationTokenValidDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'IsInvitationTokenValid' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'inviteToken' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'isInvitationTokenValid' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'inviteToken' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'inviteToken' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  IsInvitationTokenValidQuery,
  IsInvitationTokenValidQueryVariables
>;
