import { Text, Title } from '@collinsonx/design-system/core';
import { ApolloError } from '@collinsonx/utils/apollo';

export interface ErrorProps {
  error: ApolloError;
}
const Error = ({ error }: ErrorProps) => {
  return (
    <>
      <Title fw={600} order={3}>
        An error has occurred
      </Title>
      {error.graphQLErrors.map((error, index) => (
        <Text key={index}>{error.message}</Text>
      ))}
    </>
  );
};

export default Error;
