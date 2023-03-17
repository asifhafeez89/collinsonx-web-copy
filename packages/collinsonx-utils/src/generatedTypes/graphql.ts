/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  ObjectID: any;
};

export type Booking = {
  __typename?: 'Booking';
  bookedFrom: Scalars['Date'];
  bookedTo: Scalars['Date'];
  consumerID: Scalars['ID'];
  createdAt: Scalars['Date'];
  experienceID: Scalars['ID'];
  id: Scalars['ID'];
  status: BookingStatus;
  updatedAt: Scalars['Date'];
};

export type BookingInput = {
  bookedFrom: Scalars['Date'];
  bookedTo: Scalars['Date'];
  experienceID: Scalars['ID'];
};

export enum BookingStatus {
  Booked = 'BOOKED',
  CheckedIn = 'CHECKED_IN',
  Confirmed = 'CONFIRMED',
  Declined = 'DECLINED',
  Errored = 'ERRORED',
  Initialized = 'INITIALIZED'
}

export type Consumer = {
  __typename?: 'Consumer';
  createdAt: Scalars['Date'];
  emailAddress: Scalars['String'];
  id: Scalars['ID'];
  updatedAt: Scalars['Date'];
};

export type ConsumerInput = {
  emailAddress: Scalars['String'];
};

export type Experience = {
  __typename?: 'Experience';
  additionalInformation?: Maybe<Scalars['String']>;
  category?: Maybe<ExperienceCategory>;
  conditions?: Maybe<Scalars['String']>;
  directions?: Maybe<Scalars['String']>;
  facilities?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['ID'];
  images?: Maybe<Array<Maybe<Image>>>;
  location?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  objectID?: Maybe<Scalars['ObjectID']>;
  openingHours?: Maybe<Array<Maybe<Scalars['String']>>>;
  operator?: Maybe<Operator>;
  type?: Maybe<ExperienceType>;
};

export enum ExperienceCategory {
  AirportExperience = 'AIRPORT_EXPERIENCE'
}

export enum ExperienceType {
  Lounge = 'LOUNGE'
}

export type Image = {
  __typename?: 'Image';
  altText?: Maybe<Scalars['String']>;
  contentType?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  checkinBooking?: Maybe<Booking>;
  confirmBooking?: Maybe<Booking>;
  createBooking?: Maybe<Booking>;
  declineBooking?: Maybe<Booking>;
  deleteBooking?: Maybe<Booking>;
  findOrCreateConsumer?: Maybe<Consumer>;
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


export type MutationDeclineBookingArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteBookingArgs = {
  id: Scalars['ID'];
};


export type MutationFindOrCreateConsumerArgs = {
  consumerInput?: InputMaybe<ConsumerInput>;
};

export type Operator = {
  __typename?: 'Operator';
  experiences?: Maybe<Array<Maybe<Experience>>>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  getBookingByID?: Maybe<Booking>;
  getBookings: Array<Booking>;
  getConsumerByEmailAddress?: Maybe<Consumer>;
  getConsumerByID?: Maybe<Consumer>;
  searchExperiences?: Maybe<Array<Maybe<Experience>>>;
};


export type QueryGetBookingByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetBookingsArgs = {
  experienceID?: InputMaybe<Scalars['ID']>;
};


export type QueryGetConsumerByEmailAddressArgs = {
  emailAddress: Scalars['String'];
};


export type QueryGetConsumerByIdArgs = {
  id: Scalars['ID'];
};


export type QuerySearchExperiencesArgs = {
  query?: InputMaybe<Scalars['String']>;
};

export type CheckinBookingMutationVariables = Exact<{
  checkinBookingId: Scalars['ID'];
}>;


export type CheckinBookingMutation = { __typename?: 'Mutation', checkinBooking?: { __typename?: 'Booking', bookedFrom: any, bookedTo: any, consumerID: string, createdAt: any, experienceID: string, id: string, status: BookingStatus, updatedAt: any } | null };

export type ConfirmBookingMutationVariables = Exact<{
  confirmBookingId: Scalars['ID'];
}>;


export type ConfirmBookingMutation = { __typename?: 'Mutation', confirmBooking?: { __typename?: 'Booking', bookedFrom: any, bookedTo: any, consumerID: string, createdAt: any, experienceID: string, id: string, status: BookingStatus, updatedAt: any } | null };

export type CreateBookingMutationVariables = Exact<{
  bookingInput?: InputMaybe<BookingInput>;
}>;


export type CreateBookingMutation = { __typename?: 'Mutation', createBooking?: { __typename?: 'Booking', bookedFrom: any, bookedTo: any, consumerID: string, createdAt: any, id: string, experienceID: string, status: BookingStatus, updatedAt: any } | null };

export type DeclineBookingMutationVariables = Exact<{
  declineBookingId: Scalars['ID'];
}>;


export type DeclineBookingMutation = { __typename?: 'Mutation', declineBooking?: { __typename?: 'Booking', bookedFrom: any, bookedTo: any, consumerID: string, createdAt: any, experienceID: string, id: string, status: BookingStatus, updatedAt: any } | null };

export type DeleteBookingMutationVariables = Exact<{
  deleteBookingId: Scalars['ID'];
}>;


export type DeleteBookingMutation = { __typename?: 'Mutation', deleteBooking?: { __typename?: 'Booking', bookedTo: any, bookedFrom: any, consumerID: string, createdAt: any, status: BookingStatus, id: string, experienceID: string, updatedAt: any } | null };

export type GetBookingByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetBookingByIdQuery = { __typename?: 'Query', getBookingByID?: { __typename?: 'Booking', bookedTo: any, bookedFrom: any, consumerID: string, id: string, experienceID: string, createdAt: any, status: BookingStatus, updatedAt: any } | null };

export type GetBookingsQueryVariables = Exact<{
  experienceId?: InputMaybe<Scalars['ID']>;
}>;


export type GetBookingsQuery = { __typename?: 'Query', getBookings: Array<{ __typename?: 'Booking', bookedFrom: any, bookedTo: any, createdAt: any, consumerID: string, id: string, experienceID: string, status: BookingStatus, updatedAt: any }> };

export type SearchExperiencesQueryVariables = Exact<{
  query?: InputMaybe<Scalars['String']>;
}>;


export type SearchExperiencesQuery = { __typename?: 'Query', searchExperiences?: Array<{ __typename?: 'Experience', additionalInformation?: string | null, category?: ExperienceCategory | null, conditions?: string | null, id: string, directions?: string | null, facilities?: Array<string | null> | null, location?: string | null, name?: string | null, objectID?: any | null, openingHours?: Array<string | null> | null, images?: Array<{ __typename?: 'Image', url?: string | null } | null> | null, operator?: { __typename?: 'Operator', id: string, name?: string | null } | null } | null> | null };


export const CheckinBookingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CheckinBooking"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"checkinBookingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkinBooking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"checkinBookingId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookedFrom"}},{"kind":"Field","name":{"kind":"Name","value":"bookedTo"}},{"kind":"Field","name":{"kind":"Name","value":"consumerID"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"experienceID"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CheckinBookingMutation, CheckinBookingMutationVariables>;
export const ConfirmBookingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ConfirmBooking"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"confirmBookingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"confirmBooking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"confirmBookingId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookedFrom"}},{"kind":"Field","name":{"kind":"Name","value":"bookedTo"}},{"kind":"Field","name":{"kind":"Name","value":"consumerID"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"experienceID"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<ConfirmBookingMutation, ConfirmBookingMutationVariables>;
export const CreateBookingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBooking"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookingInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BookingInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBooking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bookingInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookingInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookedFrom"}},{"kind":"Field","name":{"kind":"Name","value":"bookedTo"}},{"kind":"Field","name":{"kind":"Name","value":"consumerID"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"experienceID"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateBookingMutation, CreateBookingMutationVariables>;
export const DeclineBookingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeclineBooking"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"declineBookingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"declineBooking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"declineBookingId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookedFrom"}},{"kind":"Field","name":{"kind":"Name","value":"bookedTo"}},{"kind":"Field","name":{"kind":"Name","value":"consumerID"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"experienceID"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<DeclineBookingMutation, DeclineBookingMutationVariables>;
export const DeleteBookingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteBooking"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteBookingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBooking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteBookingId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookedTo"}},{"kind":"Field","name":{"kind":"Name","value":"bookedFrom"}},{"kind":"Field","name":{"kind":"Name","value":"consumerID"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"experienceID"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<DeleteBookingMutation, DeleteBookingMutationVariables>;
export const GetBookingByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBookingByID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBookingByID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookedTo"}},{"kind":"Field","name":{"kind":"Name","value":"bookedFrom"}},{"kind":"Field","name":{"kind":"Name","value":"consumerID"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"experienceID"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetBookingByIdQuery, GetBookingByIdQueryVariables>;
export const GetBookingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBookings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"experienceId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBookings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"experienceID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"experienceId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookedFrom"}},{"kind":"Field","name":{"kind":"Name","value":"bookedTo"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"consumerID"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"experienceID"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetBookingsQuery, GetBookingsQueryVariables>;
export const SearchExperiencesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchExperiences"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchExperiences"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"additionalInformation"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"conditions"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"directions"}},{"kind":"Field","name":{"kind":"Name","value":"facilities"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"objectID"}},{"kind":"Field","name":{"kind":"Name","value":"openingHours"}},{"kind":"Field","name":{"kind":"Name","value":"operator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<SearchExperiencesQuery, SearchExperiencesQueryVariables>;