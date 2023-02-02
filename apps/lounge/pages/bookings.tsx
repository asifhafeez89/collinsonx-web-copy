import { Text, Box } from '@collinsonx/design-system/core';
import BookingCard from '@components/BookingCard';
import BookingEmptyState from '@components/BookingEmptyState';

import Layout from '@components/Layout';
import { useState } from 'react';

import mockData from './bookingsMock.json';
import imgUrl from './bookingsMockImage';
import { BookingCardProps } from '../components/BookingCard';
import BookingCardConfirmed from '../components/BookingCardConfirmed';

type DataStatus = 'empty' | 'hasData';

export default function Bookings() {
  // toggle for demo purposes - change to 'empty' to view empty state
  const [status, setStatus] = useState<DataStatus>('hasData');

  return (
    <Box>
      <Text fw={600} pb={12} size={20}>
        Booking management
      </Text>
      {status === 'empty' && <BookingEmptyState />}
      {status === 'hasData' && (
        <>
          {mockData.map((booking) =>
            booking.status === 'confirmed' ? (
              <BookingCardConfirmed key={booking.id} {...booking} />
            ) : (
              <BookingCard
                key={booking.id}
                {...booking}
                status={booking.status as BookingCardProps['status']}
                imgUrl={imgUrl}
              />
            )
          )}
        </>
      )}
    </Box>
  );
}

Bookings.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
