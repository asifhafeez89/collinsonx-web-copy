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
  _Any: any;
  federation__FieldSet: any;
  link__Import: any;
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

export type Operator = {
  __typename?: 'Operator';
  experiences?: Maybe<Array<Maybe<Experience>>>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  _entities: Array<Maybe<_Entity>>;
  _service: _Service;
  searchExperiences?: Maybe<Array<Maybe<Experience>>>;
};


export type Query_EntitiesArgs = {
  representations: Array<Scalars['_Any']>;
};


export type QuerySearchExperiencesArgs = {
  query?: InputMaybe<Scalars['String']>;
};

export type _Entity = Experience | Image | Operator;

export type _Service = {
  __typename?: '_Service';
  sdl?: Maybe<Scalars['String']>;
};

export enum Link__Purpose {
  /** `EXECUTION` features provide metadata necessary for operation execution. */
  Execution = 'EXECUTION',
  /** `SECURITY` features provide metadata necessary to securely resolve fields. */
  Security = 'SECURITY'
}

export type SearchExperiencesQueryVariables = Exact<{
  query?: InputMaybe<Scalars['String']>;
}>;


export type SearchExperiencesQuery = { __typename?: 'Query', searchExperiences?: Array<{ __typename?: 'Experience', id: string, name?: string | null, location?: string | null, facilities?: Array<string | null> | null, openingHours?: Array<string | null> | null, conditions?: string | null, images?: Array<{ __typename?: 'Image', altText?: string | null, url?: string | null, height?: number | null, width?: number | null, id: string } | null> | null } | null> | null };


export const SearchExperiencesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchExperiences"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchExperiences"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"facilities"}},{"kind":"Field","name":{"kind":"Name","value":"openingHours"}},{"kind":"Field","name":{"kind":"Name","value":"conditions"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<SearchExperiencesQuery, SearchExperiencesQueryVariables>;