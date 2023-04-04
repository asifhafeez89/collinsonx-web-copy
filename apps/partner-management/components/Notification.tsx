import {
  Pending as IconPending,
  Confirmed as IconConfirmed,
  Declined as IconDeclined,
} from '@collinsonx/design-system/assets/icons';
import { Box, Flex, Text } from '@collinsonx/design-system/core';
import { BookingStatus } from '@collinsonx/utils';
import { bookingConfig } from 'config/booking';

const { Initialized, Confirmed, Declined, Cancelled, CheckedIn } =
  BookingStatus;

export interface NotificationProps {
  type: BookingStatus;
  children: string | JSX.Element;
}

const Notification = ({ type, children }: NotificationProps) => {
  return (
    <Box w="100%" px={40} py={16} bg={bookingConfig[type].color}>
      <Flex gap={8} align="center">
        {type === Initialized && <IconPending />}
        {(type === Confirmed || type === CheckedIn) && <IconConfirmed />}
        {type === Declined && <IconDeclined />}
        {type === Cancelled && <IconDeclined />}
        <Text>{children}</Text>
      </Flex>
    </Box>
  );
};
export default Notification;
