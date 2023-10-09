import { ApolloError } from '@collinsonx/utils/apollo';

function fetchGrahpQLErrorObject(response: unknown | ApolloError) {
  if (!response && typeof response !== 'object') {
    return null;
  }

  const error = response as ApolloError;

  if (error && 'graphQLErrors' in error) {
    const graphQLErrors = error.graphQLErrors;

    if (graphQLErrors && typeof graphQLErrors === 'object') {
      const data = error.graphQLErrors[0];
      if ('extensions' in data) {
        return data.extensions;
      }
    }
  }

  return null;
}

export default fetchGrahpQLErrorObject;
