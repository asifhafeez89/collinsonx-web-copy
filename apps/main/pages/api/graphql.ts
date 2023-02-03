import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';

import data from '@collinsonx/pages/apiMock';
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
    lounges: () => data.lounges,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

export default startServerAndCreateNextHandler(server);
