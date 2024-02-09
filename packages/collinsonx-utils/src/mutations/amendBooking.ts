import { gql } from '../apollo';

const amendBooking = gql`
  mutation confirmAmendment($amendmentInput: AmendmentInput) {
    confirmAmendment(amendmentInput: $amendmentInput) {
      id
      price
      status
      paymentOption
      refundStatus
      refundedAt
    }
  }
`;

export default amendBooking;
