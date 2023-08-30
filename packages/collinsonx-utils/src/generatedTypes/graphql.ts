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
  JSONObject: any;
  ObjectID: any;
};

export type AcceptInvitationInput = {
  email: Scalars['String'];
  inviteToken: Scalars['String'];
  password: Scalars['String'];
};

export type Availability = {
  __typename?: 'Availability';
  messageID?: Maybe<Scalars['String']>;
  slots: Array<Slots>;
  temporaryReservationID?: Maybe<Scalars['String']>;
};

export type AvailabilityInput = {
  flightInformation: FlightInformation;
  guests: Guests;
  product: Product;
};

/** A record for the sale of a service, this could be either a reservation, walkup or other state. */
export type Booking = {
  __typename?: 'Booking';
  bookedFrom: Scalars['String'];
  bookedTo: Scalars['String'];
  consumer?: Maybe<Consumer>;
  createdAt: Scalars['Date'];
  experience?: Maybe<Experience>;
  guestCount: Scalars['Int'];
  id: Scalars['ID'];
  invoice?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['JSONObject']>;
  orderID?: Maybe<Scalars['String']>;
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

export type BookingInput = {
  bookedFrom: Scalars['Date'];
  bookedTo: Scalars['Date'];
  experience: ExperienceKey;
  guestCount: Scalars['Int'];
  invoice?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Scalars['JSONObject']>;
  stripePaymentID?: InputMaybe<Scalars['String']>;
  type: BookingType;
};

/** The lifecycle statuses of a booking */
export enum BookingStatus {
  Cancelled = 'CANCELLED',
  /** The booking has now been redeemed after being confirmed */
  CheckedIn = 'CHECKED_IN',
  Confirmed = 'CONFIRMED',
  Declined = 'DECLINED',
  Errored = 'ERRORED',
  /** A booking has been created, but not yet paid for */
  Initialized = 'INITIALIZED',
  /** Booking has been paid for and is now pending confirmation from the operator */
  Pending = 'PENDING',
}

/** The category of booking that has been made. */
export enum BookingType {
  Reservation = 'RESERVATION',
  WalkUp = 'WALK_UP',
}

export type Consumer = {
  __typename?: 'Consumer';
  bookings: Array<Booking>;
  createdAt: Scalars['Date'];
  crmId?: Maybe<Scalars['String']>;
  dateOfBirth?: Maybe<Scalars['Date']>;
  emailAddress: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
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

export type Experience = {
  __typename?: 'Experience';
  accessPeriod?: Maybe<Scalars['String']>;
  additionalInformation?: Maybe<Scalars['String']>;
  airsideLandside?: Maybe<Scalars['String']>;
  bookings: Array<Booking>;
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
  location?: Maybe<Location>;
  loungeCode?: Maybe<Scalars['String']>;
  loungeName?: Maybe<Scalars['String']>;
  loungeOffers?: Maybe<Array<Maybe<Scalars['String']>>>;
  marketingCopy?: Maybe<Scalars['String']>;
  msDynamicsUID?: Maybe<Scalars['String']>;
  openingHours?: Maybe<Scalars['String']>;
  partners: Array<Partner>;
  passengerType?: Maybe<Scalars['String']>;
  ppboOperatorName?: Maybe<Scalars['String']>;
  pricing?: Maybe<Pricing>;
  redemption?: Maybe<Redemption>;
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

export type FlightInformation = {
  airport?: InputMaybe<Scalars['String']>;
  dateTime: Scalars['Date'];
  terminal: Scalars['String'];
  type: Scalars['String'];
};

export type Geoloc = {
  __typename?: 'Geoloc';
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
};

export type Guests = {
  adultCount: Scalars['Int'];
  childrenCount: Scalars['Int'];
  infantCount: Scalars['Int'];
};

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

export enum InvitationUserType {
  Partner = 'PARTNER',
  SuperUser = 'SUPER_USER',
}

export type Location = {
  __typename?: 'Location';
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
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptInvitation?: Maybe<Invitation>;
  cancelBooking?: Maybe<Booking>;
  cancelInvitation?: Maybe<Invitation>;
  checkinBooking?: Maybe<Booking>;
  confirmBooking?: Maybe<Booking>;
  createBooking?: Maybe<Booking>;
  createInvitation?: Maybe<Invitation>;
  declineBooking?: Maybe<Booking>;
  deleteBooking?: Maybe<Booking>;
  findOrCreateConsumer?: Maybe<Consumer>;
  findOrCreatePartner?: Maybe<Partner>;
  linkExperience?: Maybe<Partner>;
  payForBooking?: Maybe<Booking>;
  unlinkExperience?: Maybe<Partner>;
  updateConsumer?: Maybe<Consumer>;
  updatePartner?: Maybe<Partner>;
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

export type MutationCreateInvitationArgs = {
  invitationInput?: InputMaybe<InvitationInput>;
};

export type MutationDeclineBookingArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteBookingArgs = {
  id: Scalars['ID'];
};

export type MutationFindOrCreateConsumerArgs = {
  consumerInput?: InputMaybe<ConsumerInput>;
};

export type MutationFindOrCreatePartnerArgs = {
  partnerInput?: InputMaybe<PartnerInput>;
};

export type MutationLinkExperienceArgs = {
  experienceKey?: InputMaybe<ExperienceKey>;
  partnerKey?: InputMaybe<PartnerKey>;
};

export type MutationPayForBookingArgs = {
  id: Scalars['ID'];
  paymentInput?: InputMaybe<PaymentInput>;
};

export type MutationUnlinkExperienceArgs = {
  experienceKey?: InputMaybe<ExperienceKey>;
  partnerKey?: InputMaybe<PartnerKey>;
};

export type MutationUpdateConsumerArgs = {
  consumerInput?: InputMaybe<ConsumerInput>;
};

export type MutationUpdatePartnerArgs = {
  partnerInput?: InputMaybe<PartnerInput>;
};

export type Operator = {
  __typename?: 'Operator';
  experiences?: Maybe<Array<Maybe<Experience>>>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

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

export type Pricing = {
  __typename?: 'Pricing';
  currency?: Maybe<Scalars['String']>;
  lifestyleXReservationCharge?: Maybe<Scalars['Float']>;
  lifestyleXWalkInCharge?: Maybe<Scalars['Float']>;
  pricingType?: Maybe<Scalars['String']>;
  reservationCost?: Maybe<Scalars['Float']>;
  vat?: Maybe<Scalars['Int']>;
  walkInCostCurrentPPRate?: Maybe<Scalars['Float']>;
};

export type Product = {
  productID: Scalars['String'];
  productType?: InputMaybe<ProductType>;
  supplierCode: Scalars['String'];
};

export enum ProductType {
  Lounge = 'Lounge',
}

export type Query = {
  __typename?: 'Query';
  getAvailableSlots: Availability;
  getBookingByID?: Maybe<Booking>;
  getBookings: Array<Booking>;
  getConsumer?: Maybe<Consumer>;
  getConsumerByEmailAddress?: Maybe<Consumer>;
  getConsumerByID?: Maybe<Consumer>;
  getExperienceByID?: Maybe<Experience>;
  getInvitationByID?: Maybe<Invitation>;
  getInvitations: Array<Invitation>;
  getPartner?: Maybe<Partner>;
  getPartnerByEmailAddress?: Maybe<Partner>;
  getPartnerByID?: Maybe<Partner>;
  isInvitationTokenValid?: Maybe<Scalars['Boolean']>;
  searchExperiences?: Maybe<Array<Maybe<Experience>>>;
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

export type QueryGetExperienceByIdArgs = {
  id?: InputMaybe<Scalars['String']>;
};

export type QueryGetInvitationByIdArgs = {
  id: Scalars['ID'];
};

export type QueryGetInvitationsArgs = {
  experienceID?: InputMaybe<Scalars['ID']>;
};

export type QueryGetPartnerByEmailAddressArgs = {
  emailAddress: Scalars['String'];
};

export type QueryGetPartnerByIdArgs = {
  id: Scalars['ID'];
};

export type QueryIsInvitationTokenValidArgs = {
  inviteToken: Scalars['String'];
};

export type QuerySearchExperiencesArgs = {
  query?: InputMaybe<Scalars['String']>;
};

export type Redemption = {
  __typename?: 'Redemption';
  defaultMaxGuests?: Maybe<Scalars['Int']>;
  defaultRedemptionTypeCode?: Maybe<Scalars['String']>;
  isGuestAllowed?: Maybe<Scalars['Boolean']>;
};

export type Slots = {
  __typename?: 'Slots';
  endDate?: Maybe<Scalars['Date']>;
  maxDuration?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['Date']>;
};

export enum TimezoneType {
  Local = 'LOCAL',
  Utc = 'UTC',
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
    messageID?: string | null;
    temporaryReservationID?: string | null;
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
    bookedFrom: string;
    bookedTo: string;
    metadata?: any | null;
    reference: string;
    status: BookingStatus;
    id: string;
    consumer?: {
      __typename?: 'Consumer';
      fullName?: string | null;
      id: string;
    } | null;
    experience?: {
      __typename?: 'Experience';
      id: string;
      loungeName?: string | null;
      openingHours?: string | null;
      images?: Array<{
        __typename?: 'Image';
        altText?: string | null;
        contentType?: string | null;
        height?: number | null;
        id: string;
        url?: string | null;
        width?: number | null;
      } | null> | null;
    } | null;
  } | null;
};

export type GetBookingsQueryVariables = Exact<{
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
    guestCount: number;
    status: BookingStatus;
    updatedAt: any;
    consumer?: {
      __typename?: 'Consumer';
      createdAt: any;
      crmId?: string | null;
      emailAddress: string;
      firstName?: string | null;
      fullName?: string | null;
      id: string;
      updatedAt: any;
    } | null;
    experience?: {
      __typename?: 'Experience';
      id: string;
      loungeName?: string | null;
      images?: Array<{
        __typename?: 'Image';
        url?: string | null;
      } | null> | null;
      location?: {
        __typename?: 'Location';
        airportCode?: string | null;
        airportName?: string | null;
        cgTerminal?: string | null;
        cgTerminalCode?: string | null;
        city?: string | null;
        country?: string | null;
        isoCountryCode?: string | null;
        lbCountryCode?: string | null;
        region?: string | null;
        terminal?: string | null;
        terminalCode?: string | null;
        terminalAccessibility?: string | null;
      } | null;
    } | null;
  }>;
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
    createdAt: any;
    emailAddress: string;
    id: string;
    updatedAt: any;
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
      __typename?: 'Location';
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
        __typename?: 'Location';
        airportName?: string | null;
        terminal?: string | null;
      } | null;
    }>;
  } | null;
};

export type SearchExperiencesQueryVariables = Exact<{
  query?: InputMaybe<Scalars['String']>;
}>;

export type SearchExperiencesQuery = {
  __typename?: 'Query';
  searchExperiences?: Array<{
    __typename?: 'Experience';
    additionalInformation?: string | null;
    conditions?: string | null;
    id: string;
    directions?: string | null;
    facilities?: Array<string | null> | null;
    loungeName?: string | null;
    loungeCode?: string | null;
    accessPeriod?: string | null;
    airsideLandside?: string | null;
    hasActiveLounges?: boolean | null;
    passengerType?: string | null;
    ppboOperatorName?: string | null;
    serviceCentre?: string | null;
    uniqueValueKey?: string | null;
    openingHours?: string | null;
    pricing?: {
      __typename?: 'Pricing';
      pricingType?: string | null;
      currency?: string | null;
      reservationCost?: number | null;
      lifestyleXReservationCharge?: number | null;
      walkInCostCurrentPPRate?: number | null;
      lifestyleXWalkInCharge?: number | null;
      vat?: number | null;
    } | null;
    location?: {
      __typename?: 'Location';
      airportCode?: string | null;
      airportName?: string | null;
      cgTerminal?: string | null;
      cgTerminalCode?: string | null;
      city?: string | null;
      country?: string | null;
      isoCountryCode?: string | null;
      lbCountryCode?: string | null;
      region?: string | null;
      terminal?: string | null;
      terminalCode?: string | null;
      terminalAccessibility?: string | null;
    } | null;
    images?: Array<{
      __typename?: 'Image';
      url?: string | null;
      altText?: string | null;
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
                { kind: 'Field', name: { kind: 'Name', value: 'messageID' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'temporaryReservationID' },
                },
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
                { kind: 'Field', name: { kind: 'Name', value: 'bookedFrom' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bookedTo' } },
                { kind: 'Field', name: { kind: 'Name', value: 'metadata' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reference' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'consumer' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
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
                        name: { kind: 'Name', value: 'loungeName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'openingHours' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'guestCount' } },
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
                        name: { kind: 'Name', value: 'createdAt' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'crmId' } },
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
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'updatedAt' },
                      },
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
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'images' },
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
                        name: { kind: 'Name', value: 'location' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'airportCode' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'airportName' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'cgTerminal' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'cgTerminalCode' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'city' },
                            },
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
                              name: { kind: 'Name', value: 'lbCountryCode' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'region' },
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
                              name: {
                                kind: 'Name',
                                value: 'terminalAccessibility',
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
} as unknown as DocumentNode<GetBookingsQuery, GetBookingsQueryVariables>;
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
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'additionalInformation' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'conditions' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'directions' } },
                { kind: 'Field', name: { kind: 'Name', value: 'facilities' } },
                { kind: 'Field', name: { kind: 'Name', value: 'loungeName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'loungeCode' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'accessPeriod' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'airsideLandside' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'hasActiveLounges' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'passengerType' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'ppboOperatorName' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'serviceCentre' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'uniqueValueKey' },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'vat' } },
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
                        name: { kind: 'Name', value: 'airportCode' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'airportName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'cgTerminal' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'cgTerminalCode' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'city' } },
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
                        name: { kind: 'Name', value: 'lbCountryCode' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'region' },
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
                        name: { kind: 'Name', value: 'terminalAccessibility' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'images' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'altText' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'height' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'openingHours' },
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
