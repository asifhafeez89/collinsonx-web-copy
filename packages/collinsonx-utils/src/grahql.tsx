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

interface CollinsonXClientProps {
  children: JSX.Element;
}

export default function CollinsonXClient({ children }: CollinsonXClientProps) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
