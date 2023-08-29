import { Flex, Stack } from '@collinsonx/design-system/core';
import { Calendar, Clock } from '@collinsonx/design-system/assets/icons';
import DetailsSection from './DetailsSection';
import DetailsKeyValue from './DetailsKeyValue';
import dayjs from 'dayjs';
import getTime from 'lib/getTime';
import { Booking } from '@collinsonx/utils';
import { useMemo } from 'react';

export interface DetailsProps {
  booking: Booking | undefined;
  loading?: boolean;
  children?: JSX.Element;
}
const Details = ({ children, booking, loading = false }: DetailsProps) => {
  const flightTime = useMemo(
    () => getTime(booking?.metadata?.flightTime),
    [booking]
  );
  return (
    <Stack spacing={40}>
      <DetailsSection label="Passenger details">
        <DetailsKeyValue label="Name" loading={loading}>
          {booking?.consumer?.fullName ?? '-'}
        </DetailsKeyValue>
      </DetailsSection>
      <DetailsSection label="Flight details">
        <DetailsKeyValue label="Flight number" loading={loading}>
          {booking?.metadata?.flightNumber ?? '-'}
        </DetailsKeyValue>
        <DetailsKeyValue label="Flight time" loading={loading}>
          {flightTime}
        </DetailsKeyValue>
      </DetailsSection>
      <DetailsSection label="Booking details">
        {booking?.reference ? (
          <DetailsKeyValue label="Reference" loading={loading}>
            {booking?.reference}
          </DetailsKeyValue>
        ) : (
          <></>
        )}
        <DetailsKeyValue label="Arrival date" loading={loading}>
          {booking?.bookedFrom ? (
            <Flex align="center" gap={8}>
              <Calendar width={16} height={16} />
              {dayjs(booking?.bookedFrom).format('DD/MM/YYYY')}
            </Flex>
          ) : (
            '-'
          )}
        </DetailsKeyValue>
        <DetailsKeyValue label="Arrival time" loading={loading}>
          {booking?.bookedFrom ? (
            <Flex align="center" gap={8}>
              <Clock width={16} height={16} />
              {dayjs(booking?.bookedFrom).format('HH:mm')}
            </Flex>
          ) : (
            '-'
          )}
        </DetailsKeyValue>
        <DetailsKeyValue label="Guests" loading={loading}>
          {booking?.guestCount ?? '-'}
        </DetailsKeyValue>
      </DetailsSection>

      {children}
    </Stack>
  );
};

export default Details;
