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
  /**
   * A date-time string at UTC, such as 2007-12-03T10:15:30Z,
   *     compliant with the 'date-time' format outlined in section 5.6 of
   *     the RFC 3339 profile of the ISO 8601 standard for representation
   *     of dates and times using the Gregorian calendar.
   */
  DateTime: { input: any; output: any };
  /** The 'Dimension' type represents dimensions as whole numeric values between `1` and `4000`. */
  Dimension: { input: any; output: any };
  /** The 'HexColor' type represents color in `rgb:ffffff` string format. */
  HexColor: { input: any; output: any };
  JSONObject: { input: any; output: any };
  ObjectID: { input: any; output: any };
  /** The 'Quality' type represents quality as whole numeric values between `1` and `100`. */
  Quality: { input: any; output: any };
};

export type AcceptInvitationInput = {
  email: Scalars['String']['input'];
  inviteToken: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Amendment = {
  __typename?: 'Amendment';
  actingAccount?: Maybe<Scalars['String']['output']>;
  bookedFrom: Scalars['String']['output'];
  bookedTo: Scalars['String']['output'];
  booking?: Maybe<Booking>;
  createdAt: Scalars['Date']['output'];
  guestAdultCount: Scalars['Int']['output'];
  guestChildrenCount: Scalars['Int']['output'];
  guestInfantCount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  lastArrival: Scalars['String']['output'];
  reference: Scalars['String']['output'];
  status: AmendmentStatus;
  updatedAt: Scalars['Date']['output'];
};

export type AmendmentBookedFromArgs = {
  timezoneType?: InputMaybe<TimezoneType>;
};

export type AmendmentBookedToArgs = {
  timezoneType?: InputMaybe<TimezoneType>;
};

export type AmendmentGuestAdultCountArgs = {
  value?: InputMaybe<Scalars['Int']['input']>;
};

export type AmendmentGuestChildrenCountArgs = {
  value?: InputMaybe<Scalars['Int']['input']>;
};

export type AmendmentGuestInfantCountArgs = {
  value?: InputMaybe<Scalars['Int']['input']>;
};

export type AmendmentLastArrivalArgs = {
  timezoneType?: InputMaybe<TimezoneType>;
};

export type AmendmentInput = {
  actingAccount?: InputMaybe<Scalars['String']['input']>;
  bookedFrom: Scalars['Date']['input'];
  bookedTo: Scalars['Date']['input'];
  bookingID: Scalars['String']['input'];
  guestAdultCount?: Scalars['Int']['input'];
  guestChildrenCount?: Scalars['Int']['input'];
  guestInfantCount?: Scalars['Int']['input'];
  lastArrival?: InputMaybe<Scalars['Date']['input']>;
};

/** The lifecycle statuses of an amendment */
export enum AmendmentStatus {
  Confirmed = 'CONFIRMED',
  FailedToUpdateBookingRecord = 'FAILED_TO_UPDATE_BOOKING_RECORD',
  Initialized = 'INITIALIZED',
  PaymentFailed = 'PAYMENT_FAILED',
  RefundFailed = 'REFUND_FAILED',
  SnaplogicAmendmentFailed = 'SNAPLOGIC_AMENDMENT_FAILED',
}

export type Arrival = {
  __typename?: 'Arrival';
  airport?: Maybe<Scalars['String']['output']>;
  dateTime?: Maybe<FlightDateTime>;
  terminal?: Maybe<Scalars['String']['output']>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type Asset = {
  __typename?: 'Asset';
  contentType?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']['output']>;
  fileName?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  linkedFrom?: Maybe<AssetLinkingCollections>;
  size?: Maybe<Scalars['Int']['output']>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetContentTypeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetFileNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetHeightArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetSizeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetUrlArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  transform?: InputMaybe<ImageTransformOptions>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetWidthArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type AssetCollection = {
  __typename?: 'AssetCollection';
  items: Array<Maybe<Asset>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type AssetFilter = {
  AND?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  contentType?: InputMaybe<Scalars['String']['input']>;
  contentType_contains?: InputMaybe<Scalars['String']['input']>;
  contentType_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentType_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentType_not?: InputMaybe<Scalars['String']['input']>;
  contentType_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentType_not_in?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  fileName?: InputMaybe<Scalars['String']['input']>;
  fileName_contains?: InputMaybe<Scalars['String']['input']>;
  fileName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  fileName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  fileName_not?: InputMaybe<Scalars['String']['input']>;
  fileName_not_contains?: InputMaybe<Scalars['String']['input']>;
  fileName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  height?: InputMaybe<Scalars['Int']['input']>;
  height_exists?: InputMaybe<Scalars['Boolean']['input']>;
  height_gt?: InputMaybe<Scalars['Int']['input']>;
  height_gte?: InputMaybe<Scalars['Int']['input']>;
  height_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  height_lt?: InputMaybe<Scalars['Int']['input']>;
  height_lte?: InputMaybe<Scalars['Int']['input']>;
  height_not?: InputMaybe<Scalars['Int']['input']>;
  height_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  size?: InputMaybe<Scalars['Int']['input']>;
  size_exists?: InputMaybe<Scalars['Boolean']['input']>;
  size_gt?: InputMaybe<Scalars['Int']['input']>;
  size_gte?: InputMaybe<Scalars['Int']['input']>;
  size_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  size_lt?: InputMaybe<Scalars['Int']['input']>;
  size_lte?: InputMaybe<Scalars['Int']['input']>;
  size_not?: InputMaybe<Scalars['Int']['input']>;
  size_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url?: InputMaybe<Scalars['String']['input']>;
  url_contains?: InputMaybe<Scalars['String']['input']>;
  url_exists?: InputMaybe<Scalars['Boolean']['input']>;
  url_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url_not?: InputMaybe<Scalars['String']['input']>;
  url_not_contains?: InputMaybe<Scalars['String']['input']>;
  url_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  width?: InputMaybe<Scalars['Int']['input']>;
  width_exists?: InputMaybe<Scalars['Boolean']['input']>;
  width_gt?: InputMaybe<Scalars['Int']['input']>;
  width_gte?: InputMaybe<Scalars['Int']['input']>;
  width_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  width_lt?: InputMaybe<Scalars['Int']['input']>;
  width_lte?: InputMaybe<Scalars['Int']['input']>;
  width_not?: InputMaybe<Scalars['Int']['input']>;
  width_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export type AssetLinkingCollections = {
  __typename?: 'AssetLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  mediaCollection?: Maybe<MediaCollection>;
  partnerBrandContentCollection?: Maybe<PartnerBrandContentCollection>;
};

export type AssetLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type AssetLinkingCollectionsMediaCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type AssetLinkingCollectionsPartnerBrandContentCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

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
  refundStatus?: Maybe<Scalars['String']['output']>;
  refundedAt?: Maybe<Scalars['Date']['output']>;
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
  Amended = 'AMENDED',
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

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/conditions) */
export type Conditions = Entry & {
  __typename?: 'Conditions';
  accessPrior?: Maybe<Scalars['String']['output']>;
  childPolicy?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  dressCode?: Maybe<Scalars['String']['output']>;
  legacyConditions?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<ConditionsLinkingCollections>;
  maxStay?: Maybe<Scalars['Int']['output']>;
  smokingPolicy?: Maybe<Scalars['String']['output']>;
  sys: Sys;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/conditions) */
export type ConditionsAccessPriorArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/conditions) */
export type ConditionsChildPolicyArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/conditions) */
export type ConditionsDressCodeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/conditions) */
export type ConditionsLegacyConditionsArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/conditions) */
export type ConditionsLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/conditions) */
export type ConditionsMaxStayArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/conditions) */
export type ConditionsSmokingPolicyArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type ConditionsCollection = {
  __typename?: 'ConditionsCollection';
  items: Array<Maybe<Conditions>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ConditionsFilter = {
  AND?: InputMaybe<Array<InputMaybe<ConditionsFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ConditionsFilter>>>;
  accessPrior?: InputMaybe<Scalars['String']['input']>;
  accessPrior_contains?: InputMaybe<Scalars['String']['input']>;
  accessPrior_exists?: InputMaybe<Scalars['Boolean']['input']>;
  accessPrior_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  accessPrior_not?: InputMaybe<Scalars['String']['input']>;
  accessPrior_not_contains?: InputMaybe<Scalars['String']['input']>;
  accessPrior_not_in?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  childPolicy?: InputMaybe<Scalars['String']['input']>;
  childPolicy_contains?: InputMaybe<Scalars['String']['input']>;
  childPolicy_exists?: InputMaybe<Scalars['Boolean']['input']>;
  childPolicy_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  childPolicy_not?: InputMaybe<Scalars['String']['input']>;
  childPolicy_not_contains?: InputMaybe<Scalars['String']['input']>;
  childPolicy_not_in?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  dressCode?: InputMaybe<Scalars['String']['input']>;
  dressCode_contains?: InputMaybe<Scalars['String']['input']>;
  dressCode_exists?: InputMaybe<Scalars['Boolean']['input']>;
  dressCode_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  dressCode_not?: InputMaybe<Scalars['String']['input']>;
  dressCode_not_contains?: InputMaybe<Scalars['String']['input']>;
  dressCode_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  legacyConditions?: InputMaybe<Scalars['String']['input']>;
  legacyConditions_contains?: InputMaybe<Scalars['String']['input']>;
  legacyConditions_exists?: InputMaybe<Scalars['Boolean']['input']>;
  legacyConditions_in?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  legacyConditions_not?: InputMaybe<Scalars['String']['input']>;
  legacyConditions_not_contains?: InputMaybe<Scalars['String']['input']>;
  legacyConditions_not_in?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  maxStay?: InputMaybe<Scalars['Int']['input']>;
  maxStay_exists?: InputMaybe<Scalars['Boolean']['input']>;
  maxStay_gt?: InputMaybe<Scalars['Int']['input']>;
  maxStay_gte?: InputMaybe<Scalars['Int']['input']>;
  maxStay_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  maxStay_lt?: InputMaybe<Scalars['Int']['input']>;
  maxStay_lte?: InputMaybe<Scalars['Int']['input']>;
  maxStay_not?: InputMaybe<Scalars['Int']['input']>;
  maxStay_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  smokingPolicy?: InputMaybe<Scalars['String']['input']>;
  smokingPolicy_contains?: InputMaybe<Scalars['String']['input']>;
  smokingPolicy_exists?: InputMaybe<Scalars['Boolean']['input']>;
  smokingPolicy_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  smokingPolicy_not?: InputMaybe<Scalars['String']['input']>;
  smokingPolicy_not_contains?: InputMaybe<Scalars['String']['input']>;
  smokingPolicy_not_in?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  sys?: InputMaybe<SysFilter>;
};

export type ConditionsLinkingCollections = {
  __typename?: 'ConditionsLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  outletContentCollection?: Maybe<OutletContentCollection>;
};

export type ConditionsLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type ConditionsLinkingCollectionsOutletContentCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<
    Array<InputMaybe<ConditionsLinkingCollectionsOutletContentCollectionOrder>>
  >;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum ConditionsLinkingCollectionsOutletContentCollectionOrder {
  LegacyCodeAsc = 'legacyCode_ASC',
  LegacyCodeDesc = 'legacyCode_DESC',
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

export enum ConditionsOrder {
  AccessPriorAsc = 'accessPrior_ASC',
  AccessPriorDesc = 'accessPrior_DESC',
  ChildPolicyAsc = 'childPolicy_ASC',
  ChildPolicyDesc = 'childPolicy_DESC',
  DressCodeAsc = 'dressCode_ASC',
  DressCodeDesc = 'dressCode_DESC',
  MaxStayAsc = 'maxStay_ASC',
  MaxStayDesc = 'maxStay_DESC',
  SmokingPolicyAsc = 'smokingPolicy_ASC',
  SmokingPolicyDesc = 'smokingPolicy_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
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
  /** Consumers preferred langauge */
  locale?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
};

export type ConsumerInput = {
  dateOfBirth?: InputMaybe<Scalars['Date']['input']>;
  emailAddress: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  marketingConsent?: InputMaybe<Scalars['Boolean']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type ContentfulMetadata = {
  __typename?: 'ContentfulMetadata';
  tags: Array<Maybe<ContentfulTag>>;
};

export type ContentfulMetadataFilter = {
  tags?: InputMaybe<ContentfulMetadataTagsFilter>;
  tags_exists?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ContentfulMetadataTagsFilter = {
  id_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/**
 * Represents a tag entity for finding and organizing content easily.
 *     Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-tags
 */
export type ContentfulTag = {
  __typename?: 'ContentfulTag';
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
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

export type Editor = {
  __typename?: 'Editor';
  /** The editor's first name */
  firstName?: Maybe<Scalars['String']['output']>;
  /** The editor's last name */
  lastName?: Maybe<Scalars['String']['output']>;
  /** The editor's organisation */
  organisation?: Maybe<Scalars['String']['output']>;
};

export type EditorInput = {
  /** The editor's first name */
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** The editor's last name */
  lastName?: InputMaybe<Scalars['String']['input']>;
  /** The editor's organisation */
  organisation?: InputMaybe<Scalars['String']['input']>;
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

export type Entry = {
  contentfulMetadata: ContentfulMetadata;
  sys: Sys;
};

export type EntryCollection = {
  __typename?: 'EntryCollection';
  items: Array<Maybe<Entry>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
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

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/facilities) */
export type Facilities = Entry & {
  __typename?: 'Facilities';
  airConditioning?: Maybe<Scalars['Boolean']['output']>;
  alcohol?: Maybe<Scalars['Boolean']['output']>;
  checkInFacility?: Maybe<Scalars['Boolean']['output']>;
  coldBuffet?: Maybe<Scalars['Boolean']['output']>;
  conferenceFacilities?: Maybe<Scalars['Boolean']['output']>;
  contentfulMetadata: ContentfulMetadata;
  dMcUnavailable?: Maybe<Scalars['Boolean']['output']>;
  digitalMembershipCard?: Maybe<Scalars['Boolean']['output']>;
  digitalService?: Maybe<Scalars['Boolean']['output']>;
  disabledAccess?: Maybe<Scalars['Boolean']['output']>;
  fastTrackLane?: Maybe<Scalars['Boolean']['output']>;
  flightInformationMonitor?: Maybe<Scalars['Boolean']['output']>;
  gym?: Maybe<Scalars['Boolean']['output']>;
  hotBuffet?: Maybe<Scalars['Boolean']['output']>;
  hotDrinks?: Maybe<Scalars['Boolean']['output']>;
  internetDataport?: Maybe<Scalars['Boolean']['output']>;
  linkedFrom?: Maybe<FacilitiesLinkingCollections>;
  newspapersMagazines?: Maybe<Scalars['Boolean']['output']>;
  noSmoking?: Maybe<Scalars['Boolean']['output']>;
  refreshmentsAlcoholic?: Maybe<Scalars['Boolean']['output']>;
  refreshmentsSoftDrinks?: Maybe<Scalars['Boolean']['output']>;
  selfService?: Maybe<Scalars['Boolean']['output']>;
  shoeShine?: Maybe<Scalars['Boolean']['output']>;
  showerFacilities?: Maybe<Scalars['Boolean']['output']>;
  sleepRoomQuietArea?: Maybe<Scalars['Boolean']['output']>;
  snacks?: Maybe<Scalars['Boolean']['output']>;
  softDrinks?: Maybe<Scalars['Boolean']['output']>;
  sys: Sys;
  tableService?: Maybe<Scalars['Boolean']['output']>;
  telephone?: Maybe<Scalars['Boolean']['output']>;
  television?: Maybe<Scalars['Boolean']['output']>;
  wifi?: Maybe<Scalars['Boolean']['output']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/facilities) */
export type FacilitiesAirConditioningArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/facilities) */
export type FacilitiesAlcoholArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/facilities) */
export type FacilitiesCheckInFacilityArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/facilities) */
export type FacilitiesColdBuffetArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/facilities) */
export type FacilitiesConferenceFacilitiesArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/facilities) */
export type FacilitiesDMcUnavailableArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/facilities) */
export type FacilitiesDigitalMembershipCardArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/facilities) */
export type FacilitiesDigitalServiceArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/facilities) */
export type FacilitiesDisabledAccessArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/facilities) */
export type FacilitiesFastTrackLaneArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/facilities) */
export type FacilitiesFlightInformationMonitorArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/facilities) */
export type FacilitiesGymArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/facilities) */
export type FacilitiesHotBuffetArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/facilities) */
export type FacilitiesHotDrinksArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/facilities) */
export type FacilitiesInternetDataportArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/facilities) */
export type FacilitiesLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/facilities) */
export type FacilitiesNewspapersMagazinesArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/facilities) */
export type FacilitiesNoSmokingArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/facilities) */
export type FacilitiesRefreshmentsAlcoholicArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/facilities) */
export type FacilitiesRefreshmentsSoftDrinksArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/facilities) */
export type FacilitiesSelfServiceArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/facilities) */
export type FacilitiesShoeShineArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/facilities) */
export type FacilitiesShowerFacilitiesArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/facilities) */
export type FacilitiesSleepRoomQuietAreaArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/facilities) */
export type FacilitiesSnacksArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/facilities) */
export type FacilitiesSoftDrinksArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/facilities) */
export type FacilitiesTableServiceArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/facilities) */
export type FacilitiesTelephoneArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/facilities) */
export type FacilitiesTelevisionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/facilities) */
export type FacilitiesWifiArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type FacilitiesCollection = {
  __typename?: 'FacilitiesCollection';
  items: Array<Maybe<Facilities>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type FacilitiesFilter = {
  AND?: InputMaybe<Array<InputMaybe<FacilitiesFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<FacilitiesFilter>>>;
  airConditioning?: InputMaybe<Scalars['Boolean']['input']>;
  airConditioning_exists?: InputMaybe<Scalars['Boolean']['input']>;
  airConditioning_not?: InputMaybe<Scalars['Boolean']['input']>;
  alcohol?: InputMaybe<Scalars['Boolean']['input']>;
  alcohol_exists?: InputMaybe<Scalars['Boolean']['input']>;
  alcohol_not?: InputMaybe<Scalars['Boolean']['input']>;
  checkInFacility?: InputMaybe<Scalars['Boolean']['input']>;
  checkInFacility_exists?: InputMaybe<Scalars['Boolean']['input']>;
  checkInFacility_not?: InputMaybe<Scalars['Boolean']['input']>;
  coldBuffet?: InputMaybe<Scalars['Boolean']['input']>;
  coldBuffet_exists?: InputMaybe<Scalars['Boolean']['input']>;
  coldBuffet_not?: InputMaybe<Scalars['Boolean']['input']>;
  conferenceFacilities?: InputMaybe<Scalars['Boolean']['input']>;
  conferenceFacilities_exists?: InputMaybe<Scalars['Boolean']['input']>;
  conferenceFacilities_not?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  dMcUnavailable?: InputMaybe<Scalars['Boolean']['input']>;
  dMcUnavailable_exists?: InputMaybe<Scalars['Boolean']['input']>;
  dMcUnavailable_not?: InputMaybe<Scalars['Boolean']['input']>;
  digitalMembershipCard?: InputMaybe<Scalars['Boolean']['input']>;
  digitalMembershipCard_exists?: InputMaybe<Scalars['Boolean']['input']>;
  digitalMembershipCard_not?: InputMaybe<Scalars['Boolean']['input']>;
  digitalService?: InputMaybe<Scalars['Boolean']['input']>;
  digitalService_exists?: InputMaybe<Scalars['Boolean']['input']>;
  digitalService_not?: InputMaybe<Scalars['Boolean']['input']>;
  disabledAccess?: InputMaybe<Scalars['Boolean']['input']>;
  disabledAccess_exists?: InputMaybe<Scalars['Boolean']['input']>;
  disabledAccess_not?: InputMaybe<Scalars['Boolean']['input']>;
  fastTrackLane?: InputMaybe<Scalars['Boolean']['input']>;
  fastTrackLane_exists?: InputMaybe<Scalars['Boolean']['input']>;
  fastTrackLane_not?: InputMaybe<Scalars['Boolean']['input']>;
  flightInformationMonitor?: InputMaybe<Scalars['Boolean']['input']>;
  flightInformationMonitor_exists?: InputMaybe<Scalars['Boolean']['input']>;
  flightInformationMonitor_not?: InputMaybe<Scalars['Boolean']['input']>;
  gym?: InputMaybe<Scalars['Boolean']['input']>;
  gym_exists?: InputMaybe<Scalars['Boolean']['input']>;
  gym_not?: InputMaybe<Scalars['Boolean']['input']>;
  hotBuffet?: InputMaybe<Scalars['Boolean']['input']>;
  hotBuffet_exists?: InputMaybe<Scalars['Boolean']['input']>;
  hotBuffet_not?: InputMaybe<Scalars['Boolean']['input']>;
  hotDrinks?: InputMaybe<Scalars['Boolean']['input']>;
  hotDrinks_exists?: InputMaybe<Scalars['Boolean']['input']>;
  hotDrinks_not?: InputMaybe<Scalars['Boolean']['input']>;
  internetDataport?: InputMaybe<Scalars['Boolean']['input']>;
  internetDataport_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internetDataport_not?: InputMaybe<Scalars['Boolean']['input']>;
  newspapersMagazines?: InputMaybe<Scalars['Boolean']['input']>;
  newspapersMagazines_exists?: InputMaybe<Scalars['Boolean']['input']>;
  newspapersMagazines_not?: InputMaybe<Scalars['Boolean']['input']>;
  noSmoking?: InputMaybe<Scalars['Boolean']['input']>;
  noSmoking_exists?: InputMaybe<Scalars['Boolean']['input']>;
  noSmoking_not?: InputMaybe<Scalars['Boolean']['input']>;
  refreshmentsAlcoholic?: InputMaybe<Scalars['Boolean']['input']>;
  refreshmentsAlcoholic_exists?: InputMaybe<Scalars['Boolean']['input']>;
  refreshmentsAlcoholic_not?: InputMaybe<Scalars['Boolean']['input']>;
  refreshmentsSoftDrinks?: InputMaybe<Scalars['Boolean']['input']>;
  refreshmentsSoftDrinks_exists?: InputMaybe<Scalars['Boolean']['input']>;
  refreshmentsSoftDrinks_not?: InputMaybe<Scalars['Boolean']['input']>;
  selfService?: InputMaybe<Scalars['Boolean']['input']>;
  selfService_exists?: InputMaybe<Scalars['Boolean']['input']>;
  selfService_not?: InputMaybe<Scalars['Boolean']['input']>;
  shoeShine?: InputMaybe<Scalars['Boolean']['input']>;
  shoeShine_exists?: InputMaybe<Scalars['Boolean']['input']>;
  shoeShine_not?: InputMaybe<Scalars['Boolean']['input']>;
  showerFacilities?: InputMaybe<Scalars['Boolean']['input']>;
  showerFacilities_exists?: InputMaybe<Scalars['Boolean']['input']>;
  showerFacilities_not?: InputMaybe<Scalars['Boolean']['input']>;
  sleepRoomQuietArea?: InputMaybe<Scalars['Boolean']['input']>;
  sleepRoomQuietArea_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sleepRoomQuietArea_not?: InputMaybe<Scalars['Boolean']['input']>;
  snacks?: InputMaybe<Scalars['Boolean']['input']>;
  snacks_exists?: InputMaybe<Scalars['Boolean']['input']>;
  snacks_not?: InputMaybe<Scalars['Boolean']['input']>;
  softDrinks?: InputMaybe<Scalars['Boolean']['input']>;
  softDrinks_exists?: InputMaybe<Scalars['Boolean']['input']>;
  softDrinks_not?: InputMaybe<Scalars['Boolean']['input']>;
  sys?: InputMaybe<SysFilter>;
  tableService?: InputMaybe<Scalars['Boolean']['input']>;
  tableService_exists?: InputMaybe<Scalars['Boolean']['input']>;
  tableService_not?: InputMaybe<Scalars['Boolean']['input']>;
  telephone?: InputMaybe<Scalars['Boolean']['input']>;
  telephone_exists?: InputMaybe<Scalars['Boolean']['input']>;
  telephone_not?: InputMaybe<Scalars['Boolean']['input']>;
  television?: InputMaybe<Scalars['Boolean']['input']>;
  television_exists?: InputMaybe<Scalars['Boolean']['input']>;
  television_not?: InputMaybe<Scalars['Boolean']['input']>;
  wifi?: InputMaybe<Scalars['Boolean']['input']>;
  wifi_exists?: InputMaybe<Scalars['Boolean']['input']>;
  wifi_not?: InputMaybe<Scalars['Boolean']['input']>;
};

export type FacilitiesLinkingCollections = {
  __typename?: 'FacilitiesLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  outletContentCollection?: Maybe<OutletContentCollection>;
};

export type FacilitiesLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type FacilitiesLinkingCollectionsOutletContentCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<
    Array<InputMaybe<FacilitiesLinkingCollectionsOutletContentCollectionOrder>>
  >;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum FacilitiesLinkingCollectionsOutletContentCollectionOrder {
  LegacyCodeAsc = 'legacyCode_ASC',
  LegacyCodeDesc = 'legacyCode_DESC',
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

export enum FacilitiesOrder {
  AirConditioningAsc = 'airConditioning_ASC',
  AirConditioningDesc = 'airConditioning_DESC',
  AlcoholAsc = 'alcohol_ASC',
  AlcoholDesc = 'alcohol_DESC',
  CheckInFacilityAsc = 'checkInFacility_ASC',
  CheckInFacilityDesc = 'checkInFacility_DESC',
  ColdBuffetAsc = 'coldBuffet_ASC',
  ColdBuffetDesc = 'coldBuffet_DESC',
  ConferenceFacilitiesAsc = 'conferenceFacilities_ASC',
  ConferenceFacilitiesDesc = 'conferenceFacilities_DESC',
  DMcUnavailableAsc = 'dMcUnavailable_ASC',
  DMcUnavailableDesc = 'dMcUnavailable_DESC',
  DigitalMembershipCardAsc = 'digitalMembershipCard_ASC',
  DigitalMembershipCardDesc = 'digitalMembershipCard_DESC',
  DigitalServiceAsc = 'digitalService_ASC',
  DigitalServiceDesc = 'digitalService_DESC',
  DisabledAccessAsc = 'disabledAccess_ASC',
  DisabledAccessDesc = 'disabledAccess_DESC',
  FastTrackLaneAsc = 'fastTrackLane_ASC',
  FastTrackLaneDesc = 'fastTrackLane_DESC',
  FlightInformationMonitorAsc = 'flightInformationMonitor_ASC',
  FlightInformationMonitorDesc = 'flightInformationMonitor_DESC',
  GymAsc = 'gym_ASC',
  GymDesc = 'gym_DESC',
  HotBuffetAsc = 'hotBuffet_ASC',
  HotBuffetDesc = 'hotBuffet_DESC',
  HotDrinksAsc = 'hotDrinks_ASC',
  HotDrinksDesc = 'hotDrinks_DESC',
  InternetDataportAsc = 'internetDataport_ASC',
  InternetDataportDesc = 'internetDataport_DESC',
  NewspapersMagazinesAsc = 'newspapersMagazines_ASC',
  NewspapersMagazinesDesc = 'newspapersMagazines_DESC',
  NoSmokingAsc = 'noSmoking_ASC',
  NoSmokingDesc = 'noSmoking_DESC',
  RefreshmentsAlcoholicAsc = 'refreshmentsAlcoholic_ASC',
  RefreshmentsAlcoholicDesc = 'refreshmentsAlcoholic_DESC',
  RefreshmentsSoftDrinksAsc = 'refreshmentsSoftDrinks_ASC',
  RefreshmentsSoftDrinksDesc = 'refreshmentsSoftDrinks_DESC',
  SelfServiceAsc = 'selfService_ASC',
  SelfServiceDesc = 'selfService_DESC',
  ShoeShineAsc = 'shoeShine_ASC',
  ShoeShineDesc = 'shoeShine_DESC',
  ShowerFacilitiesAsc = 'showerFacilities_ASC',
  ShowerFacilitiesDesc = 'showerFacilities_DESC',
  SleepRoomQuietAreaAsc = 'sleepRoomQuietArea_ASC',
  SleepRoomQuietAreaDesc = 'sleepRoomQuietArea_DESC',
  SnacksAsc = 'snacks_ASC',
  SnacksDesc = 'snacks_DESC',
  SoftDrinksAsc = 'softDrinks_ASC',
  SoftDrinksDesc = 'softDrinks_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TableServiceAsc = 'tableService_ASC',
  TableServiceDesc = 'tableService_DESC',
  TelephoneAsc = 'telephone_ASC',
  TelephoneDesc = 'telephone_DESC',
  TelevisionAsc = 'television_ASC',
  TelevisionDesc = 'television_DESC',
  WifiAsc = 'wifi_ASC',
  WifiDesc = 'wifi_DESC',
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
  backgroundColor?: InputMaybe<Scalars['HexColor']['input']>;
  /**
   * Desired corner radius in pixels.
   *         Results in an image with rounded corners (pass `-1` for a full circle/ellipse).
   *         Defaults to `0`. Uses desired background color as padding color,
   *         unless the format is `JPG` or `JPG_PROGRESSIVE` and resize strategy is `PAD`, then defaults to white.
   */
  cornerRadius?: InputMaybe<Scalars['Int']['input']>;
  /** Desired image format. Defaults to the original image format. */
  format?: InputMaybe<ImageFormat>;
  /** Desired height in pixels. Defaults to the original image height. */
  height?: InputMaybe<Scalars['Dimension']['input']>;
  /**
   * Desired quality of the image in percents.
   *         Used for `PNG8`, `JPG`, `JPG_PROGRESSIVE` and `WEBP` formats.
   */
  quality?: InputMaybe<Scalars['Quality']['input']>;
  /** Desired resize focus area. Defaults to `CENTER`. */
  resizeFocus?: InputMaybe<ImageResizeFocus>;
  /** Desired resize strategy. Defaults to `FIT`. */
  resizeStrategy?: InputMaybe<ImageResizeStrategy>;
  /** Desired width in pixels. Defaults to the original image width. */
  width?: InputMaybe<Scalars['Dimension']['input']>;
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
  /** Metadata about editor and last edited */
  meta?: Maybe<Meta>;
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
  /** Metadata about editor and last edited */
  meta?: InputMaybe<MetaInput>;
  /** The name of the location */
  name?: InputMaybe<Scalars['String']['input']>;
  /** The terminal of the location */
  terminal?: InputMaybe<Scalars['String']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/locationSummary) */
export type LocationSummary = Entry & {
  __typename?: 'LocationSummary';
  concourse?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  floorLevel?: Maybe<Scalars['Int']['output']>;
  gps?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<LocationSummaryLinkingCollections>;
  sys: Sys;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/locationSummary) */
export type LocationSummaryConcourseArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/locationSummary) */
export type LocationSummaryFloorLevelArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/locationSummary) */
export type LocationSummaryGpsArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/locationSummary) */
export type LocationSummaryLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type LocationSummaryCollection = {
  __typename?: 'LocationSummaryCollection';
  items: Array<Maybe<LocationSummary>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type LocationSummaryFilter = {
  AND?: InputMaybe<Array<InputMaybe<LocationSummaryFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<LocationSummaryFilter>>>;
  concourse?: InputMaybe<Scalars['String']['input']>;
  concourse_contains?: InputMaybe<Scalars['String']['input']>;
  concourse_exists?: InputMaybe<Scalars['Boolean']['input']>;
  concourse_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  concourse_not?: InputMaybe<Scalars['String']['input']>;
  concourse_not_contains?: InputMaybe<Scalars['String']['input']>;
  concourse_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  floorLevel?: InputMaybe<Scalars['Int']['input']>;
  floorLevel_exists?: InputMaybe<Scalars['Boolean']['input']>;
  floorLevel_gt?: InputMaybe<Scalars['Int']['input']>;
  floorLevel_gte?: InputMaybe<Scalars['Int']['input']>;
  floorLevel_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  floorLevel_lt?: InputMaybe<Scalars['Int']['input']>;
  floorLevel_lte?: InputMaybe<Scalars['Int']['input']>;
  floorLevel_not?: InputMaybe<Scalars['Int']['input']>;
  floorLevel_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  gps?: InputMaybe<Scalars['String']['input']>;
  gps_contains?: InputMaybe<Scalars['String']['input']>;
  gps_exists?: InputMaybe<Scalars['Boolean']['input']>;
  gps_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  gps_not?: InputMaybe<Scalars['String']['input']>;
  gps_not_contains?: InputMaybe<Scalars['String']['input']>;
  gps_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type LocationSummaryLinkingCollections = {
  __typename?: 'LocationSummaryLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  outletContentCollection?: Maybe<OutletContentCollection>;
};

export type LocationSummaryLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type LocationSummaryLinkingCollectionsOutletContentCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<
    Array<
      InputMaybe<LocationSummaryLinkingCollectionsOutletContentCollectionOrder>
    >
  >;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum LocationSummaryLinkingCollectionsOutletContentCollectionOrder {
  LegacyCodeAsc = 'legacyCode_ASC',
  LegacyCodeDesc = 'legacyCode_DESC',
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

export enum LocationSummaryOrder {
  ConcourseAsc = 'concourse_ASC',
  ConcourseDesc = 'concourse_DESC',
  FloorLevelAsc = 'floorLevel_ASC',
  FloorLevelDesc = 'floorLevel_DESC',
  GpsAsc = 'gps_ASC',
  GpsDesc = 'gps_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/media) */
export type Media = Entry & {
  __typename?: 'Media';
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<MediaLinkingCollections>;
  mainImage?: Maybe<Asset>;
  mediaCollection?: Maybe<AssetCollection>;
  sys: Sys;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/media) */
export type MediaLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/media) */
export type MediaMainImageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/media) */
export type MediaMediaCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type MediaCollection = {
  __typename?: 'MediaCollection';
  items: Array<Maybe<Media>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type MediaFilter = {
  AND?: InputMaybe<Array<InputMaybe<MediaFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<MediaFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  mainImage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  mediaCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sys?: InputMaybe<SysFilter>;
};

export type MediaLinkingCollections = {
  __typename?: 'MediaLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  outletContentCollection?: Maybe<OutletContentCollection>;
};

export type MediaLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type MediaLinkingCollectionsOutletContentCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<
    Array<InputMaybe<MediaLinkingCollectionsOutletContentCollectionOrder>>
  >;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum MediaLinkingCollectionsOutletContentCollectionOrder {
  LegacyCodeAsc = 'legacyCode_ASC',
  LegacyCodeDesc = 'legacyCode_DESC',
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

export enum MediaOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export type Meta = {
  __typename?: 'Meta';
  /** The editor who last edited the object */
  editor?: Maybe<Editor>;
  /** The date the object was last edited */
  lastEdited?: Maybe<Scalars['Date']['output']>;
};

export type MetaInput = {
  /** The editor who last edited the object */
  editor?: InputMaybe<EditorInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptInvitation?: Maybe<Invitation>;
  addTagToOutlet?: Maybe<Outlet>;
  cancelBooking?: Maybe<Booking>;
  cancelInvitation?: Maybe<Invitation>;
  checkinBooking?: Maybe<Booking>;
  confirmAmendment?: Maybe<Amendment>;
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

export type MutationConfirmAmendmentArgs = {
  amendmentInput?: InputMaybe<AmendmentInput>;
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
  /** Metadata about editor and last edited */
  meta?: Maybe<Meta>;
  /** The standard opening time schedules */
  schedules?: Maybe<DaySchedules>;
  /** The variations to the standard opening times */
  variations?: Maybe<Array<Maybe<Variation>>>;
};

export type OpeningTimesInput = {
  /** The opening times expection text. This will be deprecated in favour of variations */
  exceptions?: InputMaybe<Scalars['String']['input']>;
  /** Metadata about editor and last edited */
  meta?: InputMaybe<MetaInput>;
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
  /** The code of the outlet */
  code?: Maybe<Scalars['String']['output']>;
  /** The content data from Contentful */
  content?: Maybe<OutletContent>;
  /** Whether the outlet has disabled access */
  hasDisabledAccess: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  /** The legacy code of the outlet (Lounge Code) eg LHR13 */
  legacyCode?: Maybe<Scalars['String']['output']>;
  /** The location of the outlet */
  location: Location;
  /** Metadata about editor and last edited */
  meta?: Maybe<Meta>;
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

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/outletContent) */
export type OutletContent = Entry & {
  __typename?: 'OutletContent';
  conditions?: Maybe<Conditions>;
  contentfulMetadata: ContentfulMetadata;
  facilities?: Maybe<Facilities>;
  legacyCode?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<OutletContentLinkingCollections>;
  locationSummary?: Maybe<LocationSummary>;
  media?: Maybe<Media>;
  name?: Maybe<Scalars['String']['output']>;
  sys: Sys;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/outletContent) */
export type OutletContentConditionsArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ConditionsFilter>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/outletContent) */
export type OutletContentFacilitiesArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<FacilitiesFilter>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/outletContent) */
export type OutletContentLegacyCodeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/outletContent) */
export type OutletContentLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/outletContent) */
export type OutletContentLocationSummaryArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<LocationSummaryFilter>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/outletContent) */
export type OutletContentMediaArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<MediaFilter>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/outletContent) */
export type OutletContentNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type OutletContentCollection = {
  __typename?: 'OutletContentCollection';
  items: Array<Maybe<OutletContent>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type OutletContentFilter = {
  AND?: InputMaybe<Array<InputMaybe<OutletContentFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<OutletContentFilter>>>;
  conditions?: InputMaybe<CfConditionsNestedFilter>;
  conditions_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  facilities?: InputMaybe<CfFacilitiesNestedFilter>;
  facilities_exists?: InputMaybe<Scalars['Boolean']['input']>;
  legacyCode?: InputMaybe<Scalars['String']['input']>;
  legacyCode_contains?: InputMaybe<Scalars['String']['input']>;
  legacyCode_exists?: InputMaybe<Scalars['Boolean']['input']>;
  legacyCode_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  legacyCode_not?: InputMaybe<Scalars['String']['input']>;
  legacyCode_not_contains?: InputMaybe<Scalars['String']['input']>;
  legacyCode_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  locationSummary?: InputMaybe<CfLocationSummaryNestedFilter>;
  locationSummary_exists?: InputMaybe<Scalars['Boolean']['input']>;
  media?: InputMaybe<CfMediaNestedFilter>;
  media_exists?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_exists?: InputMaybe<Scalars['Boolean']['input']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type OutletContentLinkingCollections = {
  __typename?: 'OutletContentLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};

export type OutletContentLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum OutletContentOrder {
  LegacyCodeAsc = 'legacyCode_ASC',
  LegacyCodeDesc = 'legacyCode_DESC',
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

export type OutletInput = {
  /** The category of outlet eg AIRPORT, FERRY_STATION, RAILWAY_STATION */
  category: OutletCategory;
  /** Whether the outlet has disabled access */
  hasDisabledAccess: Scalars['Boolean']['input'];
  /** The legacy code of the outlet (Lounge Code) eg LHR13 */
  legacyCode?: InputMaybe<Scalars['String']['input']>;
  /** The location of the outlet */
  location: LocationInput;
  /** Metadata about editor and last edited */
  meta?: InputMaybe<MetaInput>;
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

export type PageInfo = {
  __typename?: 'PageInfo';
  currentPage?: Maybe<Scalars['Int']['output']>;
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type PaginatedOutlets = {
  __typename?: 'PaginatedOutlets';
  items?: Maybe<Array<Maybe<Outlet>>>;
  pageInfo?: Maybe<PageInfo>;
  totalItemCount?: Maybe<Scalars['Int']['output']>;
};

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
  content?: Maybe<PartnerBrandContent>;
  id: Scalars['ID']['output'];
  /** The name of the partner brand */
  name: Scalars['String']['output'];
  outlets: Array<Maybe<Outlet>>;
  /** The salesforce ID of the partner brand */
  salesforceID: Scalars['String']['output'];
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/partnerBrandContent) */
export type PartnerBrandContent = Entry & {
  __typename?: 'PartnerBrandContent';
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<PartnerBrandContentLinkingCollections>;
  logo?: Maybe<Asset>;
  name?: Maybe<Scalars['String']['output']>;
  sys: Sys;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/partnerBrandContent) */
export type PartnerBrandContentLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/partnerBrandContent) */
export type PartnerBrandContentLogoArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/687qsr16btly/content_types/partnerBrandContent) */
export type PartnerBrandContentNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type PartnerBrandContentCollection = {
  __typename?: 'PartnerBrandContentCollection';
  items: Array<Maybe<PartnerBrandContent>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PartnerBrandContentFilter = {
  AND?: InputMaybe<Array<InputMaybe<PartnerBrandContentFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PartnerBrandContentFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  logo_exists?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_exists?: InputMaybe<Scalars['Boolean']['input']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type PartnerBrandContentLinkingCollections = {
  __typename?: 'PartnerBrandContentLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};

export type PartnerBrandContentLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum PartnerBrandContentOrder {
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
  /** The cost of a reservation part only */
  reservationCost: Scalars['Float']['output'];
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
  /** The cost of a reservation part only */
  reservationCost: Scalars['Float']['input'];
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
  ppStripeID?: InputMaybe<Scalars['String']['input']>;
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
  asset?: Maybe<Asset>;
  assetCollection?: Maybe<AssetCollection>;
  conditions?: Maybe<Conditions>;
  conditionsCollection?: Maybe<ConditionsCollection>;
  entryCollection?: Maybe<EntryCollection>;
  facilities?: Maybe<Facilities>;
  facilitiesCollection?: Maybe<FacilitiesCollection>;
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
  getFlightDetailsHealthCheck: Array<FlightDetails>;
  getInvitationByID?: Maybe<Invitation>;
  getInvitations: Array<Invitation>;
  getOutletByID?: Maybe<Outlet>;
  getOutletBySalesforceID?: Maybe<Outlet>;
  getOutlets?: Maybe<PaginatedOutlets>;
  getPartner?: Maybe<Partner>;
  getPartnerBrandByID?: Maybe<PartnerBrand>;
  getPartnerBrandBySalesforceID?: Maybe<PartnerBrand>;
  getPartnerBrands?: Maybe<Array<Maybe<PartnerBrand>>>;
  getPartnerByEmailAddress?: Maybe<Partner>;
  getPartnerByID?: Maybe<Partner>;
  getProductByID?: Maybe<Product>;
  getProductBySalesforceID?: Maybe<Product>;
  isInvitationTokenValid?: Maybe<Scalars['Boolean']['output']>;
  locationSummary?: Maybe<LocationSummary>;
  locationSummaryCollection?: Maybe<LocationSummaryCollection>;
  media?: Maybe<Media>;
  mediaCollection?: Maybe<MediaCollection>;
  outletContent?: Maybe<OutletContent>;
  outletContentCollection?: Maybe<OutletContentCollection>;
  partnerBrandContent?: Maybe<PartnerBrandContent>;
  partnerBrandContentCollection?: Maybe<PartnerBrandContentCollection>;
  searchExperiences?: Maybe<Array<Maybe<Experience>>>;
};

export type QueryAssetArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};

export type QueryAssetCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<AssetOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AssetFilter>;
};

export type QueryConditionsArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};

export type QueryConditionsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ConditionsOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ConditionsFilter>;
};

export type QueryEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<EntryOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EntryFilter>;
};

export type QueryFacilitiesArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};

export type QueryFacilitiesCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<FacilitiesOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<FacilitiesFilter>;
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

export type QueryGetFlightDetailsHealthCheckArgs = {
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

export type QueryGetOutletBySalesforceIdArgs = {
  salesforceID: Scalars['String']['input'];
};

export type QueryGetOutletsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryGetPartnerBrandByIdArgs = {
  id: Scalars['ID']['input'];
};

export type QueryGetPartnerBrandBySalesforceIdArgs = {
  salesforceID: Scalars['String']['input'];
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

export type QueryGetProductBySalesforceIdArgs = {
  salesforceID: Scalars['String']['input'];
};

export type QueryIsInvitationTokenValidArgs = {
  inviteToken: Scalars['String']['input'];
};

export type QueryLocationSummaryArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};

export type QueryLocationSummaryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<LocationSummaryOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LocationSummaryFilter>;
};

export type QueryMediaArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};

export type QueryMediaCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<MediaOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MediaFilter>;
};

export type QueryOutletContentArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};

export type QueryOutletContentCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<OutletContentOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<OutletContentFilter>;
};

export type QueryPartnerBrandContentArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};

export type QueryPartnerBrandContentCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<PartnerBrandContentOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PartnerBrandContentFilter>;
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

/** The lifecycle statuses of a refund */
export enum RefundStatus {
  /** Cancelled */
  Canceled = 'CANCELED',
  /** Failed */
  Failed = 'FAILED',
  /** Default value */
  NotApplicable = 'NOT_APPLICABLE',
  /** Requires action on dashboard */
  Pending = 'PENDING',
  /** Requires action on dashboard */
  RequiresAction = 'REQUIRES_ACTION',
  /** Successful payment */
  Succeeded = 'SUCCEEDED',
}

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
  environmentId: Scalars['String']['output'];
  firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  /** The locale that was requested - mainly used for Apollo Federation. */
  locale?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  publishedVersion?: Maybe<Scalars['Int']['output']>;
  spaceId: Scalars['String']['output'];
};

export type SysFilter = {
  firstPublishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_exists?: InputMaybe<Scalars['Boolean']['input']>;
  firstPublishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_in?: InputMaybe<
    Array<InputMaybe<Scalars['DateTime']['input']>>
  >;
  firstPublishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_not_in?: InputMaybe<
    Array<InputMaybe<Scalars['DateTime']['input']>>
  >;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_exists?: InputMaybe<Scalars['Boolean']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_exists?: InputMaybe<Scalars['Boolean']['input']>;
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_not_in?: InputMaybe<
    Array<InputMaybe<Scalars['DateTime']['input']>>
  >;
  publishedVersion?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_exists?: InputMaybe<Scalars['Boolean']['input']>;
  publishedVersion_gt?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_gte?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_in?: InputMaybe<
    Array<InputMaybe<Scalars['Float']['input']>>
  >;
  publishedVersion_lt?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_lte?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_not?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_not_in?: InputMaybe<
    Array<InputMaybe<Scalars['Float']['input']>>
  >;
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

export type CfConditionsNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfConditionsNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfConditionsNestedFilter>>>;
  accessPrior?: InputMaybe<Scalars['String']['input']>;
  accessPrior_contains?: InputMaybe<Scalars['String']['input']>;
  accessPrior_exists?: InputMaybe<Scalars['Boolean']['input']>;
  accessPrior_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  accessPrior_not?: InputMaybe<Scalars['String']['input']>;
  accessPrior_not_contains?: InputMaybe<Scalars['String']['input']>;
  accessPrior_not_in?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  childPolicy?: InputMaybe<Scalars['String']['input']>;
  childPolicy_contains?: InputMaybe<Scalars['String']['input']>;
  childPolicy_exists?: InputMaybe<Scalars['Boolean']['input']>;
  childPolicy_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  childPolicy_not?: InputMaybe<Scalars['String']['input']>;
  childPolicy_not_contains?: InputMaybe<Scalars['String']['input']>;
  childPolicy_not_in?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  dressCode?: InputMaybe<Scalars['String']['input']>;
  dressCode_contains?: InputMaybe<Scalars['String']['input']>;
  dressCode_exists?: InputMaybe<Scalars['Boolean']['input']>;
  dressCode_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  dressCode_not?: InputMaybe<Scalars['String']['input']>;
  dressCode_not_contains?: InputMaybe<Scalars['String']['input']>;
  dressCode_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  legacyConditions?: InputMaybe<Scalars['String']['input']>;
  legacyConditions_contains?: InputMaybe<Scalars['String']['input']>;
  legacyConditions_exists?: InputMaybe<Scalars['Boolean']['input']>;
  legacyConditions_in?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  legacyConditions_not?: InputMaybe<Scalars['String']['input']>;
  legacyConditions_not_contains?: InputMaybe<Scalars['String']['input']>;
  legacyConditions_not_in?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  maxStay?: InputMaybe<Scalars['Int']['input']>;
  maxStay_exists?: InputMaybe<Scalars['Boolean']['input']>;
  maxStay_gt?: InputMaybe<Scalars['Int']['input']>;
  maxStay_gte?: InputMaybe<Scalars['Int']['input']>;
  maxStay_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  maxStay_lt?: InputMaybe<Scalars['Int']['input']>;
  maxStay_lte?: InputMaybe<Scalars['Int']['input']>;
  maxStay_not?: InputMaybe<Scalars['Int']['input']>;
  maxStay_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  smokingPolicy?: InputMaybe<Scalars['String']['input']>;
  smokingPolicy_contains?: InputMaybe<Scalars['String']['input']>;
  smokingPolicy_exists?: InputMaybe<Scalars['Boolean']['input']>;
  smokingPolicy_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  smokingPolicy_not?: InputMaybe<Scalars['String']['input']>;
  smokingPolicy_not_contains?: InputMaybe<Scalars['String']['input']>;
  smokingPolicy_not_in?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  sys?: InputMaybe<SysFilter>;
};

export type CfFacilitiesNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfFacilitiesNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfFacilitiesNestedFilter>>>;
  airConditioning?: InputMaybe<Scalars['Boolean']['input']>;
  airConditioning_exists?: InputMaybe<Scalars['Boolean']['input']>;
  airConditioning_not?: InputMaybe<Scalars['Boolean']['input']>;
  alcohol?: InputMaybe<Scalars['Boolean']['input']>;
  alcohol_exists?: InputMaybe<Scalars['Boolean']['input']>;
  alcohol_not?: InputMaybe<Scalars['Boolean']['input']>;
  checkInFacility?: InputMaybe<Scalars['Boolean']['input']>;
  checkInFacility_exists?: InputMaybe<Scalars['Boolean']['input']>;
  checkInFacility_not?: InputMaybe<Scalars['Boolean']['input']>;
  coldBuffet?: InputMaybe<Scalars['Boolean']['input']>;
  coldBuffet_exists?: InputMaybe<Scalars['Boolean']['input']>;
  coldBuffet_not?: InputMaybe<Scalars['Boolean']['input']>;
  conferenceFacilities?: InputMaybe<Scalars['Boolean']['input']>;
  conferenceFacilities_exists?: InputMaybe<Scalars['Boolean']['input']>;
  conferenceFacilities_not?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  dMcUnavailable?: InputMaybe<Scalars['Boolean']['input']>;
  dMcUnavailable_exists?: InputMaybe<Scalars['Boolean']['input']>;
  dMcUnavailable_not?: InputMaybe<Scalars['Boolean']['input']>;
  digitalMembershipCard?: InputMaybe<Scalars['Boolean']['input']>;
  digitalMembershipCard_exists?: InputMaybe<Scalars['Boolean']['input']>;
  digitalMembershipCard_not?: InputMaybe<Scalars['Boolean']['input']>;
  digitalService?: InputMaybe<Scalars['Boolean']['input']>;
  digitalService_exists?: InputMaybe<Scalars['Boolean']['input']>;
  digitalService_not?: InputMaybe<Scalars['Boolean']['input']>;
  disabledAccess?: InputMaybe<Scalars['Boolean']['input']>;
  disabledAccess_exists?: InputMaybe<Scalars['Boolean']['input']>;
  disabledAccess_not?: InputMaybe<Scalars['Boolean']['input']>;
  fastTrackLane?: InputMaybe<Scalars['Boolean']['input']>;
  fastTrackLane_exists?: InputMaybe<Scalars['Boolean']['input']>;
  fastTrackLane_not?: InputMaybe<Scalars['Boolean']['input']>;
  flightInformationMonitor?: InputMaybe<Scalars['Boolean']['input']>;
  flightInformationMonitor_exists?: InputMaybe<Scalars['Boolean']['input']>;
  flightInformationMonitor_not?: InputMaybe<Scalars['Boolean']['input']>;
  gym?: InputMaybe<Scalars['Boolean']['input']>;
  gym_exists?: InputMaybe<Scalars['Boolean']['input']>;
  gym_not?: InputMaybe<Scalars['Boolean']['input']>;
  hotBuffet?: InputMaybe<Scalars['Boolean']['input']>;
  hotBuffet_exists?: InputMaybe<Scalars['Boolean']['input']>;
  hotBuffet_not?: InputMaybe<Scalars['Boolean']['input']>;
  hotDrinks?: InputMaybe<Scalars['Boolean']['input']>;
  hotDrinks_exists?: InputMaybe<Scalars['Boolean']['input']>;
  hotDrinks_not?: InputMaybe<Scalars['Boolean']['input']>;
  internetDataport?: InputMaybe<Scalars['Boolean']['input']>;
  internetDataport_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internetDataport_not?: InputMaybe<Scalars['Boolean']['input']>;
  newspapersMagazines?: InputMaybe<Scalars['Boolean']['input']>;
  newspapersMagazines_exists?: InputMaybe<Scalars['Boolean']['input']>;
  newspapersMagazines_not?: InputMaybe<Scalars['Boolean']['input']>;
  noSmoking?: InputMaybe<Scalars['Boolean']['input']>;
  noSmoking_exists?: InputMaybe<Scalars['Boolean']['input']>;
  noSmoking_not?: InputMaybe<Scalars['Boolean']['input']>;
  refreshmentsAlcoholic?: InputMaybe<Scalars['Boolean']['input']>;
  refreshmentsAlcoholic_exists?: InputMaybe<Scalars['Boolean']['input']>;
  refreshmentsAlcoholic_not?: InputMaybe<Scalars['Boolean']['input']>;
  refreshmentsSoftDrinks?: InputMaybe<Scalars['Boolean']['input']>;
  refreshmentsSoftDrinks_exists?: InputMaybe<Scalars['Boolean']['input']>;
  refreshmentsSoftDrinks_not?: InputMaybe<Scalars['Boolean']['input']>;
  selfService?: InputMaybe<Scalars['Boolean']['input']>;
  selfService_exists?: InputMaybe<Scalars['Boolean']['input']>;
  selfService_not?: InputMaybe<Scalars['Boolean']['input']>;
  shoeShine?: InputMaybe<Scalars['Boolean']['input']>;
  shoeShine_exists?: InputMaybe<Scalars['Boolean']['input']>;
  shoeShine_not?: InputMaybe<Scalars['Boolean']['input']>;
  showerFacilities?: InputMaybe<Scalars['Boolean']['input']>;
  showerFacilities_exists?: InputMaybe<Scalars['Boolean']['input']>;
  showerFacilities_not?: InputMaybe<Scalars['Boolean']['input']>;
  sleepRoomQuietArea?: InputMaybe<Scalars['Boolean']['input']>;
  sleepRoomQuietArea_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sleepRoomQuietArea_not?: InputMaybe<Scalars['Boolean']['input']>;
  snacks?: InputMaybe<Scalars['Boolean']['input']>;
  snacks_exists?: InputMaybe<Scalars['Boolean']['input']>;
  snacks_not?: InputMaybe<Scalars['Boolean']['input']>;
  softDrinks?: InputMaybe<Scalars['Boolean']['input']>;
  softDrinks_exists?: InputMaybe<Scalars['Boolean']['input']>;
  softDrinks_not?: InputMaybe<Scalars['Boolean']['input']>;
  sys?: InputMaybe<SysFilter>;
  tableService?: InputMaybe<Scalars['Boolean']['input']>;
  tableService_exists?: InputMaybe<Scalars['Boolean']['input']>;
  tableService_not?: InputMaybe<Scalars['Boolean']['input']>;
  telephone?: InputMaybe<Scalars['Boolean']['input']>;
  telephone_exists?: InputMaybe<Scalars['Boolean']['input']>;
  telephone_not?: InputMaybe<Scalars['Boolean']['input']>;
  television?: InputMaybe<Scalars['Boolean']['input']>;
  television_exists?: InputMaybe<Scalars['Boolean']['input']>;
  television_not?: InputMaybe<Scalars['Boolean']['input']>;
  wifi?: InputMaybe<Scalars['Boolean']['input']>;
  wifi_exists?: InputMaybe<Scalars['Boolean']['input']>;
  wifi_not?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CfLocationSummaryNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfLocationSummaryNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfLocationSummaryNestedFilter>>>;
  concourse?: InputMaybe<Scalars['String']['input']>;
  concourse_contains?: InputMaybe<Scalars['String']['input']>;
  concourse_exists?: InputMaybe<Scalars['Boolean']['input']>;
  concourse_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  concourse_not?: InputMaybe<Scalars['String']['input']>;
  concourse_not_contains?: InputMaybe<Scalars['String']['input']>;
  concourse_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  floorLevel?: InputMaybe<Scalars['Int']['input']>;
  floorLevel_exists?: InputMaybe<Scalars['Boolean']['input']>;
  floorLevel_gt?: InputMaybe<Scalars['Int']['input']>;
  floorLevel_gte?: InputMaybe<Scalars['Int']['input']>;
  floorLevel_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  floorLevel_lt?: InputMaybe<Scalars['Int']['input']>;
  floorLevel_lte?: InputMaybe<Scalars['Int']['input']>;
  floorLevel_not?: InputMaybe<Scalars['Int']['input']>;
  floorLevel_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  gps?: InputMaybe<Scalars['String']['input']>;
  gps_contains?: InputMaybe<Scalars['String']['input']>;
  gps_exists?: InputMaybe<Scalars['Boolean']['input']>;
  gps_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  gps_not?: InputMaybe<Scalars['String']['input']>;
  gps_not_contains?: InputMaybe<Scalars['String']['input']>;
  gps_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type CfMediaNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfMediaNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfMediaNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  mainImage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  mediaCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sys?: InputMaybe<SysFilter>;
};

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
    locale?: string | null;
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

export type GetOutletByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetOutletByIdQuery = {
  __typename?: 'Query';
  getOutletByID?: {
    __typename?: 'Outlet';
    id: string;
    name: string;
    category: OutletCategory;
    code?: string | null;
    legacyCode?: string | null;
    hasDisabledAccess: boolean;
    tier?: string | null;
    tags: Array<string | null>;
    status: OutletStatus;
    salesforceID: string;
    reservationEmail?: string | null;
    location: {
      __typename?: 'Location';
      city?: string | null;
      code?: string | null;
      country: string;
      isoCountryCode?: IsoCountryCode | null;
      landside?: boolean | null;
      name?: string | null;
      terminal?: string | null;
    };
    meta?: {
      __typename?: 'Meta';
      lastEdited?: any | null;
      editor?: {
        __typename?: 'Editor';
        lastName?: string | null;
        firstName?: string | null;
        organisation?: string | null;
      } | null;
    } | null;
    products: Array<{
      __typename?: 'Product';
      id: string;
      name: string;
      category: ProductCategory;
      status: ProductStatus;
    } | null>;
    openingTimes?: {
      __typename?: 'OpeningTimes';
      exceptions?: string | null;
      schedules?: {
        __typename?: 'DaySchedules';
        MONDAY?: Array<{
          __typename?: 'Schedule';
          endTime: string;
          startTime: string;
        } | null> | null;
        TUESDAY?: Array<{
          __typename?: 'Schedule';
          endTime: string;
          startTime: string;
        } | null> | null;
        WEDNESDAY?: Array<{
          __typename?: 'Schedule';
          endTime: string;
          startTime: string;
        } | null> | null;
        THURSDAY?: Array<{
          __typename?: 'Schedule';
          endTime: string;
          startTime: string;
        } | null> | null;
        FRIDAY?: Array<{
          __typename?: 'Schedule';
          endTime: string;
          startTime: string;
        } | null> | null;
        SATURDAY?: Array<{
          __typename?: 'Schedule';
          endTime: string;
          startTime: string;
        } | null> | null;
        SUNDAY?: Array<{
          __typename?: 'Schedule';
          endTime: string;
          startTime: string;
        } | null> | null;
      } | null;
    } | null;
    content?: {
      __typename?: 'OutletContent';
      media?: {
        __typename?: 'Media';
        mainImage?: {
          __typename?: 'Asset';
          url?: string | null;
          description?: string | null;
          title?: string | null;
        } | null;
        mediaCollection?: {
          __typename?: 'AssetCollection';
          items: Array<{
            __typename?: 'Asset';
            url?: string | null;
            description?: string | null;
            title?: string | null;
          } | null>;
        } | null;
      } | null;
    } | null;
    partnerBrand: { __typename?: 'PartnerBrand'; name: string };
  } | null;
};

export type GetOutletsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetOutletsQuery = {
  __typename?: 'Query';
  getOutlets?: {
    __typename?: 'PaginatedOutlets';
    totalItemCount?: number | null;
    items?: Array<{
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
      content?: {
        __typename?: 'OutletContent';
        media?: {
          __typename?: 'Media';
          mainImage?: { __typename?: 'Asset'; url?: string | null } | null;
          mediaCollection?: {
            __typename?: 'AssetCollection';
            items: Array<{
              __typename?: 'Asset';
              contentType?: string | null;
            } | null>;
          } | null;
        } | null;
      } | null;
    } | null> | null;
    pageInfo?: {
      __typename?: 'PageInfo';
      currentPage?: number | null;
      hasNextPage?: boolean | null;
      hasPreviousPage?: boolean | null;
      totalPages?: number | null;
    } | null;
  } | null;
};

export type GetOutletsCountQueryVariables = Exact<{ [key: string]: never }>;

export type GetOutletsCountQuery = {
  __typename?: 'Query';
  getOutlets?: {
    __typename?: 'PaginatedOutlets';
    totalItemCount?: number | null;
  } | null;
};

export type GetPartnerBrandByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetPartnerBrandByIdQuery = {
  __typename?: 'Query';
  getPartnerBrandByID?: {
    __typename?: 'PartnerBrand';
    id: string;
    name: string;
    outlets: Array<{
      __typename?: 'Outlet';
      id: string;
      category: OutletCategory;
      name: string;
      legacyCode?: string | null;
      status: OutletStatus;
      tags: Array<string | null>;
      location: {
        __typename?: 'Location';
        name?: string | null;
        terminal?: string | null;
      };
      content?: {
        __typename?: 'OutletContent';
        media?: {
          __typename?: 'Media';
          mainImage?: { __typename?: 'Asset'; url?: string | null } | null;
          mediaCollection?: {
            __typename?: 'AssetCollection';
            items: Array<{
              __typename?: 'Asset';
              contentType?: string | null;
            } | null>;
          } | null;
        } | null;
      } | null;
    } | null>;
  } | null;
};

export type GetPartnerBrandsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetPartnerBrandsQuery = {
  __typename?: 'Query';
  getPartnerBrands?: Array<{
    __typename?: 'PartnerBrand';
    id: string;
    name: string;
    outlets: Array<{ __typename?: 'Outlet'; id: string } | null>;
  } | null> | null;
};

export type GetPartnerBrandsCountQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetPartnerBrandsCountQuery = {
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
                { kind: 'Field', name: { kind: 'Name', value: 'locale' } },
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
export const GetOutletByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetOutletByID' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
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
            name: { kind: 'Name', value: 'getOutletByID' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'category' } },
                { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                { kind: 'Field', name: { kind: 'Name', value: 'legacyCode' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'location' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'country' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'isoCountryCode' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'landside' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'terminal' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'meta' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'editor' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'lastName' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'firstName' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'organisation' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lastEdited' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'products' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'category' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'status' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'openingTimes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'exceptions' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'schedules' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'MONDAY' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'endTime' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'startTime' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'TUESDAY' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'endTime' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'startTime' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'WEDNESDAY' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'endTime' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'startTime' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'THURSDAY' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'endTime' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'startTime' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'FRIDAY' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'endTime' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'startTime' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'SATURDAY' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'endTime' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'startTime' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'SUNDAY' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'endTime' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'startTime' },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'hasDisabledAccess' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'tier' } },
                { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'content' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'media' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'mainImage' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'url' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'description',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'title' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'mediaCollection' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'items' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'url' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'description',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'title',
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
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'salesforceID' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'reservationEmail' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'partnerBrand' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
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
} as unknown as DocumentNode<GetOutletByIdQuery, GetOutletByIdQueryVariables>;
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
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'pageSize' },
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
                name: { kind: 'Name', value: 'page' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'page' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pageSize' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'pageSize' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'category' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'legacyCode' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'status' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'location' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'terminal' },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'content' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'media' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'mainImage' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'url' },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'mediaCollection',
                                    },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'items',
                                          },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'contentType',
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
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pageInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'currentPage' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hasNextPage' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hasPreviousPage' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'totalPages' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'totalItemCount' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetOutletsQuery, GetOutletsQueryVariables>;
export const GetOutletsCountDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetOutletsCount' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getOutlets' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'totalItemCount' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetOutletsCountQuery,
  GetOutletsCountQueryVariables
>;
export const GetPartnerBrandByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPartnerBrandByID' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
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
            name: { kind: 'Name', value: 'getPartnerBrandByID' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'outlets' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'category' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'legacyCode' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'status' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'location' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'terminal' },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'content' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'media' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'mainImage' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'url' },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'mediaCollection',
                                    },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'items',
                                          },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'contentType',
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
  GetPartnerBrandByIdQuery,
  GetPartnerBrandByIdQueryVariables
>;
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
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'outlets' },
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
      },
    },
  ],
} as unknown as DocumentNode<
  GetPartnerBrandsQuery,
  GetPartnerBrandsQueryVariables
>;
export const GetPartnerBrandsCountDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPartnerBrandsCount' },
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
  GetPartnerBrandsCountQuery,
  GetPartnerBrandsCountQueryVariables
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
