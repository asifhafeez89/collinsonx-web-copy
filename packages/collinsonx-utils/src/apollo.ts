import { ApolloClient, InMemoryCache } from '@apollo/client';

const port = process.env.APP_PORT || 3000;

const domain =
  process.env.NEXT_PUBLIC_SITE_DOMAIN_URL ||
  process.env.NEXT_PUBLIC_VERCEL_URL ||
  `http://localhost:${port}`;

const graphqlUrl = `${domain}/graphql`;

export const client = new ApolloClient({
  uri: graphqlUrl,
  cache: new InMemoryCache(),
});

export { gql, ApolloProvider, useQuery, useLazyQuery } from '@apollo/client';
