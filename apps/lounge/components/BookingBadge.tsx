import {
  Badge as MBadge,
  BadgeProps as MBadgeProps,
  Box,
  Group,
  Flex,
  createStyles,
} from '@collinsonx/design-system/core';

import { BookingStatus } from '@collinsonx/utils';
import {
  Confirmed as BookingConfirmed,
  Declined as BookingDeclined,
  Pending as BookingPending,
} from '@collinsonx/design-system/assets/icons';
import { start } from 'repl';

const {
  Initialized,
  Confirmed,
  CheckedIn,
  Declined,
  Cancelled,
  Booked,
  Errored,
} = BookingStatus;

export interface BadgeProps extends MBadgeProps {
  status: BookingStatus;
}

const useStyles = createStyles(({ colors }) => {
  return {
    root: {
      borderRadius: 4,
      textTransform: 'none',
      fontSize: 14,
      lineHeight: 24,
      maxWidth: '33%',
      fontWeight: 400,
      color: '#25262B',
    },
    inner: {
      padding: '12px 8px',
    },
    declined: {
      backgroundColor: '#FCD8D8',
      border: '2px solid #F03E3E',
    },
    pending: {
      backgroundColor: '#FEEFCD',
      border: '2px solid #FAB005',
    },
    confirmed: {
      backgroundColor: '#E3F1D0',
      border: '2px solid #74B816',
      overflow: 'visible',
    },
  };
});

const bookingMap: Record<BookingStatus, string> = {
  [Initialized]: 'Pending',
  [Confirmed]: 'Confirmed',
  [Declined]: 'Declined',
  [Cancelled]: 'Cancelled',
  [CheckedIn]: 'Booking checked in',
  [Booked]: 'Booking',
  [Errored]: 'Booking errored',
};

export default function BookingBadge({
  children,
  status,
  ...props
}: BadgeProps) {
  const { classes, cx } = useStyles();

  return (
    <MBadge
      {...props}
      className={cx(classes.root, classes.inner, {
        [classes.declined]:
          status === Declined || status === Cancelled || status === Errored,
        [classes.pending]: status === Initialized,
        [classes.confirmed]: status === Confirmed || status === CheckedIn,
      })}
    >
      <Group>{bookingMap[status]}</Group>
    </MBadge>
  );
}
