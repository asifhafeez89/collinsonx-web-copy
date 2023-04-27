import { Text, Box, Skeleton } from '@collinsonx/design-system/core';
import BookingCard from '@components/BookingCard';
import BookingEmptyState from '@components/BookingEmptyState';

import Layout from '@components/Layout';
import { useState } from 'react';

import { useRouter } from 'next/router';
import { useQuery } from '@collinsonx/utils/apollo';
import { getBookings } from '@collinsonx/utils/queries';
import { Booking, BookingStatus } from '@collinsonx/utils';
import LoungeError from '@components/LoungeError';

type DataStatus = 'empty' | 'hasData';

export default function Bookings() {
  const [status, setStatus] = useState<DataStatus>('hasData');
  const router = useRouter();

  const {
    loading,
    error: fetchError,
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
      <LoungeError error={fetchError} />
      {loading && <Skeleton visible={loading} h={390} />}
      {!bookingsData?.getBookings.length && !loading && <BookingEmptyState />}
      {!!bookingsData?.getBookings.length && (
        <>
          {bookingsData?.getBookings
            .sort((a, b) => {
              const at = new Date(a.bookedFrom).getTime();
              const bt = new Date(b.bookedFrom).getTime();

              if (at > bt) return -1;
              if (at < bt) return 1;
              return 0;
            })
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
