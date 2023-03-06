import { Box, Text } from '@collinsonx/design-system/core';
import {
  Confirmed,
  Pending,
  Declined,
} from '@collinsonx/design-system/assets/icons';

export type Status = 'PENDING' | 'CONFIRMED' | 'DECLINED';
export type BookingStatusProps = {
  status: Status;
};

const styles = {
  padding: '8px 16px',
  borderRadius: 4,
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  height: 38,
  fontSize: 14,
  fontWeight: 500,
  width: 'fit-content',
  color: '#000000',
};

const statusMap = {
  PENDING: (
    <Box
      sx={{
        ...styles,
        background: '#FEF3DA',
        border: '2px solid #FAB005',
      }}
    >
      <Pending />
      <Text>Booking pending</Text>
    </Box>
  ),
  CONFIRMED: (
    <Box
      sx={{
        ...styles,
        background: '#EEF9E7',
        border: '2px solid #54C50D',
      }}
    >
      <Confirmed />
      <Text>Booking confirmed</Text>
    </Box>
  ),
  DECLINED: (
    <Box
      sx={{
        ...styles,
        background: '#FDECEC',
        border: '2px solid #F03E3E',
      }}
    >
      <Declined />
      <Text>Booking declined</Text>
    </Box>
  ),
};

export default function BookingStatus({ status }: BookingStatusProps) {
  return statusMap[status];
}
