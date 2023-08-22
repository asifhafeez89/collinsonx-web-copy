import { gql } from '../apollo';

const getBookings = gql`
  query GetBookings($status: BookingStatus, $experienceId: ID!) {
    getBookings(status: $status, experienceID: $experienceId) {
      bookedFrom
      bookedTo
      createdAt
      type
      metadata
      id
      reference
      guestCount
      status
      createdAt
      updatedAt
      consumer {
        emailAddress
        firstName
        fullName
        id
      }
      experience {
        id
        loungeName
      }
    }
  }
`;

export default getBookings;
