import styled from '@collinsonx/design-system/styled';
import React from 'react';
import {
  Text,
  Box,
  Skeleton,
  Flex,
  Stack,
  UnstyledButton,
  createStyles,
} from '@collinsonx/design-system/core';

import BookingCard from '@components/BookingCard/BookingCard';
import BookingEmptyState from '@components/BookingEmptyState';
import { Warning as WarningIcon } from '@collinsonx/design-system/assets/icons';

import Layout from '@components/Layout';
import { useState } from 'react';

import { useRouter } from 'next/router';
import { useQuery } from '@collinsonx/utils/apollo';
import { getBookings } from '@collinsonx/utils/queries';
import { Booking, BookingStatus } from '@collinsonx/utils';
import LoungeError from '@components/LoungeError';
import { TEMPORARY_REDIRECT_STATUS } from 'next/dist/shared/lib/constants';

type DataStatus = 'empty' | 'hasData';

const useStyles = createStyles({
  active: {
    borderBottom: '3px solid #25262B',
    paddingTop: '3px',
  },
});

export default function Bookings() {
  const [status, setStatus] = useState<DataStatus>('hasData');
  const [bookingStatus, setBookingStatus] = useState<string>('CONFIRMED');
  const [secondBookingStatus, setSecondBookingStatus] =
    useState<any>(undefined);
  const [activeElement, setActiveElement] = useState<number>(0);
  const router = useRouter();

  const {
    loading,
    error: fetchError,
    data: bookingsData,
  } = useQuery<{ getBookings: Booking[] }>(getBookings);

  const { classes, cx } = useStyles();

  const onViewBookingDetails = (id: string) => {
    router.push({
      pathname: '/bookingDetails',
      query: {
        id,
      },
    });
  };

  const handleClick = (index: number): void => {
    setActiveElement(index);
  };

  const getClassname = (index: number): string => {
    return index === activeElement ? classes.active : '';
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
        <Text fw={600} size={26} ml={24} mt={24}>
          My bookings
        </Text>
        <Flex gap={24} ml={24}>
          <UnstyledButton
            pb={8}
            className={getClassname(0)}
            onClick={() => {
              setBookingStatus('CONFIRMED');
              setSecondBookingStatus(null);
              handleClick(0);
            }}
          >
            <Text size={14}>Confirmed</Text>
          </UnstyledButton>
          <UnstyledButton
            className={getClassname(1)}
            pb={8}
            onClick={() => {
              setBookingStatus('INITIALIZED');
              setSecondBookingStatus(null);
              handleClick(1);
            }}
          >
            <Text size={14}>Pending</Text>
          </UnstyledButton>
          <UnstyledButton
            className={getClassname(2)}
            pb={8}
            onClick={() => {
              setBookingStatus('DECLINED');
              setSecondBookingStatus('CANCELLED');
              handleClick(2);
            }}
          >
            <Text size={14}>Declined/Cancelled</Text>
          </UnstyledButton>
        </Flex>
      </Stack>
      <LoungeError error={fetchError} />
      {loading && <Skeleton visible={loading} h={390} />}
      {!bookingsData?.getBookings.length && !loading && <BookingEmptyState />}
      {!!bookingsData?.getBookings.length && (
        <Stack p={16} spacing={0}>
          {bookingStatus === 'INITIALIZED' && (
            <Stack spacing={0}>
              <Text
                style={{ fontSize: 24, fontWeight: 600, marginTop: '24px' }}
              >
                Pending visits
              </Text>
              <Box
                style={{
                  backgroundColor: '#FEEFCD',
                  marginTop: '24px',
                  padding: '8px 16px',
                  border: '1px solid #FAB005',
                  borderRadius: '4px',
                  display: 'flex',
                }}
              >
                <WarningIcon
                  style={{ height: '22px', width: '22px', marginRight: '12px' }}
                />

                <Text style={{ fontSize: 14 }}>
                  Once the lounge has accept your request we will notify you.
                </Text>
              </Box>
            </Stack>
          )}
          {bookingStatus === 'CONFIRMED' && (
            <Text
              style={{
                fontSize: '22px',
                fontWeight: 600,
                marginTop: '24px',
                marginBottom: '24px',
              }}
            >
              Upcoming confirmed visit
            </Text>
          )}
          {bookingStatus === 'DECLINED' && (
            <Text
              style={{
                fontSize: '22px',
                fontWeight: 600,
                marginTop: '24px',
                marginBottom: '8px',
              }}
            >
              Declined/Cancelled bookings
            </Text>
          )}
          {bookingsData?.getBookings
            .filter((booking) => {
              return (
                booking.status === bookingStatus ||
                booking.status === secondBookingStatus
              );
            })
            ?.sort((a, b) => {
              const at = new Date(a.bookedFrom).getTime();
              const bt = new Date(b.bookedFrom).getTime();

              if (at > bt) return -1;
              if (at < bt) return 1;
              return 0;
            })
            .map((booking, index) => (
              <React.Fragment key={index}>
                {index === 1 && booking?.status === 'CONFIRMED' && (
                  <Text
                    style={{
                      marginTop: '40px',
                      fontSize: '22px',
                      fontWeight: 600,
                    }}
                    key={`before-${index}`}
                  >
                    Future Confirmed Visits
                  </Text>
                )}
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
                    booking?.status === 'CONFIRMED'
                      ? index === 0
                      : index === null
                  }
                  firstArray={
                    booking?.status === 'CONFIRMED'
                      ? index < 2
                        ? true
                        : false
                      : index === 0
                  }
                />
              </React.Fragment>
            ))}
        </Stack>
      )}
    </Box>
  );
}

Bookings.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
