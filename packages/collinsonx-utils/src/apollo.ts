import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/link-error';

const graphqlUrl =
  process.env.GRAPHQL_API_URL ?? process.env.NEXT_PUBLIC_GRAPHQL_API_URL;

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
