import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/link-error';

const port = process.env.APP_PORT || 3000;

const previewUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : '';

const domain =
  process.env.NEXT_PUBLIC_SITE_DOMAIN_URL ||
  previewUrl ||
  `http://localhost:${port}`;

const graphqlUrl = `${domain}/api/remote/graphql`;

const httpLink = new HttpLink({
  uri: graphqlUrl,
  headers: {},
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  ssrMode: typeof window === 'undefined',
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError)
        console.log(
          `[Network error]: ${networkError}. Backend is unreachable. Is it running?`
        );
    }),
    httpLink,
  ]),
});

export { gql, ApolloProvider, useQuery, useLazyQuery } from '@apollo/client';
