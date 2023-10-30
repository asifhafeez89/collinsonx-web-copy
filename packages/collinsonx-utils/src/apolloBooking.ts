import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  DefaultOptions,
  fromPromise,
  toPromise,
} from '@apollo/client';
import { onError } from '@apollo/link-error';
import { doesSessionExist } from 'supertokens-auth-react/recipe/session';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import { useMemo } from 'react';
import { setContext } from '@apollo/client/link/context';
import { getCookiesFromStorage } from './lib/cookieHandler';
import { cookieStringToObject } from './lib';

const graphqlUrl = process.env.NEXT_PUBLIC_PRODUCTION_API_URL;

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

const authLink = setContext((_, { headers }) => {
  const cookieStr = getCookiesFromStorage();
  const cookies = cookieStringToObject(cookieStr);
  const token = cookies['st-access-token'] || '';
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const httpLink = new HttpLink({
  uri: graphqlUrl,
  credentials: 'include',
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

const authMiddleware = new ApolloLink((operation, forward) => {
  return fromPromise(
    doesSessionExist().then(() => {
      console.log('Pre-GQL refresh session if expired');
      return toPromise(forward(operation));
    })
  );
});

let apolloClient: ApolloClient<any>;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([
      authLink,
      authMiddleware,
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
    cache: new InMemoryCache(),
    defaultOptions,
  });
}

// , authLink(false)

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

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

export function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
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
