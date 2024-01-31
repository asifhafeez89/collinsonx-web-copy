import { gql } from '../apollo';

const createBooking = gql`
  mutation confirmAmendment($amendmentInput: AmendmentInput) {
    confirmAmendment(amendmentInput: $amendmentInput) {
      id
      price
      status
      paymentOption
    }
  }
`;

export default createBooking;
