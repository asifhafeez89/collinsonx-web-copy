import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/link-error';
import { setContext } from '@apollo/client/link/context';

const port = process.env.APP_PORT || 3000;

const domain =
  process.env.NEXT_PUBLIC_SITE_DOMAIN_URL ||
  process.env.NEXT_PUBLIC_VERCEL_URL ||
  `http://localhost:${port}`;

const graphqlUrl = `${domain}/api/graphql`;

const httpLink = new HttpLink({
  uri: graphqlUrl,
  headers: {},
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      'x-user-id': '1337',
    },
  };
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
          `[Network error]: ${networkError}. Backend is unreachable. Is it running?`,
          `[Graphql URL]: ${graphqlUrl}`
        );
    }),
    authLink,
    httpLink,
  ]),
});

export {
  gql,
  ApolloProvider,
  useQuery,
  useLazyQuery,
  useMutation,
} from '@apollo/client';
