import { ApolloClient, InMemoryCache } from '@apollo/client';

const graphqlUrl =
  process.env.GRAPHQL_API_URL ?? process.env.NEXT_PUBLIC_GRAPHQL_API_URL;

console.log(graphqlUrl);

export const client = new ApolloClient({
  uri: graphqlUrl,
  cache: new InMemoryCache(),
});

export { gql, ApolloProvider, useQuery, useLazyQuery } from '@apollo/client';
