import { Text, Flex, Stack } from '@collinsonx/design-system/core';
import { Calendar, Clock } from '@collinsonx/design-system/assets/icons';
import DetailsSection from './DetailsSection';
import DetailsKeyValue from './DetailsKeyValue';

import mockData from 'bookings.json';

type Booking = (typeof mockData.bookings)[number];

export interface DetailsProps {
  booking: Booking;
  children: JSX.Element;
}
const Details = ({
  children,
  booking: {
    name,
    date_of_birth,
    flight,
    reservation_date,
    reservation_time,
    adults,
    children: totalChildren,
  },
}: DetailsProps) => {
  return (
    <Stack spacing={40}>
      <DetailsSection label="Passenger details">
        <DetailsKeyValue label="Name">{name}</DetailsKeyValue>
        <DetailsKeyValue label="Date of birth">{date_of_birth}</DetailsKeyValue>
        <DetailsKeyValue label="Flight details">{flight}</DetailsKeyValue>
      </DetailsSection>
      <DetailsSection label="Booking details">
        <DetailsKeyValue label="Booking date">
          <Flex align="center" gap={8}>
            <Calendar width={16} height={16} />
            {reservation_date}
          </Flex>
        </DetailsKeyValue>
        <DetailsKeyValue label="Booking time">
          <Flex align="center" gap={8}>
            <Clock width={16} height={16} />
            {reservation_time}
          </Flex>
        </DetailsKeyValue>
      </DetailsSection>
      <DetailsSection label="Amount of travellers">
        <DetailsKeyValue
          label={
            <>
              <Text sx={{ width: '100%' }}>Travellers</Text>
              <Text>(over the age of 2)</Text>
            </>
          }
        >
          {adults}
        </DetailsKeyValue>
        <DetailsKeyValue
          label={
            <>
              <Text sx={{ width: '100%' }}>Travellers</Text>
              <Text>(under the age of 2)</Text>
            </>
          }
        >
          {totalChildren}
        </DetailsKeyValue>
      </DetailsSection>
      {children}
    </Stack>
  );
};

export default Details;
