import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';

import lounges from './experiences.json';
import bookings from './bookings.json';

const typeDefs = gql`
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
    facilities: [String]
  }

  type Booking {
    id: String
    lounge: Lounge
    bookingState: String
    reservationDate: String
    additionalRequests: String
  }

  type Query {
    lounges: [Lounge]
    lounge(id: String!): Lounge
    bookings: [Booking]
    booking(id: String!): Booking
    getLoungesByName(loungeName: String!): [Lounge]
  }
`;

const resolvers = {
  Query: {
    lounges: () => lounges,
    lounge: (parent: any, args: any) => {
      const { id } = args;
      const l = lounges.filter(({ id: itemId }) => {
        return id === itemId;
      });
      return l?.[0] ?? null;
    },
    getLoungesByName: (parent: any, args: any) => {
      const { loungeName } = args;
      const l = lounges.filter(({ name: itemName }) => {
        return itemName.toLowerCase().includes(loungeName.toLowerCase());
      });
      return l ?? null;
    },
    bookings: () =>
      bookings.map((item) => ({
        id: item.id,
        lounge: lounges.find(({ id }) => id === item.loungeId),
        bookingState: item.bookingState,
        reservationDate: item.reservationDate,
        additionalRequests: item.additionalRequests,
      })),
    booking: (parent: any, args: any) => {
      const { id } = args;
      const l =
        bookings
          .filter(({ id: itemId }) => {
            return id === itemId;
          })
          ?.map((item) => ({
            id: item.id,
            lounge: lounges.find(({ id }) => id === item.loungeId),
            bookingState: item.bookingState,
            reservationDate: item.reservationDate,
            additionalRequests: item.additionalRequests,
          })) ?? [];
      return l?.[0] ?? null;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

export default startServerAndCreateNextHandler(server);
