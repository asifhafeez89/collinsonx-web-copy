import { gql } from '../apollo';

const findOrCreateConsumer = gql`
  mutation FindOrCreateConsumer($consumerInput: ConsumerInput) {
    findOrCreateConsumer(consumerInput: $consumerInput) {
      id
    }
  }
`;

export default findOrCreateConsumer;
