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
  '\n  mutation AcceptInvitation($acceptInvitationInput: AcceptInvitationInput!) {\n    acceptInvitation(acceptInvitationInput: $acceptInvitationInput) {\n      createdAt\n      experience {\n        id\n      }\n      expiresAt\n      inviteeEmail\n      updatedAt\n      id\n    }\n  }\n':
    types.AcceptInvitationDocument,
  '\n  mutation cancelBooking($cancelBookingId: ID!) {\n    cancelBooking(id: $cancelBookingId) {\n      bookedFrom\n      bookedTo\n      consumer {\n        id\n      }\n      createdAt\n      experience {\n        id\n      }\n      id\n      status\n      updatedAt\n    }\n  }\n':
    types.CancelBookingDocument,
  '\n  mutation CheckinBooking($checkinBookingId: ID!) {\n    checkinBooking(id: $checkinBookingId) {\n      bookedFrom\n      bookedTo\n      consumer {\n        id\n      }\n      createdAt\n      id\n      status\n      updatedAt\n    }\n  }\n':
    types.CheckinBookingDocument,
  '\n  mutation ConfirmBooking($confirmBookingId: ID!) {\n    confirmBooking(id: $confirmBookingId) {\n      bookedFrom\n      bookedTo\n      createdAt\n      consumer {\n        id\n      }\n      id\n      experience {\n        id\n      }\n      status\n      updatedAt\n    }\n  }\n':
    types.ConfirmBookingDocument,
  '\n  mutation CreateBooking($bookingInput: BookingInput) {\n    createBooking(bookingInput: $bookingInput) {\n      bookedFrom\n      bookedTo\n      consumer {\n        id\n      }\n      id\n      experience {\n        id\n      }\n      status\n      updatedAt\n    }\n  }\n':
    types.CreateBookingDocument,
  '\n  mutation DeclineBooking($declineBookingId: ID!) {\n    declineBooking(id: $declineBookingId) {\n      bookedFrom\n      bookedTo\n      consumer {\n        id\n      }\n      createdAt\n      experience {\n        id\n      }\n      id\n      status\n      updatedAt\n    }\n  }\n':
    types.DeclineBookingDocument,
  '\n  mutation DeleteBooking($deleteBookingId: ID!) {\n    deleteBooking(id: $deleteBookingId) {\n      bookedTo\n      bookedFrom\n      consumer {\n        id\n      }\n      createdAt\n      status\n      id\n      experience {\n        id\n      }\n      updatedAt\n    }\n  }\n':
    types.DeleteBookingDocument,
  '\n  mutation FindOrCreateConsumer($consumerInput: ConsumerInput) {\n    findOrCreateConsumer(consumerInput: $consumerInput) {\n      id\n    }\n  }\n':
    types.FindOrCreateConsumerDocument,
  '\n  mutation LinkAccount($linkedAccountInput: LinkedAccountInput) {\n    linkAccount(linkedAccountInput: $linkedAccountInput) {\n      id\n      externalID\n      consumer {\n        id\n        fullName\n        firstName\n        lastName\n        dateOfBirth\n        emailAddress\n        phone\n        crmId\n        linkedAccounts {\n          id\n        }\n        createdAt\n        updatedAt\n      }\n      provider\n      membershipID\n      membershipType\n      createdAt\n      updatedAt\n    }\n  }\n':
    types.LinkAccountDocument,
  '\n  mutation UpdateConsumer($consumerInput: ConsumerInput) {\n    updateConsumer(consumerInput: $consumerInput) {\n      id\n    }\n  }\n':
    types.UpdateConsumerDocument,
  '\n  query GetAvailableSlots($data: AvailabilityInput!) {\n    getAvailableSlots(data: $data) {\n      slots {\n        startDate\n        endDate\n        maxDuration\n      }\n    }\n  }\n':
    types.GetAvailableSlotsDocument,
  '\n  query GetBookingById($getBookingById: ID!) {\n    getBookingByID(id: $getBookingById) {\n      actingAccount\n      bookedFrom\n      bookedTo\n      lastArrival\n      metadata\n      reference\n      price\n      price_currency\n      guestAdultCount\n      guestChildrenCount\n      guestInfantCount\n      status\n      id\n      consumer {\n        emailAddress\n        fullName\n        id\n      }\n      experience {\n        loungeName\n        openingHours\n        id\n        images {\n          altText\n          contentType\n          height\n          id\n          url\n          width\n        }\n        location {\n          airportName\n          terminal\n        }\n        pricing {\n          currency\n          reservationOnlyFee\n          reservationCost\n        }\n      }\n    }\n  }\n':
    types.GetBookingByIdDocument,
  '\n  query GetBookings($status: BookingStatus, $experienceId: ID!) {\n    getBookings(status: $status, experienceID: $experienceId) {\n      bookedFrom\n      bookedTo\n      createdAt\n      type\n      metadata\n      id\n      reference\n      guestAdultCount\n      guestChildrenCount\n      guestInfantCount\n      status\n      createdAt\n      updatedAt\n      consumer {\n        emailAddress\n        firstName\n        fullName\n        id\n      }\n      experience {\n        id\n        loungeName\n      }\n    }\n  }\n':
    types.GetBookingsDocument,
  '\n  query GetBookingsOverview($status: BookingStatus, $experienceId: ID!) {\n    getBookings(status: $status, experienceID: $experienceId) {\n      bookedFrom\n    }\n  }\n':
    types.GetBookingsOverviewDocument,
  '\n  query GetConsumer {\n    getConsumer {\n      id\n      crmId\n      fullName\n      firstName\n      lastName\n      emailAddress\n      createdAt\n      updatedAt\n      bookings {\n        bookedFrom\n        bookedTo\n        createdAt\n        updatedAt\n        experience {\n          id\n        }\n      }\n    }\n  }\n':
    types.GetConsumerDocument,
  '\n  query GetConsumerByEmailAddress($emailAddress: String!) {\n    getConsumerByEmailAddress(emailAddress: $emailAddress) {\n      id\n    }\n  }\n':
    types.GetConsumerByEmailAddressDocument,
  '\n  query GetConsumerByID($getConsumerById: ID!) {\n    getConsumerByID(id: $getConsumerById) {\n      linkedAccounts {\n        membershipID\n        membershipType\n        provider\n        updatedAt\n        id\n        createdAt\n        analytics\n        externalID\n      }\n      bookings {\n        id\n        bookedFrom\n        bookedTo\n        status\n        updatedAt\n        createdAt\n      }\n      firstName\n      lastName\n      dateOfBirth\n      createdAt\n      emailAddress\n      id\n      updatedAt\n      locale\n    }\n  }\n':
    types.GetConsumerByIdDocument,
  '\n  query GetExperienceByID($getExperienceById: String) {\n    getExperienceByID(id: $getExperienceById) {\n      id\n      loungeName\n      loungeCode\n      location {\n        airportName\n        airportCode\n        terminal\n        terminalCode\n        country\n        city\n        region\n        isoCountryCode\n        lbCountryCode\n      }\n    }\n  }\n':
    types.GetExperienceByIdDocument,
  '\n  query GetFlightDetails($flightDetails: FlightDetailsInput!) {\n    getFlightDetails(flightDetails: $flightDetails) {\n      arrival {\n        airport\n        terminal\n        dateTime {\n          local\n          utc\n        }\n      }\n      departure {\n        airport\n        terminal\n        dateTime {\n          local\n          utc\n        }\n      }\n    }\n  }\n':
    types.GetFlightDetailsDocument,
  '\n  query GetInvitationByID($getInvitationById: ID!) {\n    getInvitationByID(id: $getInvitationById) {\n      createdAt\n      experience {\n        id\n      }\n      id\n      inviteeEmail\n      updatedAt\n    }\n  }\n':
    types.GetInvitationByIdDocument,
  '\n  query GetOutletByID($id: ID!) {\n    getOutletByID(id: $id) {\n      id\n      name\n      category\n      code\n      legacyCode\n      location {\n        city\n        code\n        country\n        isoCountryCode\n        landside\n        name\n        terminal\n      }\n      meta {\n        editor {\n          lastName\n          firstName\n          organisation\n        }\n        lastEdited\n      }\n      products {\n        id\n        name\n        category\n        status\n      }\n      openingTimes {\n        exceptions\n        schedules {\n          MONDAY {\n            endTime\n            startTime\n          }\n          TUESDAY {\n            endTime\n            startTime\n          }\n          WEDNESDAY {\n            endTime\n            startTime\n          }\n          THURSDAY {\n            endTime\n            startTime\n          }\n          FRIDAY {\n            endTime\n            startTime\n          }\n          SATURDAY {\n            endTime\n            startTime\n          }\n          SUNDAY {\n            endTime\n            startTime\n          }\n        }\n      }\n      hasDisabledAccess\n      tier\n      productCategories\n      content {\n        media {\n          mainImage {\n            url\n            description\n            title\n          }\n          mediaCollection {\n            items {\n              url\n              description\n              title\n            }\n          }\n        }\n      }\n      status\n      salesforceID\n      reservationEmail\n      partnerBrand {\n        name\n      }\n    }\n  }\n':
    types.GetOutletByIdDocument,
  '\n  query GetOutlets($page: Int, $pageSize: Int) {\n    getOutlets(page: $page, pageSize: $pageSize) {\n      items {\n        category\n        id\n        name\n        legacyCode\n        status\n        location {\n          name\n          terminal\n        }\n        productCategories\n        content {\n          media {\n            mainImage {\n              url\n            }\n            mediaCollection {\n              items {\n                contentType\n              }\n            }\n          }\n        }\n      }\n      pageInfo {\n        currentPage\n        hasNextPage\n        hasPreviousPage\n        totalPages\n      }\n      totalItemCount\n    }\n  }\n':
    types.GetOutletsDocument,
  '\n  query GetOutletsCount {\n    getOutlets {\n      totalItemCount\n    }\n  }\n':
    types.GetOutletsCountDocument,
  '\n  query GetPartnerBrandByID($id: ID!) {\n    getPartnerBrandByID(id: $id) {\n      id\n      name\n      outlets {\n        id\n        category\n        name\n        legacyCode\n        status\n        location {\n          name\n          terminal\n        }\n        productCategories\n        content {\n          media {\n            mainImage {\n              url\n            }\n            mediaCollection {\n              items {\n                contentType\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n':
    types.GetPartnerBrandByIdDocument,
  '\n  query GetPartnerBrands($limit: Int) {\n    getPartnerBrands(limit: $limit) {\n      id\n      name\n      outlets {\n        id\n      }\n    }\n  }\n':
    types.GetPartnerBrandsDocument,
  '\n  query GetPartnerBrandsCount($limit: Int) {\n    getPartnerBrands(limit: $limit) {\n      id\n    }\n  }\n':
    types.GetPartnerBrandsCountDocument,
  '\n  query GetPartnerByID($getPartnerById: ID!) {\n    getPartnerByID(id: $getPartnerById) {\n      experiences {\n        id\n        loungeName\n        location {\n          airportName\n          terminal\n        }\n      }\n      id\n      lastName\n      updatedAt\n      firstName\n      fullName\n      createdAt\n      emailAddress\n    }\n  }\n':
    types.GetPartnerByIdDocument,
  '\n  query SearchExperiences($query: String, $searchFilter: SearchFilterInput) {\n    searchExperiences(query: $query, searchFilter: $searchFilter) {\n      id\n      loungeName\n      loungeCode\n      location {\n        airportName\n        airportCode\n        city\n        country\n        terminal\n        timezone\n      }\n      partnerIdProd\n      partnerIdTest\n      partnerIntegrationId\n      pricing {\n        pricingType\n        currency\n        reservationCost\n        lifestyleXReservationCharge\n        walkInCostCurrentPPRate\n        lifestyleXWalkInCharge\n        lifestyleXReservationCharge\n        vat\n        reservationOnlyFeeCost\n        reservationOnlyFee\n      }\n      facilities\n      openingHours\n      conditions\n      directions\n      images {\n        altText\n        url\n        height\n        width\n        id\n      }\n    }\n  }\n':
    types.SearchExperiencesDocument,
  '\n  query IsInvitationTokenValid($inviteToken: String!) {\n    isInvitationTokenValid(inviteToken: $inviteToken)\n  }\n':
    types.IsInvitationTokenValidDocument,
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
export function graphql(
  source: '\n  mutation AcceptInvitation($acceptInvitationInput: AcceptInvitationInput!) {\n    acceptInvitation(acceptInvitationInput: $acceptInvitationInput) {\n      createdAt\n      experience {\n        id\n      }\n      expiresAt\n      inviteeEmail\n      updatedAt\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation AcceptInvitation($acceptInvitationInput: AcceptInvitationInput!) {\n    acceptInvitation(acceptInvitationInput: $acceptInvitationInput) {\n      createdAt\n      experience {\n        id\n      }\n      expiresAt\n      inviteeEmail\n      updatedAt\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation cancelBooking($cancelBookingId: ID!) {\n    cancelBooking(id: $cancelBookingId) {\n      bookedFrom\n      bookedTo\n      consumer {\n        id\n      }\n      createdAt\n      experience {\n        id\n      }\n      id\n      status\n      updatedAt\n    }\n  }\n'
): (typeof documents)['\n  mutation cancelBooking($cancelBookingId: ID!) {\n    cancelBooking(id: $cancelBookingId) {\n      bookedFrom\n      bookedTo\n      consumer {\n        id\n      }\n      createdAt\n      experience {\n        id\n      }\n      id\n      status\n      updatedAt\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CheckinBooking($checkinBookingId: ID!) {\n    checkinBooking(id: $checkinBookingId) {\n      bookedFrom\n      bookedTo\n      consumer {\n        id\n      }\n      createdAt\n      id\n      status\n      updatedAt\n    }\n  }\n'
): (typeof documents)['\n  mutation CheckinBooking($checkinBookingId: ID!) {\n    checkinBooking(id: $checkinBookingId) {\n      bookedFrom\n      bookedTo\n      consumer {\n        id\n      }\n      createdAt\n      id\n      status\n      updatedAt\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation ConfirmBooking($confirmBookingId: ID!) {\n    confirmBooking(id: $confirmBookingId) {\n      bookedFrom\n      bookedTo\n      createdAt\n      consumer {\n        id\n      }\n      id\n      experience {\n        id\n      }\n      status\n      updatedAt\n    }\n  }\n'
): (typeof documents)['\n  mutation ConfirmBooking($confirmBookingId: ID!) {\n    confirmBooking(id: $confirmBookingId) {\n      bookedFrom\n      bookedTo\n      createdAt\n      consumer {\n        id\n      }\n      id\n      experience {\n        id\n      }\n      status\n      updatedAt\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateBooking($bookingInput: BookingInput) {\n    createBooking(bookingInput: $bookingInput) {\n      bookedFrom\n      bookedTo\n      consumer {\n        id\n      }\n      id\n      experience {\n        id\n      }\n      status\n      updatedAt\n    }\n  }\n'
): (typeof documents)['\n  mutation CreateBooking($bookingInput: BookingInput) {\n    createBooking(bookingInput: $bookingInput) {\n      bookedFrom\n      bookedTo\n      consumer {\n        id\n      }\n      id\n      experience {\n        id\n      }\n      status\n      updatedAt\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation DeclineBooking($declineBookingId: ID!) {\n    declineBooking(id: $declineBookingId) {\n      bookedFrom\n      bookedTo\n      consumer {\n        id\n      }\n      createdAt\n      experience {\n        id\n      }\n      id\n      status\n      updatedAt\n    }\n  }\n'
): (typeof documents)['\n  mutation DeclineBooking($declineBookingId: ID!) {\n    declineBooking(id: $declineBookingId) {\n      bookedFrom\n      bookedTo\n      consumer {\n        id\n      }\n      createdAt\n      experience {\n        id\n      }\n      id\n      status\n      updatedAt\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation DeleteBooking($deleteBookingId: ID!) {\n    deleteBooking(id: $deleteBookingId) {\n      bookedTo\n      bookedFrom\n      consumer {\n        id\n      }\n      createdAt\n      status\n      id\n      experience {\n        id\n      }\n      updatedAt\n    }\n  }\n'
): (typeof documents)['\n  mutation DeleteBooking($deleteBookingId: ID!) {\n    deleteBooking(id: $deleteBookingId) {\n      bookedTo\n      bookedFrom\n      consumer {\n        id\n      }\n      createdAt\n      status\n      id\n      experience {\n        id\n      }\n      updatedAt\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation FindOrCreateConsumer($consumerInput: ConsumerInput) {\n    findOrCreateConsumer(consumerInput: $consumerInput) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation FindOrCreateConsumer($consumerInput: ConsumerInput) {\n    findOrCreateConsumer(consumerInput: $consumerInput) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation LinkAccount($linkedAccountInput: LinkedAccountInput) {\n    linkAccount(linkedAccountInput: $linkedAccountInput) {\n      id\n      externalID\n      consumer {\n        id\n        fullName\n        firstName\n        lastName\n        dateOfBirth\n        emailAddress\n        phone\n        crmId\n        linkedAccounts {\n          id\n        }\n        createdAt\n        updatedAt\n      }\n      provider\n      membershipID\n      membershipType\n      createdAt\n      updatedAt\n    }\n  }\n'
): (typeof documents)['\n  mutation LinkAccount($linkedAccountInput: LinkedAccountInput) {\n    linkAccount(linkedAccountInput: $linkedAccountInput) {\n      id\n      externalID\n      consumer {\n        id\n        fullName\n        firstName\n        lastName\n        dateOfBirth\n        emailAddress\n        phone\n        crmId\n        linkedAccounts {\n          id\n        }\n        createdAt\n        updatedAt\n      }\n      provider\n      membershipID\n      membershipType\n      createdAt\n      updatedAt\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateConsumer($consumerInput: ConsumerInput) {\n    updateConsumer(consumerInput: $consumerInput) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation UpdateConsumer($consumerInput: ConsumerInput) {\n    updateConsumer(consumerInput: $consumerInput) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetAvailableSlots($data: AvailabilityInput!) {\n    getAvailableSlots(data: $data) {\n      slots {\n        startDate\n        endDate\n        maxDuration\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetAvailableSlots($data: AvailabilityInput!) {\n    getAvailableSlots(data: $data) {\n      slots {\n        startDate\n        endDate\n        maxDuration\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetBookingById($getBookingById: ID!) {\n    getBookingByID(id: $getBookingById) {\n      actingAccount\n      bookedFrom\n      bookedTo\n      lastArrival\n      metadata\n      reference\n      price\n      price_currency\n      guestAdultCount\n      guestChildrenCount\n      guestInfantCount\n      status\n      id\n      consumer {\n        emailAddress\n        fullName\n        id\n      }\n      experience {\n        loungeName\n        openingHours\n        id\n        images {\n          altText\n          contentType\n          height\n          id\n          url\n          width\n        }\n        location {\n          airportName\n          terminal\n        }\n        pricing {\n          currency\n          reservationOnlyFee\n          reservationCost\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetBookingById($getBookingById: ID!) {\n    getBookingByID(id: $getBookingById) {\n      actingAccount\n      bookedFrom\n      bookedTo\n      lastArrival\n      metadata\n      reference\n      price\n      price_currency\n      guestAdultCount\n      guestChildrenCount\n      guestInfantCount\n      status\n      id\n      consumer {\n        emailAddress\n        fullName\n        id\n      }\n      experience {\n        loungeName\n        openingHours\n        id\n        images {\n          altText\n          contentType\n          height\n          id\n          url\n          width\n        }\n        location {\n          airportName\n          terminal\n        }\n        pricing {\n          currency\n          reservationOnlyFee\n          reservationCost\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetBookings($status: BookingStatus, $experienceId: ID!) {\n    getBookings(status: $status, experienceID: $experienceId) {\n      bookedFrom\n      bookedTo\n      createdAt\n      type\n      metadata\n      id\n      reference\n      guestAdultCount\n      guestChildrenCount\n      guestInfantCount\n      status\n      createdAt\n      updatedAt\n      consumer {\n        emailAddress\n        firstName\n        fullName\n        id\n      }\n      experience {\n        id\n        loungeName\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetBookings($status: BookingStatus, $experienceId: ID!) {\n    getBookings(status: $status, experienceID: $experienceId) {\n      bookedFrom\n      bookedTo\n      createdAt\n      type\n      metadata\n      id\n      reference\n      guestAdultCount\n      guestChildrenCount\n      guestInfantCount\n      status\n      createdAt\n      updatedAt\n      consumer {\n        emailAddress\n        firstName\n        fullName\n        id\n      }\n      experience {\n        id\n        loungeName\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetBookingsOverview($status: BookingStatus, $experienceId: ID!) {\n    getBookings(status: $status, experienceID: $experienceId) {\n      bookedFrom\n    }\n  }\n'
): (typeof documents)['\n  query GetBookingsOverview($status: BookingStatus, $experienceId: ID!) {\n    getBookings(status: $status, experienceID: $experienceId) {\n      bookedFrom\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetConsumer {\n    getConsumer {\n      id\n      crmId\n      fullName\n      firstName\n      lastName\n      emailAddress\n      createdAt\n      updatedAt\n      bookings {\n        bookedFrom\n        bookedTo\n        createdAt\n        updatedAt\n        experience {\n          id\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetConsumer {\n    getConsumer {\n      id\n      crmId\n      fullName\n      firstName\n      lastName\n      emailAddress\n      createdAt\n      updatedAt\n      bookings {\n        bookedFrom\n        bookedTo\n        createdAt\n        updatedAt\n        experience {\n          id\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetConsumerByEmailAddress($emailAddress: String!) {\n    getConsumerByEmailAddress(emailAddress: $emailAddress) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  query GetConsumerByEmailAddress($emailAddress: String!) {\n    getConsumerByEmailAddress(emailAddress: $emailAddress) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetConsumerByID($getConsumerById: ID!) {\n    getConsumerByID(id: $getConsumerById) {\n      linkedAccounts {\n        membershipID\n        membershipType\n        provider\n        updatedAt\n        id\n        createdAt\n        analytics\n        externalID\n      }\n      bookings {\n        id\n        bookedFrom\n        bookedTo\n        status\n        updatedAt\n        createdAt\n      }\n      firstName\n      lastName\n      dateOfBirth\n      createdAt\n      emailAddress\n      id\n      updatedAt\n      locale\n    }\n  }\n'
): (typeof documents)['\n  query GetConsumerByID($getConsumerById: ID!) {\n    getConsumerByID(id: $getConsumerById) {\n      linkedAccounts {\n        membershipID\n        membershipType\n        provider\n        updatedAt\n        id\n        createdAt\n        analytics\n        externalID\n      }\n      bookings {\n        id\n        bookedFrom\n        bookedTo\n        status\n        updatedAt\n        createdAt\n      }\n      firstName\n      lastName\n      dateOfBirth\n      createdAt\n      emailAddress\n      id\n      updatedAt\n      locale\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetExperienceByID($getExperienceById: String) {\n    getExperienceByID(id: $getExperienceById) {\n      id\n      loungeName\n      loungeCode\n      location {\n        airportName\n        airportCode\n        terminal\n        terminalCode\n        country\n        city\n        region\n        isoCountryCode\n        lbCountryCode\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetExperienceByID($getExperienceById: String) {\n    getExperienceByID(id: $getExperienceById) {\n      id\n      loungeName\n      loungeCode\n      location {\n        airportName\n        airportCode\n        terminal\n        terminalCode\n        country\n        city\n        region\n        isoCountryCode\n        lbCountryCode\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetFlightDetails($flightDetails: FlightDetailsInput!) {\n    getFlightDetails(flightDetails: $flightDetails) {\n      arrival {\n        airport\n        terminal\n        dateTime {\n          local\n          utc\n        }\n      }\n      departure {\n        airport\n        terminal\n        dateTime {\n          local\n          utc\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetFlightDetails($flightDetails: FlightDetailsInput!) {\n    getFlightDetails(flightDetails: $flightDetails) {\n      arrival {\n        airport\n        terminal\n        dateTime {\n          local\n          utc\n        }\n      }\n      departure {\n        airport\n        terminal\n        dateTime {\n          local\n          utc\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetInvitationByID($getInvitationById: ID!) {\n    getInvitationByID(id: $getInvitationById) {\n      createdAt\n      experience {\n        id\n      }\n      id\n      inviteeEmail\n      updatedAt\n    }\n  }\n'
): (typeof documents)['\n  query GetInvitationByID($getInvitationById: ID!) {\n    getInvitationByID(id: $getInvitationById) {\n      createdAt\n      experience {\n        id\n      }\n      id\n      inviteeEmail\n      updatedAt\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetOutletByID($id: ID!) {\n    getOutletByID(id: $id) {\n      id\n      name\n      category\n      code\n      legacyCode\n      location {\n        city\n        code\n        country\n        isoCountryCode\n        landside\n        name\n        terminal\n      }\n      meta {\n        editor {\n          lastName\n          firstName\n          organisation\n        }\n        lastEdited\n      }\n      products {\n        id\n        name\n        category\n        status\n      }\n      openingTimes {\n        exceptions\n        schedules {\n          MONDAY {\n            endTime\n            startTime\n          }\n          TUESDAY {\n            endTime\n            startTime\n          }\n          WEDNESDAY {\n            endTime\n            startTime\n          }\n          THURSDAY {\n            endTime\n            startTime\n          }\n          FRIDAY {\n            endTime\n            startTime\n          }\n          SATURDAY {\n            endTime\n            startTime\n          }\n          SUNDAY {\n            endTime\n            startTime\n          }\n        }\n      }\n      hasDisabledAccess\n      tier\n      productCategories\n      content {\n        media {\n          mainImage {\n            url\n            description\n            title\n          }\n          mediaCollection {\n            items {\n              url\n              description\n              title\n            }\n          }\n        }\n      }\n      status\n      salesforceID\n      reservationEmail\n      partnerBrand {\n        name\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetOutletByID($id: ID!) {\n    getOutletByID(id: $id) {\n      id\n      name\n      category\n      code\n      legacyCode\n      location {\n        city\n        code\n        country\n        isoCountryCode\n        landside\n        name\n        terminal\n      }\n      meta {\n        editor {\n          lastName\n          firstName\n          organisation\n        }\n        lastEdited\n      }\n      products {\n        id\n        name\n        category\n        status\n      }\n      openingTimes {\n        exceptions\n        schedules {\n          MONDAY {\n            endTime\n            startTime\n          }\n          TUESDAY {\n            endTime\n            startTime\n          }\n          WEDNESDAY {\n            endTime\n            startTime\n          }\n          THURSDAY {\n            endTime\n            startTime\n          }\n          FRIDAY {\n            endTime\n            startTime\n          }\n          SATURDAY {\n            endTime\n            startTime\n          }\n          SUNDAY {\n            endTime\n            startTime\n          }\n        }\n      }\n      hasDisabledAccess\n      tier\n      productCategories\n      content {\n        media {\n          mainImage {\n            url\n            description\n            title\n          }\n          mediaCollection {\n            items {\n              url\n              description\n              title\n            }\n          }\n        }\n      }\n      status\n      salesforceID\n      reservationEmail\n      partnerBrand {\n        name\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetOutlets($page: Int, $pageSize: Int) {\n    getOutlets(page: $page, pageSize: $pageSize) {\n      items {\n        category\n        id\n        name\n        legacyCode\n        status\n        location {\n          name\n          terminal\n        }\n        productCategories\n        content {\n          media {\n            mainImage {\n              url\n            }\n            mediaCollection {\n              items {\n                contentType\n              }\n            }\n          }\n        }\n      }\n      pageInfo {\n        currentPage\n        hasNextPage\n        hasPreviousPage\n        totalPages\n      }\n      totalItemCount\n    }\n  }\n'
): (typeof documents)['\n  query GetOutlets($page: Int, $pageSize: Int) {\n    getOutlets(page: $page, pageSize: $pageSize) {\n      items {\n        category\n        id\n        name\n        legacyCode\n        status\n        location {\n          name\n          terminal\n        }\n        productCategories\n        content {\n          media {\n            mainImage {\n              url\n            }\n            mediaCollection {\n              items {\n                contentType\n              }\n            }\n          }\n        }\n      }\n      pageInfo {\n        currentPage\n        hasNextPage\n        hasPreviousPage\n        totalPages\n      }\n      totalItemCount\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetOutletsCount {\n    getOutlets {\n      totalItemCount\n    }\n  }\n'
): (typeof documents)['\n  query GetOutletsCount {\n    getOutlets {\n      totalItemCount\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetPartnerBrandByID($id: ID!) {\n    getPartnerBrandByID(id: $id) {\n      id\n      name\n      outlets {\n        id\n        category\n        name\n        legacyCode\n        status\n        location {\n          name\n          terminal\n        }\n        productCategories\n        content {\n          media {\n            mainImage {\n              url\n            }\n            mediaCollection {\n              items {\n                contentType\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetPartnerBrandByID($id: ID!) {\n    getPartnerBrandByID(id: $id) {\n      id\n      name\n      outlets {\n        id\n        category\n        name\n        legacyCode\n        status\n        location {\n          name\n          terminal\n        }\n        productCategories\n        content {\n          media {\n            mainImage {\n              url\n            }\n            mediaCollection {\n              items {\n                contentType\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetPartnerBrands($limit: Int) {\n    getPartnerBrands(limit: $limit) {\n      id\n      name\n      outlets {\n        id\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetPartnerBrands($limit: Int) {\n    getPartnerBrands(limit: $limit) {\n      id\n      name\n      outlets {\n        id\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetPartnerBrandsCount($limit: Int) {\n    getPartnerBrands(limit: $limit) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  query GetPartnerBrandsCount($limit: Int) {\n    getPartnerBrands(limit: $limit) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetPartnerByID($getPartnerById: ID!) {\n    getPartnerByID(id: $getPartnerById) {\n      experiences {\n        id\n        loungeName\n        location {\n          airportName\n          terminal\n        }\n      }\n      id\n      lastName\n      updatedAt\n      firstName\n      fullName\n      createdAt\n      emailAddress\n    }\n  }\n'
): (typeof documents)['\n  query GetPartnerByID($getPartnerById: ID!) {\n    getPartnerByID(id: $getPartnerById) {\n      experiences {\n        id\n        loungeName\n        location {\n          airportName\n          terminal\n        }\n      }\n      id\n      lastName\n      updatedAt\n      firstName\n      fullName\n      createdAt\n      emailAddress\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query SearchExperiences($query: String, $searchFilter: SearchFilterInput) {\n    searchExperiences(query: $query, searchFilter: $searchFilter) {\n      id\n      loungeName\n      loungeCode\n      location {\n        airportName\n        airportCode\n        city\n        country\n        terminal\n        timezone\n      }\n      partnerIdProd\n      partnerIdTest\n      partnerIntegrationId\n      pricing {\n        pricingType\n        currency\n        reservationCost\n        lifestyleXReservationCharge\n        walkInCostCurrentPPRate\n        lifestyleXWalkInCharge\n        lifestyleXReservationCharge\n        vat\n        reservationOnlyFeeCost\n        reservationOnlyFee\n      }\n      facilities\n      openingHours\n      conditions\n      directions\n      images {\n        altText\n        url\n        height\n        width\n        id\n      }\n    }\n  }\n'
): (typeof documents)['\n  query SearchExperiences($query: String, $searchFilter: SearchFilterInput) {\n    searchExperiences(query: $query, searchFilter: $searchFilter) {\n      id\n      loungeName\n      loungeCode\n      location {\n        airportName\n        airportCode\n        city\n        country\n        terminal\n        timezone\n      }\n      partnerIdProd\n      partnerIdTest\n      partnerIntegrationId\n      pricing {\n        pricingType\n        currency\n        reservationCost\n        lifestyleXReservationCharge\n        walkInCostCurrentPPRate\n        lifestyleXWalkInCharge\n        lifestyleXReservationCharge\n        vat\n        reservationOnlyFeeCost\n        reservationOnlyFee\n      }\n      facilities\n      openingHours\n      conditions\n      directions\n      images {\n        altText\n        url\n        height\n        width\n        id\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query IsInvitationTokenValid($inviteToken: String!) {\n    isInvitationTokenValid(inviteToken: $inviteToken)\n  }\n'
): (typeof documents)['\n  query IsInvitationTokenValid($inviteToken: String!) {\n    isInvitationTokenValid(inviteToken: $inviteToken)\n  }\n'];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
