import { Notification, Text } from '@collinsonx/design-system/core';
import { ApolloError } from '@collinsonx/utils/apollo';

export interface ErrorProps {
  error?: ApolloError;
  title?: string;
}
const Error = ({ error, title = 'An error occurred' }: ErrorProps) => {
  return (
    <>
      {!!error ? (
        <Notification my={8} color="red.7" title={title} w="100%">
          {error.graphQLErrors.map((error, index) => (
            <Text key={index}>{error.message}</Text>
          ))}
        </Notification>
      ) : null}
    </>
  );
};

export default Error;
