import { gql } from '../apollo';

const updateConsumer = gql`
  mutation UpdateConsumer($consumerInput: ConsumerInput) {
    updateConsumer(consumerInput: $consumerInput) {
      id
    }
  }
`;

export default updateConsumer;
