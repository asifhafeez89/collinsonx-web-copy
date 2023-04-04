import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  ApolloError,
  DefaultOptions,
} from '@apollo/client';
import { onError } from '@apollo/link-error';
import { setContext } from '@apollo/client/link/context';

const port = process.env.APP_PORT || 3000;

const domain =
  process.env.NEXT_PUBLIC_SITE_DOMAIN_URL ||
  process.env.NEXT_PUBLIC_VERCEL_URL ||
  `http://localhost:${port}`;

const graphqlUrl = `${domain}/api/graphql`;

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
  mutate: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
};

const httpLink = new HttpLink({
  uri: graphqlUrl,
  headers: {},
});

// a temporary hack to add x-user-id only when
// user is consumer for demo purposes
const authLink = (isConsumer: boolean) =>
  setContext((_, { headers, ...context }) => {
    const userId =
      typeof window !== 'undefined' && isConsumer
        ? localStorage.getItem('EXPERIENCE_X_CONSUMER_ID')
        : null;
    return {
      headers: {
        ...headers,
        ...(userId ? { 'x-user-id': userId } : {}),
      },
      ...context,
    };
  });

export const client = (isConsumer: boolean) =>
  new ApolloClient({
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
      authLink(isConsumer),
      httpLink,
    ]),
    defaultOptions,
  });

export {
  gql,
  ApolloProvider,
  ApolloError,
  useQuery,
  useLazyQuery,
  useMutation,
} from '@apollo/client';
