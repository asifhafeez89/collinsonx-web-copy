import { Text, Box, Skeleton } from '@collinsonx/design-system/core';
import BookingCard from '@components/BookingCard';
import BookingEmptyState from '@components/BookingEmptyState';

import Layout from '@components/Layout';
import { useState } from 'react';

import { useRouter } from 'next/router';
import { useQuery } from '@collinsonx/utils/apollo';
import { getBookings } from '@collinsonx/utils/queries';
import { Booking, BookingStatus } from '@collinsonx/utils';

type DataStatus = 'empty' | 'hasData';

export default function Bookings() {
  const [status, setStatus] = useState<DataStatus>('hasData');
  const router = useRouter();

  const {
    loading,
    error: bookingsDataError,
    data: bookingsData,
  } = useQuery<{ getBookings: Booking[] }>(getBookings);

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
      {loading && <Skeleton visible={loading} h={390} />}
      {!bookingsData?.getBookings.length && !loading && <BookingEmptyState />}
      {!!bookingsData?.getBookings.length && (
        <>
          {bookingsData?.getBookings
            .sort(
              (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
            )
            .map((booking) => (
              <BookingCard
                onClick={onViewBookingDetails}
                key={booking.id}
                id={booking.id ?? ''}
                name={booking?.experience?.name ?? ''}
                location={booking?.experience?.location ?? ''}
                imgUrl={booking?.experience?.images?.[0]?.url ?? ''}
                status={booking?.status ?? BookingStatus.Initialized}
                date={booking?.bookedFrom ?? ''}
              />
            ))}
        </>
      )}
    </Box>
  );
}

Bookings.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
