import {
  Pending as IconPending,
  Confirmed as IconConfirmed,
  Declined as IconDeclined,
} from '@collinsonx/design-system/assets/icons';
import { Box, Flex, Text } from '@collinsonx/design-system/core';
import { BookingStatus } from '@collinsonx/utils';

const { Initialized, Confirmed, Declined, CheckedIn } = BookingStatus;

export interface NotificationProps {
  type: BookingStatus;
  children: string | JSX.Element;
}
const colorMap: Record<BookingStatus[number], string> = {
  [Initialized]: '#FFF3BF',
  [Confirmed]: '#E9FAC8',
  [CheckedIn]: '#E9FAC8',
  [Declined]: '#FFE3E3',
};
const Notification = ({ type, children }: NotificationProps) => {
  console.log(type, children);
  return (
    <Box w="100%" px={40} py={16} bg={colorMap[type]}>
      <Flex gap={8} align="center">
        {type === Initialized && <IconPending />}
        {(type === Confirmed || type === CheckedIn) && <IconConfirmed />}
        {type === Declined && <IconDeclined />}
        <Text>{children}</Text>
      </Flex>
    </Box>
  );
};
export default Notification;
