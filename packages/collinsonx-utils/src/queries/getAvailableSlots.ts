import { gql } from '../apollo';

const getAvailableSlots = gql`
  query GetAvailableSlots($data: AvailabilityInput!) {
    getAvailableSlots(data: $data) {
      slots {
        startDate
        endDate
        maxDuration
      }
    }
  }
`;

export default getAvailableSlots;
