import { ApolloClient, InMemoryCache } from '@apollo/client';

const { GRAPHQL_API_URL } = process.env;

export const client = new ApolloClient({
  uri: GRAPHQL_API_URL,
  cache: new InMemoryCache(),
});

export { gql, ApolloProvider } from '@apollo/client';
