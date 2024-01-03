import { Box, Text } from '@collinsonx/design-system/core';
import cx from 'clsx';
import {
  Confirmed,
  Pending,
  Declined,
} from '@collinsonx/design-system/assets/icons';

import classes from './Status.module.css';

export type type = 'warning' | 'success' | 'danger';
export type typeProps = {
  type: type;
  children: JSX.Element | string;
};

interface Props {
  children: JSX.Element | string;
}

const statusMap = {
  warning: ({ children }: Props) => (
    <Box className={cx([classes.base, classes.statusPending])}>
      <Pending />
      <Text>{children}</Text>
    </Box>
  ),
  success: ({ children }: Props) => (
    <Box className={cx([classes.base, classes.statusConfirmed])}>
      <Confirmed />
      <Text>{children}</Text>
    </Box>
  ),
  danger: ({ children }: Props) => (
    <Box className={cx([classes.base, classes.statusDeclined])}>
      <Declined />
      <Text>{children}</Text>
    </Box>
  ),
};

export default function type({ type, children }: typeProps) {
  const Component = statusMap[type];
  return <Component>{children}</Component>;
}
