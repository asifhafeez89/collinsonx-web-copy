import { Box, Stack, Text } from '@collinsonx/design-system/core';
import WarningBox from './WarningBox';

export interface ArrivalTimeProps {
  time: string;
}
const ArrivalTime = ({ time }: ArrivalTimeProps) => {
  return (
    <Stack spacing={16}>
      <Box>
        <Text fw={600} color="#000" size={18}>
          Lounge arrival time
        </Text>
        <Text pt={6}>{time}</Text>
      </Box>
      <WarningBox>
        You are eligible to enter the lounge 3 hours before your flight.
      </WarningBox>
    </Stack>
  );
};
export default ArrivalTime;
