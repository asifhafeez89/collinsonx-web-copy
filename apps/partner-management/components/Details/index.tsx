import { Text, Flex, Stack } from '@collinsonx/design-system/core';
import { Calendar, Clock } from '@collinsonx/design-system/assets/icons';
import DetailsSection from './DetailsSection';
import DetailsKeyValue from './DetailsKeyValue';

import { Booking } from '@collinsonx/utils';
import dayjs from 'dayjs';

export interface DetailsProps {
  booking: Booking | undefined;
  loading?: boolean;
  children?: JSX.Element;
}
const Details = ({ children, booking, loading }: DetailsProps) => {
  return (
    <Stack spacing={40}>
      <DetailsSection label="Passenger details">
        <DetailsKeyValue label="Name" loading={loading}>
          -
        </DetailsKeyValue>
        <DetailsKeyValue label="Date of birth" loading={loading}>
          -
        </DetailsKeyValue>
        <DetailsKeyValue label="Flight details" loading={loading}>
          -
        </DetailsKeyValue>
      </DetailsSection>
      <DetailsSection label="Booking details">
        <DetailsKeyValue label="Booking date" loading={loading}>
          {booking?.bookedFrom ? (
            <Flex align="center" gap={8}>
              <Calendar width={16} height={16} />
              {dayjs(booking?.bookedFrom).format('DD/MM/YYYY')}
            </Flex>
          ) : (
            '-'
          )}
        </DetailsKeyValue>
        <DetailsKeyValue label="Booking time" loading={loading}>
          {booking?.bookedFrom ? (
            <Flex align="center" gap={8}>
              <Clock width={16} height={16} />
              {dayjs(booking?.bookedFrom).format('HH:mm')}
            </Flex>
          ) : (
            '-'
          )}
        </DetailsKeyValue>
      </DetailsSection>
      {children}
    </Stack>
  );
};

export default Details;
