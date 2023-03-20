import { Text, Flex, Stack } from '@collinsonx/design-system/core';
import { Calendar, Clock } from '@collinsonx/design-system/assets/icons';
import DetailsSection from './DetailsSection';
import DetailsKeyValue from './DetailsKeyValue';

import { useQuery } from '@collinsonx/utils/apollo';
import { getBookingByID } from '@collinsonx/utils/queries';
import { Booking } from '@collinsonx/utils';

export interface DetailsProps {
  bookingId: string;
  children: JSX.Element;
}
const Details = ({ children, bookingId }: DetailsProps) => {
  const { loading, error, data } = useQuery<Booking>(getBookingByID, {
    variables: { id: bookingId },
  });

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
          <Flex align="center" gap={8}>
            <Calendar width={16} height={16} />
            {data?.bookedFrom}
          </Flex>
        </DetailsKeyValue>
        <DetailsKeyValue label="Booking time" loading={loading}>
          <Flex align="center" gap={8}>
            <Clock width={16} height={16} />-
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
          loading={loading}
        >
          -
        </DetailsKeyValue>
        <DetailsKeyValue
          label={
            <>
              <Text sx={{ width: '100%' }}>Travellers</Text>
              <Text>(under the age of 2)</Text>
            </>
          }
          loading={loading}
        >
          -
        </DetailsKeyValue>
      </DetailsSection>
      {children}
    </Stack>
  );
};

export default Details;
