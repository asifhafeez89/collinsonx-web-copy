/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation CheckinBooking($checkinBookingId: ID!) {\n    checkinBooking(id: $checkinBookingId) {\n      bookedFrom\n      bookedTo\n      consumerID\n      createdAt\n      experienceID\n      id\n      status\n      updatedAt\n    }\n  }\n": types.CheckinBookingDocument,
    "\n  mutation ConfirmBooking($confirmBookingId: ID!) {\n    confirmBooking(id: $confirmBookingId) {\n      bookedFrom\n      bookedTo\n      consumerID\n      createdAt\n      experienceID\n      id\n      status\n      updatedAt\n    }\n  }\n": types.ConfirmBookingDocument,
    "\n  mutation CreateBooking($bookingInput: BookingInput) {\n    createBooking(bookingInput: $bookingInput) {\n      bookedFrom\n      bookedTo\n      consumerID\n      createdAt\n      id\n      experienceID\n      status\n      updatedAt\n    }\n  }\n": types.CreateBookingDocument,
    "\n  mutation DeclineBooking($declineBookingId: ID!) {\n    declineBooking(id: $declineBookingId) {\n      bookedFrom\n      bookedTo\n      consumerID\n      createdAt\n      experienceID\n      id\n      status\n      updatedAt\n    }\n  }\n": types.DeclineBookingDocument,
    "\n  mutation DeleteBooking($deleteBookingId: ID!) {\n    deleteBooking(id: $deleteBookingId) {\n      bookedTo\n      bookedFrom\n      consumerID\n      createdAt\n      status\n      id\n      experienceID\n      updatedAt\n    }\n  }\n": types.DeleteBookingDocument,
    "\n  query GetBookingByID($id: ID!) {\n    getBookingByID(id: $id) {\n      bookedTo\n      bookedFrom\n      consumerID\n      id\n      experienceID\n      createdAt\n      status\n      updatedAt\n    }\n  }\n": types.GetBookingByIdDocument,
    "\n  query GetBookings($experienceId: ID) {\n    getBookings(experienceID: $experienceId) {\n      bookedFrom\n      bookedTo\n      createdAt\n      consumerID\n      id\n      experienceID\n      status\n      updatedAt\n    }\n  }\n": types.GetBookingsDocument,
    "\n  query SearchExperiences($query: String) {\n    searchExperiences(query: $query) {\n      additionalInformation\n      category\n      conditions\n      id\n      directions\n      facilities\n      images {\n        url\n      }\n      location\n      name\n      objectID\n      openingHours\n      operator {\n        id\n        name\n      }\n    }\n  }\n": types.SearchExperiencesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CheckinBooking($checkinBookingId: ID!) {\n    checkinBooking(id: $checkinBookingId) {\n      bookedFrom\n      bookedTo\n      consumerID\n      createdAt\n      experienceID\n      id\n      status\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation CheckinBooking($checkinBookingId: ID!) {\n    checkinBooking(id: $checkinBookingId) {\n      bookedFrom\n      bookedTo\n      consumerID\n      createdAt\n      experienceID\n      id\n      status\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ConfirmBooking($confirmBookingId: ID!) {\n    confirmBooking(id: $confirmBookingId) {\n      bookedFrom\n      bookedTo\n      consumerID\n      createdAt\n      experienceID\n      id\n      status\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation ConfirmBooking($confirmBookingId: ID!) {\n    confirmBooking(id: $confirmBookingId) {\n      bookedFrom\n      bookedTo\n      consumerID\n      createdAt\n      experienceID\n      id\n      status\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateBooking($bookingInput: BookingInput) {\n    createBooking(bookingInput: $bookingInput) {\n      bookedFrom\n      bookedTo\n      consumerID\n      createdAt\n      id\n      experienceID\n      status\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateBooking($bookingInput: BookingInput) {\n    createBooking(bookingInput: $bookingInput) {\n      bookedFrom\n      bookedTo\n      consumerID\n      createdAt\n      id\n      experienceID\n      status\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeclineBooking($declineBookingId: ID!) {\n    declineBooking(id: $declineBookingId) {\n      bookedFrom\n      bookedTo\n      consumerID\n      createdAt\n      experienceID\n      id\n      status\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation DeclineBooking($declineBookingId: ID!) {\n    declineBooking(id: $declineBookingId) {\n      bookedFrom\n      bookedTo\n      consumerID\n      createdAt\n      experienceID\n      id\n      status\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteBooking($deleteBookingId: ID!) {\n    deleteBooking(id: $deleteBookingId) {\n      bookedTo\n      bookedFrom\n      consumerID\n      createdAt\n      status\n      id\n      experienceID\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteBooking($deleteBookingId: ID!) {\n    deleteBooking(id: $deleteBookingId) {\n      bookedTo\n      bookedFrom\n      consumerID\n      createdAt\n      status\n      id\n      experienceID\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBookingByID($id: ID!) {\n    getBookingByID(id: $id) {\n      bookedTo\n      bookedFrom\n      consumerID\n      id\n      experienceID\n      createdAt\n      status\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetBookingByID($id: ID!) {\n    getBookingByID(id: $id) {\n      bookedTo\n      bookedFrom\n      consumerID\n      id\n      experienceID\n      createdAt\n      status\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBookings($experienceId: ID) {\n    getBookings(experienceID: $experienceId) {\n      bookedFrom\n      bookedTo\n      createdAt\n      consumerID\n      id\n      experienceID\n      status\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetBookings($experienceId: ID) {\n    getBookings(experienceID: $experienceId) {\n      bookedFrom\n      bookedTo\n      createdAt\n      consumerID\n      id\n      experienceID\n      status\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchExperiences($query: String) {\n    searchExperiences(query: $query) {\n      additionalInformation\n      category\n      conditions\n      id\n      directions\n      facilities\n      images {\n        url\n      }\n      location\n      name\n      objectID\n      openingHours\n      operator {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query SearchExperiences($query: String) {\n    searchExperiences(query: $query) {\n      additionalInformation\n      category\n      conditions\n      id\n      directions\n      facilities\n      images {\n        url\n      }\n      location\n      name\n      objectID\n      openingHours\n      operator {\n        id\n        name\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;