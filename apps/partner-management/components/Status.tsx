import { Box, Text } from '@collinsonx/design-system/core';
import {
  Confirmed,
  Pending,
  Declined,
} from '@collinsonx/design-system/assets/icons';

export type type = 'warning' | 'success' | 'danger';
export type typeProps = {
  type: type;
  children: JSX.Element | string;
};

const styles = {
  padding: '8px 16px',
  borderRadius: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10,
  height: 44,
  fontSize: 14,
  fontWeight: 500,
  color: '#000000',
};

interface Props {
  children: JSX.Element | string;
}

const statusMap = {
  warning: ({ children }: Props) => (
    <Box
      sx={{
        ...styles,
        background: '#FEF3DA',
        border: '2px solid #FAB005',
      }}
    >
      <Pending />
      <Text>{children}</Text>
    </Box>
  ),
  success: ({ children }: Props) => (
    <Box
      sx={{
        ...styles,
        background: '#EEF9E7',
        border: '2px solid #54C50D',
      }}
    >
      <Confirmed />
      <Text>{children}</Text>
    </Box>
  ),
  danger: ({ children }: Props) => (
    <Box
      sx={{
        ...styles,
        background: '#FDECEC',
        border: '2px solid #F03E3E',
      }}
    >
      <Declined />
      <Text>{children}</Text>
    </Box>
  ),
};

export default function type({ type, children }: typeProps) {
  const Component = statusMap[type];
  return <Component>{children}</Component>;
}
