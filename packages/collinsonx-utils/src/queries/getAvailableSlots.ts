import { gql } from '../apollo';

const getAvailableSlots = gql`
  query GetAvailableSlots($data: AvailabilityInput!) {
    getAvailableSlots(data: $data) {
      messageID
      temporaryReservationID
      slots {
        startDate
        endDate
        maxDuration
      }
    }
  }
`;

export default getAvailableSlots;
