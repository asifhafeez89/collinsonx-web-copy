import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';

import data from './experiences.json';
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type Image {
    altText: String
    width: Int
    contentType: String
    url: String
    height: Int
  }

  type Lounge {
    experienceCategory: String
    type: String
    id: String
    name: String
    images: [Image]
    location: String
    additionInformation: String
    loungeOperator: String
    conditions: String
    objectID: String
    openingHours: String
    facilities: String
  }

  type Query {
    lounges: [Lounge]
    lounge(id: String!): Lounge
  }
`;

const resolvers = {
  Query: {
    lounges: () => data,
    lounge: (id: string) =>
      data.filter(({ id: itemId }) => {
        console.log(id, itemId);
        // WHY IS id UNDEFINED?
        return id === itemId;
      }),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

export default startServerAndCreateNextHandler(server);
