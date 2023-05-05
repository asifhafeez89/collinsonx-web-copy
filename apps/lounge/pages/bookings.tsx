import styled from '@collinsonx/design-system/styled';
import {
  Text,
  Box,
  Skeleton,
  Flex,
  Stack,
  UnstyledButton,
} from '@collinsonx/design-system/core';
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
  const [bookingStatus, setBookingStatus] = useState<String>('CONFIRMED');
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
    <Box
      sx={{
        width: '375px',
        paddingTop: 0,
        backgroundColor: '#fff',
      }}
    >
      <Stack
        justify="start"
        align="start"
        sx={{ borderBottom: '1px solid #25262B' }}
      >
        <Text fw={600} size={26} ml={24}>
          My bookings
        </Text>
        <Flex gap={24} ml={24}>
          <UnstyledButton
            pb={8}
            // sx={{ borderBottom: '3px solid #25262B' }}
            onClick={(e) => {
              setBookingStatus('CONFIRMED');
            }}
          >
            <Text size={14}>Confirmed</Text>
          </UnstyledButton>
          <UnstyledButton
            pb={8}
            onClick={() => setBookingStatus('INITIALIZED')}
          >
            <Text size={14}>Pending</Text>
          </UnstyledButton>
          <UnstyledButton pb={8} onClick={() => setBookingStatus('DECLINED')}>
            <Text size={14}>Declined/Cancelled</Text>
          </UnstyledButton>
        </Flex>
      </Stack>
      <LoungeError error={fetchError} />
      {loading && <Skeleton visible={loading} h={390} />}
      {!bookingsData?.getBookings.length && !loading && <BookingEmptyState />}
      {!!bookingsData?.getBookings.length && (
        <Stack p={16}>
          {bookingStatus === 'INITIALIZED' && <Text>{bookingStatus}</Text>}
          {bookingsData?.getBookings
            .filter((booking) => {
              return booking.status === bookingStatus;
            })
            ?.sort((a, b) => {
              const at = new Date(a.bookedFrom).getTime();
              const bt = new Date(b.bookedFrom).getTime();

              if (at > bt) return -1;
              if (at < bt) return 1;
              return 0;
            })
            // .slice(0, 1)
            .map((booking, index) => (
              <BookingCard
                onClick={onViewBookingDetails}
                key={booking.id}
                id={booking.id ?? ''}
                name={booking?.experience?.name ?? ''}
                location={booking?.experience?.location ?? ''}
                imgUrl={booking?.experience?.images?.[0]?.url ?? ''}
                status={booking?.status ?? BookingStatus.Initialized}
                date={booking?.bookedFrom ?? ''}
                bookedFrom={booking?.experience?.location ?? ''}
                nextVisit={
                  booking?.status === 'DECLINED' ? index === 0 : index === null
                }
              />
            ))}
        </Stack>
      )}
      {/* {!!bookingsData?.getBookings.length && (
        <Stack p={16}>
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
                bookedFrom={booking?.experience?.location ?? ''}
              />
            ))}
        </Stack>
      )} */}
    </Box>
  );
}

Bookings.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
