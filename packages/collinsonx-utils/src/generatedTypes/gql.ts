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
    "\n  mutation cancelBooking($cancelBookingId: ID!) {\n    cancelBooking(id: $cancelBookingId) {\n      bookedFrom\n      bookedTo\n      consumer {\n        id\n      }\n      createdAt\n      experience {\n        id\n      }\n      id\n      status\n      updatedAt\n    }\n  }\n": types.CancelBookingDocument,
    "\n  mutation CheckinBooking($checkinBookingId: ID!) {\n    checkinBooking(id: $checkinBookingId) {\n      bookedFrom\n      bookedTo\n      consumer {\n        id\n      }\n      createdAt\n      id\n      status\n      updatedAt\n    }\n  }\n": types.CheckinBookingDocument,
    "\n  mutation ConfirmBooking($confirmBookingId: ID!) {\n    confirmBooking(id: $confirmBookingId) {\n      bookedFrom\n      bookedTo\n      createdAt\n      consumer {\n        id\n      }\n      id\n      experience {\n        id\n      }\n      status\n      updatedAt\n    }\n  }\n": types.ConfirmBookingDocument,
    "\n  mutation CreateBooking($bookingInput: BookingInput) {\n    createBooking(bookingInput: $bookingInput) {\n      bookedFrom\n      bookedTo\n      consumer {\n        id\n      }\n      id\n      experience {\n        id\n      }\n      status\n      updatedAt\n    }\n  }\n": types.CreateBookingDocument,
    "\n  mutation DeclineBooking($declineBookingId: ID!) {\n    declineBooking(id: $declineBookingId) {\n      bookedFrom\n      bookedTo\n      consumer {\n        id\n      }\n      createdAt\n      experience {\n        id\n      }\n      id\n      status\n      updatedAt\n    }\n  }\n": types.DeclineBookingDocument,
    "\n  mutation DeleteBooking($deleteBookingId: ID!) {\n    deleteBooking(id: $deleteBookingId) {\n      bookedTo\n      bookedFrom\n      consumer {\n        id\n      }\n      createdAt\n      status\n      id\n      experience {\n        id\n      }\n      updatedAt\n    }\n  }\n": types.DeleteBookingDocument,
    "\n  mutation FindOrCreateConsumer($consumerInput: ConsumerInput) {\n    findOrCreateConsumer(consumerInput: $consumerInput) {\n      id\n    }\n  }\n": types.FindOrCreateConsumerDocument,
    "\n  mutation UpdateConsumer($consumerInput: ConsumerInput) {\n    updateConsumer(consumerInput: $consumerInput) {\n      id\n    }\n  }\n": types.UpdateConsumerDocument,
    "\n  query GetAllBookings {\n    getAllBookings {\n      bookedFrom\n      bookedTo\n      createdAt\n      guestCount\n      id\n      status\n      type\n      updatedAt\n      consumer {\n        createdAt\n        crmId\n        emailAddress\n        firstName\n        fullName\n        id\n        updatedAt\n      }\n    }\n  }\n": types.GetAllBookingsDocument,
    "\n  query GetBookingById($getBookingById: ID!) {\n    getBookingByID(id: $getBookingById) {\n      bookedFrom\n      bookedTo\n      consumer {\n        fullName\n        id\n      }\n      experience {\n        id\n        images {\n          altText\n          contentType\n          height\n          id\n          url\n          width\n        }\n        loungeName\n        openingHours\n      }\n      status\n      id\n    }\n  }\n": types.GetBookingByIdDocument,
    "\n  query GetBookings($experienceId: ID!) {\n    getBookings(experienceID: $experienceId) {\n      bookedFrom\n      bookedTo\n      createdAt\n      type\n      consumer {\n        id\n      }\n      id\n      experience {\n        id\n        loungeName\n        images {\n          url\n        }\n        location {\n          airportCode\n          airportName\n          cgTerminal\n          cgTerminalCode\n          city\n          country\n          isoCountryCode\n          lbCountryCode\n          region\n          terminal\n          terminalCode\n          terminalAccessibility\n        }\n      }\n\n      status\n      updatedAt\n    }\n  }\n": types.GetBookingsDocument,
    "\n  query GetConsumer {\n    getConsumer {\n      id\n      crmId\n      fullName\n      firstName\n      lastName\n      emailAddress\n      createdAt\n      updatedAt\n      bookings {\n        bookedFrom\n        bookedTo\n        createdAt\n        updatedAt\n        experience {\n          id\n        }\n      }\n    }\n  }\n": types.GetConsumerDocument,
    "\n  query GetConsumerByEmailAddress($emailAddress: String!) {\n    getConsumerByEmailAddress(emailAddress: $emailAddress) {\n      id\n    }\n  }\n": types.GetConsumerByEmailAddressDocument,
    "\n  query GetConsumerByID($getConsumerById: ID!) {\n    getConsumerByID(id: $getConsumerById) {\n      bookings {\n        id\n        bookedFrom\n        bookedTo\n        status\n        updatedAt\n        createdAt\n      }\n      createdAt\n      emailAddress\n      id\n      updatedAt\n    }\n  }\n": types.GetConsumerByIdDocument,
    "\n  query SearchExperiences($query: String) {\n    searchExperiences(query: $query) {\n      additionalInformation\n      conditions\n      id\n      directions\n      facilities\n      loungeName\n      loungeCode\n      accessPeriod\n      airsideLandside\n      hasActiveLounges\n      passengerType\n      ppboOperatorName\n      serviceCentre\n      uniqueValueKey\n      pricing {\n        pricingType\n        currency\n        reservationCost\n        lifestyleXReservationCharge\n        walkInCostCurrentPPRate\n        lifestyleXWalkInCharge\n        vat\n      }\n      location {\n        airportCode\n        airportName\n        cgTerminal\n        cgTerminalCode\n        city\n        country\n        isoCountryCode\n        lbCountryCode\n        region\n        terminal\n        terminalCode\n        terminalAccessibility\n      }\n      images {\n        url\n        altText\n        height\n        width\n        id\n      }\n      openingHours\n    }\n  }\n": types.SearchExperiencesDocument,
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
export function graphql(source: "\n  mutation cancelBooking($cancelBookingId: ID!) {\n    cancelBooking(id: $cancelBookingId) {\n      bookedFrom\n      bookedTo\n      consumer {\n        id\n      }\n      createdAt\n      experience {\n        id\n      }\n      id\n      status\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation cancelBooking($cancelBookingId: ID!) {\n    cancelBooking(id: $cancelBookingId) {\n      bookedFrom\n      bookedTo\n      consumer {\n        id\n      }\n      createdAt\n      experience {\n        id\n      }\n      id\n      status\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CheckinBooking($checkinBookingId: ID!) {\n    checkinBooking(id: $checkinBookingId) {\n      bookedFrom\n      bookedTo\n      consumer {\n        id\n      }\n      createdAt\n      id\n      status\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation CheckinBooking($checkinBookingId: ID!) {\n    checkinBooking(id: $checkinBookingId) {\n      bookedFrom\n      bookedTo\n      consumer {\n        id\n      }\n      createdAt\n      id\n      status\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ConfirmBooking($confirmBookingId: ID!) {\n    confirmBooking(id: $confirmBookingId) {\n      bookedFrom\n      bookedTo\n      createdAt\n      consumer {\n        id\n      }\n      id\n      experience {\n        id\n      }\n      status\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation ConfirmBooking($confirmBookingId: ID!) {\n    confirmBooking(id: $confirmBookingId) {\n      bookedFrom\n      bookedTo\n      createdAt\n      consumer {\n        id\n      }\n      id\n      experience {\n        id\n      }\n      status\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateBooking($bookingInput: BookingInput) {\n    createBooking(bookingInput: $bookingInput) {\n      bookedFrom\n      bookedTo\n      consumer {\n        id\n      }\n      id\n      experience {\n        id\n      }\n      status\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateBooking($bookingInput: BookingInput) {\n    createBooking(bookingInput: $bookingInput) {\n      bookedFrom\n      bookedTo\n      consumer {\n        id\n      }\n      id\n      experience {\n        id\n      }\n      status\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeclineBooking($declineBookingId: ID!) {\n    declineBooking(id: $declineBookingId) {\n      bookedFrom\n      bookedTo\n      consumer {\n        id\n      }\n      createdAt\n      experience {\n        id\n      }\n      id\n      status\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation DeclineBooking($declineBookingId: ID!) {\n    declineBooking(id: $declineBookingId) {\n      bookedFrom\n      bookedTo\n      consumer {\n        id\n      }\n      createdAt\n      experience {\n        id\n      }\n      id\n      status\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteBooking($deleteBookingId: ID!) {\n    deleteBooking(id: $deleteBookingId) {\n      bookedTo\n      bookedFrom\n      consumer {\n        id\n      }\n      createdAt\n      status\n      id\n      experience {\n        id\n      }\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteBooking($deleteBookingId: ID!) {\n    deleteBooking(id: $deleteBookingId) {\n      bookedTo\n      bookedFrom\n      consumer {\n        id\n      }\n      createdAt\n      status\n      id\n      experience {\n        id\n      }\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation FindOrCreateConsumer($consumerInput: ConsumerInput) {\n    findOrCreateConsumer(consumerInput: $consumerInput) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation FindOrCreateConsumer($consumerInput: ConsumerInput) {\n    findOrCreateConsumer(consumerInput: $consumerInput) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateConsumer($consumerInput: ConsumerInput) {\n    updateConsumer(consumerInput: $consumerInput) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateConsumer($consumerInput: ConsumerInput) {\n    updateConsumer(consumerInput: $consumerInput) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllBookings {\n    getAllBookings {\n      bookedFrom\n      bookedTo\n      createdAt\n      guestCount\n      id\n      status\n      type\n      updatedAt\n      consumer {\n        createdAt\n        crmId\n        emailAddress\n        firstName\n        fullName\n        id\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllBookings {\n    getAllBookings {\n      bookedFrom\n      bookedTo\n      createdAt\n      guestCount\n      id\n      status\n      type\n      updatedAt\n      consumer {\n        createdAt\n        crmId\n        emailAddress\n        firstName\n        fullName\n        id\n        updatedAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBookingById($getBookingById: ID!) {\n    getBookingByID(id: $getBookingById) {\n      bookedFrom\n      bookedTo\n      consumer {\n        fullName\n        id\n      }\n      experience {\n        id\n        images {\n          altText\n          contentType\n          height\n          id\n          url\n          width\n        }\n        loungeName\n        openingHours\n      }\n      status\n      id\n    }\n  }\n"): (typeof documents)["\n  query GetBookingById($getBookingById: ID!) {\n    getBookingByID(id: $getBookingById) {\n      bookedFrom\n      bookedTo\n      consumer {\n        fullName\n        id\n      }\n      experience {\n        id\n        images {\n          altText\n          contentType\n          height\n          id\n          url\n          width\n        }\n        loungeName\n        openingHours\n      }\n      status\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBookings($experienceId: ID!) {\n    getBookings(experienceID: $experienceId) {\n      bookedFrom\n      bookedTo\n      createdAt\n      type\n      consumer {\n        id\n      }\n      id\n      experience {\n        id\n        loungeName\n        images {\n          url\n        }\n        location {\n          airportCode\n          airportName\n          cgTerminal\n          cgTerminalCode\n          city\n          country\n          isoCountryCode\n          lbCountryCode\n          region\n          terminal\n          terminalCode\n          terminalAccessibility\n        }\n      }\n\n      status\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetBookings($experienceId: ID!) {\n    getBookings(experienceID: $experienceId) {\n      bookedFrom\n      bookedTo\n      createdAt\n      type\n      consumer {\n        id\n      }\n      id\n      experience {\n        id\n        loungeName\n        images {\n          url\n        }\n        location {\n          airportCode\n          airportName\n          cgTerminal\n          cgTerminalCode\n          city\n          country\n          isoCountryCode\n          lbCountryCode\n          region\n          terminal\n          terminalCode\n          terminalAccessibility\n        }\n      }\n\n      status\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetConsumer {\n    getConsumer {\n      id\n      crmId\n      fullName\n      firstName\n      lastName\n      emailAddress\n      createdAt\n      updatedAt\n      bookings {\n        bookedFrom\n        bookedTo\n        createdAt\n        updatedAt\n        experience {\n          id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetConsumer {\n    getConsumer {\n      id\n      crmId\n      fullName\n      firstName\n      lastName\n      emailAddress\n      createdAt\n      updatedAt\n      bookings {\n        bookedFrom\n        bookedTo\n        createdAt\n        updatedAt\n        experience {\n          id\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetConsumerByEmailAddress($emailAddress: String!) {\n    getConsumerByEmailAddress(emailAddress: $emailAddress) {\n      id\n    }\n  }\n"): (typeof documents)["\n  query GetConsumerByEmailAddress($emailAddress: String!) {\n    getConsumerByEmailAddress(emailAddress: $emailAddress) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetConsumerByID($getConsumerById: ID!) {\n    getConsumerByID(id: $getConsumerById) {\n      bookings {\n        id\n        bookedFrom\n        bookedTo\n        status\n        updatedAt\n        createdAt\n      }\n      createdAt\n      emailAddress\n      id\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetConsumerByID($getConsumerById: ID!) {\n    getConsumerByID(id: $getConsumerById) {\n      bookings {\n        id\n        bookedFrom\n        bookedTo\n        status\n        updatedAt\n        createdAt\n      }\n      createdAt\n      emailAddress\n      id\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchExperiences($query: String) {\n    searchExperiences(query: $query) {\n      additionalInformation\n      conditions\n      id\n      directions\n      facilities\n      loungeName\n      loungeCode\n      accessPeriod\n      airsideLandside\n      hasActiveLounges\n      passengerType\n      ppboOperatorName\n      serviceCentre\n      uniqueValueKey\n      pricing {\n        pricingType\n        currency\n        reservationCost\n        lifestyleXReservationCharge\n        walkInCostCurrentPPRate\n        lifestyleXWalkInCharge\n        vat\n      }\n      location {\n        airportCode\n        airportName\n        cgTerminal\n        cgTerminalCode\n        city\n        country\n        isoCountryCode\n        lbCountryCode\n        region\n        terminal\n        terminalCode\n        terminalAccessibility\n      }\n      images {\n        url\n        altText\n        height\n        width\n        id\n      }\n      openingHours\n    }\n  }\n"): (typeof documents)["\n  query SearchExperiences($query: String) {\n    searchExperiences(query: $query) {\n      additionalInformation\n      conditions\n      id\n      directions\n      facilities\n      loungeName\n      loungeCode\n      accessPeriod\n      airsideLandside\n      hasActiveLounges\n      passengerType\n      ppboOperatorName\n      serviceCentre\n      uniqueValueKey\n      pricing {\n        pricingType\n        currency\n        reservationCost\n        lifestyleXReservationCharge\n        walkInCostCurrentPPRate\n        lifestyleXWalkInCharge\n        vat\n      }\n      location {\n        airportCode\n        airportName\n        cgTerminal\n        cgTerminalCode\n        city\n        country\n        isoCountryCode\n        lbCountryCode\n        region\n        terminal\n        terminalCode\n        terminalAccessibility\n      }\n      images {\n        url\n        altText\n        height\n        width\n        id\n      }\n      openingHours\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;