import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';

const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
});

interface ClientProps {
  children: JSX.Element;
}

export default function Client({ children }: ClientProps) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
