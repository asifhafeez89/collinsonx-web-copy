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
};

export type Booking = {
  __typename?: 'Booking';
  additionalRequests?: Maybe<Scalars['String']>;
  bookingState?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  loungeId?: Maybe<Scalars['String']>;
  reservationDate?: Maybe<Scalars['String']>;
};

export type Image = {
  __typename?: 'Image';
  altText?: Maybe<Scalars['String']>;
  contentType?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};

export type Lounge = {
  __typename?: 'Lounge';
  additionInformation?: Maybe<Scalars['String']>;
  conditions?: Maybe<Scalars['String']>;
  experienceCategory?: Maybe<Scalars['String']>;
  facilities?: Maybe<Array<Maybe<Scalars['String']>>>;
  id?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<Image>>>;
  location?: Maybe<Scalars['String']>;
  loungeOperator?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  objectID?: Maybe<Scalars['String']>;
  openingHours?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  booking?: Maybe<Booking>;
  bookings?: Maybe<Array<Maybe<Booking>>>;
  lounge?: Maybe<Lounge>;
  lounges?: Maybe<Array<Maybe<Lounge>>>;
};


export type QueryBookingArgs = {
  id: Scalars['String'];
};


export type QueryLoungeArgs = {
  id: Scalars['String'];
};

export type LoungeQueryVariables = Exact<{ [key: string]: never; }>;


export type LoungeQuery = { __typename?: 'Query', lounge?: { __typename?: 'Lounge', name?: string | null, location?: string | null, openingHours?: string | null, conditions?: string | null, facilities?: Array<string | null> | null, id?: string | null, images?: Array<{ __typename?: 'Image', url?: string | null, height?: number | null, width?: number | null } | null> | null } | null };

export type LoungesQueryVariables = Exact<{ [key: string]: never; }>;


export type LoungesQuery = { __typename?: 'Query', lounges?: Array<{ __typename?: 'Lounge', id?: string | null, name?: string | null, location?: string | null, images?: Array<{ __typename?: 'Image', url?: string | null } | null> | null } | null> | null };


export const LoungeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Lounge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lounge"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"StringValue","value":"","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"openingHours"}},{"kind":"Field","name":{"kind":"Name","value":"conditions"}},{"kind":"Field","name":{"kind":"Name","value":"facilities"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}}]}}]}}]} as unknown as DocumentNode<LoungeQuery, LoungeQueryVariables>;
export const LoungesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Lounges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lounges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<LoungesQuery, LoungesQueryVariables>;