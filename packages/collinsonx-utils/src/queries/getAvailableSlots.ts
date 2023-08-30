import { gql } from '../apollo';

enum ProductType {
  Lounge,
}

export type FlightInformation = {
  airport?: String;
  dateTime: String;
  terminal: String;
  type: String;
};

export type Guests = {
  adultCount: Number;
  childrenCount: Number;
  infantCount: Number;
};

export type Product = {
  productID: String;
  productType?: ProductType;
  supplierCode: String;
};

export type AvailabilityInput = {
  flightInformation: FlightInformation;
  guests: Guests;
  product: Product;
};

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
