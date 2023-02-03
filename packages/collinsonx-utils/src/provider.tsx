import { client, ApolloProvider } from './apollo';

interface ClientProps {
  children: JSX.Element;
}

export default function Client({ children }: ClientProps) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
