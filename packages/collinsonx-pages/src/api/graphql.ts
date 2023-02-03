import { ApolloServer, gql } from 'apollo-server-micro';

import data from '../apiMock';
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type Lounge {
    loungeName: String
    airport: String
    terminal: String
    pictureUrl: String
  }

  type Query {
    lounges: [Lounge]
  }
`;

const resolvers = {
  Query: {
    lounges: () => data,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

export default server.createHandler({
  path: '/api/graphql',
});

export const config = {
  api: {
    bodyParser: false,
  },
};
