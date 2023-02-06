import { ApolloClient, InMemoryCache } from '@apollo/client';

console.log(
  process.env.GRAPHQL_API_URL,
  process.env.NEXT_PUBLIC_GRAPHQL_API_URL
);

export const client = new ApolloClient({
  uri: process.env.GRAPHQL_API_URL || process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
  cache: new InMemoryCache(),
});

export { gql, ApolloProvider, useQuery, useLazyQuery } from '@apollo/client';
