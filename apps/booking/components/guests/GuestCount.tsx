import { Flex } from '@collinsonx/design-system/core';
import { BookingGuests } from 'types/booking';

export const GuestCount = ({ adults, children, infants }: BookingGuests) => (
  <Flex direction="row" gap={10}>
    <Flex sx={{ width: '60%' }} gap={10}>
      <p style={{ padding: '0', margin: '0' }}> Adults {adults}</p>{' '}
      {Number(children) > 0 && (
        <>
          <p style={{ padding: '0', margin: '0' }}> Children {children}</p>
        </>
      )}
      {Number(infants) > 0 && (
        <>
          <p style={{ padding: '0', margin: '0' }}> Infants {infants}</p>
        </>
      )}
    </Flex>
  </Flex>
);
