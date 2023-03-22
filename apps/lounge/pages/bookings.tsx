import { Text, Box } from '@collinsonx/design-system/core';
import BookingCard from '@components/BookingCard';
import BookingEmptyState from '@components/BookingEmptyState';

import Layout from '@components/Layout';
import { useState } from 'react';

import BookingCardConfirmed from '../components/BookingCardConfirmed';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';
import { client, useQuery } from '@collinsonx/utils/apollo';
import { getBookings } from '@collinsonx/utils/queries';
import { BookingStatus } from '@components/BookingBadge';
import bookings from './bookingsMock.json';

type DataStatus = 'empty' | 'hasData';

type Booking = (typeof bookings)[number];

export default function Bookings() {
  const [status, setStatus] = useState<DataStatus>('hasData');
  const router = useRouter();

  const {
    loading,
    error: bookingsDataError,
    data: bookingsData,
  } = useQuery(getBookings);

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
      {!bookingsData?.getBookings.length ? (
        <BookingEmptyState />
      ) : (
        <>
          TEST
          <BookingCardConfirmed
            key={bookings?.[0]?.id}
            name={bookings?.[0]?.experience?.name ?? ''}
            location={bookings?.[0]?.experience?.location ?? ''}
            date={bookings?.[0]?.reservationDate ?? ''}
            status={bookings?.[0]?.bookingState ?? 'PENDING'}
          />
          {bookingsData?.getBookings.map((booking) => (
            <BookingCard
              onClick={onViewBookingDetails}
              key={booking.id}
              id={booking.id ?? ''}
              name={booking?.experience?.name ?? ''}
              location={booking?.experience?.location ?? ''}
              imgUrl={booking?.experience?.images?.[0]?.url ?? ''}
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

Bookings.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
