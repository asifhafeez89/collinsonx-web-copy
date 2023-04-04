import { client, ApolloProvider } from './apollo';

interface ClientProps {
  children: JSX.Element;
  isConsumer: boolean;
}

export default function Client({ children, isConsumer }: ClientProps) {
  return (
    <ApolloProvider client={client(isConsumer)}>{children}</ApolloProvider>
  );
}
