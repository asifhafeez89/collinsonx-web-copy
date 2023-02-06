import { ApolloClient, InMemoryCache } from '@apollo/client';

const hostname = process.env.VERCEL_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL;
const protocol = hostname ? 'https://' : 'http://';

const graphqlUrl = `${protocol}${hostname ?? 'localhost:3000'}${
  process.env.GRAPHQL_API_URL ?? process.env.NEXT_PUBLIC_GRAPHQL_API_URL
}`;

console.info('---', graphqlUrl);

export const client = new ApolloClient({
  uri: graphqlUrl,
  cache: new InMemoryCache(),
});

export { gql, ApolloProvider, useQuery, useLazyQuery } from '@apollo/client';
