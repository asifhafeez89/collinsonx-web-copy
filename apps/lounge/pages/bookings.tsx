import { Text, Box } from '@collinsonx/design-system/core';
import BookingCard from '@components/BookingCard';
import BookingEmptyState from '@components/BookingEmptyState';

import Layout from '@components/Layout';
import { useState } from 'react';

import BookingCardConfirmed from '../components/BookingCardConfirmed';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';
import { Booking } from '@collinsonx/utils/generatedTypes/graphql';
import { client } from '@collinsonx/utils/apollo';
import { getBookings } from '@collinsonx/utils/queries';
import { BookingStatus } from '@components/BookingBadge';
import bookings from './bookingsMock.json';

type DataStatus = 'empty' | 'hasData';

interface BookingsDetailProps {
  bookings: Booking[];
  loading: boolean;
}

export default function Bookings({ bookings, loading }: BookingsDetailProps) {
  const [status, setStatus] = useState<DataStatus>('hasData');
  const router = useRouter();

  const onViewBookingDetails = (id: string) => {
    router.push({
      pathname: '/bookingDetails',
      query: {
        id,
      },
    });
  };

  return (
    <Box>
      <Text fw={600} pb={12} size={20}>
        Booking management
      </Text>
      {status === 'empty' && <BookingEmptyState />}
      {status === 'hasData' && (
        <>
          <BookingCardConfirmed
            key={bookings?.[0]?.id}
            name={bookings?.[0]?.lounge?.name ?? ''}
            location={bookings?.[0]?.lounge?.location ?? ''}
            date={bookings?.[0]?.reservationDate ?? ''}
            status={bookings?.[0]?.bookingState ?? 'PENDING'}
          />
          {bookings?.map((booking) => (
            <BookingCard
              onClick={onViewBookingDetails}
              key={booking.id}
              id={booking.id ?? ''}
              name={booking?.lounge?.name ?? ''}
              location={booking?.lounge?.location ?? ''}
              imgUrl={booking?.lounge?.images?.[0]?.url ?? ''}
              status={(booking?.bookingState as BookingStatus) ?? 'PENDING'}
              date={booking?.reservationDate ?? ''}
            />
          ))}
        </>
      )}
    </Box>
  );
}

interface QueryProps extends NextPageContext {
  bookings: Booking[];
}

export async function getServerSideProps({ query }: QueryProps) {
  const bookingId = query?.id ?? '';

  try {
    const { data, loading } = await client.query({
      query: getBookings,
      variables: { id: bookingId },
    });
    return {
      props: {
        bookings: data?.bookings,
        loading: loading,
      },
    };
  } catch (err) {
    return {
      props: {
        bookings: bookings,
        loading: false,
      },
    };
  }
}

Bookings.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
