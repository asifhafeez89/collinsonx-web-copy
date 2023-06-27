import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  DefaultOptions,
} from '@apollo/client';
import { onError } from '@apollo/link-error';
import { setContext } from '@apollo/client/link/context';

import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import { useMemo } from 'react';

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
const authLink = (
  isConsumer: boolean,
  namespace: string = 'EXPERIENCE_X_CONSUMER_ID'
) =>
  setContext((_, { headers, ...context }) => {
    const userId =
      typeof window !== 'undefined' && isConsumer
        ? localStorage.getItem(namespace)
        : null;
    const userType =
      typeof window !== 'undefined' && isConsumer
        ? localStorage.getItem('USER_TYPE')
        : null;
    const userMeta =
      typeof window !== 'undefined' && isConsumer
        ? localStorage.getItem('USER_META')
        : null;
    return {
      headers: {
        ...headers,
        ...(userId ? { 'x-user-id': userId } : {}),
        ...(userType ? { 'x-user-type': userType } : {}),
        ...(userMeta ? { 'x-user-metadata': userMeta } : {}),
      },
      ...context,
    };
  });

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }
  if (networkError) {
    console.log(
      `[Network error]: ${networkError}. Backend is unreachable. Is it running?`,
      `[Graphql URL]: ${graphqlUrl}`
    );
  }
});

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<any>;

function createApolloClient(isConsumer: boolean, namespace?: string) {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([
      errorLink,
      authLink(isConsumer, namespace),
      httpLink,
    ]),
    cache: new InMemoryCache(),
    defaultOptions,
  });
}

export function initializeApollo(
  initialState = null,
  isConsumer: boolean,
  namespace?: string
) {
  const _apolloClient =
    apolloClient ?? createApolloClient(isConsumer, namespace);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
    const data = merge(existingCache, initialState, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(client: any, pageProps: any) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(
  pageProps: any,
  isConsumer: boolean,
  namespace?: string
) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(
    () => initializeApollo(state, isConsumer, namespace),
    [state, isConsumer]
  );
  return store;
}

export {
  gql,
  ApolloProvider,
  ApolloError,
  useQuery,
  useLazyQuery,
  useMutation,
} from '@apollo/client';
