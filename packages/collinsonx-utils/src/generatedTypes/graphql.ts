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
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  /**
   * A date-time string at UTC, such as 2007-12-03T10:15:30Z,
   *     compliant with the 'date-time' format outlined in section 5.6 of
   *     the RFC 3339 profile of the ISO 8601 standard for representation
   *     of dates and times using the Gregorian calendar.
   */
  DateTime: any;
  /** The 'Dimension' type represents dimensions as whole numeric values between `1` and `4000`. */
  Dimension: any;
  /** The 'HexColor' type represents color in `rgb:ffffff` string format. */
  HexColor: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  JSONObject: any;
  ObjectID: any;
  /** The 'Quality' type represents quality as whole numeric values between `1` and `100`. */
  Quality: any;
};

export type AcceptInvitationInput = {
  email: Scalars['String'];
  inviteToken: Scalars['String'];
  password: Scalars['String'];
};

export type Arrival = {
  __typename?: 'Arrival';
  airport?: Maybe<Scalars['String']>;
  dateTime?: Maybe<FlightDateTime>;
  terminal?: Maybe<Scalars['String']>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type Asset = {
  __typename?: 'Asset';
  contentType?: Maybe<Scalars['String']>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  fileName?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  linkedFrom?: Maybe<AssetLinkingCollections>;
  size?: Maybe<Scalars['Int']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetContentTypeArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetFileNameArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetHeightArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetSizeArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetTitleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetUrlArgs = {
  locale?: InputMaybe<Scalars['String']>;
  transform?: InputMaybe<ImageTransformOptions>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetWidthArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type AssetCollection = {
  __typename?: 'AssetCollection';
  items: Array<Maybe<Asset>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type AssetFilter = {
  AND?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  contentType?: InputMaybe<Scalars['String']>;
  contentType_contains?: InputMaybe<Scalars['String']>;
  contentType_exists?: InputMaybe<Scalars['Boolean']>;
  contentType_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentType_not?: InputMaybe<Scalars['String']>;
  contentType_not_contains?: InputMaybe<Scalars['String']>;
  contentType_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  fileName?: InputMaybe<Scalars['String']>;
  fileName_contains?: InputMaybe<Scalars['String']>;
  fileName_exists?: InputMaybe<Scalars['Boolean']>;
  fileName_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  fileName_not?: InputMaybe<Scalars['String']>;
  fileName_not_contains?: InputMaybe<Scalars['String']>;
  fileName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  height?: InputMaybe<Scalars['Int']>;
  height_exists?: InputMaybe<Scalars['Boolean']>;
  height_gt?: InputMaybe<Scalars['Int']>;
  height_gte?: InputMaybe<Scalars['Int']>;
  height_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  height_lt?: InputMaybe<Scalars['Int']>;
  height_lte?: InputMaybe<Scalars['Int']>;
  height_not?: InputMaybe<Scalars['Int']>;
  height_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  size?: InputMaybe<Scalars['Int']>;
  size_exists?: InputMaybe<Scalars['Boolean']>;
  size_gt?: InputMaybe<Scalars['Int']>;
  size_gte?: InputMaybe<Scalars['Int']>;
  size_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  size_lt?: InputMaybe<Scalars['Int']>;
  size_lte?: InputMaybe<Scalars['Int']>;
  size_not?: InputMaybe<Scalars['Int']>;
  size_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  url?: InputMaybe<Scalars['String']>;
  url_contains?: InputMaybe<Scalars['String']>;
  url_exists?: InputMaybe<Scalars['Boolean']>;
  url_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  url_not?: InputMaybe<Scalars['String']>;
  url_not_contains?: InputMaybe<Scalars['String']>;
  url_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  width?: InputMaybe<Scalars['Int']>;
  width_exists?: InputMaybe<Scalars['Boolean']>;
  width_gt?: InputMaybe<Scalars['Int']>;
  width_gte?: InputMaybe<Scalars['Int']>;
  width_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  width_lt?: InputMaybe<Scalars['Int']>;
  width_lte?: InputMaybe<Scalars['Int']>;
  width_not?: InputMaybe<Scalars['Int']>;
  width_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export type AssetLinkingCollections = {
  __typename?: 'AssetLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  outletContentCollection?: Maybe<OutletContentCollection>;
  outletForContentfulCollection?: Maybe<OutletForContentfulCollection>;
};

export type AssetLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export type AssetLinkingCollectionsOutletContentCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<
    Array<InputMaybe<AssetLinkingCollectionsOutletContentCollectionOrder>>
  >;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export type AssetLinkingCollectionsOutletForContentfulCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<
    Array<InputMaybe<AssetLinkingCollectionsOutletForContentfulCollectionOrder>>
  >;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum AssetLinkingCollectionsOutletContentCollectionOrder {
  FacilitiesAsc = 'facilities_ASC',
  FacilitiesDesc = 'facilities_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export enum AssetLinkingCollectionsOutletForContentfulCollectionOrder {
  CatalogueidAsc = 'catalogueid_ASC',
  CatalogueidDesc = 'catalogueid_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameoutletcontentfulAsc = 'nameoutletcontentful_ASC',
  NameoutletcontentfulDesc = 'nameoutletcontentful_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export enum AssetOrder {
  ContentTypeAsc = 'contentType_ASC',
  ContentTypeDesc = 'contentType_DESC',
  FileNameAsc = 'fileName_ASC',
  FileNameDesc = 'fileName_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC',
}

export type Availability = {
  __typename?: 'Availability';
  messageID?: Maybe<Scalars['String']>;
  slots: Array<Slots>;
  temporaryReservationID?: Maybe<Scalars['String']>;
};

export type AvailabilityInput = {
  flightInformation: FlightInformation;
  guests: Guests;
  product: LegacyProductInput;
};

/** A record for the sale of a service, this could be either a reservation, walkup or other state. */
export type Booking = {
  __typename?: 'Booking';
  actingAccount?: Maybe<Scalars['String']>;
  bookedFrom: Scalars['String'];
  bookedTo: Scalars['String'];
  consumer?: Maybe<Consumer>;
  createdAt: Scalars['Date'];
  experience?: Maybe<Experience>;
  guestAdultCount: Scalars['Int'];
  guestChildrenCount: Scalars['Int'];
  guestInfantCount: Scalars['Int'];
  id: Scalars['ID'];
  invoice?: Maybe<Scalars['String']>;
  lastArrival: Scalars['String'];
  metadata?: Maybe<Scalars['JSONObject']>;
  orderID?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  price_currency?: Maybe<Scalars['String']>;
  reference: Scalars['String'];
  status: BookingStatus;
  stripePaymentID?: Maybe<Scalars['String']>;
  type: BookingType;
  updatedAt: Scalars['Date'];
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
  value?: InputMaybe<Scalars['Int']>;
};

/** A record for the sale of a service, this could be either a reservation, walkup or other state. */
export type BookingGuestChildrenCountArgs = {
  value?: InputMaybe<Scalars['Int']>;
};

/** A record for the sale of a service, this could be either a reservation, walkup or other state. */
export type BookingGuestInfantCountArgs = {
  value?: InputMaybe<Scalars['Int']>;
};

/** A record for the sale of a service, this could be either a reservation, walkup or other state. */
export type BookingLastArrivalArgs = {
  timezoneType?: InputMaybe<TimezoneType>;
};

export type BookingInput = {
  actingAccount?: InputMaybe<Scalars['String']>;
  bookedFrom: Scalars['Date'];
  bookedTo: Scalars['Date'];
  experience: ExperienceKey;
  guestAdultCount?: Scalars['Int'];
  guestChildrenCount?: Scalars['Int'];
  guestInfantCount?: Scalars['Int'];
  invoice?: InputMaybe<Scalars['String']>;
  lastArrival?: InputMaybe<Scalars['Date']>;
  metadata?: InputMaybe<Scalars['JSONObject']>;
  stripePaymentID?: InputMaybe<Scalars['String']>;
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
  createdAt: Scalars['Date'];
  /** In salesforce we have a record of our consumer to manage their lifecycle and manage marketing */
  crmId?: Maybe<Scalars['String']>;
  dateOfBirth?: Maybe<Scalars['Date']>;
  /** Current a mandatory field as we use email as our primary login method */
  emailAddress: Scalars['String'];
  entitlements: Array<Entitlement>;
  firstName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  linkedAccounts: Array<LinkedAccount>;
  phone?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
};

export type ConsumerInput = {
  dateOfBirth?: InputMaybe<Scalars['Date']>;
  emailAddress: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  marketingConsent?: InputMaybe<Scalars['Boolean']>;
  phone?: InputMaybe<Scalars['String']>;
};

export type ContentfulMetadata = {
  __typename?: 'ContentfulMetadata';
  tags: Array<Maybe<ContentfulTag>>;
};

export type ContentfulMetadataFilter = {
  tags?: InputMaybe<ContentfulMetadataTagsFilter>;
  tags_exists?: InputMaybe<Scalars['Boolean']>;
};

export type ContentfulMetadataTagsFilter = {
  id_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/**
 * Represents a tag entity for finding and organizing content easily.
 *     Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-tags
 */
export type ContentfulTag = {
  __typename?: 'ContentfulTag';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
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
  airport?: Maybe<Scalars['String']>;
  dateTime?: Maybe<FlightDateTime>;
  terminal?: Maybe<Scalars['String']>;
};

export type Entitlement = {
  __typename?: 'Entitlement';
  consumer?: Maybe<Consumer>;
  createdAt: Scalars['Date'];
  expired: Scalars['Boolean'];
  expiryDate: Scalars['Date'];
  id: Scalars['ID'];
  issueDate: Scalars['Date'];
  redeemableProducts: Array<Maybe<EntitlementProductType>>;
  redeemed: Scalars['Boolean'];
  redeemedProduct?: Maybe<EntitlementProductType>;
  redemptionDate?: Maybe<Scalars['Date']>;
  updatedAt: Scalars['Date'];
};

export type EntitlementInput = {
  consumerID: Scalars['String'];
  expiryDate: Scalars['Date'];
  externalID: Scalars['String'];
  issueDate?: InputMaybe<Scalars['Date']>;
  redeemableProducts: Array<InputMaybe<EntitlementProductType>>;
  redeemed?: InputMaybe<Scalars['Boolean']>;
  redeemedProduct?: InputMaybe<EntitlementProductType>;
  redemptionDate?: InputMaybe<Scalars['Date']>;
};

export enum EntitlementProductType {
  Lounge = 'LOUNGE',
}

export type Entry = {
  contentfulMetadata: ContentfulMetadata;
  sys: Sys;
};

export type EntryCollection = {
  __typename?: 'EntryCollection';
  items: Array<Maybe<Entry>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type EntryFilter = {
  AND?: InputMaybe<Array<InputMaybe<EntryFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<EntryFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  sys?: InputMaybe<SysFilter>;
};

export enum EntryOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export type Experience = {
  __typename?: 'Experience';
  accessPeriod?: Maybe<Scalars['String']>;
  additionalInformation?: Maybe<Scalars['String']>;
  airsideLandside?: Maybe<Scalars['String']>;
  bookings: Array<Booking>;
  cergea?: Maybe<Scalars['Boolean']>;
  conditions?: Maybe<Scalars['String']>;
  directions?: Maybe<Scalars['String']>;
  exitDateIfUnderNotice?: Maybe<Scalars['Date']>;
  experience?: Maybe<ExperienceCategory>;
  facilities?: Maybe<Array<Maybe<Scalars['String']>>>;
  hasActiveLounges?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  images?: Maybe<Array<Maybe<Image>>>;
  invitations: Array<Invitation>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  lK?: Maybe<Scalars['Boolean']>;
  location?: Maybe<LegacyLocation>;
  loungeCode?: Maybe<Scalars['String']>;
  loungeName?: Maybe<Scalars['String']>;
  loungeOffers?: Maybe<Array<Maybe<Scalars['String']>>>;
  marketingCopy?: Maybe<Scalars['String']>;
  msDynamicsUID?: Maybe<Scalars['String']>;
  openingHours?: Maybe<Scalars['String']>;
  pP?: Maybe<Scalars['Boolean']>;
  partnerIdProd?: Maybe<Scalars['String']>;
  partnerIdTest?: Maybe<Scalars['String']>;
  partnerIntegrationId?: Maybe<Scalars['String']>;
  partners: Array<Partner>;
  passengerType?: Maybe<Scalars['String']>;
  ppboOperatorName?: Maybe<Scalars['String']>;
  pricing?: Maybe<LegacyPricing>;
  redemption?: Maybe<Redemption>;
  reservationOnlyFeeStripeProductID?: Maybe<Scalars['String']>;
  reservationRequestEmail?: Maybe<Scalars['String']>;
  reservationStripeProductID?: Maybe<Scalars['String']>;
  serviceCentre?: Maybe<Scalars['String']>;
  underNotice?: Maybe<Scalars['Boolean']>;
  uniqueValueKey?: Maybe<Scalars['String']>;
  videos?: Maybe<Array<Maybe<Scalars['String']>>>;
  walkUpStripeProductID?: Maybe<Scalars['String']>;
};

export enum ExperienceCategory {
  AirportExperience = 'AIRPORT_EXPERIENCE',
}

export type ExperienceKey = {
  id: Scalars['ID'];
};

export enum ExperienceType {
  Lounge = 'LOUNGE',
}

export type FlightDateTime = {
  __typename?: 'FlightDateTime';
  local?: Maybe<Scalars['String']>;
  utc?: Maybe<Scalars['String']>;
};

export type FlightDetails = {
  __typename?: 'FlightDetails';
  arrival?: Maybe<Arrival>;
  departure?: Maybe<Departure>;
};

export type FlightDetailsInput = {
  carrierCode: Scalars['String'];
  codeType: Scalars['String'];
  departureDate: Scalars['Date'];
  flightNumber: Scalars['String'];
  version: Scalars['String'];
};

export type FlightInformation = {
  airport?: InputMaybe<Scalars['String']>;
  dateTime: Scalars['Date'];
  terminal: Scalars['String'];
  type: Scalars['String'];
};

export type GeoJson = {
  __typename?: 'GeoJSON';
  coordinates: Array<Array<Array<Scalars['Float']>>>;
  type: Scalars['String'];
};

export type GeoJsonInput = {
  coordinates: Array<Array<Array<Scalars['Float']>>>;
  type: Scalars['String'];
};

export type GeoQueryInput = {
  lat?: InputMaybe<Scalars['Float']>;
  lng?: InputMaybe<Scalars['Float']>;
};

export type Geoloc = {
  __typename?: 'Geoloc';
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
};

export type GetEntitlementsFilter = {
  consumerID?: InputMaybe<Scalars['String']>;
  expired?: InputMaybe<Scalars['Boolean']>;
  redeemableProducts?: InputMaybe<EntitlementProductType>;
  redeemed?: InputMaybe<Scalars['Boolean']>;
  redeemedProduct?: InputMaybe<EntitlementProductType>;
};

export type Guests = {
  adultCount?: Scalars['Int'];
  childrenCount?: Scalars['Int'];
  infantCount?: Scalars['Int'];
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
  altText?: Maybe<Scalars['String']>;
  contentType?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  lastModified?: Maybe<Scalars['Date']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};

export enum ImageFormat {
  Avif = 'AVIF',
  /** JPG image format. */
  Jpg = 'JPG',
  /**
   * Progressive JPG format stores multiple passes of an image in progressively higher detail.
   *         When a progressive image is loading, the viewer will first see a lower quality pixelated version which
   *         will gradually improve in detail, until the image is fully downloaded. This is to display an image as
   *         early as possible to make the layout look as designed.
   */
  JpgProgressive = 'JPG_PROGRESSIVE',
  /** PNG image format */
  Png = 'PNG',
  /**
   * 8-bit PNG images support up to 256 colors and weigh less than the standard 24-bit PNG equivalent.
   *         The 8-bit PNG format is mostly used for simple images, such as icons or logos.
   */
  Png8 = 'PNG8',
  /** WebP image format. */
  Webp = 'WEBP',
}

export enum ImageResizeFocus {
  /** Focus the resizing on the bottom. */
  Bottom = 'BOTTOM',
  /** Focus the resizing on the bottom left. */
  BottomLeft = 'BOTTOM_LEFT',
  /** Focus the resizing on the bottom right. */
  BottomRight = 'BOTTOM_RIGHT',
  /** Focus the resizing on the center. */
  Center = 'CENTER',
  /** Focus the resizing on the largest face. */
  Face = 'FACE',
  /** Focus the resizing on the area containing all the faces. */
  Faces = 'FACES',
  /** Focus the resizing on the left. */
  Left = 'LEFT',
  /** Focus the resizing on the right. */
  Right = 'RIGHT',
  /** Focus the resizing on the top. */
  Top = 'TOP',
  /** Focus the resizing on the top left. */
  TopLeft = 'TOP_LEFT',
  /** Focus the resizing on the top right. */
  TopRight = 'TOP_RIGHT',
}

export enum ImageResizeStrategy {
  /** Crops a part of the original image to fit into the specified dimensions. */
  Crop = 'CROP',
  /** Resizes the image to the specified dimensions, cropping the image if needed. */
  Fill = 'FILL',
  /** Resizes the image to fit into the specified dimensions. */
  Fit = 'FIT',
  /**
   * Resizes the image to the specified dimensions, padding the image if needed.
   *         Uses desired background color as padding color.
   */
  Pad = 'PAD',
  /** Resizes the image to the specified dimensions, changing the original aspect ratio if needed. */
  Scale = 'SCALE',
  /** Creates a thumbnail from the image. */
  Thumb = 'THUMB',
}

export type ImageTransformOptions = {
  /**
   * Desired background color, used with corner radius or `PAD` resize strategy.
   *         Defaults to transparent (for `PNG`, `PNG8` and `WEBP`) or white (for `JPG` and `JPG_PROGRESSIVE`).
   */
  backgroundColor?: InputMaybe<Scalars['HexColor']>;
  /**
   * Desired corner radius in pixels.
   *         Results in an image with rounded corners (pass `-1` for a full circle/ellipse).
   *         Defaults to `0`. Uses desired background color as padding color,
   *         unless the format is `JPG` or `JPG_PROGRESSIVE` and resize strategy is `PAD`, then defaults to white.
   */
  cornerRadius?: InputMaybe<Scalars['Int']>;
  /** Desired image format. Defaults to the original image format. */
  format?: InputMaybe<ImageFormat>;
  /** Desired height in pixels. Defaults to the original image height. */
  height?: InputMaybe<Scalars['Dimension']>;
  /**
   * Desired quality of the image in percents.
   *         Used for `PNG8`, `JPG`, `JPG_PROGRESSIVE` and `WEBP` formats.
   */
  quality?: InputMaybe<Scalars['Quality']>;
  /** Desired resize focus area. Defaults to `CENTER`. */
  resizeFocus?: InputMaybe<ImageResizeFocus>;
  /** Desired resize strategy. Defaults to `FIT`. */
  resizeStrategy?: InputMaybe<ImageResizeStrategy>;
  /** Desired width in pixels. Defaults to the original image width. */
  width?: InputMaybe<Scalars['Dimension']>;
};

/** This allows us to send invitations for access, currently creating a partner account and linking it to an experience */
export type Invitation = {
  __typename?: 'Invitation';
  createdAt: Scalars['Date'];
  experience?: Maybe<Experience>;
  expiresAt: Scalars['Date'];
  id: Scalars['ID'];
  inviteeEmail: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type InvitationInput = {
  experience?: InputMaybe<ExperienceKey>;
  inviteeEmail: Scalars['String'];
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
  airportCode?: Maybe<Scalars['String']>;
  airportName?: Maybe<Scalars['String']>;
  cgTerminal?: Maybe<Scalars['String']>;
  cgTerminalCode?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  isoCountryCode?: Maybe<Scalars['String']>;
  lbCountryCode?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  terminal?: Maybe<Scalars['String']>;
  terminalAccessibility?: Maybe<Scalars['String']>;
  terminalCode?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
};

export type LegacyPricing = {
  __typename?: 'LegacyPricing';
  currency?: Maybe<Scalars['String']>;
  lifestyleXReservationCharge?: Maybe<Scalars['Float']>;
  lifestyleXWalkInCharge?: Maybe<Scalars['Float']>;
  pricingType?: Maybe<Scalars['String']>;
  reservationCost?: Maybe<Scalars['Float']>;
  reservationOnlyFee?: Maybe<Scalars['Float']>;
  reservationOnlyFeeCost?: Maybe<Scalars['Float']>;
  vat?: Maybe<Scalars['Int']>;
  walkInCostCurrentPPRate?: Maybe<Scalars['Float']>;
};

export type LegacyProductInput = {
  productID: Scalars['String'];
  productType?: InputMaybe<ProductType>;
  supplierCode: Scalars['String'];
};

/** A linked account is another account (typically external) that can be associated to the internal cergea consumer */
export type LinkedAccount = {
  __typename?: 'LinkedAccount';
  analytics?: Maybe<Scalars['JSONObject']>;
  consumer: Consumer;
  createdAt: Scalars['Date'];
  externalID: Scalars['String'];
  id: Scalars['ID'];
  membershipID?: Maybe<Scalars['String']>;
  membershipType: Scalars['String'];
  provider: LinkedAccountProvider;
  updatedAt: Scalars['Date'];
};

export type LinkedAccountInput = {
  analytics?: InputMaybe<Scalars['JSONObject']>;
  token: Scalars['String'];
};

export enum LinkedAccountProvider {
  LoungeKey = 'LOUNGE_KEY',
  PriorityPass = 'PRIORITY_PASS',
}

export type Location = {
  __typename?: 'Location';
  /** The city */
  city?: Maybe<Scalars['String']>;
  /** The 3 character location code eg RMF */
  code?: Maybe<Scalars['String']>;
  /** The country name */
  country: Scalars['String'];
  /** An open standard file format used for representing geographical features and their attributes */
  geoJSON?: Maybe<GeoJson>;
  /** The ISO country code */
  isoCountryCode?: Maybe<IsoCountryCode>;
  /** Whether the location is airside or landside */
  landside?: Maybe<Scalars['Boolean']>;
  /** The name of the location */
  name?: Maybe<Scalars['String']>;
  /** The terminal of the location */
  terminal?: Maybe<Scalars['String']>;
};

export type LocationInput = {
  /** The city */
  city?: InputMaybe<Scalars['String']>;
  /** The 3 character location code eg RMF */
  code?: InputMaybe<Scalars['String']>;
  /** The country name */
  country: Scalars['String'];
  /** An open standard file format used for representing geographical features and their attributes */
  geoJSON?: InputMaybe<GeoJsonInput>;
  /** The ISO country code */
  isoCountryCode?: InputMaybe<IsoCountryCode>;
  /** Whether the location is airside or landside */
  landside?: InputMaybe<Scalars['Boolean']>;
  /** The name of the location */
  name?: InputMaybe<Scalars['String']>;
  /** The terminal of the location */
  terminal?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptInvitation?: Maybe<Invitation>;
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
  deleteEntitlement?: Maybe<Scalars['Boolean']>;
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

export type MutationCancelBookingArgs = {
  id: Scalars['ID'];
};

export type MutationCancelInvitationArgs = {
  id: Scalars['ID'];
};

export type MutationCheckinBookingArgs = {
  id: Scalars['ID'];
};

export type MutationConfirmBookingArgs = {
  id: Scalars['ID'];
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
  id: Scalars['ID'];
};

export type MutationDeleteBookingArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteEntitlementArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteOutletArgs = {
  id: Scalars['ID'];
};

export type MutationDeletePartnerBrandArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteProductArgs = {
  id: Scalars['ID'];
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
  id: Scalars['ID'];
};

export type MutationPayForBookingArgs = {
  id: Scalars['ID'];
  paymentInput?: InputMaybe<PaymentInput>;
};

export type MutationRedeemEntitlementArgs = {
  id: Scalars['ID'];
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
  id: Scalars['ID'];
};

export type MutationUpdateOutletArgs = {
  id: Scalars['ID'];
  outletInput?: InputMaybe<OutletInput>;
};

export type MutationUpdatePartnerArgs = {
  partnerInput?: InputMaybe<PartnerInput>;
};

export type MutationUpdatePartnerBrandArgs = {
  id: Scalars['ID'];
  partnerBrandInput?: InputMaybe<PartnerBrandInput>;
};

export type MutationUpdateProductArgs = {
  id: Scalars['ID'];
  productInput?: InputMaybe<ProductInput>;
};

export type OpeningTimes = {
  __typename?: 'OpeningTimes';
  /** The opening times expection text. This will be deprecated in favour of variations */
  exceptions?: Maybe<Scalars['String']>;
  /** The standard opening time schedules */
  schedules?: Maybe<DaySchedules>;
  /** The variations to the standard opening times */
  variations?: Maybe<Array<Maybe<Variation>>>;
};

export type OpeningTimesInput = {
  /** The opening times expection text. This will be deprecated in favour of variations */
  exceptions?: InputMaybe<Scalars['String']>;
  /** The standard opening time schedules */
  schedules?: InputMaybe<DaySchedulesInput>;
  /** The variations to the standard opening times */
  variations?: InputMaybe<Array<InputMaybe<VariationInput>>>;
};

export type Operator = {
  __typename?: 'Operator';
  experiences?: Maybe<Array<Maybe<Experience>>>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type Outlet = {
  __typename?: 'Outlet';
  /** The content data from Contentful */
  content?: Maybe<OutletContent>;
  /** The type of outlet eg AIRPORT, FERRY_STATION, RAILWAY_STATION */
  contentType: OutletContentType;
  /** Whether the outlet has disabled access */
  hasDisabledAccess: Scalars['Boolean'];
  id: Scalars['ID'];
  /** The legacy code of the outlet (Lounge Code) eg LHR13 */
  legacyCode?: Maybe<Scalars['String']>;
  /** The location of the outlet */
  location: Location;
  /** The name of the outlet */
  name: Scalars['String'];
  /** The opening times of the outlet */
  openingTimes?: Maybe<OpeningTimes>;
  /** The partner brand of the outlet */
  partnerBrand: PartnerBrand;
  /** A list of products available at the outlet */
  products: Array<Maybe<Product>>;
  /** The email address for reservations */
  reservationEmail?: Maybe<Scalars['String']>;
  /** The Salesforce ID of the outlet */
  salesforceID: Scalars['String'];
  /** The status of the outlet whether it is active or not */
  status: OutletStatus;
  /** The tags associated with the outlet. These are used for filtering */
  tags: Array<Maybe<Scalars['String']>>;
  /** The tier of the outlet for example Gold or Black */
  tier?: Maybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/outletContent) */
export type OutletContent = Entry & {
  __typename?: 'OutletContent';
  contentfulMetadata: ContentfulMetadata;
  facilities?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<OutletContentLinkingCollections>;
  mainpicture?: Maybe<Asset>;
  name?: Maybe<Scalars['String']>;
  picturesCollection?: Maybe<AssetCollection>;
  sys: Sys;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/outletContent) */
export type OutletContentFacilitiesArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/outletContent) */
export type OutletContentLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/outletContent) */
export type OutletContentMainpictureArgs = {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/outletContent) */
export type OutletContentNameArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/outletContent) */
export type OutletContentPicturesCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export type OutletContentCollection = {
  __typename?: 'OutletContentCollection';
  items: Array<Maybe<OutletContent>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type OutletContentFilter = {
  AND?: InputMaybe<Array<InputMaybe<OutletContentFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<OutletContentFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  facilities?: InputMaybe<Scalars['String']>;
  facilities_contains?: InputMaybe<Scalars['String']>;
  facilities_exists?: InputMaybe<Scalars['Boolean']>;
  facilities_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  facilities_not?: InputMaybe<Scalars['String']>;
  facilities_not_contains?: InputMaybe<Scalars['String']>;
  facilities_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  mainpicture_exists?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_exists?: InputMaybe<Scalars['Boolean']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  picturesCollection_exists?: InputMaybe<Scalars['Boolean']>;
  sys?: InputMaybe<SysFilter>;
};

export type OutletContentLinkingCollections = {
  __typename?: 'OutletContentLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};

export type OutletContentLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum OutletContentOrder {
  FacilitiesAsc = 'facilities_ASC',
  FacilitiesDesc = 'facilities_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export enum OutletContentType {
  Airport = 'AIRPORT',
  FerryStation = 'FERRY_STATION',
  RailwayStation = 'RAILWAY_STATION',
}

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/outletForContentful) */
export type OutletForContentful = Entry & {
  __typename?: 'OutletForContentful';
  catalogueid?: Maybe<Scalars['String']>;
  contentfulMetadata: ContentfulMetadata;
  facilities?: Maybe<Scalars['JSON']>;
  id?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<OutletForContentfulLinkingCollections>;
  mainpicture?: Maybe<Asset>;
  nameoutletcontentful?: Maybe<Scalars['String']>;
  picturesCollection?: Maybe<AssetCollection>;
  sys: Sys;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/outletForContentful) */
export type OutletForContentfulCatalogueidArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/outletForContentful) */
export type OutletForContentfulFacilitiesArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/outletForContentful) */
export type OutletForContentfulIdArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/outletForContentful) */
export type OutletForContentfulLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/outletForContentful) */
export type OutletForContentfulMainpictureArgs = {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/outletForContentful) */
export type OutletForContentfulNameoutletcontentfulArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/outletForContentful) */
export type OutletForContentfulPicturesCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export type OutletForContentfulCollection = {
  __typename?: 'OutletForContentfulCollection';
  items: Array<Maybe<OutletForContentful>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type OutletForContentfulFilter = {
  AND?: InputMaybe<Array<InputMaybe<OutletForContentfulFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<OutletForContentfulFilter>>>;
  catalogueid?: InputMaybe<Scalars['String']>;
  catalogueid_contains?: InputMaybe<Scalars['String']>;
  catalogueid_exists?: InputMaybe<Scalars['Boolean']>;
  catalogueid_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  catalogueid_not?: InputMaybe<Scalars['String']>;
  catalogueid_not_contains?: InputMaybe<Scalars['String']>;
  catalogueid_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  facilities_exists?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['String']>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_exists?: InputMaybe<Scalars['Boolean']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id_not?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  mainpicture_exists?: InputMaybe<Scalars['Boolean']>;
  nameoutletcontentful?: InputMaybe<Scalars['String']>;
  nameoutletcontentful_contains?: InputMaybe<Scalars['String']>;
  nameoutletcontentful_exists?: InputMaybe<Scalars['Boolean']>;
  nameoutletcontentful_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  nameoutletcontentful_not?: InputMaybe<Scalars['String']>;
  nameoutletcontentful_not_contains?: InputMaybe<Scalars['String']>;
  nameoutletcontentful_not_in?: InputMaybe<
    Array<InputMaybe<Scalars['String']>>
  >;
  picturesCollection_exists?: InputMaybe<Scalars['Boolean']>;
  sys?: InputMaybe<SysFilter>;
};

export type OutletForContentfulLinkingCollections = {
  __typename?: 'OutletForContentfulLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};

export type OutletForContentfulLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum OutletForContentfulOrder {
  CatalogueidAsc = 'catalogueid_ASC',
  CatalogueidDesc = 'catalogueid_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameoutletcontentfulAsc = 'nameoutletcontentful_ASC',
  NameoutletcontentfulDesc = 'nameoutletcontentful_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export type OutletInput = {
  /** The type of outlet eg AIRPORT, FERRY_STATION, RAILWAY_STATION */
  contentType: OutletContentType;
  /** Whether the outlet has disabled access */
  hasDisabledAccess: Scalars['Boolean'];
  /** The legacy code of the outlet (Lounge Code) eg LHR13 */
  legacyCode?: InputMaybe<Scalars['String']>;
  /** The location of the outlet */
  location: LocationInput;
  /** The name of the outlet */
  name: Scalars['String'];
  /** The opening times of the outlet */
  openingTimes?: InputMaybe<OpeningTimesInput>;
  /** The partner brand of the outlet */
  partnerBrand: PartnerBrandKey;
  /** The email address for reservations */
  reservationEmail?: InputMaybe<Scalars['String']>;
  /** The Salesforce ID of the outlet */
  salesforceID: Scalars['String'];
  /** The status of the outlet whether it is active or not */
  status: OutletStatus;
  /** The tags associated with the outlet. These are used for filtering */
  tags: Array<InputMaybe<Scalars['String']>>;
  /** The tier of the outlet for example Gold or Black */
  tier?: InputMaybe<Scalars['String']>;
};

export type OutletKey = {
  id: Scalars['ID'];
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
  createdAt: Scalars['Date'];
  emailAddress: Scalars['String'];
  experiences: Array<Experience>;
  firstName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
};

export type PartnerBrand = {
  __typename?: 'PartnerBrand';
  id: Scalars['ID'];
  /** The name of the partner brand */
  name: Scalars['String'];
  outlets: Array<Maybe<Outlet>>;
  /** The salesforce ID of the partner brand */
  salesforceID: Scalars['String'];
};

export type PartnerBrandInput = {
  /** The name of the partner brand */
  name: Scalars['String'];
  /** The salesforce ID of the partner brand */
  salesforceID: Scalars['String'];
};

export type PartnerBrandKey = {
  id: Scalars['ID'];
};

export type PartnerInput = {
  emailAddress: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
};

export type PartnerKey = {
  id: Scalars['ID'];
};

export type PaymentInput = {
  orderID?: InputMaybe<Scalars['String']>;
  stripePaymentID?: InputMaybe<Scalars['String']>;
};

export type Product = {
  __typename?: 'Product';
  /** The access type of the product */
  accessType: OutletProductAccessType;
  /** The product type */
  contentType: ProductContentType;
  /** A list of costs for the product by programme */
  costs: Array<Maybe<ProductCost>>;
  id: Scalars['ID'];
  /** The product name generated from the accessType */
  name: Scalars['String'];
  /** The outlet associated with the product */
  outlet?: Maybe<Outlet>;
  /** The Stripe ID of the product */
  ppStripeID?: Maybe<Scalars['String']>;
  /** A list of sale prices for the product by programme */
  salePrices: Array<Maybe<ProductSalePrice>>;
  /** The relevant Salesforce ID of the product */
  salesforceID: Scalars['String'];
  /** The stage of the product based on Saleforce stage */
  stage: ProductStage;
  /** The status of the product whether it is active or not */
  status: ProductStatus;
  /** The tags associated with the product. These are used for filtering */
  tags: Array<Maybe<Scalars['String']>>;
  /** The product tier for example Gold or Black */
  tier?: Maybe<Scalars['String']>;
};

export enum ProductContentType {
  Eat = 'EAT',
  Lounge = 'LOUNGE',
  Refresh = 'REFRESH',
  Rest = 'REST',
  Unwind = 'UNWIND',
}

export type ProductCost = {
  __typename?: 'ProductCost';
  /** The cost to the partner when pricing type is flat */
  cost?: Maybe<Scalars['Float']>;
  /** The currency of the cost eg GBP */
  costCurrency: Scalars['String'];
  /** The tax percentage to be applied to the cost for example 20% VAT in the UK */
  defaultTaxPercentage: Scalars['Int'];
  /** The programme this cost is for */
  programme: Programme;
  /** The cost to the partner when pricing type is variable */
  projectedCost?: Maybe<Scalars['Float']>;
  /** The cost type either flat or tiered */
  type: ProductCostType;
};

export type ProductCostInput = {
  /** The cost to the partner when pricing type is flat */
  cost?: InputMaybe<Scalars['Float']>;
  /** The currency of the cost eg GBP */
  costCurrency: Scalars['String'];
  /** The tax percentage to be applied to the cost for example 20% VAT in the UK */
  defaultTaxPercentage: Scalars['Int'];
  /** The programme this cost is for */
  programme: Programme;
  /** The cost to the partner when pricing type is variable */
  projectedCost?: InputMaybe<Scalars['Float']>;
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
  /** The product type */
  contentType: ProductContentType;
  /** A list of costs for the product by programme */
  costs: Array<InputMaybe<ProductCostInput>>;
  /** The product name generated from the accessType */
  name: Scalars['String'];
  /** The Outlet ID of the product */
  outlet: OutletKey;
  /** The Stripe ID of the product */
  ppStripeID: Scalars['String'];
  /** A list of sale prices for the product by programme */
  salePrices: Array<InputMaybe<ProductSalePriceInput>>;
  /** The relevant Salesforce ID of the product */
  salesforceID: Scalars['String'];
  /** The stage of the product based on Saleforce stage */
  stage: ProductStage;
  /** The status of the product whether it is active or not */
  status: ProductStatus;
  /** The tags associated with the product. These are used for filtering */
  tags: Array<InputMaybe<Scalars['String']>>;
  /** The product tier for example Gold or Black */
  tier?: InputMaybe<Scalars['String']>;
};

export type ProductKey = {
  id: Scalars['ID'];
};

export type ProductSalePrice = {
  __typename?: 'ProductSalePrice';
  /** The programme this sale price is for */
  programme: Programme;
  /** The sale price to the customer */
  salePrice: Scalars['Float'];
  /** The currency of the sale price eg GBP */
  salePriceCurrency: Scalars['String'];
  /** The Stripe ID of the price */
  stripePriceID?: Maybe<Scalars['String']>;
};

export type ProductSalePriceInput = {
  /** The programme this sale price is for */
  programme: Programme;
  /** The sale price to the customer */
  salePrice: Scalars['Float'];
  /** The currency of the sale price eg GBP */
  salePriceCurrency: Scalars['String'];
  /** The Stripe ID of the price */
  stripePriceID?: InputMaybe<Scalars['String']>;
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
  asset?: Maybe<Asset>;
  assetCollection?: Maybe<AssetCollection>;
  entryCollection?: Maybe<EntryCollection>;
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
  isInvitationTokenValid?: Maybe<Scalars['Boolean']>;
  outletContent?: Maybe<OutletContent>;
  outletContentCollection?: Maybe<OutletContentCollection>;
  outletForContentful?: Maybe<OutletForContentful>;
  outletForContentfulCollection?: Maybe<OutletForContentfulCollection>;
  searchExperiences?: Maybe<Array<Maybe<Experience>>>;
};

export type QueryAssetArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};

export type QueryAssetCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<AssetOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AssetFilter>;
};

export type QueryEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<EntryOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<EntryFilter>;
};

export type QueryGetAvailableSlotsArgs = {
  data?: InputMaybe<AvailabilityInput>;
};

export type QueryGetBookingByIdArgs = {
  id: Scalars['ID'];
};

export type QueryGetBookingsArgs = {
  experienceID: Scalars['ID'];
  status?: InputMaybe<BookingStatus>;
};

export type QueryGetConsumerByEmailAddressArgs = {
  emailAddress: Scalars['String'];
};

export type QueryGetConsumerByIdArgs = {
  id: Scalars['ID'];
};

export type QueryGetEntitlementArgs = {
  id: Scalars['ID'];
};

export type QueryGetEntitlementsArgs = {
  filter?: InputMaybe<GetEntitlementsFilter>;
};

export type QueryGetExperienceByIdArgs = {
  id?: InputMaybe<Scalars['String']>;
};

export type QueryGetFlightDetailsArgs = {
  flightDetails?: InputMaybe<FlightDetailsInput>;
};

export type QueryGetInvitationByIdArgs = {
  id: Scalars['ID'];
};

export type QueryGetInvitationsArgs = {
  experienceID?: InputMaybe<Scalars['ID']>;
};

export type QueryGetOutletByIdArgs = {
  id: Scalars['ID'];
};

export type QueryGetOutletsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
};

export type QueryGetPartnerBrandByIdArgs = {
  id: Scalars['ID'];
};

export type QueryGetPartnerBrandsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
};

export type QueryGetPartnerByEmailAddressArgs = {
  emailAddress: Scalars['String'];
};

export type QueryGetPartnerByIdArgs = {
  id: Scalars['ID'];
};

export type QueryGetProductByIdArgs = {
  id: Scalars['ID'];
};

export type QueryIsInvitationTokenValidArgs = {
  inviteToken: Scalars['String'];
};

export type QueryOutletContentArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};

export type QueryOutletContentCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<OutletContentOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OutletContentFilter>;
};

export type QueryOutletForContentfulArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};

export type QueryOutletForContentfulCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<OutletForContentfulOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OutletForContentfulFilter>;
};

export type QuerySearchExperiencesArgs = {
  geoLocation?: InputMaybe<GeoQueryInput>;
  query?: InputMaybe<Scalars['String']>;
  searchFilter?: InputMaybe<SearchFilterInput>;
};

export type Redemption = {
  __typename?: 'Redemption';
  defaultMaxGuests?: Maybe<Scalars['Int']>;
  defaultRedemptionTypeCode?: Maybe<Scalars['String']>;
  isGuestAllowed?: Maybe<Scalars['Boolean']>;
};

export type Schedule = {
  __typename?: 'Schedule';
  /** The end time of the schedule */
  endTime: Scalars['String'];
  /** The start time of the schedule */
  startTime: Scalars['String'];
};

export type ScheduleInput = {
  /** The end time of the schedule */
  endTime: Scalars['String'];
  /** The start time of the schedule */
  startTime: Scalars['String'];
};

export type SearchFilter = {
  __typename?: 'SearchFilter';
  attribute?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type SearchFilterInput = {
  attribute?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type Slots = {
  __typename?: 'Slots';
  endDate?: Maybe<Scalars['Date']>;
  maxDuration?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['Date']>;
};

export type Sys = {
  __typename?: 'Sys';
  environmentId: Scalars['String'];
  firstPublishedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  /** The locale that was requested - mainly used for Apollo Federation. */
  locale?: Maybe<Scalars['String']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  publishedVersion?: Maybe<Scalars['Int']>;
  spaceId: Scalars['String'];
};

export type SysFilter = {
  firstPublishedAt?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_exists?: InputMaybe<Scalars['Boolean']>;
  firstPublishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  firstPublishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_not?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  id?: InputMaybe<Scalars['String']>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_exists?: InputMaybe<Scalars['Boolean']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id_not?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  publishedAt_exists?: InputMaybe<Scalars['Boolean']>;
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedVersion?: InputMaybe<Scalars['Float']>;
  publishedVersion_exists?: InputMaybe<Scalars['Boolean']>;
  publishedVersion_gt?: InputMaybe<Scalars['Float']>;
  publishedVersion_gte?: InputMaybe<Scalars['Float']>;
  publishedVersion_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  publishedVersion_lt?: InputMaybe<Scalars['Float']>;
  publishedVersion_lte?: InputMaybe<Scalars['Float']>;
  publishedVersion_not?: InputMaybe<Scalars['Float']>;
  publishedVersion_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
};

export enum TimezoneType {
  Local = 'LOCAL',
  Utc = 'UTC',
}

export type Variation = {
  __typename?: 'Variation';
  date: Scalars['String'];
  type: VariationType;
};

export type VariationInput = {
  date: Scalars['String'];
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
  cancelBookingId: Scalars['ID'];
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
  checkinBookingId: Scalars['ID'];
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
  confirmBookingId: Scalars['ID'];
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
  declineBookingId: Scalars['ID'];
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
  deleteBookingId: Scalars['ID'];
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
  getBookingById: Scalars['ID'];
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
  experienceId: Scalars['ID'];
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
  experienceId: Scalars['ID'];
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
  emailAddress: Scalars['String'];
}>;

export type GetConsumerByEmailAddressQuery = {
  __typename?: 'Query';
  getConsumerByEmailAddress?: { __typename?: 'Consumer'; id: string } | null;
};

export type GetConsumerByIdQueryVariables = Exact<{
  getConsumerById: Scalars['ID'];
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
  getExperienceById?: InputMaybe<Scalars['String']>;
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
  getInvitationById: Scalars['ID'];
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

export type GetPartnerByIdQueryVariables = Exact<{
  getPartnerById: Scalars['ID'];
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
  query?: InputMaybe<Scalars['String']>;
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
  inviteToken: Scalars['String'];
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
